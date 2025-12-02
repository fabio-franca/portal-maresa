const UtilsFF = require('../../config/utils');

class SystemController {
  constructor() { }

  async listarEspecialidades(req, res) {
    const pool = await UtilsFF.conectarSQLServer();
    if (!pool) return res.status(500).json({ error: "Falha na conexão com o banco de dados." });

    let baseQuery = `
            SELECT descricao FROM especialidade;
        `;

    const request = pool.request();
    const result  = await request.query(baseQuery);

    if (!result.recordset.length) {
      return res.status(404).json({ message: "Nenhum registro encontrado." });
    }

    return res.status(200).json(result.recordset);
  }
}

module.exports = new SystemController();
