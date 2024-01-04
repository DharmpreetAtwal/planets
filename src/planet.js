import { useContext, useEffect, useRef, useState } from "react";
import { MyTransform } from "./index.js";

export const Planet = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [x, setX] = useState(200);
  const [y, setY] = useState(200);
  const [r, setR] = useState(50);

  const clickX = useRef(0);
  const clickY = useRef(0);

  const { toSVGCoordinates } = useContext(MyTransform);

  const handleOnDown = (event) => {
    const coord = toSVGCoordinates(event);
    clickX.current = coord[0] - x;
    clickY.current = coord[1] - y;
    setIsDragging(true);
  };

  const handleMove = (event) => {
    if (isDragging) {
      const coord = toSVGCoordinates(event);
      setX(coord[0] - clickX.current);
      setY(coord[1] - clickY.current);
    }
  };

  const handleOnUp = (event) => {
    setIsDragging(false);
  };

  return (
    <>
      <circle
        cx={x}
        cy={y}
        r={r}
        onMouseDown={handleOnDown}
        onMouseMove={handleMove}
        onMouseUp={handleOnUp}
      />
    </>
  );
};
