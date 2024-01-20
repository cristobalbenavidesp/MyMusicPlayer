import { useContext } from "react";
import InputRange from "@/components/ui/InputRange";
import { PlayerContext } from "@/context/PlayerContext";

function formatTime(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor(seconds / 60) % 60;
  const secs = Math.floor(seconds % 60);
  return [hours, minutes, secs]
    .map((v) => v.toString().padStart(2, "0"))
    .filter((v, i) => v !== "00" || i > 0)
    .join(":");
}
export default function ProgressInputRange() {
  const { audioRef, currentTime } = useContext(PlayerContext);
  return (
    <div className="flex gap-3 col-span-2">
      <span className="text-white">{formatTime(currentTime)}</span>
      <InputRange
        className="w-[600px]"
        min={0}
        max={audioRef.current?.duration || 0}
        value={audioRef.current?.currentTime || 0}
        step={audioRef.current?.duration ? audioRef.current?.duration / 100 : 0}
        onChange={(event) => {
          if (!audioRef.current) return;
          audioRef.current.currentTime = Number(event.target.value);
        }}
      />
      <span className="text-white">
        {formatTime(audioRef.current?.duration || 0)}
      </span>
    </div>
  );
}
