import "./Home.css";

export default function Home() {
  return (
    <div className="root-container">
      <h1 className="home-title">toolbox</h1>
      <h1 className="home-desc">
        A collection of tools to make your life easier
      </h1>

      <ul className="tool-container">
        <li className="tool-card">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="18"
            fill="none"
            viewBox="0 0 20 18"
          >
            <path
              className="accent-svg"
              d="M3.25 0A3.25 3.25 0 000 3.25v11.5A3.25 3.25 0 003.25 18h13.5A3.25 3.25 0 0020 14.75V3.25A3.25 3.25 0 0016.75 0H3.25zM7 6.25a1 1 0 011.482-.876l5 2.75a1 1 0 010 1.753l-5 2.75A1 1 0 017 11.75v-5.5z"
            ></path>
          </svg>
          <h1 className="card-title">YT Download</h1>
          <p className="short-desc">
            Download YouTube videos in any format and quality
          </p>
        </li>
        <li className="tool-card">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="18"
            fill="none"
            viewBox="0 0 20 18"
          >
            <path
              className="accent-svg"
              d="M3.25 0A3.25 3.25 0 000 3.25v11.5A3.25 3.25 0 003.25 18h13.5A3.25 3.25 0 0020 14.75V3.25A3.25 3.25 0 0016.75 0H3.25zM7 6.25a1 1 0 011.482-.876l5 2.75a1 1 0 010 1.753l-5 2.75A1 1 0 017 11.75v-5.5z"
            ></path>
          </svg>
          <h1 className="card-title">FFMPEG</h1>
          <p className="short-desc">
            Convert any video file to any format using FFMPEG
          </p>
        </li>
        <li className="tool-card">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="18"
            fill="none"
            viewBox="0 0 20 18"
          >
            <path
              className="accent-svg"
              d="M3.25 0A3.25 3.25 0 000 3.25v11.5A3.25 3.25 0 003.25 18h13.5A3.25 3.25 0 0020 14.75V3.25A3.25 3.25 0 0016.75 0H3.25zM7 6.25a1 1 0 011.482-.876l5 2.75a1 1 0 010 1.753l-5 2.75A1 1 0 017 11.75v-5.5z"
            ></path>
          </svg>
          <h1 className="card-title">File Drop</h1>
          <p className="short-desc">
            Share files with anyone using a simple link
          </p>
        </li>
      </ul>
    </div>
  );
}
