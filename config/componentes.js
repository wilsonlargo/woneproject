let ActiveProyect;

const Language =
{
    nombre: "Yukpa",
    idioma: "",
    codIdioma: "",
    lexicon: []
}
class clsProyecto {
    constructor(nombre, idioma, codIdioma) {
        this.nombre = nombre;
        this.idioma = idioma;
        this.codIdioma = codIdioma;
        this.clsLexicon = []
    };

    //Sección de entradas para el lexico
    addEntryLexicon(Entry) {
        this.clsLexicon.push(Entry);
    }
    deleteEntryLexicon(id) {
        this.clsLexicon.splice(id, 1);
    }


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

    static loadAsInstance(objProyecto) {
        const loadEntries = (clsLexicon, parent) => {
            return clsLexicon.map(Entrada => {
                const EntradaObj = new Entry(Entrada.lx, Entrada.gn, parent);
                return EntradaObj;
            });
        }



        const proyecto = new clsProyecto(objProyecto.nombre, objProyecto.idioma, objProyecto.codIdioma);
        proyecto.clsLexicon = loadEntries(objProyecto.clsLexicon, proyecto);


        GLOBAL.state.proyecto = proyecto;
        proyecto.id = objProyecto.id;
        return proyecto;
    }

    GuardarProyecto() {
        const id = GLOBAL.firestore.updateProyecto(
            JSON.parse(ActiveProyect.convertToJSON()))


    }

    BorrarProyecto() {
        alert(this.id)
        GLOBAL.firestore.borrarProyecto(this.id);
    }

    //-------------------------------------------------------

    makerHtml() {
        const contenedor = document.getElementById("contenedor-proyecto")
        contenedor.innerHTML=""


        const inPoyectoNombre = HTML.inputContol(this, "inProyectoNombre","Nombre proyecto")
        contenedor.appendChild(inPoyectoNombre)
        const intNombre = document.getElementById("inProyectoNombre")
        intNombre.addEventListener('input', () => this.nombre = intNombre.value);
        intNombre.value = this.nombre;


        const inPoyectoIdioma = HTML.inputContol(this, "inProyectoIdioma","Nombre idioma")
        contenedor.appendChild(inPoyectoIdioma)
        const intIdioma = document.getElementById("inProyectoIdioma")
        intIdioma.addEventListener('input', () => this.idioma = intIdioma.value);
        intIdioma.value = this.idioma;





    }
}





class Entry {
    constructor(lx, gn) {
        this.lx = lx;
        this.gn = gn;
    }
}


function CrearProyecto() {
    const Proyecto = new clsProyecto('Nuevo proyecto', 'Nuevo Idioma', 'Codigo');
    //Luego agregamos esta clase y la convertimos a una base de datos y la salvamos.
    const id = GLOBAL.firestore.addProyecto(
        JSON.parse(Proyecto.convertToJSON()))
    CargarProyectos()
}

function CargarProyectos() {
    document.getElementById("lstProyectos").hidden = false
    const lstProyectos = document.getElementById("lstProyectos");
    //Limpiamos el contenedor del proyecto
    lstProyectos.innerHTML = ""
    const proyectos = GLOBAL.state.proyectos;
    if (proyectos.length === 0) {
        alert('No hay proyectos en la base de datos');
    } else {
        let i = 0
        proyectos.forEach(proyecto => {

            let lstItem = document.createElement("a")
            lstItem.className = "list-group-item list-group-item-action"
            lstItem.href = "#";
            lstItem.id = proyecto.id
            let contador = i
            lstItem.onclick = () => abrirProyecto(contador)
            i++

            let lstDiv = document.createElement("div")
            lstDiv.className = "d-flex w-100 justify-content-between"

            let lstH5 = document.createElement("h5")
            lstH5.className = "mb-1";
            lstH5.textContent = proyecto.nombre

            let lstSmall = document.createElement("small")
            lstSmall.className = "text-body-secondary";
            var today = new Date()
            lstSmall.textContent = today.toLocaleDateString("en-US");

            lstDiv.appendChild(lstH5);
            lstDiv.appendChild(lstSmall);

            let lstP = document.createElement("p")
            lstP.className = "mb-1";
            lstP.textContent = proyecto.idioma

            let lstSmall2 = document.createElement("small")
            lstSmall2.className = "text-body-secondary";
            lstSmall2.textContent = proyecto.id


            lstItem.appendChild(lstDiv);
            lstItem.appendChild(lstP);
            lstItem.appendChild(lstSmall2);

            lstProyectos.appendChild(lstItem)

        });
    }


}


function abrirProyecto(id) {
    ActiveProyect = clsProyecto.loadAsInstance(GLOBAL.state.proyectos[id]);
    ActiveProyect.makerHtml()
    document.getElementById("lstProyectos").hidden = true
}

function GuardarProyecto() {
    ActiveProyect.GuardarProyecto();
}

function BorrarProyecto() {
    ActiveProyect.BorrarProyecto();
    CargarProyectos()
}



document.getElementById('mnCrearProyectos').addEventListener('click', CrearProyecto);
document.getElementById('mnCargarProyectos').addEventListener('click', CargarProyectos);
document.getElementById('mnGuardarProyecto').addEventListener("click", GuardarProyecto);
document.getElementById('mnBorrarProyecto').addEventListener("click", BorrarProyecto);

