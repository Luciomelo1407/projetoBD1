import type { HttpContext } from '@adonisjs/core/http'
import Aluno from '#models/aluno'

export default class AlunosController {
  async index({response}:HttpContext){
    const alunos = await Aluno.query()
    for(let count=0;count<alunos.length;count++){
      await alunos[count].load('usaurio')
    }
    response.json(alunos)
  }
  async store({response, request}:HttpContext){
    const aluno = new Aluno()
    aluno.usuario_cpf = request.body().usuario_cpf
    aluno.matricula = request.body().matricula
    await aluno.save()
    await aluno.load('usaurio')
    response.json(aluno)
  }
}
