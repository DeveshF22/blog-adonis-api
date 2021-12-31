import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class AlterUsersRemoveRememberMeTokens extends BaseSchema {
  protected tableName = 'users';

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('remember_me_token');
    });
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('remember_me_token').nullable();
    });
  }
}
