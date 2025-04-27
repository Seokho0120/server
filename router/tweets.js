import express from "express";
import * as tweetController from "../controller/tweet.js";

// Router는 특정 요청을 받는 곳

const router = express.Router();

// GET /tweets
// GET /tweets?username=:username
router.get("/", tweetController.getTweets); // 함수 실행이 아니라 연결만하는거라서 getTweets형태임, getTweets() x

// GET /tweets/:id
router.get("/:id", tweetController.getTweet);

// POST /tweets/:id
router.post("/", tweetController.createTweet);

// PUT /tweets/:id
router.put("/:id", tweetController.updateTweet);

// DELETE /tweets/:id
router.delete("/:id", tweetController.deleteTweet);

export default router;
