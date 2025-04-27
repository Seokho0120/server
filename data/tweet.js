// Data는 data

let tweets = [
  {
    id: "1",
    text: "첫번쨰 트윗",
    createdAt: Date.now().toString(),
    name: "seokho",
    username: "seokori",
    url: "https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png",
  },
  {
    id: "2",
    text: "하이!",
    createdAt: Date.now().toString(),
    name: "Bob",
    username: "bob",
  },
];

export function getAll() {
  return tweets;
}

export function getAllByUsername(username) {
  return tweets.filter((tweet) => tweet.username === username);
}

export function getById(id) {
  return tweets.find((tweet) => tweet.id === id);
}

export function create(text, name, username) {
  const tweet = {
    id: Date.now().toString(),
    text,
    createAt: new Date(),
    name,
    username,
  };

  tweets = [tweet, ...tweets];
  return tweet;
}

export function update(id, text) {
  const tweet = tweets.find((tweet) => tweet.id === id);
  if (tweet) {
    tweet.text = text;
  }

  return tweet;
}

export function remove(id) {
  tweets.filter((tweet) => tweet.id !== id);
}
