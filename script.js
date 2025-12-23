let iconBlobUrl = 'logo.png';
let soundBlobUrl = 'sonido.mp3';
let contador = 1001;

const previewIcon = document.getElementById('preview-icon');

// Partículas sutiles
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particles = [];
for (let i = 0; i < 50; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        speed: Math.random() * 1 + 0.5
    });
}
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.y += p.speed;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.3)';
        ctx.fill();
    });
    requestAnimationFrame(animateParticles);
}
animateParticles();
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Archivos
document.getElementById('icon-file').addEventListener('change', e => {
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

document.getElementById('sound-file').addEventListener('change', e => {
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
        Notification.requestPermission().then(p => {
            if (p === "granted") alert("¡Activadas!");
        });
    } else alert("Ya activadas.");
}

function enviarNotificacion() {
    if (Notification.permission === "granted") {
        const precio = document.getElementById('precio').value || '59,99 €';
        const cantidad = parseInt(document.getElementById('cantidad').value) || 1;
        const texto = document.getElementById('texto-punto').value || 'vissionproyect';
        const vibrate = document.getElementById('vibrate').checked;

        const articulo = cantidad === 1 ? 'article' : 'articles';
        const titulo = `commande #${contador}`;
        const body = `${precio}, ${cantidad} ${articulo} de Online Store\n•${texto}`;

        new Notification(titulo, {
            body: body,
            icon: iconBlobUrl,
            vibrate: vibrate ? [200, 100, 200] : []
        });

        if (soundBlobUrl) {
            new Audio(soundBlobUrl).play().catch(() => {});
        }
        contador++;
    }
}

function lanzarSpam() {
    if (Notification.permission !== "granted") return alert("Activa primero");
    const count = parseInt(document.getElementById('spam-count').value) || 1;
    const delay = parseInt(document.getElementById('delay').value) || 1200;

    let i = 0;
    const interval = setInterval(() => {
        if (i < count) {
            enviarNotificacion();
            i++;
        } else clearInterval(interval);
    }, delay);
}

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(() => {});
    });
}
