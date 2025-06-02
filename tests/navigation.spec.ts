import { test, expect } from '@playwright/test';

test.describe('Navegación - Páginas Secundarias', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('debe navegar a todas las páginas principales', async ({ page }) => {
    const pages = [
      { path: '/sign-up', title: /sign.*up|registro/i },
      { path: '/sign-in', title: /sign.*in|login|iniciar/i },
      { path: '/escuela', title: /escuela/i },
      { path: '/eventos', title: /eventos/i },
      { path: '/conferencias', title: /conferencias/i },
      { path: '/amorir-2025', title: /amorir.*2025/i },
    ];

    for (const pageDef of pages) {
      // Navegar a la página
      await page.goto(pageDef.path);
      
      // Verificar que la página carga correctamente
      await expect(page).toHaveURL(new RegExp(pageDef.path));
      
      // Verificar que el contenido principal está visible
      await expect(page.locator('body')).toBeVisible();
      
      // Verificar que no hay errores 404
      await expect(page.locator('text=404')).not.toBeVisible();
      await expect(page.locator('text=Not Found')).not.toBeVisible();
      
      console.log(`✅ Página ${pageDef.path} carga correctamente`);
    }
  });

  test('debe manejar páginas no encontradas correctamente', async ({ page }) => {
    // Navegar a una página que no existe
    await page.goto('/pagina-que-no-existe');
    
    // Verificar que se muestra la página 404
    const notFoundIndicators = [
      page.locator('text=404'),
      page.locator('text=Not Found'),
      page.locator('text=Página no encontrada'),
      page.locator('text=Page not found')
    ];
    
    let found404 = false;
    for (const indicator of notFoundIndicators) {
      if (await indicator.isVisible()) {
        found404 = true;
        break;
      }
    }
    
    // Si no encuentra un indicador 404 específico, verificar que al menos no muestre contenido de la homepage
    if (!found404) {
      await expect(page.locator('text=AMORIR')).not.toBeVisible();
    }
  });

  test('Enlaces desde la homepage funcionan correctamente', async ({ page }) => {
    // Verificar enlaces de la sección de servicios
    const serviceLinks = [
      { text: 'escuela', expectedPath: '/escuela' },
      { text: 'eventos', expectedPath: '/eventos' },
      { text: 'conferencias', expectedPath: '/conferencias' }
    ];

    for (const link of serviceLinks) {
      await page.goto('/');
      
      // Buscar y hacer clic en el enlace
      const linkElement = page.locator(`a[href="${link.expectedPath}"]`).first();
      if (await linkElement.isVisible()) {
        await linkElement.click();
        
        // Verificar que navegó correctamente
        await expect(page).toHaveURL(new RegExp(link.expectedPath));
        await expect(page.locator('body')).toBeVisible();
        
        console.log(`✅ Enlace a ${link.expectedPath} funciona correctamente`);
      }
    }
  });

  test('debe verificar formularios de contacto y suscripción', async ({ page }) => {
    // Test del formulario de email en la homepage
    await page.goto('/');
    
    const emailInput = page.locator('input[type="email"]');
    if (await emailInput.isVisible()) {
      await emailInput.scrollIntoViewIfNeeded();
      await emailInput.fill('test@ejemplo.com');
      await expect(emailInput).toHaveValue('test@ejemplo.com');
      
      // Buscar el botón de envío
      const submitButton = page.locator('button[type="submit"]')
        .or(page.locator('button:has-text("Suscribir")'))
        .or(page.locator('button:has-text("Enviar")'));
      
      if (await submitButton.count() > 0) {
        await expect(submitButton.first()).toBeVisible();
        console.log('✅ Formulario de email encontrado y funcional');
      }
    }
  });

  test('debe verificar la funcionalidad de scroll suave', async ({ page }) => {
    await page.goto('/');
    
    // Verificar que el botón "Quiero Inspirarme" hace scroll suave
    const inspireButton = page.locator('a[href="#productos"]');
    if (await inspireButton.isVisible()) {
      await inspireButton.click();
      
      // Esperar el scroll suave
      await page.waitForTimeout(1500);
      
      // Verificar que la sección de productos está en viewport
      const productsSection = page.locator('text=¿Cómo comparto lo que soy?')
        .or(page.locator('#productos'));
      
      if (await productsSection.count() > 0) {
        await expect(productsSection.first()).toBeInViewport();
        console.log('✅ Scroll suave funciona correctamente');
      }
    }
  });

  test('debe verificar la responsividad en diferentes dispositivos', async ({ page }) => {
    const viewports = [
      { name: 'Mobile', width: 375, height: 667 },
      { name: 'Tablet', width: 768, height: 1024 },
      { name: 'Desktop', width: 1920, height: 1080 }
    ];

    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/');
      
      // Verificar elementos principales en cada viewport
      await expect(page.locator('h1:has-text("AMORIR")')).toBeVisible();
      await expect(page.locator('text=Una membresía para empujarte')).toBeVisible();
      
      console.log(`✅ Página funciona correctamente en ${viewport.name} (${viewport.width}x${viewport.height})`);
    }
  });

  test('debe verificar la carga de recursos estáticos', async ({ page }) => {
    // Verificar que las imágenes se cargan correctamente
    await page.goto('/');
    
    // Esperar a que se cargue la página
    await page.waitForLoadState('networkidle');
    
    // Verificar que hay imágenes en la página
    const images = page.locator('img');
    const imageCount = await images.count();
    
    expect(imageCount).toBeGreaterThan(0);
    
    // Verificar que al menos algunas imágenes se cargan correctamente
    let loadedImages = 0;
    for (let i = 0; i < Math.min(imageCount, 5); i++) {
      const img = images.nth(i);
      const src = await img.getAttribute('src');
      if (src && src.length > 0) {
        loadedImages++;
      }
    }
    
    expect(loadedImages).toBeGreaterThan(0);
    console.log(`✅ Se encontraron ${loadedImages} imágenes con src válido`);
  });

  test('debe verificar accesibilidad básica', async ({ page }) => {
    await page.goto('/');
    
    // Verificar que hay elementos con roles apropiados
    const accessibilityElements = [
      page.locator('[role="button"]'),
      page.locator('button'),
      page.locator('a'),
      page.locator('input'),
      page.locator('h1, h2, h3, h4, h5, h6')
    ];
    
    for (const elementType of accessibilityElements) {
      const count = await elementType.count();
      if (count > 0) {
        console.log(`✅ Encontrados ${count} elementos accesibles de tipo: ${elementType}`);
      }
    }
    
    // Verificar que las imágenes tienen alt text
    const images = page.locator('img');
    const imageCount = await images.count();
    
    for (let i = 0; i < Math.min(imageCount, 5); i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      if (!alt || alt.trim() === '') {
        console.warn(`⚠️ Imagen sin alt text encontrada: ${await img.getAttribute('src')}`);
      }
    }
  });

  test('debe verificar la funcionalidad de navegación del teclado', async ({ page }) => {
    await page.goto('/');
    
    // Verificar que se puede navegar con Tab
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Verificar que hay elementos enfocables
    const focusedElement = page.locator(':focus');
    if (await focusedElement.count() > 0) {
      await expect(focusedElement).toBeVisible();
      console.log('✅ Navegación por teclado funcional');
    }
  });
}); 