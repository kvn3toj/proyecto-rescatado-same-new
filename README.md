# Proyecto Rescatado - Same New

Un proyecto web moderno construido con Next.js que presenta una plataforma de contenido educativo y servicios de desarrollo personal.

## 🚀 Características

- **Diseño Responsivo**: Interfaz moderna y adaptable a todos los dispositivos
- **Componentes Reutilizables**: Arquitectura modular con componentes React
- **Optimización de Performance**: Implementado con las mejores prácticas de Next.js
- **Testing Automatizado**: Suite de tests con Playwright
- **Estilo Moderno**: Diseño con Tailwind CSS y componentes personalizados

## 🛠️ Tecnologías Utilizadas

- **Framework**: [Next.js 15](https://nextjs.org/) con App Router
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)
- **Estilos**: [Tailwind CSS](https://tailwindcss.com/)
- **Animaciones**: [Framer Motion](https://www.framer.com/motion/)
- **Testing**: [Playwright](https://playwright.dev/)
- **Linting**: [Biome](https://biomejs.dev/)
- **Runtime**: [Bun](https://bun.sh/) (opcional)

## 📦 Instalación

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/kvn3toj/proyecto-rescatado-same-new.git
   cd proyecto-rescatado-same-new
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   # o
   bun install
   ```

3. **Ejecutar en modo desarrollo**:
   ```bash
   npm run dev
   # o
   bun dev
   ```

4. **Abrir en el navegador**:
   Visita [http://localhost:3000](http://localhost:3000)

## 🏗️ Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run start` - Inicia el servidor de producción
- `npm run lint` - Ejecuta el linter y verificación de tipos
- `npm run format` - Formatea el código
- `npm run test` - Ejecuta los tests con Playwright
- `npm run test:ui` - Ejecuta los tests con interfaz gráfica
- `npm run test:report` - Muestra el reporte de tests

## 📁 Estructura del Proyecto

```
proyecto-rescatado-same-new/
├── src/
│   ├── app/                 # App Router de Next.js
│   │   ├── amorir-2025/    # Página principal del programa
│   │   ├── conferencias/   # Página de conferencias
│   │   ├── escuela/        # Página de la escuela
│   │   ├── eventos/        # Página de eventos
│   │   └── ...
│   └── lib/                # Utilidades y configuraciones
├── components/             # Componentes React reutilizables
│   ├── home/              # Componentes específicos del home
│   ├── layout/            # Componentes de layout
│   ├── ui/                # Componentes de UI base
│   └── amorir/            # Componentes específicos de la sección
├── public/                # Archivos estáticos
│   └── images/           # Imágenes del proyecto
├── tests/                 # Tests automatizados
└── ...
```

## 🎨 Páginas Principales

- **Home** (`/`) - Página principal con hero, servicios y testimonios
- **Te Vas a Morir 2025** (`/amorir-2025`) - Programa principal
- **Conferencias** (`/conferencias`) - Eventos y charlas
- **Escuela** (`/escuela`) - Plataforma educativa
- **Eventos** (`/eventos`) - Calendario de eventos

## 🧪 Testing

El proyecto incluye tests automatizados con Playwright:

```bash
# Ejecutar todos los tests
npm run test

# Ejecutar tests con interfaz gráfica
npm run test:ui

# Ejecutar tests en modo debug
npm run test:debug
```

## 🚀 Despliegue

### Vercel (Recomendado)
1. Conecta tu repositorio con [Vercel](https://vercel.com)
2. El despliegue se realizará automáticamente

### GitHub Pages
El proyecto está configurado para despliegue automático en GitHub Pages mediante GitHub Actions.

### Manual
```bash
npm run build
npm run start
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**Kevin** - [@kvn3toj](https://github.com/kvn3toj)

## 🙏 Agradecimientos

- [Next.js](https://nextjs.org/) por el excelente framework
- [Tailwind CSS](https://tailwindcss.com/) por el sistema de estilos
- [Vercel](https://vercel.com/) por la plataforma de despliegue
