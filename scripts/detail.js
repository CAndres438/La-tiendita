let ofertasDetalles = document.querySelector('#modal-body');
let popularesDetalles = document.querySelector('#modal-body');

let incDiss1 = 1
let incDiss2 = 1
let amount_1 = 250
let amount_2 = 1
let UM = ["g","U"]
let alert1=document.getElementById('alert')

const getLocalStorage = () => {

  const detalle = JSON.parse(localStorage.getItem("Detalle"));


  const {
    name,
    price,
    valuePorcent,
    image,
    porcent,
    amountU
  } = detalle;

  // constante para formato de moneda
  const formatoCOP = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  });

  if (detalle.porcent === true) {
    // modal para ofertas
    ofertasDetalles.innerHTML += `
        <div class="detalle-producto">
            <div class="cont-img-detalle">
                <img class="img-detalle" src="${image}">
            </div>
            <div class="cont-texto-detalle">
                <h1 class="Headline-1 text-detalle-producto">${name}</h1>
                <div class="precios-detalle-producto">
                    <h2 class="Headline-2 text-detalle-producto">${formatoCOP.format(
                      price - price * valuePorcent
                    )}/Kg</h2>
                    <p class="Body-1-Regular precio-sin-descuento" >${formatoCOP.format(
                      price
                    )}/Kg</p>
                    <p class="Caption-Bold">${valuePorcent * 100}% dto.</p>
                </div>
                <p class="Caption-Regular">Precio con IVA incluido</p>
                <p class="Body-1-Regular">Peso aproximado por pieza puede variar de acuerdo al precio real.</p>
                <div class="select-madurez">
                    <select class="madurez-producto" id="madurez">
                        <option value="aleatorio" selected >Por elegir</option>
                        <option value="maduro">Maduro (Para hoy)</option>
                        <option value="normal">Normal (3-5 días)</option>
                        <option value="verde">Verde (7 días)</option>
                    </select>
                    <div class="opciones-compra">
                        <div class="contenedor-seleccion-cantidad" id="ofer">
                            <button class="btnDisminuir btnDisminuirGramos" onclick="restar()">-</button>
                            <input id="valor4" value=${
                              amount_1 * incDiss1
                            }>g</input>
                            <button class="btnAumentar btnAumentarGramos" onclick="sumar()">+</button>
                        </div>
                        <button type="button" class="btn" id="offerP" data-bs-dismiss="modal" aria-label="Close">Agregar</button>
                    </div>
            </div>
        `;
        document.getElementById('offerP').addEventListener('click', ()=>{
        let result = document.getElementById('valor4').value
        let amountG = 250
        let madurez = document.getElementById('madurez').value
        const nuevoItem = { image, name, price, result, valuePorcent, amountG, amountU, madurez};
        console.log(nuevoItem);

        console.log(nuevoItem)
        cart.push(nuevoItem);
        prices.push(((price - (price * valuePorcent))/amountG)*result)
    
        localStorage.setItem('Carrito', JSON.stringify(cart));
        localStorage.setItem('Total', JSON.stringify(prices.reduce(reducer)));
        listaCarrito = JSON.parse(localStorage.getItem('Carrito'));
        
        carritoTotal.innerText = `${listaCarrito.length}`;
        carritoTotal2.innerText= `${listaCarrito.length}`;  
        alert1.innerHTML+=`<div class="alert alert-primary" role="alert">
        A simple primary alert—check it out!
      </div>`
        carritoTotal3.innerText= `${formatoCOP.format(prices.reduce(reducer))}`

        
    })     
  }

  if (detalle.porcent === false) {
    //modal para populares
    popularesDetalles.innerHTML = `
                    <div class="detalle-producto">
                    <div class="cont-img-detalle">
                        <img class="img-detalle" src="${image}">
                    </div>
                    <div class="cont-texto-detalle">
                        <h1 class="Headline-1 text-detalle-producto">${name}</h1>
                        <h2 class="Headline-2 text-detalle-producto">${formatoCOP.format(
                          price
                        )}</h2>
                        <p class="Caption-Regular">Precio con IVA incluido</p>
                        <p class="Body-1-Regular">Peso aproximado por pieza puede variar de acuerdo al precio real.</p>
                            <div class="opciones-compra">
                                <div class="contenedor-seleccion-cantidad" id="popu">
                                    <button class="btnDisminuir btnDisminuirUnidades" onclick="restar()">-</button>
                                    <input id="valor4" value=${
                                      amount_2 * incDiss2
                                    }>U</input>
                            <button class="btnAumentar btnAumentarGramos" onclick="sumar()">+</button>
                                </div>
                                <button type="button" class="btn" id="normalP" data-bs-dismiss="modal" aria-label="Close">Agregar</button>
                            </div>
                        </div>
                    </div>
        `;
        document.getElementById('normalP').addEventListener('click', ()=>{

            let result = document.getElementById('valor4').value
            let valuePorcent=0
            let amountG = 1
            let madurez = "Empaque"
            const nuevoItem = { image, name, price, result, valuePorcent, porcent, amountG,amountU, madurez};
            console.log(nuevoItem);
            console.log(nuevoItem)
            cart.push(nuevoItem);
            prices.push(((price - (price * valuePorcent))/amountG)*result)
        
            localStorage.setItem('Carrito', JSON.stringify(cart));
            localStorage.setItem('Total', JSON.stringify(prices.reduce(reducer)));
            listaCarrito = JSON.parse(localStorage.getItem('Carrito'));
            
            carritoTotal.innerText = `${listaCarrito.length}`;
            carritoTotal2.innerText= `${listaCarrito.length}`;  
            carritoTotal3.innerText= `${formatoCOP.format(prices.reduce(reducer))}`
        })  
  }
};


