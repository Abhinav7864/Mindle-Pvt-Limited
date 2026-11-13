"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MeshReflectorMaterial } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

export interface WorldProps {
  progress: number;
  reducedMotion?: boolean;
  activeChapter?: number;
  craftIndex?: number;
  activeFeatureIndex?: number;
  productFocus?: string | null;
}

/**
 * Mathematical smoothstep interpolation with zero derivatives at endpoints.
 * Guarantees zero velocity jump at transition boundaries.
 */
function smoothstep(min: number, max: number, value: number): number {
  if (value <= min) return 0;
  if (value >= max) return 1;
  const x = (value - min) / (max - min);
  return x * x * (3 - 2 * x);
}

/**
 * 1. CHAPTER 01 — EMERGENCE: THE SPARK & AMBIENT STARDUST
 * Calm, dignified presence. Sits poised on the right side of the screen.
 * Active: p in [0.00, 0.19].
 * ZERO wild spinning: gentle, organic breathing pulse and microscopic resting float.
 */
function EmergenceSpark({ progress, reducedMotion }: { progress: number; reducedMotion?: boolean }) {
  const sparkGroup = useRef<THREE.Group>(null);
  const emberCore = useRef<THREE.Mesh>(null);
  const coreLight = useRef<THREE.PointLight>(null);
  const { viewport } = useThree();
  const isMobile = viewport.width < 5.5;

  // Active in Chapter 1, completely dissolved by p = 0.19
  const opacity = 1 - smoothstep(0.12, 0.19, progress);

  useFrame((state) => {
    if (!sparkGroup.current || opacity <= 0.001) return;
    const t = state.clock.getElapsedTime();
    const ptr = state.pointer;

    // Gentle organic breathing pulse (NOT spinning)
    const breathe = 1 + Math.sin(t * 1.6) * 0.04;
    const scale = (isMobile ? 0.65 : 1.0) * breathe;
    sparkGroup.current.scale.setScalar(scale);

    // Microscopic resting drift (under 2 degrees)
    sparkGroup.current.rotation.y = Math.sin(t * 0.35) * 0.04 + (reducedMotion ? 0 : ptr.x * 0.08);
    sparkGroup.current.rotation.x = Math.cos(t * 0.28) * 0.03 + (reducedMotion ? 0 : ptr.y * 0.06);

    if (coreLight.current) {
      coreLight.current.intensity = (6 + Math.sin(t * 2.2) * 1.5) * opacity;
    }
  });

  if (opacity <= 0.001) return null;

  return (
    <group ref={sparkGroup} position={[isMobile ? 0 : 2.0, 0.15, 0]}>
      {/* Central Luminous Incandescent Spark Core */}
      <mesh ref={emberCore}>
        <sphereGeometry args={[0.34, 32, 32]} />
        <meshStandardMaterial
          color="#fffdf0"
          emissive="#ffe4a0"
          emissiveIntensity={2.6}
          transparent
          opacity={opacity}
        />
      </mesh>
      <pointLight ref={coreLight} color="#ffd880" distance={8} intensity={6} />

      {/* Outer Smoky Obsidian Refractive Shell */}
      <mesh>
        <icosahedronGeometry args={[0.62, 3]} />
        <meshPhysicalMaterial
          color="#181816"
          roughness={0.08}
          metalness={0.88}
          clearcoat={1}
          clearcoatRoughness={0.06}
          transmission={0.4}
          ior={1.42}
          transparent
          opacity={opacity * 0.88}
        />
      </mesh>

      {/* Subtle Luminous Blueprint Guides */}
      <group rotation={[0, 0, Math.PI / 12]}>
        <mesh position={[-0.85, 0, 0]}>
          <boxGeometry args={[0.035, 1.3, 0.035]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.8} transparent opacity={opacity * 0.45} />
        </mesh>
        <mesh position={[0.85, 0, 0]}>
          <boxGeometry args={[0.035, 1.3, 0.035]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.8} transparent opacity={opacity * 0.45} />
        </mesh>
      </group>
    </group>
  );
}

/**
 * 2. CHAPTER 02 — TRANSFORMATION: STRATIFIED DRAFTING PLATES
 * Active: p in [0.16, 0.36].
 * Stable, calm isometric perspective stack.
 * ZERO spinning: rests at [rotX: 0.50, rotY: -0.50] with gentle pointer parallax.
 */
