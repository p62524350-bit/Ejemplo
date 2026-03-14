const emojis = { roca:'🪨', papel:'📄', tijeras:'✂️', lagarto:'🦎', spock:'🖖' };
let W = 0, T = 0, L = 0;
let jugando = false;

function setButtons(disabled) {
  document.querySelectorAll('.choice-btn').forEach(b => b.disabled = disabled);
}

function showWord(id, delay) {
  return new Promise(resolve => {
    setTimeout(() => {
      ['cw1','cw2','cw3','cw4'].forEach(w => {
        const el = document.getElementById(w);
        el.className = el.className.replace(' show','').replace(' hide','');
      });
      const el = document.getElementById(id);
      void el.offsetWidth;
      el.classList.add('show');
      resolve();
    }, delay);
  });
}

async function jugar(eleccionUsuario) {
  if (jugando) return;
  jugando = true;
  setButtons(true);

  const overlay = document.getElementById('countdownOverlay');
  overlay.classList.add('active');

  // ⚡ Cada palabra dura 300ms — total ~1.2s
  await showWord('cw1', 100);
  await showWord('cw2', 200);
  await showWord('cw3', 400);
  await showWord('cw4', 500);

  await new Promise(r => setTimeout(r,600));
  overlay.classList.remove('active');

  ['cw1','cw2','cw3','cw4'].forEach(id => {
    const el = document.getElementById(id);
    el.className = el.className.replace(' show','').replace(' hide','');
  });

  // ---- LÓGICA ORIGINAL ----
  let opciones = ["roca","papel","tijeras","lagarto","spock"];
  let computadora = opciones[Math.floor(Math.random() * 5)];
  let resultado = "";

  if (eleccionUsuario === computadora) {
    resultado = "Empate";
  } else if (
    (eleccionUsuario === "tijeras" && (computadora === "papel"   || computadora === "lagarto")) ||
    (eleccionUsuario === "papel"   && (computadora === "roca"    || computadora === "spock"))   ||
    (eleccionUsuario === "roca"    && (computadora === "tijeras" || computadora === "lagarto")) ||
    (eleccionUsuario === "lagarto" && (computadora === "spock"   || computadora === "papel"))   ||
    (eleccionUsuario === "spock"   && (computadora === "tijeras" || computadora === "roca"))
  ) {
    resultado = "¡Ganaste!";
  } else {
    resultado = "Perdiste";
  }
  // ---- FIN LÓGICA ORIGINAL ----

  const eJ = document.getElementById('eJugador');
  const eC = document.getElementById('eCPU');
  eJ.className = 'fighter-emoji';
  eC.className = 'fighter-emoji';
  eJ.textContent = emojis[eleccionUsuario];
  eC.textContent = emojis[computadora];
  void eJ.offsetWidth;
  eJ.classList.add('bounce');
  eC.classList.add('bounce');

  const resBox   = document.getElementById('resBox');
  const resTitle = document.getElementById('resTitle');
  const resSub   = document.getElementById('resSub');
  resBox.classList.remove('reveal');
  void resBox.offsetWidth;
  resBox.classList.add('reveal');
  resTitle.className = 'res-title';

  if (resultado === "¡Ganaste!") {
    resTitle.classList.add('win');
    resTitle.textContent = '🏆 GANASTE!';
    eJ.classList.add('winner'); eC.classList.add('loser');
    W++;
  } else if (resultado === "Perdiste") {
    resTitle.classList.add('lose');
    resTitle.textContent = '💀 PERDISTE';
    eC.classList.add('winner'); eJ.classList.add('loser');
    L++;
  } else {
    resTitle.classList.add('tie');
    resTitle.textContent = '⚡ EMPATE';
    T++;
  }

  const nombres = { roca:'Roca', papel:'Papel', tijeras:'Tijeras', lagarto:'Lagarto', spock:'Spock' };
  resSub.textContent = `Sheldon eligió: ${emojis[computadora]} ${nombres[computadora]}`;

  document.getElementById('sW').textContent = W;
  document.getElementById('sT').textContent = T;
  document.getElementById('sL').textContent = L;

  jugando = false;
  setButtons(false);
}

function resetear() {
  W = 0; T = 0; L = 0;
  document.getElementById('sW').textContent = 0;
  document.getElementById('sT').textContent = 0;
  document.getElementById('sL').textContent = 0;
  document.getElementById('eJugador').textContent = '❓';
  document.getElementById('eJugador').className = 'fighter-emoji';
  document.getElementById('eCPU').textContent = '🤖';
  document.getElementById('eCPU').className = 'fighter-emoji';
  const t = document.getElementById('resTitle');
  t.className = 'res-title idle';
  t.textContent = 'ELIGE TU ARMA';
  document.getElementById('resSub').textContent = '';
}