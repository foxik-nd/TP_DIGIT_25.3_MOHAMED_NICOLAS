import './styles/Canva.css'
import React, { useRef, useState } from 'react';

const Canva = ({ onPrediction }) => {
      const canvasRef = useRef(null);
      const [isDrawing, setIsDrawing] = useState(false);
    
      const startDrawing = (e) => {
        setIsDrawing(true);
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        ctx.beginPath();
        ctx.moveTo(x, y);
      };
    
      const draw = (e) => {
        if (!isDrawing) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        ctx.lineTo(x, y);
        ctx.stroke();
      };
    
      const endDrawing = () => {
        setIsDrawing(false);
        const imageData = getImageData();
        onPrediction(imageData);
      };
    
      const getImageData = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        return ctx.getImageData(0, 0, canvas.width, canvas.height);
      };

    return (
       <>
        <canvas
            ref={canvasRef}
            width={280}
            height={280}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={endDrawing}
            onMouseOut={endDrawing}
            style={{ border: '1px solid black' }}
    />
       </>
      );
}

export default Canva;