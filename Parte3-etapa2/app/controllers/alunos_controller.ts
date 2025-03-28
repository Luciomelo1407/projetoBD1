import type { HttpContext } from '@adonisjs/core/http'
import Aluno from '#models/aluno'

export default class AlunosController {
  async index({response}:HttpContext){
    try{
      const alunos = await Aluno.query().preload('usuario')
      response.status(200).json(alunos)
    }catch(error){
          response.status(404).json(error)
        }
  }

  async store({response, request}:HttpContext){
    try{
      const aluno = new Aluno()
      aluno.usuario_cpf = request.body().usuario_cpf
      aluno.matricula = request.body().matricula
      await aluno.save()
      response.json(aluno)
    }catch(error){
      response.status(404).json(error)
    }
}
  async delete({params,response}:HttpContext){
    try{
      const aluno = await Aluno.findByOrFail('matricula',params.matricula)
      await aluno.delete()
      response.status(200).json(aluno)
    }catch(error){
      response.status(error.status).json(error)
    }
  }
}
