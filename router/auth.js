import express from "express";
import { body } from "express-validator";
import { validate } from "../middleware/validator.js";
import * as authController from "../controller/auth.js";

const router = express.Router();

const validateCredential = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("username은 5글자 작성해야합니다."),
  body("password")
    .trim()
    .isLength({ min: 5 })
    .withMessage("비밀번호는 5글자 작성해야합니다."),
  validate,
];

const validateSignup = [
  ...validateCredential,
  body("name").notEmpty().withMessage("이름이 없습니다."),
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("이메일 형식이 맞지 않습니다."),
  body("url")
    .isURL()
    .withMessage("URL 형식이 맞지 않습니다.")
    .optional({ nullable: true, checkFalsy: true }), // url은 옵션이기 때문에 "", null 허용
  validate,
];

router.post("/signup", validateSignup, authController.signup);
router.post("/login", validateCredential, authController.login);

export default router;
