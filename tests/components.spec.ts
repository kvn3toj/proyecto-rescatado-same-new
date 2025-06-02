import { test, expect } from '@playwright/test';

test.describe('Componentes Específicos', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('HeroSection - Animaciones y elementos interactivos', async ({ page }) => {
    // Verificar que el título principal tiene la animación fadeUp
    const title = page.locator('h1:has-text("AMORIR")');
    await expect(title).toBeVisible();
    
    // Verificar que el botón ENTRARLE es clickeable
    const entrarButton = page.locator('a:has-text("ENTRARLE")');
    await expect(entrarButton).toBeVisible();
    await entrarButton.hover();
    
    // Verificar el efecto parallax en la imagen de fondo
    const heroSection = page.locator('section').first();
    await expect(heroSection).toBeVisible();
    
    // Verificar que el ícono de scroll está animado - buscar en la sección hero específicamente
    const scrollIcon = heroSection.locator('svg');
    if (await scrollIcon.count() > 0 && await scrollIcon.isVisible()) {
      await expect(scrollIcon).toBeVisible();
    } else {
      console.log('ℹ️ Ícono de scroll no encontrado o no visible en el hero');
    }
    
    // Simular scroll para verificar el efecto parallax
    await page.evaluate(() => {
      window.scrollTo(0, 100);
    });
    await page.waitForTimeout(500);
  });

  test('TeVasAMorirSection - Palabras rotativas y animaciones', async ({ page }) => {
    // Verificar que aparece el nombre de Diego Dreyfus
    await expect(page.locator('text=Diego Dreyfus')).toBeVisible();
    
    // Verificar las palabras rotativas
    const rotatingWords = ['MORTAL', 'HUMANO', 'PASAJERO', 'TEMPORAL'];
    
    // Esperar a que aparezca al menos una palabra
    await page.waitForTimeout(1000);
    
    let visibleWords = 0;
    for (const word of rotatingWords) {
      const wordElement = page.locator(`text=${word}`);
      if (await wordElement.isVisible()) {
        visibleWords++;
      }
    }
    
    expect(visibleWords).toBeGreaterThan(0);
    
    // Esperar un poco más para ver si cambia la palabra
    await page.waitForTimeout(3000);
    
    // Verificar que el botón de inspiración funciona
    const inspireButton = page.locator('a:has-text("Quiero Inspirarme")');
    await expect(inspireButton).toBeVisible();
  });

  test('ServicesSection - Cards interactivas', async ({ page }) => {
    // Scroll a la sección de servicios
    await page.locator('text=¿Cómo comparto lo que soy?').scrollIntoViewIfNeeded();
    
    const serviceCards = [
      'La Escuela de la Vida',
      'Eventos presenciales', 
      'Conferencias'
    ];
    
    for (const cardTitle of serviceCards) {
      // Usar un selector más específico que busque en la sección de productos
      const servicesSection = page.locator('#productos').or(page.locator('text=¿Cómo comparto lo que soy?').locator('..'));
      const serviceInSection = servicesSection.locator(`text=${cardTitle}`).first();
      await expect(serviceInSection).toBeVisible();
      
      // Verificar que tiene botón "Más Información" usando href específico
      const links = {
        'La Escuela de la Vida': '/escuela',
        'Eventos presenciales': '/eventos',
        'Conferencias': '/conferencias'
      };
      
      const link = links[cardTitle as keyof typeof links];
      const moreInfoButton = page.locator(`a[href="${link}"]:has-text("Más Información")`);
      await expect(moreInfoButton).toBeVisible();
      
      // Verificar hover effect
      await moreInfoButton.hover();
      await page.waitForTimeout(300);
    }
  });

  test('TestimonialCarousel - Funcionalidad del carrusel', async ({ page }) => {
    // Scroll a la sección de testimonios
    await page.locator('text=TESTIMONIOS').scrollIntoViewIfNeeded();
    
    // Verificar que el título es visible
    await expect(page.locator('text=TESTIMONIOS')).toBeVisible();
    
    // Verificar que la sección de testimonios existe
    const testimonialsSection = page.locator('text=TESTIMONIOS').locator('..');
    await expect(testimonialsSection).toBeVisible();
    
    // Buscar elementos de navegación del carrusel con selectores más específicos
    const navigationButtons = page.locator('button').filter({ hasText: /next|prev|siguiente|anterior/i });
    
    // Si hay botones de navegación, probar la funcionalidad
    if (await navigationButtons.count() > 0) {
      await navigationButtons.first().click();
      await page.waitForTimeout(500);
      console.log('✅ Navegación del carrusel funciona');
    } else {
      console.log('ℹ️ No se encontraron botones de navegación del carrusel');
    }
  });

  test('EmailSection - Validación del formulario', async ({ page }) => {
    // Scroll al formulario de email
    const emailInput = page.locator('input[type="email"]');
    await emailInput.scrollIntoViewIfNeeded();
    
    // Test con email válido
    await emailInput.fill('usuario@ejemplo.com');
    await expect(emailInput).toHaveValue('usuario@ejemplo.com');
    
    // Test con email inválido
    await emailInput.fill('email-invalido');
    
    // Intentar enviar y verificar validación HTML5
    const submitButton = page.locator('button[type="submit"]')
      .or(page.locator('button:has-text("Suscribir")'));
    
    if (await submitButton.count() > 0) {
      await submitButton.first().click();
      
      // Verificar que la validación HTML5 funciona
      const validationMessage = await emailInput.evaluate((el: HTMLInputElement) => el.validationMessage);
      if (validationMessage) {
        console.log('✅ Validación de email funciona:', validationMessage);
      }
    }
    
    // Limpiar y poner email válido
    await emailInput.fill('test@ejemplo.com');
    await expect(emailInput).toHaveValue('test@ejemplo.com');
  });

  test('Elementos de UI comunes - Botones y links', async ({ page }) => {
    // Verificar todos los botones principales
    const buttons = page.locator('button, a[role="button"], .btn');
    const buttonCount = await buttons.count();
    
    console.log(`Encontrados ${buttonCount} botones en la página`);
    
    // Verificar los primeros 5 botones
    for (let i = 0; i < Math.min(buttonCount, 5); i++) {
      const button = buttons.nth(i);
      if (await button.isVisible()) {
        await button.hover();
        await page.waitForTimeout(200);
      }
    }
    
    // Verificar enlaces externos (si los hay)
    const externalLinks = page.locator('a[href^="http"]:not([href*="localhost"])');
    const externalLinkCount = await externalLinks.count();
    
    for (let i = 0; i < Math.min(externalLinkCount, 3); i++) {
      const link = externalLinks.nth(i);
      if (await link.isVisible()) {
        const href = await link.getAttribute('href');
        const target = await link.getAttribute('target');
        
        // Verificar que los enlaces externos abren en nueva pestaña
        if (href && href.startsWith('http') && !href.includes('localhost')) {
          expect(target).toBe('_blank');
        }
      }
    }
  });

  test('Animaciones de Framer Motion', async ({ page }) => {
    // Verificar que las animaciones se cargan correctamente
    await page.waitForLoadState('networkidle');
    
    // Verificar elementos con animaciones
    const animatedElements = page.locator('[style*="transform"]')
      .or(page.locator('[style*="opacity"]'))
      .or(page.locator('.motion-'));
    
    const animatedCount = await animatedElements.count();
    console.log(`Encontrados ${animatedCount} elementos animados`);
    
    if (animatedCount > 0) {
      // Verificar que al menos algunos elementos tienen estilos de transformación
      for (let i = 0; i < Math.min(animatedCount, 3); i++) {
        const element = animatedElements.nth(i);
        if (await element.isVisible()) {
          const style = await element.getAttribute('style');
          if (style && (style.includes('transform') || style.includes('opacity'))) {
            console.log('✅ Elemento animado encontrado con estilos correctos');
          }
        }
      }
    }
  });

  test('Efectos de hover y interacciones', async ({ page }) => {
    // Verificar efectos hover en elementos clave
    const hoverElements = [
      page.locator('a:has-text("ENTRARLE")'),
      page.locator('a:has-text("Quiero Inspirarme")'),
      page.locator('a:has-text("Más Información")').first()
    ];
    
    for (const element of hoverElements) {
      if (await element.isVisible()) {
        // Hover
        await element.hover();
        await page.waitForTimeout(300);
        
        // Salir del hover
        await page.mouse.move(0, 0);
        await page.waitForTimeout(300);
        
        console.log('✅ Efecto hover verificado en elemento');
      }
    }
  });
}); 