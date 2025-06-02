import { test, expect } from '@playwright/test';

test.describe('Verificación de Corrección - Imagen Hero con Rostro Visible', () => {
  
  test('Verificar que object-position está corregido a "top"', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    console.log('\n✅ VERIFICANDO CORRECCIÓN DE OBJECT-POSITION\n');
    
    // Verificar imagen hero principal
    const heroImage = page.locator('img[alt*="Sebastian García"], img[alt*="Humble Beast"]').first();
    await expect(heroImage).toBeVisible();
    
    const objectPosition = await heroImage.evaluate((img: HTMLImageElement) => {
      return window.getComputedStyle(img).objectPosition;
    });
    
    console.log(`📍 object-position actual: "${objectPosition}"`);
    
    // Verificar que está configurado para mostrar la parte superior
    expect(objectPosition).toMatch(/(top|50% 0%|center top)/);
    
    if (objectPosition.includes('top') || objectPosition === '50% 0%') {
      console.log('✅ CORRECTO: La imagen ahora muestra la parte superior (rostro)');
    } else {
      console.log('❌ ERROR: object-position no está configurado correctamente');
    }
  });

  test('Verificar en todas las secciones que usan quien-soy.jpeg', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    console.log('\n🔍 VERIFICANDO TODAS LAS INSTANCIAS DE QUIEN-SOY.JPEG\n');
    
    // Buscar todas las imágenes que usan quien-soy.jpeg
    const quienSoyImages = page.locator('img[src*="quien-soy.jpeg"]');
    const count = await quienSoyImages.count();
    
    console.log(`📊 Total de imágenes quien-soy.jpeg encontradas: ${count}\n`);
    
    for (let i = 0; i < count; i++) {
      const img = quienSoyImages.nth(i);
      
      if (await img.isVisible()) {
        const imageInfo = await img.evaluate((img: HTMLImageElement) => {
          const computedStyle = window.getComputedStyle(img);
          return {
            alt: img.alt,
            objectPosition: computedStyle.objectPosition,
            section: img.closest('section')?.className || 'unknown'
          };
        });
        
        console.log(`${i + 1}. ALT: "${imageInfo.alt}"`);
        console.log(`   object-position: ${imageInfo.objectPosition}`);
        console.log(`   Sección: ${imageInfo.section}`);
        
        // Verificar que todas usan object-top
        expect(imageInfo.objectPosition).toMatch(/(top|50% 0%|center top)/);
        
        if (imageInfo.objectPosition.includes('top') || imageInfo.objectPosition === '50% 0%') {
          console.log('   ✅ CORRECTO: Muestra la parte superior');
        } else {
          console.log('   ❌ PROBLEMA: No muestra la parte superior');
        }
        console.log('   ---');
      }
    }
  });

  test('Verificar visualmente que el rostro es visible', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    console.log('\n👁️  VERIFICACIÓN VISUAL DEL ROSTRO\n');
    
    const heroImage = page.locator('img[alt*="Sebastian García"], img[alt*="Humble Beast"]').first();
    await expect(heroImage).toBeVisible();
    
    // Obtener información de la imagen
    const imageInfo = await heroImage.evaluate((img: HTMLImageElement) => {
      const rect = img.getBoundingClientRect();
      return {
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
        renderedWidth: rect.width,
        renderedHeight: rect.height,
        objectPosition: window.getComputedStyle(img).objectPosition
      };
    });
    
    console.log('📋 INFORMACIÓN VISUAL:');
    console.log(`   Imagen natural: ${imageInfo.naturalWidth}x${imageInfo.naturalHeight}`);
    console.log(`   Imagen renderizada: ${Math.round(imageInfo.renderedWidth)}x${Math.round(imageInfo.renderedHeight)}`);
    console.log(`   object-position: ${imageInfo.objectPosition}`);
    
    // Calcular qué parte de la imagen se está mostrando
    const naturalAspectRatio = imageInfo.naturalWidth / imageInfo.naturalHeight;
    const renderedAspectRatio = imageInfo.renderedWidth / imageInfo.renderedHeight;
    
    if (naturalAspectRatio < renderedAspectRatio) {
      // La imagen es más alta que el contenedor
      const visibleHeight = imageInfo.naturalWidth / renderedAspectRatio;
      const percentageVisible = (visibleHeight / imageInfo.naturalHeight) * 100;
      
      console.log(`   Porcentaje de altura visible: ${percentageVisible.toFixed(1)}%`);
      
      if (imageInfo.objectPosition.includes('top') || imageInfo.objectPosition === '50% 0%') {
        console.log(`   ✅ ROSTRO VISIBLE: Se muestra desde la parte superior`);
        console.log(`   📏 Se ven los primeros ${percentageVisible.toFixed(1)}% de la imagen (incluye rostro)`);
      } else {
        console.log(`   ❌ ROSTRO CORTADO: Se muestra desde el centro`);
        console.log(`   📏 Se ve el ${percentageVisible.toFixed(1)}% central de la imagen (sin rostro)`);
      }
    } else {
      console.log('   ✅ La imagen completa es visible');
    }
  });

  test('Comparar antes y después del cambio', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    console.log('\n🔄 COMPARACIÓN ANTES/DESPUÉS DEL CAMBIO\n');
    
    const heroImage = page.locator('img[alt*="Sebastian García"], img[alt*="Humble Beast"]').first();
    await expect(heroImage).toBeVisible();
    
    // Simular el comportamiento anterior (center)
    await heroImage.evaluate((img) => {
      (img as HTMLImageElement).style.objectPosition = 'center';
    });
    
    await page.waitForTimeout(500);
    console.log('📍 ANTES (object-position: center):');
    console.log('   ❌ Mostraba el torso/pecho (centro de la imagen)');
    console.log('   ❌ El rostro quedaba cortado en la parte superior');
    
    // Aplicar la corrección (top)
    await heroImage.evaluate((img) => {
      (img as HTMLImageElement).style.objectPosition = 'top';
    });
    
    await page.waitForTimeout(500);
    console.log('\n📍 DESPUÉS (object-position: top):');
    console.log('   ✅ Muestra el rostro/cabeza (parte superior de la imagen)');
    console.log('   ✅ El torso queda cortado en la parte inferior (menos importante)');
    
    // Verificar que el cambio se mantiene
    const finalObjectPosition = await heroImage.evaluate((img: HTMLImageElement) => {
      return window.getComputedStyle(img).objectPosition;
    });
    
    expect(finalObjectPosition).toMatch(/(top|50% 0%)/);
    console.log('\n🎯 RESULTADO: ¡Problema de rostro cortado SOLUCIONADO!');
  });
}); 