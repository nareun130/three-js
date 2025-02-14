import * as THREE from 'three'
import { WEBGL } from './webgl'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
if (WEBGL.isWebGLAvailable()) {
  // * SKY BOX -> 정육면체 주사위의 공간 안에 있다 생각
  //장면 추가
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0xeeeeee)
  const axesHelper = new THREE.AxesHelper(5) // 축을 잡아주는 도우미
  scene.add(axesHelper)
  //카메라 추가
  const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    1,
    4000
  )
  camera.position.set(0, 20, 100)
  camera.lookAt(new THREE.Vector3(0, 0, 0))

  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)

  //OrbitControls 추가 -> shift를 누르면 카메라 자체 이동이 가능
  const controls = new OrbitControls(camera, renderer.domElement)
  //* damping(감쇠) : 진동이나 물리량이 점차적으로 감소하는 현상
  controls.enableDamping = true
  controls.minDistance = 20
  controls.maxDistance = 800
  controls.update()

  const pathArray = [
    '../static/skybox/bay_ft.jpg',
    '../static/skybox/bay_bk.jpg',
    '../static/skybox/bay_up.jpg',
    '../static/skybox/bay_dn.jpg',
    '../static/skybox/bay_rt.jpg',
    '../static/skybox/bay_lf.jpg',
  ]
  const skyMaterialArray = []

  for (let i in pathArray) {
    console.log(pathArray[i])
    skyMaterialArray.push(
      new THREE.MeshStandardMaterial({
        map: new THREE.TextureLoader().load(pathArray[i]),
      })
    )
    skyMaterialArray[i].side = THREE.BackSide
  }

  //메쉬 추가 
  const skyGeometry = new THREE.BoxGeometry(2400, 2400, 2400)//control의 maxDistance보다 커야 공간내에서 이동 가ㅡㄴㅇ
  const skyMaterial = new THREE.MeshStandardMaterial({
    color: 0x333333,
    // map: texture,
  })
  //* 안쪽에 Material을 적용해준다는 의미
  skyMaterial.side = THREE.BackSide

  const sky = new THREE.Mesh(skyGeometry, skyMaterialArray)
  scene.add(sky)

  //빛
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
  scene.add(ambientLight)

  function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
  }

  animate()
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