function TransformationPlates({ progress, reducedMotion }: { progress: number; reducedMotion?: boolean }) {
  const plateGroup = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const isMobile = viewport.width < 5.5;

  const arrival = smoothstep(0.16, 0.22, progress);
  const departure = 1 - smoothstep(0.32, 0.37, progress);
  const opacity = arrival * departure;

  useFrame((state) => {
    if (!plateGroup.current || opacity <= 0.001) return;
    const t = state.clock.getElapsedTime();
    const ptr = state.pointer;

    // Stable isometric resting orientation with subtle micro-drift
    plateGroup.current.rotation.x = 0.50 + Math.sin(t * 0.25) * 0.02 + (reducedMotion ? 0 : ptr.y * 0.05);
    plateGroup.current.rotation.y = -0.50 + Math.cos(t * 0.22) * 0.02 + (reducedMotion ? 0 : ptr.x * 0.06);
    plateGroup.current.rotation.z = 0;
  });

  if (opacity <= 0.001) return null;

  return (
    <group
      ref={plateGroup}
      position={[isMobile ? 0.3 : 2.4, 0.15, 0]}
      scale={isMobile ? 0.7 : 0.95}
    >
      {[0, 1, 2, 3].map((idx) => {
        const zOffset = (idx - 1.5) * 0.38;
        return (
          <group key={idx} position={[0, idx * 0.08, zOffset]}>
            <mesh castShadow receiveShadow>
              <boxGeometry args={[2.7, 1.75, 0.03]} />
              <meshPhysicalMaterial
                color="#141412"
                metalness={0.4}
                roughness={0.18}
                transmission={0.82}
                thickness={0.5}
                ior={1.46}
                transparent
                opacity={opacity * 0.85}
              />
            </mesh>
            <lineSegments>
              <edgesGeometry args={[new THREE.BoxGeometry(2.72, 1.77, 0.035)]} />
              <lineBasicMaterial color="#ffffff" transparent opacity={opacity * 0.35} />
            </lineSegments>
          </group>
        );
      })}
    </group>
  );
}

/**
 * 3. CHAPTER 03A — GITACONNECT: SACRED ASTRONOMICAL YANTRA
 * Active: p in [0.33, 0.53].
 * Concentric brass & gold astronomical rings with 18 chapter notches.
 * ZERO continuous spinning: rings smoothly rotate to target angle ONLY when user clicks a feature tab!
 */
