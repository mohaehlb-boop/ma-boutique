let iconBlobUrl = 'logo.png'; // Default: tu logo
let soundBlobUrl = 'sonido.mp3'; // Default: tu sonido
let contador = 1001; // Empieza en 1001

// Vista previa del icono
const previewIcon = document.getElementById('preview-icon');

document.getElementById('icon-file').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        document.getElementById('icon-name').textContent = 'Seleccionado: ' + file.name;
        iconBlobUrl = URL.createObjectURL(file);
        previewIcon.src = iconBlobUrl; // Cambia la vista previa
    } else {
        document.getElementById('icon-name').textContent = 'Por defecto: logo.png';
        iconBlobUrl = 'logo.png';
        previewIcon.src = 'logo.png';
    }
});

document.getElementById('sound-file').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        document.getElementById('sound-name').innerHTML = 'Seleccionado: ' + file.name + ' <strong>✓</strong>';
        soundBlobUrl = URL.createObjectURL(file);
    } else {
        document.getElementById('sound-name').innerHTML = 'Por defecto: sonido.mp3 <strong>✓</strong>';
        soundBlobUrl = 'sonido.mp3';
    }
});

function activarNotifs() {
    if (Notification.permission !== "granted") {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                alert("¡Permiso concedido! Listo para enviar commandes.");
            }
        });
    } else {
        alert("Las notificaciones ya están activadas.");
    }
}

function enviarNotificacion() {
    if (Notification.permission === "granted") {
        const precio = document.getElementById('precio').value || '59,99 €';
        const cantidad = document.getElementById('cantidad').value || 1;
        const textoPunto = document.getElementById('texto-punto').value || 'VisionProyect';

        const titulo = `commande #${contador}`;
        const body = `${precio}, ${cantidad} article Online Store\n\n•${textoPunto}`;

        new Notification(titulo, {
            body: body,
            icon: iconBlobUrl
        });

        if (soundBlobUrl) {
            const audio = new Audio(soundBlobUrl);
            audio.play().catch(e => console.log("Error sonido:", e));
        }

        contador++;
    } else {
        alert("Primero activa las notificaciones.");
    }
}

function lanzarSpam() {
    if (Notification.permission !== "granted") {
        alert("Primero activa las notificaciones.");
        return;
    }

    const count = parseInt(document.getElementById('spam-count').value) || 1;

    let i = 0;
    const interval = setInterval(() => {
        if (i < count) {
            enviarNotificacion();
            i++;
        } else {
            clearInterval(interval);
        }
    }, 1200);
}
