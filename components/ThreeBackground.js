'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function ParticleField({ mouse }) {
    const count = 2000;
    const mesh = useRef();

    const particles = useMemo(() => {
        const temp = [];
        const frappeColors = [
            "#F2D5CF", // rosewater
            "#EEBEBE", // flamingo
            "#F4B8E4", // pink
            "#CA9EE6", // mauve
            "#E78284", // red
            "#EA999C", // maroon
            "#EF9F76", // peach
            "#E5C890", // yellow
            "#A6D189", // green
            "#81C8BE", // teal
            "#99D1DB", // sky
            "#85C1DC", // sapphire
            "#8CAAEE", // blue
            "#BABBF1"  // lavender
        ];

        for (let i = 0; i < count; i++) {
            const t = Math.random() * 100;
            const factor = 20 + Math.random() * 100;
            const speed = 0.01 + Math.random() / 200;
            const xFactor = -50 + Math.random() * 100;
            const yFactor = -50 + Math.random() * 100;
            const zFactor = -50 + Math.random() * 100;

            // Give each particle a random base color from the palette
            const color = new THREE.Color();
            color.set(frappeColors[Math.floor(Math.random() * frappeColors.length)]);

            temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0, baseColor: color });
        }
        return temp;
    }, [count]);

    const dummy = useMemo(() => new THREE.Object3D(), []);
    const tempColor = useMemo(() => new THREE.Color(), []);

    useFrame((state) => {
        particles.forEach((particle, i) => {
            let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
            t = particle.t += speed / 2;
            const a = Math.cos(t) + Math.sin(t * 1) / 10;
            const b = Math.sin(t) + Math.cos(t * 2) / 10;
            const s = Math.cos(t);

            // Update particle position based on time and factors
            // INCREASED RESPONSE SPEED: 0.02 -> 0.1
            particle.mx += (mouse.current[0] - particle.mx) * 0.08;
            particle.my += (mouse.current[1] - particle.my) * 0.08;

            dummy.position.set(
                (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
                (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
                (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
            );

            // PROXIMITY CHECK
            // Calculate distance from particle "center" (mx, my) to actual mouse (mouse.current)
            // Note: mx/my are already chasing mouse.current, so this checks how "caught up" they are, 
            // OR we can check the distance of the particle's xFactor/yFactor relative to the center?
            // Actually, let's just use the raw mouse position vs the particle's 3D position projected? 
            // That's hard.
            // Let's stick to the "swarming" logic but make the scale depend on the mouse position.
            // If the mouse is in the center (0,0), particles near the center should be bigger?
            // Let's use the particle's 'mx' and 'my' which track the mouse.

            // New effect: Scale up based on how close the particle's "home" (xFactor, yFactor) is to the mouse?
            // No, let's just make the whole swarm pulse in size based on mouse movement speed?
            // Or simpler: Just make them bigger overall and the motion more chaotic.

            // Let's try this: Scale is influenced by mouse proximity to the particle's xFactor/yFactor
            // We need to map mouse (-1 to 1) to the world space (approx -50 to 50).
            const mouseWorldX = mouse.current[0] * 50;
            const mouseWorldY = -mouse.current[1] * 50; // Invert Y for world space match

            const dist = Math.sqrt(
                Math.pow(xFactor - mouseWorldX, 2) +
                Math.pow(yFactor - mouseWorldY, 2)
            );

            let scaleFactor = s; // Base scale from cosine

            // If close to mouse, scale UP drastically
            if (dist < 20) {
                scaleFactor = s + (20 - dist) * 0.1; // Add up to 2.0 to scale
            }

            dummy.scale.set(scaleFactor, scaleFactor, scaleFactor);
            dummy.rotation.set(s * 5, s * 5, s * 5);
            dummy.updateMatrix();

            mesh.current.setMatrixAt(i, dummy.matrix);

            // Update color: Pulse lightness based on time
            tempColor.copy(particle.baseColor);

            // More drastic pulse
            tempColor.offsetHSL(0, 0, (Math.sin(t * 5) * 0.2));

            // If close, make it brighter
            if (dist < 20) {
                tempColor.offsetHSL(0, 0, 0.3); // Brighten significantly
            }

            mesh.current.setColorAt(i, tempColor);
        });
        mesh.current.instanceMatrix.needsUpdate = true;
        if (mesh.current.instanceColor) mesh.current.instanceColor.needsUpdate = true;
    });

    return (
        <instancedMesh ref={mesh} args={[null, null, count]}>
            <dodecahedronGeometry args={[0.2, 0]} />
            <meshPhongMaterial color="#ffffff" />
        </instancedMesh>
    );
}

export default function ThreeBackground() {
    const mouse = useRef([0, 0]);

    useEffect(() => {
        const onMouseMove = (e) => {
            mouse.current = [
                (e.clientX / window.innerWidth) * 2 - 1,
                -(e.clientY / window.innerHeight) * 2 + 1
            ];
        };

        window.addEventListener('mousemove', onMouseMove);
        return () => window.removeEventListener('mousemove', onMouseMove);
    }, []);

    return (
        <div className="absolute inset-0 -z-10">
            <Canvas
                camera={{ position: [0, 0, 100], fov: 75 }}
                gl={{ alpha: true, antialias: true }}
                dpr={[1, 2]}
            >
                <ambientLight intensity={0.5} />
                <pointLight position={[100, 100, 100]} intensity={1} />
                <pointLight position={[-100, -100, -100]} intensity={1} />
                <ParticleField mouse={mouse} />
            </Canvas>
        </div>
    );
}
