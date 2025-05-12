import { db } from "../db/database.js";

const SELECT_JOIN =
  "SELECT tw.id, tw.text, tw.createdAt, tw.userId, us.username, us.url FROM tweets as tw JOIN users as us ON tw.userId=us.id";
// FROM tweets as tw JOIN users as -> tweets과 users을 함께 묶어서 가져옴, tw.userId=us.id이 같을때
const ORDER_DESC = " ORDER BY tw.createdAt DESC";

export async function getAll() {
  return db
    .execute(`${SELECT_JOIN} ${ORDER_DESC}`) //
    .then((result) => result[0]);
}

export async function getAllByUsername(username) {
  return db
    .execute(`${SELECT_JOIN} WHERE username=? ${ORDER_DESC}`, [username]) // WHERE는 SQL문에서 조건을 지정하는 부분. username이 같은 것만 가져옴
    .then((result) => result[0]);
}

export async function getById(id) {
  return db
    .execute(`${SELECT_JOIN} WHERE tw.id=?`, [id]) //
    .then((result) => result[0][0]);
}

export async function create(text, userId) {
  return db
    .execute(
      "INSERT INTO tweets (text, createdAt, userId) VALUES (?, ?, ?)", //
      [text, new Date(), userId]
    )
    .then((result) => getById(result[0].insertId));
  // result[0].insertId는 방금 생성된 트윗의 id를 가져오는 것
}

export async function update(id, text) {
  return db
    .execute("UPDATE tweets SET text=? WHERE id=?", [text, id]) //
    .then(() => getById(id));
  // id를 통해서 방금 수정된 트윗을 가져오는 것
}

export async function remove(id) {
  return db.execute("DELETE FROM tweets WHERE id=?", [id]);
}
