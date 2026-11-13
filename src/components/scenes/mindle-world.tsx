"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshReflectorMaterial, MeshTransmissionMaterial } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

export interface WorldProps {
  progress: number;
  reducedMotion?: boolean;
  activeChapter?: number;
  craftIndex?: number;
  productFocus?: string | null;
}

/**
 * Procedural Organic Sculptural Ribbon with dynamic vertex wave modulation.
 * Morphs seamlessly from a spark droplet to unfolding ribbons, product cradles,
 * precision faceted architecture, and an infinite Mobius loop.
 */
function OrganicRibbon({ progress, reducedMotion }: WorldProps) {
  const outerMesh = useRef<THREE.Mesh>(null);
  const innerMesh = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const isMobile = viewport.width < 5.5;

  // Base geometries
  const { ribbonGeo, coreGeo, ringGeo } = useMemo(() => {
    // TorusKnot provides rich curvature, fluid topology, and endless self-wrapping surfaces
    const ribbon = new THREE.TorusKnotGeometry(1.65, 0.42, 128, 32, 2, 3);
    const core = new THREE.IcosahedronGeometry(0.95, 4);
    const ring = new THREE.TorusGeometry(2.35, 0.028, 16, 64);
    return { ribbonGeo: ribbon, coreGeo: core, ringGeo: ring };
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const ptr = state.pointer;
    const timeline = reducedMotion ? 0.5 : Math.max(0, Math.min(1, progress));

    // Phase 1: Spark (0.0 - 0.16)
    // Phase 2: Transformation (0.16 - 0.38)
    // Phase 3: Product Universe (0.38 - 0.60)
    // Phase 4: The Craft (0.60 - 0.78)
    // Phase 5: The Studio (0.78 - 0.90)
    // Phase 6: The Connection (0.90 - 1.0)

    if (outerMesh.current) {
      // Rotation dynamics driven by scroll and ambient time
      const baseRotY = t * 0.22 + timeline * Math.PI * 3.2;
      const baseRotX = Math.sin(t * 0.18) * 0.25 + timeline * Math.PI * 1.5;
      const baseRotZ = Math.cos(t * 0.15) * 0.18 + (timeline > 0.6 ? (timeline - 0.6) * 1.8 : 0);

      // Interactive cursor tilt with smooth damping
      const targetRotX = baseRotX + (reducedMotion ? 0 : ptr.y * 0.28);
      const targetRotY = baseRotY + (reducedMotion ? 0 : ptr.x * 0.35);

      outerMesh.current.rotation.x = THREE.MathUtils.lerp(outerMesh.current.rotation.x, targetRotX, 0.08);
      outerMesh.current.rotation.y = THREE.MathUtils.lerp(outerMesh.current.rotation.y, targetRotY, 0.08);
      outerMesh.current.rotation.z = THREE.MathUtils.lerp(outerMesh.current.rotation.z, baseRotZ, 0.08);

      // Scale & Spatial Morphing across Chapters
      let targetScale = isMobile ? 0.68 : 1.0;
      let targetPosX = 0;
      let targetPosY = 0;
      let targetPosZ = 0;

      if (timeline < 0.18) {
        // C1: Emergence — compact droplet emerging from void
        const emerge = Math.min(1, timeline / 0.12);
        targetScale = (isMobile ? 0.55 : 0.82) * (0.4 + emerge * 0.6);
        targetPosX = isMobile ? 0 : 1.2;
        targetPosY = 0.2;
      } else if (timeline < 0.40) {
        // C2: Transformation — opens out, moves right to give column room for manifesto
        const p2 = (timeline - 0.18) / 0.22;
        targetScale = (isMobile ? 0.62 : 1.12) * (1 + Math.sin(p2 * Math.PI) * 0.15);
        targetPosX = isMobile ? 0.3 : 2.75;
        targetPosY = 0.1;
      } else if (timeline < 0.62) {
        // C3: Product Universe — frames product viewports
        const p3 = (timeline - 0.40) / 0.22;
        targetScale = isMobile ? 0.58 : 0.95;
        targetPosX = isMobile ? 0 : (p3 < 0.5 ? 2.9 : -2.8);
        targetPosY = p3 < 0.5 ? 0.4 : -0.2;
      } else if (timeline < 0.80) {
        // C4: The Craft — centered, crystalline geometric alignment
        targetScale = isMobile ? 0.65 : 1.05;
        targetPosX = isMobile ? 0 : 2.2;
        targetPosY = 0.3;
      } else if (timeline < 0.92) {
        // C5: The Studio — relaxes into horizontal horizon silhouette
        targetScale = isMobile ? 0.5 : 0.85;
        targetPosX = isMobile ? 0 : 0;
        targetPosY = -1.6;
      } else {
        // C6: The Connection — centered pure Mobius loop
        targetScale = isMobile ? 0.62 : 0.98;
        targetPosX = 0;
        targetPosY = 0.15;
      }

      outerMesh.current.scale.setScalar(
        THREE.MathUtils.lerp(outerMesh.current.scale.x, targetScale, 0.08)
      );
      outerMesh.current.position.x = THREE.MathUtils.lerp(outerMesh.current.position.x, targetPosX, 0.08);
      outerMesh.current.position.y = THREE.MathUtils.lerp(outerMesh.current.position.y, targetPosY, 0.08);
      outerMesh.current.position.z = THREE.MathUtils.lerp(outerMesh.current.position.z, targetPosZ, 0.08);
    }

    // Inner Translucent Glass Core
    if (innerMesh.current && outerMesh.current) {
      innerMesh.current.position.copy(outerMesh.current.position);
      innerMesh.current.rotation.x = -outerMesh.current.rotation.x * 0.6;
      innerMesh.current.rotation.y = outerMesh.current.rotation.y * 1.25;
      innerMesh.current.rotation.z = t * 0.3;

      // Pulse core gently with breathing frequency
      const breathe = 1 + Math.sin(t * 1.8) * 0.06;
      const coreScale = outerMesh.current.scale.x * 0.62 * breathe;
      innerMesh.current.scale.setScalar(coreScale);
    }

    // Orbiting Precision Rings (Awaken during Chapter 4 Craft)
    if (ringRef.current && outerMesh.current) {
      ringRef.current.position.copy(outerMesh.current.position);
      const ringActive = timeline > 0.55 && timeline < 0.85 ? 1 : 0.15;
      const currentScale = ringRef.current.scale.x;
      const targetRingScale = (outerMesh.current.scale.x * 1.3) * ringActive;
      ringRef.current.scale.setScalar(THREE.MathUtils.lerp(currentScale, targetRingScale, 0.06));
      ringRef.current.rotation.x = t * 0.4 + timeline * 2;
      ringRef.current.rotation.y = t * 0.25;
    }
  });

  return (
    <>
      {/* Outer Shell: Sculptural Liquid Chrome */}
      <mesh ref={outerMesh} geometry={ribbonGeo} castShadow receiveShadow>
        <meshPhysicalMaterial
          color="#121212"
          emissive="#080808"
          roughness={0.08}
          metalness={0.96}
          clearcoat={1}
          clearcoatRoughness={0.06}
          reflectivity={1}
          envMapIntensity={1.8}
        />
      </mesh>

      {/* Inner Core: Frosted Translucent Glass with Chromatic Dispersion */}
      <mesh ref={innerMesh} geometry={coreGeo}>
        <MeshTransmissionMaterial
          color="#ffffff"
          transmission={0.88}
          roughness={0.04}
          thickness={0.75}
          ior={1.48}
          chromaticAberration={0.026}
          distortion={0.16}
          distortionScale={0.25}
          temporalDistortion={0.08}
        />
      </mesh>

      {/* Precision Geometric Architectural Rings (The Craft) */}
      <group ref={ringRef}>
        <mesh geometry={ringGeo}>
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.98}
            roughness={0.12}
            emissive="#ffffff"
            emissiveIntensity={0.28}
          />
        </mesh>
        <mesh geometry={ringGeo} rotation={[Math.PI / 2, 0, 0]} scale={0.86}>
          <meshStandardMaterial
            color="#a3a3a0"
            metalness={0.92}
            roughness={0.16}
            transparent
            opacity={0.65}
          />
        </mesh>
      </group>
    </>
  );
}

