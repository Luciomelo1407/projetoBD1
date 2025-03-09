import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'usuario'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('CPF').notNullable()
      table.string('telefone').notNullable()
      table.date('dataNascimento').notNullable()
      table.string('email').notNullable()
      table.string('senha').notNullable()
      table.string('primeiroNome').notNullable()
      table.string('sobrenome')

    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
