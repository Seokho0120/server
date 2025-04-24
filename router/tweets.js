import express from "express";

const tweets = [
  {
    id: "1",
    text: "첫번쨰 트윗",
    createdAt: Date.now().toString(),
    name: "seokho",
    username: "seokori",
    url: "https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png",
  },
];

const router = express.Router();

// GET /tweets
// GET /tweets?username=:username
router.get("/", (req, res, next) => {
  const username = req.query.username;
  const data = username
    ? tweets.filter((t) => t.username === username)
    : tweets;
  res.status(200).json(data);
});

// GET /tweets/:id
// POST /tweets/:id
// PUT /tweets/:id
// DELETE /tweets/:id
export default router;
