// Version V.4.1 Version finale - Correction suite à soutenance

 //déclaration des variables locales
 let erreurMsge ='';

// recuperation de l'id article dans l'url et affichage dans la page produit
detailProduit();

async function detailProduit () {
	const produitId = getProduitId();
	//console.log(produitId);
	// test si l'article existe
	if (produitId!=null && produitId!='') {
		const produit = await getProduit(produitId);
		//console.log(article);
		displayProduit(produit);
	} else {
		// Il y a pas d'article
		erreurMsge = 'Produit non disponible';
		getError(erreurMsge);
	}
}

// recupertation de l'id dans l'url à partir du lien dans l'imaga de index.htm
function getProduitId(produitId) {
	return new URL(location.href).searchParams.get("id")
}


 // utilisation promise pour recuperer l'article dans la liste des articles du tableau
function getProduit(produitId) {
	//alert(url+'/'+articleId);
	return fetch(url+'/'+produitId)
	.then(function(httpBodyResponse) {
		return httpBodyResponse.json();
		})
	// gestion des erreurs
	.catch(function(erreur) {
		//alert(erreur);
  		erreurMsge = erreur.message;
  		getError(erreurMsge);
	})
}

// Affichage des données de l'article dans la fiche produit
function displayProduit (produit) {
	const prix = convertisseurPrix(produit.price);
	document.getElementById("formDetailArticle").id = produit._id;
	document.getElementById("imageArticle").src = produit.imageUrl;
	document.getElementById("prixDetailArticle").textContent = prix;
	document.getElementById("descriptionNomArticle").textContent = produit.name;
	document.getElementById("descriptionDetailArticle").textContent = produit.description;
	document.getElementById("buttonDetailAjoutArticle").value = produit._id;
	// test si la liste est vide
	if (produit.lenses.length!=0){
		//document.getElementById("listeModele").innerHTML += `<option value="" selected>-- Choisissez un modèle --</option>`;
		for (let i = 0; i < produit.lenses.length; i++) {
			document.getElementById("listeModele").value = produit.lenses [i];
			document.getElementById("listeModele").innerHTML += `<option value="${produit.lenses [i]}">${produit.lenses [i]}</option>`;
			}
	} else {
		//document.getElementById("listeModele").innerHTML += `<option value="" selected>-- Modèle unique --</option>`;
	}
	// mise à jour du panier
	nombreArticle();
}

// Récupération de l'erreur pour affichage sur la page
function getError(erreurMsge) {
	//alert(erreurMsge);
	document.getElementById('flex-resultat').innerHTML += `<h1 class="messageErreur">&nbsp;${erreurMsge}</h1>`;
  }
