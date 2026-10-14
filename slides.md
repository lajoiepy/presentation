---
theme: default
title: 'Navigation autonome : une fiabilité qui inspire confiance'
titleTemplate: '%s'
author: Pierre-Yves Lajoie
info: 'Navigation fiable, perception robuste et incertitude de localisation. Exposé de 12 minutes.'
colorSchema: dark
aspectRatio: 16/9
canvasWidth: 1280
fonts:
  sans: Inter
  provider: none
drawings:
  enabled: false
monaco: false
record: false
presenter: true
browserExporter: true
download: false
routerMode: hash
wakeLock: false
transition: fade
duration: 12min
timer: countdown
defaults:
  layout: default
htmlAttrs:
  lang: fr
exportFilename: mobilite-autonome
---

<div class="slide event-programme">
<header class="slide-header"><div class="kicker">Programme de l’atelier</div><h1>Des véhicules autonomes à la mobilité urbaine</h1></header>
<div class="content">
<div class="programme-blocks">
<section class="programme-block programme-vehicles">
<div class="programme-heading"><div><div class="programme-label">Premier bloc</div><h2>Voitures autonomes</h2></div><svg viewBox="0 0 84 60" aria-hidden="true"><path d="M12 35l8-17h40l12 17v15H12Z"/><path d="M20 35h43M29 18l-4 17m30-17 7 17M19 43h8m29 0h8"/><circle cx="23" cy="52" r="4"/><circle cx="62" cy="52" r="4"/><path d="M31 8q11-8 22 0m-17 3q6-4 12 0"/></svg></div>
<p class="programme-topic">Technologies et fiabilité</p>
<ol class="programme-speakers"><li><span>01</span>Pierre-Yves Lajoie</li><li><span>02</span>Parker Ewen</li></ol>
</section>
<section class="programme-block programme-cities">
<div class="programme-heading"><div><div class="programme-label">Deuxième bloc</div><h2>Ville et société</h2></div><svg viewBox="0 0 84 60" aria-hidden="true"><path d="M7 53V21h20V8h27v20h23v25M3 53h78M15 29h4m-4 9h4m15-21h5m8 0h1m-14 9h5m8 0h1m-14 9h5m8 0h1m15 2h6m-6 9h6M36 53V43h10v10"/></svg></div>
<p class="programme-topic">Analyses et impacts sur la mobilité</p>
<ol class="programme-speakers" start="3"><li><span>03</span>Nicolas Saunier</li><li><span>04</span>Francesco Ciari</li></ol>
</section>
</div>
<div class="programme-discussion"><span class="programme-step">05</span><h2>Questions et discussion</h2></div>
</div>
</div>

<!--
Présenter le déroulement en 20 à 30 secondes. Premier bloc : Pierre-Yves Lajoie puis Parker Ewen, sur les voitures autonomes. Deuxième bloc : Nicolas Saunier puis Francesco Ciari, sur les analyses et les impacts de la mobilité autonome du point de vue des villes et de la société. Les quatre interventions seront suivies d’une discussion avec la salle.

Questions possibles pour la discussion finale :
1. Quelles preuves faudrait-il réunir pour autoriser des véhicules autonomes dans une ville comme Montréal, y compris l’hiver ?
2. Comment éviter qu’un service de robotaxis augmente la congestion et les kilomètres parcourus à vide ?
3. Dans quels cas les véhicules autonomes pourraient-ils compléter le transport collectif, et dans quels cas risquent-ils de le concurrencer ?
4. Qui devrait bénéficier en priorité de ces services, et comment garantir leur accessibilité aux personnes et aux quartiers aujourd’hui mal desservis ?
5. Si vous pouviez lancer un seul projet pilote demain, lequel choisiriez-vous et quels indicateurs décideraient de sa poursuite ?
-->

---
title: 'Navigation autonome : une fiabilité qui inspire confiance'
---

