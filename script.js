let iconBlobUrl = 'logo.png'; // Por defecto usa tu logo principal
let soundBlobUrl = 'sonido.mp3'; // Por defecto usa el sonido que ya tienes

// Mostrar nombre del archivo seleccionado (opcional, para que se vea bonito)
document.getElementById('icon-file').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        document.getElementById('icon-name').textContent = file.name;
        iconBlobUrl = URL.createObjectURL(file);
    } else {
        iconBlobUrl = 'logo.png'; // vuelve al default
    }
});

document.getElementById('sound-file').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        document.getElementById('sound-name').textContent = file.name;
        soundBlobUrl = URL.createObjectURL(file);
    } else {
        soundBlobUrl = 'sonido.mp3'; // vuelve al default
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

function crearNotificacion() {
    if (Notification.permission === "granted") {
        const message = document.getElementById('message').value || 'Notificación personalizada';

        new Notification("VisionProyect", {
            body: message,
            icon: iconBlobUrl
        });

        // Reproducir sonido
        if (soundBlobUrl) {
            const audio = new Audio(soundBlobUrl);
            audio.play().catch(e => console.log("Error sonido:", e));
        }
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
    const messageBase = document.getElementById('message').value || 'Spam de notificación';

    let i = 0;
    const interval = setInterval(() => {
        if (i < count) {
            new Notification("VisionProyect", {
                body: messageBase + ` (#${i + 1})`,
                icon: iconBlobUrl
            });

            if (soundBlobUrl) {
                const audio = new Audio(soundBlobUrl);
                audio.play().catch(e => {});
            }
            i++;
        } else {
            clearInterval(interval);
        }
    }, 1200); // 1.2 segundos entre cada notificación
}
