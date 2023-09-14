const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,10000);

const material = new THREE.MeshNormalMaterial({wireframe: true});
//Information about the planets
const info = ["The Sun is a yellow dwarf star, a hot ball of glowing gases at the heart of our solar system. Its gravity holds everything from the biggest planets to tiny debris in its orbit.","Mercury—the smallest planet in our solar system and closest to the Sun—is only slightly larger than Earth's Moon. Mercury is the fastest planet, zipping around the Sun every 88 Earth days.","Venus spins slowly in the opposite direction from most planets. A thick atmosphere traps heat in a runaway greenhouse effect, making it the hottest planet in our solar system.","Earth—our home planet—is the only place we know of so far that’s inhabited by living things. It's also the only planet in our solar system with liquid water on the surface.","Mars is a dusty, cold, desert world with a very thin atmosphere. There is strong evidence Mars was—billions of years ago—wetter and warmer, with a thicker atmosphere.","Jupiter is more than twice as massive than the other planets of our solar system combined. The giant planet's Great Red spot is a centuries-old storm bigger than Earth","Adorned with a dazzling, complex system of icy rings, Saturn is unique in our solar system. The other giant planets have rings, but none are as spectacular as Saturn's.","Uranus—seventh planet from the Sun—rotates at a nearly 90-degree angle from the plane of its orbit. This unique tilt makes Uranus appear to spin on its side.","Neptune—the eighth and most distant major planet orbiting our Sun—is dark, cold and whipped by supersonic winds. It was the first planet located through mathematical calculations, rather than by telescope."];
const loy = ["1  Sun  Year  is 230 Million Earth Years","1 Mercury Year is 88 Earth Days","1 Venus Year is 225 Earth Days","1 Earth Year is 365.25 Days","1 Mars Year is 1.88 Earth Years","1 Jupiter Year is 11.86 Earth Years","1 Saturn Year is 29.45 Earth Years","1 Uranus Year is 84 Earth Years","1 Neptune Year is 164.81 Earth Years"];
const ns = ["Sun: Latin Word for Sun:SOL","Mercury: Roman God of Speed","Venus: Roman Goddess of Love","Earth: Variation of Ground in Many Languages","Mars: Roman God of War","Jupiter: King of Roman Gods","Saturn: Father Of Jupiter","Uranus: Greek God of The Sky","Neptune: Roman God of the Sea"];
const dfs = ["","Distance From Sun: 0.4 AU","Distance From Sun: 0.7 AU","Distance From Sun: 1 AU","Distance From Sun: 1.5 AU","Distance From Sun: 5.2 AU","Distance From Sun: 9.5 AU","Distance From Sun: 19.8 AU","Distance From Sun: 30.1 AU"];
const mns = ["","0 Moons","0 Moons","1 Moon","2 Moons","79 Moons","62 Moons","27 Moons","14 Moons"];

let gui;
let slider;

//Loading Textures
const loader = new THREE.TextureLoader();
let sun_img = loader.load("assets/sun.jpeg");
let mercury_img = loader.load( 'assets/mercury.jpeg' );
let venus_img = loader.load( 'assets/venus.jpeg' );
let earth_img = loader.load( 'assets/earth.jpeg' );
let mars_img = loader.load( 'assets/mars.jpeg' );
let jupiter_img = loader.load( 'assets/jupiter.jpeg' );
let saturn_img = loader.load( 'assets/saturn.jpeg' );
let uranus_img = loader.load( 'assets/uranus.jpeg' );
let neptune_img = loader.load( 'assets/neptune.jpeg' );
let galaxy_img = loader.load( 'assets/galaxy.jpeg' );
let rings_img = loader.load( 'assets/rings.png' );
let target = 0;
//Creating Materials From Textures
const sun_mat = new THREE.MeshBasicMaterial({map: sun_img});
const mercury_mat = new THREE.MeshBasicMaterial({map: mercury_img});
const venus_mat = new THREE.MeshBasicMaterial({map: venus_img});
const earth_mat = new THREE.MeshBasicMaterial({map: earth_img});
const mars_mat = new THREE.MeshBasicMaterial({map: mars_img});
const jupiter_mat = new THREE.MeshBasicMaterial({map: jupiter_img});
const saturn_mat = new THREE.MeshBasicMaterial({map: saturn_img});
const uranus_mat = new THREE.MeshBasicMaterial({map: uranus_img});
const neptune_mat = new THREE.MeshBasicMaterial({map: neptune_img});
const galaxy_mat = new THREE.MeshBasicMaterial({map: galaxy_img});
const rings_mat = new THREE.MeshBasicMaterial({map: rings_img});

//Renderer Creation
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

//Scaling planets based on their size relative to earth
const radiusScaler = 3;
const radiusBase = 5;
function scaler(a){
  return (1+(a-1)/radiusScaler)*radiusBase;
}
let radii = [20,0.383,0.949,1,0.532,11.21,9.45,4.01,3.88,0];
let tilts = [0,0,177.36,23.45,25.19,3.13,26.73,97.77,28.32,0];
let geos = [];

//Adds geometries to array
for(let i = 0; i < 9; i++){
  geos.push(new THREE.SphereGeometry(scaler(radii[i]),70, 70));
}