sumar=()=>{
    
    i=document.getElementById('valor4').value
    const increase= document.getElementById('ofer');
    const increase2= document.getElementById('popu'); 

    if(i >= 250 || i==0){
        incDiss1++
        increase.innerHTML = '' 
        increase.innerHTML +=`<button class="btnDisminuir btnDisminuirGramos"onclick="restar()">-</button>
        <input id="valor4" value=${amount_1*incDiss1}>${UM[0]}</input>
        <button class="btnAumentar btnAumentarGramos" onclick="sumar()">+</button>` 
    }

    else if (i>=1 && i<250){
        incDiss2++
        increase2.innerHTML = '' 
        increase2.innerHTML +=`<button class="btnDisminuir btnDisminuirGramos"onclick="restar()">-</button>
        <input id="valor4" value=${amount_2*incDiss2}>${UM[1]}</input>
        <button class="btnAumentar btnAumentarGramos" onclick="sumar()">+</button>`
    }
    

}
restar=()=>{
    
    i=document.getElementById('valor4').value
    const Dism= document.getElementById('ofer');
    const Dism2= document.getElementById('popu'); 

    if(i >= 250){
        incDiss1--
        Dism.innerHTML = '' 
        Dism.innerHTML +=`<button class="btnDisminuir btnDisminuirGramos"onclick="restar()">-</button>
        <input id="valor4" value=${amount_1*incDiss1}>${UM[0]}</input>
        <button class="btnAumentar btnAumentarGramos" onclick="sumar()">+</button>` 
    }
    else if (i>1 && i<250){
        incDiss2--
        Dism2.innerHTML = '' 
        Dism2.innerHTML +=`<button class="btnDisminuir btnDisminuirGramos"onclick="restar()">-</button>
        <input id="valor4" value=${amount_2*incDiss2}>${UM[1]}</input>
        <button class="btnAumentar btnAumentarGramos" onclick="sumar()">+</button>`
    }
}




document.querySelector('#modalDetalles').addEventListener('show.bs.modal', () => {
    ofertasDetalles.innerHTML = '';
    popularesDetalles.innerHTML = '';
    
});

document.querySelector('#modalDetalles').addEventListener('shown.bs.modal', getLocalStorage)