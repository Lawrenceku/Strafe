import { postgres_password } from "./config";

export default {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: postgres_password,
    DB: "strafe",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };