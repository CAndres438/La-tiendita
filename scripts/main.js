import getData from "./getData.js";
import { showData } from "./showData.js";

const d= document
const $endpoint = "https://api-fake-pruebas.herokuapp.com/products/"
const $offers = d.querySelector('#Offers')
const $populars = d.querySelector('#Populars')
const $ubic = d.getElementById('btn-modal-ubicacion')

let ub = ['Selecciona una Ubicación']

// Escucha los elementos relacionados en los módulos dispuestos

d.addEventListener('DOMContentLoaded', () =>{
    const data= getData($endpoint);
    showData(data,$offers,$populars)
})


//  seleccion de detalles oferta
$offers.addEventListener('click', async event => {
    const btnDetalle = event.target.classList.contains('btnDetalle')
    const id = event.target.id

    if (btnDetalle) {
        const lista = await getData($endpoint);
        const objeto = lista.find(list => list.id === Number(id));

        localStorage.setItem('Detalle', JSON.stringify(objeto));

    }
});

$ubic.addEventListener('click', (e)=>{
    e.preventDefault();
    ub.splice(0)
    const $select = d.getElementById('selectUbicacion').value
    ub.push($select)
    let Entregar1=d.getElementById('textUbicacion');
    Entregar1.innerHTML=`${ub[0]}`
    let Entregar = document.getElementById('offcanvasRightLabel');
    Entregar.innerHTML=`Entregar a: ${ub[0]}`

})

//  Seleccion de detalles populares
$populars.addEventListener('click', async event => {
    const btnDetalle = event.target.classList.contains('btnDetalle')
    const id = event.target.id

    if (btnDetalle) {
        const lista = await getData($endpoint);
        const objeto = lista.find(list => list.id === Number(id));

        localStorage.setItem('Detalle', JSON.stringify(objeto));
    }
});

let Entregar = document.getElementById('offcanvasRightLabel');

Entregar.innerHTML+=`${ub[0]}`
