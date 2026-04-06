const mysql = require('mysql2/promise');

const SQL_DEBUG = process.env.SQL_DEBUG === 'true';
const SQL_DEBUG_RESULTS = process.env.SQL_DEBUG_RESULTS === 'true';

function now() {
  return new Date().toISOString();
}

function formatSql(sql) {
  return String(sql).replace(/\s+/g, ' ').trim();
}

function logQueryStart(source, sql, params) {
  if (!SQL_DEBUG) return;

  console.log(`\n[${now()}] [SQL:${source}]`);
  console.log('QUERY :', formatSql(sql));
  console.log('PARAMS:', Array.isArray(params) ? params : []);
}

function logQuerySuccess(source, startedAt, result) {
  if (!SQL_DEBUG) return;

  const duration = Date.now() - startedAt;

  console.log(`STATUS: OK (${duration}ms)`);

  if (SQL_DEBUG_RESULTS) {
    try {
      const [rowsOrResult] = result;

      if (Array.isArray(rowsOrResult)) {
        console.log(`ROWS  : ${rowsOrResult.length}`);
      } else if (rowsOrResult && typeof rowsOrResult === 'object') {
        console.log('RESULT:', rowsOrResult);
      }
    } catch {
      console.log('RESULT: <unable to summarize>');
    }
  }
}

function logQueryError(source, startedAt, sql, params, error) {
  if (!SQL_DEBUG) return;

  const duration = Date.now() - startedAt;

  console.error(`STATUS: ERROR (${duration}ms)`);
  console.error('QUERY :', formatSql(sql));
  console.error('PARAMS:', Array.isArray(params) ? params : []);
  console.error('ERROR :', error.message);
}

async function runLoggedQuery(fn, source, sql, params = []) {
  const startedAt = Date.now();

  logQueryStart(source, sql, params);

  try {
    const result = await fn(sql, params);
    logQuerySuccess(source, startedAt, result);
    return result;
  } catch (error) {
    logQueryError(source, startedAt, sql, params, error);
    throw error;
  }
}

const rawPool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'linhtet2003',
  database: 'master_sheets',
  dateStrings: true,
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function query(sql, params = []) {
  return runLoggedQuery(rawPool.query.bind(rawPool), 'pool', sql, params);
}

async function execute(sql, params = []) {
  return runLoggedQuery(rawPool.execute.bind(rawPool), 'pool', sql, params);
}

async function getConnection() {
  const connection = await rawPool.getConnection();

  const originalQuery = connection.query.bind(connection);
  const originalExecute = connection.execute.bind(connection);
  const originalBegin = connection.beginTransaction.bind(connection);
  const originalCommit = connection.commit.bind(connection);
  const originalRollback = connection.rollback.bind(connection);
  const originalRelease = connection.release.bind(connection);

  connection.query = async (sql, params = []) => {
    return runLoggedQuery(originalQuery, 'connection', sql, params);
  };

  connection.execute = async (sql, params = []) => {
    return runLoggedQuery(originalExecute, 'connection', sql, params);
  };

  connection.beginTransaction = async () => {
    if (SQL_DEBUG) {
      console.log(`\n[${now()}] [TX] BEGIN`);
    }
    return originalBegin();
  };

  connection.commit = async () => {
    if (SQL_DEBUG) {
      console.log(`[${now()}] [TX] COMMIT`);
    }
    return originalCommit();
  };

  connection.rollback = async () => {
    if (SQL_DEBUG) {
      console.log(`[${now()}] [TX] ROLLBACK`);
    }
    return originalRollback();
  };

  connection.release = () => {
    if (SQL_DEBUG) {
      console.log(`[${now()}] [TX] RELEASE`);
    }
    return originalRelease();
  };

  return connection;
}

async function end() {
  return rawPool.end();
}

module.exports = {
  query,
  execute,
  getConnection,
  end
};