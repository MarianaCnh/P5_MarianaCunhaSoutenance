//récupération des données pour ma page produit
const queryString_url_id = window.location.search;
console.log(queryString_url_id);

//Extraire l'ID 
const urlSearchParams = new URLSearchParams(queryString_url_id)
console.log(urlSearchParams);

//après la recherche il faut prendre l'ID des produits
const camId = urlSearchParams.get("id");
console.log(camId);

//appel de l'api pour l'appeler dans le fetch 
const productApi = 'http://localhost:3000/api/cameras';

//Il faut créer un tableau vide pour le localStorage 
let panierLocalStorage = [];

// fonction qui contient le fetch pour récupérer les données de l'API et avoir l'identifiant du produit dans URL
function productFetch() {
    fetch(productApi + "/" + camId)
    .then(res => res.json()) 
    .catch((error) => console.log(error))
    .then((data) => {
        if (data){
            showProduct(data);
            //à partir du fetch je permet au bouton de push les données dans le local storage
            const btn = document.querySelector(".btn-panier");
            btn.addEventListener("click",(ev) => {
            ev.preventDefault();
            ajoutDuProduit(data);
      });
        }
    });
}

// il faut créer une fonction qui contiendra le code HTML puis les éléments à afficher dynamiquement sur la page
function showProduct(camera) {
    document.querySelector("#cam").innerHTML = `<article class="cardProduct">
      <img src="${camera.imageUrl}" class="img">
      <p class="name">${camera.name}</p>
      <p class="description">${camera.description}</p>
      <p class="price">${camera.price / 100}€</p>
      <form class="qteOptionProduit">

        <label for="optionProduit">Les options :</label>
          <select name="optionProduit" id="optionProduit">${this.showOptionLenses(camera.lenses)}</select>

        <label for="qteProduit">Choisir la quantité :</label>
          <select name="qteProduit" id="qteProduit"></select>
      </form>
        <button type="submit" class="btn-panier">Commander ici</button>
      </article>`;
      //mettre les quantité dans le HTML
  ajoutQte(document.querySelector("#qteProduit"));
}
productFetch();



//Boucle for et itération pour parcourir les options de lentilles pour chaque produit avec l'id correspondant
function showOptionLenses(lenses) {
    let optionLenses = '';
    for (let i = 0, size = lenses.length; i < size; i++) {
        optionLenses += `<option value="${(lenses[i])}">${(lenses[i])}</option>`;
    }
    return optionLenses;
};


//fonction qui me permettra d'envoyer le produit choisis au localStorage avec des conditions 
function ajoutDuProduit(camera){

  //autreItem me m'aidera pour mes conditions
  let autreItem = true;

  //j'appel l'id pour le placement du code HTML
  positionElementQte = document.querySelector("#qteProduit");
  const qteChoix = positionElementQte.value;

  //j'appel l'id pour le placement du code HTML
  const optionsLentilles = document.querySelector("#optionProduit");
  const choixLenses = optionsLentilles.value;

  //objet avec chaque propriété de chaque produit
  var camerasProduit = {
    _id : camera._id,
    name : camera.name,
    price : camera.price / 100,
    qte : qteChoix,
    option : choixLenses,
  };
  
  // si le panier est vide alors il doit ajouté un produit dans le tableau panierLocalStorage
  if (localStorage.getItem('product') === null){
    panierLocalStorage.push(camerasProduit);
    localStorage.setItem('product', JSON.stringify(panierLocalStorage));
}else {
  panierLocalStorage = JSON.parse(localStorage.getItem('product'));

//Pour chaque produit du même id et même option il faut augmenté la quantité
  panierLocalStorage.forEach((produit) => {
    if (camera._id === produit._id && choixLenses === produit.option) {
      produit.qte = parseInt(produit.qte) + parseInt(qteChoix);
      autreItem = false;
    }
  });

  //si un produit a la même option et le même id alors il ne faut pas créer de nouveau produit mais il faut incrémenter
  if (autreItem)panierLocalStorage.push(camerasProduit);
  localStorage.setItem("product", JSON.stringify(panierLocalStorage));

}
//une alerte pour prévenir que les produits ont bien été ajouté au panier
  window.alert("Les produits ont bien été ajouté au panier");
}


//il faut faire une fonction qui nous permettra de gérer une quantité pour le produit choisis pour avoir la possibilité de prendre plusieurs produits
function ajoutQte(positionElementQte){
  if(positionElementQte) {
  
  //une variable avec la quantité possible pour le produit
  const structureQte = `
  <option value="1">1</option>
  <option value="2">2</option>
  <option value="3">3</option>
  <option value="4">4</option>
  <option value="5">5</option>
  `;
    positionElementQte.innerHTML = structureQte;
  }else{
    //si le if ne fonctionne pas retourne moi "error" dans la console
    console.log(error);
  };
  }