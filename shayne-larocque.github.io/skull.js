//Scene, Camera, and Renderer
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(17, 1, 1, 1000);
camera.position.set(0, 0, 20);
var renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
});
//Appending

var canvas = renderer.domElement;
document.body.appendChild(canvas);

//Let there be light

var light = new THREE.DirectionalLight(0xf5e1a4, 1.6);
light.position.set(-200, 70, 90);
scene.add(light);
scene.add(new THREE.AmbientLight(0xffffff, 0.5));


//Model Loader

var loader = new THREE.GLTFLoader();

loader.load(
  "./3d/scene.gltf",
  function (gltf) {
    scene.add(gltf.scene);
  },
);

//Head tracking

var plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -10);
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var pointOfIntersection = new THREE.Vector3();
canvas.addEventListener("mousemove", onMouseMove, false);

function onMouseMove(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  raycaster.ray.intersectPlane(plane, pointOfIntersection);
  scene.lookAt(pointOfIntersection);
}

//Animation Loop

renderer.setAnimationLoop(() => {
  if (resize(renderer)) {
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }
  renderer.render(scene, camera);
});

function resize(renderer) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}