//creates meshes
const geometry = new THREE.SphereGeometry(10,10, 10);
const geo_sky = new THREE.SphereGeometry(7000,10, 10);
const sun = new THREE.Mesh(geos[0],sun_mat);
const mercury = new THREE.Mesh(geos[1],mercury_mat);
const venus = new THREE.Mesh(geos[2],venus_mat);
const earth = new THREE.Mesh(geos[3],earth_mat);
const mars = new THREE.Mesh(geos[4],mars_mat);
const jupiter = new THREE.Mesh(geos[5],jupiter_mat);
const saturn = new THREE.Mesh(geos[6],saturn_mat);
const uranus = new THREE.Mesh(geos[7],uranus_mat);
const neptune = new THREE.Mesh(geos[8],neptune_mat);
const rings = new THREE.Mesh(new THREE.CircleGeometry(scaler(6)*3, 32 ),rings_mat);
const blank = new THREE.Mesh(geometry,sun_mat);
rings.material.side = THREE.DoubleSide;

//Adds and rotates saturn's rings
scene.add(rings);
rings.rotation.x = Math.PI/2;

//Distance between planets
const distance = 60;

//Creates Skybox
const galaxy = new THREE.Mesh(geo_sky,galaxy_mat);
galaxy.material.side = THREE.BackSide;
scene.add( galaxy );

//adds sun and planet meshes to an array
//adds Day and year on each planet planet relative to earth into an array
let bodies = [sun,mercury,venus,earth,mars,jupiter,saturn,uranus,neptune,blank];
let day = [24.5,58.6,-243,1,1.03,0.41,0.45,0.72,0.67,0];
let year = [1,0.24,0.615,1,1.88,11.86,29.46,84.01,164.79,0];
let randoms = [];
let speed = 0.02;
// const light = new THREE.AmbientLight( 0x707070 );
// scene.add( light );


//Function that converts degrees into radians
function toRadians(a){
  var pi = Math.PI;
  return a * (pi/180);
}

//Goes through each planet and gives them a random rotation around sun
//Gives correct tilt to each planet
for(let i = 0; i < bodies.length-1; i++){
  bodies[i].position.x += distance * i;
  bodies[i].rotation.x = toRadians(tilts[i]);
  randoms.push(Math.random()*1000000);
  scene.add(bodies[i]);
}
//Adds rotation to saturn's rings
rings.rotation.x += bodies[6].rotation.x;


//creates camera 400 units away from sun
let camDistance = 400;
let defaultCamera = {x:0,y:200,z:400};
let defaultCameraAngle = {x:-Math.tan(defaultCamera.y/defaultCamera.z)};
// let defaultCameraAngle = {x:-90};

camera.position.x = (defaultCamera.x);
camera.position.y = (defaultCamera.y);
camera.position.z = (defaultCamera.z);
camera.rotation.x = (defaultCameraAngle.x);

//creates orbit controls
let controls;
let damping = true;
controls = new THREE.OrbitControls(camera,renderer.domElement);
controls.maxDistance = 2000;
controls.enablePan = false;
controls.enableDamping = damping;
if(damping){
  controls.rotateSpeed = 0.01
  controls.dampingFactor = 0.02;
}

function setup() {
  // createCanvas(windowWidth, windowHeight*0.2);
  //renders camera
  const domEvents = new THREEx.DomEvents(camera,renderer.domElement);
  gui = createGui();
  slider = document.getElementById('slider');
  slider.max = 3;
  slider.value = 1;
  slider.step = 0.1
  //Adds click events for all of the celestial bodies
  for(let i = 0; i < bodies.length; i++){
    domEvents.addEventListener(bodies[i],"click", event => {
      target = i;
      displayInfo(i)
    });
  }
  domEvents.addEventListener(galaxy,"dblclick", event => {
    target = 0;
    document.getElementById("info").innerHTML = '';
    clear();
  });
}

//Displays information about each celestial body
let count = 0;
function displayInfo(i){
  let txt = info[i];
  txt += '<br>' + loy[i];
  txt += '<br>' + ns[i];
  txt += '<br>' + dfs[i];
  txt += '<br>' + mns[i];
  document.getElementById("info").innerHTML = txt;
  // clear();
  // fill(255);
  // textSize(20);
  // textWrap(WORD);
  // text(info[i],50,65,400);
  // textSize(17);
  // text(loy[i],475,height*0.3,300);
  // textSize(17);
  // text(ns[i],800,height*0.3,300);
  // textSize(17);
  // text(dfs[i],475,height*0.55,300);
  // textSize(17);
  // text(mns[i],800,height*0.55,300);
}

function draw() {
  //sets the correct rotation and position for each celestial body
  drawGui();
  for(let i = 0; i < bodies.length; i++){
    count += Number(slider.value);
    let num = (count+randoms[i])/(year[i]*1000);
    bodies[i].rotation.y += Number(slider.value) * speed/day[i];
    bodies[i].position.x = (i*distance) * sin(num);
    bodies[i].position.z = (i*distance) * cos(num);

  }
  controls.target = bodies[target].position;
  //sets correct position and rotation for saturn's rings
  rings.position.x = bodies[6].position.x;
  rings.position.z = bodies[6].position.z;
  rings.rotation.z += -speed/day[6];

  //updates camera based on orbit controls
  controls.update();
  renderer.render(scene, camera);
}

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}