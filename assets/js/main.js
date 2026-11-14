/* ============================================================
   个人博客 · 交互脚本
   1. 明暗主题切换（记忆到 localStorage，首次跟随系统）
   2. 导航栏滚动状态
   3. 元素滚动进入动画
   4. 文章页阅读进度条
   5. 页码标题里的年份自动填充
   ============================================================ */
(function () {
  'use strict';

  /* ---------- 1. 主题 ---------- */
  var STORAGE_KEY = 'blog-theme';
  var root = document.documentElement;

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    var btn = document.querySelector('.theme-toggle');
    if (btn) {
      btn.setAttribute('aria-label', theme === 'dark' ? '切换到浅色模式' : '切换到深色模式');
    }
  }

  function initTheme() {
    var saved = null;
    try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) { /* 隐私模式 */ }

    var prefersDark = window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;

    applyTheme(saved || (prefersDark ? 'dark' : 'light'));

    var btn = document.querySelector('.theme-toggle');
    if (!btn) return;

    btn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      try { localStorage.setItem(STORAGE_KEY, next); } catch (e) { /* ignore */ }
    });

    // 未手动选择时跟随系统变化
    if (!saved && window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
        applyTheme(e.matches ? 'dark' : 'light');
      });
    }
  }

  /* ---------- 2. 导航滚动状态 ---------- */
  function initHeader() {
    var header = document.querySelector('.site-header');
    if (!header) return;

    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- 3. 滚动进入动画 ---------- */
  function initReveal() {
    var els = document.querySelectorAll('.reveal');
    if (!els.length) return;

    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    els.forEach(function (el, i) {
      el.style.transitionDelay = Math.min(i * 55, 240) + 'ms';
      io.observe(el);
    });
  }

  /* ---------- 4. 阅读进度条 ---------- */
  function initProgress() {
    var bar = document.querySelector('.progress-bar');
    if (!bar) return;

    var update = function () {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      var p = h > 0 ? (window.scrollY / h) * 100 : 0;
      bar.style.width = Math.min(100, Math.max(0, p)) + '%';
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
  }

  /* ---------- 5. 年份 ---------- */
  function initYear() {
    document.querySelectorAll('[data-year]').forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  /* ---------- 启动 ---------- */
  function boot() {
    initTheme();
    initHeader();
    initReveal();
    initProgress();
    initYear();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
