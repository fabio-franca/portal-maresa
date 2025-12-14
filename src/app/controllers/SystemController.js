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


  

   async listarmensagens(req, res) {
    const pool = await UtilsFF.conectarSQLServer();
    if (!pool) return res.status(500).json({ error: "Falha na conexão com o banco de dados." });

    let baseQuery = `
            SELECT id_colaborador, id_especialidade, mensagem_paciente, data, nome_paciente, email_paciente, telefone_paciente FROM mensagens;
        `;

    const request = pool.request();
    const result = await request.query(baseQuery);

    if (!result.recordset.length) {
      return res.status(404).json({ message: "Nenhum registro encontrado." });
    }

    return res.status(200).json(result.recordset);
  }

  async obterIdmensagens(req, res) {
    const pool = await UtilsFF.conectarSQLServer();
    if (!pool) return res.status(500).json({ error: "Falha na conexão com o banco de dados." });

    const idmensagens = req.params.id;

    let baseQuery = `
            SELECT id_colaborador, id_especialidade, mensagem_paciente, data, nome_paciente, email_paciente, telefone_paciente
              FROM mensagens
             WHERE id = @idMensagens ;
        `;

    const request = pool.request();
    const result = await request
      .input("idmensagens", idmensagens)
      .query(baseQuery);

    if (!result.recordset.length) {
      return res.status(404).json({ message: "Nenhum registro encontrado." });
    }

    return res.status(200).json(result.recordset);
  }

  async inserirmensagens(req, res) {
    const pool = await UtilsFF.conectarSQLServer();
    if (!pool) return res.status(500).json({ error: "Falha na conexão com o banco de dados." });

    const {id_colaborador, id_especialidade, mensagem_paciente, data, nome_paciente, email_paciente, telefone_paciente} = req.body;

    let baseQuery = `
            INSERT INTO mensagens(id_colaborador, id_especialidade, mensagem_paciente, data, nome_paciente, email_paciente, telefone_paciente)
            OUTPUT INSERTED.id
            VALUES(@colaborador, @especialidade, @mensagem, @data, @nome, @email, @telefone);
        `;

    const request = pool.request();
    const result = await request
      .input("colaborador", id_colaborador)
      .input("especialidade", id_especialidade)
      .input("mensagem", mensagem_paciente)
      .input("data", data)
      .input("nome", nome_paciente)
      .input("email", email_paciente)
      .input("telefone", telefone_paciente)
      .query(baseQuery);

    if (!result.recordset.length) {
      return res.status(404).json({ message: "Nenhum registro encontrado." });
    }

    const idmensagens = result.recordset?.[0]?.id || null;

    if (!idmensagens) {
      return res.status(400).json({ message: "Falha ao obter o ID" });
    }

    return res.status(201).json(idmensagens);
  }



async listarcolaboradores(req, res) {
    const pool = await UtilsFF.conectarSQLServer();
    if (!pool) return res.status(500).json({ error: "Falha na conexão com o banco de dados." });

    let baseQuery = `
            SELECT id, nome, telefone, data, email FROM colaborador;
        `;

    const request = pool.request();
    const result = await request.query(baseQuery);

    if (!result.recordset.length) {
      return res.status(404).json({ message: "Nenhum registro encontrado." });
    }

    return res.status(200).json(result.recordset);
  }
  

  async obterIdcolaboradores(req, res) {
    const pool = await UtilsFF.conectarSQLServer();
    if (!pool) return res.status(500).json({ error: "Falha na conexão com o banco de dados." });

    const idcolaboradores = req.params.id;

    let baseQuery = `
            SELECT id, nome, telefone, email FROM colaborador
             WHERE id = @idcolaboradores ;
        `;

    const request = pool.request();
    const result = await request
      .input("idcolaboradores", idcolaboradores)
      .query(baseQuery);

    if (!result.recordset.length) {
      return res.status(404).json({ message: "Nenhum registro encontrado." });
    }

    return res.status(200).json(result.recordset);
  }

  async inserircolaboradores(req, res) {
    const pool = await UtilsFF.conectarSQLServer();
    if (!pool) return res.status(500).json({ error: "Falha na conexão com o banco de dados." });

    const {nome, telefone, email} = req.body;

    let baseQuery = `
            INSERT INTO colaborador(nome, telefone, email)
            OUTPUT INSERTED.id
            VALUES(@nome, @telefone, @email);
        `;

    const request = pool.request();
    const result = await request
      .input("nome", nome)
      .input("email", email)
      .input("telefone", telefone)
      .query(baseQuery);

    if (!result.recordset.length) {
      return res.status(404).json({ message: "Nenhum registro encontrado." });
    }

    const idcolaboradores = result.recordset?.[0]?.id || null;

    if (!idcolaboradores) {
      return res.status(400).json({ message: "Falha ao obter o ID" });
    }

    return res.status(201).json(idcolaboradores);
  }
}

module.exports = new SystemController();


