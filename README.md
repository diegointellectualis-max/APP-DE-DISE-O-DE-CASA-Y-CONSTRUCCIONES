# ArchPlan Pro - Sistema de Digitalización Arquitectónica

ArchPlan Pro es una aplicación web premium diseñada para arquitectos e interioristas que permite la visualización y edición de planos en 2D y 3D con una experiencia de usuario sofisticada y moderna.

## ✨ Características

- **Visualización 2D Técnica:** Plano detallado con rejilla milimétrica y representación arquitectónica de muros.
- **Renderizado 3D Interactivo:** Modelo tridimensional con iluminación de estudio y sombras de contacto suaves.
- **Editor de Ambientes:** Gestión de superficies, tipologías y materiales (madera, mármol, hormigón).
- **Librería de Mobiliario:** Inserción y edición de objetos con transformaciones en tiempo real.
- **Métricas en Tiempo Real:** Cálculo automático de áreas y gestión de inventario de objetos.
- **Diseño Premium:** Interfaz oscura (Elegant Dark) optimizada para el rendimiento y la estética profesional.

## 🚀 Tecnologías

- **React 19** + **TypeScript**
- **Vite** (Build tool)
- **Tailwind CSS 4** (Styling)
- **Three.js** / **@react-three/fiber** / **@react-three/drei** (3D Engine)
- **Motion** (Animaciones)
- **Lucide React** (Iconografía)

## 🛠️ Instalación y Desarrollo

1. **Clonar el repositorio:**
   ```bash
   git clone <url-del-repositorio>
   cd archplan-pro
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Iniciar servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   La aplicación estará disponible en `http://localhost:3000`.

## 📦 Despliegue en Vercel

Este proyecto está configurado para desplegarse de manera sencilla en Vercel.

1. Conecta tu repositorio de GitHub a Vercel.
2. Vercel detectará automáticamente la configuración de Vite.
3. Asegúrate de que los comandos de build sean:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. El archivo `vercel.json` incluido maneja automáticamente el routing de la SPA.

## 📂 Estructura del Proyecto

- `/src/components`: Componentes modulares de la UI.
- `/src/three`: Componentes y lógica de renderizado 3D.
- `/src/types`: Definiciones de tipos TypeScript.
- `/src/data`: Datos iniciales y presets de mobiliario.
- `/src/utils`: Utilidades de geometría y cálculos.
- `index.css`: Estilos globales y configuración de temas.

---
Desarrollado para profesionales del diseño arquitectónico.
