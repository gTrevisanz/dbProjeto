async function connect() {  
    const { Pool } = require("pg");

    if(global.connection)
        return global.connection.connect();

    const pool = new Pool({
      user: process.env.USER_NAME,
      host: process.env.HOST_NAME,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      dialect: process.env.DB_DIALECT,
      port: process.env.PORT_NUMBER
    });
    
    const client = await pool.connect();
    console.log("O Pool de conexão foi criado com sucesso!")
    client.release();

    global.connection = pool;
    
    return pool.connect();
  }

  connect();

  async function insertCustomors(customors) {
      
    const VALUES = [customors.cpf, customors.nome, customors.email, customors.idade, customors.profissao];
      const client = await connect ();
      const sql = "INSERT INTO cliente(cpf, nome, email, idade, profissao) VALUES" 

      await client.query(sql, VALUES);
  }

  insertCustomors()

  module.exports ={
    insertCustomors
  }