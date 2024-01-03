import ReactDOM from "react-dom/client";
import { Planet } from "./planets.js";
import { useState, useRef, useEffect, createContext } from "react";

export const MyTransform = createContext();
const MyTransformProvider = ({ children, svgRef }) => {
  const toSVGCoordinates = (event) => {
    const clientX = event.clientX;
    const clientY = event.clientY;

    const viewBox = svgRef.current.getAttribute("viewBox").split(" ");
    const svgWidth = parseInt(svgRef.current.getAttribute("width"));
    const svgHeight = parseInt(svgRef.current.getAttribute("height"));

    const scaleX = parseInt(viewBox[2]) / svgWidth;
    const scaleY = parseInt(viewBox[3]) / svgHeight;

    const canvasRect = svgRef.current.getBoundingClientRect();
    const canvasX = (clientX - canvasRect.left) * scaleX + parseInt(viewBox[0]);
    const canvasY = (clientY - canvasRect.top) * scaleY + parseInt(viewBox[1]);

    return [Math.round(canvasX), Math.round(canvasY)];
  };

  const contextValue = {
    toSVGCoordinates,
  };

  return (
    <MyTransform.Provider value={contextValue}>{children}</MyTransform.Provider>
  );
};

const Map = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [width, setWidth] = useState(5000);
  const [height, setHeight] = useState(5000);

  const [viewBoxX, setViewBoxX] = useState(0);
  const [viewBoxY, setViewBoxY] = useState(0);
  const [viewBoxWidth, setViewBoxWidth] = useState(1000);
  const [viewBoxHeight, setViewBoxHeight] = useState(1000);

  const svgRef = useRef(null);

  useEffect(() => {
    // Update the body's overflow property based on the state
    document.body.style.overflow = "hidden";
  }, []);

  return (
    <>
      <MyTransformProvider svgRef={svgRef}>
        <svg
          ref={svgRef}
          x={x}
          y={y}
          width={width}
          height={height}
          viewBox={`${viewBoxX} ${viewBoxY} ${viewBoxWidth} ${viewBoxHeight}`}
        >
          <Planet />
        </svg>
      </MyTransformProvider>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Map />);
