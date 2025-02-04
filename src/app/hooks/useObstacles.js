import { useState, useEffect, useCallback } from "react";

export const useObstacles = (gridSize, penguin, hole, level) => {
  const [obstacles, setObstacles] = useState([]);

  const generateObstacles = useCallback(
    (numObstacles) => {
      const newObstacles = [];
      for (let i = 0; i < numObstacles; i++) {
        let newObstacle;
        do {
          newObstacle = {
            x: Math.floor(Math.random() * gridSize),
            y: Math.floor(Math.random() * gridSize),
          };
        } while (
          (newObstacle.x === penguin.x && newObstacle.y === penguin.y) ||
          (newObstacle.x === hole.x && newObstacle.y === hole.y) ||
          newObstacles.some(
            (ob) => ob.x === newObstacle.x && ob.y === newObstacle.y
          )
        );
        newObstacles.push(newObstacle);
      }
      return newObstacles;
    },
    [gridSize, penguin, hole]
  );

  useEffect(() => {
    setObstacles(generateObstacles(5));
  }, [level, penguin, hole, gridSize, generateObstacles]);
  return obstacles;
};

export default useObstacles;
