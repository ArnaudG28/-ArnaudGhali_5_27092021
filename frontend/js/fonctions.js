// Version V.2.3 alimentation de la page produit 
 
 //Déclaration des variables de référence constante globales
const url = `https://teddies-api.herokuapp.com/api/cameras`;
//const url ='http://localhost:3000/api/cameras';
const prix ='';

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