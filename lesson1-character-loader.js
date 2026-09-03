/* ATHAR Lesson 1 — production companion asset decoder.
   Keeps the approved character artwork in repository text assets while
   converting it to a real browser Blob URL before assigning <img>. */
(() => {
  const objectUrls = new Set();

  function decodeBase64ToBlob(base64, mime = 'image/webp') {
    const clean = base64.replace(/\s+/g, '');
    const binary = atob(clean);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
    return new Blob([bytes], { type: mime });
  }

  async function productionLoadCompanion() {
    if (state.companion === 'none') return;
    const path = state.companion === 'hamdan'
      ? 'assets/hamdan/hamdan_full_body.b64'
      : 'assets/hessa/hessa_full_body.b64';

    try {
      const response = await fetch(path, { cache: 'force-cache' });
      if (!response.ok) throw new Error(`Character asset HTTP ${response.status}`);
      const base64 = (await response.text()).trim();
      if (!base64) throw new Error('Character asset is empty');

      const blob = decodeBase64ToBlob(base64);
      const url = URL.createObjectURL(blob);
      objectUrls.add(url);

      const images = $$('#stageCompanion,#companionImage');
      await Promise.all(images.map(async (img) => {
        img.src = url;
        if (typeof img.decode === 'function') await img.decode();
        if (!img.naturalWidth || !img.naturalHeight) throw new Error('Character image failed to decode');
      }));
    } catch (error) {
      console.error('[ATHAR] Companion asset failed to load', error);
    }
  }

  // Replace the original data-URL loader with the production decoder.
  window.loadCompanion = productionLoadCompanion;

  window.addEventListener('pagehide', () => {
    objectUrls.forEach((url) => URL.revokeObjectURL(url));
    objectUrls.clear();
  });
})();
