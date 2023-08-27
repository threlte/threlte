import { expect, test } from '@playwright/test'

/**
 * This test will make sure that the `<canvas>` element created by `<Canvas>` is
 * resized according to its parent element.
 */
test('basics/viewport-resize', async ({ page }) => {
  await page.setViewportSize({
    width: 600,
    height: 600
  })
  await page.waitForTimeout(500)

  await page.goto('basics/viewport-resize')
  const bbox = await page.locator('canvas').boundingBox()
  expect(bbox?.height).toBe(600)
  expect(bbox?.width).toBe(600)

  await page.locator('#parent').evaluate((el) => {
    el.style.width = '300px'
    el.style.height = '300px'
  })

  await page.waitForTimeout(500)
  const bbox2 = await page.locator('canvas').boundingBox()
  expect(bbox2?.height).toBe(300)
  expect(bbox2?.width).toBe(300)
})