function GitaHeritageEnvironment({
  progress,
  activeFeatureIndex = 0,
  reducedMotion,
}: {
  progress: number;
  activeFeatureIndex?: number;
  reducedMotion?: boolean;
}) {
  const gitaGroup = useRef<THREE.Group>(null);
  const yantraOuter = useRef<THREE.Mesh>(null);
  const yantraMiddle = useRef<THREE.Group>(null);
  const yantraInner = useRef<THREE.Mesh>(null);
  const warmPedestalLight = useRef<THREE.PointLight>(null);
  const { viewport } = useThree();
  const isMobile = viewport.width < 5.5;

  const arrival = smoothstep(0.33, 0.38, progress);
  const departure = 1 - smoothstep(0.49, 0.54, progress);
  const opacity = arrival * departure;

  // Discrete feature targets
  const featureRotations = useMemo(
    () => [
      { outer: 0, middle: 0, inner: 0 },
      { outer: Math.PI / 4, middle: -Math.PI / 6, inner: Math.PI / 3 },
      { outer: Math.PI / 2, middle: -Math.PI / 3, inner: Math.PI * 0.65 },
      { outer: Math.PI * 0.75, middle: -Math.PI * 0.55, inner: Math.PI * 0.9 },
    ],
    []
  );

  useFrame((state) => {
    if (!gitaGroup.current || opacity <= 0.001) return;
    const ptr = state.pointer;
    const target = featureRotations[activeFeatureIndex] || featureRotations[0];

    // Smoothly rotates to target angle on tab change, then holds STILL
    if (yantraOuter.current) {
      yantraOuter.current.rotation.z = THREE.MathUtils.lerp(
        yantraOuter.current.rotation.z,
        target.outer + (reducedMotion ? 0 : ptr.x * 0.05),
        0.05
      );
    }
    if (yantraMiddle.current) {
      yantraMiddle.current.rotation.z = THREE.MathUtils.lerp(
        yantraMiddle.current.rotation.z,
        target.middle,
        0.05
      );
    }
    if (yantraInner.current) {
      yantraInner.current.rotation.z = THREE.MathUtils.lerp(
        yantraInner.current.rotation.z,
        target.inner,
        0.05
      );
    }

    if (warmPedestalLight.current) {
      warmPedestalLight.current.intensity = 6 * opacity;
    }
  });

  if (opacity <= 0.001) return null;

  return (
    <group ref={gitaGroup} position={[isMobile ? 0 : 2.2, 0.0, -0.6]} scale={isMobile ? 0.75 : 1.0}>
      {/* Outer Sacred Celestial Degree Ring */}
      <mesh ref={yantraOuter}>
        <torusGeometry args={[2.75, 0.016, 16, 72]} />
        <meshStandardMaterial
          color="#d4af37"
          metalness={0.94}
          roughness={0.14}
          emissive="#b8860b"
          emissiveIntensity={0.35}
          transparent
          opacity={opacity * 0.85}
        />
      </mesh>

      {/* Middle Scripture Ring with 18 Chapter Ticks */}
      <group ref={yantraMiddle}>
        <mesh>
          <torusGeometry args={[2.42, 0.014, 16, 64]} />
          <meshStandardMaterial
            color="#e2b714"
            metalness={0.92}
            roughness={0.16}
            transparent
            opacity={opacity * 0.75}
          />
        </mesh>
        {Array.from({ length: 18 }).map((_, i) => {
          const angle = (i / 18) * Math.PI * 2;
          return (
            <mesh key={i} position={[Math.cos(angle) * 2.42, Math.sin(angle) * 2.42, 0]} rotation={[0, 0, angle]}>
              <boxGeometry args={[0.08, 0.018, 0.018]} />
              <meshStandardMaterial
                color="#ffe082"
                emissive="#d4af37"
                emissiveIntensity={0.6}
                transparent
                opacity={opacity * 0.8}
              />
            </mesh>
          );
        })}
      </group>

      {/* Inner Concentric Sanctum Ring */}
      <mesh ref={yantraInner}>
        <torusGeometry args={[2.08, 0.02, 16, 64]} />
        <meshStandardMaterial
          color="#f59e0b"
          metalness={0.96}
          roughness={0.12}
          emissive="#d97706"
          emissiveIntensity={0.5}
          transparent
          opacity={opacity * 0.85}
        />
      </mesh>

      <pointLight ref={warmPedestalLight} position={[0, 0.3, 1.8]} color="#f59e0b" distance={9} intensity={6} />
    </group>
  );
}

/**
 * 4. CHAPTER 03B — PANCHATANTRA AI: ILLUSTRATED FOLKLORE DIORAMA
 * Active: p in [0.49, 0.62].
 * Calm, poetic diorama depth with warm amber lantern and subtle emerald foliage accents.
 * ZERO spinning: rests peacefully behind the storytelling interface.
 */
function PanchatantraFolkloreWorld({ progress, reducedMotion }: { progress: number; reducedMotion?: boolean }) {
  const dioramaGroup = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const isMobile = viewport.width < 5.5;

  const arrival = smoothstep(0.49, 0.54, progress);
  const departure = 1 - smoothstep(0.58, 0.63, progress);
  const opacity = arrival * departure;

  useFrame((state) => {
    if (!dioramaGroup.current || opacity <= 0.001) return;
    const ptr = state.pointer;
    dioramaGroup.current.rotation.y = (reducedMotion ? 0 : ptr.x * 0.06);
    dioramaGroup.current.rotation.x = (reducedMotion ? 0 : ptr.y * 0.04);
  });

  if (opacity <= 0.001) return null;

  return (
    <group
      ref={dioramaGroup}
      position={[isMobile ? 0 : 2.2, -0.05, -0.4]}
      scale={isMobile ? 0.7 : 0.95}
    >
      <mesh rotation={[0, 0, Math.PI / 6]}>
        <torusGeometry args={[1.85, 0.02, 16, 48]} />
        <meshStandardMaterial
          color="#10b981"
          emissive="#059669"
          emissiveIntensity={0.4}
          metalness={0.6}
          roughness={0.3}
          transparent
          opacity={opacity * 0.75}
        />
      </mesh>

      <mesh rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.5, 0.025, 16, 48]} />
        <meshStandardMaterial
          color="#d97706"
          emissive="#b45309"
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={opacity * 0.8}
        />
      </mesh>

      <pointLight position={[0, 0, 1.2]} color="#fbbf24" distance={7} intensity={5 * opacity} />
    </group>
  );
}

