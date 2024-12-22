const { Service } = require('egg');

class QQAccountService extends Service {
  async create(userId, qqAccountDTO) {
    return await this.ctx.model.QQAccount.create({
      userId,
      ...qqAccountDTO,
    });
  }

  async update(id, updateDTO) {
    const account = await this.ctx.model.QQAccount.findByPk(id);
    if (!account) {
      throw new Error('QQ账号不存在');
    }
    return await account.update(updateDTO);
  }

  async findByUserId(userId) {
    return await this.ctx.model.QQAccount.findAll({
      where: { userId },
      include: [{
        model: this.ctx.model.QQStatsHistory,
        limit: 1,
        order: [[ 'recordDate', 'DESC' ]],
      }],
    });
  }

  async updateStats(qqaccount_id, statsDTO) {
    return await this.ctx.service.qqStatsHistory.create({
      qqaccount_id,
      ...statsDTO,
      recordDate: new Date(),
    });
  }

  async getAccountStats(userId, startDate, endDate) {
    const { ctx } = this;
    const { Op } = ctx.app.Sequelize;

    return await ctx.model.QQStatsHistory.findAll({
      include: [{
        model: ctx.model.QQAccount,
        where: { userId },
      }],
      where: {
        recordDate: {
          [Op.between]: [ startDate, endDate ],
        },
      },
      order: [[ 'recordDate', 'ASC' ]],
    });
  }
}

module.exports = QQAccountService;
