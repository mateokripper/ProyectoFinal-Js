class Persona {
    constructor (nombre, apellido, email, opinion) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.opinion = opinion;   
    }
}

const tableId = document.getElementById("tableId")
const boton1 = document.getElementById("boton1")

async function mostrarGustos() {
    const gustos = await fetch('./json/gustos.json')
    const gustosParseados = await gustos.json()
    tableId.innerHTML = `
        <table class="table">
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Descripcion</th>
                <th scope="col"></th>
            </tr>
        </thead>
            <tbody id="tBody">
            </tbody>
        </table>
    
    `
    gustosParseados.forEach((gusto, indice) => {
        tBody.innerHTML += `
            <tr id="producto${indice + 1}">
                <th scope="row">${indice + 1}</th>
                <td>${gusto.gusto}</td>
                <td>${gusto.descripcion}</td>
                <td><button class="btn btn-dark"> Agregar </button>
            </tr>
        `
})}


boton1.addEventListener('click', mostrarGustos)

boton1.addEventListener('click', () => {
    mostrarGustos()
})


const personas = [];

const idFormulario = document.getElementById('formulario');

idFormulario.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const email = document.getElementById('mail').value;
    const opinion = document.getElementById('opinion').value;
    
    const persona = new Persona (nombre, apellido, email, opinion);
    
    personas.push(persona);
    
    localStorage.setItem('Persona', JSON.stringify(personas));
    
    idFormulario.reset();
    
})

idFormulario.addEventListener('submit', () => {
    Toastify({
        text: "Su formulario ha sido enviado correctamente",
        duration: 3000,
        //destination: "https://github.com/apvarun/toastify-js",
        //newWindow: false,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to bottom left, #30655A, #0229BA)",
        },
        onClick: function(){
            console.log("Diste click")
        } // Callback after click
      }).showToast();
})
 

const botonOpiniones = document.getElementById('botonOpiniones');
const opiniones = document.getElementById('opinionesId');

botonOpiniones.addEventListener('click', () => {
    const personas = JSON.parse(localStorage.getItem('Persona'));
    let aux = '';
    personas.forEach((persona,indice) => {
        aux +=  `
     <div class="card border-secondary mb-3" id="persona${indice}" style="max-width: 20rem; margin:3px">
        <div class="card-header">${persona.nombre}</div>
            <div class="card-body"> 
                <p class="card-text">${persona.opinion}</p>
            </div>
    </div>`
    
    });
    opiniones.innerHTML = aux;
});

