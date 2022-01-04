import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { schema, rules } from '@ioc:Adonis/Core/Validator';
import Comment from 'App/Models/Comment';

export default class CommentsController {
  public async index({ auth, params }: HttpContextContract) {
    await auth.use('api').authenticate();

    const { id: postId } = params;

    const comments = await Comment.query().where('post_id', postId);

    return comments;
  }

  public async store({ auth, params, request, response }: HttpContextContract) {
    await auth.use('api').authenticate();

    const { id: postId } = params;

    const userId = auth.user?.id || 0;

    const validations = schema.create({
      content: schema.string({ trim: true }, [rules.minLength(5), rules.maxLength(20)]),
    });

    const data = await request.validate({ schema: validations });

    const comment = await Comment.create({ ...data, postId, userId });

    return response.created(comment);
  }

  public async show({ auth, params }: HttpContextContract) {
    await auth.use('api').authenticate();

    const { post_id: postId, comment_id: commentId } = params;

    const comment = await Comment.query().where('id', commentId).where('post_id', postId).first();
    return comment;
  }

  public async update({ auth, params, request, response }: HttpContextContract) {
    await auth.use('api').authenticate();

    const { post_id: postId, comment_id: commentId } = params;
    const userId = auth.user?.id || 0;

    const comment = await Comment.query().where('post_id', postId).where('id', commentId).first();

    if (comment?.userId === userId) {
      const validations = schema.create({
        content: schema.string({ trim: true }, [rules.minLength(5), rules.maxLength(20)]),
      });

      const data = await request.validate({ schema: validations });

      comment.merge(data);
      await comment.save();

      return comment;
    } else {
      return response.unauthorized({ message: 'User not authorized' });
    }
  }

  public async destroy({ auth, params, response }: HttpContextContract) {
    await auth.use('api').authenticate();

    const { post_id: postId, comment_id: commentId } = params;
    const userId = auth.user?.id || 0;

    const comment = await Comment.query().where('post_id', postId).where('id', commentId).first();

    if (comment?.userId === userId) {
      await comment.delete();

      return response.noContent();
    } else {
      return response.unauthorized({ message: 'User not authorized' });
    }
  }
}
