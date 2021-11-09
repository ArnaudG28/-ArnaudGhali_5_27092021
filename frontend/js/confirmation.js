// Version V.2.15 correction W3C

var IdCommande = "";

pageConfirmation();

function pageConfirmation() {

    // on récupére l'Id de la commande
    IdCommande = new URL(location.href).searchParams.get("id");
    //alert(IdCommande);

    // Declaration d'une variable pour le localstorage avec les clés et les valeurs
    let commandeEnregistreLocalStorage = JSON.parse(localStorage.getItem("commande"));
    // JSON.parse pour convertir les données au format JSON stocké dans le local storage en objet javascript
    console.log(commandeEnregistreLocalStorage);

	document.getElementById("nomCommande").textContent = commandeEnregistreLocalStorage.contact.firstName;
    document.getElementById("prenomCommande").textContent =commandeEnregistreLocalStorage.contact.lastName;
	document.getElementById("idCommande").textContent = IdCommande;
	document.getElementById("emailCommande").textContent = commandeEnregistreLocalStorage.contact.email;

    //displayCommande ();

	// on vide le local storage
    // on verifie que la clé article existe si oui on le vide
	let articleLocalStorage = JSON.parse(localStorage.getItem("article"));
	if (articleLocalStorage) {
		localStorage.removeItem("article");
	}

    // on affiche la page de confirmation


}

// AFFICHAGE HTML
function displayCommande (){

    // Declaration d'une variable pour le localstorage avec les clés et les valeurs
    let commandeEnregistreLocalStorage = JSON.parse(localStorage.getItem("commande"));
    // JSON.parse pour convertir les données au format JSON stocké dans le local storage en objet javascript
    console.log(commandeEnregistreLocalStorage);

    // on génér le code Html
    document.getElementById('vignetteConfirmationCommande').innerHTML = `
                <div class="">
                    <h2 class="policeH2">Merci, <span class="nomPrenomCommande" id="nomPrenomCommande">${commandeEnregistreLocalStorage.firstName } ${commandeEnregistreLocalStorage.lastName} </span></h2>
                </div>
                <div class="">
                    <h2 class="policeH2">Votre commande N° <span class ="idCommande" id="idCommande"> ${IdCommande}</span> a bien été prise en compte</h2>
                </div>
                <div class="">
                    <h2 class="policeH3">Un email de confirmation est envoyé à l'adresse : <span class ="emailCommande" id="emailCommande">${commandeEnregistreLocalStorage.email} </span></h2>
                </div>
                <div class="">
                    <button class="buttonRetourAccueil" onclick="confirmationRetourAccueil();">
                        Retourner à l'accueil
                    </button>
                </div>
    `
}
