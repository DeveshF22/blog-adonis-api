import { DateTime } from 'luxon';
import {
  BaseModel,
  column,
  belongsTo,
  BelongsTo,
  hasMany,
  HasMany,
  beforeFetch,
  beforeFind,
  ModelQueryBuilderContract,
} from '@ioc:Adonis/Lucid/Orm';
import User from './User';
import Like from './Like';
import Comment from './Comment';

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public title: string;

  @column()
  public content: string;

  @column()
  public userId: number;

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>;

  @hasMany(() => Like)
  public likes: HasMany<typeof Like>;

  @hasMany(() => Comment)
  public comments: HasMany<typeof Comment>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @beforeFetch()
  @beforeFind()
  public static fetchLikes(query: ModelQueryBuilderContract<typeof Post>) {
    query.preload('likes');
    query.preload('comments');
  }
}
