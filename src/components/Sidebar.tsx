import { PlayerContext } from "@/context/PlayerContext";
import SpaceBackground from "./SpaceBackground";
import { useContext } from "react";
import CloseIcon from "./ui/CloseIcon";

export default function Sidebar() {
  const { tracks, currentTrack, setCurrentTrack, sidebarOpen, setSidebarOpen } =
    useContext(PlayerContext);
  return (
    sidebarOpen && (
      <div className="h-full min-w-[20rem] absolute flex flex-col top-0 left-0 z-50 border-white border-r bg-black overflow-hidden">
        <button
          className="w-6 aspect-square place-self-end"
          onClick={() => {
            setSidebarOpen(false);
          }}
        >
          <CloseIcon className="text-white" />
        </button>
        <SpaceBackground />
        {tracks.map((track) => (
          <button
            className={
              currentTrack?.title === track.title
                ? "flex p-2 bg-white text-black cursor-default"
                : "flex p-2 hover:bg-neutral-900/80 text-white cursor-pointer"
            }
            onClick={() => {
              if (currentTrack?.title === track.title) return;
              setCurrentTrack(track);
            }}
          >
            <img
              src={track.cover}
              alt="album cover"
              className="object-cover aspect-square w-32"
            />
            <div className="flex flex-col place-content-center px-4 w-full">
              <h1 className="font-semibold text-lg">{track.title}</h1>
              <small className="text-sm text-inherit opacity-80">
                {track.artist}
              </small>
            </div>
          </button>
        ))}
      </div>
    )
  );
}
