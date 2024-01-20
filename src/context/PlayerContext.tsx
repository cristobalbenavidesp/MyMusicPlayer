import { createContext, useState, useEffect, useRef } from "react";
import { database, getTrackFromStorage } from "@/firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

interface Animations {
  flashing: boolean;
  circle: boolean;
  lights: boolean;
}

type Track = {
  title: string;
  artist: string;
  cover: string;
  track: string;
};

type ContextType = {
  playing: "playing" | "paused" | "stopped";
  setPlaying: React.Dispatch<
    React.SetStateAction<"playing" | "paused" | "stopped">
  >;
  volume: number;
  setVolume: React.Dispatch<React.SetStateAction<number>>;
  song: AudioBufferSourceNode | null;
  toggleSong: VoidFunction;
  audioRef: React.MutableRefObject<HTMLAudioElement | null>;
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
  currentTime: number;
  setCurrentTime: React.Dispatch<React.SetStateAction<number>>;
  animations: Animations;
  setAnimations: React.Dispatch<React.SetStateAction<Animations>>;
  tracks: Track[];
  currentTrack: Track | null;
  sidebarOpen: boolean;
  setCurrentTrack: React.Dispatch<React.SetStateAction<Track | null>>;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PlayerContext = createContext<ContextType>({
  playing: "stopped",
  setPlaying: () => {},
  volume: 1,
  setVolume: () => {},
  song: null,
  toggleSong: () => {},
  audioRef: { current: null },
  canvasRef: { current: null },
  currentTime: 0,
  setCurrentTime: () => {},
  animations: {
    flashing: false,
    circle: false,
    lights: false,
  },
  setAnimations: () => {},
  tracks: [],
  currentTrack: null,
  sidebarOpen: false,
  setSidebarOpen: () => {},
  setCurrentTrack: () => {},
});

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [playing, setPlaying] = useState<"playing" | "paused" | "stopped">(
    "stopped"
  );
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [volume, setVolume] = useState(0.2);
  const [data, setData] = useState<Uint8Array | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [analyser, setAnalyzer] = useState<AnalyserNode | null>(null);
  const [animations, setAnimations] = useState<Animations>({
    flashing: false,
    circle: false,
    lights: false,
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    getDocs(collection(database, "tracks")).then((querySnapshot) => {
      setTracks(querySnapshot.docs.map((docs) => docs.data() as Track));
    });
  }, []);

  useEffect(() => {
    if (!audioContext || !audioRef.current) return;

    setAnalyzer((prev) => {
      if (prev) return prev;

      const analyzer = audioContext.createAnalyser();
      analyzer.fftSize = 2048;
      const source = audioContext.createMediaElementSource(audioRef.current!);
      source.connect(analyzer);
      analyzer.connect(audioContext.destination);

      return analyzer;
    });
  }, [audioContext, audioRef]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
  }, [volume, audioRef]);

  useEffect(() => {
    if (!analyser) return;
    setData(new Uint8Array(analyser.frequencyBinCount));
  }, [analyser]);

  useEffect(() => {
    requestAnimationFrame(loop);
  }, [data]);

  useEffect(() => {
    if (!tracks[0]) return;

    setCurrentTrack(tracks[0]);
  }, [tracks]);

  useEffect(() => {
    if (!currentTrack) return;
    setPlaying("stopped");
    cancelAnimationFrame(0);
    getTrackFromStorage(currentTrack.track).then((blob: Blob) => {
      audioRef.current!.src = URL.createObjectURL(blob);
    });
    requestAnimationFrame(loop);
  }, [currentTrack]);

  function toggleSong(): void {
    if (playing === "playing") {
      audioRef.current?.pause();
      setPlaying("paused");
    } else if (playing === "paused") {
      audioRef.current?.play();
      setPlaying("playing");
    } else {
      if (audioRef.current === null) return;
      audioRef.current?.play();
      setPlaying("playing");
      setAudioContext(new AudioContext());
    }
  }

  const value = {
    playing,
    setPlaying,
    volume,
    setVolume,
    song: null,
    toggleSong,
    audioRef,
    canvasRef,
    currentTime,
    setCurrentTime,
    animations,
    setAnimations,
    tracks,
    currentTrack,
    setCurrentTrack,
    sidebarOpen,
    setSidebarOpen,
  };

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );

  function loop() {
    if (!analyser || !data) return;
    analyser.getByteFrequencyData(data);
    draw(data);
    requestAnimationFrame(loop);
  }

  function draw(data: Uint8Array) {
    const formattedData = Array.from(data);
    const bufferLength = formattedData.length;

    const bass = formattedData[0];

    const mid = Math.max(
      ...formattedData.slice(bufferLength / 3, (2 * bufferLength) / 3)
    );
    const treble = Math.max(...formattedData.slice((2 * bufferLength) / 3));

    if (bass > 100) {
      setAnimations((prev) => ({ ...prev, flashing: true }));
    } else {
      setAnimations((prev) => ({ ...prev, flashing: false }));
    }

    if (mid > 70) {
      setAnimations((prev) => ({ ...prev, circle: true }));
    } else {
      setAnimations((prev) => ({ ...prev, circle: false }));
    }

    if (treble > 50) {
      setAnimations((prev) => ({ ...prev, lights: true }));
    } else {
      setAnimations((prev) => ({ ...prev, lights: false }));
    }

    const canvas = canvasRef.current;
    const canvasContext = canvas?.getContext("2d");

    if (!canvas || !canvasContext) return;

    let filledData: Number[] = [];

    formattedData.slice(0, 360).forEach((el, index) => {
      filledData.push(el);
      if (!formattedData[index + 1]) return;

      filledData.push((el + formattedData[index + 1]) / 2);
    });

    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    const random = Math.floor(Math.random() * 3);
    const angleVariation = Math.PI / filledData.length;
    const colors = ["#ff00ff40", "#0063ff04", "#00ff6404"];
    canvasContext.strokeStyle = colors[random];
    const originX = canvas.width / 2;
    const originY = canvas.height / 2;
    filledData.forEach((element, index) => {
      const currentAngle = angleVariation * index;
      const x = Number(element) * Math.sin(currentAngle) + originX;
      const y = -element * Math.cos(currentAngle) + originY;
      canvasContext.beginPath();
      canvasContext.moveTo(originX, originY);
      canvasContext.lineTo(x, y);
      canvasContext.stroke();
      canvasContext.beginPath();
      canvasContext.moveTo(originX, originY);
      canvasContext.lineTo(-x + 2 * originX, y);
      canvasContext.stroke();
    });
  }
}
