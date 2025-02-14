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

  //텍스처 추가
  const textureLoader = new THREE.TextureLoader()
  const textureBaseColor = textureLoader.load(
    '../static/img/stone_basecolor.jpg'
  )
  const textureNormalMap = textureLoader.load('../static/img/stone_normal.jpg')
  const textureHeightMap = textureLoader.load('../static/img/stone_height.png')
  const textureRoughnessMap = textureLoader.load(
    '../static/img/stone_roughness.jpg'
  )
  //도형추가

  const geometry = new THREE.SphereGeometry(0.3, 32, 16)
  // const geometry = new THREE.PlaneGeometry(1, 1)
  const material01 = new THREE.MeshStandardMaterial({
    map: textureBaseColor,
  })
  const obj1 = new THREE.Mesh(geometry, material01)
  obj1.position.x = -1.5
  scene.add(obj1)

  const material02 = new THREE.MeshStandardMaterial({
    map: textureBaseColor,
    //* 법선 매핑 - 빛의 왜곡을 이용 -> 더 적은 폴리곤으로 세세한 부분을 나타냄
    normalMap: textureNormalMap,
  })
  const obj2 = new THREE.Mesh(geometry, material02)
  obj2.position.x = -0.5
  scene.add(obj2)

  const material03 = new THREE.MeshStandardMaterial({
    map : textureBaseColor,
    normalMap : textureNormalMap,
    //* 메시 정점의 위치를 톤이 밝으면 높게, 톤이 어두우면 낮게
    displacementMap : textureHeightMap,
    displacementScale: 0.03//울룩불룩해짐
  })
  const obj3 = new THREE.Mesh(geometry, material03)
  obj3.position.x = 0.5
  scene.add(obj3)

  const material04 = new THREE.MeshStandardMaterial({
    map : textureBaseColor,
    normalMap : textureNormalMap,
    displacementMap : textureHeightMap,
    displacementScale: 0.03,
    roughnessMap : textureRoughnessMap,//* 굴곡에 따른 빛을 추가,
    roughness: 0.5
  })
  const obj4 = new THREE.Mesh(geometry, material04)
  obj4.position.x = 1.5
  scene.add(obj4)
  //렌더 시작
  function render(time) {
    time *= 0.0001

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
