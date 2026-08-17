import { useEffect } from 'react'
import * as THREE from 'three'

// Duas cenas Three.js leves, ligadas a um <canvas> de fundo:
// - "leaves": hero — folhas (agricultura) à esquerda, rede neuronal (IA) à
//   direita, ligadas por algumas linhas-ponte (o tema da página: agricultura + IA).
// - "net": tour — uma nuvem de nós ligados, mais simples, com rotação lenta.
// Ambas só renderizam quando a secção está visível (IntersectionObserver) e
// desligam-se por completo com prefers-reduced-motion.

function makeLeafTexture() {
  const c = document.createElement('canvas')
  c.width = 64
  c.height = 64
  const ctx = c.getContext('2d')
  ctx.fillStyle = '#3E8E2E'
  ctx.beginPath()
  ctx.moveTo(32, 4)
  ctx.bezierCurveTo(58, 20, 58, 44, 32, 60)
  ctx.bezierCurveTo(6, 44, 6, 20, 32, 4)
  ctx.fill()
  ctx.strokeStyle = 'rgba(10,30,20,.35)'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(32, 6)
  ctx.lineTo(32, 58)
  ctx.stroke()
  for (let i = 1; i < 5; i++) {
    const y = 10 + i * 9
    ctx.beginPath()
    ctx.moveTo(32, y)
    ctx.lineTo(22, y + 6)
    ctx.moveTo(32, y)
    ctx.lineTo(42, y + 6)
    ctx.stroke()
  }
  const tex = new THREE.CanvasTexture(c)
  tex.needsUpdate = true
  return tex
}

function lerpColor(hexA, hexB, t) {
  return new THREE.Color(hexA).lerp(new THREE.Color(hexB), t)
}

function buildLeavesScene(group) {
  const disposables = []
  const NN = 70
  const DIST = 8

  // Rede neuronal (lado "IA", direita)
  const nodes = []
  const nodeGeom = new THREE.BufferGeometry()
  const positions = new Float32Array(NN * 3)
  const colors = new Float32Array(NN * 3)
  for (let i = 0; i < NN; i++) {
    const x = 3 + Math.random() * 11
    const y = (Math.random() - 0.5) * 16
    const z = (Math.random() - 0.5) * 10
    positions.set([x, y, z], i * 3)
    nodes.push(new THREE.Vector3(x, y, z))
    const c = lerpColor('#F0A824', '#7CBE3C', (y + 8) / 16).lerp(new THREE.Color('#17726A'), 0.15)
    colors.set([c.r, c.g, c.b], i * 3)
  }
  nodeGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  nodeGeom.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  const nodeMat = new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending, depthWrite: false })
  const points = new THREE.Points(nodeGeom, nodeMat)
  group.add(points)
  disposables.push(() => { nodeGeom.dispose(); nodeMat.dispose() })

  const linePositions = []
  for (let i = 0; i < NN; i++) {
    for (let j = i + 1; j < NN; j++) {
      if (nodes[i].distanceTo(nodes[j]) < DIST) {
        linePositions.push(nodes[i].x, nodes[i].y, nodes[i].z, nodes[j].x, nodes[j].y, nodes[j].z)
      }
    }
  }
  const lineGeom = new THREE.BufferGeometry()
  lineGeom.setAttribute('position', new THREE.BufferAttribute(new Float32Array(linePositions), 3))
  const lineMat = new THREE.LineBasicMaterial({ color: '#3E8E2E', transparent: true, opacity: 0.18 })
  const lines = new THREE.LineSegments(lineGeom, lineMat)
  group.add(lines)
  disposables.push(() => { lineGeom.dispose(); lineMat.dispose() })

  // Folhas (lado "Agricultura", esquerda)
  const leafTex = makeLeafTexture()
  const leafGeom = new THREE.PlaneGeometry(1.6, 1.6)
  const leaves = []
  for (let i = 0; i < 24; i++) {
    const mat = new THREE.MeshBasicMaterial({ map: leafTex, transparent: true, opacity: 0.9, depthWrite: false, side: THREE.DoubleSide })
    const mesh = new THREE.Mesh(leafGeom, mat)
    mesh.position.set(-3 - Math.random() * 11, (Math.random() - 0.5) * 18, (Math.random() - 0.5) * 8)
    mesh.rotation.z = Math.random() * Math.PI
    mesh.userData = {
      speed: 0.004 + Math.random() * 0.006,
      sway: 0.4 + Math.random() * 0.6,
      swaySpeed: 0.3 + Math.random() * 0.5,
      rotSpeed: (Math.random() - 0.5) * 0.01,
      baseX: mesh.position.x,
      phase: Math.random() * Math.PI * 2,
    }
    group.add(mesh)
    leaves.push(mesh)
    disposables.push(() => mat.dispose())
  }
  disposables.push(() => { leafGeom.dispose(); leafTex.dispose() })

  // Pontes agricultura <-> IA
  const bridgePositions = []
  for (let i = 0; i < 12; i++) {
    const leaf = leaves[Math.floor(Math.random() * leaves.length)]
    const node = nodes[Math.floor(Math.random() * nodes.length)]
    bridgePositions.push(leaf.position.x, leaf.position.y, leaf.position.z, node.x, node.y, node.z)
  }
  const bridgeGeom = new THREE.BufferGeometry()
  bridgeGeom.setAttribute('position', new THREE.BufferAttribute(new Float32Array(bridgePositions), 3))
  const bridgeMat = new THREE.LineBasicMaterial({ color: '#F0A824', transparent: true, opacity: 0.12 })
  const bridge = new THREE.LineSegments(bridgeGeom, bridgeMat)
  group.add(bridge)
  disposables.push(() => { bridgeGeom.dispose(); bridgeMat.dispose() })

  function animate(t) {
    leaves.forEach((leaf) => {
      const u = leaf.userData
      leaf.position.y -= u.speed * 12
      leaf.position.x = u.baseX + Math.sin(t * 0.001 * u.swaySpeed + u.phase) * u.sway
      leaf.rotation.z += u.rotSpeed
      if (leaf.position.y < -10) leaf.position.y = 10
    })
    const pulse = (Math.sin(t * 0.0015) + 1) / 2
    nodeMat.opacity = 0.55 + pulse * 0.35
  }

  return { animate, dispose: () => disposables.forEach((fn) => fn()) }
}

