//récupération des données pour ma page produit
const queryString_url_id = window.location.search;
console.log(queryString_url_id);

//Extraire l'ID 
const urlSearchParams = new URLSearchParams(queryString_url_id)
console.log(urlSearchParams);

const camId = urlSearchParams.get("id");
console.log(camId);

const productApi = 'http://localhost:3000/api/cameras';

//J'appelle mon localstorage de la page produit
let panier = JSON.parse(localStorage.getItem("panier"));

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

// boucle pour itérer la page produit
function showProduct(camera) {
    document.querySelector("#cam").innerHTML = `<article class="cardProduct">
      <img src="${camera.imageUrl}" class="img">
      <p class="name">${camera.name}</p>
      <p class="description">${camera.description}</p>
      <p class="price">${camera.price / 100}€</p>
      <form class="qteOptionProduit">
      <label for="optionProduit">Les options :</label>
        <select name="optionProduit" id="optionProduit">${this.showOptionLenses(camera.lenses)}
        </select>
        <label for="qteProduit">Choisir la quantité :</label>
        <select name="qteProduit" id="qteProduit">
        </select>
        </form>
        <button type="submit" class="btn-panier">Commander ici</button>
      </article>`;
      //mettre les quantité dans le HTML
  ajoutQte(document.querySelector("#qteProduit"));
}
productFetch();



//Boucle for et itération pour avoir les options de lentilles
function showOptionLenses(lenses) {
    let optionLenses = '';
    for (let i = 0, size = lenses.length; i < size; i++) {
        optionLenses += `<option value="${(lenses[i])}">${(lenses[i])}</option>`;
    }
    return optionLenses;
};

function ajoutDuProduit(camera){
  
  let autreItem = true;
  positionElementQte = document.querySelector("#qteProduit");
  const qteChoix = positionElementQte.value;

  const optionsLentilles = document.querySelector("#optionProduit");
  const choixLenses = optionsLentilles.value;

    //objet avec chaque propriété de produit
  var camerasProduit = {
    _id : camera._id,
    name : camera.name,
    price : camera.price / 100,
    qte : qteChoix,
    option : choixLenses,
  };
  
  // si le panier est vide alors il doit ajouté un produit dans le tableau
  if (panier == null){
    panier = []
}else {
  product = JSON.parse(localStorage.getItem('product'));

//Pour chaque produit du même id et même option il faut augmenté la quantité
  panier.forEach((produit) => {
    if (camera._id === camerasProduit._id && choixLenses === produit.option) {
      camerasProduit.qte = parseInt(produit.qte) + parseInt(qteChoix);
      produit.qte++
      autreItem = false;
    }
  });

}
    window.alert("Les produits ont bien été ajouté au panier");
    
  if (autreItem)panier.push(camerasProduit);
  localStorage.setItem("panier", JSON.stringify(panier));
}

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
    console.log(error);
  };
  }