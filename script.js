let peloteCount = 1;

// Ajouter une nouvelle pelote dynamiquement
document.getElementById('addPeloteBtn').addEventListener('click', () => {
  peloteCount++;

  const peloteForm = document.createElement('div');
  peloteForm.classList.add('pelote-sample');
  peloteForm.id = `pelote${peloteCount}`;

  peloteForm.innerHTML = `
    <div class="pelote-header">Pelote ${peloteCount}</div>

    <label>Largeur (cm)
      <input type="number" id="widthSample${peloteCount}" step="0.1" />
    </label>

    <label>Hauteur (cm)
      <input type="number" id="heightSample${peloteCount}" step="0.1" />
    </label>

    <label>Poids (g)
      <input type="number" id="weightSample${peloteCount}" step="0.1" />
    </label>
  `;

  document.getElementById('pelote-forms').appendChild(peloteForm);
});

// Reset complet
document.getElementById('resetBtn').addEventListener('click', () => {
  // Remet à 1 pelote (garde seulement Pelote 1)
  const forms = document.getElementById('pelote-forms');
  forms.innerHTML = `
    <div class="pelote-sample" id="pelote1">
      <div class="pelote-header">Pelote 1</div>

      <label>Largeur (cm)
        <input type="number" id="widthSample1" step="0.1" />
      </label>

      <label>Hauteur (cm)
        <input type="number" id="heightSample1" step="0.1" />
      </label>

      <label>Poids (g)
        <input type="number" id="weightSample1" step="0.1" />
      </label>
    </div>
  `;

  peloteCount = 1;

  // Vide dimensions ouvrage
  document.getElementById("widthBody").value = "";
  document.getElementById("heightBody").value = "";
  document.getElementById("widthSleeve").value = "";
  document.getElementById("heightSleeve").value = "";

  // Vide + masque résultats
  const container = document.getElementById('resultsContainer');
  container.innerHTML = "";
  container.style.display = "none";
});

// Calculer les résultats
document.getElementById('calculateBtn').addEventListener('click', () => {
  const widthBody = parseFloat(document.getElementById("widthBody").value);
  const heightBody = parseFloat(document.getElementById("heightBody").value);
  const widthSleeve = parseFloat(document.getElementById("widthSleeve").value);
  const heightSleeve = parseFloat(document.getElementById("heightSleeve").value);

  let resultsHTML = '';
  let hasValidData = false;

  for (let i = 1; i <= peloteCount; i++) {
    const widthSample = parseFloat(document.getElementById(`widthSample${i}`).value);
    const heightSample = parseFloat(document.getElementById(`heightSample${i}`).value);
    const weightSample = parseFloat(document.getElementById(`weightSample${i}`).value);

    if (isNaN(widthSample) || isNaN(heightSample) || isNaN(weightSample)) {
      continue;
    }

    // Corps : nécessite largeur+hauteur du corps
    let bodyWeight = 0;
    if (!isNaN(widthBody) && !isNaN(heightBody) && widthSample > 0 && heightSample > 0) {
      bodyWeight = ((widthBody / peloteCount) * heightBody) / (widthSample * heightSample) * weightSample;
    }

    // Manches : facultatif (si dimensions renseignées)
    let sleeveWeight = 0;
    if (!isNaN(widthSleeve) && !isNaN(heightSleeve) && widthSample > 0 && heightSample > 0) {
      sleeveWeight = ((widthSleeve / peloteCount) * heightSleeve) / (widthSample * heightSample) * weightSample;
    }

    const totalWeight = bodyWeight + sleeveWeight;

    // Si rien n'est calculable (corps vide ET manches vides), on ne montre pas
    if (totalWeight <= 0) continue;

    hasValidData = true;

    resultsHTML += `
      <div class="result-block">
        <div class="pelote-header">Pelote ${i}</div>
        <p>Poids de laine nécessaire pour le corps : <strong>${bodyWeight.toFixed(2)} g</strong></p>
        <p>Poids de laine nécessaire pour les manches : <strong>${sleeveWeight.toFixed(2)} g</strong></p>
        <p>Poids total : <strong>${totalWeight.toFixed(2)} g</strong></p>
      </div>
    `;
  }

  const container = document.getElementById('resultsContainer');

  container.style.display = "block";
  container.innerHTML = hasValidData
    ? resultsHTML
    : `<div class="result-block"><p>Aucune donnée valide pour le calcul.</p></div>`;
});
