const express = require("express");

const bodyParser = require("body-parser"); // json 포맷을 읽을 수 있게

const server = express();

server.use(bodyParser.json());

// dummy database
// CRUD
const users = [
  {
    id: "asdfasdf",
    name: "dammy",
    email: "dammy@naver.com",
  },
  {
    id: "fdfdf999",
    name: "janny",
    email: "lovely_janny@naver.com",
  },
];
// 라우팅 메소드 실행순서 주의 : 때에따라 순서 바뀌면 실행안됨.
server.get("/api/users", (req, res) => {
  res.json(users);
});

server.get("/api/users/:id", (req, res) => {
  // console.log(req.params.id)
  const user = users.find((user) => {
    // 제일먼저 찾은  true 유저를 return
    return user.id === req.params.id;
  });

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ errorMessage: "user was not found!" });
  }
});

server.post("/api/users", (req, res) => {
  users.push(req.body);
  res.json(users);
});

server.put("/api/users/:id", (req, res) => {
  let foundInd = users.findIndex((user) => user.id === req.params.id);
  // 찾으면 index 반환, 못찾으면 -1
  if (foundInd === -1) {
    res.status(404).json({ errorMessage: "user was not found!" });
  } else {
    users[foundInd] = { ...users[foundInd], ...req.body };
    res.json(users[foundInd]);
  }
});

server.delete("/api/users/:id", (req, res) => {
  let foundInd = users.findIndex((user) => user.id === req.params.id);

  if(foundInd === -1) {
    res.status(404).json({errorMessage: 'user was not found!!'})
  } else {
    let foundUser = users.splice(foundInd, 1);
    res.json(foundUser[0])
  }
});
server.listen(3000, () => {
  console.log("============ server is on! =============");
});
