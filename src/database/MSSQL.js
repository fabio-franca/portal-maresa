const { Connection, Request, TYPES } = require('tedious');
require('dotenv').config();

class MSSQL {
  constructor() {
    this.config = {
      server: process.env.MSSQL_SERVER,
      authentication: {
        type: 'default',
        options: {
          userName: process.env.MSSQL_USER,
          password: process.env.MSSQL_PASSWORD,
        },
      },
      options: {
        database: process.env.MSSQL_DATABASE,
        encrypt: true,
        trustServerCertificate: true,
        rowCollectionOnRequestCompletion: false,
      },
    };
  }

  query(sql, params = {}) {
    return new Promise((resolve, reject) => {
      const connection = new Connection(this.config);
      const results = [];

      connection.on('connect', (err) => {
        if (err) {
          reject(err);
          return;
        }

        const request = new Request(sql, (err) => {
          if (err) reject(err);
        });

        // Adiciona parâmetros usando .input()
        Object.entries(params).forEach(([name, value]) => {
          request.addParameter(name, TYPES.VarChar, value);
        });

        request.on('row', (columns) => {
          const row = {};
          columns.forEach((column) => {
            row[column.metadata.colName] = column.value;
          });
          results.push(row);
        });

        request.on('requestCompleted', () => {
          connection.close();
          resolve(results);
        });

        request.on('error', (err) => {
          reject(err);
        });

        connection.execSql(request);
      });

      connection.on('error', (err) => {
        reject(err);
      });

      connection.connect();
    });
  }
}

module.exports = new MSSQL();