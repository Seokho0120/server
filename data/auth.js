import { url } from "inspector";
// abcd1234: $2b$12$0v1x5j4z3Q6Z5Y8g7G9c1OaXk5J6e4q3F5Z5e5e5e5e5e5e5e5e5e
let users = [
  {
    id: 1,
    username: "bob",
    password: "abcd1234",
    name: "Bob",
    email: "bob@gmail.com",
    url: "https://bob.com",
  },
];

export async function findByUsername(username) {
  return users.find((user) => user.username === username);
}

export async function createUser(user) {
  const created = { ...user, id: Date.now().toString() };
  users.push(created);
  return created.id;
}
