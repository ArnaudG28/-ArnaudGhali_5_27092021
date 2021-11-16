// Version V.4.1 Version finale - Correction suite à soutenance

//Variable globale
var option = "vide";
var id ="";

async function ajoutPanier() {

    // Gestion option non choisie dans la page produit

        articleId = document.activeElement.value;
    
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
                    let articleExiste = false;
                    // On verifie si l'id de l'article existe déjà sinon on met à jour le nombre d'article et Option
                    for (let i = 0; i < articleEnregistreLocalStorage.length; i++) { 
                                if (articleEnregistreLocalStorage[i].idArticlePanier === idArticlePanier && articleEnregistreLocalStorage[i].option == option) {
                                    // l'article existe on met à jour le nombre
                                    articleExiste = true;
                                    // on teste le nombre d'articles par article , blocage à 5
                                    if (articleEnregistreLocalStorage[i].nombreArticlePanier < 5) {

                                        articleEnregistreLocalStorage[i].nombreArticlePanier = articleEnregistreLocalStorage[i].nombreArticlePanier + nombreArticlePanier;
                                        // on sort on a trouvé l'article
                                        break;
                                    }
                                    alert ("Vous ne pouvez pas rajouter plus de 5 articles du même article")
                                    break;
                                }

                    }    

                    // on met à jour le local storage si l'article n'existe pas
                    if (articleExiste == false) {
                        // stocke des données de ma variable contenant les donnees
                        articleEnregistreLocalStorage.push(articlePanier);
                    } 

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
                nombreArticle();
                    // var nombreArticleTotalPanier = articleEnregistreLocalStorage.length;
                     //document.getElementById('nombreNavigation').innerHTML = `${nombreArticleTotalPanier}`;
                     
        }
    
}

// recuperation de l'option choisie
function recupSelected(choixModele){
    option=choixModele;
    //alert(option);
}