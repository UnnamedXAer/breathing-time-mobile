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

let db: DatabaseWithPrivate;

interface RoundRecord {
  id: number;
  round_time: number;
}

interface ExerciseRecord {
  id: number;
  date_time: number;
}

type ExerciseWithRoundsRecord = ExerciseRecord &
  RoundRecord & {
    round_id: number;
  };

type ResultsSetListWithArray<Record> = SQLResultSetRowList & { _array: Record[] };

export interface Exercise {
  id: number;
  exerciseDate: Date;
  rounds: Round[];
}

export interface Round {
  id: number;
  time: number;
}

export async function createTables() {
  console.log('\n\n\nStart creating tables.');

  const createExTableSql =
    'create table if not exists exercise (id integer primary key not null, date_time integer not null);';
  const createRoundsTableSql =
    'create table if not exists round (id integer primary key not null, exId integer not null, round_time integer not null, foreign key(exId) references exercise(id));';
  try {
    const trx = await getTransaction();
    // db._db.close();
    console.log('is db closed', db._db._closed);
    const r = await Promise.all([
      //   executeSql(trx, 'drop table round;'),
      //   executeSql(trx, 'drop table exercise;'),
      // //

      // executeSql(trx, 'delete from round;'),
      // executeSql(trx, 'delete from exercise;'),

      // //
      executeSql(trx, createExTableSql),
      executeSql(trx, createRoundsTableSql),
    ]);
    console.log('tables created');

    return;
  } catch (err) {
    __DEV__ && console.log('create tables:', err);
    throw err;
  }
}

export async function saveRounds(data: number[]) {
  if (data.length === 0) {
    throw new Error('nothing to save');
  }

  return createExercise(data);
}

function createExercise(rounds: number[]): Promise<SQLResultSet> {
  return new Promise((resolve, reject) => {
    const createExSql = 'insert into exercise (date_time) values (?);';
    const pushRounds = createPushRoundsFn(rounds, resolve, reject);

    void getTransaction().then((trx) => {
      trx.executeSql(createExSql, [Date.now()], pushRounds, (_, err) => {
        reject(err);
        return true;
      });
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

    console.log('params', params);

    trx.executeSql(
      sql,
      params,
      (_, results) => {
        resolve(results);
        // const gooErr = new Error('Rejecting goog operation :(.') as unknown as SQLError;
        // reject(gooErr);
      },
      (_, err) => {
        reject(err);
        // for some reason it requires boolean to be returned
        return true;
      },
    );
  };
}

export async function readResults() {
  const trx = await getTransaction();
  const r = await executeSql(
    trx,
    'select r.exId id, x.date_time, r.id round_id, r.round_time from round r join exercise x on x.id = r.exId order by r.id desc',
  );

  if (r.rows.length === 0) {
    return [] as Exercise[];
  }

  const { _array: rows } = r.rows as ResultsSetListWithArray<ExerciseWithRoundsRecord>;
  const exercises: Exercise[] = [
    {
      id: rows[0].id,
      exerciseDate: new Date(rows[0].date_time),
      rounds: [],
    },
  ];

  for (let i = 0; i < rows.length; i++) {
    const record = rows[i];

    if (exercises[exercises.length - 1].id !== record.id) {
      exercises.push({
        id: record.id,
        exerciseDate: new Date(record.date_time),
        rounds: [],
      });
    }

    exercises[exercises.length - 1].rounds.push({
      id: record.round_id,
      time: record.round_time,
    });
  }
  console.log(exercises);
  return exercises;
}

function openDb(): Promise<void> | void {
  if (db && !db._db._closed) {
    return;
  }

  console.log('about to call "openDatabase"');
  db = <DatabaseWithPrivate>(
    openDatabase(
      'breathing-time.db',
      '1',
      'The db for the Breathing Time app, to keep track of the breathing results',
      void 0,
      (openedDB) => {
        db = <DatabaseWithPrivate>openedDB;
      },
    )
  );

  console.log('returning from "openDB"');
}

async function getTransaction(): Promise<SQLTransaction> {
  await openDb();
  console.log('in transaction get - got db');
  return new Promise((resolve, reject) => {
    db.transaction(resolve, reject, () => {
      console.log('transaction success');
    });
  });
}

function executeSql(
  tr: SQLTransaction,
  sql: string,
  args?: (string | number)[],
): Promise<SQLResultSet> {
  return new Promise((resolve, reject) => {
    console.log('about to execute ->', sql);
    tr.executeSql(
      sql,
      args,
      (_, results) => {
        // console.log('resolved', sql);
        resolve(results);
      },
      (_, err) => {
        console.log('rejected', sql);
        reject(err);
        return true;
      },
    );
  });
}
