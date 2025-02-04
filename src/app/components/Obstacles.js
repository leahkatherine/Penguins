import React from "react";
import PropTypes from "prop-types";
import useObstacles from "../hooks/useObstacles";

export const Obstacles = ({ gridSize, penguin, hole, level }) => {
  const obstacles = useObstacles(gridSize, penguin, hole, level);

  return (
    <>
      {obstacles.map((obstacle, index) => (
        <div
          key={index}
          className="tile obstacle"
          style={{
            gridRowStart: obstacle.y + 1,
            gridColumnStart: obstacle.x + 1,
          }}
        ></div>
      ))}
    </>
  );
};

Obstacles.propTypes = {
  gridSize: PropTypes.number.isRequired,
  penguin: PropTypes.object.isRequired,
  hole: PropTypes.object.isRequired,
  level: PropTypes.number.isRequired,
};
export default Obstacles;
