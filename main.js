import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';
import { VRButton } from 'three/addons/webxr/VRButton.js';


////////////////////////////////////////////////////////////////////////////////
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
const controls = new OrbitControls(camera, renderer.domElement);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
renderer.shadowMap.enabled = true; //ShadowMap
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.xr.enabled = true;
renderer.xr.setReferenceSpaceType('local');// default THREE.PCFShadowMap
document.body.appendChild(renderer.domElement);

document.body.appendChild(VRButton.createButton(renderer));

////////////////////////////////////////////////////////////////////////////////

///////////////////////////////// TEXTURAS ////////////////////////////////////
const textTablero = new THREE.TextureLoader().load('texturas/tablero.jpg');
const textTableroN = new THREE.TextureLoader().load('texturas/tableroN.png');
const textFichasB = new THREE.TextureLoader().load('texturas/FichasB.jpg');
const textFichasBN = new THREE.TextureLoader().load('texturas/FichasBN.jpg');

const a = new THREE.Vector2(1, 1);

/////////////////////////////// TABLERO ///////////////////////////////////////
const geometry = new THREE.BoxGeometry(100, 1, 100);
const material = new THREE.MeshPhongMaterial(
    {
        color: 0xffffff,
        map: textTablero,
        normalMap: textTableroN,
        normalScale: a,
        shininess: 50,
        specular: 0xffffff,
        opacity: 0.5,
    });
const tablero = new THREE.Mesh(geometry, material);
scene.add(tablero);

tablero.receiveShadow = true;
tablero.castShadow = false;

const geometrytablero1 = new THREE.BoxGeometry(110, 1, 110);
const materialtablero1 = new THREE.MeshPhongMaterial(
    {
        color: 0xE0E0E0,
        shininess: 60, //brillo (intensidad)
        specular: 0xffffff,
        transparent: true, //la transparenica
        opacity: 0.5, //que tan transparente es (va de 0 a 1)
    });
const tablero1 = new THREE.Mesh(geometrytablero1, materialtablero1);
scene.add(tablero1);
tablero1.position.set(0, -0.5, 0)

tablero1.receiveShadow = true;
tablero1.castShadow = false;

//////////////////////////////// FICHAS ////////////////////////////////
//MATERIAL FICHAS BLANCAS
const materialFB = new THREE.MeshPhysicalMaterial({
    color: 0x4F4F4F,
    transmission: 0.4, // Alta transmisión para efecto de vidrio
    opacity: 0.9,
    transparent: true,
    roughness: 0, // Cero para un acabado pulido
    metalness: 0, // Cero para vidrio
    reflectivity: 0.9, // Para reflejos más fuertes
    envMapIntensity: 1, // Intensidad del mapa de entorno si lo usas
});
//MATERIAL FICHAS NEGRAS
const materialFN = new THREE.MeshPhysicalMaterial({
    color: 0xDCDCDC,
    transmission: 0.4, // Alta transmisión para efecto de vidrio
    opacity: 0.9,
    transparent: true,
    roughness: 0, // Cero para un acabado pulido
    metalness: 0, // Cero para vidrio
    reflectivity: 0.9, // Para reflejos más fuertes
    envMapIntensity: 1, // Intensidad del mapa de entorno si lo usas
});

//PEON

peon(new THREE.Vector3(6.5, 0, 30.5), materialFB, scene);
peon(new THREE.Vector3(19, 0, 30.5), materialFB, scene);
peon(new THREE.Vector3(31.5, 0, 30.5), materialFB, scene);
peon(new THREE.Vector3(44, 0, 30.5), materialFB, scene);
peon(new THREE.Vector3(-6, 0, 30.5), materialFB, scene);
peon(new THREE.Vector3(-18.5, 0, 30.5), materialFB, scene);
peon(new THREE.Vector3(-31, 0, 30.5), materialFB, scene);
peon(new THREE.Vector3(-43.5, 0, 30.5), materialFB, scene);

peon(new THREE.Vector3(6.5, 0, -30.5), materialFN, scene); //cambiar material
peon(new THREE.Vector3(19, 0, -30.5), materialFN, scene);
peon(new THREE.Vector3(31.5, 0, -30.5), materialFN, scene);
peon(new THREE.Vector3(44, 0, -30.5), materialFN, scene);
peon(new THREE.Vector3(-6, 0, -30.5), materialFN, scene);
peon(new THREE.Vector3(-18.5, 0, -30.5), materialFN, scene);
peon(new THREE.Vector3(-31, 0, -30.5), materialFN, scene);
peon(new THREE.Vector3(-43.5, 0, -30.5), materialFN, scene);


