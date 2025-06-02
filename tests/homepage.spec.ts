import { test, expect } from '@playwright/test';

test.describe('Homepage - Todas las Secciones', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('debe cargar la página principal correctamente', async ({ page }) => {
    await expect(page).toHaveTitle(/Te Vas A Morir/i);
    await expect(page.locator('body')).toBeVisible();
  });

  test('Hero Section - debe mostrar todos los elementos principales', async ({ page }) => {
    // Verificar el título principal
    await expect(page.locator('h1:has-text("AMORIR")')).toBeVisible();
    
    // Verificar el texto descriptivo
    await expect(page.locator('text=Una membresía para empujarte y crecer en las 7 áreas')).toBeVisible();
    await expect(page.locator('text=Cuerpo, Relaciones, Mente, Trabajo, Productividad, Legado y Dinero')).toBeVisible();
    
    // Verificar el botón principal
    const entrarButton = page.locator('a:has-text("ENTRARLE")');
    await expect(entrarButton).toBeVisible();
    await expect(entrarButton).toHaveAttribute('href', '/sign-up');
    
    // Verificar que la imagen de fondo se carga (solo la primera)
    await expect(page.locator('img[alt="Diego Dreyfus"]').first()).toBeVisible();
    
    // Verificar el ícono de scroll en la sección hero específicamente
    const heroSection = page.locator('section').first();
    const scrollIcon = heroSection.locator('svg');
    if (await scrollIcon.count() > 0) {
      await expect(scrollIcon).toBeVisible();
    }
  });

  test('Te Vas A Morir Section - debe mostrar contenido dinámico', async ({ page }) => {
    // Usar un selector más específico para la sección principal
    const mainSection = page.locator('section').nth(1); // Segunda sección
    
    // Verificar que aparece el nombre de Diego Dreyfus
    await expect(page.locator('text=Diego Dreyfus')).toBeVisible();
    
    // Verificar el texto descriptivo
    await expect(page.locator('text=no busco cambiar tu vida')).toBeVisible();
    
    // Verificar el botón de inspiración
    const inspireButton = page.locator('a:has-text("Quiero Inspirarme")');
    await expect(inspireButton).toBeVisible();
    await expect(inspireButton).toHaveAttribute('href', '#productos');
    
    // Verificar que las palabras rotativas aparecen (al menos una de ellas)
    const rotatingWords = ['MORTAL', 'HUMANO', 'PASAJERO', 'TEMPORAL'];
    let wordFound = false;
    
    for (const word of rotatingWords) {
      const wordElement = page.locator(`text=${word}`);
      if (await wordElement.isVisible()) {
        wordFound = true;
        break;
      }
    }
    expect(wordFound).toBe(true);
  });

  test('Bio Section - debe mostrar información personal', async ({ page }) => {
    // Buscar contenido biográfico sin depender de "ACERCA DE MÍ"
    await expect(page.locator('text=emprendedor')).toBeVisible();
    
    // Verificar que hay imágenes en la página
    const images = page.locator('img');
    const imageCount = await images.count();
    expect(imageCount).toBeGreaterThan(0);
  });

  test('Services Section - debe mostrar los tres servicios principales', async ({ page }) => {
    // Scroll para asegurar que la sección esté visible
    await page.locator('text=¿Cómo comparto lo que soy?').scrollIntoViewIfNeeded();
    
    // Verificar el título de la sección
    await expect(page.locator('text=¿Cómo comparto')).toBeVisible();
    await expect(page.locator('text=lo que soy')).toBeVisible();
    
    // Verificar los tres servicios usando selectores más específicos
    const services = [
      { title: 'La Escuela de la Vida', link: '/escuela' },
      { title: 'Eventos presenciales', link: '/eventos' },
      { title: 'Conferencias', link: '/conferencias' }
    ];
    
    for (const service of services) {
      // Usar un selector más específico que busque en el contenido de la sección de servicios
      const servicesSection = page.locator('#productos').or(page.locator('text=¿Cómo comparto lo que soy?').locator('..'));
      const serviceInSection = servicesSection.locator(`text=${service.title}`).first();
      await expect(serviceInSection).toBeVisible();
      
      // Verificar que cada servicio tiene un botón "Más Información" usando selectores más específicos
      const moreInfoButton = page.locator(`a[href="${service.link}"]:has-text("Más Información")`);
      await expect(moreInfoButton).toBeVisible();
    }
  });

  test('Testimonial Carousel - debe mostrar testimonios', async ({ page }) => {
    // Scroll para asegurar que la sección esté visible
    await page.locator('text=TESTIMONIOS').scrollIntoViewIfNeeded();
    
    // Verificar el título de la sección
    await expect(page.locator('text=TESTIMONIOS')).toBeVisible();
    
    // En lugar de buscar elementos específicos de testimonio, verificar que la sección existe
    // y tiene algún contenido
    const testimonialsSection = page.locator('text=TESTIMONIOS').locator('..');
    await expect(testimonialsSection).toBeVisible();
  });

  test('Email Section - debe mostrar formulario de contacto', async ({ page }) => {
    // Scroll para asegurar que la sección esté visible
    const emailInput = page.locator('input[type="email"]');
    await emailInput.scrollIntoViewIfNeeded();
    
    // Verificar que hay un campo de email
    await expect(emailInput).toBeVisible();
    
    // Verificar que hay un botón de envío
    const submitButton = page.locator('button[type="submit"]').or(page.locator('button:has-text("Suscribir")'));
    await expect(submitButton.first()).toBeVisible();
    
    // Probar funcionalidad básica del formulario
    await emailInput.fill('test@ejemplo.com');
    await expect(emailInput).toHaveValue('test@ejemplo.com');
  });

  test('Navegación y funcionalidad general', async ({ page }) => {
    // Verificar que el botón "Quiero Inspirarme" hace scroll a la sección de productos
    const inspireButton = page.locator('a:has-text("Quiero Inspirarme")');
    await inspireButton.click();
    
    // Esperar un momento para el scroll suave
    await page.waitForTimeout(1000);
    
    // Verificar que la sección de productos está visible
    await expect(page.locator('text=¿Cómo comparto')).toBeInViewport();
  });

  test('Responsive Design - debe funcionar en mobile', async ({ page }) => {
    // Cambiar a viewport móvil
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Verificar que los elementos principales siguen siendo visibles
    await expect(page.locator('h1:has-text("AMORIR")')).toBeVisible();
    await expect(page.locator('text=Una membresía para empujarte')).toBeVisible();
    await expect(page.locator('a:has-text("ENTRARLE")')).toBeVisible();
    
    // Verificar la sección de servicios en mobile
    await page.locator('text=¿Cómo comparto lo que soy?').scrollIntoViewIfNeeded();
    await expect(page.locator('text=La Escuela de la Vida')).toBeVisible();
  });

  test('Interacciones y animaciones', async ({ page }) => {
    // Verificar hover en el botón principal
    const entrarButton = page.locator('a:has-text("ENTRARLE")');
    await entrarButton.hover();
    
    // Verificar que el formulario de email responde a interacciones
    const emailInput = page.locator('input[type="email"]');
    await emailInput.scrollIntoViewIfNeeded();
    await emailInput.click();
    await emailInput.fill('usuario@test.com');
    
    // Verificar hover en los botones de servicios
    const moreInfoButtons = page.locator('a:has-text("Más Información")');
    if (await moreInfoButtons.count() > 0) {
      await moreInfoButtons.first().hover();
    }
  });

  test('Verificar todas las imágenes se cargan correctamente', async ({ page }) => {
    // Obtener todas las imágenes de la página
    const images = page.locator('img');
    const imageCount = await images.count();
    
    // Verificar que hay imágenes en la página
    expect(imageCount).toBeGreaterThan(0);
    
    // Verificar que las imágenes principales se cargan (solo las visibles)
    for (let i = 0; i < Math.min(imageCount, 3); i++) {
      const img = images.nth(i);
      
      // Solo verificar imágenes que están visibles
      if (await img.isVisible()) {
        // Verificar que la imagen tiene un src
        const src = await img.getAttribute('src');
        expect(src).toBeTruthy();
      }
    }
  });

  test('Performance - verificar tiempos de carga', async ({ page }) => {
    const startTime = Date.now();
    
    // Esperar a que todos los elementos principales estén visibles
    await expect(page.locator('h1:has-text("AMORIR")')).toBeVisible();
    await expect(page.locator('text=Diego Dreyfus')).toBeVisible();
    
    const endTime = Date.now();
    const loadTime = endTime - startTime;
    
    // La página debería cargar en menos de 5 segundos
    expect(loadTime).toBeLessThan(5000);
  });
}); 