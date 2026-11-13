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
 * 1. CHAPTER 01 — EMERGENCE: THE SPARK & LOGO DRAFTING RIBBONS
 * At p = 0.00: The incandescent ember floats in darkness.
 * As p moves 0.04 -> 0.16: Ember breathes and releases kinetic light ribbons tracing Mindle DNA.
 * As p moves 0.16 -> 0.25 (Departure / Morph): The ember recedes into depth, and the ribbons
 * unfold and flatten, transforming into the isometric frame of the Chapter 02 drafting plates.
 */
function EmergenceSpark({ progress, reducedMotion }: { progress: number; reducedMotion?: boolean }) {
  const sparkGroup = useRef<THREE.Group>(null);
  const emberCore = useRef<THREE.Mesh>(null);
  const coreLight = useRef<THREE.PointLight>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const { viewport } = useThree();
  const isMobile = viewport.width < 5.5;

  // Active from 0.00 to 0.26 with continuous smooth arrival and departure
  const arrival = 1; // starts at p=0
  const departure = 1 - smoothstep(0.16, 0.26, progress);
  const opacity = arrival * departure;

  // Morph progress towards Chapter 2 drafting plates
  const morphToCh2 = smoothstep(0.14, 0.25, progress);

  // Procedural warm ember dust particles
  const particleGeo = useMemo(() => {
    const count = 48;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const r = 0.6 + Math.random() * 2.2;
      pos[i * 3] = Math.cos(theta) * r;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 2.5;
      pos[i * 3 + 2] = Math.sin(theta) * r;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return geo;
  }, []);

  useFrame((state) => {
    if (!sparkGroup.current || opacity <= 0.0001) return;
    const t = state.clock.getElapsedTime();
    const ptr = state.pointer;

    // Organic breathing pulse of the incandescent spark
    const breathe = 1 + Math.sin(t * 3.2) * 0.08;
    const emerge = Math.min(1, progress / 0.10);

    // Position morphs towards Chapter 2 coordinate [isMobile ? 0.3 : 2.8, 0.2, 0]
    const baseX = THREE.MathUtils.lerp(isMobile ? 0 : 2.0, isMobile ? 0.3 : 2.8, morphToCh2);
    const baseY = THREE.MathUtils.lerp(0.15, 0.20, morphToCh2);
    const baseZ = THREE.MathUtils.lerp(0, -1.2, morphToCh2);

    sparkGroup.current.position.set(baseX, baseY, baseZ);

    const scale = (isMobile ? 0.65 : 1.0) * (0.6 + emerge * 0.4) * breathe;
    sparkGroup.current.scale.setScalar(scale);

    // Rotation unfolds as it morphs into drafting plane orientation
    const rotY = THREE.MathUtils.lerp(t * 0.35 + (reducedMotion ? 0 : ptr.x * 0.2), -0.55, morphToCh2);
    const rotX = THREE.MathUtils.lerp(Math.sin(t * 0.25) * 0.12 + (reducedMotion ? 0 : ptr.y * 0.15), 0.55, morphToCh2);

    sparkGroup.current.rotation.x = rotX;
    sparkGroup.current.rotation.y = rotY;

    if (coreLight.current) {
      coreLight.current.intensity = (7 + Math.sin(t * 4.5) * 2.5) * opacity * (1 - morphToCh2);
    }

    if (emberCore.current) {
      emberCore.current.scale.setScalar(Math.max(0.001, 1 - morphToCh2 * 1.2));
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y = t * 0.08;
      particlesRef.current.rotation.x = t * 0.04;
    }
  });

  return (
    <group ref={sparkGroup} position={[isMobile ? 0 : 2.0, 0.15, 0]} visible={opacity > 0.001}>
      {/* Central Luminous Incandescent Spark Core */}
      <mesh ref={emberCore}>
        <sphereGeometry args={[0.32, 32, 32]} />
        <meshStandardMaterial
          color="#fffdf0"
          emissive="#ffe4a0"
          emissiveIntensity={2.8}
          transparent
          opacity={opacity}
        />
      </mesh>
      <pointLight ref={coreLight} color="#ffd880" distance={8} intensity={7} />

      {/* Outer Smoky Obsidian Refractive Shell */}
      <mesh scale={Math.max(0.01, 1 - morphToCh2 * 0.9)}>
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
          opacity={opacity * 0.9}
        />
      </mesh>

      {/* Kinetic Brand Geometry Lines (Unfolds from Logo into Drafting Frame) */}
      <group rotation={[0, 0, Math.PI / 12]}>
        {/* Left Pillar Guide */}
        <mesh
          position={[
            THREE.MathUtils.lerp(-0.85, -1.35, morphToCh2),
            0,
            THREE.MathUtils.lerp(0, -0.4, morphToCh2),
          ]}
          scale={[
            THREE.MathUtils.lerp(1, 2.5, morphToCh2),
            THREE.MathUtils.lerp(1, 1.3, morphToCh2),
            1,
          ]}
        >
          <boxGeometry args={[0.04, 1.4, 0.04]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#ffffff"
            emissiveIntensity={THREE.MathUtils.lerp(1.2, 0.3, morphToCh2)}
            transparent
            opacity={opacity * 0.6}
          />
        </mesh>

        {/* Right Pillar Guide */}
        <mesh
          position={[
            THREE.MathUtils.lerp(0.85, 1.35, morphToCh2),
            0,
            THREE.MathUtils.lerp(0, 0.4, morphToCh2),
          ]}
          scale={[
            THREE.MathUtils.lerp(1, 2.5, morphToCh2),
            THREE.MathUtils.lerp(1, 1.3, morphToCh2),
            1,
          ]}
        >
          <boxGeometry args={[0.04, 1.4, 0.04]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#ffffff"
            emissiveIntensity={THREE.MathUtils.lerp(1.2, 0.3, morphToCh2)}
            transparent
            opacity={opacity * 0.6}
          />
        </mesh>

        {/* Center Diagonal Fold V-Lines */}
        <mesh
          position={[-0.42, 0.15, 0]}
          rotation={[0, 0, THREE.MathUtils.lerp(-Math.PI / 4, 0, morphToCh2)]}
          scale={[THREE.MathUtils.lerp(1, 3.2, morphToCh2), 1, 1]}
        >
          <boxGeometry args={[0.03, 1.05, 0.03]} />
          <meshStandardMaterial
            color="#d4d4ce"
            emissive="#ffffff"
            emissiveIntensity={0.8}
            transparent
            opacity={opacity * 0.45 * (1 - morphToCh2)}
          />
        </mesh>

        <mesh
          position={[0.42, 0.15, 0]}
          rotation={[0, 0, THREE.MathUtils.lerp(Math.PI / 4, 0, morphToCh2)]}
          scale={[THREE.MathUtils.lerp(1, 3.2, morphToCh2), 1, 1]}
        >
          <boxGeometry args={[0.03, 1.05, 0.03]} />
          <meshStandardMaterial
            color="#d4d4ce"
            emissive="#ffffff"
            emissiveIntensity={0.8}
            transparent
            opacity={opacity * 0.45 * (1 - morphToCh2)}
          />
        </mesh>
      </group>

      {/* Atmospheric Ember Micro-Sparks */}
      <points ref={particlesRef} geometry={particleGeo}>
        <pointsMaterial
          size={0.028}
          color="#ffebaa"
          transparent
          opacity={opacity * 0.75 * (1 - morphToCh2 * 0.7)}
          sizeAttenuation
        />
      </points>
    </group>
  );
}

/**
 * 2. CHAPTER 02 — TRANSFORMATION: STRATIFIED DRAFTING PLATES
 * Arrival (0.16 -> 0.25): Emerges seamlessly from the unfolding logo ribbons.
 * Focus (0.22 -> 0.36): Stratified isometric glass plates with blueprint edge wireframes.
 * Departure (0.34 -> 0.44): Plates rotate and round their contours, morphing into the celestial
 * rings of Chapter 03 GitaConnect.
 */
function TransformationPlates({ progress, reducedMotion }: { progress: number; reducedMotion?: boolean }) {
  const plateGroup = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const isMobile = viewport.width < 5.5;

  const arrival = smoothstep(0.16, 0.25, progress);
  const departure = 1 - smoothstep(0.34, 0.44, progress);
  const opacity = arrival * departure;

  // Morph factor into Chapter 3 circular Yantra alignment
  const morphToCh3 = smoothstep(0.32, 0.44, progress);

  useFrame((state) => {
    if (!plateGroup.current || opacity <= 0.0001) return;
    const t = state.clock.getElapsedTime();
    const ptr = state.pointer;

    const baseRotX = 0.55 + Math.sin(t * 0.2) * 0.05 + (reducedMotion ? 0 : ptr.y * 0.08);
    const baseRotY = -0.55 + Math.cos(t * 0.2) * 0.05 + (reducedMotion ? 0 : ptr.x * 0.10);

    // Morph rotation towards Yantra frontal angle (rotX -> 0, rotY -> 0, rotZ spins)
    plateGroup.current.rotation.x = THREE.MathUtils.lerp(baseRotX, 0, morphToCh3);
    plateGroup.current.rotation.y = THREE.MathUtils.lerp(baseRotY, 0, morphToCh3);
    plateGroup.current.rotation.z = THREE.MathUtils.lerp(0, Math.PI / 4 + t * 0.05, morphToCh3);

    // Position lerps towards GitaConnect Yantra center [isMobile ? 0 : 2.5, 0.0, -0.6]
    const targetX = THREE.MathUtils.lerp(isMobile ? 0.3 : 2.8, isMobile ? 0 : 2.5, morphToCh3);
    const targetY = THREE.MathUtils.lerp(0.2, 0.0, morphToCh3);
    const targetZ = THREE.MathUtils.lerp(0, -0.6, morphToCh3);

    plateGroup.current.position.set(targetX, targetY, targetZ);
  });

  return (
    <group
      ref={plateGroup}
      position={[isMobile ? 0.3 : 2.8, 0.2, 0]}
      scale={isMobile ? 0.7 : 1.0}
      visible={opacity > 0.001}
    >
      {[0, 1, 2, 3].map((idx) => {
        const zOffset = (idx - 1.5) * 0.42 * (1 - morphToCh3 * 0.6);
        return (
          <group
            key={idx}
            position={[0, idx * 0.12 * (1 - morphToCh3), zOffset]}
            rotation={[0, 0, idx * (Math.PI / 18) * (1 - morphToCh3)]}
          >
            <mesh castShadow receiveShadow>
              <boxGeometry args={[2.8, 1.8, 0.035]} />
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
            {/* Fine Laser-Etched Blueprint Perimeter Wire */}
            <lineSegments>
              <edgesGeometry args={[new THREE.BoxGeometry(2.82, 1.82, 0.04)]} />
              <lineBasicMaterial
                color={morphToCh3 > 0.3 ? "#d4af37" : "#ffffff"}
                transparent
                opacity={opacity * 0.45}
              />
            </lineSegments>
          </group>
        );
      })}
    </group>
  );
}

/**
 * 3. CHAPTER 03A — GITACONNECT: SACRED YANTRA & SCRIPTURAL PEDESTAL
 * Arrival (0.34 -> 0.44): Unfolds directly from the rotating drafting plates.
 * Focus (0.38 -> 0.52): Full presence behind the authentic iOS interface with 18 chapter markers.
 * Departure (0.48 -> 0.62): Tilts backward into depth (z: -0.6 -> -2.2), acting as celestial
 * backdrop for the Panchatantra folklore world, before converging into Chapter 04 lattice.
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

  const arrival = smoothstep(0.33, 0.43, progress);
  const departure = 1 - smoothstep(0.58, 0.68, progress);
  const opacity = arrival * departure;

  // Transition to Panchatantra (03B) backdrop (0.48 -> 0.58)
  const panchatantraBackdrop = smoothstep(0.48, 0.58, progress);
  // Morph to Chapter 04 computational octahedron (0.58 -> 0.68)
  const morphToCh4 = smoothstep(0.58, 0.68, progress);

  const featureRotations = useMemo(
    () => [
      { outer: 0, middle: 0, inner: 0 },
      { outer: Math.PI / 4, middle: -Math.PI / 6, inner: Math.PI / 3 },
      { outer: Math.PI / 2, middle: -Math.PI / 3, inner: Math.PI * 0.7 },
      { outer: Math.PI * 0.8, middle: -Math.PI * 0.6, inner: Math.PI },
    ],
    []
  );

  useFrame((state) => {
    if (!gitaGroup.current || opacity <= 0.0001) return;
    const t = state.clock.getElapsedTime();
    const ptr = state.pointer;
    const target = featureRotations[activeFeatureIndex] || featureRotations[0];

    // Smooth position transition: steps back into depth as Panchatantra arrives, then centers for Ch4
    const posX = THREE.MathUtils.lerp(isMobile ? 0 : 2.5, isMobile ? 0 : 2.2, morphToCh4);
    const posY = THREE.MathUtils.lerp(0.0, 0.2, morphToCh4);
    const posZ = THREE.MathUtils.lerp(-0.6, -2.4, panchatantraBackdrop);

    gitaGroup.current.position.set(posX, posY, posZ);

    // Scale compresses into Chapter 4 equatorial ring
    const scale = THREE.MathUtils.lerp(isMobile ? 0.75 : 1.0, 0.68, morphToCh4);
    gitaGroup.current.scale.setScalar(scale);

    // Tilt into backdrop orientation during Panchatantra, then align with Ch4
    gitaGroup.current.rotation.x = THREE.MathUtils.lerp(0, 0.45, panchatantraBackdrop);

    if (yantraOuter.current) {
      yantraOuter.current.rotation.z = THREE.MathUtils.lerp(
        yantraOuter.current.rotation.z,
        target.outer + t * 0.05 + (reducedMotion ? 0 : ptr.x * 0.08),
        0.06
      );
    }
    if (yantraMiddle.current) {
      yantraMiddle.current.rotation.z = THREE.MathUtils.lerp(
        yantraMiddle.current.rotation.z,
        target.middle - t * 0.08,
        0.06
      );
    }
    if (yantraInner.current) {
      yantraInner.current.rotation.z = THREE.MathUtils.lerp(
        yantraInner.current.rotation.z,
        target.inner + t * 0.12,
        0.06
      );
    }

    if (warmPedestalLight.current) {
      warmPedestalLight.current.intensity = (6 + Math.sin(t * 3.5) * 2) * opacity * (1 - morphToCh4 * 0.7);
    }
  });

  return (
    <group ref={gitaGroup} position={[isMobile ? 0 : 2.5, 0.0, -0.6]} visible={opacity > 0.001}>
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
                opacity={opacity * 0.8 * (1 - panchatantraBackdrop * 0.5)}
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
 * Arrival (0.48 -> 0.56): Glides into the midground in front of the receding Yantra rings.
 * Focus (0.52 -> 0.62): Layered illustrated folklore volume with warm lantern glow and subtle emerald bioluminescence.
 * Departure (0.58 -> 0.68): Converges inward, folding into the Chapter 04 octahedron facets.
 */
function PanchatantraFolkloreWorld({ progress, reducedMotion }: { progress: number; reducedMotion?: boolean }) {
  const dioramaGroup = useRef<THREE.Group>(null);
  const lanternLight = useRef<THREE.PointLight>(null);
  const { viewport } = useThree();
  const isMobile = viewport.width < 5.5;

  const arrival = smoothstep(0.47, 0.55, progress);
  const departure = 1 - smoothstep(0.60, 0.68, progress);
  const opacity = arrival * departure;

  const morphToCh4 = smoothstep(0.58, 0.68, progress);

  useFrame((state) => {
    if (!dioramaGroup.current || opacity <= 0.0001) return;
    const t = state.clock.getElapsedTime();
    const ptr = state.pointer;

    const rotY = Math.sin(t * 0.2) * 0.08 + (reducedMotion ? 0 : ptr.x * 0.1);
    const rotX = Math.cos(t * 0.2) * 0.05 + (reducedMotion ? 0 : ptr.y * 0.08);

    dioramaGroup.current.rotation.x = THREE.MathUtils.lerp(rotX, 0, morphToCh4);
    dioramaGroup.current.rotation.y = THREE.MathUtils.lerp(rotY, 0, morphToCh4);
    dioramaGroup.current.rotation.z = THREE.MathUtils.lerp(0, t * 0.1, morphToCh4);

    const scale = THREE.MathUtils.lerp(isMobile ? 0.7 : 1.0, 0.25, morphToCh4);
    dioramaGroup.current.scale.setScalar(scale);

    if (lanternLight.current) {
      lanternLight.current.intensity = (5 + Math.sin(t * 3.0) * 1.5) * opacity;
    }
  });

  return (
    <group
      ref={dioramaGroup}
      position={[isMobile ? 0 : 2.4, -0.1, -0.4]}
      visible={opacity > 0.001}
    >
      {/* Layered Papercraft Folklore Ring 1 */}
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

      {/* Layered Papercraft Folklore Ring 2 (Warm Terracotta / Gold) */}
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

      {/* Warm Storytelling Hearth Lantern */}
      <pointLight ref={lanternLight} position={[0, 0, 1.2]} color="#fbbf24" distance={7} intensity={5} />
    </group>
  );
}

/**
 * 5. CHAPTER 04 — THE CRAFT: COMPUTATIONAL SYSTEMS ARCHITECTURE
 * Arrival (0.58 -> 0.68): Crystallizes directly from the converging product universe geometries.
 * Focus (0.64 -> 0.78): Precision obsidian octahedron with dual polar and equatorial data rings.
 * Departure (0.76 -> 0.88): Octahedron facets unfold and dissolve into depth, while the equatorial
 * ring flattens down to the floor, establishing the Studio horizon ribbon.
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
  const corePoly = useRef<THREE.Mesh>(null);
  const equatorialRing = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  const isMobile = viewport.width < 5.5;

  const arrival = smoothstep(0.58, 0.68, progress);
  const departure = 1 - smoothstep(0.78, 0.88, progress);
  const opacity = arrival * departure;

  // Morph to Chapter 05 Studio floor horizon (0.78 -> 0.88)
  const morphToCh5 = smoothstep(0.78, 0.88, progress);

  const targets = useMemo(
    () => [
      { rotX: 0.2, rotY: 0, rotZ: 0 },
      { rotX: 0.6, rotY: 0.8, rotZ: 0.2 },
      { rotX: -0.3, rotY: 1.4, rotZ: -0.4 },
      { rotX: 0.8, rotY: -0.5, rotZ: 0.5 },
      { rotX: 0.1, rotY: 2.2, rotZ: 0.8 },
    ],
    []
  );

  useFrame((state) => {
    if (!craftGroup.current || opacity <= 0.0001) return;
    const t = state.clock.getElapsedTime();
    const target = targets[craftIndex] || targets[0];

    // Smooth rotation towards active discipline target, then flattens towards Ch5 floor
    craftGroup.current.rotation.x = THREE.MathUtils.lerp(
      THREE.MathUtils.lerp(craftGroup.current.rotation.x, target.rotX, 0.07),
      Math.PI / 2,
      morphToCh5
    );
    craftGroup.current.rotation.y = THREE.MathUtils.lerp(
      THREE.MathUtils.lerp(craftGroup.current.rotation.y, target.rotY + t * 0.1, 0.07),
      0,
      morphToCh5
    );
    craftGroup.current.rotation.z = THREE.MathUtils.lerp(
      THREE.MathUtils.lerp(craftGroup.current.rotation.z, target.rotZ, 0.07),
      0,
      morphToCh5
    );

    // Position moves from craft center [2.2, 0.2, 0] to studio floor [0, -2.4, 0]
    const posX = THREE.MathUtils.lerp(isMobile ? 0 : 2.2, 0, morphToCh5);
    const posY = THREE.MathUtils.lerp(0.2, -2.4, morphToCh5);
    const posZ = THREE.MathUtils.lerp(0, 0, morphToCh5);
    craftGroup.current.position.set(posX, posY, posZ);

    if (corePoly.current) {
      corePoly.current.rotation.y = -t * 0.25;
      // Core poly unfolds and dissolves
      corePoly.current.scale.setScalar(Math.max(0.001, 1 - morphToCh5 * 1.5));
    }

    if (equatorialRing.current) {
      // Equatorial ring expands into the horizon ribbon
      const ringScaleX = THREE.MathUtils.lerp(1, 6.0, morphToCh5);
      equatorialRing.current.scale.set(ringScaleX, 1, 1);
    }
  });

  return (
    <group
      ref={craftGroup}
      position={[isMobile ? 0 : 2.2, 0.2, 0]}
      scale={isMobile ? 0.7 : 1.0}
      visible={opacity > 0.001}
    >
      {/* Precision Obsidian Octahedron Core */}
      <mesh ref={corePoly} castShadow receiveShadow>
        <octahedronGeometry args={[1.2, 0]} />
        <meshPhysicalMaterial
          color="#0d0d0d"
          metalness={0.96}
          roughness={0.08}
          clearcoat={1}
          flatShading
          transparent
          opacity={opacity * (1 - morphToCh5)}
        />
      </mesh>

      {/* Orbiting Equatorial Data Ring (Morphs into Ch 5 Horizon) */}
      <mesh ref={equatorialRing} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.9, 0.02, 16, 64]} />
        <meshStandardMaterial
          color="#ffffff"
          metalness={0.95}
          roughness={0.12}
          emissive="#ffffff"
          emissiveIntensity={0.6}
          transparent
          opacity={opacity}
        />
      </mesh>

      {/* Polar Orthogonal Ring */}
      <mesh rotation={[0, Math.PI / 3, 0]} scale={Math.max(0.01, 1 - morphToCh5)}>
        <torusGeometry args={[1.65, 0.015, 16, 64]} />
        <meshStandardMaterial
          color="#93c5fd"
          metalness={0.9}
          roughness={0.15}
          emissive="#3b82f6"
          emissiveIntensity={0.4}
          transparent
          opacity={opacity * 0.7 * (1 - morphToCh5)}
        />
      </mesh>
    </group>
  );
}

