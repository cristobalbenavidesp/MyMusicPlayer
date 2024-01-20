import InputRange from "./ui/InputRange";
import VolumeIcon from "./ui/VolumeIcon";

export default function VolumeController({
  volume,
  onChange,
}: {
  volume: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex gap-2 items-center">
      <VolumeIcon className="text-white w-6 h-6" />
      <InputRange
        min={0}
        max={1}
        value={volume}
        step={0.01}
        onChange={onChange}
      />
    </div>
  );
}
