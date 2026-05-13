/**
 * Scene
 * React Three Fiber scene — loaded only after IntersectionObserver fires.
 * Three.js is dynamically imported; this entire file is in the split chunk.
 */
import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, Float, Stars } from '@react-three/drei'
import { MapPoster } from './MapPoster'

function Lighting() {
  return (
    <>
      {/* Warm key light from upper-left */}
      <directionalLight
        position={[-3, 4, 3]}
        intensity={1.8}
        color="#F5E8D0"
        castShadow={false}
      />
      {/* Cool fill from right */}
      <directionalLight
        position={[4, 1, -2]}
        intensity={0.5}
        color="#C8D8F0"
      />
      {/* Ambient base */}
      <ambientLight intensity={0.4} color="#1B2A4A" />
      {/* Gold rim from below */}
      <pointLight position={[0, -3, 1]} intensity={0.6} color="#C9A96E" />
    </>
  )
}

export function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.2], fov: 42 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      }}
      dpr={[1, 1.5]}       // cap DPR to protect mobile GPU (spec §4 risk 3)
      style={{ background: 'transparent' }}
      aria-hidden="true"   // decorative — screen readers skip (spec §1)
    >
      <Lighting />

      {/* Subtle star field depth */}
      <Stars
        radius={40}
        depth={30}
        count={600}
        factor={2}
        saturation={0.2}
        fade
        speed={0.4}
      />

      {/* Float adds gentle organic hover — React Spring under the hood */}
      <Float
        speed={1.4}
        rotationIntensity={0.12}
        floatIntensity={0.25}
      >
        <Suspense fallback={null}>
          <MapPoster position={[0, 0, 0]} />
        </Suspense>
      </Float>

      {/* Second poster — smaller, left-rear */}
      <Float speed={1.1} rotationIntensity={0.08} floatIntensity={0.18}>
        <Suspense fallback={null}>
          <group
            position={[-2.4, 0.2, -1.8]}
            scale={0.65}
            rotation={[0.05, 0.5, 0]}
          >
            <MapPoster position={[0, 0, 0]} />
          </group>
        </Suspense>
      </Float>

      {/* Third poster — smaller, right-rear */}
      <Float speed={1.6} rotationIntensity={0.10} floatIntensity={0.20}>
        <Suspense fallback={null}>
          <group
            position={[2.2, -0.3, -2.0]}
            scale={0.60}
            rotation={[0.04, -0.45, 0]}
          >
            <MapPoster position={[0, 0, 0]} />
          </group>
        </Suspense>
      </Float>

      <Environment preset="city" />
    </Canvas>
  )
}
