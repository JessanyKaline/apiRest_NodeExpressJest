import express from 'express' // importação da lib
import { nomes } from './mock.js' // importação do array de dados
import { buscarNomePorId, buscarIndexNomes } from './commons.js' //importação da função usada

const app = express () //criação de instância 


app.use(express.json()) //para o express fazer a leitura de body no formato json


/* Para utilização da syntaxe import no package.json é acrescentado
"type": "module"*/


/* Rota padrão ou raiz 
req é a requisição - res a resposta - send o que será enviado */
app.get('/', (req, res) => {
  res.send('Hello World!')
})

/* Chama-se de endpoint o que vem após a /, nesse caso /nomes é o endpoint.
Status é o status http que será enviado */
app.get('/nomes', (req,res) => {
  res.status(200).send(nomes)
})

/* Com o uso de uma função auxiliar/utilitária é buscado no array o id
passado como parametro (/nomes/:id) */
app.get('/nomes/:id', (req, res) =>{
  const id = req.params.id
  res.json(buscarNomePorId(id))
})

/* Verbo post é para inserir dados, nesse caso estamos inserindo na nossa
array com .push (método para inserir dados em arrays), as informações que 
vem no body da nossa requisição (req.body)e enviando uma mensagem de sucesso */
app.post('/nomes', (req,res) => {
  nomes.push(req.body)
  res.status(201).send('Cadastrado com sucesso!')
})

/* Com o uso de uma função auxilixar/utilitária e atraveś do parametro id passado
é realizado a exclução do objeto, utilizando o método .splice */
app.delete ('/nomes/:id', (req, res) =>{
  const id = req.params.id
  const index = buscarIndexNomes(id)
  nomes.splice(index, 1)  
  res.status(200).send(`Nome com id n°${id} excluído com sucesso!`)
})

/* O verbo PUT é usado para fazer atualizações, nesse caso foi utilizado
a função utilitária já existente para a partir do index atualizar a profissão. */
app.put ('/nomes/:id', (req, res) =>{
  const id = req.params.id
  const index = buscarIndexNomes(id)
  nomes[index].profissao = req.body.profissao
  res.status(200).send(`Profissão com id n°${id} atualizada com sucesso!`)
})

export default app //expondo para uso em outros arquivos

/* Principais vebos HTTP
GET - PEGAR (exemplo de uso: listar usuários)
POST - ENVIAR (exemplo de uso: inserir um novo usuário) 
PUT - ATUALIZAR (exemplo de uso: atualização de dados)
DELETE - APAGAR (exemplo de uso: apagar um usuário)*/