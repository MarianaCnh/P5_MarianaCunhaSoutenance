//J'appelle mon localstorage de la page produit
let panier = JSON.parse(localStorage.getItem("panier"));

//---------affichage des produits du panier
//sélection de l'id pour injecter le code HTML 
const positionElement1 = document.querySelector("#tableproduit");
const positionElement2 = document.querySelector("#calculPrixQte");



let produitPanier = [];
let totalPrix = 0;
let autreTotal = 0;
let qteItem = document.querySelectorAll("inputqte");
let products = [];
// products = JSON.parse(localStorage.getItem("panier"));



//Si le panier est vide il faut l'afficher 
if (panier === null || panier == 0) {
    const panierVide = `
    <div class="panierVide">Le panier est vide</div>`;
    positionElement1.innerHTML = panierVide;
} else {
    //si le panier n'est pas vide il faut afficher les produits, j'utilise une boucle for avec itérations pour cela 
    for (k = 0; k < panier.length; k++) {
        produitPanier = produitPanier + `
                <tbody>
                <tr>
                <td class="tdtableauproduit" >${panier[k].name}</td>
                <td class="tdOption"><p class="optionProduit">Option:</p>${panier[k].option}</td>
                <td>${panier[k].price}€</td>
                <td><span class="inputqte">${panier[k].qte}</span></td>
                <td><button class="btn-supprimer"><i class="fas fa-trash-alt"></i></button></td>
                </tr> 
                </tbody> `;
        positionElement1.innerHTML = produitPanier;


    }
};

function supprimerBouton() {
    // Supprimer les articles 
    let btnSupp = document.querySelectorAll(".btn-supprimer");
    for (let l = 0; l < btnSupp.length; l++) {
        btnSupp[l].addEventListener("click", (event) => {
            event.preventDefault();
            //prendre l'option du produit qui va être supprimer
            let idSupp = panier[l].option;
            //j'utilise la méthode filter pour supprimer l'élément où btn supprimer a été cliqué
            panier = panier.filter(el => el.option !== idSupp);
            //je relie le bouton à mon localstorage pour qu'il sâche ce que je veux supprimer
            localStorage.setItem("panier", JSON.stringify(panier));
            //retour sur la page panier pour que le message de panier vide s'affiche
            window.location.href = "panier.html";
            //quand je clique sur le bouton le localstorage se vide aussi
        })
    }
};

supprimerBouton();


function calculTotalPrix() {
    if (panier !== null) {
    JSON.parse(localStorage.getItem("panier")).forEach((panier) => {
        totalPrix += panier.price *= panier.qte;
        console.log(totalPrix)
        
    });

    let prixTotal = `<div class="totalPrix" ><p>Le prix total est de : ${totalPrix} €</p></div>`;
    positionElement2.insertAdjacentHTML("beforeend", prixTotal);
}

};
calculTotalPrix()


// --- FORMULAIRE ---

const afficherFormulaireHtml = () => {
    //Sélection élément du DOM pour positionner le formulaire 
    const afficherElement = document.querySelector("#formulaire");

    const structureFormulaire = `
    <div class="formulaireCommande">
            <h2 class="titreFormulaire">Remplissez le formulaire pour valider votre commande :</h2>
        
            <form class="contenuformulaire">
                
                <label for="prenom">Prénom :</label><span id="prenomManquant" class="styleManquant"></span>
                <input type="text" id="prenom" name="prenom" required>

                <label for="nom">Nom :</label><span id="nomManquant" class="styleManquant"></span>
                <input type="text" id="nom" name="nom" required>
                
                <label for="adresse" class="adresse">Adresse :</label><span id="adresseManquant" class="styleManquant"></span>
                <textarea id="adresse" name="adresse" required></textarea>

                <label for="ville">Ville :</label><span id="villeManquant" class="styleManquant"></span>
                <input type="text" id="ville" name="ville" required>

                <label for="codepostal">Code postal :</label><span id="codePostalManquant" class="styleManquant"></span>
                <input type="text" id="codepostal" name="codepostal" required>

                <label for="email">E-mail :</label><span id="mailManquant" class="styleManquant"></span>
                <input type="text" id="email" name="email" required>
                
                <button id="envoyerFormulaire" type="submit" name="envoyerFormulaire">
                    Confirmation de la commande
                </button>
            </form>
        </div>`;

    //injection HTML 
    afficherElement.insertAdjacentHTML("afterend", structureFormulaire);
};

//Affichage du formulaire
afficherFormulaireHtml();

//Je sélectionne le bouton pour envoyer le formulaire 
const btnEnvoyerForm = document.querySelector("#envoyerFormulaire");



