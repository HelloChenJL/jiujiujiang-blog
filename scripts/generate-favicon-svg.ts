import fs from 'fs';
import path from 'path';

const inputPath = path.join(process.cwd(), 'source/img/logo.png');
const outputPath = path.join(process.cwd(), 'source/img/favicon.svg');

try {
  if (!fs.existsSync(inputPath)) {
    console.error('Error: source/img/logo.png does not exist.');
    process.exit(1);
  }

  const imageBuffer = fs.readFileSync(inputPath);
  const base64Image = imageBuffer.toString('base64');
  const mimeType = 'image/png';

  // viewBox="10 0 80 80" -> Shift the viewbox to the right by 10 units
  // This effectively moves the image to the left within the frame
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="10 0 80 80">
  <image href="data:${mimeType};base64,${base64Image}" width="100" height="100" x="0" y="0" />
</svg>`;

  fs.writeFileSync(outputPath, svgContent);
  console.log('Favicon SVG updated at:', outputPath);
} catch (error) {
  console.error('Error generating SVG:', error);
  process.exit(1);
}
