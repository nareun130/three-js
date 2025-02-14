import * as THREE from 'three'
import { WEBGL } from './webgl'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
if (WEBGL.isWebGLAvailable()) {
  console.log(OrbitControls)
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0xeeeeee)

  const camera = new THREE.PerspectiveCamera(
    120,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  camera.position.set(0, 2, 1.8)
  camera.lookAt(new THREE.Vector3(0, 0, 0))

  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
  })

  renderer.setSize(window.innerWidth, window.innerHeight)
  // 그림자 맵 활성화
  document.body.appendChild(renderer.domElement)
  renderer.shadowMap.enabled = true

  //OrbitControls 추가

  //도형 추가
  // const geometry = new THREE.SphereGeometry(0.5, 32, 16)
  const geometry = new THREE.IcosahedronGeometry(0.5, 0)
  // const geometry = new THREE.ConeGeometry(0.4,0.7,6)
  const material = new THREE.MeshStandardMaterial({ color: 0x004ff })
  const cube = new THREE.Mesh(geometry, material)
  cube.rotation.y = 0.5
  cube.position.y = 0.5
  // 구체에 그림자 생성 설정
  cube.castShadow = true
  cube.receiveShadow = true // * 앞에 물체가 있을 때 물체의 그림자도 받겠다.

  scene.add(cube)

  const geometry2 = new THREE.IcosahedronGeometry(0.5, 0)
  const material2 = new THREE.MeshStandardMaterial({ color: 0xff00000 })
  const cube2 = new THREE.Mesh(geometry2, material2)
  cube2.position.set(-0.8, 1.2, 0.5)

  scene.add(cube2)
  cube2.castShadow = true

  //바닥 추가
  const planeGeometry = new THREE.PlaneGeometry(20, 20, 1, 1)
  const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff })

  const plane = new THREE.Mesh(planeGeometry, planeMaterial)
  plane.rotation.x = -0.5 * Math.PI
  plane.position.y = -0.2
  scene.add(plane)
  // 바닥에 그림자 생성 설정
  plane.receiveShadow = true

  //빛
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
  scene.add(ambientLight)
  //   ambientLight.castShadow = true // 그림자 x

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
  directionalLight.position.set(-1.5, 2, 1)
  const dlHelper = new THREE.DirectionalLightHelper(
    directionalLight,
    0.2,
    0x0000ff
  )
  scene.add(dlHelper)
  scene.add(directionalLight)
  directionalLight.castShadow = true // 그림자 O

  directionalLight.shadow.mapSize.width = 2048 // 값이 높을 수록 그림자 선명도 커짐
  directionalLight.shadow.mapSize.height = 2048
  directionalLight.shadow.radius = 8 // 그림자의 선명도를 희미하게

  const pointLight = new THREE.PointLight(0xffffff, 0.5)
  pointLight.position.set(1, 1, 0.5)
  // scene.add(pointLight)
  // const plHelpher = new THREE.PointLightHelper(pointLight, 0.1)
  // scene.add(plHelpher)
  // pointLight.castShadow = true // 그림자 O

  const rectLight = new THREE.RectAreaLight(0xffffff, 2, 1, 1)
  rectLight.position.set(1, 0.5, 0.5)
  rectLight.lookAt(0, 0, 0)
  // scene.add(rectLight)
  // rectLight.castShadow=true // 그림자 X

  const spotLight = new THREE.SpotLight(0xffffff, 0.5)
  spotLight.position.set(1, 2, 1)
  // scene.add(spotLight)
  // spotLight.castShadow = true // 그림자 O

  function render(time) {
    renderer.render(scene, camera)

    requestAnimationFrame(render)
  }

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
