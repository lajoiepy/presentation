<script setup>
import { assetUrl } from '../lib/asset-url'
// Photographies réelles, conservées localement. Sources et licences : sources/road-photos.md.
const roads = [
  {
    "src": "/media/roads/montreal.jpg",
    "place": "Montréal · Canada",
    "context": "Neige et nuit",
    "position": "50% 65%",
    "author": "Emmanuel Huybrechts from Laval, Canada",
    "license": "CC BY 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
    "title": "Snowy street (4784616895).jpg",
    "source": "https://commons.wikimedia.org/wiki/File:Snowy_street_(4784616895).jpg",
    "download": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3c/Snowy_street_%284784616895%29.jpg/960px-Snowy_street_%284784616895%29.jpg"
  },
  {
    "src": "/media/roads/paris.jpg",
    "place": "Paris · France",
    "context": "Rue de Rivoli",
    "position": "50% 68%",
    "author": "Chabe01",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "title": "Rue Rivoli Paris 1.jpg",
    "source": "https://commons.wikimedia.org/wiki/File:Rue_Rivoli_Paris_1.jpg",
    "download": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/78/Rue_Rivoli_Paris_1.jpg/960px-Rue_Rivoli_Paris_1.jpg"
  },
  {
    "src": "/media/roads/tokyo.jpg",
    "place": "Tokyo · Japon",
    "context": "Chaussée mouillée",
    "position": "50% 57%",
    "author": "Vasconium",
    "license": "CC BY-SA 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0",
    "title": "Japanese Hyundai Grandeur taxi, Taito, Tokyo, Japan.jpg",
    "source": "https://commons.wikimedia.org/wiki/File:Japanese_Hyundai_Grandeur_taxi,_Taito,_Tokyo,_Japan.jpg",
    "download": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e6/Japanese_Hyundai_Grandeur_taxi%2C_Taito%2C_Tokyo%2C_Japan.jpg/960px-Japanese_Hyundai_Grandeur_taxi%2C_Taito%2C_Tokyo%2C_Japan.jpg"
  },
  {
    "src": "/media/roads/hanoi.jpg",
    "place": "Hanoï · Vietnam",
    "context": "Circulation mixte",
    "position": "50% 58%",
    "author": "Marcel Oosterwijk from Amsterdam, The Netherlands",
    "license": "CC BY-SA 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0",
    "title": "Hanoi traffic 2008.jpg",
    "source": "https://commons.wikimedia.org/wiki/File:Hanoi_traffic_2008.jpg",
    "download": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/00/Hanoi_traffic_2008.jpg/960px-Hanoi_traffic_2008.jpg"
  },
  {
    "src": "/media/roads/san-francisco.jpg",
    "place": "San Francisco · États-Unis",
    "context": "Été en ville",
    "position": "50% 60%",
    "author": "Steven Lek",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "title": "Lombard Street San Francisco 2019.jpg",
    "source": "https://commons.wikimedia.org/wiki/File:Lombard_Street_San_Francisco_2019.jpg",
    "download": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/66/Lombard_Street_San_Francisco_2019.jpg/960px-Lombard_Street_San_Francisco_2019.jpg"
  },
  {
    "src": "/media/roads/norway.jpg",
    "place": "Trollstigen · Norvège",
    "context": "Route de montagne",
    "position": "50% 67%",
    "author": "Paweł Kuźniar (Jojo_1, Jojo)",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
    "title": "Trollstigen Norway 2004.jpg",
    "source": "https://commons.wikimedia.org/wiki/File:Trollstigen_Norway_2004.jpg",
    "download": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/03/Trollstigen_Norway_2004.jpg/960px-Trollstigen_Norway_2004.jpg"
  },
  {
    "src": "/media/roads/lapland.jpg",
    "place": "Laponie · Finlande",
    "context": "Automne",
    "position": "50% 64%",
    "author": "Stefan Jonas",
    "license": "CC BY 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
    "title": "Road Lapland Autumn.jpg",
    "source": "https://commons.wikimedia.org/wiki/File:Road_Lapland_Autumn.jpg",
    "download": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bb/Road_Lapland_Autumn.jpg/960px-Road_Lapland_Autumn.jpg"
  },
  {
    "src": "/media/roads/gudilova.jpg",
    "place": "Gudilova · Inde",
    "context": "Route rurale",
    "position": "50% 83%",
    "author": "Adityamadhav83",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "title": "Rural road at Gudilova village.jpg",
    "source": "https://commons.wikimedia.org/wiki/File:Rural_road_at_Gudilova_village.jpg",
    "download": "https://upload.wikimedia.org/wikipedia/commons/1/15/Rural_road_at_Gudilova_village.jpg"
  },
  {
    "src": "/media/roads/namibia.jpg",
    "place": "Kunene · Namibie",
    "context": "Piste de gravier",
    "position": "50% 70%",
    "author": "Olga Ernst",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "title": "Gravel road, Namibia.jpg",
    "source": "https://commons.wikimedia.org/wiki/File:Gravel_road,_Namibia.jpg",
    "download": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e4/Gravel_road%2C_Namibia.jpg/960px-Gravel_road%2C_Namibia.jpg"
  },
  {
    "src": "/media/roads/australia.jpg",
    "place": "Territoire du Nord · Australie",
    "context": "Longues distances",
    "position": "50% 74%",
    "author": "Prince Roy",
    "license": "CC BY-SA 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0",
    "title": "Stuart Highway in the Northern Territory photographed in November 2007.jpg",
    "source": "https://commons.wikimedia.org/wiki/File:Stuart_Highway_in_the_Northern_Territory_photographed_in_November_2007.jpg",
    "download": "https://upload.wikimedia.org/wikipedia/commons/9/91/Stuart_Highway_in_the_Northern_Territory_photographed_in_November_2007.jpg"
  },
  {
    "src": "/media/roads/iceland.jpg",
    "place": "Route 1 · Islande",
    "context": "Neige et chaussée glacée",
    "position": "50% 50%",
    "author": "sergejf",
    "license": "CC BY-SA 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0",
    "title": "Road No 1 winding through the Icelandic highlands (16443714336).jpg",
    "source": "https://commons.wikimedia.org/wiki/File:Road_No_1_winding_through_the_Icelandic_highlands_(16443714336).jpg",
    "download": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5e/Road_No_1_winding_through_the_Icelandic_highlands_%2816443714336%29.jpg/960px-Road_No_1_winding_through_the_Icelandic_highlands_%2816443714336%29.jpg"
  },
  {
    "src": "/media/roads/dempster.jpg",
    "place": "Tsiigehtchic · Canada",
    "context": "Route de glace",
    "position": "50% 70%",
    "author": "Ian Mackenzie",
    "license": "CC BY 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
    "title": "Ice road across the Mackenzie, at Tsiigehtchic, Northwest Territories.jpg",
    "source": "https://commons.wikimedia.org/wiki/File:Ice_road_across_the_Mackenzie,_at_Tsiigehtchic,_Northwest_Territories.jpg",
    "download": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b4/Ice_road_across_the_Mackenzie%2C_at_Tsiigehtchic%2C_Northwest_Territories.jpg/960px-Ice_road_across_the_Mackenzie%2C_at_Tsiigehtchic%2C_Northwest_Territories.jpg"
  }
]
</script>

