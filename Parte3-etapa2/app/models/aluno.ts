import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import Usuario from './usuario.js'
import type {  HasOne } from '@adonisjs/lucid/types/relations' // Importação correta

export default class Aluno extends BaseModel {
  static table = 'aluno'

  @column({ isPrimary: true })
  declare matricula: number

  @column()
  declare usuario_cpf: number

  @hasOne(() => Usuario, {
    foreignKey: 'cpf', // defaults to userId
    localKey: 'usuario_cpf'
  })
  declare usaurio: HasOne<typeof Usuario>
}
