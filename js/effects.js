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

  function later(fn, ms) { var id = setTimeout(fn, ms); timers.push(id); return id; }
  function every(fn, ms) { var id = setInterval(fn, ms); timers.push(id); return id; }
  function rand(n) { return Math.floor(Math.random() * n); }

  function cleanup() {
    timers.forEach(function (id) { clearTimeout(id); clearInterval(id); });
    timers = [];
    observers.forEach(function (o) { o.disconnect(); });
    observers = [];
    if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
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
      var txt = w.textContent;
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
      var cols = 118;
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

      // fit the portrait (contain), anchored bottom-centre
      var cell = Math.min(canvas.width / pt.w, canvas.height / pt.h);
      var offX = (canvas.width - cell * pt.w) / 2;
      var offY = canvas.height - cell * pt.h;
      var band = null;
      var last = 0;

      function draw(ts) {
        if (ts - last < 90 && !REDUCED) { rafId = requestAnimationFrame(draw); return; }
        last = ts;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        var jitter = REDUCED ? 0 : 0.06;
        for (var y = 0; y < pt.h; y++) {
          var shift = (band && y >= band.y && y < band.y + band.h) ? band.dx : 0;
          for (var x = 0; x < pt.w; x++) {
            var l = pt.lum[y * pt.w + x];
            if (l < 0.04) continue;
            var threshold = (BAYER[(y % 4) * 4 + (x % 4)] + 0.5) / 16 + (Math.random() - 0.5) * jitter;
            if (l < threshold) continue;
            var accent = !REDUCED && Math.random() < 0.012;
            ctx.fillStyle = accent ? 'rgba(0,188,212,0.9)' : 'rgba(200,210,230,' + (0.25 + l * 0.55).toFixed(2) + ')';
            ctx.fillRect(offX + (x + shift) * cell, offY + y * cell, cell * 0.72, cell * 0.72);
          }
        }
        if (!REDUCED) rafId = requestAnimationFrame(draw);
      }

      if (!REDUCED) {
        every(function () {
          band = { y: rand(pt.h), h: 2 + rand(6), dx: (Math.random() < 0.5 ? -1 : 1) * (2 + rand(6)) };
          later(function () { band = null; }, 160);
        }, 2600);
      }
      rafId = requestAnimationFrame(draw);
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
    else if (!document.hidden && document.querySelector('.hero-dither')) {
      window.FX.onRender(document.getElementById('app'));
    }
  });
})();
