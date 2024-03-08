//======================================================================================================
//Este módulo adminstra las acciones secundarias como variables globales de apoyo,
//construtores generales de controles
//Guarda información global de los proyectos cargados, y del proyecto activo
const GLOBAL = {
    state: {
        proyecto: null,
        proyectos: [],
        usuario: null,
        usuarios: [],
    },
    firestore: {},
};

let aUsers = []
let activeEmail;


//Contructores de componentes HTML
const HTMLcontrol = {
    controlPreview(nombre, idioma, codigo, id) {
        const control = document.createElement('div')
        control.className = "preview-proyect m-1 shadow"
        control.innerHTML = `
        <a href="#" class="nav-link" id="${id}" onclick="">
            <div class="h6 m-1 m-2 text-center">${nombre}</div>
                <hr>
                <div class="ms-1 me-1 preview-body p-2">
                <div>${idioma}</div>
                <div>${codigo}</div>
            </div>  
        </a>
        `
        return control
    }
}


//Un control de mensajes configurable, remplaza a alert.
function mensajes(text, color) {
    Toastify({
        text: text,
        duration: 3000,
        destination: "",
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: color,
            color: "white",
        },
        onClick: function () { } // Callback after click
    }).showToast();

}

const modal = {

    modalInput(comando) {
        const modal = new bootstrap.Modal(document.getElementById('myModal'));

        modal.show();
        const btn = document.getElementById('btnConfirm')
        btn.onclick = comando

    }


}


const hiddenControls = {

    hiddenToPreviwe() {
        document.getElementById("contenedor-proyecto-activo").hidden = true
        document.getElementById("contenedor-previo-proyectos").className = "m-2 d-flex flex-wrap"
        document.getElementById("contenedor-previo-proyectos").hidden = false
    },

    hiddenToProyecto() {
        document.getElementById("contenedor-proyecto-activo").hidden = false
        document.getElementById("contenedor-previo-proyectos").className = ""
        document.getElementById("contenedor-previo-proyectos").hidden = true
        document.getElementById("contenedor-lexicon").hidden = true
       
    },
    hiddenToLexicon() {
        document.getElementById("contenedor-info").hidden = true
        document.getElementById("contenedor-lexicon").hidden = false
    },
    hiddenToInfo() {
        document.getElementById("contenedor-info").hidden = false
        document.getElementById("contenedor-lexicon").hidden = true
    },






}



