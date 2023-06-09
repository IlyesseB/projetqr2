// L'URL de votre modèle 3D hébergé
const modelURL = 'https://exemple.com/models/mon-model.gltf';

// L'URL de votre site Web qui affiche le modèle 3D
const viewerURL = 'https://exemple.com/3d-viewer/afficheur-3d.html';

// Créez un objet QRCode avec l'élément HTML pour afficher le code QR
const qrcode = new QRCode(document.getElementById('qrcode'), {
    text: `${viewerURL}?model=${encodeURIComponent(modelURL)}`,
    width: 256,
    height: 256,
    colorDark: '#000000',
    colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.H
});
