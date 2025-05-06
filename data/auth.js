// abcd1234: $2b$12$0v1x5j4z3Q6Z5Y8g7G9c1OaXk5J6e4q3F5Z5e5e5e5e5e5e5e5e5e
let users = [
  {
    id: "1",
    username: "bob",
    password: "$2b$12$eFJz4QzmTLujYOodXiMtV.KCGhr6l0Fq0dOTzr0KSmeH9pcE8OS1e",
    name: "Bob",
    email: "bob@gmail.com",
    url: "https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png",
  },
];

export async function findByUsername(username) {
  return users.find((user) => user.username === username);
}

export async function findById(id) {
  return users.find((user) => user.id === id);
}

export async function createUser(user) {
  const created = { ...user, id: Date.now().toString() };
  users.push(created);
  return created.id;
}
