import Plano from '#models/plano'
import type { HttpContext } from '@adonisjs/core/http'

export default class PlanosController {
  async index({response}:HttpContext){
    try {
      const planos = await Plano.query().preload('assinatura')
      return response.status(200).json(planos)
    } catch (error) {
      return response.json(error)
    }
  }

  async store({request,response}:HttpContext){
    try{
      const plano = new Plano()
      plano.idplano = request.body().idplano
      plano.duracao = request.body().duracao
      plano.status = request.body().status
      plano.nome = request.body().nome
      plano.valor = request.body().valor
      await plano.save()
      response.status(201).json(plano)
    }catch(error){
      response.json(error)
    }
  }

  async update({params,request,response}:HttpContext){
    try {
      const plano = await Plano.findByOrFail('idplano',params.idplano)
      const newPlano = request.only(['idplano','duracao','status','nome','valor'])
      plano.merge(newPlano)
      await plano.save()
      return response.status(200).json(plano)
    } catch (error) {
      return response.json(error)
    }
  }

  async delete({params,response}:HttpContext){
    try {
      const plano = await Plano.findByOrFail('idplano',params.idplano)
      await plano.delete()
      response.status(200).json(plano)
    } catch (error) {
      response.json(error)
    }
  }
}
