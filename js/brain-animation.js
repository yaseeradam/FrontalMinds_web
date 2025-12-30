/**
 * FrontalMinds Premium 3D Animations
 * World-class Three.js animations with advanced effects
 */

// ============================================
// HERO SECTION - Neural Brain with Synapses
// ============================================
function initAdvancedBrainAnimation() {
    const canvas = document.getElementById('brain-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Color palette
    const colors = {
        primary: new THREE.Color(0x00d9ff),
        secondary: new THREE.Color(0x00ff88),
        accent: new THREE.Color(0xff00ff),
        white: new THREE.Color(0xffffff)
    };

    // ====== MAIN BRAIN STRUCTURE ======
    const brainGroup = new THREE.Group();

    // Create brain geometry with more detail
    const brainGeometry = new THREE.IcosahedronGeometry(1.5, 5);
    const positions = brainGeometry.attributes.position;
    const vertex = new THREE.Vector3();

    // Distort for brain-like appearance
    for (let i = 0; i < positions.count; i++) {
        vertex.fromBufferAttribute(positions, i);
        const noise =
            Math.sin(vertex.x * 4) * 0.15 +
            Math.cos(vertex.y * 3) * 0.12 +
            Math.sin(vertex.z * 5) * 0.08 +
            Math.sin(vertex.x * vertex.y * 2) * 0.05;
        vertex.normalize().multiplyScalar(1.5 + noise);
        positions.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }
    brainGeometry.computeVertexNormals();

    // Outer wireframe brain
    const brainMaterial = new THREE.MeshBasicMaterial({
        color: colors.primary,
        wireframe: true,
        transparent: true,
        opacity: 0.4
    });
    const brain = new THREE.Mesh(brainGeometry, brainMaterial);
    brainGroup.add(brain);

    // Inner solid brain with gradient effect
    const innerBrainMaterial = new THREE.MeshBasicMaterial({
        color: colors.secondary,
        transparent: true,
        opacity: 0.08
    });
    const innerBrain = new THREE.Mesh(brainGeometry.clone(), innerBrainMaterial);
    innerBrain.scale.setScalar(0.85);
    brainGroup.add(innerBrain);

    scene.add(brainGroup);

    // ====== NEURAL NODES (Neurons) ======
    const nodeCount = 80;
    const nodes = [];
    const nodeGroup = new THREE.Group();

    for (let i = 0; i < nodeCount; i++) {
        // Position on brain surface with some variance
        const phi = Math.acos(-1 + (2 * i) / nodeCount);
        const theta = Math.sqrt(nodeCount * Math.PI) * phi;
        const radius = 1.4 + (Math.random() - 0.5) * 0.4;

        const x = radius * Math.cos(theta) * Math.sin(phi);
        const y = radius * Math.sin(theta) * Math.sin(phi);
        const z = radius * Math.cos(phi);

        // Create glowing node
        const nodeGeometry = new THREE.SphereGeometry(0.04 + Math.random() * 0.03, 12, 12);
        const nodeMaterial = new THREE.MeshBasicMaterial({
            color: Math.random() > 0.5 ? colors.primary : colors.secondary,
            transparent: true,
            opacity: 0.8
        });
        const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
        node.position.set(x, y, z);

        // Store for animation
        node.userData = {
            baseOpacity: 0.5 + Math.random() * 0.5,
            pulseSpeed: 0.5 + Math.random() * 2,
            pulseOffset: Math.random() * Math.PI * 2
        };

        nodes.push(node);
        nodeGroup.add(node);
    }
    brainGroup.add(nodeGroup);

    // ====== SYNAPTIC CONNECTIONS ======
    const connectionGroup = new THREE.Group();
    const connections = [];

    // Create connections between nearby nodes
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            const distance = nodes[i].position.distanceTo(nodes[j].position);
            if (distance < 0.8 && Math.random() > 0.6) {
                const points = [];
                const segments = 20;

                for (let t = 0; t <= segments; t++) {
                    const alpha = t / segments;
                    const pos = new THREE.Vector3().lerpVectors(
                        nodes[i].position,
                        nodes[j].position,
                        alpha
                    );
                    // Add organic curve
                    const curve = Math.sin(alpha * Math.PI) * 0.1;
                    pos.multiplyScalar(1 + curve);
                    points.push(pos);
                }

                const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
                const lineMaterial = new THREE.LineBasicMaterial({
                    color: colors.primary,
                    transparent: true,
                    opacity: 0.15
                });
                const line = new THREE.Line(lineGeometry, lineMaterial);
                line.userData = {
                    baseOpacity: 0.1 + Math.random() * 0.2,
                    pulseSpeed: 0.3 + Math.random()
                };
                connections.push(line);
                connectionGroup.add(line);
            }
        }
    }
    brainGroup.add(connectionGroup);

    // ====== FLOATING DATA PARTICLES ======
    const particleCount = 2000;
    const particlesGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSizes = new Float32Array(particleCount);
    const particleColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const radius = 2.5 + Math.random() * 4;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;

        particlePositions[i3] = radius * Math.sin(phi) * Math.cos(theta);
        particlePositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        particlePositions[i3 + 2] = radius * Math.cos(phi);

        particleSizes[i] = Math.random() * 3 + 1;

        // Color gradient from cyan to green
        const colorMix = Math.random();
        const color = new THREE.Color().lerpColors(colors.primary, colors.secondary, colorMix);
        particleColors[i3] = color.r;
        particleColors[i3 + 1] = color.g;
        particleColors[i3 + 2] = color.b;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particlesGeometry.setAttribute('size', new THREE.BufferAttribute(particleSizes, 1));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.025,
        transparent: true,
        opacity: 0.6,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // ====== ORBITAL RINGS ======
    const ringGroup = new THREE.Group();
    const ringCount = 3;

    for (let i = 0; i < ringCount; i++) {
        const ringRadius = 2.2 + i * 0.4;
        const ringGeometry = new THREE.RingGeometry(ringRadius, ringRadius + 0.02, 128);
        const ringMaterial = new THREE.MeshBasicMaterial({
            color: i % 2 === 0 ? colors.primary : colors.secondary,
            transparent: true,
            opacity: 0.2 - i * 0.05,
            side: THREE.DoubleSide
        });
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.rotation.x = Math.PI / 2 + i * 0.3;
        ring.rotation.y = i * 0.5;
        ringGroup.add(ring);
    }
    scene.add(ringGroup);

    // ====== ENERGY PULSES ======
    const pulseGroup = new THREE.Group();
    const pulses = [];

    function createPulse() {
        const pulseGeometry = new THREE.SphereGeometry(0.1, 16, 16);
        const pulseMaterial = new THREE.MeshBasicMaterial({
            color: Math.random() > 0.5 ? colors.primary : colors.secondary,
            transparent: true,
            opacity: 1
        });
        const pulse = new THREE.Mesh(pulseGeometry, pulseMaterial);

        // Start from random node
        const startNode = nodes[Math.floor(Math.random() * nodes.length)];
        pulse.position.copy(startNode.position);
        pulse.userData = {
            life: 0,
            maxLife: 60 + Math.random() * 60,
            velocity: new THREE.Vector3(
                (Math.random() - 0.5) * 0.05,
                (Math.random() - 0.5) * 0.05,
                (Math.random() - 0.5) * 0.05
            )
        };

        pulses.push(pulse);
        pulseGroup.add(pulse);
    }
    brainGroup.add(pulseGroup);

    // ====== DATA STREAMS ======
    const streamGroup = new THREE.Group();
    const streamCount = 15;

    for (let i = 0; i < streamCount; i++) {
        const streamPoints = [];
        const startAngle = (i / streamCount) * Math.PI * 2;
        const segments = 50;

        for (let j = 0; j < segments; j++) {
            const t = j / segments;
            const radius = 3 + t * 3;
            const angle = startAngle + t * Math.PI;
            const x = Math.cos(angle) * radius;
            const y = (t - 0.5) * 4;
            const z = Math.sin(angle) * radius;
            streamPoints.push(new THREE.Vector3(x, y, z));
        }

        const streamCurve = new THREE.CatmullRomCurve3(streamPoints);
        const streamGeometry = new THREE.TubeGeometry(streamCurve, 50, 0.01, 4, false);
        const streamMaterial = new THREE.MeshBasicMaterial({
            color: colors.primary,
            transparent: true,
            opacity: 0.1
        });
        const stream = new THREE.Mesh(streamGeometry, streamMaterial);
        stream.userData = { rotationSpeed: 0.002 + Math.random() * 0.003 };
        streamGroup.add(stream);
    }
    scene.add(streamGroup);

    // ====== MOUSE INTERACTION ======
    let mouseX = 0, mouseY = 0;
    let targetX = 0, targetY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    // ====== ANIMATION LOOP ======
    let time = 0;

    function animate() {
        requestAnimationFrame(animate);
        time += 0.016;

        // Smooth mouse follow
        targetX += (mouseX - targetX) * 0.02;
        targetY += (mouseY - targetY) * 0.02;

        // Brain rotation
        brainGroup.rotation.y += 0.002;
        brainGroup.rotation.x = targetY * 0.3;
        brainGroup.rotation.z = targetX * 0.1;

        // Pulse nodes
        nodes.forEach(node => {
            const pulse = Math.sin(time * node.userData.pulseSpeed + node.userData.pulseOffset);
            node.material.opacity = node.userData.baseOpacity + pulse * 0.3;
            node.scale.setScalar(1 + pulse * 0.2);
        });

        // Pulse connections
        connections.forEach(conn => {
            const pulse = Math.sin(time * conn.userData.pulseSpeed);
            conn.material.opacity = conn.userData.baseOpacity + pulse * 0.1;
        });

        // Rotate rings
        ringGroup.children.forEach((ring, i) => {
            ring.rotation.z += 0.001 * (i + 1);
        });

        // Animate particles
        const particlePos = particles.geometry.attributes.position.array;
        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            const x = particlePos[i3];
            const y = particlePos[i3 + 1];
            const z = particlePos[i3 + 2];

            // Orbital movement
            const angle = 0.001;
            particlePos[i3] = x * Math.cos(angle) - z * Math.sin(angle);
            particlePos[i3 + 2] = x * Math.sin(angle) + z * Math.cos(angle);
        }
        particles.geometry.attributes.position.needsUpdate = true;
        particles.rotation.y += 0.0005;

        // Animate energy pulses
        for (let i = pulses.length - 1; i >= 0; i--) {
            const pulse = pulses[i];
            pulse.userData.life++;
            pulse.position.add(pulse.userData.velocity);
            pulse.material.opacity = 1 - (pulse.userData.life / pulse.userData.maxLife);
            pulse.scale.setScalar(1 + pulse.userData.life * 0.02);

            if (pulse.userData.life >= pulse.userData.maxLife) {
                pulseGroup.remove(pulse);
                pulses.splice(i, 1);
            }
        }

        // Create new pulses occasionally
        if (Math.random() > 0.95 && pulses.length < 20) {
            createPulse();
        }

        // Rotate data streams
        streamGroup.rotation.y += 0.001;

        // Inner brain pulse
        innerBrain.material.opacity = 0.05 + Math.sin(time * 2) * 0.03;
        innerBrain.scale.setScalar(0.85 + Math.sin(time) * 0.02);

        renderer.render(scene, camera);
    }

    animate();

    // Handle resize
    window.addEventListener('resize', () => {
        if (!canvas.clientWidth || !canvas.clientHeight) return;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    });
}

// Initialize on DOM load - replace the old initBrainAnimation
document.addEventListener('DOMContentLoaded', () => {
    // Check if we're on the homepage (has brain-canvas)
    if (document.getElementById('brain-canvas')) {
        initAdvancedBrainAnimation();
    }
});
