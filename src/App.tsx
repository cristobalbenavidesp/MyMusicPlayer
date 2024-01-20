import Background from "@/components/Background";
import DJ from "@/components/DJ";
import Player from "@/components/Player";
import Visualizer from "@/components/Visualizer";
import { PlayerProvider } from "@/context/PlayerContext";
import Sidebar from "./components/Sidebar";

export default function App() {
  return (
    <PlayerProvider>
      <Background>
        <Visualizer />
        <DJ />
        <footer className="absolute bottom-0 w-full h-[80px] overflow-hidden border-t bg-black border-white z-40">
          <Player />
        </footer>
        <Sidebar />
      </Background>
    </PlayerProvider>
  );
}
