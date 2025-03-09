import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Usuario extends BaseModel {
  @column({ isPrimary: true })
  declare CPF: number

  @column()
  declare telefone: string

  @column({
    consume: (v:string) => new Date(v),
    prepare: (v: Date) => v.toISOString()
  })
  declare dataNascimetno: Date

  @column()
  declare email: string

  @column()
  declare senha: string

  @column()
  declare primeiroNome: string

  @column()
  declare sobrenome: string
}
