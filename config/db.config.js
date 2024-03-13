module.exports = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "amos1023",
    DB: "forex",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 300000,
      idle: 1000000
    }
  };