/**
 * Lighting & Environment Stage:
 * Monochromatic cinematic studio lighting with high specular contrast,
 * subtle volumetric dust cone, and ground contact shadow reflections.
 */
function Stage({ progress, reducedMotion }: WorldProps) {
  const { gl } = useThree();
  const lightConeRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = 1.24;
  }, [gl]);

  useFrame((state) => {
    if (!lightConeRef.current) return;
    const t = state.clock.getElapsedTime();
    lightConeRef.current.rotation.y = reducedMotion ? 0 : t * 0.018;
    lightConeRef.current.position.x = 2.4 + Math.sin(t * 0.3) * 0.3;
  });

  return (
    <>
      <color attach="background" args={["#050505"]} />
      <fog attach="fog" args={["#050505", 8, 26]} />

      {/* Studio Ambient Rim & Key Lights */}
      <ambientLight intensity={0.12} />

      {/* Primary Key Spotlight */}
      <spotLight
        position={[5.5, 7.5, 6.2]}
        intensity={64}
        angle={0.44}
        penumbra={0.9}
        color="#ffffff"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />

      {/* Grazing Rim Spotlight */}
      <spotLight
        position={[-5.8, 1.2, 3.4]}
        intensity={22}
        angle={0.52}
        penumbra={1}
        color="#d2d2ce"
      />

      {/* Bottom Uplight illuminating chrome curves from below */}
      <pointLight position={[0.5, -2.4, 3.8]} intensity={12} color="#ffffff" distance={10} />

      {/* Backlight creating rim silhouette against void */}
      <pointLight position={[-1.2, 2.2, -4.5]} intensity={16} color="#ffffff" distance={12} />

      {/* Volumetric Soft Atmosphere Cone */}
      <mesh ref={lightConeRef} position={[2.4, 2.6, -4.2]} rotation={[0.12, -0.28, 0]}>
        <coneGeometry args={[2.8, 12, 36, 1, true]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.016}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Organic Sculpture System */}
      <Float
        speed={reducedMotion ? 0 : 1.2}
        rotationIntensity={reducedMotion ? 0 : 0.18}
        floatIntensity={reducedMotion ? 0 : 0.28}
        floatingRange={[-0.08, 0.08]}
      >
        <OrganicRibbon progress={progress} reducedMotion={reducedMotion} />
      </Float>

      {/* Reflective Studio Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.2, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <MeshReflectorMaterial
          mirror={0.55}
          resolution={768}
          mixBlur={1.4}
          mixStrength={1.8}
          roughness={0.46}
          color="#080808"
          metalness={0.82}
        />
      </mesh>

      {/* Controlled Post-Processing Bloom */}
      {!reducedMotion && (
        <EffectComposer multisampling={0}>
          <Bloom
            intensity={0.48}
            luminanceThreshold={0.82}
            luminanceSmoothing={0.65}
            mipmapBlur
          />
        </EffectComposer>
      )}
    </>
  );
}

