# Lezat AI Backend

Backend para la aplicación Lezat AI.

## Requisitos Previos

- Node.js instalado en tu sistema.

## Instalación

1. Navega al directorio del backend:
   ```bash
   cd Lezat-AI-Backend
   ```

2. Instala las dependencias del proyecto:
   ```bash
   npm install
   ```

## Configuración

Crea un archivo llamado `.env` en la raíz de la carpeta `Lezat-AI-Backend` y configura las siguientes variables de entorno:

```env
PORT=3000
DEEPSEEK_API_KEY=tu_api_key_de_deepseek
```

> **Nota:** Necesitarás una API Key válida de DeepSeek para que las funcionalidades de IA funcionen correctamente.

## Ejecución

### Modo Desarrollo
Para ejecutar el servidor en modo desarrollo (utilizando nodemon para reinicio automático ante cambios):
```bash
npm run dev
```

### Modo Producción
Para iniciar el servidor en modo estándar:
```bash
npm start
```

Una vez iniciado, el servidor escuchará peticiones en `http://localhost:3000` (o el puerto especificado en tu archivo .env).
