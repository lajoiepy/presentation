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



<!--
7:05–7:55 · 50 s.
Passons à l’incertitude. Dans le langage courant, une localisation précise signifie une position proche de la vraie position. L’erreur mesure cette distance. L’incertitude, elle, décrit ce que le système pense ignorer. Ce sont deux choses différentes.
À gauche, la région annoncée est petite, mais elle se trouve au mauvais endroit. Une distribution concentrée ne prouve donc pas que la position est correcte.
À droite, imaginons des régions annoncées à 90 %. Sur un grand ensemble de cas, elles devraient contenir la vraie position environ neuf fois sur dix. L’animation en montre seulement dix pour rendre l’idée visible. Si elles ne couvrent que six cas, le système surestime sa confiance. Une recalibration peut modifier les régions, puis on vérifie leur couverture sur des données indépendantes.
Il faut aussi examiner la taille des régions et les conditions : une bonne moyenne peut masquer un défaut sous la neige ou la nuit. Et recalibrer l’incertitude ne corrige pas automatiquement la position elle-même.
-->

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


<!--
30 s. Croiser les observations de plusieurs agents permet de chercher des mesures mutuellement compatibles. Un consensus peut aider à écarter les incohérences ; il ne garantit pas que tous les agents ont raison.
Les vidéos fournies montrent les cartes de trois robots et leur carte commune. Elles illustrent la perception collective, sans quantifier à elles seules la robustesse.
Vitesse modifiable : changer :playback-rate="2" sur chaque ResearchVideo ci-dessus (1 = vitesse originale, 2 = deux fois plus vite).
-->

---
title: 'De l’image à la position sur la carte'
---

<div class="slide">
<header class="slide-header"><div class="kicker">Localisation visuelle</div><h1>De l’image à la position sur la carte</h1></header>
<div class="content"><LocalizationPipeline /></div>
<div class="credit"><a href="https://arxiv.org/abs/2304.02009">Sarlin et al. 2023</a> </div>
</div>

<!--
7:55–8:35 · 40 s.
Voici le principe d’OrienterNet, une baseline publiée. Un réseau transforme l’image en une représentation vue du dessus, appelée BEV. Ce passage exige d’apprendre la structure spatiale : il ne suffit pas d’incliner la photo.
En parallèle, un autre réseau transforme la carte publique en une carte de caractéristiques comparables. On déplace et on tourne la BEV pour chercher où les deux représentations s’accordent.
L’appariement propose ainsi une position et une orientation. Mais un bon accord ne garantit pas une localisation correcte : c’est ce que nous allons examiner.
Repères techniques — hors narration :
Les couleurs représentent des caractéristiques apprises, pas des catégories ni des probabilités. Les panneaux proviennent de l’architecture publiée. Le triangle BEV est redressé par une transformation affine pour l’afficher comme une empreinte orientable. La grille et les déplacements du triangle expliquent le principe, sans reproduire une exécution du modèle. Aucune pose ni aucun score calculé ne sont présentés ici.
-->

---
title: 'Ambiguités'
---

<div class="slide">
<header class="slide-header"><div class="kicker">Ambiguïté et incertitude</div><h1>Plusieurs poses peuvent expliquer la même image</h1></header>
<div class="content"><MatchingUncertainty /></div>

</div>

<!--
8:35–9:10 · 35 s.
Des indices visuels semblables peuvent soutenir plusieurs poses. Garder seulement le meilleur point ferait perdre cette ambiguïté.
La distribution conserve deux pics : deux lieux restent possibles. La largeur d’un pic décrit l’incertitude autour de ce lieu. Un pic peut donc être étroit sans que le lieu lui-même soit certain.
Et cette distribution peut manquer la bonne solution : un pic unique et étroit peut être faux. Regardons maintenant un cas réel.
Repères techniques — hors narration :
Les deux cartes neuronales sont les panneaux « neural map » des exemples distincts cw_000_sample0008 et cw_042_sample0929 de la galerie fournie. Les couleurs représentent des caractéristiques apprises, pas la confiance. Les poses A/B et le placement de la BEV sont illustratifs : ces deux exemples ne démontrent pas deux appariements mesurés d’une même image. La distribution à deux pics est pédagogique, ni une sortie de ces exemples ni la cause établie de l’échec suivant. Les deux gaussiennes sont larges et se recouvrent partiellement, avec des poids de 0,52 et 0,48 et des écarts-types illustratifs de 74 et 87 unités du graphique. Leur somme est normalisée sur la grille. La courbe est une coupe pédagogique en position avec l’autre coordonnée et l’orientation fixées, pas une distribution complète sur x, y, angle. La slide est statique : les deux cartes, les poses et la distribution sont visibles simultanément. La normalisation ne constitue pas une calibration empirique de la confiance.
-->

