import { useState } from "react";

function Home() {
  const [videoUrl, setVideoUrl] = useState("");
  const [videoTitle, setVideoTitle] = useState("");

  const handleInputChange = (URL) => {
    setVideoUrl(URL);
  };

  const handleSubmit = () => {
    fetch(
      "http://ec2-15-228-232-151.sa-east-1.compute.amazonaws.com:3000/download",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ videoUrl }),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.blob();
      })
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        const filename = `${videoTitle}_${Date.now()}.mp3`;
        a.href = url;
        a.download = filename;
        a.click();
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    fetch(
      "http://ec2-15-228-232-151.sa-east-1.compute.amazonaws.com:3000/videoInfo",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ videoUrl }),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setVideoTitle(data.videoTitle);
        const filename = `${data.videoTitle}.mp4`;
        fetch(
          "http://ec2-15-228-232-151.sa-east-1.compute.amazonaws.com:3000/rename",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ filename }),
          }
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            console.log(`Renamed to ${data.videoTitle}`);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
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
      {videoTitle && <p>Video Title: {videoTitle}</p>}
    </div>
  );
}

export default Home;
