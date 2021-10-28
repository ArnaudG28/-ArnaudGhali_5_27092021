// Version V.2.5 ajout id au panier local storage, incrémentation icone du nombre et modification visuelle de la navigation

const listePanier = [];
ajoutPanier();

// récupération de l'ID de l'article ajouté
async function ajoutPanier() {
    alert(document.activeElement.value);
    const articleId = document.activeElement.value;
    alert(articleId);
    if (articleId!=null && articleId!='') {
        const article = await getArticle(articleId);
        // on rajoute l'article et son contenu au panier
        ajoutArticle(article);
    } else {
        // Il y a pas d'article correspondant
        erreurMsge = 'Produit non disponible';
        getError(erreurMsge);
    }
}

 // utilisation promise pour recuperer l'article et son contenu dans la liste des articles
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

var totalPrix = 0;

// Mise dans le panier de l'article selectionné
function ajoutArticle(article){
let _id = article._id;
let imageUrl = article.imageUrl;
let nom = article.name;
let description = article.description;

// creation de l'objet article panier
const articlePanier = {_id,imageUrl,nom,description,prix,totalPrix};

    // On verifie si l'article existe déjà dans le panier
    for (let i = 0; i < listePanier.length; i++) {
        if (listePanier.articlePanier._id [i] == article._id) {
            // conversion du prix
            const prix = convertisseurPrix(article.price);
            articlePanier.totalPrix += articlePanier.prix;
        } else {
            //rajout à un ligne article
            articlePanier._id=article._id;
            articlePanier.imageUrl=article.imageUrl;
            articlePanier.nom=article.name;
            articlePanier.description=article.description;
            // conversion du prix
            prix = convertisseurPrix(article.price);
            articlePanier.prix=prix;
            articlePanier.totalPrix = prix;
        }

    }
//On le rajoute au panier tableau
listePanier.push(articlePanier);
alert(listePanier);

} 

// Récupération de l'erreur pour affichage sur la page
function getError(erreurMsge) {
	alert(erreurMsge);
	document.getElementById('flex-resultat').innerHTML += `<h1 class="messageErreur">&nbsp;${erreurMsge}</h1>`;
  }
