/**
 * FrontalMinds - Premium Services Page 3D Animations
 * World-class Three.js animations for each service section
 */

// ============================================
// WEB DEVELOPMENT - Floating Code Universe
// ============================================
function initWebDevAnimation() {
    const canvas = document.getElementById('web-dev-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const colors = {
        primary: 0x00d9ff,
        secondary: 0x00ff88,
        accent: 0xff6b6b,
        purple: 0x6c5ce7
    };

    // ====== FLOATING CODE BLOCKS ======
    const codeGroup = new THREE.Group();
    const codeBlocks = [];

    for (let i = 0; i < 15; i++) {
        const width = 0.8 + Math.random() * 0.8;
        const height = 0.4 + Math.random() * 0.6;

        // Create block with glowing edges
        const blockGeometry = new THREE.BoxGeometry(width, height, 0.05);
        const blockMaterial = new THREE.MeshBasicMaterial({
            color: 0x1a1a25,
            transparent: true,
            opacity: 0.8
        });
        const block = new THREE.Mesh(blockGeometry, blockMaterial);

        // Add code lines
        const linesGroup = new THREE.Group();
        const lineCount = Math.floor(height / 0.08);

        for (let j = 0; j < lineCount; j++) {
            const lineWidth = 0.1 + Math.random() * (width * 0.7);
            const lineGeometry = new THREE.PlaneGeometry(lineWidth, 0.02);
            const lineColor = [colors.primary, colors.secondary, colors.accent, colors.purple][Math.floor(Math.random() * 4)];
            const lineMaterial = new THREE.MeshBasicMaterial({
                color: lineColor,
                transparent: true,
                opacity: 0.6 + Math.random() * 0.4
            });
            const line = new THREE.Mesh(lineGeometry, lineMaterial);
            line.position.set(
                -width / 2 + lineWidth / 2 + 0.05 + Math.random() * 0.1,
                height / 2 - 0.06 - j * 0.08,
                0.03
            );
            linesGroup.add(line);
        }

        block.add(linesGroup);

        // Add glowing border
        const edges = new THREE.EdgesGeometry(blockGeometry);
        const edgeMaterial = new THREE.LineBasicMaterial({
            color: colors.primary,
            transparent: true,
            opacity: 0.4
        });
        const wireframe = new THREE.LineSegments(edges, edgeMaterial);
        block.add(wireframe);

        // Position randomly in 3D space
        block.position.set(
            (Math.random() - 0.5) * 8,
            (Math.random() - 0.5) * 6,
            (Math.random() - 0.5) * 4
        );
        block.rotation.set(
            Math.random() * 0.3,
            Math.random() * 0.5,
            Math.random() * 0.2
        );

        block.userData = {
            floatSpeed: 0.5 + Math.random(),
            floatOffset: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.01
        };

        codeBlocks.push(block);
        codeGroup.add(block);
    }
    scene.add(codeGroup);

    // ====== CENTRAL BROWSER WINDOW ======
    const browserGroup = new THREE.Group();

    // Main browser frame
    const frameGeometry = new THREE.BoxGeometry(3.5, 2.3, 0.1);
    const frameMaterial = new THREE.MeshBasicMaterial({
        color: 0x12121a,
        transparent: true,
        opacity: 0.95
    });
    const frame = new THREE.Mesh(frameGeometry, frameMaterial);
    browserGroup.add(frame);

    // Top bar
    const topBar = new THREE.Mesh(
        new THREE.BoxGeometry(3.5, 0.25, 0.11),
        new THREE.MeshBasicMaterial({ color: 0x1a1a25 })
    );
    topBar.position.y = 1.025;
    browserGroup.add(topBar);

    // Traffic lights
    const buttonColors = [0xff5f56, 0xffbd2e, 0x27c93f];
    buttonColors.forEach((color, i) => {
        const btn = new THREE.Mesh(
            new THREE.CircleGeometry(0.04, 16),
            new THREE.MeshBasicMaterial({ color })
        );
        btn.position.set(-1.5 + i * 0.12, 1.025, 0.07);
        browserGroup.add(btn);
    });

    // URL bar
    const urlBar = new THREE.Mesh(
        new THREE.BoxGeometry(1.8, 0.12, 0.01),
        new THREE.MeshBasicMaterial({ color: 0x2a2a35 })
    );
    urlBar.position.set(0.3, 1.025, 0.07);
    browserGroup.add(urlBar);

    // Content area with gradient animation
    const contentGeometry = new THREE.PlaneGeometry(3.3, 1.85);
    const contentMaterial = new THREE.MeshBasicMaterial({
        color: 0x0a0a0f,
        transparent: true,
        opacity: 1
    });
    const content = new THREE.Mesh(contentGeometry, contentMaterial);
    content.position.z = 0.06;
    content.position.y = -0.1;
    browserGroup.add(content);

    // Hero section mockup
    const heroBlock = new THREE.Mesh(
        new THREE.PlaneGeometry(1.4, 0.4),
        new THREE.MeshBasicMaterial({
            color: colors.primary,
            transparent: true,
            opacity: 0.2
        })
    );
    heroBlock.position.set(-0.8, 0.5, 0.07);
    browserGroup.add(heroBlock);

    // Navigation dots
    for (let i = 0; i < 4; i++) {
        const navDot = new THREE.Mesh(
            new THREE.BoxGeometry(0.15, 0.04, 0.01),
            new THREE.MeshBasicMaterial({
                color: i === 0 ? colors.primary : 0x3a3a45
            })
        );
        navDot.position.set(0.6 + i * 0.2, 0.7, 0.07);
        browserGroup.add(navDot);
    }

    // Card grid
    for (let row = 0; row < 2; row++) {
        for (let col = 0; col < 3; col++) {
            const card = new THREE.Mesh(
                new THREE.BoxGeometry(0.9, 0.5, 0.02),
                new THREE.MeshBasicMaterial({
                    color: 0x1a1a25,
                    transparent: true,
                    opacity: 0.8
                })
            );
            card.position.set(-1 + col * 1.05, 0.05 - row * 0.6, 0.07);

            // Card accent line
            const accent = new THREE.Mesh(
                new THREE.BoxGeometry(0.85, 0.03, 0.01),
                new THREE.MeshBasicMaterial({
                    color: [colors.primary, colors.secondary, colors.accent][col % 3]
                })
            );
            accent.position.set(0, 0.2, 0.02);
            card.add(accent);

            browserGroup.add(card);
        }
    }

    scene.add(browserGroup);

    // ====== PARTICLE FIELD ======
    const particleCount = 500;
    const particlesGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
        particlePositions[i] = (Math.random() - 0.5) * 15;
        particlePositions[i + 1] = (Math.random() - 0.5) * 10;
        particlePositions[i + 2] = (Math.random() - 0.5) * 8;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particlesMaterial = new THREE.PointsMaterial({
        color: colors.primary,
        size: 0.03,
        transparent: true,
        opacity: 0.5,
        blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // ====== DATA FLOW LINES ======
    const dataLines = [];
    for (let i = 0; i < 8; i++) {
        const points = [];
        const startX = -6 + Math.random() * 12;
        const startY = -4 + Math.random() * 8;

        for (let j = 0; j < 50; j++) {
            points.push(new THREE.Vector3(
                startX + j * 0.15,
                startY + Math.sin(j * 0.2 + i) * 0.5,
                -3 + Math.sin(j * 0.1) * 0.5
            ));
        }

        const curve = new THREE.CatmullRomCurve3(points);
        const tubeGeometry = new THREE.TubeGeometry(curve, 50, 0.008, 4, false);
        const tubeMaterial = new THREE.MeshBasicMaterial({
            color: i % 2 === 0 ? colors.primary : colors.secondary,
            transparent: true,
            opacity: 0.15
        });
        const tube = new THREE.Mesh(tubeGeometry, tubeMaterial);
        dataLines.push(tube);
        scene.add(tube);
    }

    // ====== ANIMATION ======
    let time = 0;
    let mouseX = 0, mouseY = 0;

    canvas.parentElement?.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    });

    function animate() {
        requestAnimationFrame(animate);
        time += 0.016;

        // Float code blocks
        codeBlocks.forEach(block => {
            block.position.y += Math.sin(time * block.userData.floatSpeed + block.userData.floatOffset) * 0.002;
            block.rotation.y += block.userData.rotationSpeed;
        });

        // Browser subtle movement
        browserGroup.rotation.y = Math.sin(time * 0.5) * 0.05 + mouseX * 0.1;
        browserGroup.rotation.x = Math.cos(time * 0.3) * 0.03 + mouseY * 0.05;
        browserGroup.position.y = Math.sin(time * 0.8) * 0.05;

        // Rotate particles
        particles.rotation.y += 0.0005;
        particles.rotation.x += 0.0002;

        renderer.render(scene, camera);
    }

    animate();

    window.addEventListener('resize', () => {
        if (!canvas.clientWidth) return;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    });
}

