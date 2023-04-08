const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.post('/download', async (req, res) => {
  try {
    const { videoUrl } = req.body;
    const info = await ytdl.getInfo(videoUrl);
    const format = ytdl.chooseFormat(info.formats, { quality: 'highest', filter: 'audioonly' });
    const stream = ytdl.downloadFromInfo(info, { format });
    const videoTitle = info.videoDetails.title.replace(/[^\w\s]/gi, '');
    const filename = `${videoTitle}.mp3`;
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Type', 'audio/mpeg');
    console.log(`Downloading ${videoTitle}`);
    stream.pipe(res);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('An error occurred while processing your request.');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
