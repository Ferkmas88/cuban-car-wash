import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "../public/images");
mkdirSync(publicDir, { recursive: true });

const API_KEY = "AIzaSyByp50ymLKJ7VaG0LjKuPCnIOHNUYPUOaU";
const MODEL = "imagen-4.0-fast-generate-001";

const images = [
  { name: "gallery-2", ratio: "4:3", prompt: "foam cannon covering luxury sports car cinematic shot, thick white foam, dramatic lighting, photorealistic, no text" },
  { name: "gallery-3", ratio: "4:3", prompt: "luxury interior detailing leather cleaning premium lighting, spotless car interior, photorealistic, no text" },
  { name: "gallery-4", ratio: "4:3", prompt: "mirror finish luxury car paint reflecting studio lights, extreme gloss, water beads, premium detailing result, photorealistic, no text" },
];

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function generate(prompt, ratio) {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:predict?key=${API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ instances: [{ prompt }], parameters: { sampleCount: 1, aspectRatio: ratio } }),
    }
  );
  const text = await res.text();
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${text.slice(0, 200)}`);
  const b64 = JSON.parse(text).predictions?.[0]?.bytesBase64Encoded;
  if (!b64) throw new Error("No image");
  return b64;
}

for (const img of images) {
  console.log(`Generating: ${img.name}...`);
  try {
    const b64 = await generate(img.prompt, img.ratio);
    writeFileSync(join(publicDir, `${img.name}.png`), Buffer.from(b64, "base64"));
    console.log(`  ✓ ${img.name}.png`);
  } catch (err) {
    console.error(`  ✗ ${img.name}:`, err.message);
  }
  await sleep(5000); // 5s entre llamadas para evitar rate limit
}
console.log("Done!");
