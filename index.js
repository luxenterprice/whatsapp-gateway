import express from "express";
import venom from "venom-bot";

const app = express();
app.use(express.json());

// Create WhatsApp session
venom
  .create({
    session: "luxs-session",
    headless: true,
    browserArgs: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-accelerated-2d-canvas",
      "--no-first-run",
      "--no-zygote",
      "--single-process",
      "--disable-gpu"
    ]
  })
  .then(client => start(client))
  .catch(e => console.log("Error starting Venom-Bot:", e));

function start(client) {
  app.post("/send", async (req, res) => {
    const { phone, message } = req.body;
    if (!phone || !message)
      return res.status(400).json({ error: "phone and message required" });

    try {
      await client.sendText(`${phone}@c.us`, message);
      res.json({ status: "sent" });
    } catch (err) {
      res.status(500).json({ status: "error", error: err.message });
    }
  });
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("✅ Server running on port " + port));
