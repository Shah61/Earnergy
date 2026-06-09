import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Sparkles } from '@react-three/drei'
import { useControls } from 'leva'
import type { Mesh } from 'three'
import { useAppStore } from '@/stores/useAppStore'

export function Experience() {
  const meshRef = useRef<Mesh>(null)
  const setSceneReady = useAppStore((s) => s.setSceneReady)
  const scrollProgress = useAppStore((s) => s.scrollProgress)

  useEffect(() => {
    setSceneReady(true)
  }, [setSceneReady])

  const { color, distort, speed, intensity } = useControls('Scene', {
    color: '#e85d04',
    distort: { value: 0.45, min: 0, max: 1, step: 0.01 },
    speed: { value: 2.2, min: 0, max: 6, step: 0.1 },
    intensity: { value: 1.4, min: 0, max: 3, step: 0.1 },
  })

  useFrame((_, delta) => {
    if (!meshRef.current) return
    meshRef.current.rotation.y += delta * 0.25
    meshRef.current.rotation.x = scrollProgress * Math.PI * 0.35
  })

  return (
    <>
      <color attach="background" args={['#0c0a09']} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 3]} intensity={1.6} color="#f48c06" />
      <directionalLight position={[-3, -2, -4]} intensity={0.4} color="#3d2314" />

      <Float speed={speed} rotationIntensity={0.6} floatIntensity={1.2}>
        <mesh ref={meshRef} scale={1.65}>
          <icosahedronGeometry args={[1, 4]} />
          <MeshDistortMaterial
            color={color}
            distort={distort}
            speed={speed}
            roughness={0.25}
            metalness={0.65}
            emissive={color}
            emissiveIntensity={intensity * 0.15}
          />
        </mesh>
      </Float>

      <Sparkles
        count={80}
        scale={6}
        size={2}
        speed={0.35}
        opacity={0.55}
        color="#f48c06"
      />
    </>
  )
}
