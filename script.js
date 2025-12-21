let iconBlobUrl = 'logo.png'; // Default: tu logo.png
let soundBlobUrl = 'sonido.mp3'; // Default: tu sonido.mp3
let contador = 1001; // Contador empieza en 1001

// Actualizar nombres de archivos y URLs cuando se selecciona
document.getElementById('icon-file').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        document.getElementById('icon-name').textContent = file.name;
        iconBlobUrl = URL.createObjectURL(file);
    } else {
        document.getElementById('icon-name').textContent = 'Usando default (logo.png)';
        iconBlobUrl = 'logo.png';
    }
});

document.getElementById('sound-file').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        document.getElementById('sound-name').textContent = file.name;
        soundBlobUrl = URL.createObjectURL(file);
    } else {
        document.getElementById('sound-name').textContent = 'Usando default (sonido.mp3)';
        soundBlobUrl = 'sonido.mp3';
    }
});

function activarNotifs() {
    if (Notification.permission !== "granted") {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                alert("¡Permiso concedido! Ahora puedes lanzar notificaciones.");
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

        // Reproducir sonido
        if (soundBlobUrl) {
            const audio = new Audio(soundBlobUrl);
            audio.play().catch(e => console.log("Error sonido:", e));
        }

        contador++; // Incrementa para la siguiente
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
            enviarNotificacion(); // Lanza una y auto-incrementa el contador
            i++;
        } else {
            clearInterval(interval);
        }
    }, 1200); // 1.2 seg entre cada una
}
