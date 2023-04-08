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
        a.href = url;
        a.download = videoTitle;
        a.click();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  fetch(
    "http://ec2-15-228-232-151.sa-east-1.compute.amazonaws.com:3000/getVideoTitle",
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
      setVideoTitle(data.title);
    })
    .catch((error) => {
      console.error("Error:", error);
    });

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
