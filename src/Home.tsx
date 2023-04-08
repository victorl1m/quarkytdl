import { useState } from "react";

function Home() {
  const [videoUrl, setVideoUrl] = useState("");

  const handleInputChange = (URL) => {
    setVideoUrl(URL);
  };

  console.log(videoUrl);

  const handleSubmit = () => {
    fetch("http://localhost:3000/download", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ videoUrl }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.blob();
      })
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        const videoTitle = blob.type.split("/")[0];
        const filename = `${videoTitle}_${Date.now()}.mp3`;
        a.href = url;
        a.download = filename;
        a.click();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit();
        }}
      >
        <label>
          Video URL:
          <input
            type="text"
            value={videoUrl}
            onChange={(event) => {
              handleInputChange(event.target.value);
            }}
          />
        </label>
        <button
          onClick={() => {
            console.log("clicked");
          }}
          type="submit"
        >
          Download Video
        </button>
      </form>
    </div>
  );
}

export default Home;
