import mysql from "mysql2";
import { config } from "../config.js";
import SQ from "sequelize";

const { host, user, database, password } = config.db;
export const sequelize = new SQ.Sequelize(database, user, password, {
  host,
  dialect: "mysql", // 어떤 데이터베이스를 사용할 것인지
});

// 예전꺼, 삭제 예정
const pool = mysql.createPool({
  host,
  user,
  database,
  password,
});

export const db = pool.promise();
