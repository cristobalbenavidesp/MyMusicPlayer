import { SyntheticEvent, useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import ProgressInputRange from "./ProgressInputRange";
import VolumeController from "./VolumeController";
import SpaceBackground from "./SpaceBackground";
import PlayButton from "./ui/PlayButton";
import ExpandSidebarIcon from "./ui/ExpandSidebarIcon";

export default function Player() {
  const {
    playing,
    toggleSong,
    audioRef,
    volume,
    setCurrentTime,
    setVolume,
    currentTrack,
    setSidebarOpen,
  } = useContext(PlayerContext);

  return (
    <div className="grid items-center content-center w-full h-full grid-cols-3 grid-rows-2 px-10 py-2">
      <button
        onClick={() => {
          setSidebarOpen(true);
        }}
        className="text-white w-12 h-12 absolute left-5 "
      >
        <ExpandSidebarIcon className="object-fill" />
      </button>
      <div className="row-span-2 h-full w-fit flex items-center ml-auto">
        <img
          className="aspect-square h-full bg-purple-700"
          src={currentTrack?.cover}
          alt="album cover"
        />
        <div className="h-full w-fit px-4 flex flex-col place-content-center">
          <h1 className="text-white font-semibold">
            {currentTrack?.title || "untitled audio"}
          </h1>
          <small className="text-sm text-white/80">
            {currentTrack?.artist || "Unknown"}
          </small>
        </div>
      </div>
      <ProgressInputRange />
      <div className="flex gap-4 col-span-2">
        <PlayButton playing={playing} toggle={toggleSong} />
        <VolumeController
          volume={volume || 0}
          onChange={(event) => {
            setVolume(Number(event.target.value));
          }}
        />
      </div>

      <audio
        ref={audioRef}
        id="audio"
        className="hidden"
        src={currentTrack?.track || ""}
        onTimeUpdate={(e: SyntheticEvent<HTMLAudioElement>) => {
          const cT = (e.target as HTMLAudioElement)?.currentTime;
          setCurrentTime(cT);
        }}
      />
      <SpaceBackground />
    </div>
  );
}
