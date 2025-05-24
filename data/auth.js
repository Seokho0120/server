import SQ, { DataTypes } from "sequelize";
import { db, sequelize } from "../db/database.js";

const dataTypes = SQ.DataTypes;
const User = sequelize.define(
  // sequelize를 사용해서 user 테이블을 정의
  // MYSQL에 users 테이블이 생성, 각 컬럼을 정의하는거임
  "user",
  {
    id: {
      type: dataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: dataTypes.STRING(45),
      allowNull: false,
    },
    password: {
      type: dataTypes.STRING(128),
      allowNull: false,
    },
    name: {
      type: dataTypes.STRING(128),
      allowNull: false,
    },
    email: {
      type: dataTypes.STRING(128),
      allowNull: false,
    },
    url: DataTypes.TEXT,
  },
  { timestamps: false }
);

export async function findByUsername(username) {
  // findOne는 조건에 맞는 첫번째 값을 반환함
  // username이 username인 값을 찾음
  return User.findOne({ where: { username: username } });
}

export async function findById(id) {
  // findByPk(Primary Key)는 기본키로 찾는 함수
  return User.findByPk(id);
}

export async function createUser(user) {
  return User.create(user).then((data) => data.dataValues.id);

  const { username, password, name, email, url } = user;
  return db
    .execute(
      "INSERT INTO users (username, password, name, email, url) VALUES (? ,? ,? ,? ,?)",
      [username, password, name, email, url]
    )
    .then((result) => {
      return result[0].insertId;
    });
}
