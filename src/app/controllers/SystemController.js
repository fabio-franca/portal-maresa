const UtilsFF = require('../../config/utils');

class SystemController {
  constructor() { }

  async listarEspecialidades(req, res) {
    const pool = await UtilsFF.conectarSQLServer();
    if (!pool) return res.status(500).json({ error: "Falha na conexão com o banco de dados." });

    let baseQuery = `
            SELECT descricao FROM especialidades;
        `;

    const request = pool.request();
    const result = await request.query(baseQuery);

    if (!result.recordset.length) {
      return res.status(404).json({ message: "Nenhum registro encontrado." });
    }

    return res.status(200).json(result.recordset);
  }

  async obterIdEspecialidade(req, res) {
    const pool = await UtilsFF.conectarSQLServer();
    if (!pool) return res.status(500).json({ error: "Falha na conexão com o banco de dados." });

    const idEspecialidade = req.params.id;

    let baseQuery = `
            SELECT descricao 
              FROM especialidades
             WHERE id = @idEspecialidade ;
        `;

    const request = pool.request();
    const result = await request
      .input("idEspecialidade", idEspecialidade)
      .query(baseQuery);

    if (!result.recordset.length) {
      return res.status(404).json({ message: "Nenhum registro encontrado." });
    }

    return res.status(200).json(result.recordset);
  }

  async inserirEspecialidade(req, res) {
    const pool = await UtilsFF.conectarSQLServer();
    if (!pool) return res.status(500).json({ error: "Falha na conexão com o banco de dados." });

    const especialidade = req.body.descricao;

    let baseQuery = `
            INSERT INTO especialidades(descricao)
            OUTPUT INSERTED.id
            VALUES(@especialidade);
        `;

    const request = pool.request();
    const result = await request
      .input("especialidade", especialidade.descricao)
      .query(baseQuery);

    if (!result.recordset.length) {
      return res.status(404).json({ message: "Nenhum registro encontrado." });
    }

    const idEspecialidade = result.recordset?.[0]?.id || null;

    if (!idEspecialidade) {
      return res.status(400).json({ message: "Falha ao obter o ID" });
    }

    return res.status(201).json(idEspecialidade);
  }
}

module.exports = new SystemController();
