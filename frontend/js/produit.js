// Version V.2.4 alimentation de la page produit + liste modèle

 //déclaration des variables locales
 let erreurMsge ='';

// recuperation de l'id article dans l'url et affichage dans la page produit
detailArticle ();

async function detailArticle () {
	const articleId = getArticleId();
	//console.log(articleId);
	// test si l'article existe
	if (articleId!=null && articleId!='') {
		const article = await getArticle(articleId);
		//console.log(article);
		displayArticle(article);
	} else {
		// Il y a pas d'article
		erreurMsge = 'Produit non disponible';
		getError(erreurMsge);
	}
}

// recupretation de l'id dans l'url à partir du lien dans l'imaga de index.htm
function getArticleId(articleId) {
	return new URL(location.href).searchParams.get("id")
}


 // utilisation promise pour recuperer l'article dans la liste des articles du tableau
function getArticle(articleId) {
	//alert(url+'/'+articleId);
	return fetch(url+'/'+articleId)
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
function displayArticle (article) {
	const prix = convertisseurPrix(article.price);
	document.getElementById("formDetailArticle").id = article._id;
	document.getElementById("imageArticle").src = article.imageUrl;
	document.getElementById("prixDetailArticle").textContent = prix;
	document.getElementById("descriptionNomArticle").textContent = article.name;
	document.getElementById("descriptionDetailArticle").textContent = article.description;
	// test si la liste est vide
	if (article.lenses.length!=0){
		document.getElementById("listeModele").innerHTML += `<option value="" selected>-- Choisissez un modèle --</option>`;
		for (let i = 0; i < article.lenses.length; i++) {
			document.getElementById("listeModele").value = article.lenses [i];
			document.getElementById("listeModele").innerHTML += `<option value="${article.lenses [i]}">${article.lenses [i]}</option>`;
			}
	} else {
		document.getElementById("listeModele").innerHTML += `<option value="" selected>-- Modèle unique --</option>`;
	}
}


// Récupération de l'erreur pour affichage sur la page
function getError(erreurMsge) {
	alert(erreurMsge);
	document.getElementById('flex-resultat').innerHTML += `<h1 class="messageErreur">&nbsp;${erreurMsge}</h1>`;
  }
