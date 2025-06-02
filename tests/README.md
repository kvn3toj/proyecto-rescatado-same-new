# Tests con Playwright

Este proyecto utiliza Playwright para realizar pruebas end-to-end de todas las secciones de la página web.

## 🚀 Instalación y Configuración

Los tests ya están configurados, pero si necesitas reinstalar:

```bash
npm install --save-dev @playwright/test
npx playwright install
```

## 🧪 Ejecución de Tests

### Comandos disponibles:

```bash
# Ejecutar todos los tests (headless)
npm run test

# Ejecutar tests con interfaz visual
npm run test:ui

# Ejecutar tests en modo headed (ver el navegador)
npm run test:headed

# Ejecutar tests en modo debug
npm run test:debug

# Ver reporte de tests anteriores
npm run test:report
```

### Ejecutar tests específicos:

```bash
# Solo tests de la homepage
npx playwright test homepage

# Solo tests de navegación
npx playwright test navigation

# Solo tests de componentes
npx playwright test components

# Ejecutar un test específico
npx playwright test homepage.spec.ts -g "Hero Section"
```

## 📋 Tests Implementados

### 1. `homepage.spec.ts` - Tests de la Página Principal
- ✅ Carga correcta de la página
- ✅ Hero Section completa
- ✅ Sección "Te Vas A Morir" con palabras rotativas
- ✅ Bio Section
- ✅ Services Section con los 3 servicios
- ✅ Testimonial Carousel
- ✅ Email Section con formulario
- ✅ Navegación y funcionalidad general
- ✅ Responsive design en mobile
- ✅ Interacciones y animaciones
- ✅ Carga de imágenes
- ✅ Performance básico

### 2. `navigation.spec.ts` - Tests de Navegación
- ✅ Navegación a todas las páginas secundarias
- ✅ Manejo correcto de páginas 404
- ✅ Enlaces desde homepage funcionan
- ✅ Formularios de contacto
- ✅ Scroll suave
- ✅ Responsividad en diferentes dispositivos
- ✅ Carga de recursos estáticos
- ✅ Accesibilidad básica
- ✅ Navegación por teclado

### 3. `components.spec.ts` - Tests de Componentes
- ✅ HeroSection - animaciones y interactividad
- ✅ TeVasAMorirSection - palabras rotativas
- ✅ ServicesSection - cards interactivas
- ✅ TestimonialCarousel - funcionalidad del carrusel
- ✅ EmailSection - validación del formulario
- ✅ Elementos de UI comunes
- ✅ Animaciones de Framer Motion
- ✅ Efectos de hover

## 🎯 Secciones Validadas

### Hero Section
- Título "AMORIR"
- Texto descriptivo de membresía
- Botón "ENTRARLE" que lleva a /sign-up
- Imagen de fondo de Diego Dreyfus
- Ícono de scroll animado
- Efecto parallax

### Te Vas A Morir Section
- Título animado "TE VAS A MORIR"
- Palabras rotativas: MORTAL, HUMANO, PASAJERO, TEMPORAL
- Nombre "Diego Dreyfus"
- Texto filosófico
- Botón "Quiero Inspirarme" con scroll a #productos

### Bio Section
- Título "ACERCA DE MÍ"
- Contenido biográfico
- Imagen personal

### Services Section
- Título "¿Cómo comparto lo que soy?"
- 3 servicios:
  - La Escuela de la Vida (/escuela)
  - Eventos presenciales (/eventos)
  - Conferencias (/conferencias)
- Botones "Más Información" en cada servicio

### Testimonial Carousel
- Título "TESTIMONIOS"
- Carrusel funcional
- Botones de navegación (siguiente/anterior)
- Contenido de testimonios

### Email Section
- Campo de email con validación
- Botón de suscripción
- Validación HTML5

## 🖥️ Configuración de Navegadores

Los tests se ejecutan en:
- ✅ Desktop Chrome
- ✅ Desktop Firefox
- ✅ Desktop Safari
- ✅ Mobile Chrome (Pixel 5)
- ✅ Mobile Safari (iPhone 12)

## ⚡ Performance y Optimización

Los tests incluyen verificaciones de:
- Tiempo de carga < 5 segundos
- Carga correcta de imágenes
- Responsividad en diferentes viewports
- Animaciones y efectos de hover
- Validación de formularios

## 🐛 Debugging

Para debuggear tests fallidos:

```bash
# Ejecutar en modo debug con pausa
npm run test:debug

# Ejecutar con headed para ver qué pasa
npm run test:headed

# Ver reporte HTML detallado
npm run test:report
```

## 📱 Testing en Mobile

Los tests automáticamente verifican la funcionalidad en:
- Mobile (375x667)
- Tablet (768x1024)  
- Desktop (1920x1080)

## 🔍 Accesibilidad

Los tests verifican elementos básicos de accesibilidad:
- Alt text en imágenes
- Elementos enfocables con teclado
- Roles y etiquetas apropiadas
- Navegación por tab

## 📊 Reportes

Después de ejecutar los tests, puedes ver reportes detallados:

```bash
npm run test:report
```

El reporte incluye:
- Screenshots de fallos
- Traces de navegación
- Tiempos de ejecución
- Videos de los tests (en CI) 