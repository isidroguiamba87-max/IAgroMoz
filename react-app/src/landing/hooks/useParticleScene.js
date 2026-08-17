import { useEffect } from 'react'
import * as THREE from 'three'

// Cena Three.js leve, ligada a um <canvas> de fundo do tour: uma nuvem de nós
// ligados, com rotação lenta. Só renderiza quando a secção está visível
// (IntersectionObserver) e desliga-se por completo com prefers-reduced-motion.
// (O hero já não usa nenhuma cena de partículas — tem o slideshow de fotos.)

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

export function useParticleScene(canvasRef) {
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
    camera.position.z = 18
    const scene = new THREE.Scene()
    const group = new THREE.Group()
    scene.add(group)

    const built = buildNetScene(group)

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
        group.rotation.y = mx * 0.25 * 0.4
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
  }, [canvasRef])
}
