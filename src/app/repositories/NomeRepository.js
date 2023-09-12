import pool from "../database/db.js"

class NomeRepository {

  async create(dados){
    try {
      const client = await pool.connect()
      const { nomeCompleto, profissao } = dados
      const sql = 'INSERT INTO nomes.nomes_profissoes (nome, profissao) VALUES ($1, $2)'
      await client.query(sql, [nomeCompleto, profissao])
      client.release()
      return   
    } catch (error) {
      return error
    }  
  }

  async findAll(){
    try {
      const client = await pool.connect()
      const sql = 'SELECT * FROM nomes.nomes_profissoes'
      const result = await client.query(sql)
      const nomes = result.rows
      client.release()
      return nomes
    } catch (error) {
      console.error('Erro ao listar nomes:', error)
      return error
    }
  }

  async findById(id){
    try {
      const client = await pool.connect()
      const sql = 'SELECT * FROM nomes.nomes_profissoes WHERE id = $1'
      const result = await client.query(sql, [id])
      const nome = result.rows[0] 
      client.release()
      return nome     
    } catch (error) {
      return error
    }
  }

  async update(id, novaProfissao){
    try {
      const client = await pool.connect()
      const sql = 'UPDATE nomes.nomes_profissoes SET profissao = $1 WHERE id = $2'
      await client.query(sql, [novaProfissao, id])
      client.release()
      return
    } catch (error) {
      return error
    }
  }

  async delete(id){
    try {
      const client = await pool.connect()
      const sql = 'DELETE FROM nomes.nomes_profissoes WHERE id = $1'
      const result = await client.query(sql, [id])
      client.release()
      if(result.rowCount === 1){
        return
      }else{
        return('Não encontrado!')
      }     
    } catch (error) {
      return error
    }  
  }

}

export default new NomeRepository()