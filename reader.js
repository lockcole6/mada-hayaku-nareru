const jump = document.querySelector('#jump');
const figures = [...document.querySelectorAll('.pages figure')];

function goToPage(number, updateHash = false) {
  const page = Math.max(1, Math.min(figures.length, Number(number) || 1));
  jump.value = String(page);
  if (updateHash) history.replaceState(null, '', '#p' + page);
  figures[page - 1].scrollIntoView({block: 'start'});
}

jump.addEventListener('change', () => goToPage(jump.value, true));
const observer = new IntersectionObserver(entries => {
  for (const entry of entries) {
    if (entry.isIntersecting) jump.value = entry.target.id.slice(1);
  }
}, {rootMargin: '-10% 0px -65% 0px'});
figures.forEach(figure => observer.observe(figure));

// 従来の #page-8 形式の共有リンクも同じページを開く。
function restorePage() {
  const match = location.hash.match(/^#(?:p|page-)(\d+)$/);
  if (match) goToPage(match[1]);
}
window.addEventListener('hashchange', restorePage);
requestAnimationFrame(restorePage);
