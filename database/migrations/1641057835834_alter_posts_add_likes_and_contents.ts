import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class AlterPostsAddLikesAndContents extends BaseSchema {
  protected tableName = 'posts';

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.text('content');
      table.integer('likes_count').defaultTo(0);
    });
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('content');
      table.dropColumn('likes_count');
    });
  }
}
