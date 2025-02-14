import * as THREE from 'three'
import { WEBGL } from './webgl'

if (WEBGL.isWebGLAvailable()) {
  // console.log(THREE);
  //장면
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x0004fff)
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

  //매쉬
  const geometry01 = new THREE.BoxGeometry(0.5, 0.5, 0.5)
  const material01 = new THREE.MeshStandardMaterial({ color: 0x999999 })

  const obj = new THREE.Mesh(geometry01, material01)
  obj.position.x = -1
  scene.add(obj)

  const geometry02 = new THREE.ConeGeometry(0.4, 0.7, 6)
  const material02 = new THREE.MeshStandardMaterial({ color: 0x999999 })

  const obj2 = new THREE.Mesh(geometry02, material02)
  scene.add(obj2)

  const geometry03 = new THREE.IcosahedronGeometry(0.4, 0)
  const material03 = new THREE.MeshStandardMaterial({ color: 0x999999 })

  const obj3 = new THREE.Mesh(geometry03, material03)
  obj3.position.x = 1
  scene.add(obj3)

  function render(time) {
    time *= 0.0005

    obj.rotation.y = time
    obj2.rotation.y = time
    obj3.rotation.y = time

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
