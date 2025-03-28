import { DateTime } from 'luxon'
import { BaseModel, column, hasOne} from '@adonisjs/lucid/orm'
import type {  HasOne } from '@adonisjs/lucid/types/relations' // Importação correta
import Aluno from './aluno.js'

export default class Usuario extends BaseModel {
  static table = 'academia.usuario'

  @column({ isPrimary: true })
  declare cpf: number

  @column()
  declare telefone:number

  @column()
  declare datanascimento: DateTime

  @column()
  declare email: string

  @column()
  declare senha: string

  @column()
  declare primeironome: string

  @column()
  declare sobrenome: string

  @hasOne(() => Aluno, {
    foreignKey: 'usuario_cpf', // defaults to userId
    localKey: 'cpf'
  })
  declare aluno: HasOne<typeof Aluno>
}
