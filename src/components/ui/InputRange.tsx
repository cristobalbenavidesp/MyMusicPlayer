export default function InputRange({
  min,
  max,
  value,
  defaultValue,
  step,
  onChange,
  className,
}: {
  min: number;
  max: number;
  value?: number;
  defaultValue?: number;
  step: number;
  className?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <input
      type="range"
      min={min}
      max={max}
      className={`audio-range ${className}`}
      defaultValue={defaultValue || undefined}
      value={value}
      step={step}
      onChange={onChange}
    />
  );
}
