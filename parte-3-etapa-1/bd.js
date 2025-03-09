import pg from 'pg'
const {Client} = pg
//criação do cliente para conectar ao BD
const client = new Client({
  user: 'postgres',
  password: 'postgres',
  host: 'academia.cthkfcccfwew.us-east-1.rds.amazonaws.com',
  port: 5432,
  database: 'postgres',
  ssl: {
      rejectUnauthorized: false, // Se precisar de SSL, pode ser necessário passar um certificado
    }
})
await client.connect()

async function inserirUsuario(cpf,telefone,datanascimento,email,senha,primeironome,sobrenome){
  const res = await client.query('insert into academia.usuario (cpf, telefone, datanascimento, email, senha, primeironome, sobrenome) values ($1, $2, $3, $4, $5, $6, $7 )',
    [cpf,telefone,datanascimento,email,senha,primeironome,sobrenome])
}
async function listarUsuarios(){
  const res = await client.query('select * from academia.usuario')
  for(var i = 0; i < res.rowCount;i++){
    console.log(res.rows[i])
  }
}

async function deletarUsuario(cpf){
  const res = await client.query('delete from academia.usuario where cpf = $1',[cpf])
}


/*
 * Para lista os usuários descomente a função abaixo
 * */
// await listarUsuarios()

/*
 * Para inserir usuário descomente a função abaixo
 * */
// await inserirUsuario('21654',['(79)952169'],'2003-07-14','lucas@gmail.com','luquinhas123','lucas','Castro Souza')


// await listarUsuarios() // apenas a mesma função de listar usuários

/*
 * Para deletar usuário descomente a função abaixo
 * */
// await deletarUsuario(21654)

await client.end()
