"use client";
import { createRubiksCube, getColor, rotate } from "@/app/utils/rubiks";
import { useState } from "react";

export default function RubiksCube() {
  const [cube, setCube] = useState(createRubiksCube());

  const actions = ["F", "F`", "B", "B`", "L", "L`", "R", "R`", "U", "U`", "D", "D`"];

  const shuffleCube = () => {
    let newCube = createRubiksCube();
    for (let i = 0; i < 100; i++) {
      newCube = rotate(newCube, actions[Math.floor(Math.random() * actions.length)]);
    }
    setCube(newCube);
  };

  const handleClick = (action: string) => {
    setCube((cube) => rotate(cube, action));
  };

  return (
    <div className="flex flex-col h-full w-full items-center justify-center gap-10">
      <div className="flex flex-col items-center justify-center  gap-2">
        {cube.map((row, i) => (
          <div key={i} className="flex gap-2">
            {row.map((color, j) => (
              <div key={j} className={`w-[50px] h-[50px] ${getColor(color)} ${color !== "-" ? "border-2 border-black dark:border-slate-100 rounded-lg" : ""}`}></div>
            ))}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        {actions.map((action, i) => (
          <button key={i} className="bg-blue-500 w-10 h-10 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleClick(action)}>
            {action}
          </button>
        ))}
      </div>
      <div className="flex gap-2">
        <button onClick={shuffleCube} className="outline py-2 px-4 rounded-lg hover:outline-2 hover:bg-slate-600">
          Shuffle Cube
        </button>
        <button onClick={shuffleCube} className="outline py-2 px-4 rounded-lg hover:outline-2 hover:bg-slate-600">
          Solve Cube
        </button>
      </div>
    </div>
  );
}