// ============================================
// MOBILE APP - Holographic Phone
// ============================================
function initMobileDevAnimation() {
    const canvas = document.getElementById('mobile-dev-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const colors = {
        primary: new THREE.Color(0x00d9ff),
        secondary: new THREE.Color(0x00ff88),
        accent: new THREE.Color(0xff6b6b)
    };

    // ====== HOLOGRAPHIC PHONE ======
    const phoneGroup = new THREE.Group();

    // Phone body with rounded corners (approximated with box)
    const phoneGeometry = new THREE.BoxGeometry(1.2, 2.4, 0.1);
    const phoneMaterial = new THREE.MeshBasicMaterial({
        color: 0x0a0a15,
        transparent: true,
        opacity: 0.95
    });
    const phone = new THREE.Mesh(phoneGeometry, phoneMaterial);
    phoneGroup.add(phone);

    // Phone screen
    const screenGeometry = new THREE.PlaneGeometry(1.1, 2.2);
    const screenMaterial = new THREE.MeshBasicMaterial({
        color: 0x12121a,
        transparent: true,
        opacity: 1
    });
    const screen = new THREE.Mesh(screenGeometry, screenMaterial);
    screen.position.z = 0.051;
    phoneGroup.add(screen);

    // Glowing edge effect
    const edgeGeometry = new THREE.EdgesGeometry(phoneGeometry);
    const edgeMaterial = new THREE.LineBasicMaterial({
        color: 0x00d9ff,
        transparent: true,
        opacity: 0.5
    });
    const edges = new THREE.LineSegments(edgeGeometry, edgeMaterial);
    phoneGroup.add(edges);

    // App icons grid (3x5)
    const iconColors = [0x00d9ff, 0x00ff88, 0xff6b6b, 0xffd93d, 0x6c5ce7,
        0xa29bfe, 0x00d9ff, 0x00ff88, 0xff6b6b, 0xffd93d,
        0x6c5ce7, 0xa29bfe, 0x00d9ff, 0x00ff88, 0xff6b6b];

    for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 3; col++) {
            const iconIdx = row * 3 + col;
            const iconGeometry = new THREE.BoxGeometry(0.22, 0.22, 0.02);
            const iconMaterial = new THREE.MeshBasicMaterial({
                color: iconColors[iconIdx],
                transparent: true,
                opacity: 0.8
            });
            const icon = new THREE.Mesh(iconGeometry, iconMaterial);
            icon.position.set(
                -0.32 + col * 0.32,
                0.75 - row * 0.35,
                0.07
            );

            // Icon glow
            const glowGeometry = new THREE.PlaneGeometry(0.28, 0.28);
            const glowMaterial = new THREE.MeshBasicMaterial({
                color: iconColors[iconIdx],
                transparent: true,
                opacity: 0.2
            });
            const glow = new THREE.Mesh(glowGeometry, glowMaterial);
            glow.position.z = -0.01;
            icon.add(glow);

            icon.userData = {
                baseY: icon.position.y,
                floatOffset: Math.random() * Math.PI * 2,
                floatSpeed: 1 + Math.random()
            };

            phoneGroup.add(icon);
        }
    }

    // Status bar
    const statusBar = new THREE.Mesh(
        new THREE.PlaneGeometry(1.1, 0.08),
        new THREE.MeshBasicMaterial({ color: 0x1a1a25 })
    );
    statusBar.position.set(0, 1.02, 0.06);
    phoneGroup.add(statusBar);

    // Home indicator
    const homeIndicator = new THREE.Mesh(
        new THREE.BoxGeometry(0.35, 0.015, 0.01),
        new THREE.MeshBasicMaterial({ color: 0x00d9ff })
    );
    homeIndicator.position.set(0, -1.0, 0.06);
    phoneGroup.add(homeIndicator);

    scene.add(phoneGroup);

    // ====== FLOATING NOTIFICATIONS ======
    const notificationGroup = new THREE.Group();
    const notifications = [];

    function createNotification() {
        const notifGroup = new THREE.Group();

        const notifGeometry = new THREE.BoxGeometry(0.8, 0.2, 0.02);
        const notifMaterial = new THREE.MeshBasicMaterial({
            color: 0x1a1a25,
            transparent: true,
            opacity: 0.9
        });
        const notif = new THREE.Mesh(notifGeometry, notifMaterial);
        notifGroup.add(notif);

        // Icon circle
        const iconCircle = new THREE.Mesh(
            new THREE.CircleGeometry(0.05, 16),
            new THREE.MeshBasicMaterial({
                color: [0x00d9ff, 0x00ff88, 0xff6b6b][Math.floor(Math.random() * 3)]
            })
        );
        iconCircle.position.set(-0.32, 0, 0.02);
        notifGroup.add(iconCircle);

        // Text lines
        for (let i = 0; i < 2; i++) {
            const textLine = new THREE.Mesh(
                new THREE.BoxGeometry(0.35 - i * 0.1, 0.025, 0.01),
                new THREE.MeshBasicMaterial({ color: 0x4a4a5a })
            );
            textLine.position.set(-0.02 + i * 0.02, 0.03 - i * 0.06, 0.02);
            notifGroup.add(textLine);
        }

        // Edge glow
        const edges = new THREE.LineSegments(
            new THREE.EdgesGeometry(notifGeometry),
            new THREE.LineBasicMaterial({ color: 0x00d9ff, transparent: true, opacity: 0.3 })
        );
        notifGroup.add(edges);

        notifGroup.position.set(
            1.2 + Math.random() * 0.5,
            0.8 - notifications.length * 0.35,
            Math.random() * 0.3
        );
        notifGroup.userData = {
            targetX: 0.9,
            life: 0,
            maxLife: 200 + Math.random() * 100
        };

        notifications.push(notifGroup);
        notificationGroup.add(notifGroup);
    }

    scene.add(notificationGroup);

    // ====== DATA PARTICLES ======
    const particleCount = 800;
    const particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const radius = 2 + Math.random() * 3;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;

        positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i3 + 2] = radius * Math.cos(phi);

        const colorChoice = Math.random();
        if (colorChoice < 0.5) {
            particleColors[i3] = colors.primary.r;
            particleColors[i3 + 1] = colors.primary.g;
            particleColors[i3 + 2] = colors.primary.b;
        } else {
            particleColors[i3] = colors.secondary.r;
            particleColors[i3 + 1] = colors.secondary.g;
            particleColors[i3 + 2] = colors.secondary.b;
        }
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        transparent: true,
        opacity: 0.5,
        vertexColors: true,
        blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // ====== ORBITAL RINGS ======
    for (let i = 0; i < 3; i++) {
        const ringGeometry = new THREE.RingGeometry(2 + i * 0.4, 2.02 + i * 0.4, 64);
        const ringMaterial = new THREE.MeshBasicMaterial({
            color: i % 2 === 0 ? colors.primary : colors.secondary,
            transparent: true,
            opacity: 0.15 - i * 0.04,
            side: THREE.DoubleSide
        });
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.rotation.x = Math.PI / 2;
        ring.rotation.y = i * 0.3;
        scene.add(ring);
    }

    // ====== ANIMATION ======
    let time = 0;
    let mouseX = 0, mouseY = 0;

    canvas.parentElement?.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    });

    function animate() {
        requestAnimationFrame(animate);
        time += 0.016;

        // Phone rotation
        phoneGroup.rotation.y = Math.sin(time * 0.5) * 0.15 + mouseX * 0.2;
        phoneGroup.rotation.x = Math.cos(time * 0.3) * 0.05 + mouseY * 0.1;
        phoneGroup.position.y = Math.sin(time * 0.8) * 0.1;

        // Animate app icons
        phoneGroup.children.forEach(child => {
            if (child.userData.floatOffset !== undefined) {
                child.position.y = child.userData.baseY +
                    Math.sin(time * child.userData.floatSpeed + child.userData.floatOffset) * 0.02;
            }
        });

        // Animate notifications
        for (let i = notifications.length - 1; i >= 0; i--) {
            const notif = notifications[i];
            notif.userData.life++;

            // Slide in
            if (notif.position.x > notif.userData.targetX) {
                notif.position.x -= 0.02;
            }

            // Fade out
            if (notif.userData.life > notif.userData.maxLife - 30) {
                notif.children.forEach(child => {
                    if (child.material) {
                        child.material.opacity *= 0.95;
                    }
                });
            }

            if (notif.userData.life >= notif.userData.maxLife) {
                notificationGroup.remove(notif);
                notifications.splice(i, 1);
            }
        }

        // Create new notifications
        if (Math.random() > 0.99 && notifications.length < 3) {
            createNotification();
        }

        // Rotate particles
        particles.rotation.y += 0.001;
        particles.rotation.x += 0.0005;

        // Pulse edge glow
        edges.material.opacity = 0.4 + Math.sin(time * 2) * 0.2;

        renderer.render(scene, camera);
    }

    animate();

    window.addEventListener('resize', () => {
        if (!canvas.clientWidth) return;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    });
}

