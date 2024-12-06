const { Controller } = require('egg');

class UserController extends Controller {
  async register() {
    const { ctx } = this;
    ctx.validate({
      username: 'string',
      accountId: { type: 'string', format: /^\d{6,10}$/ },
      password: { type: 'string', min: 8, max: 16 },
      securityKey: { type: 'string', format: /^\d{6}$/ },
    });

    const user = await ctx.service.UserService.create(ctx.request.body);
    ctx.body = { success: true, data: user };
  }

  async login() {
    const { ctx } = this;
    const { accountId, password } = ctx.request.body;

    const user = await ctx.service.UserService.login(accountId, password);
    const token = ctx.app.jwt.sign({ id: user.id }, ctx.app.config.jwt.secret);

    ctx.body = { success: true, token };
  }

  async resetPassword() {
    const { ctx } = this;
    const { accountId, securityKey, newPassword } = ctx.request.body;

    await ctx.service.UserService.resetPassword(accountId, securityKey, newPassword);
    ctx.body = { success: true };
  }
}

module.exports = UserController;
