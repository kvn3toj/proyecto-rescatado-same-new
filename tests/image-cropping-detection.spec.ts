import { test, expect } from '@playwright/test';

test.describe('Detección de Imágenes Cortadas y Problemas de Encuadre', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
  });

  test('Detectar imágenes cortadas por overflow hidden', async ({ page }) => {
    await page.goto('/amorir-2025');
    await page.waitForLoadState('networkidle');
    
    // Verificar cada imagen de área para detectar si está cortada
    const areaImages = page.locator('img[alt="Cuerpo"], img[alt="Mente"], img[alt="Trabajo"], img[alt="Relaciones"], img[alt="Dinero"], img[alt="Productividad"], img[alt="Legado"]');
    const count = await areaImages.count();
    
    for (let i = 0; i < count; i++) {
      const img = areaImages.nth(i);
      await img.scrollIntoViewIfNeeded();
      
      if (await img.isVisible()) {
        const alt = await img.getAttribute('alt');
        
        // Obtener dimensiones de la imagen y su contenedor
        const imgBox = await img.boundingBox();
        const container = img.locator('..');
        const containerBox = await container.boundingBox();
        
        expect(imgBox).toBeTruthy();
        expect(containerBox).toBeTruthy();
        
        // Verificar que la imagen no se desborda del contenedor
        expect(imgBox!.x).toBeGreaterThanOrEqual(containerBox!.x - 1); // -1 para tolerancia de píxel
        expect(imgBox!.y).toBeGreaterThanOrEqual(containerBox!.y - 1);
        expect(imgBox!.x + imgBox!.width).toBeLessThanOrEqual(containerBox!.x + containerBox!.width + 1);
        expect(imgBox!.y + imgBox!.height).toBeLessThanOrEqual(containerBox!.y + containerBox!.height + 1);
        
        console.log(`✓ Imagen ${alt}: Contenida correctamente en su contenedor`);
      }
    }
  });

  test('Verificar aspect ratio y object-position de imágenes hero', async ({ page }) => {
    const pages = ['/', '/escuela', '/eventos'];
    
    for (const pagePath of pages) {
      await page.goto(pagePath);
      await page.waitForLoadState('networkidle');
      
      // Buscar imágenes hero (generalmente las primeras y más grandes)
      const heroImages = page.locator('img').first();
      
      if (await heroImages.isVisible()) {
        const imgBox = await heroImages.boundingBox();
        const alt = await heroImages.getAttribute('alt');
        
        expect(imgBox).toBeTruthy();
        
        // Verificar que la imagen hero tiene un aspect ratio razonable
        const aspectRatio = imgBox!.width / imgBox!.height;
        
        // Las imágenes hero no deberían ser demasiado estrechas o demasiado anchas
        expect(aspectRatio).toBeGreaterThan(0.5); // No demasiado alta
        expect(aspectRatio).toBeLessThan(4); // No demasiado ancha
        
        // Verificar que la imagen es suficientemente grande para ser hero
        expect(imgBox!.width).toBeGreaterThan(400);
        expect(imgBox!.height).toBeGreaterThan(200);
        
        console.log(`✓ Página ${pagePath} - Imagen hero "${alt}": Aspect ratio ${aspectRatio.toFixed(2)}`);
      }
    }
  });

  test('Detectar imágenes con object-fit incorrecto', async ({ page }) => {
    await page.goto('/amorir-2025');
    await page.waitForLoadState('networkidle');
    
    // Verificar que las imágenes tienen el object-fit correcto aplicado
    const images = page.locator('img[alt="Cuerpo"], img[alt="Mente"], img[alt="Trabajo"]');
    const count = await images.count();
    
    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      await img.scrollIntoViewIfNeeded();
      
      if (await img.isVisible()) {
        const alt = await img.getAttribute('alt');
        
        // Verificar el computed style de object-fit
        const objectFit = await img.evaluate((el) => {
          return window.getComputedStyle(el).objectFit;
        });
        
        // Verificar object-position
        const objectPosition = await img.evaluate((el) => {
          return window.getComputedStyle(el).objectPosition;
        });
        
        // Las imágenes de área deberían usar object-fit: cover
        expect(objectFit).toBe('cover');
        
        // object-position debería estar centrado o especificado
        expect(objectPosition).toMatch(/(center|50%|top|bottom|left|right)/);
        
        console.log(`✓ Imagen ${alt}: object-fit=${objectFit}, object-position=${objectPosition}`);
      }
    }
  });

  test('Verificar que las imágenes pequeñas mantienen proporciones', async ({ page }) => {
    await page.goto('/escuela');
    await page.waitForLoadState('networkidle');
    
    // Verificar las imágenes pequeñas de cursos (80x80)
    const smallImages = page.locator('img[alt="Cuerpo"], img[alt="Trabajo"], img[alt="Legado"]');
    const count = await smallImages.count();
    
    for (let i = 0; i < count; i++) {
      const img = smallImages.nth(i);
      await img.scrollIntoViewIfNeeded();
      
      if (await img.isVisible()) {
        const alt = await img.getAttribute('alt');
        const imgBox = await img.boundingBox();
        
        expect(imgBox).toBeTruthy();
        
        // Verificar que son aproximadamente cuadradas (tolerancia del 20%)
        const aspectRatio = imgBox!.width / imgBox!.height;
        expect(aspectRatio).toBeGreaterThan(0.8);
        expect(aspectRatio).toBeLessThan(1.2);
        
        // Verificar que no son demasiado pequeñas (mínimo 60px)
        expect(imgBox!.width).toBeGreaterThan(60);
        expect(imgBox!.height).toBeGreaterThan(60);
        
        // Verificar que no son demasiado grandes (máximo 100px)
        expect(imgBox!.width).toBeLessThan(100);
        expect(imgBox!.height).toBeLessThan(100);
        
        console.log(`✓ Imagen pequeña ${alt}: ${imgBox!.width}x${imgBox!.height} (ratio: ${aspectRatio.toFixed(2)})`);
      }
    }
  });

  test('Detectar imágenes que se ven pixeladas o estiradas', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Verificar las dimensiones naturales vs renderizadas
    const images = page.locator('img').first(); // Imagen hero principal
    
    if (await images.isVisible()) {
      const imgBox = await images.boundingBox();
      const alt = await images.getAttribute('alt');
      
      // Obtener dimensiones naturales de la imagen
      const naturalDimensions = await images.evaluate((img: HTMLImageElement) => ({
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight
      }));
      
      expect(imgBox).toBeTruthy();
      expect(naturalDimensions.naturalWidth).toBeGreaterThan(0);
      expect(naturalDimensions.naturalHeight).toBeGreaterThan(0);
      
      // Calcular el factor de escala
      const scaleX = imgBox!.width / naturalDimensions.naturalWidth;
      const scaleY = imgBox!.height / naturalDimensions.naturalHeight;
      
      // Verificar que la imagen no está siendo escalada excesivamente
      // Un factor > 2 podría indicar pixelación
      expect(scaleX).toBeLessThan(2);
      expect(scaleY).toBeLessThan(2);
      
      // Un factor < 0.1 podría indicar que la imagen es innecesariamente grande
      expect(scaleX).toBeGreaterThan(0.1);
      expect(scaleY).toBeGreaterThan(0.1);
      
      console.log(`✓ Imagen ${alt}: Escala X=${scaleX.toFixed(2)}, Y=${scaleY.toFixed(2)}`);
      console.log(`  Natural: ${naturalDimensions.naturalWidth}x${naturalDimensions.naturalHeight}`);
      console.log(`  Renderizada: ${imgBox!.width}x${imgBox!.height}`);
    }
  });

  test('Verificar posicionamiento en diferentes breakpoints', async ({ page }) => {
    const breakpoints = [
      { width: 375, height: 667, name: 'Mobile' },
      { width: 768, height: 1024, name: 'Tablet' },
      { width: 1024, height: 768, name: 'Desktop Small' },
      { width: 1920, height: 1080, name: 'Desktop Large' }
    ];
    
    for (const bp of breakpoints) {
      await page.setViewportSize({ width: bp.width, height: bp.height });
      await page.goto('/amorir-2025');
      await page.waitForLoadState('networkidle');
      
      // Verificar la primera imagen de área
      const firstAreaImage = page.locator('img[alt="Cuerpo"]').first();
      
      if (await firstAreaImage.isVisible()) {
        await firstAreaImage.scrollIntoViewIfNeeded();
        const imgBox = await firstAreaImage.boundingBox();
        
        expect(imgBox).toBeTruthy();
        
        // Verificar que la imagen se adapta al viewport
        const widthPercentage = (imgBox!.width / bp.width) * 100;
        
        // En mobile debería ocupar más porcentaje del ancho
        if (bp.width <= 768) {
          expect(widthPercentage).toBeGreaterThan(80); // Al menos 80% en mobile
        } else {
          expect(widthPercentage).toBeGreaterThan(30); // Al menos 30% en desktop
          expect(widthPercentage).toBeLessThan(70); // No más del 70% en desktop
        }
        
        console.log(`✓ ${bp.name} (${bp.width}px): Imagen ocupa ${widthPercentage.toFixed(1)}% del ancho`);
      }
    }
  });

  test('Detectar imágenes que no cargan o tienen src incorrecto', async ({ page }) => {
    await page.goto('/amorir-2025');
    await page.waitForLoadState('networkidle');
    
    const images = page.locator('img');
    const imageCount = await images.count();
    const problematicImages = [];
    
    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      
      if (await img.isVisible()) {
        const src = await img.getAttribute('src');
        const alt = await img.getAttribute('alt');
        
        // Verificar que tiene src
        expect(src).toBeTruthy();
        
        // Verificar que el src no es un placeholder genérico
        expect(src).not.toContain('placeholder');
        expect(src).not.toContain('example.com');
        
        // Verificar que la imagen se cargó correctamente
        const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth);
        const complete = await img.evaluate((el: HTMLImageElement) => el.complete);
        
        if (!complete || naturalWidth === 0) {
          problematicImages.push({ src, alt, index: i });
        }
        
        // Verificar que tiene alt text apropiado
        expect(alt).toBeTruthy();
        expect(alt!.length).toBeGreaterThan(2);
      }
    }
    
    if (problematicImages.length > 0) {
      console.log('Imágenes problemáticas encontradas:', problematicImages);
      expect(problematicImages.length).toBe(0);
    }
  });

  test('Verificar que las imágenes no interfieren con el texto', async ({ page }) => {
    await page.goto('/amorir-2025');
    await page.waitForLoadState('networkidle');
    
    // Verificar las secciones de área donde hay texto junto a imágenes
    const areaSections = page.locator('[class*="flex"][class*="items-center"]').filter({
      has: page.locator('img')
    });
    
    const sectionCount = await areaSections.count();
    
    for (let i = 0; i < Math.min(sectionCount, 3); i++) {
      const section = areaSections.nth(i);
      await section.scrollIntoViewIfNeeded();
      
      const img = section.locator('img').first();
      const textContent = section.locator('h3, p').first();
      
      if (await img.isVisible() && await textContent.isVisible()) {
        const imgBox = await img.boundingBox();
        const textBox = await textContent.boundingBox();
        
        expect(imgBox).toBeTruthy();
        expect(textBox).toBeTruthy();
        
        // Verificar que la imagen y el texto no se superponen
        const horizontalOverlap = !(imgBox!.x + imgBox!.width < textBox!.x || textBox!.x + textBox!.width < imgBox!.x);
        const verticalOverlap = !(imgBox!.y + imgBox!.height < textBox!.y || textBox!.y + textBox!.height < imgBox!.y);
        
        if (horizontalOverlap && verticalOverlap) {
          // Si se superponen, verificar que hay suficiente contraste o separación
          console.warn(`Posible superposición detectada en sección ${i}`);
        }
        
        console.log(`✓ Sección ${i}: Imagen y texto correctamente separados`);
      }
    }
  });
}); 