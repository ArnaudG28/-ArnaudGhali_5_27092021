// Version V.2.5 ajout id au panier local storage, incrémentation icone du nombre et modification visuelle de la navigation
 
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
		var nombreArticleTotalPanier = articleEnPanierStocke.length;	
	} 
	document.getElementById('nombreNavigation').innerHTML = `${nombreArticleTotalPanier}`;
}


function pageConfirmation() {
  window.location.href = './confirmation.html';
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