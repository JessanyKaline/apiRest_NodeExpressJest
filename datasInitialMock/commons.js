import {nomes} from './mock.js'

/* Busca no array de nomes por um id que corresponda ao id passado
como parametro da função */
export function buscarNomePorId(id) { 
  return nomes.filter(nome => nome.id == id)
}

/* Através do id busca o index desse objeto, lembre-se que o id não
é igual ao index, já que a contagem dos elementos de um array começa
em 0. */
export function buscarIndexNomes (id) {
  return nomes.findIndex( nome => nome.id == id)
}