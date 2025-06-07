// Elementos
const desc = document.getElementById('description');
const preview = document.getElementById('preview');
const copyBtn = document.getElementById('copyBtn');
const saveBtn = document.getElementById('saveBtn');
const historyUl = document.getElementById('history');

// Collectors
const cfg = {
  illumination: {
    enabled: () => document.getElementById('cbIllum').checked,
    get: () => `Illumination: direction ${val('illumDirection')}, force ${val('illumForce')}, altitude ${val('illumAlt')}°, color ${val('illumColor')}`
  },
  clothes: {
    enabled: () => document.getElementById('cbClothes').checked,
    get: () => `Clothes: ${val('clothesTxt')}`
  },
  style: {
    enabled: () => document.getElementById('cbStyle').checked,
    get: () => `Style: render ${val('styleRendering')}, palette ${val('stylePalette')}`
  }
};

function val(id){ return document.getElementById(id).value.trim(); }

function buildPrompt(){
  let parts = [val('description')];
  for (const key in cfg){
    if (cfg[key].enabled()) parts.push(cfg[key].get());
  }
  return parts.filter(Boolean).join('\n');
}

// Live preview
document.addEventListener('input', () => preview.textContent = buildPrompt());

// Copy to clipboard
copyBtn.onclick = () => window.pmAPI.copy(buildPrompt());

// Record snapshot
saveBtn.onclick = () => {
  const snap = { ts: Date.now(), prompt: buildPrompt(), fields: grabFields() };
  const hist = JSON.parse(localStorage.getItem('pmHistory')||'[]');
  hist.unshift(snap);
  localStorage.setItem('pmHistory', JSON.stringify(hist));
  renderHistory();
};

// Retrieve all input values to restore later
function grabFields(){
  const inputs = Array.from(document.querySelectorAll('input, select, textarea'));
  return inputs.reduce((acc, el) => ({...acc, [el.id]: el.type==='checkbox'? el.checked : el.value }), {});
}

function restoreFields(map){
  Object.entries(map).forEach(([id, val]) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (el.type==='checkbox') el.checked = val;
    else el.value = val;
  });
  preview.textContent = buildPrompt();
}

// History UI
function renderHistory(){
  historyUl.innerHTML = '';
  const hist = JSON.parse(localStorage.getItem('pmHistory')||'[]');
  hist.forEach((snap, idx) => {
    const li = document.createElement('li');
    const dt = new Date(snap.ts).toLocaleString();
    li.innerHTML = `<details>
       <summary>${dt}</summary>
       <pre>${snap.prompt}</pre>
       <button data-idx="${idx}" class="load">Load</button>
       <button data-idx="${idx}" class="copy">Copy</button>
    </details>`;
    historyUl.appendChild(li);
  });
}
historyUl.onclick = (e) => {
  const idx = e.target.dataset.idx;
  if (idx===undefined) return;
  const hist = JSON.parse(localStorage.getItem('pmHistory'));
  if (e.target.className==='copy') window.pmAPI.copy(hist[idx].prompt);
  if (e.target.className==='load') restoreFields(hist[idx].fields);
};
renderHistory();
