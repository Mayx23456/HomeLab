'use client'

import type React from 'react'
import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { cn } from '@/lib/utils'

const vertexShader = `
  uniform float time;
  uniform float intensity;
  varying vec2 vUv;
  varying vec3 vPosition;

  void main() {
    vUv = uv;
    vPosition = position;

    vec3 pos = position;
    pos.y += sin(pos.x * 10.0 + time) * 0.1 * intensity;
    pos.x += cos(pos.y * 8.0 + time * 1.5) * 0.05 * intensity;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

const fragmentShader = `
  uniform float time;
  uniform float intensity;
  uniform vec3 color1;
  uniform vec3 color2;
  varying vec2 vUv;
  varying vec3 vPosition;

  void main() {
    vec2 uv = vUv;

    float noise = sin(uv.x * 20.0 + time) * cos(uv.y * 15.0 + time * 0.8);
    noise += sin(uv.x * 35.0 - time * 2.0) * cos(uv.y * 25.0 + time * 1.2) * 0.5;

    vec3 color = mix(color1, color2, noise * 0.5 + 0.5);
    color = mix(color, vec3(1.0), pow(abs(noise), 2.0) * intensity);

    float glow = 1.0 - length(uv - 0.5) * 2.0;
    glow = pow(glow, 2.0);

    gl_FragColor = vec4(color * glow, glow * 0.8);
  }
`

type ShaderPlaneProps = {
  position: [number, number, number]
  size?: [number, number]
  color1?: string
  color2?: string
}

export function ShaderPlane({
  position,
  size = [2, 2],
  color1 = '#77008a',
  color2 = '#f4ddff',
}: ShaderPlaneProps) {
  const mesh = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const initialUniforms = useMemo(
    () => ({
      time: { value: 0 },
      intensity: { value: 1.0 },
      color1: { value: new THREE.Color(color1) },
      color2: { value: new THREE.Color(color2) },
    }),
    [color1, color2],
  )

  useEffect(() => {
    if (!materialRef.current) {
      return
    }

    materialRef.current.uniforms.color1.value = new THREE.Color(color1)
    materialRef.current.uniforms.color2.value = new THREE.Color(color2)
  }, [color1, color2])

  useFrame((state) => {
    if (!materialRef.current) {
      return
    }

    materialRef.current.uniforms.time.value = state.clock.elapsedTime
    materialRef.current.uniforms.intensity.value = 1.0 + Math.sin(state.clock.elapsedTime * 2) * 0.3
  })

  return (
    <mesh ref={mesh} position={position}>
      <planeGeometry args={[size[0], size[1], 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={initialUniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

type EnergyRingProps = {
  radius?: number
  position?: [number, number, number]
  color?: string
}

export function EnergyRing({
  radius = 1,
  position = [0, 0, 0],
  color = '#c000ba',
}: EnergyRingProps) {
  const mesh = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!mesh.current) {
      return
    }

    mesh.current.rotation.z = state.clock.elapsedTime * 0.25
    const material = mesh.current.material as THREE.MeshBasicMaterial
    material.opacity = 0.42 + Math.sin(state.clock.elapsedTime * 3) * 0.18
  })

  return (
    <mesh ref={mesh} position={position}>
      <ringGeometry args={[radius * 0.8, radius, 48]} />
      <meshBasicMaterial color={color} transparent opacity={0.45} side={THREE.DoubleSide} />
    </mesh>
  )
}

function BackgroundPaperScene() {
  const { viewport } = useThree()
  const width = viewport.width
  const height = viewport.height
  const largestEdge = Math.max(width, height)

  return (
    <>
      <color attach="background" args={['#000000']} />

      <ShaderPlane
        position={[0, 0, -2.5]}
        size={[width * 1.8, height * 1.8]}
        color1="#040004"
        color2="#18001f"
      />

      <ShaderPlane
        position={[width * 0.22, height * 0.12, -1.4]}
        size={[largestEdge * 0.95, largestEdge * 0.95]}
        color1="#77008a"
        color2="#f4ddff"
      />

      <ShaderPlane
        position={[-width * 0.2, -height * 0.18, -0.9]}
        size={[largestEdge * 0.88, largestEdge * 1.02]}
        color1="#43085f"
        color2="#a000ad"
      />

      <ShaderPlane
        position={[width * 0.08, -height * 0.02, -0.4]}
        size={[largestEdge * 0.72, largestEdge * 0.72]}
        color1="#c000ba"
        color2="#140019"
      />

      <EnergyRing
        radius={largestEdge * 0.16}
        position={[width * 0.25, height * 0.18, 0.2]}
        color="#c000ba"
      />

      <EnergyRing
        radius={largestEdge * 0.1}
        position={[-width * 0.28, -height * 0.2, 0.25]}
        color="#a000ad"
      />

      <EnergyRing
        radius={largestEdge * 0.075}
        position={[width * 0.04, -height * 0.28, 0.1]}
        color="#f4ddff"
      />
    </>
  )
}

type BackgroundPaperShadersProps = React.ComponentProps<'div'>

export function BackgroundPaperShaders({
  className,
  ...props
}: BackgroundPaperShadersProps) {
  return (
    <div className={cn('absolute inset-0 overflow-hidden', className)} {...props}>
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
      >
        <BackgroundPaperScene />
      </Canvas>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_16%),radial-gradient(circle_at_78%_24%,rgba(255,91,46,0.08),transparent_20%),radial-gradient(circle_at_56%_76%,rgba(33,85,255,0.08),transparent_18%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.3)_0%,transparent_24%,transparent_76%,rgba(0,0,0,0.42)_100%)]" />
    </div>
  )
}
