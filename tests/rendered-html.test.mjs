import assert from "node:assert/strict";
import test from "node:test";

test("renders production metadata and optimized portfolio media", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  const html = await response.text();
  assert.doesNotMatch(html, /name=["']codex-preview["']/i);
  assert.doesNotMatch(html, /chatgpt\.site/i);
  assert.match(html, /property=["']og:title["']/i);
  assert.match(html, /src=["']\/images\/profile\/engineer-portrait\.webp["']/i);
  assert.match(html, /QueueVision AI — monitoring de files d’attente/i);
  assert.match(html, /raw\.githubusercontent\.com\/Korotaa\/queue-monitoring\/main\/docs\/screenshots\/01-dashboard-overview\.png/i);
  assert.match(html, /Testeur automatique de faisceaux électriques/i);
  assert.match(html, /Carte de relais pilotée par USB/i);
  assert.match(html, /src=["']\/images\/companies\/plastima\.png["']/i);
  assert.match(html, /src=["']\/images\/companies\/integral-systems-design\.png["']/i);
  assert.match(html, /src=["']\/images\/companies\/siger-lab\.png["']/i);
  assert.match(html, /src=["']\/images\/companies\/expleo\.svg["']/i);
  assert.match(html, /src=["']\/images\/social\/github\.svg["']/i);
  assert.match(html, /src=["']\/images\/social\/gitlab\.svg["']/i);
  assert.match(html, /src=["']\/images\/social\/linkedin\.svg["']/i);
  assert.match(html, /src=["']\/images\/social\/orcid\.svg["']/i);
  assert.match(html, /orcid\.org\/0009-0009-7842-3365/i);
  assert.match(html, /Expertises clés/i);
  assert.doesNotMatch(html, /Compétences techniques|Technologies maîtrisées sur l’ensemble de la chaîne/i);
  assert.match(html, /Systèmes embarqués &amp; électronique/i);
  assert.match(html, /NVIDIA DeepStream/i);
  assert.match(html, /LoRa\/LoRaWAN/i);
  assert.match(html, /Laboratoire SIGER — FST Fès/i);
  assert.match(html, /Ingénieur R&amp;D — Drones &amp; systèmes embarqués/i);
  assert.match(html, /src=["']\/images\/institutions\/ensam-casablanca\.webp["']/i);
  assert.match(html, /src=["']\/images\/institutions\/ensa-fes\.webp["']/i);
  assert.match(html, /src=["']\/images\/institutions\/fst-tanger\.webp["']/i);
  assert.doesNotMatch(html, /\/_vinext\/image\?url=%2Fimages/i);
});

test("keeps the private inbox closed without the authorized Access identity", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("access-test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const runtime = {
    ASSETS: {
      fetch: async () => new Response("Not found", { status: 404 }),
    },
  };
  const context = { waitUntil() {}, passThroughOnException() {} };

  const anonymousResponse = await worker.fetch(
    new Request("http://localhost/messages", {
      headers: { accept: "text/html" },
    }),
    runtime,
    context,
  );
  assert.equal(anonymousResponse.status, 404);

  const nonOwnerResponse = await worker.fetch(
    new Request("http://localhost/messages", {
      headers: {
        accept: "text/html",
        "cf-access-jwt-assertion": "not-a-valid-owner-assertion",
        "cf-access-authenticated-user-email": "intrus@example.com",
      },
    }),
    runtime,
    context,
  );
  assert.equal(nonOwnerResponse.status, 404);
});

test("renders QueueVision AI with its public source, demo, and project evidence", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("queuevision-test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const response = await worker.fetch(
    new Request("http://localhost/projets/queue-monitoring-edge-ai", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /QueueVision AI — monitoring de files d’attente/i);
  assert.match(html, /https:\/\/github\.com\/Korotaa\/queue-monitoring/i);
  assert.match(html, /https:\/\/youtu\.be\/xmGMBkxRDmM/i);
  assert.match(html, /03-rest-api-status\.png/i);
});

test("renders the about profile with its professional portrait", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("about-test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("http://localhost/a-propos", {
      headers: { accept: "text/html" },
    }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );

  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /class=["'][^"']*about-portrait[^"']*["']/i);
  assert.match(html, /src=["']\/images\/profile\/engineer-portrait\.webp["']/i);
  assert.match(html, /Comprendre le système complet avant d’optimiser chaque brique/i);
});

test("renders an extracted portfolio project with its real media and source link", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("project-test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("http://localhost/projets/iot-luxmetre-lora", {
      headers: { accept: "text/html" },
    }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );

  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Luxmètre IoT sur carte LoRa/i);
  assert.match(html, /\/images\/projects\/iot-luxmetre-lora\/cover\.webp/i);
  assert.match(html, /\/images\/projects\/iot-luxmetre-lora\/gallery\/pcb-layout\.webp/i);
  assert.match(html, /https:\/\/github\.com\/Korotaa\/luxmetter-design_HW-PCB_SW/i);
});

test("renders verified publications with research and industrial evidence", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("publications-test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("http://localhost/publications", {
      headers: { accept: "text/html" },
    }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );

  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Synthetic data generation framework for quality control automation in gravure printing/i);
  assert.match(html, /7 533/);
  assert.match(html, /80,9 %/);
  assert.match(html, /Multi-Agent System-driven Digital Twins for predictive maintenance/i);
  assert.match(html, /https:\/\/arxiv\.org\/abs\/2607\.21873/i);
  assert.match(html, /https:\/\/doi\.org\/10\.1007\/978-3-031-77043-2_2/i);
  assert.match(html, /Copier la citation/i);
});

test("renders institution logos for every degree program", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("academy-test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("http://localhost/academie", {
      headers: { accept: "text/html" },
    }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );

  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /\/images\/institutions\/ensam-casablanca\.webp/i);
  assert.match(html, /\/images\/institutions\/ensa-fes\.webp/i);
  assert.match(html, /\/images\/institutions\/fst-tanger\.webp/i);
  assert.match(html, /https:\/\/www\.ensam-casa\.ma\//i);
  assert.match(html, /https:\/\/ensaf\.ac\.ma\//i);
  assert.match(html, /https:\/\/fstt\.ac\.ma\/Portail2023\//i);
});

test("renders an accessible contact form with explicit consent", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("contact-test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("http://localhost/contact", {
      headers: { accept: "text/html" },
    }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );

  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /name=["']consent["']/i);
  assert.match(html, /value=["']accepted["']/i);
  assert.match(html, /type=["']email["']/i);
  assert.match(html, /Envoyer le message/i);
});

test("renders a server-side English route with localized navigation and metadata", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("english-test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const response = await worker.fetch(
    new Request("http://localhost/en/a-propos", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Hands-on engineer, rigorous researcher, committed educator/i);
  assert.match(html, /Understand the complete system before optimizing each component/i);
  assert.match(html, /href=["']\/en\/projets["']/i);
  assert.match(html, /hrefLang=["']en-US["']|hreflang=["']en-US["']/i);
  assert.doesNotMatch(html, /Ingénieur de terrain, chercheur par exigence/i);
});

test("validates contact submissions before database access", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("contact-api-test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const response = await worker.fetch(
    new Request("http://localhost/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name: "Test", email: "invalid", subject: "Test", message: "A sufficiently long message", startedAt: Date.now() - 5000 }),
    }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
  assert.equal(response.status, 400);
  assert.deepEqual(await response.json(), { error: "invalid-contact-message" });
});

test("renders teaching activities extracted from the public repository", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("teaching-test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("http://localhost/enseignement", {
      headers: { accept: "text/html" },
    }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );

  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Quinze modules, de la théorie au système fonctionnel/i);
  assert.match(html, /Internet des objets &amp; systèmes embarqués/i);
  assert.match(html, /LoRa &amp; LoRaWAN pour l’IoT/i);
  assert.match(html, /IIoT, vision industrielle &amp; Edge AI/i);
  assert.match(html, /Microprocesseurs &amp; assembleur 68000/i);
  assert.match(html, /Automatique des systèmes linéaires/i);
  assert.match(html, /Automates industriels &amp; programmation Ladder/i);
  assert.match(html, /Électronique de puissance avec PSIM/i);
  assert.match(html, /Électricité &amp; composants électroniques/i);
  assert.match(html, /Électronique analogique/i);
  assert.match(html, /Électronique numérique &amp; combinatoire/i);
  assert.match(html, /Électrotechnique &amp; machines électriques/i);
  assert.match(html, /Introduction à la robotique mobile/i);
  assert.match(html, /Programmation en Python/i);
  assert.match(html, /Linux pratique &amp; scripts Shell/i);
  assert.match(html, /Une bibliothèque classée en cours, TD et TP/i);
  assert.match(html, /Accès rapide/i);
  assert.match(html, /1,7 Mo/i);
  assert.match(html, /\/documents\/enseignement\/cours\/internet-des-objets-systemes-embarques\.pdf/i);
  assert.match(html, /\/documents\/enseignement\/cours\/lora-lorawan-iot\.pptx/i);
  assert.match(html, /\/documents\/enseignement\/td\/exercices-microprocesseur-68000\.pdf/i);
  assert.match(html, /\/documents\/enseignement\/tp\/tp-initiation-esp32\.pdf/i);
  assert.match(html, /\/documents\/enseignement\/tp\/tp-initiation-raspberry-pi-4\.pdf/i);
  assert.match(html, /Activites-pedagogiques\/tree\/Activit%C3%A9s-P%C3%A9dagogiques/i);
});
