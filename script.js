const myUrl = "https://makerslab.em-lyon.com/dww/data/products.json";

let donneesGlobales = null;

const getData = async() => {
    try {
        const response = await fetch(myUrl);
        const data = await response.json();
        donneesGlobales = data; // on sauvegarde pr eviter de refaire la requete a chaque fois
        afficherListe(data);
    } catch(error) {
        console.error("petit soucis de chargement :", error);
    }
}

// fct pour affficher toutes les cards sur l'acceuil
function afficherListe(data) {
    const container = document.getElementById('conteneur-liste');
    
    // on fait une double boucle car les data sont rangés par marque ds le json
    data.brands.forEach((brand) => {
        data.items[brand].forEach((product) => {
            
            const safeName = product.name.replace(/'/g, "\\'");

            const cardHTML = `
                <article class="product-card">
                    <div class="card-header">
                        <div class="product-info">
                            <h3>${product.name}</h3>
                            <p class="brand">${brand}</p>
                            <p class="quote">"${product.description}"</p>
                        </div>
                        <button onclick="ouvrirDetail('${brand}', '${safeName}')" class="btn-buy">BUY</button>
                    </div>
                    <div class="card-body">
                        <img src="${product.image}" alt="${product.name}" class="product-img">
                        <img src="chart-1.png" alt="graph des prix" class="chart-img">
                    </div>
                </article>
            `;
            container.innerHTML += cardHTML;
        });
    });
}

// PROMPT IA : "Fais une fonction js qui cherche un element precis dans mon json grace a son nom et affiche ses infos dans des balises HTML existantes"
function ouvrirDetail(marque, nomProduit) {
    // on cherche la bonne chaussure ds le tableau sauvegarder avant
    const produitClique = donneesGlobales.items[marque].find(p => p.name === nomProduit);

    if(produitClique) {
        // on remplace les infos de la fausse page (la SPA)
        document.getElementById('detail-titre').textContent = produitClique.name;
        document.getElementById('detail-marque').textContent = marque.toUpperCase();
        document.getElementById('detail-desc').textContent = '"' + produitClique.description + '"';
        document.getElementById('detail-image').src = produitClique.image;

        // switch d'affichage (on cache l'accueil, on montre les details)
        document.getElementById('page-accueil').style.display = 'none';
        document.getElementById('page-detail').style.display = 'block';
        
        window.scrollTo(0, 0); 
    }
}

// pour le bouton retour
function fermerDetail() {
    document.getElementById('page-detail').style.display = 'none';
    document.getElementById('page-accueil').style.display = 'block';
}

getData();