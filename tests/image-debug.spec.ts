import { test, expect } from '@playwright/test';

test.describe('Debug de Imágenes - Diagnóstico Específico', () => {
  
  test('Verificar qué imágenes están realmente en la página', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Obtener TODAS las imágenes y sus atributos
    const allImages = await page.locator('img').all();
    
    console.log(`\n📊 TOTAL DE IMÁGENES ENCONTRADAS: ${allImages.length}\n`);
    
    for (let i = 0; i < allImages.length; i++) {
      const img = allImages[i];
      const src = await img.getAttribute('src');
      const alt = await img.getAttribute('alt');
      const isVisible = await img.isVisible();
      
      console.log(`${i + 1}. SRC: ${src}`);
      console.log(`   ALT: "${alt}"`);
      console.log(`   VISIBLE: ${isVisible}`);
      console.log(`   ---`);
    }
  });

  test('Verificar carga específica de imágenes problemáticas', async ({ page }) => {
    await page.goto('/amorir-2025');
    await page.waitForLoadState('networkidle');
    
    // Lista de imágenes que deberían estar
    const expectedImages = ['cuerpo.jpg', 'mente.jpg', 'trabajo.jpg', 'relaciones.jpg', 'dinero.jpg', 'productividad.jpg', 'legado.jpg'];
    
    for (const imageName of expectedImages) {
      console.log(`\n🔍 Verificando: ${imageName}`);
      
      // Buscar por src que contenga el nombre de la imagen
      const imgBySrc = page.locator(`img[src*="${imageName}"]`);
      const countBySrc = await imgBySrc.count();
      
      console.log(`   Encontradas por SRC: ${countBySrc}`);
      
      if (countBySrc > 0) {
        const firstImg = imgBySrc.first();
        const src = await firstImg.getAttribute('src');
        const alt = await firstImg.getAttribute('alt');
        const isVisible = await firstImg.isVisible();
        
        // Verificar si la imagen se cargó correctamente
        const naturalWidth = await firstImg.evaluate((el: HTMLImageElement) => el.naturalWidth);
        const complete = await firstImg.evaluate((el: HTMLImageElement) => el.complete);
        
        console.log(`   SRC completo: ${src}`);
        console.log(`   ALT: "${alt}"`);
        console.log(`   VISIBLE: ${isVisible}`);
        console.log(`   CARGADA: ${complete}`);
        console.log(`   ANCHO NATURAL: ${naturalWidth}px`);
        
        if (!complete || naturalWidth === 0) {
          console.log(`   ❌ PROBLEMA: Imagen no se cargó correctamente`);
        } else {
          console.log(`   ✅ OK: Imagen cargada correctamente`);
        }
      } else {
        console.log(`   ❌ NO ENCONTRADA en el DOM`);
      }
    }
  });

  test('Verificar el logo del header específicamente', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    console.log('\n🔍 BUSCANDO LOGO DEL HEADER...\n');
    
    // Buscar de diferentes maneras
    const logoByAlt = page.locator('img[alt="Te Vas A Morir"]');
    const logoByClass = page.locator('header img');
    const logoByPath = page.locator('img[src*="skull-logo"]');
    
    console.log(`Por ALT "Te Vas A Morir": ${await logoByAlt.count()}`);
    console.log(`Por selector "header img": ${await logoByClass.count()}`);
    console.log(`Por SRC "skull-logo": ${await logoByPath.count()}`);
    
    // Si encontramos alguno, mostrar detalles
    if (await logoByClass.count() > 0) {
      const logo = logoByClass.first();
      const src = await logo.getAttribute('src');
      const alt = await logo.getAttribute('alt');
      const width = await logo.getAttribute('width');
      const height = await logo.getAttribute('height');
      
      console.log(`\n📋 DETALLES DEL LOGO ENCONTRADO:`);
      console.log(`   SRC: ${src}`);
      console.log(`   ALT: "${alt}"`);
      console.log(`   WIDTH: ${width}`);
      console.log(`   HEIGHT: ${height}`);
    }
  });

  test('Verificar URLs de Next.js Image', async ({ page }) => {
    await page.goto('/amorir-2025');
    await page.waitForLoadState('networkidle');
    
    console.log('\n🔍 VERIFICANDO URLs DE NEXT.JS IMAGE...\n');
    
    // Obtener todas las imágenes que usan Next.js Image (tienen _next/image en el src)
    const nextImages = page.locator('img[src*="_next/image"]');
    const count = await nextImages.count();
    
    console.log(`Total de imágenes Next.js encontradas: ${count}\n`);
    
    for (let i = 0; i < count; i++) {
      const img = nextImages.nth(i);
      const src = await img.getAttribute('src');
      const alt = await img.getAttribute('alt');
      
      console.log(`${i + 1}. ALT: "${alt}"`);
      console.log(`   URL: ${src}`);
      
      // Intentar hacer una petición a la URL para ver si responde
      try {
        const response = await page.request.get(src!);
        console.log(`   STATUS: ${response.status()}`);
        
        if (response.status() !== 200) {
          console.log(`   ❌ ERROR: La imagen no se puede cargar`);
        } else {
          console.log(`   ✅ OK: Imagen accesible`);
        }
      } catch (error) {
        console.log(`   ❌ ERROR DE RED: ${error}`);
      }
      
      console.log(`   ---`);
    }
  });

  test('Verificar tamaños y performance de imágenes', async ({ page }) => {
    await page.goto('/amorir-2025');
    await page.waitForLoadState('networkidle');
    
    console.log('\n📊 ANÁLISIS DE TAMAÑOS Y PERFORMANCE...\n');
    
    const images = page.locator('img[src*="_next/image"]');
    const count = await images.count();
    
    for (let i = 0; i < Math.min(count, 5); i++) { // Limitar a 5 para no saturar
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      const src = await img.getAttribute('src');
      
      if (await img.isVisible()) {
        await img.scrollIntoViewIfNeeded();
        
        const box = await img.boundingBox();
        const naturalDimensions = await img.evaluate((el: HTMLImageElement) => ({
          naturalWidth: el.naturalWidth,
          naturalHeight: el.naturalHeight,
          complete: el.complete
        }));
        
        console.log(`🖼️  "${alt}"`);
        console.log(`   Renderizada: ${box?.width}x${box?.height}`);
        console.log(`   Natural: ${naturalDimensions.naturalWidth}x${naturalDimensions.naturalHeight}`);
        console.log(`   Completa: ${naturalDimensions.complete}`);
        
        if (naturalDimensions.naturalWidth > 0 && box) {
          const scaleX = box.width / naturalDimensions.naturalWidth;
          const scaleY = box.height / naturalDimensions.naturalHeight;
          console.log(`   Escala: X=${scaleX.toFixed(2)}, Y=${scaleY.toFixed(2)}`);
          
          if (scaleX > 1.5 || scaleY > 1.5) {
            console.log(`   ⚠️  ADVERTENCIA: Imagen escalada hacia arriba (posible pixelación)`);
          }
          if (scaleX < 0.3 || scaleY < 0.3) {
            console.log(`   ⚠️  ADVERTENCIA: Imagen muy grande para el tamaño renderizado`);
          }
        }
        
        console.log(`   ---`);
      }
    }
  });

  test('Test de conectividad básica', async ({ page }) => {
    console.log('\n🌐 VERIFICANDO CONECTIVIDAD BÁSICA...\n');
    
    // Verificar que el servidor responde
    const response = await page.request.get('/');
    console.log(`Servidor principal: ${response.status()}`);
    
    // Verificar acceso directo a una imagen
    const imageResponse = await page.request.get('/images/skull-logo.svg');
    console.log(`Imagen directa (skull-logo.svg): ${imageResponse.status()}`);
    
    // Verificar una imagen grande
    const largeImageResponse = await page.request.get('/images/cuerpo.jpg');
    console.log(`Imagen grande (cuerpo.jpg): ${largeImageResponse.status()}`);
    
    expect(response.status()).toBe(200);
    expect(imageResponse.status()).toBe(200);
    expect(largeImageResponse.status()).toBe(200);
  });
}); 