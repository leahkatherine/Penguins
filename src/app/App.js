"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import "./styles/penguin.css";
import Obstacles from "./components/Obstacles";

const gridSize = 10;
const speed = 100;

function App() {
  const [penguin, setPenguin] = useState({ x: 0, y: 0 });
  const [hole, setHole] = useState({ x: 9, y: 9 });
  const [level, setLevel] = useState(1);
  const [direction, setDirection] = useState(null);
  const intervalRef = useRef(null);

  const resetGame = useCallback(() => {
    setPenguin({ x: 0, y: 0 });
    setHole({ x: 9, y: 9 });
    setLevel(1);
    setDirection(null);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, []);

  const nextLevel = useCallback(() => {
    setLevel((prevLevel) => prevLevel + 1);
    setPenguin({ x: 0, y: 0 });
    setHole({
      x: Math.floor(Math.random() * gridSize),
      y: Math.floor(Math.random() * gridSize),
    });
    setDirection(null);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, []);

  const checkCollision = useCallback(
    (newPenguin) => {
      if (newPenguin.x === hole.x && newPenguin.y === hole.y) {
        alert("Level complete!");
        nextLevel();
      }
    },
    [hole, nextLevel]
  );

  const movePenguin = useCallback(
    (direction) => {
      setPenguin((prevPenguin) => {
        let newPenguin = { ...prevPenguin };

        if (direction === "ArrowLeft") newPenguin.x--;
        if (direction === "ArrowRight") newPenguin.x++;
        if (direction === "ArrowUp") newPenguin.y--;
        if (direction === "ArrowDown") newPenguin.y++;

        // Check if the penguin hits the wall
        if (
          newPenguin.x < 0 ||
          newPenguin.x >= gridSize ||
          newPenguin.y < 0 ||
          newPenguin.y >= gridSize
        ) {
          alert("Game Over!");
          resetGame();
          return prevPenguin;
        }

        checkCollision(newPenguin);
        return newPenguin;
      });
    },
    [checkCollision, resetGame]
  );

  useEffect(() => {
    const handleKeyDown = (event) => {
      setDirection(event.key);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    if (direction) {
      intervalRef.current = setInterval(() => movePenguin(direction), speed);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [direction, movePenguin]);

  const getPenguinDirectionClass = () => {
    const dx = hole.x - penguin.x;
    const dy = hole.y - penguin.y;

    if (Math.abs(dx) > Math.abs(dy)) {
      return dx > 0 ? "penguin-right" : "penguin-left";
    } else {
      return dy > 0 ? "penguin-down" : "penguin-up";
    }
  };

  return (
    <div className="game-container">
      <div className="game-board">
        {[...Array(gridSize)].map((_, row) => (
          <div className="row" key={row}>
            {[...Array(gridSize)].map((_, col) => (
              <div
                className={`tile ${
                  penguin.x === col && penguin.y === row
                    ? `penguin ${getPenguinDirectionClass()}`
                    : ""
                } ${hole.x === col && hole.y === row ? "hole" : ""}`}
                key={col}
              ></div>
            ))}
          </div>
        ))}
        <Obstacles
          gridSize={gridSize}
          penguin={penguin}
          hole={hole}
          level={level}
        />
      </div>
    </div>
  );
}

export default App;
//behavior erratice checkback on hook
