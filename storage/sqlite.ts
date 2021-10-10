import {
  openDatabase,
  SQLError,
  SQLResultSet,
  SQLResultSetRowList,
  SQLTransaction,
  WebSQLDatabase,
} from 'expo-sqlite';
import { DatesFromTo } from '../src/types/types';

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
  average_time: number;
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
  averageTime: number;
}

export interface Round {
  id: number;
  time: number;
}

export type ExerciseWithRounds = Omit<Exercise, 'roundsCnt' | 'averageTime'> & {
  rounds: Round[];
};

export async function createTables() {
  console.log('\n\n\nStart creating tables.');

  const createExTableSql =
    'create table if not exists exercise (id integer primary key not null, date_time integer not null);';
  const createRoundsTableSql =
    'create table if not exists round (id integer primary key not null, exId integer not null, round_time integer not null, foreign key(exId) references exercise(id));';
  try {
    const trx = await getTransaction('create tables');
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

    void getTransaction('create exercise').then((trx) => {
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
    sql += ';';

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

export async function readResultsOverview(dates: DatesFromTo) {
  const params = [];
  let where = '';
  if (dates.from) {
    let from = dates.from;
    from = new Date(from.getFullYear(), from.getMonth(), from.getDate(), 0, 0, 0, 0);
    params.push(from.getTime().toString());
    where += 'x.date_time > ?';
  }

  if (dates.to) {
    let to = dates.to;
    to = new Date(to.getFullYear(), to.getMonth(), to.getDate(), 23, 59, 59, 999);
    params.push(to.getTime().toString());
    where += (where.length > 0 ? ' and ' : '') + 'x.date_time < ?';
  }

  if (where.length > 0) {
    where = ' where ' + where;
  }

  try {
    const trx = await getTransaction('read exercise details');
    const r = await executeSql(
      trx,
      `select x.id id, x.date_time, count(r.id) rounds_count, round(avg(r.round_time),1) average_time from exercise x join round r on x.id = r.exId ${where} group by x.id order by r.exId desc;`,
      params,
    );

    if (r.rows.length === 0) {
      return [] as Exercise[];
    }

    const { _array: rows } = r.rows as ResultsSetListWithArray<ExerciseRecord>;

    const exercises: Exercise[] = rows.map((r) => ({
      id: r.id,
      date: new Date(r.date_time),
      roundsCnt: r.rounds_count,
      averageTime: r.average_time,
    }));

    return exercises;
  } catch (err) {
    __DEV__ && console.log('read overview:', err);
    throw err;
  }
}

export async function readExerciseResults(id: number) {
  try {
    const trx = await getTransaction('read exercises overview');
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
    return exercise;
  } catch (err) {
    __DEV__ && console.log('read exercise:', err);
    throw err;
  }
}

export function removeRound(id: Round['id']) {
  return new Promise((resolve, reject) => {
    const errCb = (_: SQLTransaction, err: SQLError) => {
      console.log('delete round:', err);
      reject(err);
      return true;
    };

    const selectCb = (trx: SQLTransaction, res: SQLResultSet) => {
      const { roundsCount, exId } = <{ roundsCount: number; exId: number }>(
        res.rows.item(0)
      );

      const deleteRoundCb = (trx: SQLTransaction, delRRes: SQLResultSet) => {
        if (delRRes.rowsAffected === 0) {
          return reject(new Error('delete round: affected rows is 0'));
        }
        if (roundsCount > 1) {
          return resolve(void 0);
        }
        trx.executeSql(
          'DELETE FROM exercise WHERE id = ?;',
          [exId],
          (trx, res) => {
            if (res.rowsAffected === 0) {
              trx.executeSql(
                "select 'delete exercise: affected rows is 0' from someNonExistingTableToRollbackTransaction",
              );
              const err = new Error('delete round: delete exercise: affected rows id 0.');
              __DEV__ && console.log(err);
              return reject(err);
            }
            resolve(void 0);
          },
          errCb,
        );
      };

      trx.executeSql('DELETE FROM round WHERE id = ?;', [id], deleteRoundCb, errCb);
    };

    void getTransaction('delete round')
      .then((trx) => {
        trx.executeSql(
          'SELECT COUNT(1) roundsCount, exId from round WHERE exId = (SELECT exId FROM round r2 WHERE r2.id = ?)',
          [id],
          selectCb,
          errCb,
        );
      })
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

async function getTransaction(label: string): Promise<SQLTransaction> {
  await openDb();
  return new Promise((resolve, reject) => {
    db!.transaction(resolve, reject, () => {
      __DEV__ && console.log(`____+ transaction finished -> "${label}"\n`);
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