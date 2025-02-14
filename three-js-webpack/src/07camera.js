import * as THREE from 'three'
import { WEBGL } from './webgl'

if (WEBGL.isWebGLAvailable()) {
  // console.log(THREE);
  //장면
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0xeeeeee)
  //카메라
  // 표준 렌즈 (50mm -일반 사람의 시야와 비슷 ) -> 화각 47도
  // 광각 렌즈(35mm이하 - 피사체가 더 멀리) -> 화각 84 ~ 63도
  // 망원 렌즈(85mm이상 - 피사체가 더 가깝게) -> 28 ~ 8도
  const fov = 120 //시야각, 화각  -> 인간은 대략 160도 정도

  //종횡비 = 가로세로 비율 -> three.js에서는 모니터의 뷰포트 기준으로
  const aspect = window.innerWidth / window.innerHeight

  //* near와 far 사이에 있어야. visible ->  보통 1,1000으로 설정
  const near = 0.1 //near보다 가까우면 hidden -> 이 값이 클 수록 앞부분이 카메라에 담기는 영역을 뒤로 미룬다.
  const far = 1000 //far보다 멀면 hidden
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
  //x : 좌우, y : 상하, z : 원근(여기서 +,-는 화면 내 오브젝트가 나를 바라보는 개념 내 앞 +, 내 뒤 -)
  camera.position.set(0, 1, 1.8)
  camera.lookAt(new THREE.Vector3(0, 0, 0)) //* 카메라가 0,0,0을 바라보게 한다.
  // const canvas = document.querySelector('#c')
  //렌더러
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true, // 매끄럽게
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)

  //도형추가
  // const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)
  const geometry = new THREE.SphereGeometry(0.5, 32, 16)
  const material = new THREE.MeshStandardMaterial({
    color: 0xfffffff,
  })

  const cube = new THREE.Mesh(geometry, material)
  cube.rotation.y = 0.5
  cube.position.y = 0.2
  // cube.position.x = 1.5
  scene.add(cube)

  //바닥 추가
  const planeGeometry = new THREE.PlaneGeometry(30, 30, 1, 1)
  const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xeeeeee })

  const plane = new THREE.Mesh(planeGeometry, planeMaterial)
  plane.rotation.x = -0.5 * Math.PI
  plane.position.y = -0.2
  scene.add(plane)

  //빛 추가
  //AmbientLight -> 모든 오브젝트를 대상으로 전역에서 비추는 빛 -> 그림자 개념 x
  const ambientLight = new THREE.AmbientLight(0xffa500, 0.1)
  //scene.add(ambientLight)

  //해 같은 느낌 - 특정 방향으로 빛을 쏜다.
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
  directionalLight.position.set(1, 1, 1) // 가운데 기점으로 1,1,1씩 빛이 이동

  const dlHelper = new THREE.DirectionalLightHelper(
    directionalLight,
    0.2,
    0x0000ff
  )
  // scene.add(dlHelper)
  // scene.add(directionalLight)

  //하늘색과 지상색 설정
  const hemisphereLight = new THREE.HemisphereLight(0x0000ff, 0xff0000, 0.3)
  // scene.add(hemisphereLight)

  //전구 같은 느낌
  const pointLight = new THREE.PointLight(0xffffff, 1)
  pointLight.position.set(-2, 0.5, 0.5)
  const plHelpher = new THREE.PointLightHelper(pointLight, 0.1)
  // scene.add(plHelpher)
  // scene.add(pointLight)

  const pointLight2 = new THREE.PointLight(0xffffff, 1)
  pointLight2.position.set(2, 2, 0.5)
  const plHelpher2 = new THREE.PointLightHelper(pointLight2, 0.1)
  // scene.add(plHelpher2)
  // scene.add(pointLight2)

  const rectLight = new THREE.RectAreaLight(0xffffff, 2, 1, 1)
  // scene.add(rectLight)
  rectLight.position.set(0.5, 0.5, 1)
  rectLight.lookAt(0, 0, 0)

  const spotLight = new THREE.SpotLight(0xffffff, 0.5)
  scene.add(spotLight)
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

    //! 카메라의 어떠한 파라미터라도 변경되면 이게 필요
    camera.updateProjectionMatrix()

    //렌더러의 사이즈 변경
    renderer.setSize(window.innerWidth, window.innerHeight)
  }
  window.addEventListener('resize', onWindowResize)
} else {
  var warning = WEBGL.getWebGLErrorMessage()
  document.body.appendChild(warning)
}
