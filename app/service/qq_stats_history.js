const { Service } = require('egg');

class QQStatsHistoryService extends Service {
  async create(data) {
    return await this.ctx.model.QQStatsHistory.create(data);
  }

  async getAnalytics(userId, startDate, endDate) {
    const { ctx } = this;
    const { Op } = ctx.app.Sequelize;

    // 获取QB总额变化
    const qbStats = await ctx.model.QQStatsHistory.findAll({
      attributes: [
        'recordDate',
        [ ctx.app.Sequelize.fn('SUM', ctx.app.Sequelize.col('qbBalance')), 'totalQB' ],
      ],
      include: [{
        model: ctx.model.QQAccount,
        where: { userId },
        attributes: [],
      }],
      where: {
        recordDate: { [Op.between]: [ startDate, endDate ] },
      },
      group: [ 'recordDate' ],
      order: [[ 'recordDate', 'ASC' ]],
    });

    // 获取信用分>=350的账号数量
    const creditStats = await ctx.model.QQStatsHistory.findAll({
      attributes: [
        'recordDate',
        [ ctx.app.Sequelize.fn('COUNT', ctx.app.Sequelize.col('id')), 'validAccountCount' ],
      ],
      include: [{
        model: ctx.model.QQAccount,
        where: { userId },
        attributes: [],
      }],
      where: {
        recordDate: { [Op.between]: [ startDate, endDate ] },
        creditScore: { [Op.gte]: 350 },
      },
      group: [ 'recordDate' ],
      order: [[ 'recordDate', 'ASC' ]],
    });

    return {
      qbStats,
      creditStats,
    };
  }
}

module.exports = QQStatsHistoryService;
