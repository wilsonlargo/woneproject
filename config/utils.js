const GLOBAL = {
    state: {
        proyecto: null,
        proyectos: [],
    },
    firestore: {},
};

const HTML = {
    inputContol(parent, idInput, label) {
        const controlHTML = document.createElement("form")
        controlHTML.className = "form-floating ms-5 me-5 mb-1"
        controlHTML.innerHTML = `
            <input type="text" class="form-control" id="${idInput}" value="${parent.nombre}">
            <label for="${idInput}">${label}</label>
        `



        return controlHTML
    },
}

function mensajes(){
    Toastify({
        text: "Este es un mensaje",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "green",
        },
        onClick: function () { } // Callback after click
    }).showToast();
    location.href ="./application/index-app.html"
}



  





