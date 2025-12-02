const dotenv = require('dotenv');
const sql = require('mssql');

// Carrega as variáveis de ambiente do .env
dotenv.config();

class UtilsFF {
  static carregarConfiguracoes() {
    try {
      const config = {
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        server: process.env.DB_HOST,
        database: process.env.DB_NAME,
        port: parseInt(process.env.DB_PORT, 10),
        options: {
          trustServerCertificate: true,
        },
        connectionTimeout: 30000, // 30 segundos para conectar
        requestTimeout: 120000    // 120 segundos para consultas
      };
      return config;
    } catch (error) {
      console.error("Erro ao carregar configurações do .env:", error);
      return null;
    }
  }

  static async usarConfiguracoes() {
    const dbConfig = this.carregarConfiguracoes();
    if (!dbConfig) {
      console.error("Configurações inválidas. Verifique o arquivo .env.");
      return;
    }

    try {
      await sql.connect(dbConfig);
      //console.log("✅ Conectado ao SQL Server com sucesso!");
    } catch (err) {
      console.error("❌ Erro ao conectar ao SQL Server:", err);
    }
  }

  static async conectarSQLServer() {
    const dbConfig = this.carregarConfiguracoes();
    if (!dbConfig) {
      console.error("Configurações inválidas. Verifique o arquivo .env.");
      return null;
    }

    try {
      const pool = await sql.connect(dbConfig);
      return pool;
    } catch (err) {
      return null;
    }
  }

  static descriptografarPass(dado) {
    let result = "";
    for (let i = 0; i < dado.length; i++) {
        result += String.fromCharCode(dado.charCodeAt(i) - 3);
    }
    return result;
  }

  static formatarDataHoraLocal(date = new Date()) {
    return date.getFullYear() + '-' +
      String(date.getMonth() + 1).padStart(2, '0') + '-' +
      String(date.getDate()).padStart(2, '0') + ' ' +
      String(date.getHours()).padStart(2, '0') + ':' +
      String(date.getMinutes()).padStart(2, '0') + ':' +
      String(date.getSeconds()).padStart(2, '0');
  }

  static completaComZeros(num) {
      return String(num).padStart(6, '0');
  }

  static formatarData(date = new Date(), formato) {
    if (formato == 'yyyymmdd') {
      return date.getFullYear() +
        String(date.getMonth() + 1).padStart(2, '0') +
        String(date.getDate()).padStart(2, '0');
    } else if (formato == 'yyyymm') {
      return date.getFullYear() +
        String(date.getMonth() + 1).padStart(2, '0');
    } else {
      return date.getFullYear() + '-' +
        String(date.getMonth() + 1).padStart(2, '0') + '-' +
        String(date.getDate()).padStart(2, '0') + ' ' +
        String(date.getHours()).padStart(2, '0') + ':' +
        String(date.getMinutes()).padStart(2, '0') + ':' +
        String(date.getSeconds()).padStart(2, '0');
    }

  }

  static convertDateBrToEua(date) {
    var month = date.substring(3, date.length - 5);
    var day = date.substring(0, 2);
    var year = date.substring(6, date.length);
    var dateEUA = `${year}-${month}-${day}`;
    return dateEUA;
  }

}

module.exports = UtilsFF;
