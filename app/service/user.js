const { Service } = require('egg');
const bcrypt = require('bcryptjs');

class UserService extends Service {
  async create(userDTO) {
    const { ctx } = this;
    userDTO.password = await bcrypt.hash(userDTO.password, 10);
    return await ctx.model.User.create(userDTO);
  }

  async login(account_id, password) {
    const { ctx } = this;
    const user = await ctx.model.User.findOne({ where: { account_id } });
    if (!user) throw new Error('用户不存在');

    const valid = await bcrypt.compareSync(password, user.password);
    if (!valid) throw new Error('密码错误');

    return user;
  }

  async resetPassword(account_id, security_key, newPassword) {
    const user = await this.ctx.model.User.findOne({ where: { account_id } });
    if (!user) throw new Error('用户不存在');
    if (user.security_key !== security_key) throw new Error('安全密钥错误');

    const password = await bcrypt.hash(newPassword, 10);
    return await user.update({ password });
  }
}

module.exports = UserService;