---
title: 'Une localisation fausse, mais très concentrée'
---

<div class="slide ">
<header class="slide-header"><div class="kicker">Localisation sur cartes publiques pour les ADAS</div><h1>Problème: Localisation erronée, mais confiante</h1><span class="tag"></span></header>
<div class="content"><CwExample /></div>

</div>

<!--
9:10–9:55 · 45 s.
Voici un exemple réel tiré de la galerie de notre projet. À gauche, l’image du véhicule ; au centre, la carte OpenStreetMap ; à droite, les scores des poses candidates, en échelle logarithmique. Les marqueurs rouges indiquent la référence. L’estimation est noire sur la carte et également noire dans le dernier panneau.
La distribution est concentrée, mais autour du mauvais endroit. C’est le type de cas que nous appelons confident wrong : une erreur importante accompagnée d’une faible entropie. L’entropie mesure ici la dispersion de la distribution, pas une probabilité de succès déjà calibrée.
Repères techniques — hors narration :
La galerie fournie retient les cas d’erreur de position supérieure à 10 mètres et d’entropie inférieure à la médiane du jeu de validation. Elle contient 103 images parmi 1813 cas. Ces critères servent à examiner des échecs ; ils ne constituent ni un taux de sécurité, ni un résultat comparatif publié. Nous ne présentons ici qu’un exemple qualitatif, sans résultat agrégé inédit.
Le panneau de droite est un zoom sur le maximum sur les orientations du log P, pas le panneau « heat = GPS prior » de l’image d’origine. Le jaune représente un score élevé, le violet un score faible. La concentration est documentée par l’entropie fournie, pas par une probabilité calibrée lisible dans ces couleurs. Les ressemblances urbaines motivent nos recherches, mais cet exemple seul ne permet pas d’attribuer la cause de l’échec à une ambiguïté précise.
Les baselines publiées OrienterNet et AutoCompass contextualisent ce type de localisation ; le modèle exact de cette galerie n’est pas identifié dans les fichiers fournis.
-->

---
title: 'Mieux calibrer, puis chercher ce qui désambiguïse'
---

<div class="slide ">
<header class="slide-header"><div class="kicker">Pistes de recherche</div><h1>Mieux calibrer, puis chercher ce qui désambiguïse</h1><span class="tag"></span></header>
<div class="content research-split proposal"><SemanticScene /><div class="research-side"><h2>1. Calibrer l’incertitude</h2><p class="support">Vérifier l'estimation,<br/> selon les conditions.</p><h2 style="margin-top:28px">2. Croiser les modalités</h2><p class="support">Image + carte + indices sémantiques :<br/>intersection, bâtiments, végétation.</p><div class="keyline" style="font-size:22px">Une contradiction peut-elle<br/>révéler une mauvaise localisation ?</div></div></div>

</div>

<!--
9:55–10:35 · 40 s.
Nous explorons deux directions. D’abord, mieux calibrer l’incertitude : comparer les régions annoncées aux erreurs observées, sur des données indépendantes et dans différentes conditions.
Ensuite, croiser les modalités. Cette photo réelle montre une façade à gauche et de la végétation à droite. Sur un extrait de la carte correspondante, nous testons deux sens de vue. Le sens A inverse les côtés attendus ; B respecte leur disposition. Cet indice permet de vérifier une orientation, sans prouver la position.
Ce sont des pistes à évaluer. Les indices sémantiques peuvent eux-mêmes être faux ou absents de la carte.
Repères techniques — hors narration :
La photo et la carte viennent de cw_008_sample0403.png. Les deux flèches ajoutées sont des orientations illustratives sur un extrait de carte sans marqueurs ; elles ne sont pas les sorties du modèle. Le cas original comporte une erreur de position malgré une orientation proche de la référence : les côtés compatibles ne suffisent donc pas à expliquer ou résoudre cet échec. Les annotations visuelles sont manuelles, pas une segmentation calculée. OrienterNet et AutoCompass situent le problème, sans leur attribuer notre méthode proposée. La calibration doit être évaluée selon les conditions et avec la taille des régions, pas uniquement leur couverture moyenne.
-->

---
title: 'Robotique Intelligente et robuste'
---

<div class="slide closing closing-photos">
<header class="slide-header"><div class="kicker">Véhicules autonomes · Villes de demain</div><h1>Robotique Intelligente et robuste</h1><span class="tag"></span></header>
<div class="content"><FieldContactMosaic /></div>
</div>
