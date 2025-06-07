// Elements
const desc = document.getElementById('description');
const sectionsWrap = document.getElementById('sections');
const preview = document.getElementById('preview');
const copyBtn = document.getElementById('copyBtn');
const saveBtn = document.getElementById('saveBtn');
const historyUl = document.getElementById('history');

const config = window.defaultConfig || {};

// Build UI based on configuration object
function buildUI() {
  Object.entries(config).forEach(([key, section]) => {
    if (key === 'Description') {
      return; // description already present
    }

    const secDiv = document.createElement('div');
    secDiv.className = 'pm-section';

    const label = document.createElement('label');
    label.className = 'pm-checkbox-label';
    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.id = `cb-${key}`;
    cb.className = 'accent-blue-500';
    cb.checked = section.enabled;
    label.appendChild(cb);
    const span = document.createElement('span');
    span.textContent = section.label || key;
    label.appendChild(span);
    secDiv.appendChild(label);

    const inner = document.createElement('div');
    inner.className = 'pm-inner';

    if (section.parameters) {
      Object.entries(section.parameters).forEach(([pKey, param]) => {
        const plabel = document.createElement('label');
        plabel.textContent = param.label;
        if (param.options) {
          const sel = document.createElement('select');
          sel.id = `${key}-${pKey}`;
          sel.className = 'pm-select';
          param.options.forEach(opt => {
            const option = document.createElement('option');
            option.value = opt;
            option.textContent = opt;
            if (opt === param.value) option.selected = true;
            sel.appendChild(option);
          });
          plabel.appendChild(sel);
        } else {
          const inp = document.createElement('input');
          inp.id = `${key}-${pKey}`;
          inp.className = 'pm-input';
          inp.value = param.value || '';
          plabel.appendChild(inp);
        }
        inner.appendChild(plabel);
      });
    }
    secDiv.appendChild(inner);
    sectionsWrap.appendChild(secDiv);
  });
}

buildUI();

function val(id) {
  const el = document.getElementById(id);
  return el ? el.value.trim() : '';
}

function buildPrompt() {
  const parts = [];
  const d = val('description');
  if (d) parts.push(d);
  Object.entries(config).forEach(([key, section]) => {
    if (key === 'Description') return;
    const cb = document.getElementById(`cb-${key}`);
    if (cb && !cb.checked) return;
    const paramParts = [];
    if (section.parameters) {
      Object.entries(section.parameters).forEach(([pKey, param]) => {
        const v = val(`${key}-${pKey}`);
        if (v) paramParts.push(`${param.label.toLowerCase()} ${v}`);
      });
    }
    if (paramParts.length) {
      parts.push(`${section.label}: ${paramParts.join(', ')}`);
    }
  });
  return parts.join('\n');
}

// Live preview
document.addEventListener('input', () => (preview.textContent = buildPrompt()));

// Copy to clipboard
copyBtn.onclick = () => window.pmAPI.copy(buildPrompt());

// Record snapshot
saveBtn.onclick = () => {
  const snap = { ts: Date.now(), prompt: buildPrompt(), fields: grabFields() };
  const hist = JSON.parse(localStorage.getItem('pmHistory') || '[]');
  hist.unshift(snap);
  localStorage.setItem('pmHistory', JSON.stringify(hist));
  renderHistory();
};

function grabFields() {
  const inputs = Array.from(document.querySelectorAll('input, select, textarea'));
  return inputs.reduce(
    (acc, el) => ({ ...acc, [el.id]: el.type === 'checkbox' ? el.checked : el.value }),
    {}
  );
}

function restoreFields(map) {
  Object.entries(map).forEach(([id, value]) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (el.type === 'checkbox') el.checked = value;
    else el.value = value;
  });
  preview.textContent = buildPrompt();
}

function renderHistory() {
  historyUl.innerHTML = '';
  const hist = JSON.parse(localStorage.getItem('pmHistory') || '[]');
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

historyUl.onclick = e => {
  const idx = e.target.dataset.idx;
  if (idx === undefined) return;
  const hist = JSON.parse(localStorage.getItem('pmHistory'));
  if (e.target.className === 'copy') window.pmAPI.copy(hist[idx].prompt);
  if (e.target.className === 'load') restoreFields(hist[idx].fields);
};

renderHistory();
