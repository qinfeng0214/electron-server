module.exports = app => {
  const { router, controller, middleware } = app;
  const jwt = middleware.jwt();

  router.prefix('/api');

  // 用户认证路由
  router.post('/register', controller.user.register);
  router.post('/login', controller.user.login);
  router.post('/reset-password', controller.user.resetPassword);

  // QQ账号管理路由
  router.post('/qq-accounts', jwt, controller.qqAccount.create);
  router.put('/qq-accounts/:id', jwt, controller.qqAccount.update);
  router.get('/qq-accounts', jwt, controller.qqAccount.list);

  // QQ统计数据路由
  router.get('/qq-accounts/stats', jwt, controller.qqAccount.getStats);
  router.get('/qq-accounts/analytics', jwt, controller.qqAccount.getAnalytics);

  // QQ数据更新路由
  router.post('/qq-accounts/:id/stats', jwt, controller.qqAccount.updateStats);
};
