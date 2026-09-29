/**
 * effects.js — motion layer, no external libraries.
 *
 *   · scramble   labels and titles decode from random characters
 *   · glitch     hero letters swap to symbols with an RGB split
 *   · dither     portrait rendered as flickering pixels behind the hero
 *   · counters   figures count up when they appear
 *   · reveal     blocks fade up, staggered, while scrolling
 *   · cursor     custom dot + ring on devices with a fine pointer
 *
 * main.js calls FX.onRender(root, view) after every view render.
 * Everything is skipped or made static with prefers-reduced-motion.
 */
(function () {
  'use strict';

  var REDUCED = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#%&*+=<>/{}';
  var SYMBOLS = ['+', '÷', '=', '@', '{', '}', '<', '>', '#', '%', '&', '*', '/', '∆', '§'];

  var timers = [];      // cleared on every render
  var observers = [];
  var rafId = null;
  var disposers = [];   // event listeners to remove on cleanup

  function later(fn, ms) { var id = setTimeout(fn, ms); timers.push(id); return id; }
  function every(fn, ms) { var id = setInterval(fn, ms); timers.push(id); return id; }
  function rand(n) { return Math.floor(Math.random() * n); }

  function cleanup() {
    document.querySelectorAll('.mega .ch.sym, .mega .ch.gone').forEach(function (ch) {
      if (ch.dataset.orig) ch.textContent = ch.dataset.orig;
      ch.classList.remove('sym', 'gone');
    });
    timers.forEach(function (id) { clearTimeout(id); clearInterval(id); });
    timers = [];
    observers.forEach(function (o) { o.disconnect(); });
    observers = [];
    if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
    disposers.forEach(function (fn) { fn(); });
    disposers = [];
  }

  function onVisible(els, fn, threshold) {
    if (!('IntersectionObserver' in window)) { els.forEach(fn); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { io.unobserve(en.target); fn(en.target); }
      });
    }, { threshold: threshold || 0.15 });
    els.forEach(function (el) { io.observe(el); });
    observers.push(io);
  }

  /* ═══════════════ SCRAMBLE ═══════════════ */
  function scramble(el, duration) {
    var final = el.dataset.text || el.textContent;
    el.dataset.text = final;
    if (REDUCED) { el.textContent = final; return; }
    var start = null;
    duration = duration || 700;
    function frame(ts) {
      if (!start) start = ts;
      var p = Math.min(1, (ts - start) / duration);
      var solved = Math.floor(p * final.length);
      var out = '';
      for (var i = 0; i < final.length; i++) {
        var c = final[i];
        out += (i < solved || c === ' ' || c === '·') ? c : GLYPHS[rand(GLYPHS.length)];
      }
      el.textContent = out;
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  function initScramble(root) {
    var els = [].slice.call(root.querySelectorAll('[data-scramble]'))
      .filter(function (el) { return el.children.length === 0; });
    onVisible(els, function (el) { scramble(el, 500 + el.textContent.length * 18); }, 0.6);

    // The home eyebrow re-scrambles now and then, like a live terminal
    var eyebrow = root.querySelector('.home-eyebrow[data-scramble]');
    if (eyebrow && !REDUCED) every(function () { scramble(eyebrow, 650); }, 6500);
  }

  /* ═══════════════ HEADLINE GLITCH ═══════════════ */
  function initGlitch(root) {
    var words = [].slice.call(root.querySelectorAll('.mega > span'));
    if (!words.length) return;

    words.forEach(function (w) {
      var txt = w.dataset.word || w.textContent;
      w.setAttribute('aria-label', txt);
      w.innerHTML = txt.split('').map(function (c) {
        return '<span class="ch" aria-hidden="true">' + c + '</span>';
      }).join('');
    });
    if (REDUCED) return;

    function burst() {
      var w = words[rand(words.length)];
      var chars = [].slice.call(w.querySelectorAll('.ch'));
      var len = 1 + rand(3);
      var from = rand(Math.max(1, chars.length - len));
      var picked = chars.slice(from, from + len);
      var mode = Math.random() < 0.3 ? 'gone' : 'sym';
      picked.forEach(function (ch) {
        ch.dataset.orig = ch.textContent;
        if (mode === 'sym') { ch.textContent = SYMBOLS[rand(SYMBOLS.length)]; ch.classList.add('sym'); }
        else ch.classList.add('gone');
      });
      later(function () {
        picked.forEach(function (ch) {
          ch.textContent = ch.dataset.orig;
          ch.classList.remove('sym', 'gone');
        });
      }, 140 + rand(260));
    }
    later(burst, 900);
    every(function () { burst(); if (Math.random() < 0.4) later(burst, 120); }, 2400);
  }

  /* ═══════════════ DITHERED PORTRAIT ═══════════════ */
  var portrait = null;          // { w, h, lum: Float32Array } sampled grid
  var portraitLoading = false;
  var BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

  function loadPortrait(cb) {
    if (portrait) return cb(portrait);
    if (portraitLoading) return;
    portraitLoading = true;
    var img = new Image();
    img.onload = function () {
      var cols = 150;
      var rows = Math.round(cols * img.height / img.width);
      var c = document.createElement('canvas');
      c.width = cols; c.height = rows;
      var ctx = c.getContext('2d');
      ctx.drawImage(img, 0, 0, cols, rows);
      var data;
      try { data = ctx.getImageData(0, 0, cols, rows).data; }
      catch (err) { portraitLoading = false; return; }   // file:// blocks pixel reads
      var lum = new Float32Array(cols * rows);
      for (var i = 0; i < cols * rows; i++) {
        var r = data[i * 4], g = data[i * 4 + 1], b = data[i * 4 + 2], a = data[i * 4 + 3] / 255;
        // brighten mid-tones a bit so the face reads in the dark
        var l = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        // contrast stretch so eyes, brows and hair shadows break the pattern
        l = Math.min(1, Math.max(0, (l - 0.18) / 0.62));
        l = l * l * (3 - 2 * l);
        lum[i] = l * a;
      }
      portrait = { w: cols, h: rows, lum: lum };
      portraitLoading = false;
      cb(portrait);
    };
    img.onerror = function () { portraitLoading = false; };
    img.src = 'img/hero-portrait.png';
  }

  function initDither(root) {
    var canvas = root.querySelector('.hero-dither');
    if (!canvas) return;
    loadPortrait(function (pt) {
      if (!document.body.contains(canvas)) return;
      var ctx = canvas.getContext('2d');
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      var box = canvas.getBoundingClientRect();
      canvas.width = Math.round(box.width * dpr);
      canvas.height = Math.round(box.height * dpr);

      var cell = Math.min(canvas.width / pt.w, canvas.height / pt.h);
      var offX = (canvas.width - cell * pt.w) / 2;
      var offY = (canvas.height - cell * pt.h) * 0.15;
      var size = cell * 0.72;
      var half = size / 2;

      // Every visible cell becomes a particle with a home position
      var LEVELS = 6;
      var bx = [], by = [], lum = [], bay = [], row = [], lvl = [];
      for (var y = 0; y < pt.h; y++) {
        for (var x = 0; x < pt.w; x++) {
          var l = pt.lum[y * pt.w + x];
          if (l < 0.04) continue;
          bx.push(offX + x * cell + cell / 2);
          by.push(offY + y * cell + cell / 2);
          lum.push(l);
          bay.push((BAYER[(y % 4) * 4 + (x % 4)] + 0.5) / 16);
          row.push(y);
          lvl.push(Math.min(LEVELS - 1, Math.floor(l * LEVELS)));
        }
      }
      var m = bx.length;
      var ox = new Float32Array(m), oy = new Float32Array(m);
      var vx = new Float32Array(m), vy = new Float32Array(m);
      var on = new Uint8Array(m);
      var byLevel = [];
      for (var L = 0; L < LEVELS; L++) byLevel.push([]);
      for (var k = 0; k < m; k++) byLevel[lvl[k]].push(k);
      var colors = byLevel.map(function (_, i) {
        return 'rgba(200,210,230,' + (0.25 + ((i + 0.5) / LEVELS) * 0.55).toFixed(2) + ')';
      });
      var accents = [];

      var band = null, nextBand = 0, lastRoll = -1000;
      var pointer = { x: -9999, y: -9999, vx: 0, vy: 0, t: 0, seen: false };

      function reroll(ts) {
        var jitter = REDUCED ? 0 : 0.06;
        accents = [];
        for (var k = 0; k < m; k++) {
          on[k] = lum[k] >= bay[k] + (Math.random() - 0.5) * jitter ? 1 : 0;
          if (on[k] && !REDUCED && Math.random() < 0.012) accents.push(k);
        }
        if (REDUCED) return;
        if (!nextBand) nextBand = ts + 1800;
        if (band && ts > band.until) band = null;
        if (!band && ts > nextBand) {
          band = { y: rand(pt.h), h: 2 + rand(6), dx: (Math.random() < 0.5 ? -1 : 1) * (2 + rand(6)) * cell, until: ts + 160 };
          nextBand = ts + 2000 + rand(1600);
        }
      }

      function physics(ts) {
        var R = 120 * dpr, R2 = R * R;
        var live = ts - pointer.t < 600;
        for (var k = 0; k < m; k++) {
          if (live) {
            var dx = bx[k] + ox[k] - pointer.x, dy = by[k] + oy[k] - pointer.y;
            var d2 = dx * dx + dy * dy;
            if (d2 < R2) {
              var d = Math.sqrt(d2) || 1;
              var f = 1 - d / R; f = f * f;
              // pushed away from the pointer + carried along its movement: a breath of air
              vx[k] += (dx / d) * f * 3.2 * dpr + pointer.vx * f * 0.22;
              vy[k] += (dy / d) * f * 3.2 * dpr + pointer.vy * f * 0.22;
            }
          }
          if (ox[k] !== 0 || oy[k] !== 0 || vx[k] !== 0 || vy[k] !== 0) {
            vx[k] += -ox[k] * 0.04; vy[k] += -oy[k] * 0.04;   // spring home
            vx[k] *= 0.87; vy[k] *= 0.87;                     // air friction
            ox[k] += vx[k]; oy[k] += vy[k];
            if (Math.abs(ox[k]) < 0.05 && Math.abs(oy[k]) < 0.05 && Math.abs(vx[k]) < 0.05 && Math.abs(vy[k]) < 0.05) {
              ox[k] = oy[k] = vx[k] = vy[k] = 0;
            }
          }
        }
        pointer.vx *= 0.8; pointer.vy *= 0.8;
      }

      function paint() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (var L = 0; L < LEVELS; L++) {
          ctx.fillStyle = colors[L];
          var list = byLevel[L];
          for (var i = 0; i < list.length; i++) {
            var k = list[i];
            if (!on[k]) continue;
            var sx = (band && row[k] >= band.y && row[k] < band.y + band.h) ? band.dx : 0;
            ctx.fillRect(bx[k] + ox[k] + sx - half, by[k] + oy[k] - half, size, size);
          }
        }
        ctx.fillStyle = 'rgba(0,188,212,0.9)';
        for (var j = 0; j < accents.length; j++) {
          var a = accents[j];
          ctx.fillRect(bx[a] + ox[a] - half, by[a] + oy[a] - half, size, size);
        }
      }

      if (REDUCED) { reroll(0); paint(); return; }

      function onMove(ev) {
        var r = canvas.getBoundingClientRect();
        var x = (ev.clientX - r.left) * dpr, y = (ev.clientY - r.top) * dpr;
        if (pointer.seen) { pointer.vx = x - pointer.x; pointer.vy = y - pointer.y; }
        pointer.x = x; pointer.y = y; pointer.t = performance.now(); pointer.seen = true;
      }
      window.addEventListener('pointermove', onMove, { passive: true });
      disposers.push(function () { window.removeEventListener('pointermove', onMove); });

      function frame(ts) {
        if (ts - lastRoll > 90) { reroll(ts); lastRoll = ts; }
        physics(ts);
        paint();
        rafId = requestAnimationFrame(frame);
      }
      rafId = requestAnimationFrame(frame);
    });
  }

  /* ═══════════════ COUNTERS ═══════════════ */
  function initCounters(root) {
    var els = [].slice.call(root.querySelectorAll('.stat-n'));
    onVisible(els, function (el) {
      var m = /^(\D*)(\d[\d.,]*)(.*)$/.exec(el.textContent.trim());
      if (!m || REDUCED) return;
      var prefix = m[1], target = parseInt(m[2].replace(/[.,]/g, ''), 10), suffix = m[3];
      var t0 = null;
      function step(ts) {
        if (!t0) t0 = ts;
        var p = Math.min(1, (ts - t0) / 1100);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = prefix + Math.round(target * eased) + suffix;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }, 0.4);
  }

  /* ═══════════════ REVEAL ON SCROLL ═══════════════ */
  var REVEAL = [
    '.view-head', '.stats', '.story p', '.about-side', '.job', '.project-card', '.case-row',
    '.shot', '.member', '.skill-group', '.contact-link', '.block', '.lock-row',
    '.home-gate-text', '.section-title', '.lab-stage', '.gate-card', '.lead', '.marquee'
  ].join(',');

  function initReveal(root) {
    var els = [].slice.call(root.querySelectorAll(REVEAL));
    if (REDUCED) return;
    els.forEach(function (el) {
      var siblings = el.parentElement ? [].slice.call(el.parentElement.children) : [];
      var idx = Math.min(siblings.indexOf(el), 6);
      el.classList.add('rv');
      el.style.transitionDelay = (idx > 0 ? idx * 70 : 0) + 'ms';
    });
    onVisible(els, function (el) { el.classList.add('in'); }, 0.08);
  }

  /* ═══════════════ CURSOR ═══════════════ */
  function initCursor() {
    if (REDUCED || !window.matchMedia('(pointer: fine)').matches) return;
    var dot = document.createElement('div');
    var ring = document.createElement('div');
    dot.className = 'cursor-dot';
    ring.className = 'cursor-ring';
    document.body.appendChild(ring);
    document.body.appendChild(dot);
    document.body.classList.add('has-cursor');

    var mx = -100, my = -100, rx = -100, ry = -100;
    window.addEventListener('mousemove', function (ev) {
      mx = ev.clientX; my = ev.clientY;
      dot.style.transform = 'translate(' + mx + 'px,' + my + 'px)';
    });
    document.addEventListener('mouseover', function (ev) {
      var hot = ev.target.closest('a, button, summary, label, [data-zoom], textarea, input');
      ring.classList.toggle('is-hot', !!hot);
    });
    document.addEventListener('mouseleave', function () { mx = my = -100; });
    (function loop() {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = 'translate(' + rx + 'px,' + ry + 'px)';
      requestAnimationFrame(loop);
    })();
  }

  /* ═══════════════ PUBLIC ═══════════════ */
  window.FX = {
    onRender: function (root) {
      cleanup();
      root.querySelectorAll('.view-head > .mono-label, .section-title, .home-eyebrow, .gate-head .mono-label')
        .forEach(function (el) {
          if (el.children.length === 0) el.setAttribute('data-scramble', '');
        });
      initGlitch(root);
      initScramble(root);
      initDither(root);
      initCounters(root);
      initReveal(root);
    }
  };

  document.addEventListener('DOMContentLoaded', initCursor);
  document.addEventListener('visibilitychange', function () {
    if (document.hidden && rafId) { cancelAnimationFrame(rafId); rafId = null; }
    else if (!document.hidden && !rafId) {
      var app = document.getElementById('app');
      if (app && app.querySelector('.hero-dither')) {
        disposers.forEach(function (fn) { fn(); });
        disposers = [];
        initDither(app);
      }
    }
  });
})();
