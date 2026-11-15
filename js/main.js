/* main.js — «ШИЙДНИЙ АХ» сайтын бүх үйлдэл.
   Бүх код нэг функц дотор (IIFE) — хөтчийн глобал нэртэй (top, name г.м.) мөргөлдөхгүй.
   1. Туслах   2. Шидэлтийн тоглоом   3. Ticker   4. Скорборд   5. Цуврал
   6. Газрын зураг   7. Дугаарууд   8. Клипүүд   9. Сошиал   10. Хамтрагч   11. Тоглуулагч */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const sum = a => a.reduce((s, n) => s + n, 0);
  /* 3612200 → "3.61M", 50858 → "50.9K", 2409 → "2.41K" */
  const fmt = n => n >= 1e6 ? +(n / 1e6).toFixed(2) + 'M' : n >= 1000 ? +(n / 1000).toFixed(n >= 1e5 ? 0 : n >= 1e4 ? 1 : 2) + 'K' : String(n);
  const thumb = (id, q = 'hqdefault') => `https://i.ytimg.com/vi/${id}/${q}.jpg`;
  const byId = id => VIDEOS.find(v => v.id === id);

  /* ---------- Нийт тоонууд ---------- */
  const ytViews = sum(VIDEOS.map(v => v.views));
  const ttViews = sum(CLIPS.map(c => c.views));
  const ytTop = [...VIDEOS].sort((a, b) => b.views - a.views)[0];
  const derived = {
    'yt-views': ytViews, 'yt-top': ytTop.views, 'yt-avg': Math.round(ytViews / VIDEOS.length),
    'tt-views': ttViews, 'tt-top': Math.max(...CLIPS.map(c => c.views))
  };
  SOCIALS.find(s => s.id === 'youtube').views = ytViews;
  SOCIALS.find(s => s.id === 'tiktok').views = ttViews;
  const totalViews = ytViews + ttViews;
  const totalFollowers = sum(SOCIALS.map(s => s.followers));

  $$('[data-link]').forEach(a => { a.href = BRAND[a.dataset.link]; });

  /* Дэлгэцэнд гарахад тоолж эхлэх */
  function countUp(el) {
    const end = +el.dataset.count, t0 = performance.now(), dur = 1500, plus = 'plus' in el.dataset;
    const step = now => {
      const p = Math.min(1, (now - t0) / dur), v = Math.round(end * (1 - Math.pow(1 - p, 3)));
      el.textContent = (el.dataset.raw ? v : fmt(v)) + (p === 1 && plus ? '+' : '');
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
  const seen = new IntersectionObserver(entries => entries.forEach(e => {
    if (!e.isIntersecting) return;
    seen.unobserve(e.target);
    e.target.classList.add('in');
    $$('[data-count]', e.target).forEach(countUp);
  }), { threshold: 0.2 });

  /* ---------- 2. ШИДЭЛТИЙН ТОГЛООМ ---------- */
  const game = $('#game'), ball = $('#ball'), msg = $('#shot-msg');
  const st = { score: 0, streak: 0, made: 0, shots: 0, busy: false };
  const MAKE = ['SWISH!', 'Bucket!', 'Cold 🥶', 'Шийдний ах!', 'Цэвэр!'];
  const MISS = ['BRICK!', 'Обор!', 'Дахиад!', 'Ойрхон байлаа…'];
  const pick = a => a[Math.floor(Math.random() * a.length)];

  function shoot() {
    if (st.busy) return;
    st.busy = true;
    const make = Math.random() < (st.streak >= 4 ? 0.4 : 0.6);      // дараалан оновол бага зэрэг хэцүүднэ
    const g = game.getBoundingClientRect(), b = ball.getBoundingClientRect(), rim = $('.rim', game).getBoundingClientRect();
    const sx = 0, sy = 0;
    const ex = (rim.left + rim.width / 2) - (b.left + b.width / 2) + (make ? 0 : (Math.random() < .5 ? -1 : 1) * rim.width * 0.45);
    const ey = (rim.top - b.height * 0.35) - b.top;
    const peak = Math.min(g.height * 0.45, 220);
    const dur = reduced ? 1 : 900, t0 = performance.now();
    msg.textContent = '';
    msg.className = 'shot-msg';
    const fly = now => {
      const t = Math.min(1, (now - t0) / dur);
      const x = sx + (ex - sx) * t;
      const y = sy + (ey - sy) * t - peak * 4 * t * (1 - t);
      ball.style.transform = `translate(${x}px, ${y}px) rotate(${t * 540}deg)`;
      if (t < 1) return requestAnimationFrame(fly);
      finish(make, ex, ey);
    };
    requestAnimationFrame(fly);
  }

  function finish(make, ex, ey) {
    st.shots++;
    if (make) { st.made++; st.streak++; st.score += st.streak >= 3 ? 3 : 2; }
    else st.streak = 0;
    // Бөмбөг торон дундуур унах эсвэл цагирагнаас ойх
    const drop = make ? `translate(${ex}px, ${ey + 90}px) rotate(600deg)` : `translate(${ex + (ex > 0 ? 60 : -60)}px, ${ey + 120}px) rotate(700deg)`;
    ball.style.transition = 'transform .45s cubic-bezier(.4,0,.8,.6)';
    ball.style.transform = drop;
    if (make) { game.classList.remove('swish'); void game.offsetWidth; game.classList.add('swish'); }
    let text = make ? pick(MAKE) : pick(MISS);
    if (make && st.streak === 3) text = 'ON FIRE 🔥';
    if (make && st.streak >= 5) text = 'ШИЙДНИЙ АХ ЧИ!';
    msg.textContent = text;
    msg.className = 'shot-msg show ' + (make ? 'ok' : 'no');
    ball.classList.toggle('fire', st.streak >= 3);
    $('#g-score').textContent = st.score;
    $('#g-streak').textContent = st.streak;
    $('#g-pct').textContent = Math.round(st.made / st.shots * 100) + '%';
    setTimeout(() => {                                   // бөмбгийг буцааж байранд нь
      ball.style.transition = 'none';
      ball.style.transform = 'translate(0, 30px)';
      requestAnimationFrame(() => { ball.style.transition = 'transform .35s cubic-bezier(.3,1.6,.5,1)'; ball.style.transform = ''; });
      setTimeout(() => { ball.style.transition = ''; st.busy = false; }, 380);
    }, 650);
  }
  $('#shoot').addEventListener('click', shoot);
  ball.addEventListener('click', shoot);
  addEventListener('keydown', e => {
    if (e.code !== 'Space' || /INPUT|TEXTAREA|BUTTON/.test(document.activeElement.tagName) || !$('#player').hidden) return;
    const r = game.getBoundingClientRect();
    if (r.bottom < 0 || r.top > innerHeight) return;    // тоглоом дэлгэцэнд байхгүй бол хуудсыг л гүйлгэнэ
    e.preventDefault();
    shoot();
  });

  /* ---------- 3. TICKER — спорт мэдээний гүйдэг мөр ---------- */
  const tickerItems = [
    `<b>ШИНЭ</b> ${esc(BRAND.latest.title)} — ${esc(BRAND.latest.where)}`,
    `<b>${fmt(totalFollowers)}+</b> дагагч 4 платформд`,
    `<b>${fmt(totalViews)}+</b> нийт үзэлт`,
    `${esc(ytTop.title)} — <b>${fmt(ytTop.views)}</b> үзэлт`,
    `<b>${MAP_SPOTS.length}</b> шийд, нэг хот`,
    `TikTok клипийн дундаж <b>${fmt(Math.round(ttViews / CLIPS.length))}</b> үзэлт`
  ];
  const tick = tickerItems.map(t => `<span>${t}</span><i>●</i>`).join('');
  $('#ticker').innerHTML = tick + tick;

  /* ---------- 4. СКОРБОРД ---------- */
  const longEps = VIDEOS.filter(v => v.series === 's1' || v.series === 's2').length;
  const board = [
    ['ДАГАГЧ', totalFollowers, true], ['ҮЗЭЛТ', totalViews, true],
    ['ДУГААР', VIDEOS.length, false, true], ['ШИЙД', MAP_SPOTS.length, false, true],
    ['LIKE', 40292, false], ['1vs1', longEps, false, true]
  ];
  $('#sb-grid').innerHTML = board.map(([label, n, plus, raw]) =>
    `<div class="sb-cell"><span>${label}</span><b data-count="${n}" ${plus ? 'data-plus' : ''} ${raw ? 'data-raw="1"' : ''}>0</b></div>`).join('');
  seen.observe($('#scoreboard'));
  // 24 секундын шот цаг
  let clock = 24;
  setInterval(() => {
    clock = clock <= 0 ? 24 : clock - 1;
    const el = $('#shot-clock');
    el.textContent = String(clock).padStart(2, '0');
    el.classList.toggle('buzz', clock === 0);
  }, 1000);

  /* ---------- 5. ЦУВРАЛУУД — тоглогчийн карт маягаар ---------- */
  $('#series-grid').innerHTML = Object.entries(SERIES).map(([key, s], i) => {
    const vids = VIDEOS.filter(v => v.series === key);
    const views = sum(vids.map(v => v.views));
    const best = Math.max(...vids.map(v => v.views));
    return `
    <button class="card" type="button" data-series="${key}" style="--r:${[-2, 1.5, -1, 2, -1.5, 1][i]}deg">
      <span class="card-photo"><img src="${thumb(vids[0].id)}" alt="" loading="lazy"><em>${esc(s.tag)}</em></span>
      <span class="card-name">${esc(s.name)}</span>
      <span class="card-desc">${esc(s.desc)}</span>
      <span class="card-stats">
        <span><b>${vids.length}</b>дугаар</span>
        <span><b>${fmt(views)}</b>үзэлт</span>
        <span><b>${fmt(best)}</b>шилдэг</span>
      </span>
    </button>`;
  }).join('');
  $('#series-grid').addEventListener('click', e => {
    const c = e.target.closest('[data-series]');
    if (!c) return;
    setFilter(c.dataset.series);
    $('#episodes').scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  });
  $$('.card').forEach(c => seen.observe(c));

  /* ---------- 6. ГАЗРЫН ЗУРАГ ---------- */
  const spotVids = id => VIDEOS.filter(v => v.map === id);
  $('#city').innerHTML = `
    <defs>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" class="grid-line"/></pattern>
    </defs>
    <rect width="1000" height="620" class="map-bg"/>
    <rect width="1000" height="620" fill="url(#grid)"/>
    <path class="mountain" d="M0 620 L0 568 Q120 520 230 552 Q340 506 470 548 Q600 498 720 546 Q860 512 1000 556 L1000 620 Z"/>
    <text class="map-label faint" x="760" y="598">Богд хан уул</text>
    <path class="river" d="M0 522 C 180 488, 300 548, 470 516 S 760 470, 1000 502"/>
    <text class="map-label river-label" x="70" y="500">Туул гол</text>
    <path class="river thin" d="M585 0 C 560 120, 615 210, 575 330 S 540 450, 548 510"/>
    <path class="rail" d="M40 412 L960 380"/>
    <path class="rail-ties" d="M40 412 L960 380"/>
    <text class="map-label" x="70" y="436">Төмөр зам</text>
    <path class="road" d="M30 334 L970 316"/>
    <text class="map-label small" x="36" y="324">Энхтайваны өргөн чөлөө</text>
    <ellipse class="ring" cx="505" cy="292" rx="262" ry="158"/>
    <rect class="ring small" x="458" y="266" width="96" height="70" rx="22"/>
    ${MAP_SPOTS.map(s => {
      const n = spotVids(s.id).length;
      return `<g class="spot" data-spot="${s.id}" transform="translate(${s.x} ${s.y})" tabindex="0" role="button" aria-label="${esc(s.name)}, ${n} дугаар">
        <circle class="pulse" r="16"/>
        <circle class="pin" r="11"/>
        <path class="pin-ball" d="M-11 0H11M0-11V11M-7-8C-2-3-2 3-7 8M7-8C2-3 2 3 7 8"/>
        ${n > 1 ? `<g class="badge" transform="translate(10 -12)"><circle r="8"/><text y="3.5">${n}</text></g>` : ''}
        <text class="spot-name" y="30">${esc(s.name)}</text>
      </g>`;
    }).join('')}`;

  function showSpot(id) {
    const s = MAP_SPOTS.find(x => x.id === id);
    const vids = spotVids(id);
    $$('.spot').forEach(g => g.classList.toggle('on', g.dataset.spot === id));
    $('#spot-panel').innerHTML = `
      <p class="spot-kicker">📍 ШИЙД</p>
      <h3>${esc(s.name)}</h3>
      <p class="spot-meta">${vids.length} дугаар · ${fmt(sum(vids.map(v => v.views)))} үзэлт</p>
      ${vids.map(v => `
        <button class="spot-ep" type="button" data-play="${v.id}">
          <img src="${thumb(v.id, 'mqdefault')}" alt="" loading="lazy">
          <span><b>${esc(SERIES[v.series].tag)} · EP${v.ep}</b><small>${fmt(v.views)} үзэлт · ${esc(v.len)}</small></span>
          <i>▶</i>
        </button>`).join('')}`;
  }
  $('#city').addEventListener('click', e => { const g = e.target.closest('.spot'); if (g) showSpot(g.dataset.spot); });
  $('#city').addEventListener('keydown', e => {
    const g = e.target.closest('.spot');
    if (g && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); showSpot(g.dataset.spot); }
  });
  showSpot('sansar');                                   // анхны дугаар хаана болсныг харуулна
  const mapBox = $('.map-box');                          // утсан дээр газрын зургийг голлуулна
  if (mapBox.scrollWidth > mapBox.clientWidth) mapBox.scrollLeft = (mapBox.scrollWidth - mapBox.clientWidth) / 2;

  /* ---------- 7. ДУГААРУУД ---------- */
  $('#filters').innerHTML = `<button type="button" class="on" data-filter="all">Бүгд</button>` +
    Object.entries(SERIES).map(([k, s]) => `<button type="button" data-filter="${k}">${esc(s.name === 'Шийдний ах' ? s.tag : s.name)}</button>`).join('');
  $('#ep-grid').innerHTML = VIDEOS.map((v, i) => `
    <button class="ep" type="button" data-play="${v.id}" data-series="${v.series}" style="--r:${((i * 53) % 7 - 3) * 0.6}deg">
      <span class="ep-thumb"><img src="${thumb(v.id)}" alt="" loading="lazy"><i>${esc(v.len)}</i><em>▶</em></span>
      <span class="ep-tag tag-${v.series}">${esc(SERIES[v.series].name)}${v.series === 's1' || v.series === 's2' ? ' · ' + esc(SERIES[v.series].tag) : ''}</span>
      <span class="ep-title">${esc(v.title)}</span>
      <span class="ep-meta">${fmt(v.views)} үзэлт · ${esc(v.date)}</span>
    </button>`).join('');
  function setFilter(f) {
    $$('#filters button').forEach(b => b.classList.toggle('on', b.dataset.filter === f));
    $$('.ep').forEach(c => { c.hidden = f !== 'all' && c.dataset.series !== f; });
  }
  $('#filters').addEventListener('click', e => { const b = e.target.closest('[data-filter]'); if (b) setFilter(b.dataset.filter); });
  $$('.ep').forEach(c => seen.observe(c));

  /* ---------- 8. TIKTOK КЛИПҮҮД ---------- */
  $('#clips-lead').innerHTML = `${CLIPS.length} клип · нийт <b>${fmt(ttViews)}</b> үзэлт · дунджаар <b>${fmt(Math.round(ttViews / CLIPS.length))}</b>. Хамгийн их үзсэнээс нь эхлээд:`;
  const maxClip = Math.max(...CLIPS.map(c => c.views));
  $('#clip-strip').innerHTML = CLIPS.map((c, i) => `
    <a class="clip" href="https://www.tiktok.com/@shiidniiah/video/${c.id}" target="_blank" rel="noopener" style="--r:${((i * 37) % 7 - 3) * 0.8}deg;--h:${(c.views / maxClip * 100).toFixed(0)}%">
      <span class="clip-rank">#${i + 1}</span>
      <span class="clip-views">${fmt(c.views)}</span>
      <span class="clip-bar"><i></i></span>
      <span class="clip-title">${esc(c.title)}</span>
      <span class="clip-tag">#${esc(c.tag)}</span>
    </a>`).join('');

  /* ---------- 9. СОШИАЛ ---------- */
  const ICON = {
    youtube: '<rect x="2" y="5" width="20" height="14" rx="4"/><path d="M10 9v6l5-3z" fill="currentColor" stroke="none"/>',
    tiktok: '<path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5"/><path d="M14 3c.4 2.6 2.2 4.4 5 4.6"/>',
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none"/>',
    facebook: '<path d="M14 21v-8h3l.5-3.5H14V7.8c0-1 .3-1.8 1.8-1.8h1.8V3a24 24 0 0 0-2.6-.1C12.4 2.9 10.5 4.5 10.5 7.4v2.1h-3V13h3v8"/>'
  };
  const icon = id => `<svg class="brand" viewBox="0 0 24 24" aria-hidden="true">${ICON[id]}</svg>`;
  const ranked = [...SOCIALS].sort((a, b) => b.followers - a.followers);
  const pct = s => (s.followers / totalFollowers * 100);
  const viewLead = [...SOCIALS].filter(s => s.views).sort((a, b) => b.views - a.views)[0];
  $('#audience').innerHTML = `
    <div class="aud-bar">${ranked.map((s, i) => `<span class="aud-seg seg-${s.id}" style="--w:${pct(s).toFixed(1)}%;--i:${i}">${pct(s) >= 7 ? `${icon(s.id)}${pct(s).toFixed(0)}%` : ''}</span>`).join('')}</div>
    <p class="aud-caption"><b>${fmt(totalFollowers)}+</b> дагагчийн <b>${pct(ranked[0]).toFixed(0)}%</b> нь ${esc(ranked[0].name)}-д. Харин үзэлтийн <b>${(viewLead.views / totalViews * 100).toFixed(0)}%</b> нь ${esc(viewLead.name)}-ээс (${fmt(viewLead.views)}).</p>`;
  seen.observe($('#audience'));
  const factValue = v => typeof v === 'number' ? fmt(v) : (v in derived ? fmt(derived[v]) : esc(v));
  $('#social-grid').innerHTML = SOCIALS.map((s, i) => `
    <a class="social seg-${s.id}" href="${esc(s.url)}" target="_blank" rel="noopener" style="--r:${[-2, 1.5, -1.5, 2][i]}deg">
      <span class="social-top">${icon(s.id)}<span>${esc(s.name)}</span></span>
      <b class="social-num" data-count="${s.followers}">0</b>
      <span class="social-unit">${esc(s.unit)}</span>
      <span class="facts">${s.facts.map(([v, l]) => `<span class="fact"><b>${factValue(v)}</b><small>${esc(l)}</small></span>`).join('')}</span>
      <span class="social-note">${esc(s.note)}</span>
      <span class="social-handle">${esc(s.handle)} ↗</span>
    </a>`).join('');
  $$('.social').forEach(c => seen.observe(c));

  /* ---------- GOAL — зорилго ---------- */
  $('#goal-text').textContent = BRAND.goal;
  $('#pillars').innerHTML = BRAND.pillars.map((p, i) => `<li style="--i:${i}"><b>0${i + 1}</b>${esc(p)}</li>`).join('');
  seen.observe($('#goal'));

  /* ---------- WHO IS KHASAA — санаачлагч ---------- */
  const year = new Date().getFullYear();
  $('#kh-name').textContent = `“${KHASAA.nick}”`;
  $('#kh-pill').innerHTML = `🏀 ${esc(KHASAA.role)} <b>${esc(KHASAA.name)}</b>`;
  $('#kh-years').textContent = year - KHASAA.since;
  $('#kh-pro').textContent = year - KHASAA.proSince;
  // Багуудын нэрийг улбар шараар тодруулна (слайд дээрхтэй адил)
  const teamList = KHASAA.teams.map(t => `<mark>${esc(t)}</mark>`).join(', ');
  $('#kh-bio').innerHTML = KHASAA.bio.map(p => `<p>${esc(p).replace('{teams}', teamList)}</p>`).join('');
  $('#kh-timeline').innerHTML = KHASAA.timeline.map((t, i) => `<li style="--i:${i}"><b>${esc(t.year)}</b><span>${esc(t.text)}</span></li>`).join('') +
    `<li class="now" style="--i:${KHASAA.timeline.length}"><b>Одоо</b><span>${fmt(totalFollowers)}+ дагагч · ${fmt(totalViews)}+ үзэлт</span></li>`;
  seen.observe($('#khasaa'));

  /* ---------- 10. ХАМТРАН АЖИЛЛАХ ---------- */
  const phone = $('#phone');
  phone.textContent = '📲 ' + BRAND.phone;
  phone.href = 'tel:+976' + BRAND.phone.replace(/\D/g, '');
  $('#foot-links').innerHTML = SOCIALS.map(s => `<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.name)}</a>`).join('');

  /* ---------- 10б. ҮНИЙН САНАЛЫН МАЯГТ ---------- */
  const form = $('#quote-form'), status = $('#qf-status');
  $('#qf-no').textContent = String(Date.now()).slice(-5);              // хүсэлтийн дугаар (чимэглэл)
  $('#qf-services').innerHTML = QUOTE.services.map((s, i) =>
    `<label class="qf-chip"><input type="checkbox" name="service" value="${esc(s)}"><span>${esc(s)}</span></label>`).join('');

  const rules = {
    name: v => v.length >= 2 || 'Нэрээ бичнэ үү',
    phone: v => v.replace(/\D/g, '').length >= 8 || 'Утасны дугаараа зөв бичнэ үү (8+ орон)',
    email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Имэйлээ зөв бичнэ үү',
    company: v => v.length >= 2 || 'Хаана ажилладгаа бичнэ үү',
    position: v => v.length >= 2 || 'Албан тушаалаа бичнэ үү'
  };
  function check(input) {
    const rule = rules[input.name];
    if (!rule) return true;
    const ok = rule(input.value.trim());
    const field = input.closest('.qf-field');
    field.classList.toggle('bad', ok !== true);
    field.dataset.error = ok === true ? '' : ok;
    return ok === true;
  }
  $$('input', form).forEach(i => i.addEventListener('blur', () => { if (i.value) check(i); }));

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const inputs = $$('input[name]', form).filter(i => rules[i.name]);
    const results = inputs.map(check);
    if (results.includes(false)) {
      status.className = 'qf-status err';
      status.textContent = 'Тэмдэглэсэн талбаруудыг бөглөнө үү.';
      inputs[results.indexOf(false)].focus();
      return;
    }
    const f = new FormData(form);
    if (f.get('_honey')) return;                                        // бот
    const services = f.getAll('service');
    const data = {
      'Нэр': f.get('name').trim(),
      'Утас': f.get('phone').trim(),
      'Имэйл': f.get('email').trim(),
      'Байгууллага': f.get('company').trim(),
      'Албан тушаал': f.get('position').trim(),
      'Үйлчилгээ': services.join(', ') || '—',
      'Дэлгэрэнгүй': f.get('details').trim() || '—',
      _subject: `Үнийн саналын хүсэлт — ${f.get('name').trim()} (${f.get('company').trim()})`,
      _replyto: f.get('email').trim(),
      _template: 'table',
      _captcha: 'false'
    };
    const btn = $('.qf-submit', form);
    btn.disabled = true;
    btn.textContent = 'Илгээж байна…';
    status.className = 'qf-status';
    status.textContent = '';
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${QUOTE.email}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data)
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || String(json.success) !== 'true') throw new Error(json.message || res.status);
      form.classList.add('sent');
      form.innerHTML = `
        <div class="qf-done">
          <span class="qf-ball" aria-hidden="true"></span>
          <h3>SWISH! Хүсэлт илгээгдлээ</h3>
          <p>Баярлалаа, ${esc(data['Нэр'])}. Хасаа таны мэдээллийг хараад <b>${esc(data['Имэйл'])}</b> хаяг руу үнийн саналаа илгээнэ.</p>
        </div>`;
    } catch (err) {
      console.warn('Quote form:', err.message);                         // FormSubmit-ийн хариуг console-д харуулна
      // Үйлчилгээ ажиллахгүй бол зочны имэйл програмаар бэлэн захиа нээх боломж өгнө
      const body = Object.entries(data).filter(([k]) => !k.startsWith('_')).map(([k, v]) => `${k}: ${v}`).join('\n');
      const mailto = `mailto:${QUOTE.email}?subject=${encodeURIComponent(data._subject)}&body=${encodeURIComponent(body)}`;
      const notActive = /activat/i.test(err.message);                    // маягт хараахан идэвхжээгүй
      status.className = 'qf-status err';
      status.innerHTML = (notActive ? 'Маягт түр идэвхжээгүй байна. ' : 'Илгээж чадсангүй. ') +
        `<a href="${mailto}">Имэйлээр шууд илгээх</a> эсвэл ${esc(BRAND.phone)} руу залгана уу.`;
      btn.disabled = false;
      btn.textContent = 'Дахин илгээх ➜';
    }
  });

  /* ---------- 11. ВИДЕО ТОГЛУУЛАГЧ ---------- */
  let lastFocus = null;
  function play(id) {
    const v = byId(id);
    if (!v) return;
    lastFocus = document.activeElement;
    $('#player-frame').innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0" title="${esc(v.title)}" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`;
    $('#player-title').innerHTML = `${esc(v.title)} · <a href="https://www.youtube.com/watch?v=${id}" target="_blank" rel="noopener">YouTube-ээс үзэх ↗</a>`;
    $('#player').hidden = false;
    document.body.style.overflow = 'hidden';
    $('#player-close').focus();
  }
  function closePlayer() {
    $('#player').hidden = true;
    $('#player-frame').innerHTML = '';
    document.body.style.overflow = '';
    lastFocus?.focus();
  }
  document.addEventListener('click', e => { const b = e.target.closest('[data-play]'); if (b) play(b.dataset.play); });
  $('#player-close').addEventListener('click', closePlayer);
  $('#player').addEventListener('click', e => { if (e.target.id === 'player') closePlayer(); });
  addEventListener('keydown', e => { if (e.key === 'Escape' && !$('#player').hidden) closePlayer(); });
})();