/**
 * 6. CHAPTER 05 — THE STUDIO: ZERO DISTRACTING 3D
 * Arrival (0.78 -> 0.88): Settles from the flattened equatorial ring into the calm reflective floor horizon.
 * Focus (0.84 -> 0.94): Minimalist architectural horizon ribbon, providing grounded calm so founder portraits take full priority.
 * Departure (0.90 -> 0.98): Symmetrical segments of the horizon plane rotate upward, forming the twin pillars of Chapter 06 Gateway.
 */
function StudioAtmosphere({ progress }: { progress: number }) {
  const horizonRef = useRef<THREE.Mesh>(null);
  const arrival = smoothstep(0.78, 0.86, progress);
  const departure = 1 - smoothstep(0.92, 0.98, progress);
  const opacity = arrival * departure;

  return (
    <group position={[0, -2.4, 0]} visible={opacity > 0.001}>
      <mesh ref={horizonRef} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[24, 6]} />
        <meshPhysicalMaterial
          color="#080808"
          roughness={0.5}
          metalness={0.8}
          transparent
          opacity={opacity * 0.6}
        />
      </mesh>
    </group>
  );
}

/**
 * 7. CHAPTER 06 — THE CONNECTION: ARCHITECTURAL PORTAL GATEWAY
 * Arrival (0.90 -> 0.97): Twin obsidian monolithic pillars rise seamlessly from the floor plane.
 * Focus (0.95 -> 1.00): The portal light beam ignites, framing the final call-to-action.
 */
