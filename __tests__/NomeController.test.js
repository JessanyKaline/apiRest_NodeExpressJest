import NomeController from '../src/app/controllers/NomeController.js' // Verifique o caminho correto para o seu controller
import NomeRepository from '../src/app/repositories/NomeRepository.js'

jest.mock('../src/app/repositories/NomeRepository.js', () => ({
  create: jest.fn(),
  findAll: jest.fn(),
  findById: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
}))

describe('NomeController', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('deve retornar uma lista de nomes', async () => {
    const req = {}
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }

    NomeRepository.findAll.mockResolvedValueOnce([
      { id: 1, nome: 'Nome1', profissao: 'Profissao1' },
      { id: 2, nome: 'Nome2', profissao: 'Profissao2' },
    ])

    await NomeController.index(req, res);

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ id: expect.any(Number), nome: expect.any(String), profissao: expect.any(String) }),
      ])
    )
  })

  it('deve retornar um único nome', async () => {
    const req = { params: { id: 1 } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    NomeRepository.findById.mockResolvedValueOnce({ id: 1, nome: 'Nome1', profissao: 'Profissao1' })

    await NomeController.show(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ id: 1, nome: expect.any(String), profissao: expect.any(String) })
    )
  })

  it('deve criar um novo nome', async () => {
    const req = { body: { nome: 'NovoNome', profissao: 'NovaProfissao' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }

    NomeRepository.create.mockResolvedValueOnce()

    await NomeController.store(req, res)

    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.json).toHaveBeenCalledWith({ message: 'Dados inseridos com sucesso' })
  })

  it('deve atualizar a profissão de um nome', async () => {
    const req = { params: { id: 1 }, body: { profissao: 'NovaProfissao' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }

    NomeRepository.update.mockResolvedValueOnce()

    await NomeController.update(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({ message: 'Profissão atualizada com sucesso' })
  })

  
  it('deve excluir um nome', async () => {
    const req = { params: { id: 1 } }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }

    NomeRepository.delete.mockResolvedValueOnce()

    await NomeController.delete(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({ message: 'Registro excluído!' })
 
    expect(NomeRepository.delete).toHaveBeenCalledWith(1)
  })
})
