import { GLTFLoader } from 'GLTFLoader.js';

// Récupérez l'URL du modèle 3D à partir des paramètres de l'URL
const urlParams = new URLSearchParams(window.location.search);
const modelURL = decodeURIComponent(urlParams.get('model'));

// Initialisez la scène, la caméra et le renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
renderer.setClearColor(0x000000, 0);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.xr.enabled = true;
document.body.appendChild(renderer.domElement);

// Ajoutez des lumières à la scène
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(0, 1, 1);
scene.add(directionalLight);

// Chargez et affichez le modèle 3D
const loader = new THREE.GLTFLoader();
loader.load(modelURL, (gltf) => {
    scene.add(gltf.scene);
    camera.position.z = 5;
});

// Fonction d'animation pour rendre la scène
function animate() {
    renderer.setAnimationLoop(render);
}

function render() {
    renderer.render(scene, camera);
}

animate();

// Ajustez la taille du renderer et la caméra en cas de redimensionnement de la fenêtre
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Ajoutez un bouton pour entrer en mode AR
if ("xr" in navigator) {
  navigator.xr.isSessionSupported("immersive-ar").then((supported) => {
    if (supported) {
      const button = document.createElement("button");
      button.style.position = "absolute";
      button.style.left = "calc(50% - 50px)";
      button.style.bottom = "20px";
      button.style.width = "100px";
      button.style.height = "40px";
      button.style.zIndex = 1;
      button.textContent = "Entrer en AR";
      button.addEventListener("click", onEnterAR);
      document.body.appendChild(button);
    }
  });
}

async function onEnterAR() {
  try {
    const session = await navigator.xr.requestSession("immersive-ar", {
      requiredFeatures: ["local-floor"],
    });
    renderer.xr.setSession(session);
    session.addEventListener("end", onExitAR);
  } catch (error) {
    console.error("Erreur lors de l'entrée en mode AR :", error);
  }
}

function onExitAR() {
  renderer.xr.setSession(null);
}
