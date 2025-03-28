import type { HttpContext } from '@adonisjs/core/http'
import Usuario from '#models/usuario';
import Aluno from '#models/aluno';
import Assinatura from '#models/assinatura';

export default class UsuariosController {

  async index({response}:HttpContext){
    try{
      const usuarios = await Usuario.query()
      return response.status(200).json(usuarios);
    }catch(error){
      return response.status(404).json(error);
    }
  }

  async store({request, response}:HttpContext){
    try{
      const usuario = new Usuario()
      usuario.cpf = request.body().cpf
      usuario.telefone = request.body().telefone
      usuario.datanascimento = request.body().datanascimento
      usuario.email = request.body().email
      usuario.senha = request.body().senha
      usuario.primeironome = request.body().primeironome
      usuario.sobrenome = request.body().sobrenome
      await usuario.save()
      return response.status(201).json(usuario)
    }catch(error){
      return response.status(error.status || 409).json(error)
    }
  }

  async update({params, request, response}:HttpContext){
    try{
      const cpf_change2 = params.cpf
      const usuario = await Usuario.findOrFail(cpf_change2)
      console.log("passou")
      const dadosAtualizados = request.only(['telefone', 'datanascimento', 'email', 'senha', 'primeironome', 'sobrenome'])
      usuario.merge(dadosAtualizados)
      await usuario.save()
      return response.status(202).json(usuario)
    }catch(error){
      return response.json(error)
    }
      }

  async delete ({params, response}:HttpContext){
    try{
      const cpf_2delete = params.cpf
      const usuario = await Usuario.findOrFail(cpf_2delete)
      const aluno = await Aluno.findBy('usuario_cpf',usuario.cpf)
      const assinatura = await Assinatura.findBy('aluno_usuario_cpf',usuario.cpf)
      await assinatura?.delete()
      await aluno?.delete()
      await usuario.delete()
      response.status(200).json(usuario)
    }catch(error){
      response.json(error)
    }

  }


}
