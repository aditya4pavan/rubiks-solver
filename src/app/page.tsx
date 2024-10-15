import Image from "next/image";
import RubiksCube from "./components/display";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <RubiksCube />
    </div>
  );
}
