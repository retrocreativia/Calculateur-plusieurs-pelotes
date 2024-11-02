function calculateYarn() {
    // Récupérer les données des échantillons
    let widthSample1 = parseFloat(document.getElementById("widthSample1").value);
    let heightSample1 = parseFloat(document.getElementById("heightSample1").value);
    let weightSample1 = parseFloat(document.getElementById("weightSample1").value);

    let widthSample2 = parseFloat(document.getElementById("widthSample2").value);
    let heightSample2 = parseFloat(document.getElementById("heightSample2").value);
    let weightSample2 = parseFloat(document.getElementById("weightSample2").value);

    // Récupérer les dimensions du corps
    let widthBody = parseFloat(document.getElementById("widthBody").value);
    let heightBody = parseFloat(document.getElementById("heightBody").value);

    // Calculer le poids pour le corps
    let bodyWeight1 = (widthBody * heightBody) / (widthSample1 * heightSample1) * weightSample1;
    let bodyWeight2 = (widthBody * heightBody) / (widthSample2 * heightSample2) * weightSample2;

    // Récupérer les dimensions des manches
    let widthSleeve = parseFloat(document.getElementById("widthSleeve").value);
    let heightSleeve = parseFloat(document.getElementById("heightSleeve").value);

    // Calculer le poids pour les manches
    let sleeveWeight1 = (widthSleeve * heightSleeve) / (widthSample1 * heightSample1) * weightSample1;
    let sleeveWeight2 = (widthSleeve * heightSleeve) / (widthSample2 * heightSample2) * weightSample2;

    // Calculer le poids total
    let totalWeight1 = bodyWeight1 + sleeveWeight1;
    let totalWeight2 = bodyWeight2 + sleeveWeight2;

    // Afficher les résultats
    document.getElementById("resultBody1").innerText = bodyWeight1.toFixed(2) + " g";
    document.getElementById("resultBody2").innerText = bodyWeight2.toFixed(2) + " g";
    document.getElementById("resultSleeve1").innerText = sleeveWeight1.toFixed(2) + " g";
    document.getElementById("resultSleeve2").innerText = sleeveWeight2.toFixed(2) + " g";
    document.getElementById("totalWeight1").innerText = totalWeight1.toFixed(2) + " g";
    document.getElementById("totalWeight2").innerText = totalWeight2.toFixed(2) + " g";
}
