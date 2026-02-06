import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

console.log('Script started');

const cwd = process.cwd();
console.log('CWD:', cwd);

const inputPath = path.join(cwd, 'source/img/logo.png');
const outputPath = path.join(cwd, 'source/img/favicon.png');

console.log('Input path:', inputPath);
console.log('Output path:', outputPath);

async function cropFavicon() {
  try {
    if (!fs.existsSync(inputPath)) {
      console.error('Error: Input file does not exist at ' + inputPath);
      process.exit(1);
    }

    console.log('Loading image...');
    const image = sharp(inputPath);
    const metadata = await image.metadata();

    if (!metadata.width || !metadata.height) {
      throw new Error('Cannot get image metadata');
    }

    const cropWidth = Math.floor(metadata.width * 0.8);
    const cropHeight = Math.floor(metadata.height * 0.8);

    console.log(`Original size: ${metadata.width}x${metadata.height}`);
    console.log(`Cropping to: ${cropWidth}x${cropHeight}`);

    await image
      .extract({ left: 0, top: 0, width: cropWidth, height: cropHeight })
      .toFile(outputPath);

    console.log('Favicon cropped and saved successfully.');
  } catch (error) {
    console.error('Error processing image:', error);
    process.exit(1);
  }
}

cropFavicon();
