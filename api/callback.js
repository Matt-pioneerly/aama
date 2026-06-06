const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

module.exports = async (req, res) => {
  const { code } = req.query;

  const response = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code,
    }),
  });

  const data = await response.json();
  const token = data.access_token;

  const script = `
    <script>
      (function() {
        function receiveMessage(e) {
          console.log("receiveMessage %o", e);
          window.opener.postMessage(
            'authorization:github:success:{"token":"${token}","provider":"github"}',
            e.origin
          );
        }
        window.addEventListener("message", receiveMessage, false);
        window.opener.postMessage("authorizing:github", "*");
      })()
    </script>
  `;

  res.setHeader("Content-Type", "text/html");
  res.send(script);
};
