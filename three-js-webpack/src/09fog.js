import * as THREE from 'three'
import { WEBGL } from './webgl'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
if (WEBGL.isWebGLAvailable()) {
  const fogColor = 0x004fff
  const objColor = 0xffffff
  const floorColor = 0x555555

  //장면 추가
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(fogColor)
  //안개
  //   scene.fog = new THREE.Fog(fogColor, 1, 8)// -> 일반적으로 위치 설정 때문에 더 많이 씀
  scene.fog = new THREE.FogExp2(fogColor, 0.2)
  const camera = new THREE.PerspectiveCamera(
    80,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  camera.position.set(0, 2, 3)
  camera.lookAt(new THREE.Vector3(0, 0, 0))

  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
  })

  renderer.setSize(window.innerWidth, window.innerHeight)
  // 그림자 맵 활성화
  document.body.appendChild(renderer.domElement)
  renderer.shadowMap.enabled = true

  //OrbitControls 추가 -> shift를 누르면 카메라 자체 이동이 가능
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.minDistance = 2
  controls.maxDistance = 4
  controls.maxPolarAngle = 2
  controls.maxPolarAngle = Math.PI / 2 // 1.6보다 이 방식을 추천
  controls.update()

  //도형 추가
  const geometry = new THREE.TorusGeometry(0.7, 0.3, 12, 80)
  // const geometry = new THREE.ConeGeometry(0.4,0.7,6)
  const material = new THREE.MeshStandardMaterial({ color: objColor })

  const obj = new THREE.Mesh(geometry, material)
  obj.position.y = 0.8
  obj.position.z = 0
  scene.add(obj)

  //바닥 추가
  const planeGeometry = new THREE.PlaneGeometry(30, 30, 1, 1)
  const planeMaterial = new THREE.MeshStandardMaterial({ color: floorColor })

  const plane = new THREE.Mesh(planeGeometry, planeMaterial)
  plane.rotation.x = -0.5 * Math.PI
  plane.position.y = -0.5
  scene.add(plane)

  //빛
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
  directionalLight.position.set(1, 1, 1)
  scene.add(directionalLight)

  function animate() {
    requestAnimationFrame(animate)
    obj.rotation.y += 0.01
    controls.update()

    renderer.render(scene, camera)
  }
  animate()
  requestAnimationFrame(render)
  //반응형 처리
  function onWindowResize() {
    //이게 없으면 도형이 찌그러져 반응함.
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }
  window.addEventListener('resize', onWindowResize)
} else {
  var warning = WEBGL.getWebGLErrorMessage()
  document.body.appendChild(warning)
}
