<script setup>
const media = `${import.meta.env.BASE_URL}media/field-contact/`
</script>

<template>
  <section class="field-contact-mosaic" aria-label="Robots sur le terrain et coordonnées de Pierre-Yves Lajoie">
    <figure class="field-photo field-event">
      <a :href="`${media}evenement-robots.jpg`" target="_blank" rel="noopener" aria-label="Ouvrir la photo de l’événement avec les robots">
        <img :src="`${media}evenement-robots.jpg`" alt="Photo fournie par Pierre-Yves Lajoie : présentation de robots lors d’un événement." />
      </a>
    </figure>
    <div class="field-photo-stack">
      <figure class="field-photo field-rover">
        <a :href="`${media}rover-terrain.jpeg`" target="_blank" rel="noopener" aria-label="Ouvrir la photo du rover sur le terrain">
          <img :src="`${media}rover-terrain.jpeg`" alt="Robot à roues équipé de capteurs sur un terrain sablonneux et rocheux." />
        </a>
      </figure>
      <figure class="field-photo field-drone">
        <a :href="`${media}drone-terrain.png`" target="_blank" rel="noopener" aria-label="Ouvrir la photo du drone">
          <img :src="`${media}drone-terrain.png`" alt="Drone de recherche équipé de capteurs, posé sur un terrain extérieur." />
        </a>
      </figure>
    </div>
    <aside class="field-contact-card">
      <div class="field-contact-heading">Poursuivons la discussion</div>
      <div class="field-contact-name">Pierre-Yves Lajoie</div>
      <a class="field-email" href="mailto:pierre-yves.lajoie@polymtl.ca">pierre-yves.lajoie@polymtl.ca</a>
      <div class="field-contact-bottom">
        <figure class="field-qr">
          <a href="https://www.linkedin.com/in/pierre-yves-lajoie?fromQR=1" target="_blank" rel="noopener" aria-label="Profil LinkedIn de Pierre-Yves Lajoie">
            <img :src="`${media}linkedin-qr.jpeg`" alt="QR LinkedIn de Pierre-Yves Lajoie, extrait de sa présentation." />
          </a>
          <figcaption>LinkedIn</figcaption>
        </figure>
        <a class="field-lab" href="https://mistlab.ca/" target="_blank" rel="noopener">
          <span class="field-lab-name">MIST Lab</span>
          <span class="field-lab-affiliation">Polytechnique<br />Montréal</span>
          <span class="field-lab-url">mistlab.ca ↗</span>
        </a>
      </div>
    </aside>
  </section>
</template>

<style scoped>
.field-contact-mosaic{display:grid;grid-template-columns:600fr 568fr;grid-template-rows:196px 282px;gap:16px;width:100%;height:494px;color:#edf4f8}
.field-contact-mosaic figure{margin:0}
.field-photo{position:relative;min-width:0;min-height:0;overflow:hidden;border-radius:11px;background:#122b3c}
.field-photo a{display:block;width:100%;height:100%}
.field-photo img{display:block;width:100%;height:100%;max-width:none;object-fit:cover}
.field-event{grid-column:1;grid-row:1 / 3}
.field-event img{object-position:55% center}
.field-rover img{object-position:52% 69%}
.field-drone img{object-position:center 56%}
.field-photo figcaption{position:absolute;bottom:0;left:0;right:0;padding:25px 14px 12px;background:linear-gradient(transparent,rgba(3,13,22,.9));font-size:16px;line-height:1.2;font-weight:500;pointer-events:none;text-shadow:0 1px 3px #000}
.field-photo-stack{grid-column:2;grid-row:1;display:grid;grid-template-columns:1fr 1fr;gap:16px;min-height:0}
.field-contact-card{grid-column:2;grid-row:2;box-sizing:border-box;min-width:0;height:282px;border:1px solid #294a5f;border-radius:11px;padding:20px 22px;background:#102736;display:grid;grid-template-columns:190px 1fr;grid-template-rows:auto auto auto 1fr;column-gap:24px}
.field-contact-heading{grid-column:2;grid-row:1;font-size:14px;line-height:1.2;color:#a8c2d3;margin-bottom:9px}
.field-contact-name{grid-column:2;grid-row:2;font-size:23px;line-height:1.2;font-weight:600;letter-spacing:-.4px}
.field-email{grid-column:2;grid-row:3;display:block;width:max-content;max-width:100%;margin-top:6px;font-size:17px;line-height:1.3;color:#6cdbed;text-decoration:none;white-space:nowrap}
.field-contact-bottom{display:contents}
.field-qr{grid-column:1;grid-row:1 / 5;align-self:center;text-align:center}
.field-qr a{display:block}
.field-qr img{display:block;box-sizing:border-box;width:190px;height:190px;background:#fff;padding:10px;border-radius:5px;object-fit:contain}
.field-qr figcaption{font-size:16px;line-height:1.2;margin-top:7px;color:#edf4f8}
.field-lab{grid-column:2;grid-row:4;align-self:end;display:flex;flex-direction:column;gap:5px;text-decoration:none;color:#edf4f8}
.field-lab-name{font-size:24px;line-height:1.1;font-weight:600}
.field-lab-affiliation{font-size:15px;line-height:1.3;color:#adc4d1}
.field-lab-url{font-size:22px;line-height:1.2;color:#6cdbed;margin-top:3px}
.field-contact-mosaic a:focus-visible{outline:3px solid #6cdbed;outline-offset:3px}
</style>
