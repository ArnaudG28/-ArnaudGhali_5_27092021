// Version V.2.13 correction responsive 
 
 //Déclaration des variables de référence constante globales
const url = `https://teddies-api.herokuapp.com/api/cameras`;
//var url ='http://localhost:3000/api/cameras';
var prix ='';

//Fonctions Globales
//Version V.2.2 ajout dans index.js convertisseur de prix 

// convertir le prix de string à number, forrmater des nombres
function convertisseurPrix(prix) {
	//const prix = `${article.price}`;
	prix = Intl.NumberFormat("fr-FR", {
		style: "currency",
		currency: "EUR",
	}).format(prix /100);
	return prix;
  }


// nombre d'article dans le panier
function nombreArticle() {
	var nombreArticleTotalPanier = 0;
	const articleEnPanierStocke = JSON.parse(localStorage.getItem("article"));
	if (articleEnPanierStocke) {
        // mise à jour du nombre d'article dans le panier
		for (let i = 0; i < articleEnPanierStocke.length; i++) {
			// voir pour le calculc total
			nombreArticleTotalPanier = articleEnPanierStocke [i].nombreArticlePanier + nombreArticleTotalPanier;       
        }

			
	} 
	document.getElementById('nombreNavigation').innerHTML = `${nombreArticleTotalPanier}`;
}

function confirmationRetourAccueil() {
	window.location.href = '../index.html';
}


function pagePanierIndex() {
    window.location.href ='./frontend/panier.html';
}

function pagePanier() {
    window.location.href ='./panier.html';
}

function pageAccueil() {
  window.location.href = '../index.html';
}