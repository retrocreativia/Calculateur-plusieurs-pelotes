let peloteCount = 2;

document.getElementById('addPeloteBtn').addEventListener('click', () => {
    peloteCount++;
    const peloteForm = document.createElement('div');
    peloteForm.classList.add('section');
    peloteForm.id = `pelote${peloteCount}`;
    peloteForm.innerHTML = `
        <h2>Échantillon Pelote ${peloteCount}</h2>
        <label>Largeur (cm): <input type="number" id="widthSample${peloteCount}" class="input-field"></label><br>
        <label>Hauteur (cm): <input type="number" id="heightSample${peloteCount}" class="input-field"></label><br>
        <label>Poids (g): <input type="number" id="weightSample${peloteCount}" class="input-field"></label><br>
    `;
    document.getElementById('pelote-forms').appendChild(peloteForm);
});

function calculateYarn() {
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

        const bodyWeight = (widthBody * heightBody) / (widthSample * heightSample) * weightSample;
        const sleeveWeight = (widthSleeve * heightSleeve) / (widthSample * heightSample) * weightSample;
        const totalWeight = bodyWeight + sleeveWeight;

        resultsHTML += `
            <p>Poids de laine nécessaire pour le corps (Pelote ${i}): ${bodyWeight.toFixed(2)} g</p>
            <p>Poids de laine nécessaire pour les manches (Pelote ${i}): ${sleeveWeight.toFixed(2)} g</p>
            <p>Poids total de laine nécessaire (Pelote ${i}): ${totalWeight.toFixed(2)} g</p>
        `;
    }

    document.getElementById('resultsContainer').innerHTML = resultsHTML;
}
