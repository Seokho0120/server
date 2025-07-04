// Controller는 비지니스 logic만
import { get } from "http";
import * as tweetRepository from "../data/tweet.js";
import { getSocketIO } from "../connection/socket.js";

export async function getTweets(req, res) {
  const username = req.query.username;
  const data = await (username
    ? tweetRepository.getAllByUsername(username)
    : tweetRepository.getAll());
  res.status(200).json(data);
}

export async function getTweet(req, res) {
  const id = req.params.id;
  const tweet = await tweetRepository.getById(id);
  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found` });
  }
}

export async function createTweet(req, res, next) {
  const { text } = req.body;
  const tweet = await tweetRepository.create(text, req.userId);
  res.status(201).json(tweet);
  getSocketIO().emit("tweets", tweet); // 소켓에 emit
}

export async function updateTweet(req, res) {
  const id = req.params.id;
  const text = req.body.text;
  const tweet = await tweetRepository.getById(id); // 해당 id의 tweet을 가져옴
  if (!tweet) {
    return res.sendStatus(404); // Not Found
  }
  if (tweet.userId !== req.userId) {
    return res.sendStatus(403); // Forbidden
  }

  const updated = await tweetRepository.update(id, text);
  res.status(200).json(updated);
}

export async function deleteTweet(req, res) {
  const id = req.params.id;
  const tweet = await tweetRepository.getById(id); // 해당 id의 tweet을 가져옴
  if (!tweet) {
    return res.sendStatus(404); // Not Found
  }
  if (tweet.userId !== req.userId) {
    return res.sendStatus(403); // Forbidden
  }

  await tweetRepository.remove(id);
  res.sendStatus(204);
}
