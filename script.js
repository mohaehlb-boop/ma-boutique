let balance = 500;
let logElement = document.getElementById('log');
let balanceElement = document.getElementById('balance');
let unlocks = document.querySelectorAll('.unlock-item');

const incomes = [
    { text: "Venta dropshipping bonnet LV", amount: 350 },
    { text: "Comisión affiliate Instagram", amount: 120 },
    { text: "Cliente VIP pagó", amount: 450 },
    { text: "Crypto pump Bitcoin", amount: 2300 },
    { text: "Alquiler Airbnb París", amount: 800 },
    { text: "Venta Supreme box logo", amount: 600 },
    { text: "Pago PayPal cliente", amount: 280 }
];

const chaChing = new Audio('sonido.mp3'); // Usa tu sonido.mp3 existente

function formatMoney(amount) {
    return new Intl.NumberFormat('es-ES', { minimumFractionDigits: 2 }).format(amount) + ' €';
}

function addIncome() {
    const income = incomes[Math.floor(Math.random() * incomes.length)];
    balance += income.amount;
    
    // Animación saldo
    balanceElement.textContent = formatMoney(balance);
    balanceElement.style.transform = 'scale(1.2)';
    setTimeout(() => balanceElement.style.transform = 'scale(1)', 300);
    
    // Log
    const item = document.createElement('div');
    item.className = 'income-item';
    item.innerHTML = `<strong>+${formatMoney(income.amount)}</strong> — ${income.text}`;
    logElement.prepend(item);
    
    // Sonido
    chaChing.currentTime = 0;
    chaChing.play().catch(() => {});
    
    // Desbloqueos
    unlocks.forEach(u => {
        if (balance >= parseInt(u.dataset.price)) {
            u.classList.add('unlocked');
            u.innerHTML += '<br>🔓 Desbloqueado';
        }
    });
}

function resetDay() {
    balance = 500;
    balanceElement.textContent = formatMoney(balance);
    logElement.innerHTML = '';
    unlocks.forEach(u => {
        u.classList.remove('unlocked');
        u.innerHTML = u.textContent.split('<br>')[0];
    });
}

// Ingreso cada 3-8 segundos aleatorio
setInterval(addIncome, Math.random() * 5000 + 3000);

// Inicio
balanceElement.textContent = formatMoney(balance);
