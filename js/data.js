/* data.js — «ШИЙДНИЙ АХ» / Airbum сайтын бүх мэдээлэл.
   Тоонуудыг 2026.11.15-нд нийтэд нээлттэй хуудаснаас авсан. Шинэчлэхдээ зөвхөн тоог солино.
   Шинэ дугаар гарвал VIDEOS-ийн эхэнд нэг мөр нэмнэ. */

window.BRAND = {
  name: "ШИЙДНИЙ АХ",
  studio: "Airbum — Ball is life",
  city: "Улаанбаатар",
  youtube: "https://www.youtube.com/@hasaa8246",
  subscribe: "https://www.youtube.com/@hasaa8246?sub_confirmation=1",
  tiktok: "https://www.tiktok.com/@shiidniiah",
  instagram: "https://www.instagram.com/airbummm/",
  facebook: "https://www.facebook.com/profile.php?id=100090520350078",
  phone: "9896-1122",                                   // Instagram bio дахь хамтран ажиллах утас
  latest: { title: "«ШИЙДНИЙ АХ» HIGH SCHOOL Ep1", where: "Facebook", url: "https://www.facebook.com/profile.php?id=100090520350078" },
  goal: "«Шийдний ах» бол Монголын гудамжны сагсан бөмбөгийн соёлыг олон нийтэд таниулах, шинэ үеийн чадварлаг тоглогчдыг олж илрүүлэх, тэднийг хөгжүүлж, бодит боломж нээх зорилготой контент цуврал юм.",
  pillars: ["Соёлыг таниулах", "Тоглогч илрүүлэх", "Хөгжүүлж, боломж нээх"]
};

/* Үнийн саналын маягт — бөглөсөн мэдээлэл энэ имэйл рүү очно (FormSubmit.co үйлчилгээгээр).
   Анх удаа илгээхэд FormSubmit энэ хаяг руу "Activate" гэсэн имэйл явуулна — нэг удаа дарахад л болно. */
window.QUOTE = {
  email: "haserdene0228@gmail.com",
  services: [
    "Тоглолтын зураг авалт",
    "Багийн улирлын контент",
    "Видео / Reels",
    "«Шийдний ах»-д ивээн тэтгэх",
    "Брэнд хамтын ажиллагаа",
    "Бусад"
  ]
};

/* «Шийдний ах»-ыг санаачлагч */
window.KHASAA = {
  nick: "Khasaa",
  name: "ХАС-ЭРДЭНЭ",
  role: "«Шийдний ах» контентыг санаачлагч",
  since: 2014,          // гэрэл зураг авч эхэлсэн он
  proSince: 2020,       // спортын гэрэл зургийг мэргэжлийн түвшинд
  bio: [
    "Гэрэл зурагт 2014 оноос хойш дурлан сонирхлоороо зураг авдаг байсан бол 2020 оноос спортын агшинг мэргэжлийн түвшинд буулгах болсон.",
    "Тэрбээр {teams} зэрэг багуудтай хамтран ажилласан туршлагатай. 2024 онд SG APES багийн бүтэн улирлын контентыг бие даан хариуцан хийж, мөн волейболын SG HAWKS багтай хамтран ажилласан."
  ],
  teams: ["Хасын Хүлэгүүд", "SG APES", "Бишрэлт Метал", "Завхан Бродерс"],
  timeline: [
    { year: "2014", text: "Гэрэл зурагт дурласан" },
    { year: "2020", text: "Спортын агшинг мэргэжлийн түвшинд" },
    { year: "2024", text: "SG APES бүтэн улирал · SG HAWKS волейбол" },
    { year: "2025", text: "«Шийдний ах» эхэлсэн" }
  ]
};

window.SOCIALS = [
  { id: "facebook",  name: "Facebook",  handle: "Airbum - Ball is life", url: BRAND.facebook,  followers: 50858, unit: "дагагч",
    facts: [[2057, "энэ тухай ярьж байна"], ["Sports", "хуудасны төрөл"]], note: "Хамгийн том талбай — шинэ дугаар эхлээд энд гардаг." },
  { id: "youtube",   name: "YouTube",   handle: "@hasaa8246 · Hasaa",    url: BRAND.youtube,   followers: 16800, unit: "subscriber",
    facts: [["yt-views", "нийт үзэлт"], ["yt-top", "шилдэг дугаар"], ["yt-avg", "дундаж үзэлт"], [30, "видео"]], note: "Бүтэн дугаарууд — 1 цаг хүртэлх тоглолт." },
  { id: "instagram", name: "Instagram", handle: "@airbummm",             url: BRAND.instagram, followers: 15900, unit: "дагагч",
    facts: [[472, "пост"], [729, "дагадаг"]], note: "Тоглолтын зураг, тайзны ард, хамтрагч багууд." },
  { id: "tiktok",    name: "TikTok",    handle: "@shiidniiah",           url: BRAND.tiktok,    followers: 2409, unit: "дагагч",
    facts: [["tt-views", "нийт үзэлт"], [40292, "like"], ["tt-top", "шилдэг клип"], [16, "клип"]], note: "Cold moments, dunk, crossover — 1 минутад." }
];

