import { test, expect } from '@playwright/test';

test.describe('Diagnóstico de Imagen Hero - Problema de Rostro Cortado', () => {
  
  test('Verificar posicionamiento actual de imagen hero', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    console.log('\n🔍 DIAGNÓSTICO DE IMAGEN HERO - PROBLEMA DE ROSTRO CORTADO\n');
    
    // Encontrar la imagen hero
    const heroImage = page.locator('img[alt*="Sebastian García"], img[alt*="Humble Beast"]').first();
    await expect(heroImage).toBeVisible();
    
    // Obtener información detallada
    const imageInfo = await heroImage.evaluate((img: HTMLImageElement) => {
      const computedStyle = window.getComputedStyle(img);
      return {
        src: img.src,
        alt: img.alt,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
        objectFit: computedStyle.objectFit,
        objectPosition: computedStyle.objectPosition,
        width: img.offsetWidth,
        height: img.offsetHeight
      };
    });
    
    console.log('📋 INFORMACIÓN DE LA IMAGEN HERO:');
    console.log(`   SRC: ${imageInfo.src}`);
    console.log(`   ALT: "${imageInfo.alt}"`);
    console.log(`   Dimensiones naturales: ${imageInfo.naturalWidth}x${imageInfo.naturalHeight}`);
    console.log(`   Dimensiones renderizadas: ${imageInfo.width}x${imageInfo.height}`);
    console.log(`   object-fit: ${imageInfo.objectFit}`);
    console.log(`   object-position: ${imageInfo.objectPosition}`);
    
    // Calcular aspect ratios
    const naturalAspectRatio = imageInfo.naturalWidth / imageInfo.naturalHeight;
    const renderedAspectRatio = imageInfo.width / imageInfo.height;
    
    console.log(`   Aspect ratio natural: ${naturalAspectRatio.toFixed(2)}`);
    console.log(`   Aspect ratio renderizado: ${renderedAspectRatio.toFixed(2)}`);
    
    // Verificar si la imagen está siendo cortada
    if (naturalAspectRatio > renderedAspectRatio) {
      console.log('   ⚠️  PROBLEMA: La imagen es más ancha que el contenedor - se cortan los lados');
    } else if (naturalAspectRatio < renderedAspectRatio) {
      console.log('   ⚠️  PROBLEMA: La imagen es más alta que el contenedor - se corta arriba/abajo');
      console.log('   🎯 SOLUCIÓN: Cambiar object-position a "top" para mostrar la cabeza');
    } else {
      console.log('   ✅ OK: Los aspect ratios coinciden');
    }
    
    // Verificar el contenedor padre
    const containerInfo = await heroImage.evaluate((img) => {
      const container = img.parentElement;
      if (container) {
        const computedStyle = window.getComputedStyle(container);
        return {
          width: container.offsetWidth,
          height: container.offsetHeight,
          position: computedStyle.position,
          overflow: computedStyle.overflow
        };
      }
      return null;
    });
    
    if (containerInfo) {
      console.log(`\n📦 INFORMACIÓN DEL CONTENEDOR:`);
      console.log(`   Dimensiones: ${containerInfo.width}x${containerInfo.height}`);
      console.log(`   Position: ${containerInfo.position}`);
      console.log(`   Overflow: ${containerInfo.overflow}`);
    }
  });

  test('Simular diferentes object-position values', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const heroImage = page.locator('img[alt*="Sebastian García"], img[alt*="Humble Beast"]').first();
    await expect(heroImage).toBeVisible();
    
    console.log('\n🧪 SIMULANDO DIFERENTES OBJECT-POSITION VALUES:\n');
    
    const positions = [
      'center',      // Actual
      'top',         // Para mostrar la cabeza
      'top center',  // Centrado horizontalmente, arriba verticalmente
      '50% 25%',     // Centrado horizontalmente, 25% desde arriba
      '50% 20%'      // Centrado horizontalmente, 20% desde arriba
    ];
    
    for (const position of positions) {
      // Cambiar el object-position temporalmente
      await heroImage.evaluate((img, pos) => {
        (img as HTMLImageElement).style.objectPosition = pos;
      }, position);
      
      await page.waitForTimeout(500); // Esperar a que se aplique el cambio
      
      console.log(`📍 object-position: "${position}"`);
      console.log(`   Aplicado temporalmente para visualización`);
      
      // Tomar screenshot para comparación visual (opcional)
      // await page.screenshot({ path: `hero-position-${position.replace(/\s+/g, '-')}.png` });
    }
    
    console.log('\n💡 RECOMENDACIÓN:');
    console.log('   Cambiar object-position de "center" a "top" o "top center"');
    console.log('   Esto mostrará la cabeza/rostro en lugar del torso');
  });

  test('Verificar en diferentes viewports', async ({ page }) => {
    const viewports = [
      { width: 375, height: 667, name: 'Mobile' },
      { width: 768, height: 1024, name: 'Tablet' },
      { width: 1920, height: 1080, name: 'Desktop' }
    ];
    
    console.log('\n📱 VERIFICANDO EN DIFERENTES VIEWPORTS:\n');
    
    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      const heroImage = page.locator('img[alt*="Sebastian García"], img[alt*="Humble Beast"]').first();
      await expect(heroImage).toBeVisible();
      
      const imageInfo = await heroImage.evaluate((img: HTMLImageElement) => ({
        width: img.offsetWidth,
        height: img.offsetHeight,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight
      }));
      
      const renderedAspectRatio = imageInfo.width / imageInfo.height;
      const naturalAspectRatio = imageInfo.naturalWidth / imageInfo.naturalHeight;
      
      console.log(`📱 ${viewport.name} (${viewport.width}x${viewport.height}):`);
      console.log(`   Imagen renderizada: ${imageInfo.width}x${imageInfo.height}`);
      console.log(`   Aspect ratio: ${renderedAspectRatio.toFixed(2)}`);
      
      if (naturalAspectRatio < renderedAspectRatio) {
        console.log(`   ⚠️  PROBLEMA: Se corta arriba/abajo en ${viewport.name}`);
      } else {
        console.log(`   ✅ OK: No se corta en ${viewport.name}`);
      }
    }
  });
}); 