/**
 * JWT认证中间件
 * 验证请求头中的token，并将解析后的用户信息添加到ctx.state.user中
 * @param {Object} options - 中间件配置选项
 * @return {Function} 中间件函数
 */
module.exports = () => {
  return async function jwt(ctx, next) {
    // 获取token
    const token = ctx.request.header.authorization;
    if (!token) {
      ctx.status = 401;
      ctx.body = {
        success: false,
        message: '登录票据无效',
      };
      return;
    }

    try {
      // 验证token
      const tokenValue = token.replace('Bearer ', '');
      // 解析token，获取用户信息
      const user = await ctx.app.jwt.verify(tokenValue, ctx.app.config.jwt.secret);

      // 将用户信息添加到请求上下文
      ctx.state.user = user;

      await next();
    } catch (error) {
      ctx.status = 401;
      ctx.body = {
        success: false,
        message: 'token无效或已过期',
      };
    }
  };
};
