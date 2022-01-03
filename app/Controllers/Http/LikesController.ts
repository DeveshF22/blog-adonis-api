import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Like from 'App/Models/Like';

export default class LikesController {
  public async index({ auth, params }: HttpContextContract) {
    await auth.use('api').authenticate();

    const { id: postId } = params;

    const likes = await Like.query().where('post_id', postId);

    return likes;
  }

  public async like({ auth, params, response }: HttpContextContract) {
    await auth.use('api').authenticate();

    const { id: postId } = params;
    const userId = auth.user?.id || 0;

    const like = await Like.query().where('post_id', postId).where('user_id', userId).first();

    if (!like) {
      await Like.create({ postId, userId });

      return response.created({ message: 'Post liked!' });
    }

    await like.delete();

    return { message: 'Post unliked!' };
  }
}
