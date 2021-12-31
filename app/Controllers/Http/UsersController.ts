import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from 'App/Models/User';
import { rules, schema } from '@ioc:Adonis/Core/Validator';

export default class UsersController {
  public async register({ request, response }: HttpContextContract) {
    const validations = await schema.create({
      email: schema.string({}, [rules.email(), rules.unique({ table: 'users', column: 'email' })]),
      password: schema.string({}, [rules.confirmed()]),
    });

    const data = await request.validate({ schema: validations });
    const user = await User.create(data);

    return response.created(user);
  }

  public async login({ auth, request, response }: HttpContextContract) {
    const email = await request.input('email');
    const password = await request.input('password');

    try {
      const token = await auth.use('api').attempt(email, password, { expiresIn: '24hours' });
      return token.toJSON();
    } catch {
      return response.badRequest({ error: { message: 'Invalid credentials' } });
    }
  }

  public async logout({ auth }: HttpContextContract) {
    await auth.logout();
    return { message: 'Successfully logged out' };
  }
}
