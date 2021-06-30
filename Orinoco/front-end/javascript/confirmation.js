
//il faut récupérer les données pour pouvoir les appliquées sur la page confirmation
let contact = JSON.parse(localStorage.getItem("contact"));
let orderId = JSON.parse(localStorage.getItem("orderId"));
let totalPrix = JSON.parse(localStorage.getItem("totalPrix"));

//mon code HTML pour le message de remerciment avec les données du localStorage
function messageConfirmation(msgFinal){
    if (msgFinal) {
        confirm = `
            <div class="messageFinalCommande">
            <h1>Merci pour votre commande ${contact.firstName} ! </h1>
            <p>Voici le récapitulatif de votre commande :</p>
            <p>Numéro de commande : ${orderId}</p>
            <p>Le total de votre commande est de : ${totalPrix} €</p>

            <h2>À la prochaine !</h2>
            </div>`;

        msgFinal.innerHTML = confirm;
    }
}

messageConfirmation(document.querySelector("#commande"));

//il faut vider le localStorage pour que le panier soit vide (au cas où il y aurait une nouvelle commande)
localStorage.removeItem('contact');
localStorage.removeItem('totalPrix');
localStorage.removeItem('orderId');
localStorage.clear('panier');

