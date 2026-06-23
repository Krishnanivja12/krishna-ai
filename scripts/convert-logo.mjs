import sharp from 'sharp'

// Convert KN logo: remove black background, keep white KN mark
await sharp('public/kn-logo.jpg')
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true })
  .then(({ data, info }) => {
    const { width, height, channels } = info
    // Make black pixels transparent
    for (let i = 0; i < data.length; i += channels) {
      const r = data[i], g = data[i + 1], b = data[i + 2]
      const brightness = (r + g + b) / 3
      if (brightness < 60) {
        data[i + 3] = 0 // transparent
      }
    }
    return sharp(data, { raw: { width, height, channels } })
      .png()
      .toFile('public/kn-logo.png')
  })

console.log('Done → public/kn-logo.png')
