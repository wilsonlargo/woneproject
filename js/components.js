//Esta variable guarda el proyecto activo como clase
let ActiveProyect;
class clsProyecto {
    constructor(nombre, idioma, codidioma, password) {
        this.nombre = nombre;
        this.idioma = idioma;
        this.codidioma = codidioma;
        this.password = password;


        this.clsLexicon = []
    };

    //Todo esta clase se deriva a una cadena tipo Json
    convertToJSON() {
        const cache = [];
        return JSON.stringify(this, (key, value) => {
            if (typeof value === 'object' && value !== null) {
                if (cache.includes(value)) return;
                cache.push(value);
            }
            return value;
        });
    }

    //Inicia la transformación del objeto firebase en un objeto para la clase proyecto
    static loadAsInstance(objProyecto) {
        //Esta acción carga las actividades que están en firebase y la sube convierte en 
        //un objeto que llena la lista de areas


        //Crea una nueva clase proyecto
        const proyecto = new clsProyecto(objProyecto.nombre, objProyecto.idioma, objProyecto.codidioma, objProyecto.password);
        //Lo carga en uan variable global
        GLOBAL.state.proyecto = proyecto;
        //Identifica el marcador único ID
        proyecto.id = objProyecto.id;

        //proyecto.clsAreas = loadAreas(objProyecto.clsAreas);
        return proyecto;

    }

    GuardarProyecto() {
        const id = GLOBAL.firestore.updateProyecto(
            JSON.parse(ActiveProyect.convertToJSON()))
    }

    BorrarProyecto() {
        //Ejecuro la función global en dataconfig.js
        GLOBAL.firestore.borrarProyecto(this.id);
        document.getElementById("contenedor-vigencia").hidden = true
    }

    makerHTMLProyecto() {
        const cNombre = document.getElementById("textNombre")
        cNombre.addEventListener('input', () => this.nombre = cNombre.value);
        cNombre.value = this.nombre;

        const cIdioma= document.getElementById("textIdioma")
        cIdioma.addEventListener('input', () => this.idioma = cIdioma.value);
        cIdioma.value = this.idioma;

        const cCodigo= document.getElementById("textCodigo")
        cCodigo.addEventListener('input', () => this.codidioma = cCodigo.value);
        cCodigo.value = this.codidioma;

        const cPass= document.getElementById("textPassword")
        cPass.addEventListener('input', () => this.password = cPass.value);
        cPass.value = this.password;
    }
}

//Funciones exógenas para la adminsitración de proyectos
//estas funciones apuntan a funciones internas de las clases

async function CrearProyecto() {

    try {
        const Proyecto = new clsProyecto('Nompbre proyecto', 'Nombre idioma', 'Codigo idioma', "admin");
        //Luego agregamos esta clase y la convertimos a una base de datos y la salvamos.
        const id = GLOBAL.firestore.addProyecto(
            JSON.parse(Proyecto.convertToJSON()))
        mensajes("Proyecto creado", "green")
        cargarProyectos()

    } catch (error) {
        mensajes("No ha iniciado sesión", "red")
        console.log(error)
    }

}
async function cargarProyectos() {
    try {
        hiddenControls.hiddenToPreviwe()
        const proyectos = GLOBAL.state.proyectos;
        if (proyectos.length === 0) {
            mensajes("No hay proyectos creados", "orange")
        } else {
            const contPreview = document.getElementById("contenedor-previo-proyectos")
            contPreview.innerHTML = ""
            proyectos.forEach(proyecto => {
                const itemPreview = HTMLcontrol.controlPreview(proyecto.nombre, proyecto.idioma, proyecto.codidioma, proyecto.id)
                contPreview.appendChild(itemPreview)
                document.getElementById(proyecto.id).onclick = () => showProyectPanel(proyecto)
            })
            mensajes("Carga de proyectos completada", "green")
        }
    } catch (error) {
        console.log(error)
    }
}

function showProyectPanel(proyecto) {
    modal.modalInput(
        //Asigna un comando de confirmación a un
        //boton dentro del formulario, confirmar
        () => {
            const login = document.getElementById("passProyecto").value

            if (login == proyecto.password) {
                ActiveProyect = ActiveProyect = clsProyecto.loadAsInstance(proyecto)
                showProyecto()
                mensajes("Ingreso al proyecto " + proyecto.nombre, "green")
            } else {
                mensajes("La contraseña no es corecta ", "red")
            }
        }
    )
}
function showProyecto() {
    hiddenControls.hiddenToProyecto()
    ActiveProyect.makerHTMLProyecto()
}
function showLexicon() {
    hiddenControls.hiddenToLexicon()
    //ActiveProyect.makerHTMLProyecto()
}
function showInicio() {
    hiddenControls.hiddenToInfo()
}