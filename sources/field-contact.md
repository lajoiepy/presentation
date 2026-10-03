# Photos et coordonnées — conclusion

## Sources fournies par l’utilisateur

Les fichiers ci-dessous sont copiés sans modification des pixels. Le cadrage de présentation est réalisé par CSS ; les liens des photos ouvrent les originaux locaux.

| Fichier public | Source exacte | Contexte |
| --- | --- | --- |
| `public/media/field-contact/evenement-robots.jpg` | `footage/IMG_0827.JPG` | Photo d’événement fournie par l’utilisateur : présentateur et robots. Le composant évite d’inventer le lieu ou la date. |
| `public/media/field-contact/rover-terrain.jpeg` | `footage/PY-HQ.pptx`, `ppt/media/image31.jpeg`, diapositive 12 | Robot à roues sur terrain sablonneux/rocheux. |
| `public/media/field-contact/drone-terrain.png` | `footage/PY-HQ.pptx`, `ppt/media/image30.png`, diapositive 12 | Drone de recherche posé sur un terrain extérieur. |
| `public/media/field-contact/linkedin-qr.jpeg` | `footage/PY-HQ.pptx`, `ppt/media/image35.jpeg`, diapositive 13 | QR d’origine, explicitement identifié « LinkedIn » sur la diapositive source. Conservé tel quel. |

Le courriel `pierre-yves.lajoie@polymtl.ca` est extrait du texte et du lien `mailto:` de la diapositive 13. La photo événement est identifiée à partir du contexte fourni par l’utilisateur, sans reconnaissance d’identité indépendante.

## Site du laboratoire

[MIST Lab — Polytechnique Montréal](https://mistlab.ca/) vérifié le 2 octobre 2026. La page officielle présente le laboratoire, Pierre-Yves Lajoie et le même courriel professionnel. Le composant pointe directement vers `https://mistlab.ca/`.

## QR

Le QR original bénéficie d’une marge blanche supplémentaire dans le composant. Son attribution LinkedIn provient de la diapositive source. Son URL encodée a été décodée avec OpenCV : `https://www.linkedin.com/in/pierre-yves-lajoie?fromQR=1`. Le QR est également un lien cliquable vers cette destination exacte. Le décodage a été vérifié sur les captures finales à 1600×900 et 1366×768 ; les deux donnent cette même URL (`qa/parallel-redesign/final/`).

## Intégration

`<FieldContactMosaic />` occupe toute la largeur disponible et exactement **340 px de hauteur** ; composition prévue pour **1184 px de largeur**. CSS local au composant. Trois photos : événement en grand, rover et drone en colonne. Carte contact avec QR de 168 px (image utile 148 px), courriel cliquable et lien MIST Lab. Les questions ouvertes restent gérées par la diapositive parente.