function ArchitecturalGateway({ progress, reducedMotion }: { progress: number; reducedMotion?: boolean }) {
  const gateGroup = useRef<THREE.Group>(null);
  const beamLight = useRef<THREE.PointLight>(null);

  const arrival = smoothstep(0.89, 0.97, progress);
  const opacity = arrival; // remains active through the bottom of the page

  useFrame((state) => {
    if (!gateGroup.current || opacity <= 0.0001) return;
    const t = state.clock.getElapsedTime();
    const ptr = state.pointer;

    // Subtle breathing rotation
    gateGroup.current.rotation.y = t * 0.12 + (reducedMotion ? 0 : ptr.x * 0.12);

    // Pillars rise up from floor level (-2.4 -> 0.1)
    const riseY = THREE.MathUtils.lerp(-2.4, 0.1, arrival);
    gateGroup.current.position.y = riseY;

    // Monoliths scale from flat floor thickness (0.05) to full pillar height (1.0)
    gateGroup.current.scale.set(1, arrival, 1);

    if (beamLight.current) {
      beamLight.current.intensity = 6 * arrival;
    }
  });

  return (
    <group ref={gateGroup} position={[0, 0.1, 0]} visible={opacity > 0.001}>
      {/* Left Monolithic Obsidian Pillar */}
      <mesh position={[-0.95, 0, 0]}>
        <boxGeometry args={[0.3, 2.6, 0.4]} />
        <meshPhysicalMaterial
          color="#0c0c0c"
          metalness={0.95}
          roughness={0.08}
          clearcoat={1}
          transparent
          opacity={opacity}
        />
      </mesh>

      {/* Right Monolithic Obsidian Pillar */}
      <mesh position={[0.95, 0, 0]}>
        <boxGeometry args={[0.3, 2.6, 0.4]} />
        <meshPhysicalMaterial
          color="#0c0c0c"
          metalness={0.95}
          roughness={0.08}
          clearcoat={1}
          transparent
          opacity={opacity}
        />
      </mesh>

      {/* Central Portal Light Beam */}
      <pointLight ref={beamLight} position={[0, 0, 0.5]} color="#ffffff" distance={8} intensity={6} />
    </group>
  );
}