// Un addEventListener pour que au click mon bouton envoye les données du formulaire
btnEnvoyerForm.addEventListener("click", (e) => {
    e.preventDefault();

    //je récupére les valeurs du formulaire
    const contact = {
        firstName: document.querySelector("#prenom").value,
        lastName: document.querySelector("#nom").value,
        address: document.querySelector("#adresse").value,
        city: document.querySelector("#ville").value,
        zipCode: document.querySelector("#codepostal").value,
        email: document.querySelector("#email").value
    };

    //je met les values du formulaire avec les produits sélectionnées dans un objet pour envoyer au serveur 
    {
        panier.forEach(cameraId => {
            products.push(cameraId._id);
        });
        console.log(products);
    }

    //controle formulaire avant envoie dans le localstorage  
    const firstName = contact.firstName;
    const lastName = contact.lastName;
    const email = contact.email;
    const address = contact.address;
    const city = contact.city;
    

    // constante qui contient mon message d'erreur
    const textAlert = (value) => {
        return `${value}: Les chiffres et symboles ne sont pas autorisé \n Il ne faut pas dépasser 20 caractères, minimum 3 caractères`
    };

    //dans ma constante qui contient mon regEx
    const regExPrenomNomVille = (value) => {
        return /^([A-Za-z]{3,20})?([-]{0,1})?([A-Za-z]{3,20})$/.test(value)

    };

    //il faut créer un regEx spécifique pour le code postal(que des chiffres et un nombre de 5 chiffres)
    const regExCodePostal = (value) => {
        return /^[0-9]{5}$/.test(value)
    };

    //il faut créer un regEx spécifique pour le mail
    const regExEmail = (value) => {
        return /^([\w-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})$/.test(value)
    };

    //il faut créer un regEx spécifique pour l'adresse donc il créer une constante avec une fonction fléchée 
    const regExAdresse = (value) => {
        return /^[A-Za-z0-9\s]{5,50}$/.test(value)
    };

    //pour m'éviter de copier/coller tout il faut créer une fonction qu'il faudra appeller dans les fonctions de contrôle
    function champManquantVide(querySelectorId) {
        document.querySelector(`#${querySelectorId}`).textContent = "";
    };

    function champManquantErreur(querySelectorId) {
        document.querySelector(`#${querySelectorId}`).textContent = "Veuillez remplir correctement ce champ";
    };



    // ma fonction qui contrôle le prénom du formulaire
    function prenomControle() {
        //contrôle du prénom avec les regex
        const lePrenom = contact.firstName;
        if (regExPrenomNomVille(lePrenom)) {
            champManquantVide("prenomManquant");
            return true;
        } else {
            champManquantErreur("prenomManquant");
            return false;
        };
    };
    // ma fonction qui contrôle le nom du formulaire
    function nomControle() {
        //contrôle du nom avec les regex
        const leNom = contact.lastName;
        if (regExPrenomNomVille(leNom)) {
            champManquantVide("nomManquant");
            return true;
        } else {
            champManquantErreur("nomManquant");
            return false;
        };
    };
    // ma fonction qui contrôle la ville du formulaire
    function villeControle() {
        //contrôle de la ville avec les regex
        const laVille = contact.city;
        if (regExPrenomNomVille(laVille)) {
            champManquantVide("villeManquant");
            return true;
        } else {
            champManquantErreur("villeManquant");
            return false;
        };
    };

    // ma fonction qui contrôle le code postal du formulaire
    function codePostalControle() {
        const codePostal = contact.zipCode;
        if (regExCodePostal(codePostal)) {
            champManquantVide("codePostalManquant");
            return true;
        } else {
            champManquantErreur("codePostalManquant");
            return false;
        };
    };

    // ma fonction qui contrôle l'e-mail du formulaire
    function emailControle() {
        const eMail = contact.email;
        if (regExEmail(eMail)) {
            champManquantVide("mailManquant");
            return true;
        } else {
            champManquantErreur("mailManquant");
            return false;
        };
    };

    // ma fonction qui contrôle l'adresse du formulaire
    function adresseControle() {
        const adresse = contact.adress;
        if (regExAdresse(adresse)) {
            champManquantVide("adresseManquant");
            return true;
        } else {
            champManquantErreur("adresseManquant");
            return false;
        };
    };

    //Condition pour que le formulaire soit pris en compte dans le localStorage
    if (prenomControle() && nomControle() && villeControle() && codePostalControle() && emailControle() && adresseControle()) {
        //Mettre l'objet contact dans le localStorage
        localStorage.setItem("contact", JSON.stringify(contact));

        const toutEnvoyer = JSON.stringify ({
            products,
            contact,
        })

        methodPost(toutEnvoyer);
    }else {
        console.log("error");
    }
});

function methodPost(toutEnvoyer) {
    //Envoie de l'objet dans le serveur
    fetch("http://localhost:3000/api/cameras/order", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: toutEnvoyer

    }).then(response => {
        return response.json();
    }).then(response => {
        localStorage.setItem("contact", JSON.stringify(response.contact));
        localStorage.setItem("orderId", JSON.stringify(response.orderId));
        localStorage.setItem("totalPrix", JSON.stringify(totalPrix));
        localStorage.removeItem('products');
        window.location.replace("confirmation.html");
    }).catch(error => {
        console.log(error);
    });


};