function peon(position, material, scene) {
    const scaleFactor = 0.4; // Factor de escala para reducir la altura a la mitad
    const points = [];


    points.push(new THREE.Vector2(0, 0));
    points.push(new THREE.Vector2(4, 0));
    points.push(new THREE.Vector2(4, 1));
    points.push(new THREE.Vector2(3.5, 1));
    points.push(new THREE.Vector2(3.5, 2));
    points.push(new THREE.Vector2(2, 3));
    points.push(new THREE.Vector2(2, 4));
    points.push(new THREE.Vector2(1.5, 5));
    points.push(new THREE.Vector2(1.5, 8.5));
    points.push(new THREE.Vector2(3, 9));
    points.push(new THREE.Vector2(2, 10.5));
    points.push(new THREE.Vector2(1.5, 10.5));
    points.push(new THREE.Vector2(2.5, 12));
    points.push(new THREE.Vector2(2, 14));
    points.push(new THREE.Vector2(1.5, 14.5));
    points.push(new THREE.Vector2(0.5, 15));
    points.push(new THREE.Vector2(0, 15));

    // Crear la geometría del peón usando LatheGeometry
    const geometryP = new THREE.LatheGeometry(points, 32);
    const PEON = new THREE.Mesh(geometryP, material);
    PEON.receiveShadow = true;
    PEON.castShadow = true;

    // Ajustes de rotación y posición
    PEON.position.set(position.x, position.y, position.z);

    // Añadir el peón a la escena
    scene.add(PEON);

    return PEON;
}

/////////// FBX LOADER //////////////
var loader = new FBXLoader();

//REINA
crearReina(6.5, 0, 44.3, materialFB)
crearReina(6.5, 0, -44.3, materialFN)
function crearReina(x, y, z, material) {
    loader.load('Figuras/Reina.fbx', function (reina) {
        if (reina) {

            reina.traverse(function (child) {

                if (child.isMesh) {
                    child.material = material;
                    child.receiveShadow = false;
                    child.castShadow = true;
                }
            })
        }

        reina.scale.multiplyScalar(0.05);
        reina.position.set(x, y, z)
        scene.add(reina);
    }
    )
}

//REY
crearRey(-19, 0, 44.3, materialFB)
crearRey(-19, 0, -44.3, materialFN)
function crearRey(x, y, z, material) {
    loader.load('Figuras/Rey.fbx', function (rey) {
        if (rey) {

            rey.traverse(function (child) {

                if (child.isMesh) {
                    child.material = material;
                    child.receiveShadow = false;
                    child.castShadow = true;
                }
            })
        }

        rey.scale.multiplyScalar(0.05);
        rey.position.set(x, y, z)
        scene.add(rey);
    }
    )
}

//ALFIL
crearAlfil(-43, 0, 44.3, materialFB);
crearAlfil(-5.5, 0, 44.3, materialFB);
crearAlfil(-43, 0, -44.3, materialFN);
crearAlfil(-5.5, 0, -44.3, materialFN);
function crearAlfil(x, y, z, material) {

    loader.load('Figuras/alfil.fbx', function (alfil) {
        if (alfil) {

            alfil.traverse(function (child) {

                if (child.isMesh) {
                    child.material = material;
                    child.receiveShadow = false;
                    child.castShadow = true;
                }
            })
        }

        alfil.scale.multiplyScalar(0.05);
        alfil.position.set(x, y, z);
        scene.add(alfil);
    }
    )
}

//CABALLO
crearCaballo(31, 0, -3, -Math.PI / 2, materialFB);
crearCaballo(-31, 0, -3, -Math.PI / 2, materialFB);
crearCaballo(31, 0, 3, Math.PI / 2, materialFN);
crearCaballo(-31, 0, 3, Math.PI / 2, materialFN);
function crearCaballo(x, y, z, i, material) {

    loader.load('Figuras/Caballo.fbx', function (caballo) {
        if (caballo) {

            caballo.traverse(function (child) {

                if (child.isMesh) {
                    child.material = material;
                    child.receiveShadow = false;
                    child.castShadow = true;
                }
            })
        }

        caballo.scale.multiplyScalar(0.05);
        caballo.position.set(x, y, z)
        caballo.rotation.set(0, i, 0)
        scene.add(caballo);
    }
    )
}

//TORRE
crearTorre(9, 0, 45, materialFB);
crearTorre(-80, 0, 45, materialFB);
crearTorre(-80, 0, -45, materialFN);
crearTorre(9, 0, -45, materialFN);
function crearTorre(x, y, z, material) {

    loader.load('Figuras/Torre.fbx', function (torre) {
        if (torre) {

            torre.traverse(function (child) {

                if (child.isMesh) {
                    child.material = material;
                    child.receiveShadow = false;
                    child.castShadow = true;
                }
            })
        }

        torre.scale.multiplyScalar(0.05);
        torre.position.set(x, y, z)

        scene.add(torre);
    }
    )
}


/////////////////////////////// LUCES ////////////////////////////////////////////
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.1);
directionalLight.position.set(50, 100, 50);
directionalLight.castShadow = true;
scene.add(directionalLight);

const fillLight = new THREE.DirectionalLight(0xffffff, 0.5);
fillLight.position.set(-50, 50, -50);
fillLight.castShadow = false;
scene.add(fillLight);

const backLight = new THREE.PointLight(0xffffff, 0.7, 150);
backLight.position.set(0, 50, -100);
backLight.castShadow = true;
scene.add(backLight);

const pointLight = new THREE.PointLight(0xffffff, 0.3, 100);
pointLight.position.set(30, 50, 30);
pointLight.castShadow = true;
scene.add(pointLight);

const colorLight = new THREE.PointLight(0xff9999, 0.2, 100);
colorLight.position.set(0, 30, 50);
scene.add(colorLight);

camera.position.z = 100;
camera.position.y = 10;

function animate() {
    renderer.render(scene, camera);
}