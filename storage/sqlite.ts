import {
  openDatabase,
  SQLError,
  SQLResultSet,
  SQLResultSetRowList,
  SQLTransaction,
  WebSQLDatabase,
} from 'expo-sqlite';

type DatabaseWithPrivate = WebSQLDatabase & {
  _db: {
    _closed: boolean;
    close: () => void;
  };
};

let db: DatabaseWithPrivate | undefined;

type ResultsSetListWithArray<Record> = SQLResultSetRowList & { _array: Record[] };

interface ExerciseRecord {
  id: number;
  date_time: number;
  rounds_count: number;
}

interface RoundRecord {
  round_id: number;
  date_time: number;
  round_time: number;
}

export interface Exercise {
  id: number;
  date: Date;
  roundsCnt: number;
}

export interface Round {
  id: number;
  time: number;
}

export type ExerciseWithRounds = Omit<Exercise, 'roundsCnt'> & {
  rounds: Round[];
};

export async function createTables() {
  console.log('\n\n\nStart creating tables.');

  const createExTableSql =
    'create table if not exists exercise (id integer primary key not null, date_time integer not null);';
  const createRoundsTableSql =
    'create table if not exists round (id integer primary key not null, exId integer not null, round_time integer not null, foreign key(exId) references exercise(id));';
  try {
    const trx = await getTransaction();
    await Promise.all([
      // executeSql(trx, 'delete from round;'),
      // executeSql(trx, 'delete from exercise;'),
      executeSql(trx, createExTableSql),
      executeSql(trx, createRoundsTableSql),
    ]);
    return;
  } catch (err) {
    __DEV__ && console.log('create tables:', err);
    throw err;
  }
}

export async function saveRounds(rounds: number[], date: Date) {
  if (rounds.length === 0) {
    throw new Error('nothing to save');
  }

  return createExercise(rounds, date);
}

function createExercise(rounds: number[], date: Date): Promise<SQLResultSet> {
  return new Promise((resolve, reject) => {
    const createExSql = 'insert into exercise (date_time) values (?);';
    const pushRounds = createPushRoundsFn(rounds, resolve, reject);

    void getTransaction().then((trx) => {
      trx.executeSql(
        createExSql,
        [date.getTime()],
        (trx, res) => {
          pushRounds(trx, res);
        },
        (_, err) => {
          reject(err);
          return true;
        },
      );
    });
  });
}

function createPushRoundsFn(
  rounds: number[],
  resolve: (value: SQLResultSet) => void,
  reject: (err: SQLError) => void,
) {
  return (trx: SQLTransaction, { insertId }: SQLResultSet) => {
    let sql = 'insert into round (exId, round_time) values (?, ?)';
    const params = [insertId, rounds[0]];
    for (let i = 1; i < rounds.length; i++) {
      sql += ', (?, ?)';
      params.push(insertId, rounds[i]);
    }

    __DEV__ && console.log('rounds params', params);

    trx.executeSql(
      sql,
      params,
      (_, results) => {
        resolve(results);
      },
      (_, err) => {
        reject(err);
        // for some reason it requires boolean to be returned
        return true;
      },
    );
  };
}

export async function readResultsOverview() {
  try {
    const trx = await getTransaction();
    const r = await executeSql(
      trx,
      'select x.id id, x.date_time, count(r.id) rounds_count from exercise x join round r on x.id = r.exId group by x.id order by r.exId desc;',
    );

    if (r.rows.length === 0) {
      return [] as Exercise[];
    }

    const { _array: rows } = r.rows as ResultsSetListWithArray<ExerciseRecord>;

    const exercises: Exercise[] = rows.map((r) => ({
      id: r.id,
      date: new Date(r.date_time),
      roundsCnt: r.rounds_count,
    }));

    return exercises;
  } catch (err) {
    __DEV__ && console.log('read overview:', err);
    throw err;
  }
}

export async function readExerciseResults(id: number) {
  try {
    const trx = await getTransaction();
    const r = await executeSql(
      trx,
      'select x.date_time, r.id round_id, r.round_time from round r join exercise x on x.id = r.exId where x.id = ? order by x.date_time desc',
      [id],
    );

    if (r.rows.length === 0) {
      return null;
    }

    const { _array: rows } = r.rows as ResultsSetListWithArray<RoundRecord>;

    const exercise: ExerciseWithRounds = {
      id,
      date: new Date(rows[0].date_time),
      rounds: rows.map((r) => ({
        id: r.round_id,
        time: r.round_time,
      })),
    };
    console.log('Exercise: ', exercise);
    return exercise;
  } catch (err) {
    __DEV__ && console.log('read exercise:', err);
    throw err;
  }
}

export function removeRound(id: Round['id']) {
  return new Promise((resolve, reject) => {
    getTransaction()
      .then((trx) =>
        trx.executeSql(
          'delete from round r where id = ? returning (select count(1) from round r2 where rs.exId = r.id)',
          [id],
          (_, res) => {
            console.log('removeRound:', res);
            resolve(res.rowsAffected);
          },
          (_, err) => {
            console.log('removeRound:', err);
            reject(err);
            return true;
          },
        ),
      )
      .catch((err) => {
        __DEV__ && console.log('delete round:', err);
        reject(err);
      });
  });
}

function openDb(): Promise<void> | void {
  if (db && !db._db._closed) {
    return;
  }

  db = <DatabaseWithPrivate>(
    openDatabase(
      'breathing-time.db',
      '1',
      'The db for the Breathing Time app, to keep track of the breathing results',
    )
  );
}

async function getTransaction(): Promise<SQLTransaction> {
  await openDb();
  return new Promise((resolve, reject) => {
    db!.transaction(resolve, reject, () => {
      __DEV__ && console.log(' + transaction success');
    });
  });
}

function executeSql(
  tr: SQLTransaction,
  sql: string,
  args?: (string | number)[],
): Promise<SQLResultSet> {
  return new Promise((resolve, reject) => {
    tr.executeSql(
      sql,
      args,
      (_, results) => {
        resolve(results);
      },
      (_, err) => {
        reject(err);
        return true;
      },
    );
  });
}
