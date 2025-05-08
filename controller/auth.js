import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as userRepository from "../data/auth.js";
import { config } from "../config.js";

export async function signup(req, res) {
  const { username, password, name, email, url } = req.body;
  const found = await userRepository.findByUsername(username);
  if (found) {
    return res.status(409).json({ message: `${username} already exists` });
  }

  // 새로운 사용자 생성
  const hashed = await bcrypt.hash(password, config.bcrypt.saltRounds); // 비밀번호 해싱
  const userId = await userRepository.createUser({
    username,
    password: hashed,
    name,
    email,
    url,
  });
  const token = createJwtToken(userId);
  res.status(200).json({ token, username });
}

export async function login(req, res) {
  const { username, password } = req.body;
  const user = await userRepository.findByUsername(username);
  if (!user) {
    return res.status(401).json({ message: "Invalid user or password" });
  }

  // DB에 저장된 해싱된 비밀번호와 사용자 입력 비밀번호 비교
  // bcrypt.compare는 비밀번호가 일치하면 true, 일치하지 않으면 false를 반환
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ message: "Invalid user or password" });
  }

  const token = createJwtToken(user.id);
  res.status(200).json({ token, username });
}

function createJwtToken(id) {
  return jwt.sign({ id }, config.jwt.secretKey, {
    expiresIn: config.jwt.expiresInSec,
  });
}

export async function me(req, res) {
  const user = await userRepository.findById(req.userId);
  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }
  res.status(200).json({ token: req.token, username: user.username });
}