<div class="slide cover reliability-cover contact-cover">
<div class="kicker">Navigation autonome · Fiabilité et confiance</div>
<div class="cover-copy"><h1>Navigation autonome<br/>fiable et qui inspire<br/>confiance</h1><p>Perception robotique<br/>performante et robuste.</p><div class="author">Pierre-Yves Lajoie<br/><span>Professeur en robotique autonome</span><small>Professeur adjoint · Polytechnique Montréal</small></div></div>
<div class="city"><CityMap mode="adas" :playback-rate="2 / 3" /></div>
<div class="cover-robots"><img src="/media/field-contact/rover-terrain.jpeg" alt="Notre robot mobile équipé de capteurs sur le terrain" /><img src="/media/field-contact/drone-terrain.png" alt="Notre drone de recherche équipé de capteurs" /></div>
<div class="cover-contact"><a class="cover-qr" href="https://www.linkedin.com/in/pierre-yves-lajoie?fromQR=1" target="_blank" rel="noopener noreferrer"><img src="/media/field-contact/linkedin-qr.jpeg" alt="QR code vers le profil LinkedIn de Pierre-Yves Lajoie" /></a><div class="cover-links"><a class="linkedin-link" href="https://www.linkedin.com/in/pierre-yves-lajoie?fromQR=1" target="_blank" rel="noopener noreferrer">LinkedIn · Restons en contact</a><a class="lab-link" href="https://mistlab.ca/" target="_blank" rel="noopener noreferrer">mistlab.ca</a><a class="email-link" href="mailto:pierre-yves.lajoie@polymtl.ca">pierre-yves.lajoie@polymtl.ca</a></div></div>
</div>


---
title: 'Cartographier, se localiser, planifier'
---

<div class="slide ">
<header class="slide-header"><div class="kicker">Les fondamentaux</div><h1>Cartographier → se localiser → planifier</h1><span class="tag"></span></header>
<div class="content pipeline-layout"><NavigationFlow /><div><div class="stage-line">Les décisions dépendent<br/>de la <em>représentation du monde qu'on construit.</em></div><p class="large-note">Les capteurs du véhicule produisent des mesures.<br/><br/>On construit une carte 3D à l'aide des mesures.<br/><br/>On planifie en continu la trajectoire à effectuer.</p></div></div>

</div>


---
title: 'Des progrès rapides'
disabled: true
---

<div class="slide ">
<header class="slide-header"><div class="kicker">Déploiements</div><h1>Des progrès rapides</h1><span class="tag"></span></header>
<div class="content"><div class="stat-layout"><section class="stat-block"><h2>Waymo</h2><div class="stat-number">&gt; 500 000</div><p>courses payantes<br/>sans conducteur / semaine</p><div class="stat-date">En date du 15 septembre 2026</div></section><section class="stat-block"><h2>Zoox</h2><div class="stat-number">≈ 1 million</div><p>passagers transportés<br/>depuis le lancement public</p><div class="stat-date">En date du 5 août 2026</div></section></div></div>
<div class="credit"><a href="https://www.waymo.com/blog/2026/09/allianzpartnership/">Waymo, 15 sept. 2026</a> · <a href="https://www.axios.com/2026/08/05/zooxs-amazon-robotaxis-vegas">Zoox : chiffres rapportés par Axios, 5 août 2026</a> </div>
</div>


---
title: 'Changer de ville, changer de conditions'
---

<script setup>
import RoadMosaic from './components/RoadMosaic.vue'
</script>

<div class="slide ">
<header class="slide-header"><div class="kicker">Mise à l’échelle</div><h1>Changer de ville, changer de conditions</h1><span class="tag"></span></header>
<div class="content"><RoadMosaic /></div>

</div>


---
title: 'Deux façons de renforcer la fiabilité'
disabled: true
---

<div class="slide ">
<header class="slide-header"><div class="kicker">Le fil conducteur de mes recherches</div><h1>Deux façons de renforcer la fiabilité</h1><span class="tag"></span></header>
<div class="content"><div class="axis-grid"><section class="axis"><div class="axis-no">01 · ROBUSTESSE AUX ERREURS</div><h2>Limiter l’impact<br/>des erreurs de perception</h2><p>Trouver une consensus<br/>parmis les mesures bruitées.</p><div class="axis-visual"><span>✓</span><span style="color:#ff6b6b">✗</span></div></section><section class="axis"><div class="axis-no">02 · ESTIMER L’INCERTITUDE</div><h2>Reconnaître quand<br/>l’estimation est fragile</h2><p>La confiance estimée<br/>doit prédire les erreurs.</p><div class="axis-visual"><span>◎</span><span style="font-size:22px;color:#c1d5e1">Prédire · vérifier · calibrer</span></div></section></div></div>
</div>


