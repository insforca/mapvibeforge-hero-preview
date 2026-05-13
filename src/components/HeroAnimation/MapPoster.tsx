/**
 * MapPoster
 * A 3D map-poster mesh: framed rectangular card with a procedural map face,
 * matte Navy frame sides, Gold accent strips, and a floating + rotation animation.
 * All colours are MapVibe design tokens. No readable content lives in this mesh.
 */
import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'
import * as THREE from 'three'
import { useMapTexture, MAP_THEMES } from './useMapTexture'

// Poster dimensions (18:24 → 0.75 : 1)
const W = 1.5   // world units
const H = 2.0
const DEPTH = 0.06
const FRAME = 0.07  // frame border width in world units

// Theme cycle interval (ms)
const THEME_INTERVAL = 4000

export function MapPoster({ position = [0, 0, 0] as [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null!)
  const faceRef  = useRef<THREE.Mesh>(null!)

  // ── Theme cycling ────────────────────────────────────────────
  const [themeIdx, setThemeIdx] = useState(0)
  const [fadingOut, setFadingOut] = useState(false)
  const currentTex = useMapTexture(themeIdx)
  const nextTex    = useMapTexture((themeIdx + 1) % MAP_THEMES.length)
  const opacity    = useRef(1)

  useEffect(() => {
    const id = setTimeout(() => setFadingOut(true), THEME_INTERVAL)
    return () => clearTimeout(id)
  }, [themeIdx])

  // ── Animation loop ───────────────────────────────────────────
  useFrame((_, delta) => {
    if (!groupRef.current) return

    // Gentle Y rotation
    groupRef.current.rotation.y += delta * 0.35

    // Floating bob
    groupRef.current.position.y =
      position[1] + Math.sin(Date.now() / 1800) * 0.06

    // Slight X tilt sway
    groupRef.current.rotation.x = Math.sin(Date.now() / 3000) * 0.04

    // Theme crossfade
    if (fadingOut && faceRef.current) {
      opacity.current = Math.max(0, opacity.current - delta * 2.5)
      ;(faceRef.current.material as THREE.MeshStandardMaterial).opacity = opacity.current
      if (opacity.current <= 0) {
        setThemeIdx(i => (i + 1) % MAP_THEMES.length)
        setFadingOut(false)
        opacity.current = 1
      }
    } else if (!fadingOut && faceRef.current) {
      opacity.current = Math.min(1, opacity.current + delta * 2)
      ;(faceRef.current.material as THREE.MeshStandardMaterial).opacity = opacity.current
    }
  })

  // ── Materials ────────────────────────────────────────────────
  const navyMat = new THREE.MeshStandardMaterial({
    color: 0x1B2A4A,
    roughness: 0.82,
    metalness: 0.08,
  })
  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xC9A96E,
    roughness: 0.55,
    metalness: 0.30,
  })
  const faceMat = new THREE.MeshStandardMaterial({
    map: fadingOut ? nextTex : currentTex,
    roughness: 0.70,
    metalness: 0.0,
    transparent: true,
    opacity: opacity.current,
  })

  return (
    <group ref={groupRef} position={position}>
      {/* ── Poster body (frame sides + back) ── */}
      <RoundedBox
        args={[W + FRAME * 2, H + FRAME * 2, DEPTH]}
        radius={0.018}
        smoothness={4}
      >
        <primitive object={navyMat} attach="material" />
      </RoundedBox>

      {/* ── Map face ── */}
      <mesh
        ref={faceRef}
        position={[0, 0, DEPTH / 2 + 0.001]}
      >
        <planeGeometry args={[W, H]} />
        <primitive object={faceMat} attach="material" />
      </mesh>

      {/* ── Top gold accent strip ── */}
      <mesh position={[0, H / 2 + FRAME * 0.5, DEPTH / 2 + 0.002]}>
        <planeGeometry args={[W, FRAME * 0.35]} />
        <primitive object={goldMat} attach="material" />
      </mesh>

      {/* ── Bottom gold accent strip ── */}
      <mesh position={[0, -(H / 2 + FRAME * 0.5), DEPTH / 2 + 0.002]}>
        <planeGeometry args={[W, FRAME * 0.35]} />
        <primitive object={goldMat} attach="material" />
      </mesh>

      {/* ── Subtle reflection plane (floor shadow) ── */}
      <mesh position={[0, -(H / 2 + FRAME + 0.01), -0.1]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[W + 0.3, 0.5]} />
        <meshStandardMaterial
          color={0x1B2A4A}
          transparent
          opacity={0.18}
          roughness={1}
        />
      </mesh>
    </group>
  )
}
