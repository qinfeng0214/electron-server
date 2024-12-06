module.exports = app => {
  const { STRING, DATE, INTEGER, TEXT } = app.Sequelize;

  const QQAccount = app.model.define('qq_account', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      comment: 'QQ账号记录ID，自增主键',
    },
    userId: {
      type: INTEGER,
      allowNull: false,
      comment: '关联的用户ID，外键关联users表',
    },
    qqNumber: {
      type: STRING(20),
      allowNull: false,
      comment: 'QQ号码',
    },
    cookie: {
      type: TEXT,
      comment: 'QQ账号Cookie信息',
    },
    createdAt: {
      type: DATE,
      comment: '创建时间',
    },
    updatedAt: {
      type: DATE,
      comment: '更新时间',
    },
  });

  return QQAccount;
};
