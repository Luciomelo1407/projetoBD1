import { BaseModel, belongsTo, column, hasMany} from '@adonisjs/lucid/orm'
import Usuario from './usuario.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Assinatura from './assinatura.js'

export default class Aluno extends BaseModel {
  static table = 'academia.aluno'

  @column({ isPrimary: true })
  declare matricula: number

  @column()
  declare usuario_cpf: number

  @belongsTo(()=>Usuario,{
    localKey:'cpf',
    foreignKey:'usuario_cpf'
  })
  declare usuario:BelongsTo<typeof Usuario>

  @hasMany(()=>Assinatura,{
    foreignKey:'aluno_usuario_cpf',
    localKey: 'usuario_cpf'
  })
  declare assinatura:HasMany<typeof Assinatura>

}
