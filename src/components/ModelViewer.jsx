import React, { Suspense, useState, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';
import { Box, CircularProgress, Typography } from '@mui/material';
import * as THREE from 'three';

function Model({ url }) {
  const { scene } = useGLTF(url);
  const { camera } = useThree();

  useEffect(() => {
    if (scene) {
      // Центрируем модель
      const box = new THREE.Box3().setFromObject(scene);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      
      // Устанавливаем камеру
      const maxDim = Math.max(size.x, size.y, size.z);
      const fov = camera.fov * (Math.PI / 180);
      let cameraZ = Math.abs(maxDim / Math.sin(fov / 2));
      
      // Добавляем отступ
      cameraZ *= 1.5;
      
      camera.position.set(0, 0, cameraZ);
      camera.lookAt(center);
      
      // Центрируем модель
      scene.position.sub(center);
      
      console.log('Model loaded and centered:', {
        center,
        size,
        cameraZ
      });
    }
  }, [scene, camera]);

  return (
    <primitive 
      object={scene}
      scale={0.01}
      dispose={null}
    />
  );
}

function Scene({ modelUrl }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <spotLight 
        position={[10, 10, 10]} 
        angle={0.15} 
        penumbra={1} 
        intensity={1} 
        castShadow 
      />
      <Suspense fallback={null}>
        <Model url={modelUrl} />
        <Environment preset="city" />
      </Suspense>
      <OrbitControls 
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={1}
        maxDistance={20}
      />
    </>
  );
}

function ModelViewer({ modelUrl }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Loading model from:', modelUrl);
  }, [modelUrl]);

  return (
    <Box 
      sx={{ 
        width: '100%', 
        height: '500px', 
        position: 'relative',
        border: '1px solid #ccc',
        borderRadius: '4px',
        overflow: 'hidden'
      }}
    >
      <Canvas
        shadows
        camera={{ 
          fov: 45,
          near: 0.1,
          far: 1000
        }}
        onCreated={() => {
          console.log('Canvas created');
          setIsLoading(false);
        }}
        gl={{ 
          preserveDrawingBuffer: true,
          antialias: true
        }}
      >
        <Scene modelUrl={modelUrl} />
      </Canvas>
      
      {isLoading && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            padding: '20px',
            borderRadius: '8px'
          }}
        >
          <CircularProgress />
          <Typography variant="body2" color="text.secondary">
            Загрузка модели...
          </Typography>
        </Box>
      )}

      {error && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'rgba(255, 0, 0, 0.1)',
            padding: '20px',
            borderRadius: '8px',
            textAlign: 'center'
          }}
        >
          <Typography variant="body2" color="error">
            Ошибка загрузки модели
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default ModelViewer; 