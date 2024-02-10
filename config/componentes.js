const Language =
{
    nombre_proyecto: "Yukpa",
    idioma: "",
    cod_dioma: "",

    lexicon: [
        {
            vernacular: "",
            nacional: "",
            entry: [

                {
                    lx: "pota",
                    mor: "raíz",
                    gn: "mi boca",
                    ge: "mi boca",
                    dn: "mi boca",
                    ps: "nombre",
                    ph: "'pota",
                    sd: [
                        {
                            dominio: "partes del cuerpo"
                        }
                    ],
                    cr: "",
                }
            ]
        }


    ]
}
class Proyecto {
    constructor(nombre, idioma, codIdioma) {
        this.nombre = nombre;
        this.idioma = idioma;
        this.codIdioma = codIdioma;
        this.lexicon = []
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


    //-------------------------------------------------------





}


function CrearProyecto() {
    //const proyecto = new Proyecto('yukpa', 'yukpa', '');
    const id = GLOBAL.firestore.addProyecto(Language);
    GLOBAL.state.proyecto = Language;
}

function CargarProyectos() {
    const cSelProyectos = document.getElementById("cSelProyecto");
    cSelProyectos.innerHTML=""
    const proyectos = GLOBAL.state.proyectos;
    if (proyectos.length === 0) {
        alert('No hay proyectos en la base de datos');
    } else {
        proyectos.forEach(proyecto => {
            let cSelect = document.createElement("option")
            cSelect.value = proyecto.id;
            cSelect.textContent = proyecto.nombre_proyecto;
            cSelProyectos.appendChild(cSelect)
        });
    }
}

function abrirProyecto(control) {
    const proyectos = GLOBAL.state.proyectos[0];
    //proyectos.nombre_proyecto="castellano"
    proyectos.lexicon[0].entry[0].lx="yushe"
    let proyecto = GLOBAL.firestore.updateProyecto(proyectos)

    //Se puede hacer con el parceador y las clases, debo intentarlo del program manager


}


document.getElementById('mnCrearProyectos').addEventListener('click', CrearProyecto);
document.getElementById('mnCargarProyectos').addEventListener('click', CargarProyectos);
//document.getElementById('cSelProyecto').addEventListener("click", abrirProyecto);

