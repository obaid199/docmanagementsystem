// CanvasImageAnnotator.js
import React, { useRef, useEffect, useState } from 'react';

const CanvasImageAnnotator = ({ src }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [drawColor, setDrawColor] = useState('red');
  const [tool, setTool] = useState('rect');

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = src;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
    };
  }, [src]);

  const handleMouseDown = (e) => {
    setIsDrawing(true);
    setStartX(e.nativeEvent.offsetX);
    setStartY(e.nativeEvent.offsetY);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(canvas, 0, 0);

    if (tool === 'rect') {
      ctx.beginPath();
      ctx.rect(startX, startY, x - startX, y - startY);
      ctx.lineWidth = 3;
      ctx.strokeStyle = drawColor;
      ctx.stroke();
    } else if (tool === 'line') {
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(x, y);
      ctx.lineWidth = 3;
      ctx.strokeStyle = drawColor;
      ctx.stroke();
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const handleToolChange = (e) => {
    setTool(e.target.value);
  };

  const handleColorChange = (e) => {
    setDrawColor(e.target.value);
  };

  return (
    <div style={{ position: 'relative' }}>
      <div>
        <label>
          Tool:
          <select value={tool} onChange={handleToolChange}>
            <option value="rect">Rectangle</option>
            <option value="line">Line</option>
          </select>
        </label>
        <label>
          Color:
          <input type="color" value={drawColor} onChange={handleColorChange} />
        </label>
      </div>
      <img src={src} alt="Annotate" style={{ width: '100%', height: 'auto' }} />
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 'auto' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
    </div>
  );
};

export default CanvasImageAnnotator;
