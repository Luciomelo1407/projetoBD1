import type { HttpContext } from '@adonisjs/core/http'
import Assinatura from '#models/assinatura'

export default class AssinaturasController {
  async index({response}:HttpContext){
    try {
      const assinaturas =  await Assinatura.query().preload('aluno')
      return response.status(200).json(assinaturas)
    } catch (error) {
      return response.json(error)
    }
  }

  async store({request, response}:HttpContext){
    try {
      const assinatura = new Assinatura()
      assinatura.status  = request.body().status
      assinatura.aluno_usuario_cpf = request.body().aluno_usuario_cpf
      assinatura.plano_idplano = request.body().plano_idplano

      await assinatura.save()
      return response.status(201).json(assinatura)
    } catch (error) {
      return response.json(error)
    }
  }

  async update({params,request,response}:HttpContext){
    try {
      const assinatura =  await Assinatura.findByOrFail('aluno_usuario_cpf',params.cpf)
      assinatura.status = request.body().status
      await assinatura.save()
      return response.status(200).json(assinatura)

    } catch (error) {
      return response.json(error)
    }
  }

  async delete({params,response}:HttpContext){
    try {
      const assinatura = await Assinatura.findByOrFail('aluno_usuario_cpf',params.cpf)
      await assinatura.delete()
      response.status(200).json(assinatura)
    } catch (error) {
      response.json(error)
    }
  }

}
