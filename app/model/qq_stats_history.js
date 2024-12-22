module.exports = app => {
  const { INTEGER, DECIMAL, DATE } = app.Sequelize;

  const QQStatsHistory = app.model.define('qq_stats_history', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      comment: '统计记录ID，自增主键',
    },
    qqaccount_id: {
      type: INTEGER,
      allowNull: false,
      comment: '关联的QQ账号ID，外键关联qq_accounts表',
    },
    qbBalance: {
      type: DECIMAL(10, 2),
      allowNull: false,
      comment: 'Q币余额',
    },
    creditScore: {
      type: INTEGER,
      allowNull: false,
      comment: '信用分数',
    },
    recordDate: {
      type: DATE,
      allowNull: false,
      comment: '记录日期',
    },
    createdAt: {
      type: DATE,
      comment: '创建时间',
    },
  });

  return QQStatsHistory;
};
