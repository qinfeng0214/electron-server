const { Controller } = require('egg');

class UserController extends Controller {
  async register() {
    const { ctx } = this;
    ctx.validate({
      username: 'string',
      account_id: { type: 'string', format: /^\d{6,10}$/ },
      password: { type: 'string', min: 8, max: 16 },
      security_key: { type: 'string', format: /^\d{6}$/ },
    });

    const user = await ctx.service.user.create(ctx.request.body);
    ctx.body = { success: true, data: user };
  }

  async login() {
    const { ctx } = this;
    const { account_id, password } = ctx.request.body;

    const user = await ctx.service.user.login(account_id, password);
    const token = ctx.app.jwt.sign({ id: user.id }, ctx.app.config.jwt.secret);

    ctx.body = { success: true, token };
  }

  async resetPassword() {
    const { ctx } = this;
    const { account_id, security_key, password } = ctx.request.body;

    await ctx.service.user.resetPassword(account_id, security_key, password);
    ctx.body = { success: true };
  }
}

module.exports = UserController;
