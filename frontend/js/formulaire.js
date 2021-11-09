// Version V.2.15 correction W3C


// Gestion du formulaire
nombreArticlesCommande = 0;
var saisieOk = true;


function commanderPayer(nombreArticles) {
    nombreArticlesCommande = nombreArticles;
    let elementsFormulaire = document.getElementById("formIdentCommande");

    // validation des saisies formulaires
    validationFormulaire(elementsFormulaire);

    if (saisieOk == true) {
        // recuperation des données formulaires
        let nom = document.getElementById('nom').value;
        let prenom = document.getElementById('prenom').value;
        let email = document.getElementById('email').value;
        let adresse = document.getElementById('adresse').value;
        let zipcode = document.getElementById('zipcode').value;
        let ville = document.getElementById('ville').value;
        


        // on controle que le panier contient des articles
        if (nombreTotalArticle != 0) {
            // on controle que les champs sont bien saisis
            if ((nom && prenom && email && adresse && zipcode && ville) !="") {
                    console.log(nombreArticlesCommande);
                    // creation d'une variable globale type JSON contenant les informations du client

                let contact = {
                        'firstName': nom,
                        'lastName': prenom,
                        'address': adresse,
                        'city': ville,
                        'email': email,
                    };  

                // decalaration de la variable globale recuparation du panier
                let articleEnregistreLocalStorage = JSON.parse(localStorage.getItem("article"));

            // controle si le panier est vide
            if (articleEnregistreLocalStorage != null && articleEnregistreLocalStorage.length != 0 ) {
                console.log(articleEnregistreLocalStorage);

                    // on créé un tableau des Id du panier
                    let products  = [];
                    // on recupère les id
                    for (let i = 0; i < articleEnregistreLocalStorage.length; i++) {
                        products .push(articleEnregistreLocalStorage [i].idArticlePanier);
                    }

                    console.log(products); 

                // on creer une variable contenat les données de la commande  
                let commandeClient = JSON.stringify({contact,products});
                //console.log(commandeClient);

                // creation d'un objet init qui vous permet de contrôler un certain nombre de réglages
                var myInit = { method: 'POST',
                            headers: {'content-type': 'application/json'},
                            body: commandeClient};
                
                // on appel l'API avec Fetch et on envois les données avec la methode POST 

                    fetch("https://teddies-api.herokuapp.com/api/cameras/order",myInit)
                    .then(function(httpBodyResponse) { 
                        return httpBodyResponse.json();
                        })
                    .then(function(commande) {
                        localStorage.setItem("commande", JSON.stringify(commande));
                        let commandeId= commande.orderId;
                        window.location.href = './confirmation.html?id='+commandeId;
                        //pageConfirmation(commandeId);
                        console.log(commandeId);
                        // tout s'est bien deroulé on peut supprimer le local storage et aller à la page de confirmation

                    })

                    // gestion des erreurs
                    .catch(function(erreur) {
                        //alert(erreur);
                        erreurMsge = erreur.message;
                        getError(erreurMsge);
                    })   
            } else {
                alert("Votre panier est vide");
            }
            } else {
                alert("Veuillez saisir tous les champs correctement avant de procéder au paiement");
            }
        }
    }
}

function validationFormulaire(elementsFormulaire) {

    // on teste que les saisies on seuleument des caractères alphanumeric et des espaces
    var carateresInvalides = /[&\/\\#,+()$~%.'":*?<>{}]/;
    var carateresInvalidesAdresseEmailCode = /[&\/\\#+()$~%'":*?<>{}]/;
    var caratereEmail = /[@]/;
    let formulaire = elementsFormulaire;
        
    saisieOk = true;
 
    if (carateresInvalides.test(elementsFormulaire.nom.value)) {
        alert("Erreur : Veuillez saisir des caractères valides !");
        saisieOk = false;
    } 
    else if (carateresInvalides.test(elementsFormulaire.prenom.value)) {
        alert("Erreur : Veuillez saisir des caractères valides !");
        saisieOk = false;
    } 
    
    else if (carateresInvalidesAdresseEmailCode.test(elementsFormulaire.email.value)) {
        alert("Erreur : Veuillez saisir des caractères valides !");
        saisieOk = false;
    } 
    // test présence de @
    else if (!caratereEmail.test(elementsFormulaire.email.value)) {
        alert("Erreur : Veuillez saisir une adresse email valide !");
        saisieOk = false;
    } 
    
    else if (carateresInvalidesAdresseEmailCode.test(elementsFormulaire.adresse.value)) {
        alert("Erreur : Veuillez saisir des caractères valides !");
        saisieOk = false;
    } 
    if (carateresInvalidesAdresseEmailCode.test(elementsFormulaire.zipcode.value)) {
        alert("Erreur : Veuillez saisir des caractères valides !");
        saisieOk = false;
    } 
    else if (carateresInvalides.test(elementsFormulaire.ville.value)) {
        alert("Erreur : Veuillez saisir des caractères valides !");
        saisieOk = false;
    } 
}


// Récupération de l'erreur pour affichage sur la page
function getError(erreurMsge) {
	//alert(erreurMsge);
	document.getElementById('listePanier').innerHTML += `<h1 class="messageErreur">&nbsp;${erreurMsge}</h1>`;
  }




/** Infos provenant du contraoleur
 *
 * Expects request to contain:
 * contact: {
 *   firstName: string,
 *   lastName: string,
 *   address: string,
 *   city: string,
 *   email: string
 * }
 * products: [string] <-- array of product _id
 *
 */