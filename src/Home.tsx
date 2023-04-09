import { useState } from "react";
import "./Home.css";

function Home() {
  const [videoUrl, setVideoUrl] = useState("");
  const [videoTitle, setVideoTitle] = useState("");

  const handleInputChange = (URL) => {
    setVideoUrl(URL);
  };

  const handleSubmit = async () => {
    try {
      const titleResponse = await fetch(
        `http://localhost:3000/video-title?videoUrl=${videoUrl}`
      );
      const { videoTitle } = await titleResponse.json();
      const downloadResponse = await fetch("http://localhost:3000/download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ videoUrl, videoTitle }),
      });
      const blob = await downloadResponse.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = videoTitle + ".mp4";
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="action-container">
      {!videoTitle && <p className="title-text">be happy :)</p>}
      {videoTitle && <p className="title-text">{videoTitle}</p>}
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit();
        }}
      >
        <input
          className="url-input"
          type="text"
          placeholder="URL"
          value={videoUrl}
          onChange={(event) => {
            handleInputChange(event.target.value);
          }}
        />
        <button className="download-button" type="submit">
          Download Video
        </button>
      </form>
    </div>
  );
}

export default Home;