/**
 * 5. CHAPTER 04 — THE CRAFT: COMPUTATIONAL SYSTEMS ARCHITECTURE
 * Active: p in [0.60, 0.78].
 * Precision obsidian octahedron with dual data rings.
 * ZERO spinning: reorients only when user clicks a discipline tab, then stays STILL.
 */
function ComputationalLattice({
  progress,
  craftIndex = 0,
  reducedMotion,
}: {
  progress: number;
  craftIndex?: number;
  reducedMotion?: boolean;
}) {
  const craftGroup = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const isMobile = viewport.width < 5.5;

  const arrival = smoothstep(0.60, 0.65, progress);
  const departure = 1 - smoothstep(0.74, 0.79, progress);
  const opacity = arrival * departure;

  const targets = useMemo(
    () => [
      { rotX: 0.2, rotY: 0, rotZ: 0 },
      { rotX: 0.5, rotY: 0.7, rotZ: 0.1 },
      { rotX: -0.2, rotY: 1.2, rotZ: -0.3 },
      { rotX: 0.6, rotY: -0.4, rotZ: 0.4 },
      { rotX: 0.1, rotY: 1.8, rotZ: 0.6 },
    ],
    []
  );

  useFrame(() => {
    if (!craftGroup.current || opacity <= 0.001) return;
    const target = targets[craftIndex] || targets[0];

    // Smoothly lerps to discipline angle on tab click, then holds STILL
    craftGroup.current.rotation.x = THREE.MathUtils.lerp(craftGroup.current.rotation.x, target.rotX, 0.06);
    craftGroup.current.rotation.y = THREE.MathUtils.lerp(craftGroup.current.rotation.y, target.rotY, 0.06);
    craftGroup.current.rotation.z = THREE.MathUtils.lerp(craftGroup.current.rotation.z, target.rotZ, 0.06);
  });

  if (opacity <= 0.001) return null;

  return (
    <group
      ref={craftGroup}
      position={[isMobile ? 0 : 2.2, 0.15, 0]}
      scale={isMobile ? 0.7 : 0.95}
    >
      <mesh castShadow receiveShadow>
        <octahedronGeometry args={[1.15, 0]} />
        <meshPhysicalMaterial
          color="#0d0d0d"
          metalness={0.96}
          roughness={0.08}
          clearcoat={1}
          flatShading
          transparent
          opacity={opacity}
        />
      </mesh>

      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.85, 0.018, 16, 64]} />
        <meshStandardMaterial
          color="#ffffff"
          metalness={0.95}
          roughness={0.12}
          emissive="#ffffff"
          emissiveIntensity={0.5}
          transparent
          opacity={opacity * 0.9}
        />
      </mesh>

      <mesh rotation={[0, Math.PI / 3, 0]}>
        <torusGeometry args={[1.6, 0.014, 16, 64]} />
        <meshStandardMaterial
          color="#93c5fd"
          metalness={0.9}
          roughness={0.15}
          emissive="#3b82f6"
          emissiveIntensity={0.35}
          transparent
          opacity={opacity * 0.75}
        />
      </mesh>
    </group>
  );
}

/**
 * 6. CHAPTER 05 — THE STUDIO: ZERO DISTRACTING 3D
 * Active: p in [0.77, 0.92].
 * Completely calm, grounded reflective horizon plane at floor level.
 * ZERO movement: gives complete, quiet priority to authentic founder portraits.
 */
function StudioAtmosphere({ progress }: { progress: number }) {
  const arrival = smoothstep(0.77, 0.82, progress);
  const departure = 1 - smoothstep(0.89, 0.93, progress);
  const opacity = arrival * departure;

  if (opacity <= 0.001) return null;

  return (
    <group position={[0, -2.4, 0]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[24, 6]} />
        <meshPhysicalMaterial
          color="#080808"
          roughness={0.5}
          metalness={0.8}
          transparent
          opacity={opacity * 0.55}
        />
      </mesh>
    </group>
  );
}

/**
 * 7. CHAPTER 06 — THE CONNECTION: ARCHITECTURAL PORTAL GATEWAY
 * Active: p in [0.90, 1.00].
 * Twin monolithic obsidian pillars rise and stand still, framing the portal light.
 */
