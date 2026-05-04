const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const assert = require('assert');

function runScript(db, script) {
  const sql = fs.readFileSync(script, 'utf8');
  return new Promise((resolve, reject) => {
    db.all(sql, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

const getNameDateLocationFromEmployee = (db) => {
  const sql = `SELECT FIRST_NAME, LAST_NAME, DATE, LOCATION FROM EMPLOYEE;`;
  return new Promise((resolve, reject) => {
    db.all(sql, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

const createExpectedValues = (employees) => {
  let expected = [];
  employees.forEach((employee) => {
    expected.push({
      "First Initial": employee.FIRST_NAME.substring(0,1),
      "Last Initial": employee.LAST_NAME.substring(0,1),
      "Birth Year": employee.DATE.substring(0,4),
      "Corrected Location": employee.LOCATION.trim().toUpperCase()
    })
  })
  return expected;
}

describe('the SQL in the `exercise.sql` file', () => {
  let db;
  let scriptPath;

  beforeAll(() => {
    const dbPath = path.resolve(__dirname, '..', 'lesson34.db');
    db = new sqlite3.Database(dbPath);

    scriptPath = path.resolve(__dirname, '..', 'exercise.sql');
  });

  afterAll(() => {
    db.close();
  });

  it('should return all rows from the employee table with specified columns in readme', async () => {
      const results = await runScript(db, scriptPath);
      const employees = await getNameDateLocationFromEmployee(db);
      const expected = await createExpectedValues(employees);

      expect(results).toEqual(expected)
  });
});
