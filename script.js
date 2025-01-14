let peloteCount = 1;

// Ajouter une nouvelle pelote dynamiquement
document.getElementById('addPeloteBtn').addEventListener('click', () => {
    peloteCount++;
    const peloteForm = document.createElement('div');
    peloteForm.classList.add('pelote-sample');
    peloteForm.id = `pelote${peloteCount}`;
    peloteForm.innerHTML = `
        <div class="pelote-header">Pelote ${peloteCount} :</div>
        <label>Largeur (cm): <input type="number" id="widthSample${peloteCount}"></label>
        <label>Hauteur (cm): <input type="number" id="heightSample${peloteCount}"></label>
        <label>Poids (g): <input type="number" id="weightSample${peloteCount}"></label>
    `;
    document.getElementById('pelote-forms').appendChild(peloteForm);
});

// Calculer les résultats
document.getElementById('calculateBtn').addEventListener('click', () => {
    const widthBody = parseFloat(document.getElementById("widthBody").value);
    const heightBody = parseFloat(document.getElementById("heightBody").value);
    const widthSleeve = parseFloat(document.getElementById("widthSleeve").value);
    const heightSleeve = parseFloat(document.getElementById("heightSleeve").value);

    let resultsHTML = '';

    for (let i = 1; i <= peloteCount; i++) {
        const widthSample = parseFloat(document.getElementById(`widthSample${i}`).value);
        const heightSample = parseFloat(document.getElementById(`heightSample${i}`).value);
        const weightSample = parseFloat(document.getElementById(`weightSample${i}`).value);

        if (isNaN(widthSample) || isNaN(heightSample) || isNaN(weightSample)) {
            continue;
        }

        const bodyWeight = ((widthBody / peloteCount) * heightBody) / (widthSample * heightSample) * weightSample;
        const sleeveWeight = ((widthSleeve / peloteCount) * heightSleeve) / (widthSample * heightSample) * weightSample;
        const totalWeight = bodyWeight + sleeveWeight;

        resultsHTML += `
            <div class="result-block">
                <div class="pelote-header">Pelote ${i}</div>
                <p>Poids de laine nécessaire pour le corps : <strong>${bodyWeight.toFixed(2)} g</strong></p>
                <p>Poids de laine nécessaire pour les manches : <strong>${sleeveWeight.toFixed(2)} g</strong></p>
                <p>Poids total : <strong>${totalWeight.toFixed(2)} g</strong></p>
            </div>
        `;
    }

    document.getElementById('resultsContainer').innerHTML = resultsHTML || '<p>Aucune donnée valide pour le calcul.</p>';
});
