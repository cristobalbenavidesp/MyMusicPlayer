export default function DJ() {
  return (
    <picture className="z-10 relative  flex flex-col place-items-center">
      <img
        src="/../dj.webp"
        alt="dj"
        id="dj"
        width={400}
        height={400}
        className="bg-blend-multiply text-white bg-white/0 invert rounded-full"
      />
      <img
        src="/../dj.webp"
        alt="dj"
        width={400}
        height={400}
        className="hidden bg-blend-multiply absolute top-0 left-0 text-white bg-white/0 invert"
      />
      <h1
        id="title"
        className="text-center text-7xl text-white font-bold subpixel-antialiased "
      >
        ZEACON'S MUSIC
      </h1>
    </picture>
  );
}