/**
 * Camera Path Controller:
 * Smoothly interpolates the camera along a 6-chapter trajectory,
 * coordinated with scroll timeline and damped mouse parallax.
 */
function CameraPath({ progress, reducedMotion }: WorldProps) {
  const { camera, pointer, size } = useThree();
  const isMobile = size.width < 768;

  // Key camera waypoints across the 6 chapters
  const wp1 = useMemo(() => new THREE.Vector3(isMobile ? 0 : 2.2, 0.4, isMobile ? 9.8 : 8.8), [isMobile]); // C1: Emergence
  const wp2 = useMemo(() => new THREE.Vector3(isMobile ? 1.0 : 3.8, 0.2, isMobile ? 8.4 : 7.6), [isMobile]); // C2: Transformation
  const wp3 = useMemo(() => new THREE.Vector3(isMobile ? 0.4 : 3.2, -0.2, isMobile ? 8.2 : 7.2), [isMobile]); // C3: Product Universe
  const wp4 = useMemo(() => new THREE.Vector3(isMobile ? 0 : 2.4, 0.6, isMobile ? 8.0 : 7.0), [isMobile]); // C4: The Craft
  const wp5 = useMemo(() => new THREE.Vector3(0, 1.2, isMobile ? 9.2 : 8.5), [isMobile]); // C5: The Studio
  const wp6 = useMemo(() => new THREE.Vector3(0, 0.2, isMobile ? 7.6 : 6.8), [isMobile]); // C6: The Connection

  const currentCamPos = useMemo(() => new THREE.Vector3(), []);
  const lookTarget = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    const p = reducedMotion ? 0.5 : Math.max(0, Math.min(1, progress));

    // Piecewise bezier-like camera interpolation
    if (p < 0.20) {
      const t = p / 0.20;
      currentCamPos.lerpVectors(wp1, wp2, t);
      lookTarget.set(isMobile ? 0 : 1.2, 0, 0);
    } else if (p < 0.42) {
      const t = (p - 0.20) / 0.22;
      currentCamPos.lerpVectors(wp2, wp3, t);
      lookTarget.set(isMobile ? 0.2 : 2.2, 0, 0);
    } else if (p < 0.65) {
      const t = (p - 0.42) / 0.23;
      currentCamPos.lerpVectors(wp3, wp4, t);
      lookTarget.set(isMobile ? 0 : 1.4, 0, 0);
    } else if (p < 0.85) {
      const t = (p - 0.65) / 0.20;
      currentCamPos.lerpVectors(wp4, wp5, t);
      lookTarget.set(0, -0.6, 0);
    } else {
      const t = (p - 0.85) / 0.15;
      currentCamPos.lerpVectors(wp5, wp6, t);
      lookTarget.set(0, 0.1, 0);
    }

    // Subtle pointer parallax
    currentCamPos.x += (reducedMotion ? 0 : pointer.x * 0.18);
    currentCamPos.y += (reducedMotion ? 0 : pointer.y * 0.12);

    camera.position.lerp(currentCamPos, 0.07);
    camera.lookAt(lookTarget);
  });

  return null;
}

