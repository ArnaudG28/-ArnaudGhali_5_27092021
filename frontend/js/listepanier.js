// Version V.2.6 liste panier vidage local storage divers modifications

const listePanier = [];
var option ="";

recupPanier();
// On recupère la liste du panier du local storage
async function recupPanier() {
    
    // Declaration d'une variable pour le localstorage avec les clés et les valeurs
    let articleEnregistreLocalStorage = JSON.parse(localStorage.getItem("article"));
    // JSON.parse pour convertir les données au format JSON stocké dans le local storage en objet javascript
    console.log(articleEnregistreLocalStorage);

    // controle si le panier est vide
    if (articleEnregistreLocalStorage != null && articleEnregistreLocalStorage.length != 0 ) {
        // boucle sur le tableau de retour des données pour rajouter à l'article qui sera affiché
		for (let i = 0; i < articleEnregistreLocalStorage.length; i++) {

            // on recurpere l'Id de l'article
            let articleId = articleEnregistreLocalStorage [i].idArticlePanier;
            option = articleEnregistreLocalStorage [i].option;

            console.log(articleId);
            console.log(option);


            // test si l'article existe Id est présent dans le tableau
            if (articleId!=null && articleId!='') {
                const article = await getArticle(articleId);
                console.log(article);

                // test si l'option est renseignée ou pas si oui recuperation du premier dans le tableau
                if (option=="vide") {
                    if (article.lenses.length > 0) {
                        option= article.lenses [0];
                    } 
                }

                // on affiche l'article
                displayArticle(article);
            } else {
                // Il y a pas d'article
                erreurMsge = 'Produit non disponible';
                getError(erreurMsge);
            }
        }

    } else {
        erreurMsge = "Le panier est vide";
        getError(erreurMsge);
    }

    
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


// fonction pour afficher un article
function displayArticle(article) {
	const prix = convertisseurPrix(article.price);
    
    // mise à jour du panier
    nombreArticle();

	// on rajoute l'article et ses differentes composantes sous forme de variables
	// on génére le code html
	document.getElementById('listePanier').innerHTML += `
                <div class="detailProduit" id="detailProduit" value="${article._id}">
                    <div class="imageProduit">
                        <img src=${article.imageUrl}
                        alt="Photo appareil ancien" class="imageProprieteProduit">
                    </div>
                    <div class="resumeProduit">
                        <div class="nomProduit">
                            <p class="policeParagraphe">
                            <strong>${article.name}</strong>
                            </p>
                            <p class="policeParagraphe2">
                            ${option}
                            </p>
                        </div>
                        <div class="prixProduit">
                            <p class="policePrixPanier"><strong>${prix}</strong></p>
                            <span class="droite">
                                <select name="listeNombreProbuit" id="listeNombreProbuit" class="choixNombreProbuit">
                                <option value="1" selected>1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                </select>
                            </span>
                            <p class="buttonSupprimer">
                                <button class="buttonSupprimerProduit">
                                Supprimer
                                </button>
                            </p>
                        </div>
                    </div>
                </div>`;
}

// Récupération de l'erreur pour affichage sur la page
function getError(erreurMsge) {
	//alert(erreurMsge);
	document.getElementById('flex-panierResultat').innerHTML += `<h1 class="messageErreur">&nbsp;${erreurMsge}</h1>`;
  }
