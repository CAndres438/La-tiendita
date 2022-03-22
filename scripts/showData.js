export const showData = async (list, $offers, $populars) => {
  const products = await list;
  products.forEach((prod) => {
    const { id, name, price, porcent, valuePorcent, image, grame, UM, um, amount, amountU } = prod;

    if (prod.porcent === true)
      $offers.innerHTML += `
        <div class="card">
        <div class="porcent">
            <p class="Porc">${valuePorcent * 100}% dto.</p>
        </div>
        <img class="card-img" src="${image}" alt="Esta es la imagen de un ${name}">
        <div class="description">
            <div class="prices">
                <p class="B-1">$ ${new Intl.NumberFormat("de-DE", {
                  style: "currency",
                  currency: "COP", //Puedo pasar el número del json que se consume a un formato moneda.
                }).format(price - price * valuePorcent)}/Kg</p>
                <p class="Normal-1 prices-Net">$ ${new Intl.NumberFormat(
                  "de-DE",
                  
                ).format(price)}/Kg</p>
            </div>
            <p class="Normal-2">${name}</p>
        </div>
        <p class="Normal-1-1"></p>
        <button type="button" class="btn btnDetalle" id=${id} data-bs-toggle="modal" data-bs-target="#modalDetalles">Agregar</button>
    </div>`;


    if(prod.porcent===false)
    
    $populars.innerHTML += `
    <div class="card">
    <img class="card-img" src="${image}" alt="Esta es la imagen de un ${name}">
    <div class="description">
        <p class="B-1">$ ${new Intl.NumberFormat(
            "de-DE",
            {
              style: "currency",
              currency: "COP", //Puedo pasar el número del json que se consume a un formato moneda.
            }
          ).format(price)}/Kg</p></p>
        <p class="Normal-2">${name}</p>
    </div>
    <p class="Normal-1-1">${grame+UM+"("+"$"+new Intl.NumberFormat(
        "de-DE",
        {
          style: "currency",
          currency: "COP", //Puedo pasar el número del json que se consume a un formato moneda.
        }
      ).format(price/grame)+ "/"+ um +")"}</p>
     
    <button type="button" class="btn btnDetalle" id=${id} data-bs-toggle="modal" data-bs-target="#modalDetalles">Agregar</button>
    
    </div>`;
  });
};
