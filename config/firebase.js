import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    setPersistence,
    browserLocalPersistence,
    browserSessionPersistence,
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

import {
    getFirestore,
    collection,
    onSnapshot,
    doc,
    addDoc,
    setDoc,
    getDocs,
    getDoc,
    deleteDoc,
    updateDoc,
    deleteField,
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

// Utiliza las claves y credenciales de mi base de datos de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBly3x5yVwF_j1OVhUKhPNNM5WipNNycCk",
    authDomain: "proyectowoneta.firebaseapp.com",
    projectId: "proyectowoneta",
    storageBucket: "proyectowoneta.appspot.com",
    messagingSenderId: "731977884302",
    appId: "1:731977884302:web:e16d22dae218e201d19fdf"
  };

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Referencia a las colecciones de proyectos y objetivos
const coleccionProyectos = collection(db, "proyectos");

/* Funciones base para manejar la base de datos de proyectos */

// Función para obtener todos los proyectos de la base de datos
async function getProyectos() {
    const proyectos = [];
    const querySnapshot = await getDocs(coleccionProyectos)
    querySnapshot.forEach((doc) => {
        proyectos.push({
            ...doc.data(),
            id: doc.id,
        });
    });
    return proyectos;
}

// Función para agregar un objeto de proyecto a la base de datos
async function addProyecto(objProyecto) {
    const docRef = await addDoc(coleccionProyectos, objProyecto);
    return docRef.id;
}

// Funcion para eliminar un proyecto por id
async function borrarProyecto(id) {
    await deleteDoc(doc(db, "proyectos", id));
}

// Función para obtener un proyecto por id
async function getProyecto(id) {
    const docRef = doc(db, "proyectos", id);
    const docSnap = await getDoc(docRef);

    return docSnap.exists() ? ({
        ...docSnap.data(),
        id: docSnap.id,
    }) : null;
}

// Función para actualizar un proyecto
async function updateProyecto(proyecto) {
    const docRef = doc(db, "proyectos", proyecto.id);
    await setDoc(docRef, proyecto);
}


// Escuchar si hay en un cambio en la coleccion de proyectos y actualizar automaticamente la lista de proyectos
onSnapshot(coleccionProyectos, (querySnapshot) => {
    const proyectos = [];
    querySnapshot.forEach((doc) => {
        proyectos.push({
            ...doc.data(),
            id: doc.id,
        });
    });
    GLOBAL.state.proyectos = proyectos;
});




// Exponer las funciones globalmente
GLOBAL.firestore = {
    getProyectos,
    addProyecto,
    borrarProyecto,
    getProyecto,
    updateProyecto,
}