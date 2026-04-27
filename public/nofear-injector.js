/* ═══════════════════════════════════════════════════════════
   nofear-injector.js — Injected into all pages
   Dynamically replaces "Jam" with "NoFear" when in /nofear routes
   ═══════════════════════════════════════════════════════════ */

(function() {
  'use strict';

  const REPLACEMENTS = [
    [/JamZia/g, 'NoFear'],
    [/JamPsych/g, 'NoFearPsych'],
    [/JamTherapy/g, 'NoFearTherapy'],
    [/JamPros/g, 'NoFearPros'],
    [/JamDoctor/g, 'NoFearDoctor'],
    [/JamLawyer/g, 'NoFearLawyer'],
    [/JamCPA/g, 'NoFearCPA'],
    [/JamBankers/g, 'NoFearBankers'],
    [/JamBrokers/g, 'NoFearBrokers'],
    [/JamMastery/g, 'NoFearMastery'],
    [/JamBattle/g, 'NoFearBattle'],
    [/JamLearn/g, 'NoFearLearn'],
    [/JamAudio/g, 'NoFearAudio'],
    [/JamVideo/g, 'NoFearVideo'],
    [/JamLive/g, 'NoFearLive'],
    [/JamSocial/g, 'NoFearSocial'],
    [/JamShop/g, 'NoFearShop'],
    [/JamPay/g, 'NoFearPay'],
    [/JamFood/g, 'NoFearFood'],
    [/JamGames/g, 'NoFearGames'],
    [/JamCourses/g, 'NoFearCourses'],
    [/JamNews/g, 'NoFearNews'],
    [/JamEarth/g, 'NoFearEarth'],
    [/JamWeather/g, 'NoFearWeather'],
    [/JamTech/g, 'NoFearTech'],
    [/JamGreen/g, 'NoFearGreen'],
    [/JamGrow/g, 'NoFearGrow'],
    [/JamAuto/g, 'NoFearAuto'],
    [/JamBox/g, 'NoFearBox'],
    [/JamCat/g, 'NoFearCat'],
    [/JamWise/g, 'NoFearWise'],
    [/JamStreet/g, 'NoFearStreet'],
    [/JamAR/g, 'NoFearAR'],
    [/JamTok/g, 'NoFearTok'],
    [/JamWords/g, 'NoFearWords'],
    [/JamLab/g, 'NoFearLab'],
    [/JamKind/g, 'NoFearKind'],
    [/JamTribute/g, 'NoFearTribute'],
    [/JamScale/g, 'NoFearScale'],
    [/JamMed/g, 'NoFearMed'],
    [/JamDEX/g, 'NoFearDEX'],
    [/JamGrants/g, 'NoFearGrants'],
    [/JamCredits/g, 'NoFearCredits'],
    [/JamCom/g, 'NoFearCom'],
    [/JamFed/g, 'NoFearFed'],
    [/JamState/g, 'NoFearState'],
    [/JamLocal/g, 'NoFearLocal'],
    [/JamLaw/g, 'NoFearLaw'],
    [/JamCode/g, 'NoFearCode'],
    [/JamDocs/g, 'NoFearDocs'],
    [/JamRep/g, 'NoFearRep'],
    [/JamTerms/g, 'NoFearTerms'],
    [/JamPrivacy/g, 'NoFearPrivacy'],
    [/JamProfile/g, 'NoFearProfile'],
    [/JamCommand/g, 'NoFearCommand'],
    [/\bJam\b/g, 'NoFear'],
  ];

  function isNoFearMode() {
    return window.location.hash.startsWith('#/nofear') || sessionStorage.getItem('nofear_active');
  }

  function replaceText(node) {
    if (!isNoFearMode()) return;
    if (node.nodeType === Node.TEXT_NODE) {
      let text = node.textContent;
      let changed = false;
      for (const [pattern, replacement] of REPLACEMENTS) {
        if (pattern.test(text)) {
          text = text.replace(pattern, replacement);
          changed = true;
        }
      }
      if (changed) node.textContent = text;
    } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName !== 'SCRIPT' && node.tagName !== 'STYLE') {
      for (const child of node.childNodes) {
        replaceText(child);
      }
    }
  }

  function replaceTitle() {
    if (!isNoFearMode()) return;
    if (document.title.includes('Jam')) {
      let t = document.title;
      for (const [pattern, replacement] of REPLACEMENTS) {
        t = t.replace(pattern, replacement);
      }
      document.title = t;
    }
  }

  function updateBodyClass() {
    if (isNoFearMode()) {
      document.body.classList.add('nofear-active');
      document.body.classList.remove('jamzia-active');
      document.documentElement.style.setProperty('--nofear-primary', '#4A90A4');
      document.documentElement.style.setProperty('--nofear-secondary', '#D4A574');
    } else {
      document.body.classList.add('jamzia-active');
      document.body.classList.remove('nofear-active');
    }
  }

  // Initial run
  updateBodyClass();
  replaceText(document.body);
  replaceTitle();

  // Watch for dynamic content changes
  const observer = new MutationObserver((mutations) => {
    if (!isNoFearMode()) return;
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.TEXT_NODE) {
          replaceText(node);
        }
      }
    }
    replaceTitle();
  });

  observer.observe(document.body, { childList: true, subtree: true });

  // Re-run periodically
  setInterval(() => {
    updateBodyClass();
    if (isNoFearMode()) {
      replaceText(document.body);
      replaceTitle();
    }
  }, 500);

  // Listen for hash changes
  window.addEventListener('hashchange', () => {
    updateBodyClass();
    if (isNoFearMode()) {
      replaceText(document.body);
      replaceTitle();
    }
  });

  console.log('[NoFear] White-label injector active — watching for /nofear routes');
})();
