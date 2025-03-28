import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Assinatura from './assinatura.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Plano extends BaseModel {
  static table = 'academia.plano'
  @column({ isPrimary: true })
  declare idplano: number

  @column()
  declare duracao: number

  @column()
  declare status: boolean

  @column()
  declare nome: string

  @column()
  declare valor: number

  @hasMany(()=>Assinatura,{
    localKey:'idplano',
    foreignKey: 'plano_idplano'
  })
  declare assinatura: HasMany<typeof Assinatura>

}
