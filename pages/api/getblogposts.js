const { google } = require("googleapis");

// Each API may support multiple version. With this sample, we're getting
// v3 of the blogger API, and using an API key to authenticate.
const blogger = google.blogger({
  version: "v3",
  auth: "AIzaSyBZpQHcaWIhZ0pBkCBBvMZFMc9S62Ouwh0",
});

const params = {
  blogId: "5320107706403649567",
};

async function runSample() {
  const res = await blogger.posts.list(params);
  // console.log(res.data);
  return res.data;
}

export default async (req, res) => {
  try {
    const data = await runSample();
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json({ data: data });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.errors[0].message });
  }
};
