<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>VisionProyect</title>
    <link rel="manifest" href="manifest.json">
    <link rel="apple-touch-icon" href="logo.png">
    <style>
        :root {
            --bg-gradient: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
            --card-bg: rgba(15, 23, 42, 0.6);
            --accent: #10b981; /* Verde Shopify */
            --accent-hover: #059669;
            --danger: #ef4444;
            --danger-hover: #dc2626;
            --text-primary: #f1f5f9;
            --text-secondary: #cbd5e1;
            --border: rgba(255, 255, 255, 0.1);
        }

        body {
            font-family: 'Inter', 'Segoe UI', sans-serif;
            background: var(--bg-gradient);
            color: var(--text-primary);
            margin: 0;
            padding: 0;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            backdrop-filter: blur(10px);
        }

        header {
            width: 100%;
            padding: 30px 20px 20px;
            text-align: center;
        }

        .header-content {
            display: inline-flex;
            align-items: center;
            gap: 16px;
        }

        #logo {
            height: 90px;
            border-radius: 50%;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
            border: 3px solid var(--accent);
        }

        .site-title {
            font-size: 2.4em;
            font-weight: 700;
            background: linear-gradient(90deg, #10b981, #34d399);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin: 0;
        }

        main {
            flex-grow: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            padding: 20px;
        }

        .container {
            background: var(--card-bg);
            backdrop-filter: blur(16px);
            border-radius: 24px;
            padding: 40px;
            width: 100%;
            max-width: 640px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6);
            border: 1px solid var(--border);
        }

        h2 {
            text-align: center;
            font-size: 1.6em;
            margin-bottom: 30px;
            color: var(--text-secondary);
        }

        .form-group {
            margin-bottom: 24px;
        }

        label {
            display: block;
            margin-bottom: 10px;
            font-weight: 500;
            color: var(--text-secondary);
            font-size: 1.05em;
        }

        .input-wrapper {
            position: relative;
        }

        input[type="text"], input[type="number"] {
            width: 100%;
            padding: 14px 16px;
            border-radius: 12px;
            border: 1px solid var(--border);
            background: rgba(30, 41, 59, 0.6);
            color: white;
            font-size: 1.1em;
            transition: all 0.3s;
        }

        input:focus {
            outline: none;
            border-color: var(--accent);
            box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2);
        }

        .preview-icon-wrapper {
            text-align: center;
            margin: 16px 0;
        }

        #preview-icon {
            height: 100px;
            width: 100px;
            border-radius: 24px;
            object-fit: cover;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
            border: 3px solid var(--accent);
        }

        .file-input-wrapper {
            position: relative;
            display: block;
        }

        .file-input-label {
            display: block;
            padding: 14px;
            background: rgba(30, 41, 59, 0.6);
            border: 1px dashed var(--border);
            border-radius: 12px;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s;
        }

        .file-input-label:hover {
            border-color: var(--accent);
            background: rgba(16, 185, 129, 0.1);
        }

        .file-name {
            margin-top: 8px;
            font-size: 0.95em;
            color: var(--text-secondary);
            text-align: center;
        }

        .buttons {
            margin-top: 40px;
            display: flex;
            gap: 20px;
            justify-content: center;
            flex-wrap: wrap;
        }

        button {
            padding: 16px 36px;
            font-size: 1.2em;
            font-weight: 600;
            border: none;
            border-radius: 16px;
            color: white;
            cursor: pointer;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
            transition: all 0.3s;
        }

        button:nth-child(1), button:nth-child(2) {
            background: var(--accent);
        }

        button:nth-child(1):hover, button:nth-child(2):hover {
            background: var(--accent-hover);
            transform: translateY(-4px);
            box-shadow: 0 12px 35px rgba(16, 185, 129, 0.4);
        }

        button:nth-child(3) {
            background: var(--danger);
        }

        button:nth-child(3):hover {
            background: var(--danger-hover);
            transform: translateY(-4px);
            box-shadow: 0 12px 35px rgba(239, 68, 68, 0.4);
        }

        .spam-info {
            text-align: center;
            margin-top: 20px;
            font-size: 0.9em;
            color: var(--text-secondary);
        }
    </style>
</head>
<body>
    <header>
        <div class="header-content">
            <img src="logo.png" alt="Logo" id="logo">
            <h1 class="site-title">VisionProyect</h1>
        </div>
    </header>

    <main>
        <div class="container">
            <h2>Generador de notificaciones premium</h2>

            <form id="notif-form">
                <div class="form-group">
                    <label>Icono de notificación</label>
                    <div class="preview-icon-wrapper">
                        <img id="preview-icon" src="logo.png" alt="Vista previa">
                    </div>
                    <div class="file-input-wrapper">
                        <label class="file-input-label" for="icon-file">
                            Seleccionar nueva imagen
                        </label>
                        <input type="file" id="icon-file" accept="image/*" style="display: none;">
                    </div>
                    <div class="file-name" id="icon-name">Por defecto: logo.png</div>
                </div>

                <div class="form-group">
                    <label>Sonido de notificación</label>
                    <div class="file-input-wrapper">
                        <label class="file-input-label" for="sound-file">
                            Seleccionar nuevo sonido
                        </label>
                        <input type="file" id="sound-file" accept="audio/*" style="display: none;">
                    </div>
                    <div class="file-name" id="sound-name">Por defecto: sonido.mp3 ✓</div>
                </div>

                <div class="form-group">
                    <label>Precio</label>
                    <input type="text" id="precio" value="59,99 €" placeholder="Ej: 129,99 €">
                </div>

                <div class="form-group">
                    <label>Cantidad de artículos</label>
                    <input type="number" id="cantidad" min="1" value="1">
                </div>

                <div class="form-group">
                    <label>Texto final (después del punto)</label>
                    <input type="text" id="texto-punto" value="vissionproyect" placeholder="Ej: vissionproyect">
                </div>

                <div class="form-group">
                    <label>Cantidad de notificaciones spam</label>
                    <input type="number" id="spam-count" min="1" value="10" placeholder="Sin límite">
                </div>

                <div class="buttons">
                    <button type="button" onclick="activarNotifs()">Activar Notificaciones</button>
                    <button type="button" onclick="lanzarSpam()">Lanzar Spam</button>
                    <button type="button" onclick="pararSpam()">Parar Spam</button>
                </div>

                <div class="spam-info">
                    Consejo: Con 300ms de intervalo, ¡la bomba es rapidísima! 💥 Usa "Parar Spam" si necesitas detenerla.
                </div>
            </form>
        </div>
    </main>

    <script src="script.js"></script>
</body>
</html>