function ArchitecturalGateway({ progress }: { progress: number }) {
  const gateGroup = useRef<THREE.Group>(null);
  const opacity = smoothstep(0.90, 0.95, progress);

  if (opacity <= 0.001) return null;

  return (
    <group ref={gateGroup} position={[0, 0.1, 0]}>
      <mesh position={[-0.95, 0, 0]}>
        <boxGeometry args={[0.3, 2.6, 0.4]} />
        <meshPhysicalMaterial color="#0c0c0c" metalness={0.95} roughness={0.08} clearcoat={1} transparent opacity={opacity} />
      </mesh>
      <mesh position={[0.95, 0, 0]}>
        <boxGeometry args={[0.3, 2.6, 0.4]} />
        <meshPhysicalMaterial color="#0c0c0c" metalness={0.95} roughness={0.08} clearcoat={1} transparent opacity={opacity} />
      </mesh>
      <pointLight position={[0, 0, 0.5]} color="#ffffff" distance={8} intensity={5 * opacity} />
    </group>
  );
}

/**
 * MASTER LIGHTING RIG
 * Smooth cross-fading of chapter lighting moods without abrupt flashes.
 */
function ContinuousLighting({ progress }: { progress: number }) {
  const gitaLight = smoothstep(0.33, 0.38, progress) * (1 - smoothstep(0.49, 0.54, progress));
  const panchaLight = smoothstep(0.49, 0.54, progress) * (1 - smoothstep(0.58, 0.63, progress));
  const craftLight = smoothstep(0.60, 0.65, progress) * (1 - smoothstep(0.74, 0.79, progress));

  return (
    <>
      <ambientLight intensity={0.16} />
      <spotLight
        position={[6, 8, 7]}
        intensity={54}
        angle={0.42}
        penumbra={0.9}
        color="#ffffff"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      {/* Saffron-Amber Grazing Spot for GitaConnect */}
      <spotLight position={[5, 3, 4]} intensity={gitaLight * 42} angle={0.55} penumbra={1} color="#f59e0b" />
      {/* Emerald-Amber Accent for Panchatantra */}
      <pointLight position={[3, 0, 3]} intensity={panchaLight * 26} distance={10} color="#10b981" />
      {/* Cool Specular Blue Spot for The Craft */}
      <spotLight position={[4, 6, 5]} intensity={craftLight * 32} angle={0.48} penumbra={0.8} color="#93c5fd" />
    </>
  );
}

/**
 * CONTINUOUS CAMERA RIG
 * Calm, stable framing across the journey.
 * Zero erratic camera swings: camera maintains a consistent, comfortable right-side visual anchor.
 */
function ContinuousCameraPath({ progress, reducedMotion }: WorldProps) {
  const { camera, size } = useThree();
  const isMobile = size.width < 768;
  const smoothPRef = useRef(progress);
  const currentLookAt = useMemo(() => new THREE.Vector3(), []);

  // 7 Calm, Disciplined Waypoints
  const cameraSpline = useMemo(() => {
    const pts = isMobile
      ? [
          new THREE.Vector3(0.0, 0.15, 8.2), // 0.00: Ch1
          new THREE.Vector3(0.0, 0.15, 8.2), // 0.20: Ch2
          new THREE.Vector3(0.0, 0.05, 8.2), // 0.42: Ch3A
          new THREE.Vector3(0.0, -0.05, 8.0), // 0.55: Ch3B
          new THREE.Vector3(0.0, 0.15, 8.0), // 0.72: Ch4
          new THREE.Vector3(0.0, 0.40, 8.6), // 0.86: Ch5
          new THREE.Vector3(0.0, 0.10, 7.6), // 1.00: Ch6
        ]
      : [
          new THREE.Vector3(1.8, 0.15, 6.8), // 0.00: Ch1
          new THREE.Vector3(2.0, 0.15, 6.9), // 0.20: Ch2
          new THREE.Vector3(1.9, 0.05, 6.9), // 0.42: Ch3A
          new THREE.Vector3(1.7, -0.05, 6.8), // 0.55: Ch3B
          new THREE.Vector3(1.9, 0.15, 6.8), // 0.72: Ch4
          new THREE.Vector3(0.0, 0.50, 7.6), // 0.86: Ch5
          new THREE.Vector3(0.0, 0.10, 6.6), // 1.00: Ch6
        ];
    return new THREE.CatmullRomCurve3(pts, false, "centripetal");
  }, [isMobile]);

  const targetSpline = useMemo(() => {
    const targets = isMobile
      ? [
          new THREE.Vector3(0.0, 0.10, 0),
          new THREE.Vector3(0.0, 0.10, 0),
          new THREE.Vector3(0.0, 0.00, 0),
          new THREE.Vector3(0.0, -0.05, 0),
          new THREE.Vector3(0.0, 0.10, 0),
          new THREE.Vector3(0.0, -0.15, 0),
          new THREE.Vector3(0.0, 0.10, 0),
        ]
      : [
          new THREE.Vector3(1.6, 0.10, 0),
          new THREE.Vector3(1.8, 0.10, 0),
          new THREE.Vector3(1.7, 0.00, 0),
          new THREE.Vector3(1.5, -0.05, 0),
          new THREE.Vector3(1.7, 0.10, 0),
          new THREE.Vector3(0.0, -0.20, 0),
          new THREE.Vector3(0.0, 0.10, 0),
        ];
    return new THREE.CatmullRomCurve3(targets, false, "centripetal");
  }, [isMobile]);

  useFrame((state, delta) => {
    const targetP = Math.max(0, Math.min(1, progress));
    const p = reducedMotion
      ? targetP
      : THREE.MathUtils.damp(smoothPRef.current, targetP, 5.0, delta);
    smoothPRef.current = p;

    const idealCamPos = cameraSpline.getPointAt(p);
    const idealTarget = targetSpline.getPointAt(p);

    if (!reducedMotion) {
      idealCamPos.x += state.pointer.x * 0.08;
      idealCamPos.y += state.pointer.y * 0.05;
    }

    camera.position.copy(idealCamPos);
    currentLookAt.copy(idealTarget);
    camera.lookAt(currentLookAt);
  });

  return null;
}

