(function () {
  'use strict';

  const $ = (sel, all = false) => {
    const el = sel.trim();
    return all ? [...document.querySelectorAll(el)] : document.querySelector(el);
  };

  /* ── Theme ── */

  const applyTheme = (isLight) => {
    document.body.classList.toggle('light-mode', isLight);
    const toggle = $('#theme-toggle');
    if (toggle) {
      toggle.innerHTML = isLight
        ? '<i class="fas fa-moon"></i>'
        : '<i class="fas fa-sun"></i>';
      toggle.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
    }
    localStorage.setItem('portfolio-theme', isLight ? 'light' : 'dark');
  };

    /* ── Scroll reveal ── */

  const initReveal = () => {
    const items = $('.reveal', true);
    if (!items.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    items.forEach((item) => observer.observe(item));
  };

  /* ── Active nav on scroll ── */

  const initScrollSpy = () => {
    const sections = $('section[id]', true);
    const links = $('.nav-links a', true);
    if (!sections.length || !links.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            links.forEach((link) => {
              link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
            });
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    sections.forEach((section) => observer.observe(section));
  };

  /* ── Mobile nav ── */

  const initMobileNav = () => {
    const toggle = $('#nav-toggle');
    const links = $('.nav-links');
    if (!toggle || !links) return;

    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
    });

    $('.nav-links a', true).forEach((link) => {
      link.addEventListener('click', () => links.classList.remove('open'));
    });
  };

  /* ── Notify Me (CallMeBot + Formspree) ── */

  const normalizePhone = (raw) => raw.replace(/[\s\-()]/g, '');

  const isValidVisitorPhone = (phone) => /^\+?\d{8,15}$/.test(phone);

  const buildNotifyMessage = ({ name, phone, message }) => [
    `Portfolio contact from ${name}`,
    '',
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Message: ${message}`,
    `Time: ${new Date().toLocaleString()}`
  ].join('\n');

  const recordLead = async (payload) => {
    const formspreeId = window.portfolioContent?.notify?.formspreeId?.trim();
    if (!formspreeId) return { recorded: false };

    const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        name: payload.name,
        phone: payload.phone,
        message: payload.message,
        _subject: `Portfolio contact from ${payload.name}`
      })
    });

    return { recorded: response.ok };
  };

  const sendWhatsApp = async (text) => {
    const cfg = window.portfolioContent?.notify || {};
    const ownerPhone = normalizePhone(cfg.ownerPhone || '');
    const apiKey = (cfg.callMeBotApiKey || '').trim();

    if (!ownerPhone || !apiKey) {
      return { mode: 'unconfigured' };
    }

    const url = new URL('https://api.callmebot.com/whatsapp.php');
    url.searchParams.set('phone', ownerPhone.startsWith('+') ? ownerPhone : `+${ownerPhone}`);
    url.searchParams.set('text', text);
    url.searchParams.set('apikey', apiKey);

    await fetch(url.toString(), { mode: 'no-cors' });
    return { mode: 'auto' };
  };

  const submitNotify = async ({ name, phone, message }) => {
    const whatsappText = buildNotifyMessage({ name, phone, message });
    const [recordResult, delivery] = await Promise.all([
      recordLead({ name, phone, message }).catch(() => ({ recorded: false })),
      sendWhatsApp(whatsappText)
    ]);

    if (delivery.mode === 'auto') {
      return {
        ok: true,
        message: recordResult.recorded
          ? `Thanks, ${name}! Saved and notified on WhatsApp.`
          : `Thanks, ${name}! Notified on WhatsApp.`
      };
    }

    if (recordResult.recorded) {
      return {
        ok: true,
        message: `Thanks, ${name}! Your message was saved — I'll get back to you soon.`
      };
    }

    return {
      ok: false,
      message: 'Notify service is not configured yet. Please email akshay_hire@outlook.com instead.'
    };
  };

  const initNudge = () => {
    const modal = $('#nudge-modal');
    const form = $('#nudge-form');
    const status = $('#nudge-status');
    const nameInput = $('#nudge-name');
    const phoneInput = $('#nudge-phone');
    const messageInput = $('#nudge-message');
    if (!modal || !form) return;

    const open = () => {
      modal.classList.add('visible');
      setTimeout(() => nameInput && nameInput.focus(), 50);
    };

    const close = () => {
      modal.classList.remove('visible');
      if (status) status.textContent = '';
      form.reset();
    };

    document.addEventListener('click', (e) => {
      if (e.target.closest('.nudge-button')) open();
      if (e.target.closest('.nudge-cancel')) close();
      if (e.target === modal) close();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('visible')) close();
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = (nameInput?.value || '').trim() || 'Anonymous';
      const phone = normalizePhone((phoneInput?.value || '').trim());
      const message = (messageInput?.value || '').trim() || 'Interested in connecting via your portfolio.';

      if (!isValidVisitorPhone(phone)) {
        if (status) status.textContent = 'Please enter a valid WhatsApp number with country code (e.g. +65 9123 4567).';
        return;
      }

      const submitBtn = form.querySelector('[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;
      if (status) status.textContent = 'Sending notification…';

      try {
        const result = await submitNotify({ name, phone, message });
        if (status) status.textContent = result.message;
        if (result.ok) setTimeout(close, 2000);
      } catch (err) {
        if (status) status.textContent = 'Something went wrong. Please email akshay_hire@outlook.com directly.';
      } finally {
        if (submitBtn) submitBtn.disabled = false;
      }
    });
  };

  /* ── Init ── */

  document.addEventListener('DOMContentLoaded', () => {
    if (window.renderAll) renderAll();

    const saved = localStorage.getItem('portfolio-theme');
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    applyTheme(saved ? saved === 'light' : prefersLight);

    $('#theme-toggle')?.addEventListener('click', () => {
      applyTheme(!document.body.classList.contains('light-mode'));
    });

    initReveal();
    initScrollSpy();
    initMobileNav();
    initNudge();
  });

  window.portfolioNotify = {
    normalizePhone,
    isValidVisitorPhone,
    buildNotifyMessage,
    recordLead,
    sendWhatsApp,
    submitNotify
  };
})();
