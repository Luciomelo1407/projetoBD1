import type { HttpContext } from '@adonisjs/core/http'
import Usuario from '#models/usuario';

export default class UsuariosController {

  async index({response}:HttpContext){

    const usuarios = await Usuario.query()


    return response.json(usuarios);
  }

  async store({request, response}:HttpContext){
    const usuario = new Usuario()
    usuario.cpf = request.body().cpf
    usuario.telefone = request.body().telefone
    usuario.datanascimento = request.body().datanascimento
    usuario.email = request.body().email
    usuario.senha = request.body().senha
    usuario.primeironome = request.body().primeironome
    usuario.sobrenome = request.body().sobrenome
    await usuario.save()
    response.json(usuario)
  }

  async update({params, request, response}:HttpContext){
    const cpf_change2 = params.cpf
    const usuario = await Usuario.findOrFail(cpf_change2)
    const dadosAtualizados = request.only(['telefone', 'datanascimento', 'email', 'senha', 'primeironome', 'sobrenome'])
    usuario.merge(dadosAtualizados)
    usuario.save()
    response.json(usuario)
  }

  async delete ({params, response}:HttpContext){
    const cpf_2delete = params.cpf
    const usuario = await Usuario.findOrFail(cpf_2delete)
    await usuario.delete()
    response.json(usuario)

  }


}
