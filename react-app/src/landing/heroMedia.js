// Fotos do slideshow 3D do Hero — ciclam por ordem (01 a 07), com parallax e
// zoom lento (Ken Burns) por cima do gradiente/folhas 3D já existentes.
import img01 from './assets/hero/01.jpeg'
import img02 from './assets/hero/02.jpeg'
import img03 from './assets/hero/03.jpeg'
import img04 from './assets/hero/04.jpeg'
import img05 from './assets/hero/05.jpeg'
import img06 from './assets/hero/06.jpeg'
import img07 from './assets/hero/07.jpeg'

export const HERO_MEDIA = [
  { type: 'image', src: img01, alt: { pt: 'Mão humana e mão robótica a segurar uma planta nascente', en: 'Human and robotic hand holding a young plant' } },
  { type: 'image', src: img02, alt: { pt: 'Pintainhos num aviário', en: 'Chicks in a poultry pen' } },
  { type: 'image', src: img03, alt: { pt: 'Agricultor a lavrar a terra com bois', en: 'Farmer plowing the land with oxen' } },
  { type: 'image', src: img04, alt: { pt: 'Estufa inteligente IAgroMOZ com robôs a monitorizar as culturas', en: 'IAgroMOZ smart greenhouse with robots monitoring crops' } },
  { type: 'image', src: img05, alt: { pt: 'Cesto de ovos frescos junto ao galinheiro', en: 'Basket of fresh eggs by the henhouse' } },
  { type: 'image', src: img06, alt: { pt: 'Galinhas reunidas à volta da ração', en: 'Chickens gathered around feed' } },
  { type: 'image', src: img07, alt: { pt: 'Piscicultura inteligente monitorizada por IA', en: 'Smart fish farming monitored by AI' } },
]
