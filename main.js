import './style.css'

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

import * as THREE from 'three';

const scene = new THREE.Scene();  

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector("#bg"),
});

//Movement of camera
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight); 
camera.position.setZ(30);

renderer.render(scene,  camera);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({color: 0x549da0});
//Combine together
const torus = new THREE.Mesh(geometry, material);
//Add to the scene
scene.add(torus);

//Lighting 
const pointLight =  new THREE.PointLight(0xfffff);
pointLight.position.set(5,5,5);

const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(ambientLight);

//add to scene
scene.add(pointLight);

//Orbit controls
const controls = new OrbitControls(camera, renderer.domElement);

function addParticle(){
  const geometry = new THREE.SphereGeometry(.25, 30, 30);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff})
  const particle = new THREE.Mesh(geometry, material);

  //Map the particles randomly
  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  particle.position.set(x,y,z);
  scene.add(particle);
}

Array(200).fill().forEach(addParticle);

//Setting the background
const austinTexture = new THREE.TextureLoader().load('city-of-austin-skyline.jpg')

function animate(){
  requestAnimationFrame(animate);

  //Rotation of the shape
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;
  renderer.render(scene, camera);
  controls.update();
}
animate();