module.exports = appInfo => {
  const config = exports = {};

  config.keys = appInfo.name + '_1234567890';

  // 中间件配置
  config.middleware = [ 'errorHandler' ];

  // 安全配置
  config.security = {
    csrf: {
      enable: false,
    },
  };

  // JWT配置
  config.jwt = {
    secret: 'your-secret-key',
    expiresIn: '1d',
  };

  // 错误处理配置
  config.errorHandler = {
    match: '/api',
  };

  // 数据库配置
  config.sequelize = {
    dialect: 'mysql',
    host: '62.234.16.167',
    port: 3306,
    database: 'electron',
    username: 'electron_server',
    password: 'Yft997214',
    timezone: '+08:00',
  };

  return config;
};
