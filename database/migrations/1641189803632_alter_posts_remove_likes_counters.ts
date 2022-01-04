import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class AlterPostsRemoveLikesCounters extends BaseSchema {
  protected tableName = 'posts';

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('likes_count');
    });
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('likes_count').defaultTo(0);
    });
  }
}
