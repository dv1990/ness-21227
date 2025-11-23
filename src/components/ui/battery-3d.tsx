import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Box } from '@react-three/drei';
import { Mesh } from 'three';

// Battery Cell Component
function BatteryCell({ position, active }: { position: [number, number, number]; active: boolean }) {
  const mesh = useRef<Mesh>(null!);
  
  useFrame((state) => {
    if (mesh.current && active) {
      mesh.current.rotation.y = state.clock.getElapsedTime() * 0.5;
    }
  });

  return (
    <Box
      ref={mesh}
      position={position}
      scale={active ? 1.1 : 1}
      args={[0.8, 1.5, 0.4]}
    >
      <meshStandardMaterial 
        color={active ? "#00d45a" : "#4a9d5c"} 
        emissive={active ? "#002a0c" : "#000000"}
      />
    </Box>
  );
}

// Battery Pack Component
function BatteryPack({ packCount = 16 }: { packCount?: number }) {
  const [activeCells, setActiveCells] = useState<Set<number>>(new Set());
  
  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveCells(prev => {
        const newSet = new Set(prev);
        const randomCell = Math.floor(Math.random() * packCount);
        if (newSet.has(randomCell)) {
          newSet.delete(randomCell);
        } else {
          newSet.add(randomCell);
        }
        return newSet;
      });
    }, 500);
    
    return () => clearInterval(interval);
  }, [packCount]);

  const positions: Array<[number, number, number]> = [];
  for (let i = 0; i < packCount; i++) {
    const x = (i % 4) * 1 - 1.5;
    const z = Math.floor(i / 4) * 1 - 1.5;
    positions.push([x, 0, z]);
  }

  return (
    <group>
      {positions.map((position) => {
        const cellIndex = positions.indexOf(position);
        return (
          <BatteryCell
            key={`battery-cell-${cellIndex}`}
            position={position}
            active={activeCells.has(cellIndex)}
          />
        );
      })}
      <Text
        position={[0, 2.5, 0]}
        fontSize={0.3}
        color="#4a9d5c"
        anchorX="center"
        anchorY="middle"
      >
        NESS Battery Pack
      </Text>
    </group>
  );
}

// System Architecture Component
function SystemArchitecture() {
  
  return (
    <group>
      {/* Battery Pack */}
      <group position={[-3, 0, 0]}>
        <Box args={[2, 1, 1]} castShadow>
          <meshStandardMaterial color="#4a9d5c" />
        </Box>
        <Text
          position={[0, 1.2, 0]}
          fontSize={0.2}
          color="#ffffff"
          anchorX="center"
        >
          Battery Pack
        </Text>
      </group>

      {/* Inverter */}
      <group position={[0, 0, 0]}>
        <Box args={[1.5, 0.8, 0.6]} castShadow>
          <meshStandardMaterial color="#0066cc" />
        </Box>
        <Text
          position={[0, 1, 0]}
          fontSize={0.2}
          color="#ffffff"
          anchorX="center"
        >
          Inverter
        </Text>
      </group>

      {/* BMS */}
      <group position={[3, 0, 0]}>
        <Box args={[1, 0.6, 0.4]} castShadow>
          <meshStandardMaterial color="#ff6600" />
        </Box>
        <Text
          position={[0, 0.8, 0]}
          fontSize={0.2}
          color="#ffffff"
          anchorX="center"
        >
          BMS
        </Text>
      </group>

      {/* Connection Lines */}
      <mesh position={[-1.5, 0, 0]}>
        <boxGeometry args={[1, 0.05, 0.05]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh position={[1.5, 0, 0]}>
        <boxGeometry args={[1, 0.05, 0.05]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
    </group>
  );
}

// Main 3D Battery Component
interface Battery3DProps {
  view: 'pack' | 'system';
  className?: string;
}

export const Battery3D: React.FC<Battery3DProps> = ({ view, className }) => {
  return (
    <div className={`w-full h-96 rounded-xl overflow-hidden bg-gradient-to-b from-gray-900 to-black ${className}`}>
      <Canvas
        shadows
        camera={{ position: [5, 5, 5], fov: 60 }}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        {view === 'pack' ? <BatteryPack /> : <SystemArchitecture />}
        
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};