import { VideoPlayer } from "./VideoPlayer";
import videos from "./video-sources";
function App() {
  return <VideoPlayer sources={videos[0].sources} />;
}

export default App;