/* Цувралууд. key нь VIDEOS-ийн series-тэй таарна */
window.SERIES = {
  s1:     { name: "Шийдний ах", tag: "Season 1", desc: "Хорооллын шийд бүрээр явж, тэндхийн «ах»-тай нь 1vs1. Бүх зүйл эндээс эхэлсэн." },
  s2:     { name: "Шийдний ах", tag: "Season 2", desc: "Илүү том шийд, илүү хүйтэн мөчүүд. River Garden-ээс Төмөр зам хүртэл." },
  egch:   { name: "Шийдний эгч", tag: "Охидын цуврал", desc: "Энэ охидууд чинь хөвгүүдээ аваад залчихдаг юм байна." },
  duu:    { name: "Шийдний дүү", tag: "U15 · U16", desc: "Дараагийн үеийнхэн. Бага насныхан ч хүйтэн." },
  boc:    { name: "Battle of Champions", tag: "Тэмцээн", desc: "Шийдний ах-уудын аваргуудын тулаан." },
  special:{ name: "Онцгой", tag: "Special", desc: "Dwight Howard-тай тоглосон, цэргийн сургалтын төв ба бусад." }
};

/* YouTube видеонууд. map: газрын зураг дээрх цэгийн id (MAP_SPOTS) */
window.VIDEOS = [
  { id: "hk6eOHGjeCk", series: "special", title: "ШИЙДНИЙ АХ & DWIGHT HOWARD!", views: 136000, len: "32:41", date: "2026.10" },
  { id: "YSw6Li26iR0", series: "duu", title: "Шийдний дүү EP2 — U15", views: 84000, len: "44:08", date: "2026.09" },
  { id: "56lXBP1i3qs", series: "s2", ep: 8, title: "Шийдний ах EP8 — 16-р хороолол", views: 62000, len: "49:46", date: "2026.09", map: "khor16" },
  { id: "lJb6n8HaZA4", series: "s2", ep: 7, title: "Шийдний ах EP7 — 120 мянгат", views: 50000, len: "1:03:52", date: "2026.09", map: "m120" },
  { id: "ILqvxfkQaFk", series: "duu", title: "Шийдний дүү EP1 — U16", views: 66000, len: "47:43", date: "2026.08" },
  { id: "KjhkN7QrNBw", series: "special", title: "Шийдний ах & Зэвсэгт хүчний сургалтын нэгдсэн төв", views: 28000, len: "33:07", date: "2026.08" },
  { id: "JP8d6nC5Y7w", series: "s2", ep: 6, title: "Шийдний ах EP6 — 1-р хороолол", views: 83000, len: "59:55", date: "2026.07", map: "khor1" },
  { id: "Q8yuRLUuaEI", series: "egch", title: "Шийдний эгч EP2", views: 119000, len: "48:05", date: "2026.07" },
  { id: "mdJVf4govbY", series: "s2", ep: 5, title: "Шийдний ах S2 EP5 — Төмөр зам", views: 79000, len: "47:31", date: "2026.06", map: "rail" },
  { id: "7QC1tXu2QGM", series: "s2", ep: 4, title: "Шийдний ах S2 EP4 — 220 мянгат", views: 71000, len: "48:25", date: "2026.06", map: "m220" },
  { id: "nVrHb3WvMQc", series: "egch", title: "Шийдний эгч EP1", views: 257000, len: "27:59", date: "2026.06" },
  { id: "9UlfZJheJxY", series: "s2", ep: 3, title: "Шийдний ах S2 EP3 — 40 мянгат", views: 132000, len: "55:36", date: "2026.06", map: "m40" },
  { id: "89m0GJm8frE", series: "s2", ep: 2, title: "Шийдний ах S2 EP2 — River Garden", views: 91000, len: "43:59", date: "2026.05", map: "river" },
  { id: "2rWN8YCn-tM", series: "s2", ep: 1, title: "Шийдний ах S2 EP1 — Хороолол", views: 84000, len: "51:46", date: "2026.05", map: "khor" },
  { id: "luNQacQ97jI", series: "boc", title: "Battle of Champions — Part 2", views: 100000, len: "40:03", date: "2025.12" },
  { id: "FF-BzAGXXkQ", series: "boc", title: "Battle of Champions — Part 1", views: 142000, len: "32:55", date: "2025.12" },
  { id: "KJs-GNs0rRQ", series: "boc", title: "Battle of Champions — Trailer", views: 8200, len: "1:53", date: "2025.12" },
  { id: "Cf7zaBzbcZk", series: "s1", ep: 8, title: "Шийдний ах EP8 — Бага тойрог", views: 70000, len: "41:19", date: "2025", map: "baga" },
  { id: "RqpjfBhgQ9Q", series: "s1", ep: 7, title: "Шийдний ах EP7 — Хороолол 2-ын байр", views: 71000, len: "29:53", date: "2025", map: "khor" },
  { id: "LE_mUqTxUyo", series: "s1", ep: 6, title: "Шийдний ах EP6 — Модны 2", views: 104000, len: "44:07", date: "2025", map: "modny2" },
  { id: "XYfnu1zPUQo", series: "s1", ep: 5, title: "Шийдний ах EP5 — 13-р хороолол", views: 78000, len: "24:15", date: "2025", map: "khor13" },
  { id: "8teDU5WhKLk", series: "s1", ep: 4, title: "Шийдний ах EP4 — Ахмадын хороолол", views: 69000, len: "30:01", date: "2025", map: "ahmad" },
  { id: "zvmzD-o6-Ik", series: "special", title: "За тэгээд үзэлцье", views: 17000, len: "14:08", date: "2025" },
  { id: "raDsNt_h6T8", series: "s1", ep: 3, title: "Шийдний ах EP3 — 220 мянгат", views: 84000, len: "35:19", date: "2025", map: "m220" },
  { id: "bCG0OFri0DE", series: "s1", ep: 2, title: "Шийдний ах EP2 — БЗД Ногоон сүмийн шийд", views: 121000, len: "27:40", date: "2025", map: "nogoon" },
  { id: "XE3smY001TY", series: "s1", ep: 1, title: "Шийдний ах EP1 — Сансар 3-ын шийд", views: 107000, len: "23:17", date: "2025", map: "sansar" },
  { id: "kTmVhZKOkL8", series: "special", title: "Оюутны лигийн бүх оддын тоглолт", views: 7800, len: "3:47", date: "2019" }
];

