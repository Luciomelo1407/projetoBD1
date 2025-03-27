import { DateTime } from 'luxon'
import { BaseModel, column} from '@adonisjs/lucid/orm'

export default class Usuario extends BaseModel {
  static table = 'usuario'

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


}