/**
 * MASTER CONTINUOUS LIGHTING RIG
 * Seamlessly cross-fades illumination parameters across the entire journey.
 * Zero hard on/off steps.
 */
function ContinuousLighting({ progress }: { progress: number }) {
  const keySpot = useRef<THREE.SpotLight>(null);
  const warmHeritageSpot = useRef<THREE.SpotLight>(null);
  const folkloreLantern = useRef<THREE.PointLight>(null);
  const computationalSpot = useRef<THREE.SpotLight>(null);

  useFrame(() => {
    // 1. Warm Saffron-Amber Heritage Light (Chapter 03A GitaConnect)
    const gitaLightFactor = smoothstep(0.30, 0.40, progress) * (1 - smoothstep(0.52, 0.62, progress));
    if (warmHeritageSpot.current) {
      warmHeritageSpot.current.intensity = gitaLightFactor * 45;
    }

    // 2. Earthy Folklore & Emerald Accent Light (Chapter 03B Panchatantra AI)
    const panchatantraFactor = smoothstep(0.48, 0.56, progress) * (1 - smoothstep(0.60, 0.68, progress));
    if (folkloreLantern.current) {
      folkloreLantern.current.intensity = panchatantraFactor * 30;
    }

    // 3. Cool Blue-White Computational Light (Chapter 04 The Craft)
    const craftFactor = smoothstep(0.58, 0.68, progress) * (1 - smoothstep(0.78, 0.88, progress));
    if (computationalSpot.current) {
      computationalSpot.current.intensity = craftFactor * 35;
    }

    // 4. Studio Key Light (adapts position smoothly)
    if (keySpot.current) {
      keySpot.current.intensity = THREE.MathUtils.lerp(64, 45, smoothstep(0.75, 0.90, progress));
    }
  });

  return (
    <>
      <ambientLight intensity={0.16} />

      {/* Directional Key Spotlight */}
      <spotLight
        ref={keySpot}
        position={[6, 8, 7]}
        intensity={64}
        angle={0.42}
        penumbra={0.9}
        color="#ffffff"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />

      {/* Warm Saffron-Amber Spot for GitaConnect */}
      <spotLight
        ref={warmHeritageSpot}
        position={[5, 3, 4]}
        intensity={0}
        angle={0.55}
        penumbra={1}
        color="#f59e0b"
      />

      {/* Earthy Folklore Emerald-Amber Lantern for Panchatantra */}
      <pointLight ref={folkloreLantern} position={[3, 0, 3]} intensity={0} distance={10} color="#10b981" />

      {/* Cool Specular Blue Spot for The Craft */}
      <spotLight
        ref={computationalSpot}
        position={[4, 6, 5]}
        intensity={0}
        angle={0.48}
        penumbra={0.8}
        color="#93c5fd"
      />
    </>
  );
}

