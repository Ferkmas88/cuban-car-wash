import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "../public/images");
mkdirSync(publicDir, { recursive: true });

const API_KEY = "AIzaSyByp50ymLKJ7VaG0LjKuPCnIOHNUYPUOaU";
const MODEL = "imagen-4.0-fast-generate-001";

const images = [
  {
    name: "hero",
    ratio: "16:9",
    prompt: "ultra cinematic luxury car wash commercial scene, black luxury sedan covered in thick white foam, Las Vegas neon lights reflecting on glossy paint, dramatic reflections, water dripping, cinematic lighting, ultra photorealistic automotive commercial photography, no text",
  },
  {
    name: "svc-lavado",
    ratio: "4:3",
    prompt: "luxury car being washed with pressure foam, dramatic lighting reflections on glossy black paint, cinematic automotive detailing photography, no text",
  },
  {
    name: "svc-espuma",
    ratio: "4:3",
    prompt: "dense foam cannon covering luxury car with thick white foam, cinematic reflections, high contrast detailing studio, photorealistic, no text",
  },
  {
    name: "svc-interior",
    ratio: "4:3",
    prompt: "luxury car interior detailing leather seats cleaning microfiber cloth, premium automotive studio lighting, photorealistic, no text",
  },
  {
    name: "svc-pulido",
    ratio: "4:3",
    prompt: "machine polishing luxury car paint mirror reflections detailing studio lights, professional paint correction, photorealistic, no text",
  },
  {
    name: "svc-ceramic",
    ratio: "4:3",
    prompt: "ceramic coating application water droplets beading on luxury car paint dramatic reflections, photorealistic premium, no text",
  },
  {
    name: "svc-clay",
    ratio: "4:3",
    prompt: "professional clay bar treatment luxury car paint detailing studio environment, photorealistic, no text",
  },
  {
    name: "vegas",
    ratio: "16:9",
    prompt: "luxury car reflecting Las Vegas neon lights at night, cinematic automotive photography, dramatic city reflections on glossy black paint, ultra photorealistic, no text",
  },
  {
    name: "after",
    ratio: "16:9",
    prompt: "luxury black SUV mirror finish reflections detailing studio lights, cinematic photography, ultra glossy paint, photorealistic premium result, no text",
  },
  {
    name: "before",
    ratio: "16:9",
    prompt: "dirty neglected car with dull faded paint, dust and grime, before professional detailing treatment, realistic photo, no text",
  },
  {
    name: "gallery-1",
    ratio: "4:3",
    prompt: "luxury black car extreme glossy reflections detailing studio lights, cinematic premium, photorealistic, no text",
  },
  {
    name: "gallery-2",
    ratio: "4:3",
    prompt: "foam cannon covering luxury sports car cinematic shot, thick white foam, dramatic lighting, photorealistic, no text",
  },
  {
    name: "gallery-3",
    ratio: "4:3",
    prompt: "luxury interior detailing leather cleaning premium lighting, spotless car interior, photorealistic, no text",
  },
  {
    name: "gallery-4",
    ratio: "4:3",
    prompt: "mirror finish luxury car paint reflecting studio lights, extreme gloss, water beads, premium detailing result, photorealistic, no text",
  },
];

async function generate(prompt, ratio) {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:predict?key=${API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        instances: [{ prompt }],
        parameters: { sampleCount: 1, aspectRatio: ratio },
      }),
    }
  );
  const text = await res.text();
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${text.slice(0, 300)}`);
  const data = JSON.parse(text);
  const b64 = data.predictions?.[0]?.bytesBase64Encoded;
  if (!b64) throw new Error("No image: " + text.slice(0, 200));
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
}
console.log("\nDone!");
