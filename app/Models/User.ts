import { DateTime } from 'luxon';
import Hash from '@ioc:Adonis/Core/Hash';
import { column, beforeSave, BaseModel, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm';
import Post from './Post';
import Like from './Like';
import Comment from './Comment';

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public email: string;

  @column({ serializeAs: null })
  public password: string;

  @hasMany(() => Post)
  public posts: HasMany<typeof Post>;

  @hasMany(() => Like)
  public likes: HasMany<typeof Like>;

  @hasMany(() => Comment)
  public comments: HasMany<typeof Comment>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password);
    }
  }
}
