const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.post('/download', async (req, res) => {
  const { videoUrl } = req.body;
  const info = await ytdl.getInfo(videoUrl);
  const format = ytdl.chooseFormat(info.formats, { quality: 'highest' });
  const stream = ytdl.downloadFromInfo(info, { format });
  const videoTitle = info.videoDetails.title.replace(/[^\w\s]/gi, '');
  const videoId = info.videoDetails.videoId;
  const filename = `${videoTitle}_${videoId}.mp4`;
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
  res.setHeader('Content-Type', 'video/mp4');
  stream.pipe(res);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
