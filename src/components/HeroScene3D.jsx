import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroScene3D({ isOverclocked = false, onCoreClick }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Three.js Scene, Camera, Renderer
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      52,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 18);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    mount.appendChild(renderer.domElement);

    // =========================================================================
    // 1. PHOTOREALISTIC 3D PANORAMIC MOVING WALLPAPER BACKDROP
    // =========================================================================
    // Load the 8K photorealistic citadel image directly as a 3D texture!
    const textureLoader = new THREE.TextureLoader();
    const backdropGeo = new THREE.PlaneGeometry(88, 50, 16, 16);
    
    const backdropTexture = textureLoader.load(`${import.meta.env.BASE_URL}assets/hero-citadel.jpg`);
    backdropTexture.generateMipmaps = true;
    backdropTexture.minFilter = THREE.LinearMipmapLinearFilter;
    backdropTexture.magFilter = THREE.LinearFilter;
    if (renderer.capabilities && renderer.capabilities.getMaxAnisotropy) {
      backdropTexture.anisotropy = Math.min(16, renderer.capabilities.getMaxAnisotropy());
    }

    const backdropMat = new THREE.MeshBasicMaterial({
      map: backdropTexture,
      depthWrite: false,
    });
    const backdropMesh = new THREE.Mesh(backdropGeo, backdropMat);
    backdropMesh.position.set(0, 0, -32);
    scene.add(backdropMesh);

    // =========================================================================
    // 2. DYNAMIC 3D DRIFTING VOLUMETRIC CLOUDS (IN FRONT OF CITADEL)
    // =========================================================================
    const cloudsGroup = new THREE.Group();
    scene.add(cloudsGroup);

    // Procedural soft cloud texture
    const cloudCanvas = document.createElement('canvas');
    cloudCanvas.width = 128;
    cloudCanvas.height = 128;
    const cCtx = cloudCanvas.getContext('2d');
    const cloudGrad = cCtx.createRadialGradient(64, 64, 0, 64, 64, 64);
    cloudGrad.addColorStop(0, 'rgba(255, 230, 200, 0.45)');
    cloudGrad.addColorStop(0.4, 'rgba(255, 180, 100, 0.25)');
    cloudGrad.addColorStop(0.8, 'rgba(0, 242, 254, 0.08)');
    cloudGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    cCtx.fillStyle = cloudGrad;
    cCtx.fillRect(0, 0, 128, 128);

    const cloudTex = new THREE.CanvasTexture(cloudCanvas);
    const cloudMat = new THREE.MeshBasicMaterial({
      map: cloudTex,
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });

    const clouds = [];
    for (let i = 0; i < 4; i++) {
      const cGeo = new THREE.PlaneGeometry(32 + Math.random() * 16, 8 + Math.random() * 4);
      const cMesh = new THREE.Mesh(cGeo, cloudMat);
      const cx = -30 + (i * 20);
      const cy = -8 + (i % 2) * 6;
      const cz = -22 + i * 2;
      cMesh.position.set(cx, cy, cz);
      cloudsGroup.add(cMesh);
      clouds.push({
        mesh: cMesh,
        speed: 0.008 + (i * 0.004),
        baseY: cy,
        bobSpeed: 0.3 + (i * 0.1),
      });
    }

    // =========================================================================
    // 3. LIGHTING
    // =========================================================================
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffb347, 3.0);
    sunLight.position.set(15, 10, 12);
    scene.add(sunLight);

    const cyanRimLight = new THREE.DirectionalLight(0x00f2fe, 3.2);
    cyanRimLight.position.set(-15, -6, 10);
    scene.add(cyanRimLight);

    const coreLight = new THREE.PointLight(0x00f2fe, 5.0, 35);
    scene.add(coreLight);

    // =========================================================================
    // 4. FLOATING 3D CHRONO-CORE (CENTERPIECE)
    // =========================================================================
    const coreGroup = new THREE.Group();
    coreGroup.position.set(0, 0, 0);
    scene.add(coreGroup);

    // Inner faceted crystal
    const innerGeo = new THREE.IcosahedronGeometry(2.5, 0);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x00f2fe,
      emissive: 0x006688,
      roughness: 0.1,
      metalness: 0.9,
      flatShading: true,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerMesh);

    // Outer wireframe geometric cage
    const outerGeo = new THREE.IcosahedronGeometry(3.5, 1);
    const outerMat = new THREE.MeshStandardMaterial({
      color: 0xffb347,
      wireframe: true,
      emissive: 0x553300,
      roughness: 0.2,
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    coreGroup.add(outerMesh);

    // Orbital Runic Energy Rings
    const createRing = (radius, tube, color, rotX, rotY, rotZ) => {
      const geo = new THREE.TorusGeometry(radius, tube, 16, 120);
      const mat = new THREE.MeshBasicMaterial({ color });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.rotation.set(rotX, rotY, rotZ);
      coreGroup.add(mesh);
      return mesh;
    };

    const ring1 = createRing(4.6, 0.07, 0x00f2fe, Math.PI / 3, 0, 0);
    const ring2 = createRing(5.3, 0.06, 0xff007f, 0, Math.PI / 4, Math.PI / 6);
    const ring3 = createRing(6.0, 0.05, 0xffd166, -Math.PI / 4, Math.PI / 3, 0);

    // Orbiting Rune Shards
    const shards = [];
    const shardGroup = new THREE.Group();
    coreGroup.add(shardGroup);

    const shardGeo = new THREE.ConeGeometry(0.4, 1.8, 5);
    const shardMat = new THREE.MeshStandardMaterial({
      color: 0x00f2fe,
      emissive: 0x002233,
      metalness: 0.95,
      roughness: 0.1,
      flatShading: true,
    });

    for (let i = 0; i < 8; i++) {
      const shard = new THREE.Mesh(shardGeo, shardMat);
      const angle = (i / 8) * Math.PI * 2;
      const radius = 6.8 + (i % 2) * 1.2;
      shard.position.set(Math.cos(angle) * radius, (Math.random() - 0.5) * 3, Math.sin(angle) * radius);
      shardGroup.add(shard);
      shards.push({ mesh: shard, angle, radius, speed: 0.008 + (i % 3) * 0.003 });
    }

    // =========================================================================
    // 5. CRUISING 3D SCI-FI STARSHIPS WITH ENGINE TRAILS
    // =========================================================================
    const shipsGroup = new THREE.Group();
    scene.add(shipsGroup);

    const ships = [];
    const shipGeo = new THREE.ConeGeometry(0.24, 1.4, 4);
    shipGeo.rotateX(Math.PI / 2);

    const shipMat = new THREE.MeshStandardMaterial({
      color: 0x00f2fe,
      emissive: 0x004466,
      roughness: 0.2,
      metalness: 0.85,
    });

    for (let i = 0; i < 8; i++) {
      const ship = new THREE.Mesh(shipGeo, shipMat);
      const x = -35 + Math.random() * 70;
      const y = -8 + Math.random() * 16;
      const z = -12 - Math.random() * 14;
      ship.position.set(x, y, z);

      const trailLight = new THREE.PointLight(0x00f2fe, 2.0, 8);
      ship.add(trailLight);

      shipsGroup.add(ship);
      ships.push({
        mesh: ship,
        speed: 0.06 + Math.random() * 0.08,
        resetX: 40,
        startX: -40,
        baseY: y,
        bobSpeed: 1.2 + Math.random(),
      });
    }

    // =========================================================================
    // 6. FORMAL CELESTIAL STARDUST (75 FORMAL MICRO-POINTS, NO BUBBLES)
    // =========================================================================
    const particleCount = 75;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorCyan = new THREE.Color(0xa5f3fc);
    const colorGold = new THREE.Color(0xfde68a);
    const colorWhite = new THREE.Color(0xffffff);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 55;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 35;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 35;

      const rand = Math.random();
      let c;
      if (rand < 0.55) c = colorWhite;
      else if (rand < 0.85) c = colorCyan;
      else c = colorGold;

      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const pCanvas = document.createElement('canvas');
    pCanvas.width = 16;
    pCanvas.height = 16;
    const pCtx = pCanvas.getContext('2d');
    const radGrad = pCtx.createRadialGradient(8, 8, 0, 8, 8, 8);
    radGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
    radGrad.addColorStop(0.2, 'rgba(255, 255, 255, 0.7)');
    radGrad.addColorStop(0.6, 'rgba(0, 242, 254, 0.2)');
    radGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    pCtx.fillStyle = radGrad;
    pCtx.fillRect(0, 0, 16, 16);

    const particleTexture = new THREE.CanvasTexture(pCanvas);
    const particleMat = new THREE.PointsMaterial({
      size: 0.12,
      map: particleTexture,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.65,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // =========================================================================
    // 7. RESPONSIVE MOUSE & SCROLL 3D PARALLAX INTERACTION
    // =========================================================================
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let scrollY = 0;

    const handleMouseMove = (e) => {
      const halfW = window.innerWidth / 2;
      const halfH = window.innerHeight / 2;
      targetX = (e.clientX - halfW) / halfW;
      targetY = (e.clientY - halfH) / halfH;
    };

    const handleScroll = () => {
      scrollY = window.scrollY || window.pageYOffset;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Click Core Raycaster
    const raycaster = new THREE.Raycaster();
    const mouseVector = new THREE.Vector2();

    const handleCanvasClick = (e) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouseVector.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseVector.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouseVector, camera);
      const intersects = raycaster.intersectObjects([innerMesh, outerMesh, ring1, ring2, ring3]);
      if (intersects.length > 0 && onCoreClick) {
        onCoreClick();
      }
    };
    renderer.domElement.addEventListener('click', handleCanvasClick);

    // =========================================================================
    // 8. 60 FPS ANIMATION LOOP WITH LIVING 3D CAMERA FLIGHT
    // =========================================================================
    let clock = new THREE.Clock();
    let animId;

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      const speedMult = isOverclocked ? 3.5 : 1.0;

      // Smooth mouse lerp
      currentX += (targetX - currentX) * 0.055;
      currentY += (targetY - currentY) * 0.055;

      // AUTONOMOUS LIVING DRONE HOVER SWAY
      const droneSwayX = Math.sin(elapsedTime * 0.5) * 1.6;
      const droneSwayY = Math.cos(elapsedTime * 0.4) * 1.1;

      // TRUE 3D CAMERA PARALLAX:
      // Moving mouse moves camera across 3D coordinates!
      const scrollFactor = Math.min(scrollY / 1000, 2.5);
      camera.position.x = currentX * 7.5 + droneSwayX;
      camera.position.y = -currentY * 5.0 + droneSwayY - scrollFactor * 3.0;
      camera.position.z = 18 - scrollFactor * 4.0;

      // Slight camera rotation / banking when looking around
      camera.rotation.y = -currentX * 0.16;
      camera.rotation.x = currentY * 0.12;

      // Background subtle floating wave
      backdropMesh.position.y = Math.sin(elapsedTime * 0.8) * 0.6;
      backdropMesh.position.x = Math.cos(elapsedTime * 0.6) * 0.5;

      // Drifting clouds motion
      clouds.forEach((c) => {
        c.mesh.position.x += c.speed * speedMult;
        c.mesh.position.y = c.baseY + Math.sin(elapsedTime * c.bobSpeed) * 0.4;
        if (c.mesh.position.x > 45) {
          c.mesh.position.x = -45;
        }
      });

      // Core rotation & hovering
      coreGroup.position.y = Math.sin(elapsedTime * 1.6) * 0.55;
      innerMesh.rotation.y += 0.009 * speedMult;
      innerMesh.rotation.x += 0.006 * speedMult;

      outerMesh.rotation.y -= 0.007 * speedMult;
      outerMesh.rotation.z += 0.005 * speedMult;

      ring1.rotation.z += 0.014 * speedMult;
      ring2.rotation.x += 0.016 * speedMult;
      ring3.rotation.y -= 0.015 * speedMult;

      // Shards orbit
      shards.forEach((s) => {
        s.angle += s.speed * speedMult;
        s.mesh.position.x = Math.cos(s.angle) * s.radius;
        s.mesh.position.z = Math.sin(s.angle) * s.radius;
        s.mesh.position.y = Math.sin(elapsedTime * 2.2 + s.radius) * 1.0;
        s.mesh.rotation.x += 0.02;
        s.mesh.rotation.y += 0.03;
      });

      // Cruising Starships motion
      ships.forEach((s) => {
        s.mesh.position.x += s.speed * speedMult;
        s.mesh.position.y = s.baseY + Math.sin(elapsedTime * s.bobSpeed + s.mesh.position.x * 0.1) * 0.4;
        if (s.mesh.position.x > s.resetX) {
          s.mesh.position.x = s.startX;
        }
      });

      // Formal, subtle stardust float (not rapid rising bubbles)
      const posAttr = particleGeo.attributes.position;
      for (let i = 0; i < particleCount; i++) {
        let y = posAttr.getY(i);
        y += 0.005 * speedMult;
        if (y > 20) y = -20;
        posAttr.setY(i, y);
      }
      posAttr.needsUpdate = true;
      particles.rotation.y = elapsedTime * 0.005 * speedMult;

      // Light pulsing
      if (isOverclocked) {
        const pulse = Math.sin(elapsedTime * 12) * 0.5 + 0.5;
        coreLight.intensity = 7 + pulse * 7;
        coreLight.color.setHex(pulse > 0.5 ? 0xff007f : 0x00f2fe);
      } else {
        coreLight.intensity = 4.0 + Math.sin(elapsedTime * 2.5) * 1.5;
        coreLight.color.setHex(0x00f2fe);
      }

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement) {
        renderer.domElement.removeEventListener('click', handleCanvasClick);
      }
      cancelAnimationFrame(animId);
      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      backdropGeo.dispose();
      backdropMat.dispose();
      backdropTexture.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, [isOverclocked, onCoreClick]);

  return (
    <div
      ref={mountRef}
      className={`hero-threejs-container ${isOverclocked ? 'overclock-active' : ''}`}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 2,
        pointerEvents: 'auto',
      }}
    />
  );
}
