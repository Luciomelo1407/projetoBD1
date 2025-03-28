import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Aluno from './aluno.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Plano from './plano.js'

export default class Assinatura extends BaseModel {
  static table = 'academia.assinatura'
  @column({isPrimary:true})
  declare aluno_usuario_cpf: number

  @column()
  declare status : string

  @column()
  declare plano_idplano: number

  @belongsTo(()=>Aluno,{
    foreignKey:'aluno_usuario_cpf',
    localKey: 'usuario_cpf'
  })
  declare aluno:BelongsTo<typeof Aluno>

  @belongsTo(()=>Plano,{
    foreignKey: 'plano_idplano',
    localKey: 'idplano'
  })
  declare plano:BelongsTo<typeof Plano>

}
