import { test, expect } from '@playwright/test';

test.describe('Verificación de Imágenes - Posición y Encuadre (CORREGIDO)', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
  });

  test('Homepage - Verificar imágenes principales', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // 1. Verificar imagen hero principal (quien-soy.jpeg)
    const heroImage = page.locator('img[alt*="Sebastian García"]').first();
    await expect(heroImage).toBeVisible();
    
    const heroImageBox = await heroImage.boundingBox();
    expect(heroImageBox).toBeTruthy();
    expect(heroImageBox!.width).toBeGreaterThan(400);
    expect(heroImageBox!.height).toBeGreaterThan(200);
    
    // 2. Verificar que la imagen hero se carga correctamente
    const naturalWidth = await heroImage.evaluate((el: HTMLImageElement) => el.naturalWidth);
    expect(naturalWidth).toBeGreaterThan(0);
    
    // 3. Verificar logo skull (cuando esté visible)
    const skullLogo = page.locator('img[src*="skull-logo"]');
    if (await skullLogo.count() > 0) {
      const logoBox = await skullLogo.boundingBox();
      if (logoBox) {
        expect(logoBox.width).toBeLessThan(100);
        expect(logoBox.height).toBeLessThan(100);
      }
    }
  });

  test('Página AMORir 2025 - Verificar todas las imágenes de áreas', async ({ page }) => {
    await page.goto('/amorir-2025');
    await page.waitForLoadState('networkidle');
    
    // Lista de imágenes esperadas con sus alt texts reales
    const expectedImages = [
      { filename: 'cuerpo.jpg', altContains: 'Cuerpo' },
      { filename: 'mente.jpg', altContains: 'Mente' },
      { filename: 'trabajo.jpg', altContains: 'Trabajo' },
      { filename: 'relaciones.jpg', altContains: 'Relaciones' },
      { filename: 'dinero.jpg', altContains: 'Dinero' },
      { filename: 'productividad.jpg', altContains: 'Productividad' },
      { filename: 'legado.jpg', altContains: 'Legado' }
    ];
    
    for (const expectedImg of expectedImages) {
      const img = page.locator(`img[src*="${expectedImg.filename}"]`);
      
      await expect(img).toBeVisible();
      
      // Verificar que la imagen se carga correctamente
      const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth);
      expect(naturalWidth).toBeGreaterThan(0);
      
      // Verificar dimensiones renderizadas
      const imgBox = await img.boundingBox();
      expect(imgBox).toBeTruthy();
      expect(imgBox!.width).toBeGreaterThan(300);
      expect(imgBox!.height).toBeGreaterThan(200);
      
      // Verificar aspect ratio razonable
      const aspectRatio = imgBox!.width / imgBox!.height;
      expect(aspectRatio).toBeGreaterThan(0.5);
      expect(aspectRatio).toBeLessThan(3);
      
      console.log(`✅ ${expectedImg.filename}: ${imgBox!.width}x${imgBox!.height} (ratio: ${aspectRatio.toFixed(2)})`);
    }
  });

  test('Verificar object-fit y posicionamiento CSS', async ({ page }) => {
    await page.goto('/amorir-2025');
    await page.waitForLoadState('networkidle');
    
    // Verificar las primeras 3 imágenes de área
    const areaImages = page.locator('img[src*="cuerpo.jpg"], img[src*="mente.jpg"], img[src*="trabajo.jpg"]');
    const count = await areaImages.count();
    
    for (let i = 0; i < count; i++) {
      const img = areaImages.nth(i);
      await img.scrollIntoViewIfNeeded();
      
      if (await img.isVisible()) {
        // Verificar object-fit
        const objectFit = await img.evaluate((el) => {
          return window.getComputedStyle(el).objectFit;
        });
        
        expect(objectFit).toBe('cover');
        
        // Verificar que el contenedor padre tiene position relative
        const parent = img.locator('..');
        const parentClasses = await parent.getAttribute('class');
        expect(parentClasses).toContain('relative');
      }
    }
  });

  test('Verificar que las imágenes no están cortadas por overflow', async ({ page }) => {
    await page.goto('/amorir-2025');
    await page.waitForLoadState('networkidle');
    
    const areaImages = page.locator('img[src*="cuerpo.jpg"], img[src*="mente.jpg"], img[src*="trabajo.jpg"]');
    const count = await areaImages.count();
    
    for (let i = 0; i < count; i++) {
      const img = areaImages.nth(i);
      await img.scrollIntoViewIfNeeded();
      
      if (await img.isVisible()) {
        const imgBox = await img.boundingBox();
        const container = img.locator('..');
        const containerBox = await container.boundingBox();
        
        expect(imgBox).toBeTruthy();
        expect(containerBox).toBeTruthy();
        
        // Verificar que la imagen no se desborda del contenedor (con tolerancia)
        expect(imgBox!.x).toBeGreaterThanOrEqual(containerBox!.x - 2);
        expect(imgBox!.y).toBeGreaterThanOrEqual(containerBox!.y - 2);
        expect(imgBox!.x + imgBox!.width).toBeLessThanOrEqual(containerBox!.x + containerBox!.width + 2);
        expect(imgBox!.y + imgBox!.height).toBeLessThanOrEqual(containerBox!.y + containerBox!.height + 2);
      }
    }
  });

  test('Verificar responsive design en diferentes viewports', async ({ page }) => {
    const viewports = [
      { width: 375, height: 667, name: 'Mobile' },
      { width: 768, height: 1024, name: 'Tablet' },
      { width: 1920, height: 1080, name: 'Desktop' }
    ];
    
    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/amorir-2025');
      await page.waitForLoadState('networkidle');
      
      // Verificar la primera imagen de área
      const firstAreaImage = page.locator('img[src*="cuerpo.jpg"]').first();
      await firstAreaImage.scrollIntoViewIfNeeded();
      await expect(firstAreaImage).toBeVisible();
      
      const imgBox = await firstAreaImage.boundingBox();
      expect(imgBox).toBeTruthy();
      
      // Verificar que la imagen se adapta al viewport
      const widthPercentage = (imgBox!.width / viewport.width) * 100;
      
      if (viewport.width <= 768) {
        // En mobile/tablet debería ocupar más espacio
        expect(widthPercentage).toBeGreaterThan(70);
      } else {
        // En desktop debería ocupar menos espacio
        expect(widthPercentage).toBeGreaterThan(25);
        expect(widthPercentage).toBeLessThan(80);
      }
      
      console.log(`✅ ${viewport.name}: Imagen ocupa ${widthPercentage.toFixed(1)}% del ancho`);
    }
  });

  test('Verificar performance y optimización de imágenes', async ({ page }) => {
    await page.goto('/amorir-2025');
    await page.waitForLoadState('networkidle');
    
    const images = page.locator('img[src*="_next/image"]');
    const count = await images.count();
    
    for (let i = 0; i < Math.min(count, 5); i++) {
      const img = images.nth(i);
      
      if (await img.isVisible()) {
        await img.scrollIntoViewIfNeeded();
        
        const box = await img.boundingBox();
        const naturalDimensions = await img.evaluate((el: HTMLImageElement) => ({
          naturalWidth: el.naturalWidth,
          naturalHeight: el.naturalHeight,
          complete: el.complete
        }));
        
        expect(naturalDimensions.complete).toBe(true);
        expect(naturalDimensions.naturalWidth).toBeGreaterThan(0);
        
        if (box && naturalDimensions.naturalWidth > 0) {
          const scaleX = box.width / naturalDimensions.naturalWidth;
          const scaleY = box.height / naturalDimensions.naturalHeight;
          
          // Verificar que no hay escalado excesivo
          expect(scaleX).toBeLessThan(2); // No más de 2x escalado hacia arriba
          expect(scaleY).toBeLessThan(2);
          
          // Verificar que no es innecesariamente grande
          expect(scaleX).toBeGreaterThan(0.1); // No menos de 0.1x
          expect(scaleY).toBeGreaterThan(0.1);
        }
      }
    }
  });

  test('Verificar accesibilidad de imágenes', async ({ page }) => {
    await page.goto('/amorir-2025');
    await page.waitForLoadState('networkidle');
    
    const images = page.locator('img');
    const imageCount = await images.count();
    
    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      
      if (await img.isVisible()) {
        const alt = await img.getAttribute('alt');
        const src = await img.getAttribute('src');
        
        // Verificar que tiene alt text
        expect(alt).toBeTruthy();
        expect(alt!.length).toBeGreaterThan(2);
        
        // Verificar que tiene src válido
        expect(src).toBeTruthy();
        expect(src).not.toContain('placeholder');
        expect(src).not.toContain('example.com');
      }
    }
  });

  test('Verificar carga de imágenes en páginas específicas', async ({ page }) => {
    const pages = [
      { path: '/escuela', heroAlt: 'escuela' },
      { path: '/eventos', heroAlt: 'eventos' }
    ];
    
    for (const pageInfo of pages) {
      await page.goto(pageInfo.path);
      await page.waitForLoadState('networkidle');
      
      // Buscar imagen hero por src que contenga el nombre de la página
      const heroImage = page.locator(`img[src*="${pageInfo.heroAlt}"]`).first();
      
      if (await heroImage.count() > 0) {
        await expect(heroImage).toBeVisible();
        
        const heroBox = await heroImage.boundingBox();
        expect(heroBox).toBeTruthy();
        expect(heroBox!.width).toBeGreaterThan(400);
        
        // Verificar que se carga correctamente
        const naturalWidth = await heroImage.evaluate((el: HTMLImageElement) => el.naturalWidth);
        expect(naturalWidth).toBeGreaterThan(0);
        
        console.log(`✅ ${pageInfo.path}: Hero image cargada correctamente`);
      }
    }
  });
}); 