/**
 * CONTINUOUS CAMERA SPLINE RIG
 * Travels along a smooth, centripetal Catmull-Rom 3D spline across the journey.
 * Position and look-at target are continuous C^1 functions of progress.
 * Zero threshold snapping.
 */
function ContinuousCameraPath({ progress, reducedMotion }: WorldProps) {
  const { camera, size } = useThree();
  const isMobile = size.width < 768;
  const smoothPRef = useRef(progress);
  const currentLookAt = useMemo(() => new THREE.Vector3(), []);

  // 7 Waypoints along the journey forming a continuous centripetal spline
  const cameraSpline = useMemo(() => {
    const pts = isMobile
      ? [
          new THREE.Vector3(0.0, 0.15, 8.2), // 0.00: Ch1 Spark
          new THREE.Vector3(0.15, 0.20, 8.4), // 0.20: Ch2 Vellum
          new THREE.Vector3(0.0, 0.05, 8.2), // 0.42: Ch3A Gita
          new THREE.Vector3(0.0, -0.10, 8.0), // 0.55: Ch3B Panchatantra
          new THREE.Vector3(0.0, 0.25, 8.0), // 0.72: Ch4 Craft
          new THREE.Vector3(0.0, 0.60, 8.8), // 0.86: Ch5 Studio
          new THREE.Vector3(0.0, 0.15, 7.8), // 1.00: Ch6 Gateway
        ]
      : [
          new THREE.Vector3(1.8, 0.15, 6.8), // 0.00: Ch1 Spark
          new THREE.Vector3(2.8, 0.22, 7.1), // 0.20: Ch2 Vellum
          new THREE.Vector3(2.3, 0.02, 6.9), // 0.42: Ch3A Gita
          new THREE.Vector3(1.6, -0.15, 6.7), // 0.55: Ch3B Panchatantra
          new THREE.Vector3(2.2, 0.30, 6.8), // 0.72: Ch4 Craft
          new THREE.Vector3(0.0, 0.90, 7.8), // 0.86: Ch5 Studio
          new THREE.Vector3(0.0, 0.15, 6.4), // 1.00: Ch6 Gateway
        ];
    return new THREE.CatmullRomCurve3(pts, false, "centripetal");
  }, [isMobile]);

  const targetSpline = useMemo(() => {
    const targets = isMobile
      ? [
          new THREE.Vector3(0.0, 0.10, 0),
          new THREE.Vector3(0.1, 0.12, 0),
          new THREE.Vector3(0.0, 0.00, 0),
          new THREE.Vector3(0.0, -0.10, 0),
          new THREE.Vector3(0.0, 0.15, 0),
          new THREE.Vector3(0.0, -0.20, 0),
          new THREE.Vector3(0.0, 0.10, 0),
        ]
      : [
          new THREE.Vector3(1.6, 0.10, 0),
          new THREE.Vector3(2.4, 0.12, 0),
          new THREE.Vector3(2.1, 0.00, 0),
          new THREE.Vector3(1.4, -0.10, 0),
          new THREE.Vector3(1.9, 0.20, 0),
          new THREE.Vector3(0.0, -0.40, 0),
          new THREE.Vector3(0.0, 0.10, 0),
        ];
    return new THREE.CatmullRomCurve3(targets, false, "centripetal");
  }, [isMobile]);

  useFrame((state, delta) => {
    const targetP = Math.max(0, Math.min(1, progress));
    // Damped interpolation prevents micro-stutter while keeping response immediate
    const p = reducedMotion
      ? targetP
      : THREE.MathUtils.damp(smoothPRef.current, targetP, 5.5, delta);
    smoothPRef.current = p;

    // Continuous spline sampling
    const idealCamPos = cameraSpline.getPointAt(p);
    const idealTarget = targetSpline.getPointAt(p);

    if (!reducedMotion) {
      idealCamPos.x += state.pointer.x * 0.12;
      idealCamPos.y += state.pointer.y * 0.08;
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

      {/* Master Continuous Lighting Rig */}
      <ContinuousLighting progress={progress} />

      {/* 1. Emergence Spark & DNA Ribbons */}
      <EmergenceSpark progress={progress} reducedMotion={reducedMotion} />

      {/* 2. Stratified Drafting Plates */}
      <TransformationPlates progress={progress} reducedMotion={reducedMotion} />

      {/* 3A. GitaConnect Sacred Yantra */}
      <GitaHeritageEnvironment
        progress={progress}
        activeFeatureIndex={activeFeatureIndex}
        reducedMotion={reducedMotion}
      />

      {/* 3B. Panchatantra AI Illustrated Folklore Diorama */}
      <PanchatantraFolkloreWorld progress={progress} reducedMotion={reducedMotion} />

      {/* 4. Computational Systems Architecture */}
      <ComputationalLattice progress={progress} craftIndex={craftIndex} reducedMotion={reducedMotion} />

      {/* 5. The Studio Calm Horizon */}
      <StudioAtmosphere progress={progress} />

      {/* 6. The Connection Gateway */}
      <ArchitecturalGateway progress={progress} reducedMotion={reducedMotion} />

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

      {/* Postprocessing Bloom */}
      {!reducedMotion && (
        <EffectComposer multisampling={0}>
          <Bloom intensity={0.42} luminanceThreshold={0.84} luminanceSmoothing={0.65} mipmapBlur />
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
