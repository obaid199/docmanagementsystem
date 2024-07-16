// FabricImageAnnotator.js
import React, { useEffect, useRef } from 'react';
import { fabric } from 'fabric';

const FabricImageAnnotator = ({ src }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current);
    fabric.Image.fromURL(src, (img) => {
      canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
      canvas.setHeight(img.height);
      canvas.setWidth(img.width);
    });

    // Example of adding a rectangle annotation
    const rect = new fabric.Rect({
      left: 100,
      top: 100,
      fill: 'red',
      width: 100,
      height: 100,
      selectable: true,
    });
    canvas.add(rect);

    return () => {
      canvas.dispose();
    };
  }, [src]);

  return <canvas ref={canvasRef} style={{ border: '1px solid #000' }} />;
};

export default FabricImageAnnotator;
