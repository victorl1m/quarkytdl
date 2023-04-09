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
    const format = ytdl.chooseFormat(info.formats, { quality: 'highest' });
    const stream = ytdl.downloadFromInfo(info, { format });
    const videoTitle = info.videoDetails.title.replace(/[^\w\s]/gi, '');
    const filename = `${videoTitle}.mp4`;
    
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Type', 'video/mp4');
    console.log(`Downloading ${videoTitle}`);
    console.log(`File size: ${format.contentLength} bytes`);
    
    // Pipe the stream to the response object
    stream.pipe(res);

    // Listen to the finish event of the response object
    res.on('finish', () => {
      console.log(`Download finished for ${videoTitle}`);
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(200).send({ videoTitle });
    res.status(500).send('An error occurred while processing your request.');
  }
});

app.get('/video-title', async (req, res) => {
  try {
    const { videoUrl } = req.query;
    const info = await ytdl.getInfo(videoUrl);
    const videoTitle = info.videoDetails.title.replace(/[^\w\s]/gi, '');
    res.status(200).send({ videoTitle });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('An error occurred while processing your request.');
  }
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
