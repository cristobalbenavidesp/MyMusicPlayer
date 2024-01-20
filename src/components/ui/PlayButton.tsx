import Pause from "./Pause";
import Play from "./Play";

export default function PlayButton({
  playing,
  toggle,
}: {
  playing: string;
  toggle: () => void;
}) {
  return (
    <button
      className="bg-white rounded-full w-8 h-8 cursor-pointer p-2 flex place-content-center items-center z-50 active:scale-90"
      onClick={toggle}
    >
      {playing === "playing" ? (
        <Pause className="object-cover aspect-square w-4" />
      ) : (
        <Play className="object-cover aspect-square w-4" />
      )}
    </button>
  );
}
