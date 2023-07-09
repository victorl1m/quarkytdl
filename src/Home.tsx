import React, { useState } from "react";

function Home() {
  const [videoUrl, setVideoUrl] = useState("");

  const handleInputChange = (newValue) => {
    setVideoUrl(newValue);
  };

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
        const link = document.createElement("a");
        link.href = url;
        link.download = "audio.mp3";
        link.click();
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
        <button type="submit">Download Audio</button>
      </form>
    </div>
  );
}