/** Pure CSS / SVG fallback for devices without WebGL or with reduced-motion */
function SceneFallback() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#050505]" aria-hidden="true">
      <div className="absolute top-1/2 left-1/2 h-[550px] w-[550px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-[radial-gradient(circle_at_40%_40%,#282826_0%,#111111_40%,#050505_70%)] shadow-[0_0_120px_rgba(255,255,255,0.06)]" />
      <div className="absolute top-1/2 left-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-transparent" />
      <div className="absolute top-1/2 left-1/2 h-[1px] w-[700px] -translate-x-1/2 -translate-y-1/2 rotate-[-25deg] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
    </div>
  );
}

/**
 * MindleWorld: The Master Continuous 3D Organic Environment.
 * Runs in a single shared WebGL canvas, smoothly responding to scroll progress,
 * pointer movement, and chapter progression without remounting.
 */
export function MindleWorld({
  progress,
  reducedMotion = false,
  activeChapter = 1,
  craftIndex = 0,
  productFocus = null,
}: WorldProps) {
  return (
    <div className="absolute inset-0" aria-label="Mindle organic 3D digital journey" role="img">
      <Canvas
        dpr={typeof window !== "undefined" && window.innerWidth < 768 ? [1, 1.25] : [1, 1.6]}
        camera={{ position: [2.2, 0.4, 8.8], fov: 36, near: 0.1, far: 45 }}
        shadows
        gl={{
          alpha: false,
          antialias: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
        }}
        fallback={<SceneFallback />}
      >
        <Stage
          progress={progress}
          reducedMotion={reducedMotion}
          activeChapter={activeChapter}
          craftIndex={craftIndex}
          productFocus={productFocus}
        />
        <CameraPath
          progress={progress}
          reducedMotion={reducedMotion}
          activeChapter={activeChapter}
          craftIndex={craftIndex}
          productFocus={productFocus}
        />
      </Canvas>
    </div>
  );
}
export default MindleWorld;
