import carpathiansImg from "../images/carpathians.jpg";
import greeceImg from "../images/greece.jpg";
import italyImg from "../images/italy.jpg";
import barcelonaImg from "../images/barcelona.jpg";
import istambulImg from "../images/istambul.jpg";
import lvivImg from "../images/lviv.webp";
import karlovyVaryImg from "../images/Karlovy_Vary_Czech.jpg";
import balticPolandImg from "../images/Gdansk.jpg";
import brazilBeachesImg from "../images/Brazil_beach.jpg";
import franceParisImg from "../images/Paris.jpg";
import londonEnglandImg from "../images/London.jpg";
import poltavaImg from "../images/Poltava.jpg";

export const tours = [
  {
    id: 1,
    title: "Серце Карпат",
    country: "Україна",
    price: "32000 грн",
    image: carpathiansImg,
    description: "Гірські пейзажі, гуцульська культура, термальні джерела.",
    nights: 7,
    type: "land",
  },
  {
    id: 2,
    title: "Крит — гордість Середземномор'я",
    country: "Греція",
    price: "90000 грн",
    image: greeceImg,
    description:
      "Острівний відпочинок, пляжі, історія та середземноморська кухня.",
    nights: 9,
    type: "sea",
  },
  {
    id: 3,
    title: "Дитячі канікули у Римі",
    country: "Італія",
    price: "72000 грн",
    image: italyImg,
    description:
      "Рим — скарбниця історії та культури, де сучасність переплітається з величчю античних руїн.",
    nights: 7,
    type: "land",
  },
  {
    id: 4,
    title: "Сонячна Барселона",
    country: "Іспанія",
    price: "56000 грн",
    image: barcelonaImg,
    description: "Гауді, море та іспанська енергія — відчуй дух Барселони.",
    nights: 6,
    type: "sea",
  },
  {
    id: 5,
    title: "Таємничий Стамбул",
    country: "Туреччина",
    price: "54000 грн",
    image: istambulImg,
    description: "Місто, де зустрічаються дві цивілізації — Схід і Захід.",
    nights: 8,
    type: "sea",
  },
  {
    id: 6,
    title: "Романтичний Львів",
    country: "Україна",
    price: "40000 грн",
    image: lvivImg,
    description: "Місто ароматної кави, музики та європейської вишуканості.",
    nights: 7,
    type: "land",
  },
  {
    id: 7,
    title: "Карлові Вари: відпочинок і лікування",
    country: "Чехія",
    price: "55000 грн",
    image: karlovyVaryImg,
    description:
      "Відомий курорт із термальними джерелами та європейською атмосферою.",
    nights: 10,
    type: "land",
  },
  {
    id: 8,
    title: "Балтійське узбережжя Польщі",
    country: "Польща",
    price: "35000 грн",
    image: balticPolandImg,
    description: "Морські пляжі, свіже повітря та затишні курортні містечка.",
    nights: 7,
    type: "land",
  },
  {
    id: 9,
    title: "Пляжі Бразилії: сонце і ритм самби",
    country: "Бразилія",
    price: "70000 грн",
    image: brazilBeachesImg,
    description: "Екзотичні пляжі Атлантики, яскраві карнавали та ритми самби.",
    nights: 9,
    type: "sea",
  },
  {
    id: 10,
    title: "Романтика Парижа та Провансу",
    country: "Франція",
    price: "65000 грн",
    image: franceParisImg,
    description:
      "Вишукані вулиці Парижа, ароматні лавандові поля Провансу та французький шарм.",
    nights: 8,
    type: "land",
  },
  {
    id: 11,
    title: "Лондон і таємниці Англії",
    country: "Англія",
    price: "60000 грн",
    image: londonEnglandImg,
    description:
      "Столиця королівських традицій, сучасних музеїв та знаменитих пабів.",
    nights: 7,
    type: "land",
  },
  {
    id: 12,
    title: "Полтава — місто українських традицій",
    country: "Україна",
    price: "27000 грн",
    image: poltavaImg,
    description:
      "Місто слави, культури та гастрономії: від історичних пам’яток до легендарних полтавських галушок.",
    nights: 5,
    type: "land",
  },
];
