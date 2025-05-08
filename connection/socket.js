import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import { config } from "../config.js";

class Socket {
  constructor(server) {
    this.io = new Server(server, {
      cors: {
        origin: "*",
      },
    });

    this.io.use((socket, next) => {
      // token은 반드시 handshake.auth.token에 담겨야 함
      // 그 이유는 보안상으로 socket.io는 cors를 지원하지 않음
      // cors를 지원하지 않기 때문에, 클라이언트에서 socket.io를 사용할 때 반드시 auth를 통해서 인증을 해야 함
      // auth를 통해서 인증을 하지 않으면, socket.io는 연결을 거부함
      // 따라서, auth를 통해서 인증을 하지 않으면, socket.io는 연결을 거부함

      const token = socket.handshake.auth.token;
      if (!token) {
        return next(new Error("Authentication error"));
      }
      jwt.verify(token, config.jwt.secret, (err, decoded) => {
        if (err) {
          return next(new Error("Authentication error"));
        }
        next();
      });
    });

    this.io.on("connection", (socket) => {
      console.log("Socket client connected(id):", socket.id);
    });
  }
}

let socket;
export function initSocket(server) {
  if (!socket) {
    socket = new Socket(server);
  }
}
export function getSocketIO() {
  if (!socket) {
    throw new Error("Please call init socket first");
  }
  return socket.io;
}
