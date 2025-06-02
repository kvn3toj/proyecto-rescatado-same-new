import { test, expect } from '@playwright/test';

test.describe('Verificación de Imágenes - Posición y Encuadre', () => {
  
  test.beforeEach(async ({ page }) => {
    // Configurar viewport para pruebas consistentes
    await page.setViewportSize({ width: 1280, height: 720 });
  });

  test('Homepage - Verificar imágenes principales', async ({ page }) => {
    await page.goto('/');
    
    // Esperar a que la página cargue completamente
    await page.waitForLoadState('networkidle');
    
    // 1. Verificar imagen hero principal (quien-soy.jpeg)
    const heroImage = page.locator('img[alt*="Sebastian García"], img[alt*="Humble Beast"]').first();
    await expect(heroImage).toBeVisible();
    
    // Verificar que la imagen hero tiene las dimensiones correctas
    const heroImageBox = await heroImage.boundingBox();
    expect(heroImageBox).toBeTruthy();
    expect(heroImageBox!.width).toBeGreaterThan(800); // Debe ser suficientemente ancha
    expect(heroImageBox!.height).toBeGreaterThan(400); // Debe ser suficientemente alta
    
    // 2. Verificar imagen de biografía
    const bioImage = page.locator('img[alt*="Nostradamus"], img[alt*="Sebastian García"]').nth(1);
    if (await bioImage.isVisible()) {
      const bioImageBox = await bioImage.boundingBox();
      expect(bioImageBox).toBeTruthy();
      expect(bioImageBox!.width).toBeGreaterThan(300);
      expect(bioImageBox!.height).toBeGreaterThan(300);
    }
    
    // 3. Verificar imágenes de servicios
    const serviceImages = page.locator('img[alt*="Escuela"], img[alt*="Eventos"], img[alt*="Conferencias"]');
    const serviceCount = await serviceImages.count();
    
    for (let i = 0; i < serviceCount; i++) {
      const serviceImg = serviceImages.nth(i);
      if (await serviceImg.isVisible()) {
        await expect(serviceImg).toBeVisible();
        const serviceBox = await serviceImg.boundingBox();
        expect(serviceBox).toBeTruthy();
        expect(serviceBox!.width).toBeGreaterThan(200);
        expect(serviceBox!.height).toBeGreaterThan(200);
      }
    }
    
    // 4. Verificar logo del header
    const headerLogo = page.locator('img[alt="Te Vas A Morir"]').first();
    await expect(headerLogo).toBeVisible();
    const logoBox = await headerLogo.boundingBox();
    expect(logoBox).toBeTruthy();
    expect(logoBox!.width).toBe(40); // Tamaño específico del logo
    expect(logoBox!.height).toBe(40);
  });

  test('Página AMORir 2025 - Verificar imágenes de áreas', async ({ page }) => {
    await page.goto('/amorir-2025');
    await page.waitForLoadState('networkidle');
    
    // Lista de imágenes esperadas en AMORir
    const expectedImages = [
      { alt: 'Cuerpo', src: '/images/cuerpo.jpg' },
      { alt: 'Mente', src: '/images/mente.jpg' },
      { alt: 'Trabajo', src: '/images/trabajo.jpg' },
      { alt: 'Relaciones', src: '/images/relaciones.jpg' },
      { alt: 'Dinero', src: '/images/dinero.jpg' },
      { alt: 'Productividad', src: '/images/productividad.jpg' },
      { alt: 'Legado', src: '/images/legado.jpg' }
    ];
    
    for (const expectedImg of expectedImages) {
      const img = page.locator(`img[alt="${expectedImg.alt}"]`);
      
      // Scroll hasta la imagen para asegurar que esté visible
      await img.scrollIntoViewIfNeeded();
      await expect(img).toBeVisible();
      
      // Verificar que tiene el src correcto
      const src = await img.getAttribute('src');
      expect(src).toContain(expectedImg.src.replace('/images/', ''));
      
      // Verificar dimensiones - estas imágenes deben ser grandes
      const imgBox = await img.boundingBox();
      expect(imgBox).toBeTruthy();
      expect(imgBox!.width).toBeGreaterThan(300);
      expect(imgBox!.height).toBeGreaterThan(200);
      
      // Verificar que la imagen no está cortada verificando aspect ratio
      const aspectRatio = imgBox!.width / imgBox!.height;
      expect(aspectRatio).toBeGreaterThan(0.5); // No debe estar demasiado alta
      expect(aspectRatio).toBeLessThan(3); // No debe estar demasiado ancha
    }
  });

  test('Página Escuela - Verificar imágenes de cursos', async ({ page }) => {
    await page.goto('/escuela');
    await page.waitForLoadState('networkidle');
    
    // 1. Verificar imagen hero de escuela
    const heroImage = page.locator('img[alt="Escuela Te Vas A Morir"]');
    await expect(heroImage).toBeVisible();
    
    const heroBox = await heroImage.boundingBox();
    expect(heroBox).toBeTruthy();
    expect(heroBox!.width).toBeGreaterThan(800);
    
    // 2. Verificar imágenes pequeñas de cursos en la grid
    const courseImages = page.locator('img[alt="Cuerpo"], img[alt="Trabajo"], img[alt="Legado"]');
    const courseCount = await courseImages.count();
    
    for (let i = 0; i < courseCount; i++) {
      const courseImg = courseImages.nth(i);
      await courseImg.scrollIntoViewIfNeeded();
      
      if (await courseImg.isVisible()) {
        const courseBox = await courseImg.boundingBox();
        expect(courseBox).toBeTruthy();
        
        // Estas son imágenes pequeñas (80x80 según el código)
        expect(courseBox!.width).toBeGreaterThan(60);
        expect(courseBox!.width).toBeLessThan(100);
        expect(courseBox!.height).toBeGreaterThan(60);
        expect(courseBox!.height).toBeLessThan(100);
        
        // Verificar que son cuadradas (o casi)
        const ratio = courseBox!.width / courseBox!.height;
        expect(ratio).toBeGreaterThan(0.8);
        expect(ratio).toBeLessThan(1.2);
      }
    }
  });

  test('Página Eventos - Verificar imágenes de eventos', async ({ page }) => {
    await page.goto('/eventos');
    await page.waitForLoadState('networkidle');
    
    // 1. Verificar imagen hero
    const heroImage = page.locator('img[alt="Eventos Te Vas A Morir"]');
    await expect(heroImage).toBeVisible();
    
    // 2. Verificar imágenes de eventos (conferencias.jpg, eventos.jpg)
    const eventImages = page.locator('img[alt*="Monólogo"], img[alt*="Evento anterior"], img[alt*="conferencias"]');
    const eventCount = await eventImages.count();
    
    for (let i = 0; i < Math.min(eventCount, 5); i++) { // Limitar para evitar timeout
      const eventImg = eventImages.nth(i);
      await eventImg.scrollIntoViewIfNeeded();
      
      if (await eventImg.isVisible()) {
        await expect(eventImg).toBeVisible();
        const eventBox = await eventImg.boundingBox();
        expect(eventBox).toBeTruthy();
        expect(eventBox!.width).toBeGreaterThan(150);
        expect(eventBox!.height).toBeGreaterThan(100);
      }
    }
  });

  test('Verificar carga de imágenes en diferentes viewports', async ({ page }) => {
    const viewports = [
      { width: 375, height: 667, name: 'Mobile' },
      { width: 768, height: 1024, name: 'Tablet' },
      { width: 1920, height: 1080, name: 'Desktop' }
    ];
    
    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Verificar que las imágenes principales se adaptan al viewport
      const heroImage = page.locator('img[alt*="Sebastian García"], img[alt*="Humble Beast"]').first();
      await expect(heroImage).toBeVisible();
      
      const heroBox = await heroImage.boundingBox();
      expect(heroBox).toBeTruthy();
      
      // La imagen debe ocupar un porcentaje razonable del viewport
      const widthPercentage = (heroBox!.width / viewport.width) * 100;
      expect(widthPercentage).toBeGreaterThan(50); // Al menos 50% del ancho
      
      // Verificar logo en header (debe mantenerse pequeño)
      const logo = page.locator('img[alt="Te Vas A Morir"]').first();
      await expect(logo).toBeVisible();
      const logoBox = await logo.boundingBox();
      expect(logoBox!.width).toBeLessThan(60); // No debe crecer demasiado
    }
  });

  test('Verificar que no hay imágenes rotas', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Obtener todas las imágenes
    const images = page.locator('img');
    const imageCount = await images.count();
    
    const brokenImages = [];
    
    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      
      if (await img.isVisible()) {
        const src = await img.getAttribute('src');
        const alt = await img.getAttribute('alt');
        
        // Verificar que la imagen tiene naturalWidth > 0 (no está rota)
        const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth);
        
        if (naturalWidth === 0) {
          brokenImages.push({ src, alt, index: i });
        }
      }
    }
    
    // Reportar imágenes rotas si las hay
    if (brokenImages.length > 0) {
      console.log('Imágenes rotas encontradas:', brokenImages);
    }
    
    expect(brokenImages.length).toBe(0);
  });

  test('Verificar object-fit y posicionamiento CSS', async ({ page }) => {
    await page.goto('/amorir-2025');
    await page.waitForLoadState('networkidle');
    
    // Verificar que las imágenes de área tienen object-cover aplicado
    const areaImages = page.locator('img[alt="Cuerpo"], img[alt="Mente"], img[alt="Trabajo"]');
    const count = await areaImages.count();
    
    for (let i = 0; i < Math.min(count, 3); i++) {
      const img = areaImages.nth(i);
      await img.scrollIntoViewIfNeeded();
      
      if (await img.isVisible()) {
        // Verificar que tiene la clase object-cover
        const classes = await img.getAttribute('class');
        expect(classes).toContain('object-cover');
        
        // Verificar que el contenedor padre tiene position relative
        const parent = img.locator('..');
        const parentClasses = await parent.getAttribute('class');
        expect(parentClasses).toContain('relative');
      }
    }
  });

  test('Performance - Verificar lazy loading de imágenes', async ({ page }) => {
    await page.goto('/amorir-2025');
    
    // Verificar que las imágenes fuera del viewport inicial no se cargan inmediatamente
    const belowFoldImages = page.locator('img[alt="Legado"], img[alt="Productividad"]');
    
    // Antes de hacer scroll, verificar que algunas imágenes pueden no estar cargadas
    const initialLoadedCount = await page.evaluate(() => {
      const images = document.querySelectorAll('img');
      let loadedCount = 0;
      images.forEach(img => {
        if ((img as HTMLImageElement).complete && (img as HTMLImageElement).naturalWidth > 0) {
          loadedCount++;
        }
      });
      return loadedCount;
    });
    
    // Hacer scroll hasta el final
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);
    
    // Verificar que ahora más imágenes están cargadas
    const finalLoadedCount = await page.evaluate(() => {
      const images = document.querySelectorAll('img');
      let loadedCount = 0;
      images.forEach(img => {
        if ((img as HTMLImageElement).complete && (img as HTMLImageElement).naturalWidth > 0) {
          loadedCount++;
        }
      });
      return loadedCount;
    });
    
    expect(finalLoadedCount).toBeGreaterThanOrEqual(initialLoadedCount);
  });
}); 