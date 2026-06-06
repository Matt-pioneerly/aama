const CLIENT_ID = process.env.GITHUB_CLIENT_ID;

module.exports = (req, res) => {
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    scope: "repo,user",
    state: Math.random().toString(36).substring(2),
  });
  res.redirect(`https://github.com/login/oauth/authorize?${params}`);
};
