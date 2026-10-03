# Navigation autonome : une fiabilité qui inspire confiance

Présentation de **Pierre-Yves Lajoie**, en français, pour un public scientifique général. **12 diapositives** pour un exposé de 12 minutes.

## Présenter

```sh
npm ci
npm run dev
```

Diaporama : http://localhost:3042/ · Présentateur : http://localhost:3042/#/presenter/1

- Les flèches changent directement de diapositive.
- L’ouverture boucle en 30 secondes. Les autres animations restent à vitesse ×2 (boucles de 9 ou 10 secondes), sans boutons.
- La vidéo de robustesse est à 0,7×. Les deux vidéos S3E et SubT de la slide de consensus sont à 2× : modifier `:playback-rate="2"` sur chaque `<ResearchVideo>` dans `slides.md` pour ajuster leur vitesse.
- Les vidéos redémarrent à l’entrée de la slide. Le PDF et le mode sans animations utilisent des images fixes.
- Les notes contiennent la narration, le minutage et les précautions scientifiques.
- Si le port 3042 est déjà occupé par cette présentation, utiliser la page existante ; sinon `npm run dev -- --port 3045` permet de choisir un autre port.

## Construire, exporter et vérifier

```sh
npm run build
npm run preview
npm run export
npm run check -- --url=http://localhost:3043 --out=qa/restructure/check
```

Le dossier `dist/` fonctionne sans Internet via un serveur HTTP. Le PDF `output/pdf/mobilite-autonome.pdf` contient des vues statiques des scènes ; les animations sont dans la version web.

## Déroulé actuel

1. Navigation et confiance : présentation et coordonnées.
2. Cartographier → se localiser → planifier.
3. Des progrès rapides.
4. Changer de ville, changer de conditions : mosaïque de douze photos.
5. Deux façons de renforcer la fiabilité.
6. Robustesse : comparaison vidéo, DC-GM et DOOR-SLAM.
7. Consensus entre plusieurs agents : vidéos S3E et SubT.
8. Image → BEV, carte neuronale et appariement.
9. Ambiguïtés : deux cartes neuronales et distribution illustrative des poses.
10. Exemple de localisation erronée.
11. Calibration et indices sémantiques.
12. Robotique intelligente et robuste : photos de terrain et contact.

Prévoir environ 30 à 50 secondes pour la nouvelle slide de consensus et conserver une marge pour la conclusion.

## Fichiers

- `slides.md` : diapositives et notes.
- `components/` : scènes Vue, SVG et Three.js ; `composables/useTimeline.js` : horloge commune.
- `style.css`, `slide-top.vue` : thème sombre et bande Polytechnique.
- `sources/` : provenance et crédits des photos.
- `.github/workflows/pages.yml` : construction, validation et déploiement GitHub Pages.

L’exemple de la galerie est qualitatif. Les approches proposées sont présentées comme des pistes à évaluer. Les autres animations sont synthétiques.

## GitHub Pages

Site : https://lajoiepy.github.io/presentation/

Chaque push sur `main` lance `.github/workflows/pages.yml` : installation avec le lockfile, construction sous le chemin du dépôt, vérification des slides et médias dans Chromium, puis publication de `dist/`. Le workflow peut aussi être lancé depuis l’onglet Actions. Node.js 24 est utilisé.

Le dépôt doit avoir **Settings → Pages → Source → GitHub Actions** activé. Le site est construit sans les notes du présentateur. La présentation locale conserve les notes.

Pour vérifier localement le chemin GitHub Pages :

```sh
npm run build -- --base /presentation/ --without-notes
BASE_PATH=/presentation/ npm run preview
npm run check -- --url=http://localhost:3043/presentation --out=qa/pages
```

Le `.gitignore` exclut les dépendances, sorties générées, captures de contrôle, sources vidéo en double, articles PDF, ancienne présentation, galerie de recherche complète et composants retirés. Les médias sélectionnés, les polices avec leur licence et les crédits photographiques sont conservés.

Documentation : [déploiement Slidev](https://sli.dev/guide/hosting), [workflows GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).