function buildNetScene(group) {
  const disposables = []
  const N = 120
  const DIST = 6.2
  group.position.x = -3

  const nodes = []
  const positions = new Float32Array(N * 3)
  for (let i = 0; i < N; i++) {
    const x = (Math.random() - 0.5) * 20
    const y = (Math.random() - 0.5) * 14
    const z = (Math.random() - 0.5) * 12
    positions.set([x, y, z], i * 3)
    nodes.push(new THREE.Vector3(x, y, z))
  }
  const geom = new THREE.BufferGeometry()
  geom.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  const mat = new THREE.PointsMaterial({ color: '#8fe3c0', size: 0.16, transparent: true, opacity: 0.7, blending: THREE.AdditiveBlending, depthWrite: false })
  const points = new THREE.Points(geom, mat)
  group.add(points)
  disposables.push(() => { geom.dispose(); mat.dispose() })

  const linePositions = []
  for (let i = 0; i < N; i++) {
    for (let j = i + 1; j < N; j++) {
      if (nodes[i].distanceTo(nodes[j]) < DIST) {
        linePositions.push(nodes[i].x, nodes[i].y, nodes[i].z, nodes[j].x, nodes[j].y, nodes[j].z)
      }
    }
  }
  const lineGeom = new THREE.BufferGeometry()
  lineGeom.setAttribute('position', new THREE.BufferAttribute(new Float32Array(linePositions), 3))
  const lineMat = new THREE.LineBasicMaterial({ color: '#17726A', transparent: true, opacity: 0.22 })
  const lines = new THREE.LineSegments(lineGeom, lineMat)
  group.add(lines)
  disposables.push(() => { lineGeom.dispose(); lineMat.dispose() })

  function animate() {
    group.rotation.y += 0.00006 * 16
  }

  return { animate, dispose: () => disposables.forEach((fn) => fn()) }
}

export function useParticleScene(canvasRef, variant) {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const section = canvas.closest('section')
    const vis = { v: true }
    let io = null
    if (section) {
      io = new IntersectionObserver(([entry]) => { vis.v = entry.isIntersecting }, { threshold: 0.05 })
      io.observe(section)
    }

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100)
    camera.position.z = variant === 'leaves' ? 22 : 18
    const scene = new THREE.Scene()
    const group = new THREE.Group()
    scene.add(group)

    const built = variant === 'leaves' ? buildLeavesScene(group) : buildNetScene(group)

    let mx = 0
    let my = 0
    const onMouseMove = (e) => {
      mx = e.clientX / window.innerWidth - 0.5
      my = e.clientY / window.innerHeight - 0.5
    }
    window.addEventListener('mousemove', onMouseMove)

    function resize() {
      const parent = canvas.parentElement
      const w = parent?.clientWidth || window.innerWidth
      const h = parent?.clientHeight || window.innerHeight
      renderer.setSize(w, h, false)
      camera.aspect = w / (h || 1)
      camera.updateProjectionMatrix()
    }
    resize()
    window.addEventListener('resize', resize)

    let handle = null
    function frame(t) {
      if (vis.v) {
        group.rotation.y = mx * 0.25 * (variant === 'leaves' ? 1 : 0.4)
        group.rotation.x = -my * 0.15
        built.animate(t)
        renderer.render(scene, camera)
      }
      if (!reduce) handle = requestAnimationFrame(frame)
    }
    if (reduce) {
      renderer.render(scene, camera)
    } else {
      handle = requestAnimationFrame(frame)
    }

    return () => {
      if (handle) cancelAnimationFrame(handle)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', resize)
      if (io) io.disconnect()
      built.dispose()
      renderer.dispose()
    }
  }, [canvasRef, variant])
}
