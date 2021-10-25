  //Version V.2.3 alimentation de la page produit

 //déclaration des variables locales
let erreurMsge ='';

ListeCameras();

// fonction asynhcrone, on attendre que la résolution de la promesse passée (Promise) pour reprendre avace les données 
async function ListeCameras() {
	// fonctions pour recuperer des articles, on attend que le fetch soit executer pour avoir les artcicles
	const articles =  await getArticles();
	// on verifie si le tableau a du contenu
	if(articles.length!=0) {
		// boucle sur le tableau de retour des données pour rajouter à l'article qui sera affiché
		for (let i = 0; i < articles.length; i++) {
		const article  = articles [i];
		displayArticle(article);
		}
	} else {
		// le tableau est vide
		erreurMsge = 'Pas de produits disponibles, veuillez réessayer';
		getError(erreurMsge);
	}
}

  // utilisation promise pour recuperer la liste des articles tableau
function getArticles() {
	return fetch(url)
	.then(function(httpBodyResponse) {
		return httpBodyResponse.json();
		})
	.then(function(articles) {
		//console.log(articles);
		return articles;
	})
	// gestion des erreurs
	.catch(function(erreur) {
		//alert(erreur);
  		erreurMsge = erreur.message;
  		getError(erreurMsge);
	})
}


// fonction pour afficher un article
function displayArticle(article) {
	const prix = convertisseurPrix(article.price);
	// on rajoute l'article et ses differentes composantes sous forme de variables
	//document.getElementById('flex-resultat').innerHTML += ` <h1 class="messageErreur">${article._id}</h1>`;
	// on génére le code html
	document.getElementById('flex-resultat').innerHTML += `
	<article class="vignetteArticle" id="vignetteArticle">
		<form class="formArticle"  id="${article._id}" action="${url}?id=${article._id}" method="get">
			<a href="./frontend/produit.html?id=${article._id}"  class="imageArticle">
				<img src="${article.imageUrl}" 
				alt="Photo appareil ancien" class="imageProprieteArticle">
			</a>
			<div class="descriptionArticle">
				<h3 class="policeParagraphe">
					<strong>${article.name}</strong>
				</h3>
				<p class="policeParagraphe2">
				${article.description}
				</p>
			</div>
	  		<div class="actionArticle">
				<div class="prixArticle">
					<p class="policePrix"><strong>${prix}</strong>
					</p>
				</div>
				<div class="buttonArticle">
					<button class="buttonAjoutArticle" onclick="pagePanierIndex();">
						<i class="fas fa-shopping-basket"></i>
						Ajouter au panier
					</button>
				</div>
	  		</div>
		</form>
	</article>`;
}

// Récupération de l'erreur pour affichage sur la page
function getError(erreurMsge) {
  alert(erreurMsge.message);
  document.getElementById('flex-resultat').innerHTML += `<h1 class="messageErreur">HTTP-Error: &nbsp;${erreurMsge.message}</h1>`;
}