/* Газрын зураг дээрх шийдүүд — x, y нь 1000×620 схем дээрх ОЙРОЛЦОО байрлал.
   Буруу байвал x, y-г л засна. */
window.MAP_SPOTS = [
  { id: "khor16", name: "16-р хороолол",     x: 175, y: 250 },
  { id: "khor",   name: "3, 4-р хороолол",   x: 245, y: 318 },
  { id: "khor1",  name: "1-р хороолол",      x: 300, y: 248 },
  { id: "m220",   name: "220 мянгат",        x: 362, y: 302 },
  { id: "rail",   name: "Төмөр зам",         x: 390, y: 388 },
  { id: "modny2", name: "Модны 2",           x: 405, y: 240 },
  { id: "m40",    name: "40 мянгат",         x: 455, y: 190 },
  { id: "baga",   name: "Бага тойрог",       x: 505, y: 300 },
  { id: "m120",   name: "120 мянгат",        x: 548, y: 168 },
  { id: "khor13", name: "13-р хороолол",     x: 640, y: 262 },
  { id: "sansar", name: "Сансар",            x: 668, y: 340 },
  { id: "ahmad",  name: "Ахмадын хороолол",  x: 735, y: 228 },
  { id: "nogoon", name: "БЗД Ногоон сүм",    x: 790, y: 312 },
  { id: "river",  name: "River Garden",      x: 470, y: 478 }
];

/* TikTok клипүүд (thumbnail нь түр хугацааны холбоостой тул зураггүй харуулна) */
window.CLIPS = [
  { id: "7643490076999060743", title: "Шийдний эгч Ep1 👩‍🍳🔥", views: 220600, tag: "Шийдний эгч" },
  { id: "7641680635781713173", title: "Icon moment 😮‍💨", views: 215900, tag: "duel" },
  { id: "7649278634557066516", title: "Ep4 Cold Moments", views: 175000, tag: "cold" },
  { id: "7676354236623572244", title: "Chasedown 🤯🔥", views: 123700, tag: "block" },
  { id: "7643583605721156884", title: "KELBY 🔥", views: 97400, tag: "crossover" },
  { id: "7681567750271094036", title: "«Шийдний ах» cold moments 🥶", views: 74300, tag: "cold" },
  { id: "7644226925673680149", title: "Ep3 cold moment 🥶", views: 70000, tag: "cold" },
  { id: "7653435540989103380", title: "Smooth 🕺", views: 51900, tag: "crossover" },
  { id: "7641888455366102293", title: "Erja 🕺", views: 46600, tag: "crossover" },
  { id: "7649276044431904021", title: "BayraaHood", views: 43400, tag: "crossover" },
  { id: "7649302841785355538", title: "REAL байрны ах! Ep5 Төмөр зам 🔥", views: 41700, tag: "1vs1" },
  { id: "7646077899748936980", title: "Coldest moment 🥶", views: 40900, tag: "cold" },
  { id: "7681227361819299093", title: "✈️ Dunk", views: 35600, tag: "dunk" },
  { id: "7642354610912595220", title: "Jamiaa 😮‍💨", views: 29100, tag: "dunk" },
  { id: "7637409789319974152", title: "«Шийдний ах» S2 тун удахгүй!", views: 13000, tag: "trailer" },
  { id: "7681226929713843477", title: "Airplane mode 🔛", views: 12100, tag: "dunk" }
];
