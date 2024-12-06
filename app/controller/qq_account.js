const { Controller } = require('egg');
/**
 * QQ账号控制器
 * 处理所有与QQ账号相关的HTTP请求，包括账号管理和数据统计
 * @class QQAccountController
 */
class QQAccountController extends Controller {
  /**
   * 创建新的QQ账号
   * @async
   * @param {Object} ctx - Egg.js 上下文对象
   * @param {string} ctx.request.body.qqNumber - QQ号码
   * @param {string} ctx.request.body.cookie - QQ登录Cookie
   * @return {Promise<Object>} 创建的QQ账号信息
   * @throws {ValidationError} 当请求参数验证失败时
   */
  async create() {
    const { ctx } = this;
    ctx.validate({
      qqNumber: { type: 'string', required: true },
      cookie: { type: 'string', required: true },
    });

    const account = await ctx.service.qqAccount.create(ctx.state.user.id, ctx.request.body);
    ctx.status = 201;
    ctx.body = { success: true, data: account };
  }

  /**
   * 更新QQ账号信息
   * @async
   * @param {Object} ctx - Egg.js 上下文对象
   * @param {string} ctx.params.id - QQ账号ID
   * @param {Object} ctx.request.body - 更新的账号信息
   * @param {string} ctx.request.body.cookie - 新的Cookie值
   * @return {Promise<Object>} 更新后的QQ账号信息
   * @throws {Error} 当QQ账号不存在时
   */
  async update() {
    const { ctx } = this;
    const { id } = ctx.params;

    ctx.validate({
      cookie: { type: 'string', required: true },
    });

    const account = await ctx.service.qqAccount.update(id, ctx.request.body);
    ctx.body = { success: true, data: account };
  }

  /**
   * 获取当前用户的所有QQ账号列表
   * @async
   * @param {Object} ctx - Egg.js 上下文对象
   * @return {Promise<Object>} 包含QQ账号列表的响应对象
   */
  async list() {
    const { ctx } = this;
    const accounts = await ctx.service.qqAccount.findByUserId(ctx.state.user.id);
    ctx.body = { success: true, data: accounts };
  }

  /**
   * 获取QQ账号在指定时间段内的统计数据
   * @async
   * @param {Object} ctx - Egg.js 上下文对象
   * @param {string} ctx.query.startDate - 统计开始日期
   * @param {string} ctx.query.endDate - 统计结束日期
   * @return {Promise<Object>} 包含统计数据的响应对象
   */
  async getStats() {
    const { ctx } = this;
    const { startDate, endDate } = ctx.query;

    const stats = await ctx.service.qqAccount.getAccountStats(
      ctx.state.user.id,
      new Date(startDate),
      new Date(endDate)
    );
    ctx.body = { success: true, data: stats };
  }

  /**
 * 更新QQ账号统计数据
 * @async
 * @param {Object} ctx - Egg.js 上下文对象
 * @param {string} ctx.params.id - QQ账号ID
 * @param {Object} ctx.request.body - 统计数据
 * @param {number} ctx.request.body.qbBalance - QB余额
 * @param {number} ctx.request.body.creditScore - 信用分
 * @return {Promise<Object>} 更新后的统计数据
 */
  async updateStats() {
    const { ctx } = this;
    const { id: qqAccountId } = ctx.params;

    // 验证请求参数
    ctx.validate({
      qbBalance: { type: 'number', required: true },
      creditScore: { type: 'number', required: true, min: 0 },
    });

    const result = await ctx.service.qqAccount.updateStats(qqAccountId, ctx.request.body);
    ctx.body = {
      success: true,
      data: result,
    };
  }

  /**
   * 获取QQ账号在指定时间段内的分析数据
   * @async
   * @param {Object} ctx - Egg.js 上下文对象
   * @param {string} ctx.query.startDate - 分析开始日期
   * @param {string} ctx.query.endDate - 分析结束日期
   * @return {Promise<Object>} 包含分析数据的响应对象，包括QB余额变化和信用分统计
   */
  async getAnalytics() {
    const { ctx } = this;
    const { startDate, endDate } = ctx.query;

    const analytics = await ctx.service.qqStatsHistory.getAnalytics(
      ctx.state.user.id,
      new Date(startDate),
      new Date(endDate)
    );
    ctx.body = { success: true, data: analytics };
  }
}

module.exports = QQAccountController;
