import * as THREE from 'three'
import { WEBGL } from './webgl'

if (WEBGL.isWebGLAvailable()) {
  // console.log(THREE);
  //장면
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0xeeeeee)
  //카메라
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  camera.position.z = 2

  // const canvas = document.querySelector('#c')
  //렌더러
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true, // 매끄럽게
  })
  renderer.setSize(window.innerWidth, window.innerHeight)

  document.body.appendChild(renderer.domElement)

  //빛
  const pointLight = new THREE.PointLight(0xffffff, 1)
  pointLight.position.set(0, 2, 12)
  scene.add(pointLight)

  //도형추가
  const geometry = new THREE.TorusGeometry(0.3, 0.15, 16, 40)
  //* MeshBasicMaterial은 빛에 영향 x
  const material01 = new THREE.MeshBasicMaterial({ color: 0xff7f00 })
  const obj1 = new THREE.Mesh(geometry, material01)
  obj1.position.x = -2

  const material02 = new THREE.MeshStandardMaterial({
    color: 0xff7f00,
    // metalness: 0.6,
    // roughness: 0.4,
    // wireframe: true,
    // transparent: true,
    // opacity: 0.5,
  })
  //   material01.wireframe = true;
  const obj2 = new THREE.Mesh(geometry, material02)
  obj2.position.x = -1

  const material03 = new THREE.MeshPhysicalMaterial({
    color: 0xff7f00,
    clearcoat: 1, //* 연한 투명막 -> 실제 머터리얼 위에 얇은 반사속성이 잇는 레이어를 시뮬레이션 하는 것,
    clearcoatRoughness: 0.1,
  })
  const obj3 = new THREE.Mesh(geometry, material03)
  obj3.position.x = 0

  //Lambert, Phong 빛에 관한
  const material04 = new THREE.MeshLambertMaterial({ color: 0xff7f00 })
  const obj4 = new THREE.Mesh(geometry, material04)
  obj4.position.x = 1

  const material05 = new THREE.MeshPhongMaterial({
    color: 0xff7f00,
    shininess: 120,
    //주변광
    // specular: 0x004fff,
  })
  const obj5 = new THREE.Mesh(geometry, material05)
  obj5.position.x = 2

  scene.add(obj1, obj2, obj3, obj4, obj5)

  //렌더 시작
  function render(time) {
    time *= 0.0001
    obj1.rotation.y += 0.01
    obj2.rotation.y += 0.01
    obj3.rotation.y += 0.01
    obj4.rotation.y += 0.01
    obj5.rotation.y += 0.01

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
