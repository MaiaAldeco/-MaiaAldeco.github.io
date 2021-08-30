/*                                                     */
/*                 VARIABLES GLOBALES                 */
/*                                                   */
let listaProductos = [
    { nombre: 'Carne', cantidad: 2, precio: 12.34 },
    { nombre: 'Pan', cantidad: 3, precio: 35.25 },
    { nombre: 'Leche', cantidad: 5, precio: 56.78 },
    { nombre: 'Fideos', cantidad: 1, precio: 78.90 },
]

let crearLista = true
let ul


/*                                                     */
/*                 FUNCIONES GLOBALES                 */
/*                                                   */
function borrarProd(index) {
    console.log('borrarPord', index)

    listaProductos.splice(index, 1)
    renderLista()
}

/* function cambiarCantidad(index,elem){
    let cantidad = Number(elem.value) //obtengo el elemento(cantidad) ingresada
    console.dir(elem)
    console.log('cambiarCantidad', index, elem, cantidad)
    listaProductos[index].cantidad=cantidad //actualizo la lista 
}

function cambiarPrecio(index,elem){
    let precio = Number(elem.value) //obtengo el elemento(precio) ingresado this
    console.dir(elem)
    console.log('cambiarPrecio', index, elem,precio)
    listaProductos[index].precio = precio //actualizo la lista 
} */

function cambiarValor(tipoValor,index,elem){
    let valor = Number(elem.value) 
    valor = tipoValor == 'precio'? Number(valor) : parseInt(valor)
    console.log('cambiarValor', index, elem, valor)
    listaProductos[index][tipoValor] = valor
}

function renderLista() {

    if (crearLista) {
        ul = document.createElement('ul')
        ul.classList.add('demo-list-icon', 'mdl-list', 'w-100') // <ul class="demo-list-icon mdl-list w-100">
    }

    ul.innerHTML = ''

    listaProductos.forEach((prod, index) => {
        console.log(prod, index)
        ul.innerHTML +=
            `<!-- Icon List -->
                
                    <li class="mdl-list__item">
                        <!-- Icono del producto -->
                        <span class="mdl-list__item-primary-content w-10">
                            <i class="material-icons mdl-list__item-icon">shopping_cart</i>
                        </span>

                        <!-- Nombre del producto -->
                        <span class="mdl-list__item-primary-content w-30">
                            ${prod.nombre}
                        </span>

                        <!-- Cantidad del producto -->
                        <span class="mdl-list__item-primary-content w-20">
                            <!-- Textfield with Floating Label -->
                            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                                <input onchange="cambiarValor('cantidad',${index},this)" value="${prod.cantidad}" class="mdl-textfield__input" type="text" id="sample-cantidad-${index}">
                                <label class="mdl-textfield__label" for="sample-cantidad-${index}">Cantidad</label>
                            </div>
                        </span>

                        <!-- Precio del producto -->
                        <span class="mdl-list__item-primary-content w-20 ml-item">
                            <!-- Textfield with Floating Label -->
                            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                                <input onchange="cambiarValor('precio',${index},this)" value="${prod.precio}" class="mdl-textfield__input" type="text" id="sample-precio-${index}">
                                <label class="mdl-textfield__label" for="sample-precio-${index}">Precio($)</label>
                            </div>
                        </span>

                        <!-- Acción (borrar el producto) -->
                        <span class="mdl-list__item-primary-content w-20 ml-item">
                            <!-- Colored FAB button with ripple -->
                            <button onclick="borrarProd(${index})"
                                class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
                                <i class="material-icons">remove_shopping_cart</i>
                            </button>
                        </span>
                    </li>
                </ul>`
    })
    if (crearLista) {
        document.getElementById('lista').appendChild(ul)
    }else{
        componentHandler.upgradeElements(ul)
    }
    crearLista = false
}

function configurarListeners(){
    /* Ingreso de un producto nuevo */
    document.getElementById('btn-entrada-producto').addEventListener('click',()=>{
        console.log('btn-entrada-producto')

        let input = document.getElementById('ingreso-producto')
        let producto = input.value
        console.log(producto)

        if(producto){
            listaProductos.push({nombre : producto, cantidad: 1, precio: 0})
            renderLista() //refresco la vista
            input.value = null
        }
    })

    /* Borrado TOTAL de productos */
    document.getElementById('btn-borrar-productos').addEventListener('click',()=>{
        console.log('btn-borrar-productos')

        if(confirm('¿Desea borrar todos los productos?')){
            listaProductos = []
            renderLista()
        }

    })
}

function registrarServiceWorker(){
    if('serviceWorker' in navigator){
        window.addEventListener('load', () =>{
            this.navigator.serviceWorker.register('./sw.js')
            .then( reg => {
                console.log('el service worker se registró correctamente', reg)
            })
            .catch(err =>{
                console.error('Error al registrar el Service Worker', err)
            })
        })
    } else {
        console.error('serviceWorker no está disponible en navigator')
    }
}

function start() {
    console.log(document.querySelector('title').textContent)
    registrarServiceWorker()
    configurarListeners()
    renderLista()
}

/*                                                     */
/*                 EJECUCIÓN                          */
/*                                                   */
start()