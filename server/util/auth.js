const { sign } = require("jsonwebtoken");

exports.createAccessToken = (user) => {
  return sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30m",
  });
};

exports.createRefreshToken = (user) => {
  return sign(
    { userId: user.id, tokenVersion: user.tokenVersion },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

exports.sendRefreshToken = (res, token) => {
  res.cookie("jid", token, {
    httpOnly: true,
    // path: "/refresh_token",
  });
};
