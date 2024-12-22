module.exports = app => {
  const { STRING, DATE, INTEGER } = app.Sequelize;

  const User = app.model.define('user', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      comment: '用户ID，自增主键',
    },
    username: {
      type: STRING(50),
      allowNull: false,
      comment: '用户名，支持中文、数字、英文字母等任意字符',
    },
    account_id: {
      type: STRING(10),
      allowNull: false,
      unique: true,
      validate: {
        len: [ 6, 10 ],
        isNumeric: true,
      },
      comment: '账号ID，6-10位数字',
    },
    password: {
      type: STRING(100),
      allowNull: false,
      comment: '密码，8-16位字母数字特殊字符组合',
    },
    security_key: {
      type: STRING(6),
      allowNull: false,
      validate: {
        len: [ 6, 6 ],
        isNumeric: true,
      },
      comment: '安全密钥，固定6位数字',
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

  return User;
};