<template>
  <div class="road-mosaic" aria-label="Douze environnements routiers, en trois lignes et quatre colonnes">
    <a v-for="road in roads" :key="road.src" class="road-photo" :href="road.source" target="_blank" rel="noopener noreferrer" :title="`${road.title} — ${road.author} · ${road.license} · recadrage d’affichage`" :aria-label="`${road.place}, ${road.context}. Photo : ${road.author}, ${road.license}. Ouvrir la source.`">
      <img :src="assetUrl(road.src)" :alt="`${road.place} — ${road.context}`" :style="{ objectPosition: road.position }" loading="eager" decoding="sync" />
      <div class="road-label"><span>{{ road.place }}</span></div>
      <span class="road-credit" aria-hidden="true">ⓘ</span>
    </a>
  </div>
</template>

<style scoped>
.road-mosaic {
  width: 100%;
  height: 446px;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-template-rows: repeat(3, minmax(0, 1fr));
  gap: 10px;
}
.road-photo {
  position: relative;
  display: block;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  border-radius: 6px;
  background: #102537;
  isolation: isolate;
}
.road-photo img { display: block; width: 100%; height: 100%; object-fit: cover; }
.road-photo::after { content: ''; position: absolute; inset: 35% 0 0; background: linear-gradient(transparent, rgba(3, 10, 18, .88)); pointer-events: none; }
.road-label { position: absolute; z-index: 1; left: 13px; right: 22px; bottom: 10px; color: #fff; text-shadow: 0 1px 4px #071321; line-height: 1.2; }
.road-label span { display: block; font-size: 11px; font-weight: 400; color: #b1bac3; }
.road-credit { position: absolute; z-index: 1; right: 10px; bottom: 11px; font-size: 12px; color: #c6d8e4; }
.road-photo:focus-visible { outline: 3px solid #6cdbed; outline-offset: -3px; }
@media print { .road-mosaic { break-inside: avoid; } }
</style>
