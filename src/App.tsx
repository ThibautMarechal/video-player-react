import React from "react";
import { VideoPlayer } from "./VideoPlayer";
import videos from "./video-sources";
function App() {
  const [sources, setSources] = React.useState<Array<string>>([]);
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
      }}
    >
      <div>
        <VideoPlayer key={sources.join(",")} sources={sources} />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          maxHeight: "100vh",
          overflowY: "scroll",
        }}
      >
        {videos.map((video) => (
          <div key={video.title} onClick={() => setSources(video.sources)}>
            <span style={{ fontWeight: "bold" }}>{video.title}</span>
            <br />
            <img style={{ width: 200 }} src={video.thumb} />
            <br />
            <span style={{ color: "gray" }}>{video.description}</span>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