---
title: 'Robustesse aux erreurs'
---

<div class="slide robustness-videos">
<header class="slide-header"><div class="kicker">Nos travaux</div><h1>Robustesseaux erreurs</h1></header>
<div class="content video-comparison">
<ResearchVideo src="/media/robustness/kitti00-comparison.mp4" poster="/media/robustness/comparison-poster.png" :playback-rate="0.7" />
</div>
<div class="credit"><a href="https://arxiv.org/abs/1810.11692">DC-GM · Lajoie, Hu, Beltrame &amp; Carlone · RA-L / ICRA 2019</a><br/><a href="https://arxiv.org/abs/1909.12198">DOOR-SLAM · Lajoie, Ramtoula, Chang, Carlone &amp; Beltrame · RA-L / ICRA 2020</a></div>
</div>




---
title: 'Trouver un consensus entre plusieurs agents'
---

<div class="slide consensus-videos">
<header class="slide-header"><div class="kicker">Robustesse via<br/>Perception collective</div><h1>Trouver un<br/>consensus entre<br/>plusieurs agents</h1></header>
<div class="content consensus-comparison">
<figure><figcaption>Campus</figcaption><ResearchVideo src="/media/consensus/s3e.mp4" poster="/media/consensus/s3e-poster.jpg" alt="S3E : cartes et observations de trois robots" :playback-rate="2" /></figure>
<figure><figcaption>Souterrain</figcaption><ResearchVideo src="/media/consensus/subt.mp4" poster="/media/consensus/subt-poster.jpg" alt="SubT : cartes et observations de trois robots" :playback-rate="2" /></figure>
</div>
<div class="consensus-references"><a href="https://arxiv.org/abs/2301.06230"><strong>Swarm-SLAM</strong><span>Lajoie &amp; Beltrame · RA-L 2024</span></a><a href="https://arxiv.org/abs/2602.02430"><strong>FLOCC-SLAM</strong><span>Lajoie, Ramtoula, De Martini &amp; Beltrame<br/>RA-L 2025</span></a></div>
</div>



---
title: 'Ambiguités'
disabled: true
---

<div class="slide">
<header class="slide-header"><div class="kicker">Ambiguïté et incertitude</div><h1>Plusieurs poses peuvent expliquer la même image</h1></header>
<div class="content"><MatchingUncertainty /></div>

</div>

---
title: 'Une localisation fausse, mais très concentrée'
---

<div class="slide ">
<header class="slide-header"><div class="kicker">Localisation sur cartes publiques pour les ADAS</div><h1>Problème: Localisation erronée, mais confiante</h1><span class="tag"></span></header>
<div class="content"><CwExample /></div>

</div>

---
title: 'De l’image à la position sur la carte'
---

<div class="slide">
<header class="slide-header"><div class="kicker">Localisation visuelle</div><h1>De l’image à la position sur la carte</h1></header>
<div class="content"><LocalizationPipeline /></div>
<div class="credit"><a href="https://arxiv.org/abs/2304.02009">Sarlin et al. 2023</a> </div>
</div>


---
title: 'Résoudre les ambiguïtés visuelles et mieux calibrer l'incertitude
---

<div class="slide ">
<header class="slide-header"><div class="kicker">Travaux de recherche</div><h1>Résoudre les ambiguïtés visuelles et mieux calibrer l'incertitude</h1><span class="tag"></span></header>
<div class="content research-split proposal"><SemanticScene /><div class="research-side"><h2>1. Calibrer l’incertitude</h2><p class="support">Vérifier l'estimation,<br/> selon les conditions.</p><h2 style="margin-top:28px">2. Croiser les modalités</h2><p class="support">Image + carte + indices sémantiques :<br/>intersection, bâtiments, végétation.</p><div class="keyline" style="font-size:22px">Une contradiction peut-elle<br/>révéler une mauvaise localisation ?</div></div></div>

</div>


---
title: 'Robotique Intelligente et robuste'
---

<div class="slide closing closing-photos">
<header class="slide-header"><div class="kicker">Véhicules autonomes · Villes de demain</div><h1>Robotique Intelligente et robuste</h1><span class="tag"></span></header>
<div class="content"><FieldContactMosaic /></div>
</div>
