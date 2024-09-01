import * as THREE from "three";

const ZOOM = 75

let scene, renderer, camera;

let theta = Math.PI / 2;
let supergroup;

init();
render();

function init() {
    const info = document.createElement( 'div' );
    info.style.position = 'absolute';
    info.style.top = '30px';
    info.style.width = '100%';
    info.style.textAlign = 'center';
    info.style.color = '#000000';
    info.style.fontWeight = 'bold';
    info.style.backgroundColor = 'transparent';
    info.style.zIndex = '1';
    info.style.fontFamily = 'Monospace';
    info.style.fontSize = "72px";
    info.innerHTML = "IDAS";
    document.body.appendChild( info );

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.set( 0, 0, ZOOM );
    camera.lookAt( 0, 0 ,0 );

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    const stain_geometry = new THREE.SphereGeometry( 10, 32, 32 );
    const stain_material = new THREE.MeshBasicMaterial({color: 0x000000, wireframe: false});
    const stain = new THREE.Mesh( stain_geometry, stain_material );
    stain.position.set(0, 0, 0 );

    const frame_length = 10;
    const frame_width = 2.5;

    const geometryA = new THREE.BoxGeometry( frame_length, frame_width);
    const geometryB = new THREE.BoxGeometry( frame_width, frame_length-frame_width );
    const matA = new THREE.MeshBasicMaterial( {color: 0x000000, wireframe: false} );
    const matB = new THREE.MeshBasicMaterial( {color: 0x000000, wireframe: false} );
    const meshA = new THREE.Mesh( geometryA, matA );
    const meshB = new THREE.Mesh( geometryB, matB );
    meshA.position.set(-frame_length/2 + frame_width/2, 0, 0);
    meshB.position.set(0, -frame_length/2, 0);

    const group = new THREE.Group();
    group.add( meshA );
    group.add( meshB );
    let group2 = group.clone()
    let group3 = group.clone()
    let group4 = group.clone()

    const dist = 20

    group.rotateZ(Math.PI/4);
    group.position.set( 0, dist, 0)

    group2.rotateZ(-Math.PI/4);
    group2.position.set( dist, 0, 0)

    group3.rotateZ(Math.PI/4 * 3);
    group3.position.set( -dist, 0, 0)

    group4.rotateZ(Math.PI/4 * 5);
    group4.position.set( 0, -dist, 0)

    supergroup = new THREE.Group();
    supergroup.add( group );
    supergroup.add( group2 );
    supergroup.add( group3 );
    supergroup.add( group4 );
    supergroup.add(stain);

    scene.add( supergroup );
}

function render() {

    requestAnimationFrame( render );

    theta = (theta + 0.01) % (Math.PI * 2);
    camera.position.x = Math.cos(theta) * ZOOM;
    camera.position.z = Math.sin(theta) * ZOOM;
    camera.lookAt( 0, 0, 0 );

    // supergroup.rotation.y += 0.01
    // supergroup.rotation.z += 0.005
    // supergroup.rotation.x += 0.0005

    renderer.render( scene, camera );
}