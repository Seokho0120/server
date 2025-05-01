import jwt from "jsonwebtoken";
import * as userRepository from "../data/auth.js";

const AUTH_ERROR = { message: "Authorization Error" };

export async function isAuth(req, res, next) {
  const authHeader = req.get("Authorization");
  if (!authHeader && authHeader.startsWith("Bearer ")) {
    return res.status(401).json(AUTH_ERROR);
  }

  const token = authHeader.split(" ")[1];
  jwt.verify(
    token,
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE3NDYxMTIxNDQzODQiLCJpYXQiOjE3NDYxMTIxNDQsImV4cCI6MTc0NjI4NDk0NH0.fLMz5hISlpx7AaSINqKtroOLHWAuDnAxh-pc1Y_q08U",
    async (error, decoded) => {
      if (error) {
        return res.status(401).json(AUTH_ERROR);
      }
      const user = await userRepository.findById(decoded.id);
      if (!user) {
        return res.status(401).json(AUTH_ERROR);
      }
      req.userId = user.id; // req.customData
      next();
    }
  );
}
