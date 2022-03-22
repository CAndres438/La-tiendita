let cart = [];
let prices= [];
const reducer = (accumulator, curr)=>accumulator+curr;

const carritoTotal = document.getElementById('cartT');
const carritoTotal2 = document.getElementById('cartT2');
const carritoTotal3 = document.getElementById('cartT3');
// let incDiss3=1



const showCarrito = () => {
  listaCarrito = JSON.parse(localStorage.getItem("Carrito"));
  let carritoVacio = document.querySelector("#contenido-carrito");
    if (listaCarrito === null) {

        carritoVacio.innerHTML = `
        <div class="imagen-carrito-vacio" id="pro">
            <img src="https://res.cloudinary.com/daalu/image/upload/v1647466416/Recursos.Fresh/RecursosDaalu/FVS_gx3npz.png" alt="carrito vacio">
        </div>
        <div class="info-carrito-vacio" id="mon">
            <h3 class="Titulo-3">Tu canasta está vacía</h3>
            <button class="btn" id="btn-carrito-agregar">Agregar Productos</button>
        </div>
        `;
        document
            .getElementById("btn-carrito-agregar")
            .addEventListener("click", () => {
                window.location.href = "index.html";
            });
        document.getElementById('rein').addEventListener("click", () => {
            carritoVacio.innerHTML = "";
        })
    } else if (listaCarrito !== null) {
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
            document.getElementById('rein').addEventListener("click", () => {
                carritoVacio.innerHTML = "";
                alert1.innerHTML="";
            })
        });
    }
};

document.querySelector('#contenido-carrito').addEventListener('shown.bs.modal', showCarrito);

btnModalCarrito = document.getElementById('btnModalCarrito');
btnModalCarrito.addEventListener('click',() =>{
    showCarrito()    
} );

document.getElementById('btnVaciarCarrito').addEventListener('click', () => {
    localStorage.removeItem('Carrito');
    localStorage.removeItem('Total');
    cart=[]
    carritoTotal.innerText = "";
    carritoTotal2.innerText= ""; 
    carritoTotal3.innerText= "";
    showCarrito();

    localStorage.getItem('Carrito')
})

document.getElementById('btnPagar').addEventListener('click', () => {
    window.location.href = "pago.html"
})