/**
 * MASTER STUDIO STAGE RIG
 */
function Stage({
  progress,
  craftIndex = 0,
  activeFeatureIndex = 0,
  reducedMotion,
}: WorldProps) {
  const { gl } = useThree();

  useEffect(() => {
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = 1.28;
  }, [gl]);

  return (
    <>
      <color attach="background" args={["#050505"]} />
      <fog attach="fog" args={["#050505", 8, 28]} />

      <ContinuousLighting progress={progress} />

      <EmergenceSpark progress={progress} reducedMotion={reducedMotion} />
      <TransformationPlates progress={progress} reducedMotion={reducedMotion} />
      <GitaHeritageEnvironment
        progress={progress}
        activeFeatureIndex={activeFeatureIndex}
        reducedMotion={reducedMotion}
      />
      <PanchatantraFolkloreWorld progress={progress} reducedMotion={reducedMotion} />
      <ComputationalLattice progress={progress} craftIndex={craftIndex} reducedMotion={reducedMotion} />
      <StudioAtmosphere progress={progress} />
      <ArchitecturalGateway progress={progress} />

      {/* Reflective Studio Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.2, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <MeshReflectorMaterial
          mirror={0.52}
          resolution={768}
          mixBlur={1.4}
          mixStrength={1.8}
          roughness={0.48}
          color="#080808"
          metalness={0.85}
        />
      </mesh>

      {!reducedMotion && (
        <EffectComposer multisampling={0}>
          <Bloom intensity={0.38} luminanceThreshold={0.85} luminanceSmoothing={0.65} mipmapBlur />
        </EffectComposer>
      )}
    </>
  );
}

function SceneFallback() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#050505]" aria-hidden="true">
      <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-[radial-gradient(circle_at_40%_40%,#282826_0%,#111111_40%,#050505_70%)] shadow-[0_0_120px_rgba(255,255,255,0.06)]" />
    </div>
  );
}

export function MindleWorld({
  progress,
  reducedMotion = false,
  activeChapter = 1,
  craftIndex = 0,
  activeFeatureIndex = 0,
  productFocus = null,
}: WorldProps) {
  return (
    <div className="absolute inset-0" aria-label="Mindle organic 3D storytelling world" role="img">
      <Canvas
        dpr={typeof window !== "undefined" && window.innerWidth < 768 ? [1, 1.25] : [1, 1.6]}
        camera={{ position: [1.8, 0.15, 6.8], fov: 36, near: 0.1, far: 45 }}
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
          activeFeatureIndex={activeFeatureIndex}
          productFocus={productFocus}
        />
        <ContinuousCameraPath
          progress={progress}
          reducedMotion={reducedMotion}
          activeChapter={activeChapter}
          craftIndex={craftIndex}
          activeFeatureIndex={activeFeatureIndex}
          productFocus={productFocus}
        />
      </Canvas>
    </div>
  );
}
export default MindleWorld;
