/*
 * Wires the header light/dark toggle.
 *
 * The attribute is already on <html> by the time this runs — the inline script
 * in <head> sets it before first paint so the page never flashes the wrong
 * theme. This file only handles the click and remembers the choice.
 */
(function () {
  var button = document.querySelector('.theme-toggle');
  if (!button) return;

  var root = document.documentElement;
  var media = window.matchMedia('(prefers-color-scheme: dark)');

  function currentlyDark() {
    var chosen = root.getAttribute('data-theme');
    return chosen ? chosen === 'dark' : media.matches;
  }

  function label() {
    button.setAttribute(
      'aria-label',
      currentlyDark() ? 'Switch to light theme' : 'Switch to dark theme'
    );
  }

  button.addEventListener('click', function () {
    var next = currentlyDark() ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try {
      localStorage.setItem('digigym-theme', next);
    } catch (e) {
      // Private browsing can refuse storage; the choice still holds for this page.
    }
    label();
  });

  // Someone who has never picked a theme keeps following the OS, including
  // when it flips mid-visit.
  media.addEventListener('change', label);

  label();
})();
