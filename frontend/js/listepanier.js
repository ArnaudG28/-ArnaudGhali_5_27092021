// Version V.2.7 nombre d'articles par article, liste et divers modifications

const listePanier = [];
var option ="";
var nombre = 0;
var sousTotalPanier = 0;
var nombreTotalArticle = 0;


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
            nombre = articleEnregistreLocalStorage [i].nombreArticlePanier;

            console.log(articleId);
            console.log(option);
            console.log(nombre);

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
        // on met à jour le nombre d'articles total
        document.getElementById('recapitulatifNombrePanier').innerHTML = `${nombreTotalArticle}`; 

        // on affiche le sous-total
        sousTotalPanier = convertisseurPrix(sousTotalPanier) ;
        document.getElementById('sousTotalPanier').innerHTML = `${sousTotalPanier}`; 
        document.getElementById('totalPanier').innerHTML = `${sousTotalPanier}`; 

    } else {
        erreurMsge = "Le panier est vide";
        document.getElementById('nombreNavigation').innerHTML = `0`;
        sousTotalPanier = 0;
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

    //alert(sousTotalPanier);
    // calcul du total du panier
    if(prix != null && prix !="") {
        sousTotalPanier = sousTotalPanier + (Number(article.price) * nombre);
        nombreTotalArticle = nombreTotalArticle + nombre;
    }

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
                                <option value="1" selected = "selected">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                </select>
                            </span>
                            <p class="buttonSupprimer">
                                <button type="button" class="buttonSupprimerProduit">
                                Supprimer
                                </button>
                            </p>
                        </div>
                    </div>
                </div>`;

        // on selectionne le nombre par article
            var listeNombreProbuit = document.getElementById("listeNombreProbuit");
            for (let i = 0; i < listeNombreProbuit.length; i++) {
                if (listeNombreProbuit.options[i].value == nombre) {
                    //alert(listeNombreProbuit.options[i].value);
                    listeNombreProbuit.options[i].selected = "selected";
                }
            }

}



// Récupération de l'erreur pour affichage sur la page
function getError(erreurMsge) {
	//alert(erreurMsge);
	document.getElementById('listePanier').innerHTML += `<h1 class="messageErreur">&nbsp;${erreurMsge}</h1>`;
  }
