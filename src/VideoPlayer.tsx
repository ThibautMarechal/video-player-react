import * as React from "react";

type Props = {
  sources?: Array<string>;
};

type State = {
  playing: boolean;
  waiting: boolean;
  rate: number;
  volume: number;
  duration: number;
  muted: boolean;
  currentTime: number;
};

const rates = [0.25, 0.5, 1, 1.5, 2];

export const VideoPlayer = ({ sources }: Props) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [{ playing, duration, rate, currentTime, volume }, setState] =
    React.useReducer(
      (state: State, newState: Partial<State>) => ({
        ...state,
        ...newState,
      }),
      {
        playing: false,
        rate: 1,
        volume: 1,
        muted: false,
        duration: 0,
        currentTime: 0,
        waiting: true,
      },
    );

  return (
    <>
      <video
        controls
        width="500"
        ref={videoRef}
        onVolumeChange={(e) => setState({ volume: e.currentTarget.volume })}
        onPause={() => setState({ playing: false })}
        onPlaying={() => setState({ playing: true })}
        onRateChange={(e) => setState({ rate: e.currentTarget.playbackRate })}
        onWaiting={() => setState({ waiting: true })}
        onCanPlayThrough={() => setState({ waiting: false })}
        onLoadedMetadata={(e) =>
          setState({ duration: e.currentTarget.duration })
        }
        onTimeUpdate={(e) =>
          setState({ currentTime: e.currentTarget.currentTime })
        }
        onDurationChange={(e) =>
          setState({ duration: e.currentTarget.duration })
        }
      >
        {sources?.map((source) => <source src={source} />)}
      </video>
      <br />
      <input
        type="range"
        min={0}
        style={{ width: 500 }}
        max={duration}
        step={1}
        value={currentTime}
        onChange={(e) => {
          if (videoRef.current) {
            videoRef.current.currentTime = e.currentTarget.valueAsNumber;
          }
          setState({ currentTime: e.currentTarget.valueAsNumber });
        }}
      />
      <br />
      {playing ? (
        <button onClick={() => videoRef.current?.pause()}>Pause</button>
      ) : (
        <button onClick={() => videoRef.current?.play()}>Play</button>
      )}
      {Math.floor(currentTime / 60)}:
      {Math.floor(currentTime % 60)
        .toString()
        .padStart(2, "0")}{" "}
      / {Math.floor(duration / 60)}:
      {Math.floor(duration % 60)
        .toString()
        .padStart(2, "0")}
      <br />
      <button onClick={() => videoRef.current?.requestFullscreen()}>
        Full screen
      </button>
      <br />
      {rates.map((r) => (
        <button
          key={r}
          disabled={r === rate}
          onClick={() =>
            videoRef.current && (videoRef.current.playbackRate = r)
          }
        >
          x{r}
        </button>
      ))}
      <br />
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={volume}
        onChange={(e) => {
          videoRef.current &&
            (videoRef.current.volume = e.target.valueAsNumber);
        }}
      />
    </>
  );
};
