/* Scroll reveal */
(function () {
  var els = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  if (!els.length) return;

  function checkEl(el) {
    if (el.classList.contains('visible')) return;
    var rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 40) {
      el.classList.add('visible');
    }
  }

  function checkAll() {
    els.forEach(function (el) { checkEl(el); });
  }

  checkAll();
  window.addEventListener('scroll', checkAll, { passive: true });
  window.addEventListener('resize', checkAll, { passive: true });
})();

/* Form */
(function () {
  var form      = document.getElementById('waitlist-form');
  var success   = document.getElementById('form-success');
  var errBanner = document.getElementById('form-error-banner');
  var btnSubmit = form && form.querySelector('button[type="submit"]');
  if (!form) return;

  var WORKER_URL = 'https://fletaris-waitlist.uchuva-tech.workers.dev';

  function isEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()); }
  function setErr(id, on) {
    var g = document.getElementById(id);
    if (g) { on ? g.classList.add('has-error') : g.classList.remove('has-error'); }
  }
  function val(id) { var el = document.getElementById(id); return el ? el.value : ''; }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (errBanner) errBanner.style.display = 'none';

    var eErr = !isEmail(val('email'));
    var fErr = !val('fleetsize');
    setErr('group-email',     eErr);
    setErr('group-fleetsize', fErr);
    if (eErr || fErr) { document.getElementById(eErr ? 'email' : 'fleetsize').focus(); return; }

    if (btnSubmit) { btnSubmit.disabled = true; btnSubmit.textContent = 'Sending...'; }

    fetch(WORKER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstname: val('firstname').trim(),
        lastname:  val('lastname').trim(),
        email:     val('email').trim(),
        company:   val('company').trim(),
        fleetsize: val('fleetsize')
      })
    })
    .then(function (res) { if (!res.ok) throw new Error(); return res.json(); })
    .then(function () {
      form.style.display    = 'none';
      success.style.display = 'block';
    })
    .catch(function () {
      if (btnSubmit) { btnSubmit.disabled = false; btnSubmit.textContent = 'Join the waitlist'; }
      if (errBanner) errBanner.style.display = 'block';
    });
  });

  ['email', 'fleetsize'].forEach(function (id) {
    var el = document.getElementById(id);
    if (!el) return;
    ['input', 'change'].forEach(function (ev) {
      el.addEventListener(ev, function () { setErr('group-' + id, false); });
    });
  });
})();

/* ── Lifecycle timeline widget ── */
(function () {
  var hdrEl = document.getElementById('lcMonthHeaders');
  if (!hdrEl) return;

  var now = new Date();
  var months = [];
  for (var i = 0; i < 12; i++) {
    var d = new Date(now.getFullYear(), now.getMonth() + i, 1);
    months.push(d.toLocaleString('en-US', { month: 'short' }));
  }

  months.forEach(function (m, i) {
    var cell = document.createElement('div');
    cell.className = 'lc-month-cell' + (i === 0 ? ' lc-now' : i < 9 ? ' lc-active' : '');
    cell.textContent = m;
    hdrEl.appendChild(cell);
  });

  function buildTrack(id, segments, flags) {
    var wrap = document.getElementById(id);
    if (!wrap) return;

    var nowLine = document.createElement('div');
    nowLine.className = 'lc-now-line';
    nowLine.style.left = '0%';
    wrap.appendChild(nowLine);

    segments.forEach(function (s) {
      var bar = document.createElement('div');
      bar.className = 'lc-bar';
      bar.style.left   = (s.start / 12 * 100) + '%';
      bar.style.width  = ((s.end - s.start) / 12 * 100) + '%';
      bar.style.background = s.bg;
      if (s.label) {
        var txt = document.createElement('span');
        txt.className = 'lc-bar-text';
        txt.style.color = s.color || '#fff';
        txt.textContent = s.label;
        bar.appendChild(txt);
      }
      wrap.appendChild(bar);
    });

    if (flags) {
      flags.forEach(function (f) {
        var flag = document.createElement('div');
        flag.className = 'lc-flag';
        flag.style.left = (f.at / 12 * 100) + '%';
        flag.innerHTML =
          '<div class="lc-flag-dot"></div>' +
          '<div class="lc-flag-line"></div>' +
          '<div class="lc-flag-label">' + f.label + '</div>';
        wrap.appendChild(flag);
      });
    }
  }

  buildTrack('lcAirframe', [
    { start: 0,   end: 8.5, bg: 'rgba(34,197,94,0.15)',  label: 'Within limits',   color: '#4ADE80' },
    { start: 8.5, end: 10,  bg: 'rgba(34,197,94,0.55)',  label: 'C-Check',         color: '#fff'    },
    { start: 10,  end: 12,  bg: 'rgba(34,197,94,0.15)',  label: 'Post-check',      color: '#4ADE80' }
  ], [{ at: 8.5, label: 'C-Check' }]);

  buildTrack('lcEng1', [
    { start: 0, end: 6,  bg: 'rgba(245,158,11,0.15)', label: 'LLP approaching limit', color: '#FCD34D' },
    { start: 6, end: 8,  bg: 'rgba(245,158,11,0.60)', label: 'Shop visit',            color: '#fff'    },
    { start: 8, end: 12, bg: 'rgba(34,197,94,0.15)',  label: 'Restored',              color: '#4ADE80' }
  ], [{ at: 6, label: 'LLP limit' }]);

  buildTrack('lcEng2', [
    { start: 0,   end: 3.5, bg: 'rgba(239,68,68,0.20)', label: 'Unplanned risk window', color: '#FCA5A5' },
    { start: 3.5, end: 5.5, bg: 'rgba(239,68,68,0.65)', label: 'Shop visit',             color: '#fff'    },
    { start: 5.5, end: 12,  bg: 'rgba(34,197,94,0.12)', label: 'Monitoring',             color: '#4ADE80' }
  ], [{ at: 3.5, label: '\u26a0 Act now' }]);

  buildTrack('lcApu', [
    { start: 0,  end: 11, bg: 'rgba(0,196,204,0.12)', label: 'Within return conditions', color: '#00C4CC' },
    { start: 11, end: 12, bg: 'rgba(0,196,204,0.40)', label: 'Review window',            color: '#fff'    }
  ], [{ at: 11, label: 'Lease return' }]);

})();
/* ── End lifecycle timeline widget ── */
