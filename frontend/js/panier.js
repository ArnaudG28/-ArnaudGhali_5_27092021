// Version V.2.6 liste panier vidage local storage divers modifications
//Variable globale
var option = "vide";

async function ajoutPanier() {

	let articleId = document.activeElement.value;

        // Verification si l'id est renseigné
        if (articleId!=null && articleId!='') {
                //alert(articleId);

                let idArticlePanier = articleId;
                let nombreArticlePanier = 1;
                // creation d'une variable globale contenant les informations de l'article ou produit choisi
                const articlePanier = {idArticlePanier,option,nombreArticlePanier};

                console.log(articlePanier);

                // Declaration d'une variable pour le localstorage avec les clés et les valeurs
                let articleEnregistreLocalStorage = JSON.parse(localStorage.getItem("article"));
                // JSON.parse pour convertir les données au format JSON stocké dans le local storage en objet javascript
                console.log(articleEnregistreLocalStorage);

                // On vérifie si la clé existe déjà dans le local storage, soit true , soit false
                if (articleEnregistreLocalStorage) {
                    // stocke des données de ma variable contenant les donnees
                    articleEnregistreLocalStorage.push(articlePanier);
                    
                    // on envoi le tout dans le local storage
                    localStorage.setItem("article",JSON.stringify(articleEnregistreLocalStorage));
                    
                    console.log(articleEnregistreLocalStorage);
                    
                } else {
                    // si il n'y a pas d'article enregistré dans le local storage, création d'un tableau
                    articleEnregistreLocalStorage = [];
                    // stocke des données de ma variable contenant les donnees
                    articleEnregistreLocalStorage.push(articlePanier);

                    // on envoi le tout dans le local storage
                    localStorage.setItem("article",JSON.stringify(articleEnregistreLocalStorage));

                    console.log(articleEnregistreLocalStorage);
                }

                // mise à jour du nombre d'article dans le panier
                     var nombreArticleTotalPanier = articleEnregistreLocalStorage.length;
                     document.getElementById('nombreNavigation').innerHTML = `${nombreArticleTotalPanier}`;
        }
}

// recuperation de l'option choisie
function recupSelected(choixModele){
    option=choixModele;
    //alert(option);
}