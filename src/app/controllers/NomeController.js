import NomeRepository from '../repositories/NomeRepository.js'

class NomeController {

  async index(req, res) {
    try {
      const result = await NomeRepository.findAll()
      res.status(200).json(result)    
    } catch (error) {
      res.status(500).json({ error: 'Erro ao listar nomes' })
    }    
  }

  async show (req, res) {  
    try {
      const id = req.params.id
      const result = await NomeRepository.findById(id)
      if (result) {
        res.status(200).json(result)
      } else {
        res.status(404).json({ error: 'Registro não encontrado' })
      }
    } catch (error) {
      console.error('Erro ao buscar registro por ID:', error)
      res.status(500).json({ error: 'Erro ao buscar registro por ID' })    
    }        
  }

  async store (req,res) {   
    try {
      const dados = req.body 
      await NomeRepository.create(dados)
      res.status(201).json({ message: 'Dados inseridos com sucesso' })
    } catch (error) {
      console.error('Erro ao inserir dados:', error)
      res.status(500).json({ error: 'Erro ao inserir dados' })
    }
    
  }

  async update (req, res) {
    try {
      const id = req.params.id
      const novaProfissao = req.body.profissao
      await NomeRepository.update(id, novaProfissao)
      res.status(200).json({ message: 'Profissão atualizada com sucesso' })
    } catch (error) {
      console.error('Erro ao atualizar profissão:', error)
      res.status(500).json({ error: 'Erro ao atualizar profissão' })
    }    
  }

  async delete (req, res) {
    try {
      const id = req.params.id
      const result = await NomeRepository.delete(id)
      if (result === 'Não encontrado!') {
        res.status(404).json({ error: 'Registro não encontrado' })
      } else {
        res.status(200).send({message: 'Registro excluído!'})
      }     
    } catch (error) {
      console.error('Erro ao excluir registro:', error)
      res.status(500).json({ error: 'Erro ao excluir registro' })
    }  
  }

}

export default new NomeController()