// Router는 특정 요청을 받는 곳
import express from "express";
import { body } from "express-validator";
import * as tweetController from "../controller/tweet.js";
import { validate } from "../middleware/validator.js";
import { isAuth } from "../middleware/auth.js";

const router = express.Router();

const validateTweet = [
  body("text")
    .trim()
    .isLength({ min: 3 })
    .withMessage("text는 3글자 작성해야합니다."),
  validate,
];

// GET /tweets
// GET /tweets?username=:username
router.get("/", isAuth, tweetController.getTweets);

// GET /tweets/:id
router.get("/:id", isAuth, tweetController.getTweet);

// POST /tweets/:id
router.post("/", isAuth, validateTweet, tweetController.createTweet);

// PUT /tweets/:id
router.put("/:id", isAuth, validateTweet, tweetController.updateTweet);

// DELETE /tweets/:id
router.delete("/:id", isAuth, tweetController.deleteTweet);

export default router;
