let iconBlobUrl = 'logo.png';
let soundBlobUrl = 'sonido.mp3';
let contador = 1001;
let spamInterval = null; // Para poder parar el spam

const previewIcon = document.getElementById('preview-icon');

document.getElementById('icon-file').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        document.getElementById('icon-name').textContent = 'Seleccionado: ' + file.name;
        iconBlobUrl = URL.createObjectURL(file);
        previewIcon.src = iconBlobUrl;
    } else {
        document.getElementById('icon-name').textContent = 'Por defecto: logo.png';
        iconBlobUrl = 'logo.png';
        previewIcon.src = 'logo.png';
    }
});

document.getElementById('sound-file').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        document.getElementById('sound-name').innerHTML = 'Seleccionado: ' + file.name + ' ✓';
        soundBlobUrl = URL.createObjectURL(file);
    } else {
        document.getElementById('sound-name').innerHTML = 'Por defecto: sonido.mp3 ✓';
        soundBlobUrl = 'sonido.mp3';
    }
});

function activarNotifs() {
    if (Notification.permission !== "granted") {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                alert("¡Notificaciones activadas! Listo para la bomba.");
            }
        });
    } else {
        alert("Las notificaciones ya están activadas.");
    }
}

function enviarNotificacion() {
    if (Notification.permission === "granted") {
        const precio = document.getElementById('precio').value || '59,99 €';
        const cantidad = parseInt(document.getElementById('cantidad').value) || 1;
        const textoPunto = document.getElementById('texto-punto').value || 'vissionproyect';

        const articuloTexto = cantidad === 1 ? 'article' : 'articles';
        
        const titulo = `commande #${contador}`;
        const body = `${precio}, ${cantidad} ${articuloTexto} de Online Store\n•${textoPunto}`;

        new Notification(titulo, {
            body: body,
            icon: iconBlobUrl
        });

        if (soundBlobUrl) {
            const audio = new Audio(soundBlobUrl);
            audio.play().catch(e => console.log("Error sonido:", e));
        }

        contador++;
    }
}

function lanzarSpam() {
    if (Notification.permission !== "granted") {
        alert("Primero activa las notificaciones.");
        return;
    }

    // Si ya hay un spam corriendo, no lanzar otro
    if (spamInterval) {
        alert("Ya hay un spam en marcha. Usa 'Parar Spam' primero.");
        return;
    }

    const count = parseInt(document.getElementById('spam-count').value) || 1;

    let i = 0;
    spamInterval = setInterval(() => {
        if (i < count) {
            enviarNotificacion();
            i++;
        } else {
            clearInterval(spamInterval);
            spamInterval = null; // Reset para poder lanzar otro
        }
    }, 300); // ¡300ms = súper rápido! (antes era 1200)
}

function pararSpam() {
    if (spamInterval) {
        clearInterval(spamInterval);
        spamInterval = null;
        alert("Spam parado.");
    } else {
        alert("No hay spam activo.");
    }
}

// Registrar Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('SW registrado'))
            .catch(err => console.log('Error SW:', err));
    });
}
