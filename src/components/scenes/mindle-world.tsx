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
 * 1. CHAPTER 01 — EMERGENCE: THE SPARK & DRAFTING GUIDES
 * A living, breathing incandescent spark with slow, regal studio rotation.
 * Continuous slow rotation: t * 0.05 rad/sec (~2.8 deg/sec).
 * As p moves 0.10 -> 0.20, the ember core sinks into depth (z: 0 -> -3.0),
 * while its kinetic blueprint guides expand and flatten into the Chapter 02 vellum stack.
 */
function EmergenceSpark({ progress, reducedMotion }: { progress: number; reducedMotion?: boolean }) {
  const sparkGroup = useRef<THREE.Group>(null);
  const emberCore = useRef<THREE.Mesh>(null);
  const coreLight = useRef<THREE.PointLight>(null);
  const { viewport } = useThree();
  const isMobile = viewport.width < 5.5;

  // Active in Chapter 1 (0.00 -> 0.08), smoothly morphs into Ch2 between 0.08 and 0.12
  const departure = 1 - smoothstep(0.08, 0.13, progress);
  const opacity = departure;

  // Morph progress into Chapter 2 drafting plates
  const morphToCh2 = smoothstep(0.07, 0.12, progress);

  useFrame((state) => {
    if (!sparkGroup.current || opacity <= 0.001) return;
    const t = state.clock.getElapsedTime();
    const ptr = state.pointer;

    // Slow, stately turntable rotation (KEEP THE SPINNING at ~2.8 deg/sec)
    const baseRotY = t * 0.05 + (reducedMotion ? 0 : ptr.x * 0.06);
    const baseRotX = 0.12 + Math.sin(t * 0.3) * 0.02 + (reducedMotion ? 0 : ptr.y * 0.04);

    // Eases into Chapter 2 isometric orientation
    sparkGroup.current.rotation.x = THREE.MathUtils.lerp(baseRotX, 0.46, morphToCh2);
    sparkGroup.current.rotation.y = THREE.MathUtils.lerp(baseRotY, -0.48, morphToCh2);
    sparkGroup.current.rotation.z = 0;

    // Organic breathing pulse
    const breathe = 1 + Math.sin(t * 1.4) * 0.035;
    const scale = (isMobile ? 0.6 : 0.95) * breathe * (1 - morphToCh2 * 0.4);
    sparkGroup.current.scale.setScalar(scale);

    // Position stays securely on the right side (x=2.4)
    const posX = THREE.MathUtils.lerp(isMobile ? 0 : 2.4, isMobile ? 0.3 : 2.4, morphToCh2);
    const posY = THREE.MathUtils.lerp(0.1, 0.25, morphToCh2);
    const posZ = THREE.MathUtils.lerp(0, -2.5, morphToCh2);
    sparkGroup.current.position.set(posX, posY, posZ);

    if (coreLight.current) {
      coreLight.current.intensity = (6 + Math.sin(t * 2.0) * 1.5) * opacity * (1 - morphToCh2);
    }

    if (emberCore.current) {
      emberCore.current.scale.setScalar(Math.max(0.001, 1 - morphToCh2 * 1.4));
    }
  });

  if (opacity <= 0.001) return null;

  return (
    <group ref={sparkGroup} position={[isMobile ? 0 : 2.4, 0.1, 0]}>
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
      <mesh scale={Math.max(0.01, 1 - morphToCh2 * 0.8)}>
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

      {/* Kinetic Brand Guides: Unfolds seamlessly into Chapter 02 Plate Wireframes */}
      <group rotation={[0, 0, Math.PI / 12]}>
        <mesh
          position={[
            THREE.MathUtils.lerp(-0.85, -1.35, morphToCh2),
            0,
            THREE.MathUtils.lerp(0, -0.4, morphToCh2),
          ]}
          scale={[
            THREE.MathUtils.lerp(1, 2.7, morphToCh2),
            THREE.MathUtils.lerp(1, 1.35, morphToCh2),
            1,
          ]}
        >
          <boxGeometry args={[0.035, 1.3, 0.035]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#ffffff"
            emissiveIntensity={THREE.MathUtils.lerp(0.8, 0.2, morphToCh2)}
            transparent
            opacity={opacity * 0.55}
          />
        </mesh>

        <mesh
          position={[
            THREE.MathUtils.lerp(0.85, 1.35, morphToCh2),
            0,
            THREE.MathUtils.lerp(0, 0.4, morphToCh2),
          ]}
          scale={[
            THREE.MathUtils.lerp(1, 2.7, morphToCh2),
            THREE.MathUtils.lerp(1, 1.35, morphToCh2),
            1,
          ]}
        >
          <boxGeometry args={[0.035, 1.3, 0.035]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#ffffff"
            emissiveIntensity={THREE.MathUtils.lerp(0.8, 0.2, morphToCh2)}
            transparent
            opacity={opacity * 0.55}
          />
        </mesh>
      </group>
    </group>
  );
}

/**
 * 2. CHAPTER 02 — TRANSFORMATION: STRATIFIED DRAFTING PLATES
 * Arrival (0.11 -> 0.20): Emerges smoothly as the kinetic guides expand.
 * Focus (0.18 -> 0.32): 4 stratified vellum glass plates in isometric perspective.
 * Controlled composition: When scrolling down to the 3 Principle cards and 4 Stats (p > 0.25),
 * the plates gracefully recede into depth (z: 0 -> -3.8) and rise (y: 0.2 -> 0.6), floating as an
 * atmospheric architectural canopy above the text, guaranteeing 100% negative space and zero text overlap!
 * Continuous rotation: Gentle turntable yaw t * 0.04 rad/sec (~2.3 deg/sec).
 */
function TransformationPlates({ progress, reducedMotion }: { progress: number; reducedMotion?: boolean }) {
  const plateGroup = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const isMobile = viewport.width < 5.5;

  // Enters as Chapter 01 ember guides expand (0.07 -> 0.12)
  const arrival = smoothstep(0.07, 0.12, progress);
  // Seamlessly transitions into GitaConnect celestial geometry (0.20 -> 0.26)
  const departure = 1 - smoothstep(0.20, 0.26, progress);
  const opacity = arrival * departure;

  // As user moves into the 3 principle cards and stats, plates recede deep into background (z: -0.2 -> -5.5)
  // and tuck safely to the far right (x: 2.5 -> 2.8), ensuring 100% negative space for text & metrics!
  const statsAvoidance = smoothstep(0.14, 0.21, progress);
  const morphToCh3 = smoothstep(0.16, 0.25, progress);

  useFrame((state) => {
    if (!plateGroup.current || opacity <= 0.001) return;
    const t = state.clock.getElapsedTime();
    const ptr = state.pointer;

    // Slow, stately turntable yaw (KEEP THE SPINNING at ~2.3 deg/sec)
    const baseRotY = -0.48 + Math.sin(t * 0.05) * 0.04 + (reducedMotion ? 0 : ptr.x * 0.04);
    const baseRotX = 0.44 + Math.cos(t * 0.04) * 0.02 + (reducedMotion ? 0 : ptr.y * 0.03);

    // Eases smoothly towards Chapter 03 frontal celestial alignment (rotX -> 0, rotY -> 0)
    plateGroup.current.rotation.x = THREE.MathUtils.lerp(baseRotX, 0, morphToCh3);
    plateGroup.current.rotation.y = THREE.MathUtils.lerp(baseRotY, 0, morphToCh3);
    plateGroup.current.rotation.z = THREE.MathUtils.lerp(0, t * 0.03, morphToCh3);

    // Guaranteed negative space: Keep strictly on the far right (x >= 2.5) and recede into deep depth (-5.5)
    const targetX = isMobile ? 0 : THREE.MathUtils.lerp(2.5, 2.8, statsAvoidance);
    const targetY = isMobile ? THREE.MathUtils.lerp(0.2, 0.5, statsAvoidance) : THREE.MathUtils.lerp(0.2, 0.65, statsAvoidance);
    const targetZ = isMobile ? THREE.MathUtils.lerp(-1.0, -4.5, statsAvoidance) : THREE.MathUtils.lerp(-0.2, -5.5, statsAvoidance);

    plateGroup.current.position.set(targetX, targetY, targetZ);

    const scale = (isMobile ? 0.6 : 0.9) * THREE.MathUtils.lerp(1.0, 0.5, statsAvoidance);
    plateGroup.current.scale.setScalar(scale);
  });

  if (opacity <= 0.001) return null;

  return (
    <group
      ref={plateGroup}
      position={[isMobile ? 0.2 : 2.4, 0.2, 0]}
      scale={isMobile ? 0.65 : 0.95}
    >
      {[0, 1, 2, 3].map((idx) => {
        const zOffset = (idx - 1.5) * 0.38 * (1 - morphToCh3 * 0.7);
        return (
          <group
            key={idx}
            position={[0, idx * 0.08 * (1 - morphToCh3), zOffset]}
            rotation={[0, 0, idx * (Math.PI / 24) * (1 - morphToCh3)]}
          >
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
                opacity={opacity * THREE.MathUtils.lerp(0.85, 0.35, statsAvoidance)}
              />
            </mesh>
            <lineSegments>
              <edgesGeometry args={[new THREE.BoxGeometry(2.72, 1.77, 0.035)]} />
              <lineBasicMaterial
                color={morphToCh3 > 0.3 ? "#d4af37" : "#ffffff"}
                transparent
                opacity={opacity * THREE.MathUtils.lerp(0.4, 0.2, statsAvoidance)}
              />
            </lineSegments>
          </group>
        );
      })}
    </group>
  );
}

/**
 * 3. CHAPTER 03A — GITACONNECT: SACRED ASTRONOMICAL YANTRA
 * Active: p in [0.32, 0.54].
 * Positioned at [x: 2.3, y: 0.0, z: -0.8] to center DIRECTLY behind the authentic iOS interface mockup!
 * The left column (tabs, stats, text) remains 100% in clean negative space.
 * Continuous rotation: Regal celestial drift (outer: t * 0.03 rad/sec, middle: -t * 0.02 rad/sec).
 * On tab click: smoothly interpolates to the feature's dedicated sacred angle, then continues gentle rotation.
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

  // Arrives smoothly from the deep background plates (0.20 -> 0.28)
  const arrival = smoothstep(0.20, 0.28, progress);
  // Endures as background frame during Panchatantra arrival (0.40 -> 0.46)
  const departure = 1 - smoothstep(0.40, 0.46, progress);
  const opacity = arrival * departure;

  // Depth glide: starts in deep background (-4.2) during stats, glides forward to -0.8 behind phone mockup
  const depthGlide = smoothstep(0.20, 0.29, progress);

  // Smooth transition to Panchatantra AI: Yantra tilts back into depth (z: -0.8 -> -2.2)
  const panchatantraBackdrop = smoothstep(0.38, 0.45, progress);

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
    const t = state.clock.getElapsedTime();
    const ptr = state.pointer;
    const target = featureRotations[activeFeatureIndex] || featureRotations[0];

    // Smooth celestial drift + tab reaction (no jarring snaps)
    if (yantraOuter.current) {
      yantraOuter.current.rotation.z = THREE.MathUtils.lerp(
        yantraOuter.current.rotation.z,
        target.outer + t * 0.03 + (reducedMotion ? 0 : ptr.x * 0.04),
        0.04
      );
    }
    if (yantraMiddle.current) {
      yantraMiddle.current.rotation.z = THREE.MathUtils.lerp(
        yantraMiddle.current.rotation.z,
        target.middle - t * 0.02,
        0.04
      );
    }
    if (yantraInner.current) {
      yantraInner.current.rotation.z = THREE.MathUtils.lerp(
        yantraInner.current.rotation.z,
        target.inner + t * 0.035,
        0.04
      );
    }

    // Position: glides from deep background (-4.2) to midground (-0.8), then tilts into backdrop (-2.2)
    const posX = isMobile ? 0 : 2.3;
    const forwardZ = THREE.MathUtils.lerp(-4.2, -0.8, depthGlide);
    const posZ = THREE.MathUtils.lerp(forwardZ, -2.2, panchatantraBackdrop);
    const posY = THREE.MathUtils.lerp(0.2, 0.0, depthGlide);
    gitaGroup.current.position.set(posX, posY, posZ);

    // Subtle pitch into backdrop orientation
    gitaGroup.current.rotation.x = THREE.MathUtils.lerp(0, 0.25, panchatantraBackdrop);

    if (warmPedestalLight.current) {
      warmPedestalLight.current.intensity = 6 * opacity * (1 - panchatantraBackdrop * 0.4);
    }
  });

  if (opacity <= 0.001) return null;

  return (
    <group ref={gitaGroup} position={[isMobile ? 0 : 2.3, 0.0, -0.8]} scale={isMobile ? 0.72 : 0.95}>
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
 * Active: p in [0.47, 0.63].
 * Glides into the midground as the Yantra rings step back into the deep background.
 * Warm terracotta & emerald rings create poetic folklore depth behind the interface.
 * Continuous rotation: Gentle turntable yaw t * 0.04 rad/sec (~2.3 deg/sec).
 */
function PanchatantraFolkloreWorld({ progress, reducedMotion }: { progress: number; reducedMotion?: boolean }) {
  const dioramaGroup = useRef<THREE.Group>(null);
  const lanternLight = useRef<THREE.PointLight>(null);
  const { viewport } = useThree();
  const isMobile = viewport.width < 5.5;

  const arrival = smoothstep(0.38, 0.44, progress);
  const departure = 1 - smoothstep(0.50, 0.55, progress);
  const opacity = arrival * departure;

  // Morph to Chapter 04 computational octahedron
  const morphToCh4 = smoothstep(0.48, 0.54, progress);

  useFrame((state) => {
    if (!dioramaGroup.current || opacity <= 0.001) return;
    const t = state.clock.getElapsedTime();
    const ptr = state.pointer;

    // Slow, serene turntable rotation
    dioramaGroup.current.rotation.y = t * 0.04 + (reducedMotion ? 0 : ptr.x * 0.05);
    dioramaGroup.current.rotation.x = Math.sin(t * 0.2) * 0.03 + (reducedMotion ? 0 : ptr.y * 0.04);
    dioramaGroup.current.rotation.z = THREE.MathUtils.lerp(0, t * 0.03, morphToCh4);

    // Converges toward origin to form the Chapter 04 octahedron rings
    const posX = THREE.MathUtils.lerp(isMobile ? 0 : 2.3, isMobile ? 0 : 2.4, morphToCh4);
    const posY = THREE.MathUtils.lerp(-0.05, 0.15, morphToCh4);
    const posZ = THREE.MathUtils.lerp(-0.5, 0.0, morphToCh4);
    dioramaGroup.current.position.set(posX, posY, posZ);

    const scale = THREE.MathUtils.lerp(isMobile ? 0.68 : 0.92, 0.35, morphToCh4);
    dioramaGroup.current.scale.setScalar(scale);

    if (lanternLight.current) {
      lanternLight.current.intensity = (5 + Math.sin(t * 1.8) * 1.2) * opacity;
    }
  });

  if (opacity <= 0.001) return null;

  return (
    <group
      ref={dioramaGroup}
      position={[isMobile ? 0 : 2.3, -0.05, -0.5]}
      scale={isMobile ? 0.68 : 0.92}
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

      <pointLight ref={lanternLight} position={[0, 0, 1.2]} color="#fbbf24" distance={7} intensity={5} />
    </group>
  );
}

/**
 * 5. CHAPTER 04 — THE CRAFT: COMPUTATIONAL SYSTEMS ARCHITECTURE
 * Active: p in [0.58, 0.80].
 * Crystallizes directly from the converging product universe rings.
 * Precision obsidian octahedron with dual polar and equatorial data rings.
 * Continuous rotation: Slow, deliberate engineered turntable yaw t * 0.045 rad/sec.
 * On discipline click: smoothly lerps to that subsystem's orientation, then continues slow rotation.
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
  const equatorialRing = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  const isMobile = viewport.width < 5.5;

  const arrival = smoothstep(0.48, 0.54, progress);
  const departure = 1 - smoothstep(0.68, 0.74, progress);
  const opacity = arrival * departure;

  // Morph to Chapter 05 floor horizon ribbon
  const morphToCh5 = smoothstep(0.66, 0.74, progress);

  const targets = useMemo(
    () => [
      { rotX: 0.2, rotY: 0, rotZ: 0 },
      { rotX: 0.5, rotY: 0.6, rotZ: 0.1 },
      { rotX: -0.2, rotY: 1.1, rotZ: -0.3 },
      { rotX: 0.6, rotY: -0.4, rotZ: 0.4 },
      { rotX: 0.1, rotY: 1.6, rotZ: 0.5 },
    ],
    []
  );

  useFrame((state) => {
    if (!craftGroup.current || opacity <= 0.001) return;
    const t = state.clock.getElapsedTime();
    const ptr = state.pointer;
    const target = targets[craftIndex] || targets[0];

    // Slow, stately rotation + discipline angle lerp
    craftGroup.current.rotation.x = THREE.MathUtils.lerp(
      THREE.MathUtils.lerp(craftGroup.current.rotation.x, target.rotX + (reducedMotion ? 0 : ptr.y * 0.04), 0.05),
      Math.PI / 2,
      morphToCh5
    );
    craftGroup.current.rotation.y = THREE.MathUtils.lerp(
      THREE.MathUtils.lerp(craftGroup.current.rotation.y, target.rotY + t * 0.045 + (reducedMotion ? 0 : ptr.x * 0.05), 0.05),
      0,
      morphToCh5
    );
    craftGroup.current.rotation.z = THREE.MathUtils.lerp(
      THREE.MathUtils.lerp(craftGroup.current.rotation.z, target.rotZ, 0.05),
      0,
      morphToCh5
    );

    // Position moves from craft center [2.4, 0.15, 0] to studio floor [0, -2.4, 0]
    const posX = THREE.MathUtils.lerp(isMobile ? 0 : 2.4, 0, morphToCh5);
    const posY = THREE.MathUtils.lerp(0.15, -2.4, morphToCh5);
    const posZ = THREE.MathUtils.lerp(0, 0, morphToCh5);
    craftGroup.current.position.set(posX, posY, posZ);

    if (equatorialRing.current) {
      const ringScaleX = THREE.MathUtils.lerp(1, 5.5, morphToCh5);
      equatorialRing.current.scale.set(ringScaleX, 1, 1);
    }
  });

  if (opacity <= 0.001) return null;

  return (
    <group
      ref={craftGroup}
      position={[isMobile ? 0 : 2.4, 0.15, 0]}
      scale={isMobile ? 0.68 : 0.95}
    >
      <mesh castShadow receiveShadow scale={Math.max(0.01, 1 - morphToCh5 * 1.3)}>
        <octahedronGeometry args={[1.15, 0]} />
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

      <mesh ref={equatorialRing} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.85, 0.018, 16, 64]} />
        <meshStandardMaterial
          color="#ffffff"
          metalness={0.95}
          roughness={0.12}
          emissive="#ffffff"
          emissiveIntensity={0.5}
          transparent
          opacity={opacity}
        />
      </mesh>

      <mesh rotation={[0, Math.PI / 3, 0]} scale={Math.max(0.01, 1 - morphToCh5)}>
        <torusGeometry args={[1.6, 0.014, 16, 64]} />
        <meshStandardMaterial
          color="#93c5fd"
          metalness={0.9}
          roughness={0.15}
          emissive="#3b82f6"
          emissiveIntensity={0.35}
          transparent
          opacity={opacity * 0.75 * (1 - morphToCh5)}
        />
      </mesh>
    </group>
  );
}

/**
 * 6. CHAPTER 05 — THE STUDIO: MINIMALIST REFLECTIVE HORIZON & ARCHITECTURAL FOUNDATION
 * Active: p in [0.66, 0.95].
 * The Chapter 04 equatorial ring settles onto the floor datum as a glowing horizon ribbon.
 * Dormant pillar guide foundations hint at the upcoming monolith gateway at x = -1.8 and +1.8.
 * Warm, quiet, human-centered studio lighting frames the founder portraits.
 */
function StudioAtmosphere({ progress }: { progress: number }) {
  const arrival = smoothstep(0.66, 0.74, progress);
  const departure = 1 - smoothstep(0.91, 0.96, progress);
  const opacity = arrival * departure;

  // Morph to Chapter 06 monolith gateway
  const morphToCh6 = smoothstep(0.88, 0.95, progress);

  if (opacity <= 0.001) return null;

  return (
    <group position={[0, -2.4, 0]}>
      {/* Reflective Dark Floor Datum */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[26, 8]} />
        <meshPhysicalMaterial
          color="#080808"
          roughness={0.38}
          metalness={0.88}
          transparent
          opacity={opacity * 0.65}
        />
      </mesh>

      {/* Luminous Studio Horizon Ribbon (born from Chapter 04 equatorial ring) */}
      <mesh position={[0, 0.02, 0]}>
        <boxGeometry args={[24, 0.03, 0.08]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={0.45 * (1 - morphToCh6)}
          transparent
          opacity={opacity * 0.75}
        />
      </mesh>

      {/* Architectural Pillar Foundation Blocks framing the right column gateway */}
      <mesh position={[1.5, THREE.MathUtils.lerp(0.05, 0.35, morphToCh6), 0]}>
        <boxGeometry args={[0.26, THREE.MathUtils.lerp(0.1, 0.7, morphToCh6), 0.38]} />
        <meshPhysicalMaterial
          color="#0c0c0c"
          metalness={0.96}
          roughness={0.1}
          clearcoat={1}
          transparent
          opacity={opacity * 0.85}
        />
      </mesh>
      <mesh position={[3.3, THREE.MathUtils.lerp(0.05, 0.35, morphToCh6), 0]}>
        <boxGeometry args={[0.26, THREE.MathUtils.lerp(0.1, 0.7, morphToCh6), 0.38]} />
        <meshPhysicalMaterial
          color="#0c0c0c"
          metalness={0.96}
          roughness={0.1}
          clearcoat={1}
          transparent
          opacity={opacity * 0.85}
        />
      </mesh>
    </group>
  );
}

/**
 * 7. CHAPTER 06 — THE CONNECTION: ARCHITECTURAL PORTAL GATEWAY & CORE SPARK
 * Active: p in [0.89, 1.00].
 * Twin monolithic obsidian pillars rise from the Chapter 05 foundation blocks at x = -1.8 and +1.8.
 * In the center, a radiant portal of light ignites—echoing the incandescent core of the
 * Chapter 01 Emergence spark, completing the philosophical circle of the journey.
 * Stately turntable rotation: t * 0.03 rad/sec.
 */
function ArchitecturalGateway({ progress, reducedMotion }: { progress: number; reducedMotion?: boolean }) {
  const gateGroup = useRef<THREE.Group>(null);
  const coreMesh = useRef<THREE.Mesh>(null);
  const portalHalo = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  const isMobile = viewport.width < 5.5;

  const arrival = smoothstep(0.89, 0.95, progress);
  const opacity = arrival;

  useFrame((state) => {
    if (!gateGroup.current || opacity <= 0.001) return;
    const t = state.clock.getElapsedTime();
    const ptr = state.pointer;

    // Slow, stately rotation (KEEP THE SPINNING at ~1.7 deg/sec)
    gateGroup.current.rotation.y = t * 0.03 + (reducedMotion ? 0 : ptr.x * 0.04);

    // Pillars rise up smoothly from studio floor foundation (-2.4 -> 0.1)
    const riseY = THREE.MathUtils.lerp(-2.4, 0.1, arrival);
    gateGroup.current.position.y = riseY;

    // Scale grows from foundation height to full pillar height
    gateGroup.current.scale.set(1, arrival, 1);

    // Central portal breathing pulse (mirroring Chapter 01 Emergence spark!)
    if (coreMesh.current) {
      const breathe = 1 + Math.sin(t * 1.4) * 0.04;
      coreMesh.current.scale.setScalar(breathe);
    }
    if (portalHalo.current) {
      portalHalo.current.rotation.z = -t * 0.04;
    }
  });

  if (opacity <= 0.001) return null;

  return (
    <group ref={gateGroup} position={[isMobile ? 0 : 2.4, 0.1, isMobile ? -2.5 : 0]}>
      {/* Symmetrically positioned twin monolith pillars framing the portal on the right column */}
      <mesh position={[-0.9, 0, 0]}>
        <boxGeometry args={[0.26, 2.6, 0.38]} />
        <meshPhysicalMaterial color="#0c0c0c" metalness={0.96} roughness={0.08} clearcoat={1} transparent opacity={opacity} />
      </mesh>
      <mesh position={[0.9, 0, 0]}>
        <boxGeometry args={[0.26, 2.6, 0.38]} />
        <meshPhysicalMaterial color="#0c0c0c" metalness={0.96} roughness={0.08} clearcoat={1} transparent opacity={opacity} />
      </mesh>

      {/* Central Incandescent Portal of Light (echoing Chapter 01 spark) */}
      <group position={[0, 0.1, 0.4]}>
        <mesh ref={coreMesh}>
          <sphereGeometry args={[0.26, 32, 32]} />
          <meshStandardMaterial
            color="#fffdf0"
            emissive="#ffffff"
            emissiveIntensity={2.8 * opacity}
            transparent
            opacity={opacity}
          />
        </mesh>

        {/* Orbiting smoky obsidian ring */}
        <mesh ref={portalHalo}>
          <torusGeometry args={[0.62, 0.018, 16, 48]} />
          <meshPhysicalMaterial
            color="#181816"
            metalness={0.9}
            roughness={0.1}
            clearcoat={1}
            transmission={0.5}
            transparent
            opacity={opacity * 0.85}
          />
        </mesh>

        <pointLight position={[0, 0, 0.2]} color="#ffffff" distance={8} intensity={6 * opacity} />
      </group>
    </group>
  );
}

/**
 * MASTER LIGHTING RIG
 * Continuous cross-fading of chapter lighting moods without abrupt flashes.
 */
function ContinuousLighting({ progress }: { progress: number }) {
  const gitaLight = smoothstep(0.22, 0.30, progress) * (1 - smoothstep(0.38, 0.46, progress));
  const panchaLight = smoothstep(0.38, 0.45, progress) * (1 - smoothstep(0.48, 0.55, progress));
  const craftLight = smoothstep(0.48, 0.55, progress) * (1 - smoothstep(0.66, 0.74, progress));
  const studioLight = smoothstep(0.66, 0.74, progress) * (1 - smoothstep(0.88, 0.94, progress));
  const portalLight = smoothstep(0.88, 0.95, progress);

  return (
    <>
      <ambientLight intensity={0.16 + studioLight * 0.08} />
      <spotLight
        position={[6, 8, 7]}
        intensity={48}
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
      {/* Warm Diffuse Studio Fill */}
      <pointLight position={[0, 4, 3]} intensity={studioLight * 22} distance={12} color="#ffe8d6" />
      {/* Incandescent Portal Radiance on right column */}
      <pointLight position={[2.4, 0.1, 1]} intensity={portalLight * 38} distance={10} color="#ffffff" />
    </>
  );
}

/**
 * CONTINUOUS CAMERA RIG
 * Calm, stable framing across the journey.
 * Visual anchor stays consistently on the right side (x = 2.0 to 2.4) through chapters 1-4,
 * keeping the left side wide open for typography and cards.
 * Centers cleanly in Chapter 5 & 6.
 */
function ContinuousCameraPath({ progress, reducedMotion }: WorldProps) {
  const { camera, size } = useThree();
  const isMobile = size.width < 768;
  const smoothPRef = useRef(progress);
  const currentLookAt = useMemo(() => new THREE.Vector3(), []);

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
          new THREE.Vector3(0.0, 0.15, 7.2), // 0.00: Ch1 — centered camera, 3D spark on right (x=2.4)
          new THREE.Vector3(0.0, 0.15, 7.3), // 0.20: Ch2 — drafting plates on right (x=2.4), negative space on left
          new THREE.Vector3(0.0, 0.05, 7.2), // 0.42: Ch3A — GitaConnect Yantra directly behind right mockup (x=2.3)
          new THREE.Vector3(0.0, -0.05, 7.2), // 0.55: Ch3B — Panchatantra folklore rings on right (x=2.2)
          new THREE.Vector3(0.0, 0.15, 7.2), // 0.72: Ch4 — The Craft computational lattice on right (x=2.2)
          new THREE.Vector3(0.0, 0.35, 7.6), // 0.86: Ch5 — Studio horizon ribbon
          new THREE.Vector3(0.0, 0.10, 7.0), // 1.00: Ch6 — Final connection portal centered
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
          new THREE.Vector3(0.0, 0.10, 0),
          new THREE.Vector3(0.0, 0.10, 0),
          new THREE.Vector3(0.0, 0.00, 0),
          new THREE.Vector3(0.0, -0.05, 0),
          new THREE.Vector3(0.0, 0.10, 0),
          new THREE.Vector3(0.0, -0.15, 0),
          new THREE.Vector3(0.0, 0.10, 0),
        ];
    return new THREE.CatmullRomCurve3(targets, false, "centripetal");
  }, [isMobile]);

  useFrame((state, delta) => {
    const targetP = Math.max(0, Math.min(1, progress));
    const p = reducedMotion
      ? targetP
      : THREE.MathUtils.damp(smoothPRef.current, targetP, 4.8, delta);
    smoothPRef.current = p;

    const idealCamPos = cameraSpline.getPointAt(p);
    const idealTarget = targetSpline.getPointAt(p);

    if (!reducedMotion) {
      idealCamPos.x += state.pointer.x * 0.06;
      idealCamPos.y += state.pointer.y * 0.04;
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
        camera={{ position: [0.0, 0.15, 7.2], fov: 36, near: 0.1, far: 45 }}
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
