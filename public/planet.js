class Planet{
  constructor(name){
    this.name = name;
    const geometry = new THREE.SphereGeometry(10,10, 10, 10);
    const material = new THREE.MeshNormalMaterial({wireframe: true});
    const sphere = new THREE.Mesh(geometry,material);
    scene.add(sphere);
  }
}