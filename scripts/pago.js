let cart = [];
let prices= [];
const reducer = (accumulator, curr)=>accumulator+curr;

const carritoTotal = document.getElementById('cartT');
const carritoTotal2 = document.getElementById('cartT2');
const carritoTotal3 = document.getElementById('cartT3');
const enviar = document.getElementById('pago');
const formulario = document.getElementById('formPago')
let carritoVacio = document.querySelector("#contenido-carrito");
let pagarT = document.getElementById('cartT4');

// constante para formato de moneda
const formatoCOP = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  });


document.addEventListener('DOMContentLoaded', () =>{
    showCarrito()
    element=JSON.parse(localStorage.getItem("Total"))
    pagarT.innerHTML=`${formatoCOP.format(element)}`
})

const showCarrito = () => {
 
  let carritoVacio = document.querySelector("#contenido-carrito");
  listaCarrito = JSON.parse(localStorage.getItem("Carrito"));
        listaCarrito.forEach((producto) => {
            const { name, price, image, result, valuePorcent, amountG, amountU, madurez} = producto;

            carritoVacio.innerHTML += `
        <div class="carrito__item">
            <img src=${image} alt=${name}>
            <div>
                <h3>${name}</h3>
                <p class="price" id="price">${"$" +
                new Intl.NumberFormat("de-DE", {
                    style: "currency",
                    currency: "COP",
                }).format(((price - (price * valuePorcent))/amountG)*result)
                }</p>
            </div>
            <p class="item__cantidad id="valor3">${madurez}</p>
            <div id= "plus-min">  
                
                <p class="item__cantidad" id="valor4"> ${result+amountU} </p>
            </div>
            </div>
            `;
        });
    }



    enviar.addEventListener('click', async (e)  => {
        e.preventDefault()
        let email = document.getElementById('Email').value
        let NT = document.getElementById('NT').value
        let date = document.getElementById('Date').value
        let cvc = document.getElementById('CVC').value
        let nick = document.getElementById('Nick').value
        let Total = formatoCOP.format(element)

        if( (email.length >= 8 && email.length <= 25) && (cvc.length === 3)){
            let resp = await fetch('https://viajes02.herokuapp.com/usuarios', {
              method: 'POST',
              body: JSON.stringify({
                  correo: email,
                  NumTarjeta: NT,
                  fecha: date,
                  cvc: cvc,
                  NombreTarjeta: nick,
                  total: Total
              }),
              headers: {
                  "Content-Type": "application/json; charset=UTF-8"
              }
          })
          let data = resp.json()
          console.log(data);
      
          formulario.reset()
          localStorage.removeItem('Carrito');
          localStorage.removeItem('Total');
          carritoVacio.innerHTML=""
          pagarT.innerHTML=""
      
          alert('Se ha generado una factura en nuestra Bd')
      }
          else{
              alert('Algunos campos están vacíos o la compra es inválida')
          }

          
    })