// ============================================
// CYBERSECURITY - Shield Fortress
// ============================================
function initSecurityAnimation() {
    const canvas = document.getElementById('security-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const colors = {
        primary: new THREE.Color(0x00d9ff),
        secondary: new THREE.Color(0x00ff88),
        danger: new THREE.Color(0xff4757),
        warning: new THREE.Color(0xffa502)
    };

    // ====== CENTRAL SHIELD ======
    const shieldGroup = new THREE.Group();

    // Create shield shape
    const shieldShape = new THREE.Shape();
    shieldShape.moveTo(0, 1.5);
    shieldShape.bezierCurveTo(1.2, 1.2, 1.4, 0.5, 1.4, 0);
    shieldShape.bezierCurveTo(1.4, -0.8, 0.7, -1.4, 0, -1.8);
    shieldShape.bezierCurveTo(-0.7, -1.4, -1.4, -0.8, -1.4, 0);
    shieldShape.bezierCurveTo(-1.4, 0.5, -1.2, 1.2, 0, 1.5);

    // Main shield
    const shieldGeometry = new THREE.ExtrudeGeometry(shieldShape, {
        depth: 0.15,
        bevelEnabled: true,
        bevelThickness: 0.02,
        bevelSize: 0.02,
        bevelSegments: 3
    });
    const shieldMaterial = new THREE.MeshBasicMaterial({
        color: colors.primary,
        transparent: true,
        opacity: 0.15,
        side: THREE.DoubleSide
    });
    const shield = new THREE.Mesh(shieldGeometry, shieldMaterial);
    shieldGroup.add(shield);

    // Shield wireframe
    const shieldWireframe = new THREE.LineSegments(
        new THREE.EdgesGeometry(shieldGeometry),
        new THREE.LineBasicMaterial({ color: colors.primary, transparent: true, opacity: 0.6 })
    );
    shieldGroup.add(shieldWireframe);

    // Inner shield layers
    for (let i = 0; i < 3; i++) {
        const innerShield = shield.clone();
        innerShield.scale.setScalar(0.85 - i * 0.15);
        innerShield.position.z = 0.1 + i * 0.1;
        innerShield.material = new THREE.MeshBasicMaterial({
            color: i === 0 ? colors.primary : colors.secondary,
            transparent: true,
            opacity: 0.1 - i * 0.02
        });
        shieldGroup.add(innerShield);
    }

    // Lock icon in center
    const lockGroup = new THREE.Group();

    // Lock body
    const lockBody = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 0.4, 0.15),
        new THREE.MeshBasicMaterial({ color: colors.primary })
    );
    lockBody.position.y = -0.2;
    lockGroup.add(lockBody);

    // Lock shackle
    const shackleCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-0.15, 0, 0),
        new THREE.Vector3(-0.15, 0.25, 0),
        new THREE.Vector3(0, 0.4, 0),
        new THREE.Vector3(0.15, 0.25, 0),
        new THREE.Vector3(0.15, 0, 0)
    ]);
    const shackleGeometry = new THREE.TubeGeometry(shackleCurve, 20, 0.05, 8, false);
    const shackle = new THREE.Mesh(shackleGeometry, new THREE.MeshBasicMaterial({ color: colors.primary }));
    lockGroup.add(shackle);

    lockGroup.position.z = 0.2;
    shieldGroup.add(lockGroup);

    scene.add(shieldGroup);

    // ====== DEFENSIVE RINGS ======
    const ringGroup = new THREE.Group();
    const rings = [];

    for (let i = 0; i < 5; i++) {
        const radius = 2 + i * 0.5;
        const ringGeometry = new THREE.RingGeometry(radius, radius + 0.03, 64);
        const ringMaterial = new THREE.MeshBasicMaterial({
            color: i % 2 === 0 ? colors.primary : colors.secondary,
            transparent: true,
            opacity: 0.25 - i * 0.04,
            side: THREE.DoubleSide
        });
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.userData = {
            rotationSpeed: (0.005 + i * 0.002) * (i % 2 === 0 ? 1 : -1),
            radius: radius
        };
        rings.push(ring);
        ringGroup.add(ring);
    }
    scene.add(ringGroup);

    // ====== THREAT PARTICLES ======
    const threatGroup = new THREE.Group();
    const threats = [];

    function createThreat() {
        const threatGeometry = new THREE.TetrahedronGeometry(0.08, 0);
        const threatMaterial = new THREE.MeshBasicMaterial({
            color: colors.danger,
            transparent: true,
            opacity: 0.8
        });
        const threat = new THREE.Mesh(threatGeometry, threatMaterial);

        // Start from outside
        const angle = Math.random() * Math.PI * 2;
        const distance = 5 + Math.random() * 2;
        threat.position.set(
            Math.cos(angle) * distance,
            Math.sin(angle) * distance,
            (Math.random() - 0.5) * 2
        );

        threat.userData = {
            angle: angle,
            speed: 0.02 + Math.random() * 0.02,
            life: 0,
            blocked: false,
            blockDistance: 2 + Math.random() * 1
        };

        threats.push(threat);
        threatGroup.add(threat);
    }

    scene.add(threatGroup);

    // ====== BLOCK EFFECTS ======
    const blockEffects = [];
    const blockGroup = new THREE.Group();
    scene.add(blockGroup);

    function createBlockEffect(position) {
        const effectGroup = new THREE.Group();

        // Ripple rings
        for (let i = 0; i < 3; i++) {
            const ringGeometry = new THREE.RingGeometry(0.1, 0.12, 32);
            const ringMaterial = new THREE.MeshBasicMaterial({
                color: colors.secondary,
                transparent: true,
                opacity: 0.8,
                side: THREE.DoubleSide
            });
            const ring = new THREE.Mesh(ringGeometry, ringMaterial);
            ring.userData = { scale: 1 + i * 0.3, delay: i * 5 };
            effectGroup.add(ring);
        }

        effectGroup.position.copy(position);
        effectGroup.userData = { life: 0, maxLife: 40 };

        blockEffects.push(effectGroup);
        blockGroup.add(effectGroup);
    }

    // ====== DATA ENCRYPTION STREAMS ======
    const streamGroup = new THREE.Group();

    for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2;
        const points = [];

        for (let j = 0; j < 30; j++) {
            const t = j / 30;
            const radius = 1.8 + t * 2;
            points.push(new THREE.Vector3(
                Math.cos(angle + t * 2) * radius,
                Math.sin(angle + t * 2) * radius,
                (t - 0.5) * 2
            ));
        }

        const curve = new THREE.CatmullRomCurve3(points);
        const tubeGeometry = new THREE.TubeGeometry(curve, 30, 0.01, 4, false);
        const tubeMaterial = new THREE.MeshBasicMaterial({
            color: i % 3 === 0 ? colors.primary : (i % 3 === 1 ? colors.secondary : colors.warning),
            transparent: true,
            opacity: 0.2
        });
        const tube = new THREE.Mesh(tubeGeometry, tubeMaterial);
        tube.userData = { rotationSpeed: 0.003 * (i % 2 === 0 ? 1 : -1) };
        streamGroup.add(tube);
    }
    scene.add(streamGroup);

    // ====== SCAN LINES ======
    const scanLineGeometry = new THREE.PlaneGeometry(6, 0.03);
    const scanLineMaterial = new THREE.MeshBasicMaterial({
        color: colors.secondary,
        transparent: true,
        opacity: 0.3,
        side: THREE.DoubleSide
    });
    const scanLine = new THREE.Mesh(scanLineGeometry, scanLineMaterial);
    scene.add(scanLine);

    // ====== ANIMATION ======
    let time = 0;
    let mouseX = 0, mouseY = 0;

    canvas.parentElement?.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    });

    function animate() {
        requestAnimationFrame(animate);
        time += 0.016;

        // Shield rotation
        shieldGroup.rotation.y = Math.sin(time * 0.3) * 0.2 + mouseX * 0.15;
        shieldGroup.rotation.x = Math.cos(time * 0.2) * 0.1 + mouseY * 0.1;

        // Shield pulse
        shieldGroup.children.forEach((child, i) => {
            if (child.material && i < 4) {
                child.material.opacity = (0.15 - i * 0.03) + Math.sin(time * 2 + i) * 0.05;
            }
        });

        // Lock glow
        lockGroup.children.forEach(child => {
            child.material.color.setHex(
                Math.sin(time * 3) > 0 ? 0x00d9ff : 0x00ff88
            );
        });

        // Rotate rings
        rings.forEach(ring => {
            ring.rotation.z += ring.userData.rotationSpeed;
        });

        // Animate threats
        for (let i = threats.length - 1; i >= 0; i--) {
            const threat = threats[i];
            threat.userData.life++;
            threat.rotation.x += 0.05;
            threat.rotation.y += 0.05;

            if (!threat.userData.blocked) {
                // Move toward center
                const distance = threat.position.length();
                if (distance > threat.userData.blockDistance) {
                    threat.position.multiplyScalar(1 - threat.userData.speed);
                } else {
                    // Blocked!
                    threat.userData.blocked = true;
                    createBlockEffect(threat.position.clone());
                }
            } else {
                // Fade out
                threat.material.opacity *= 0.9;
                if (threat.material.opacity < 0.01) {
                    threatGroup.remove(threat);
                    threats.splice(i, 1);
                }
            }
        }

        // Create new threats
        if (Math.random() > 0.97 && threats.length < 15) {
            createThreat();
        }

        // Animate block effects
        for (let i = blockEffects.length - 1; i >= 0; i--) {
            const effect = blockEffects[i];
            effect.userData.life++;

            effect.children.forEach((ring, idx) => {
                const progress = Math.max(0, (effect.userData.life - ring.userData.delay) / 30);
                ring.scale.setScalar(ring.userData.scale + progress * 2);
                ring.material.opacity = 0.8 * (1 - progress);
            });

            if (effect.userData.life >= effect.userData.maxLife) {
                blockGroup.remove(effect);
                blockEffects.splice(i, 1);
            }
        }

        // Rotate encryption streams
        streamGroup.rotation.z += 0.002;

        // Scan line
        scanLine.position.y = Math.sin(time) * 2.5;
        scanLine.material.opacity = 0.2 + Math.abs(Math.sin(time)) * 0.2;

        renderer.render(scene, camera);
    }

    animate();

    window.addEventListener('resize', () => {
        if (!canvas.clientWidth) return;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    });
}

// Initialize all animations when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initWebDevAnimation();
    initMobileDevAnimation();
    initSecurityAnimation();
});
