import React, { useRef, useEffect } from 'react';
import ps2Video from '../../assets/ps2-bg.mp4';

const PS2Background = ({ children }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Auto-play prevented:", error);
      });
    }
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Contenedor del video con tamaño ajustado */}
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="object-cover min-w-full min-h-full"
          style={{
            width: '120%',
            height: '120%',
            transform: 'scale(0.7)'
          }}
        >
          <source src={ps2Video} type="video/mp4" />
          Tu navegador no soporta videos HTML5
        </video>
      </div>
      
      {/* Capa semitransparente */}
      <div className="absolute inset-0 bg-black/50 z-10"></div>
      
      {/* Efecto scanlines PS2 auténtico */}
      <div className="ps2-scanlines"></div>
      
      {/* Contenido principal centrado */}
      <div className="relative z-20 min-h-screen flex flex-col">
        <div className="container mx-auto px-4 py-8 flex-grow">
          {children}
        </div>
      </div>
    </div>
  );
};

export default PS2Background;