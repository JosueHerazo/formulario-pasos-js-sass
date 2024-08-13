'use strict';

const formulario$3  = document.getElementById("formulario");

const validarCantidad = () =>{
    const expRegCantidad  = /^\d+(\.\d+)?$/;
    // aceptamos caulquier digito (0-9) y un punto con decimales (opcional)
    const inputCantidad = formulario$3.cantidad;
    // obtenemos el valor del input 
    if(expRegCantidad.test(inputCantidad.value)){
        inputCantidad.classList.remove("formulario__input--error");
        return true;
    }else {
        inputCantidad.classList.add("formulario__input--error");
        return false;
    }
};

const formulario$2  = document.getElementById("formulario");

const validaNombre = () =>{
    const expRegNombre  = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;
    // aceptamos caulquier digito (0-9) y un punto con decimales (opcional)
    const inputNombre = formulario$2["nombre-receptor"];
    // obtenemos el valor del input 
    if(expRegNombre.test(inputNombre.value)){
        inputNombre.classList.remove("formulario__input--error");
        return true;
    }else {
        inputNombre.classList.add("formulario__input--error");
        return false;
    }
};

const siguientePaso = () => {
    // crear un arreglo con los pasos.
    const pasos = [...document.querySelectorAll(".linea-pasos__paso")];
// obtener el paso activo
const pasoActivo = document.querySelector(".linea-pasos__paso-check--active").closest(".linea-pasos__paso");
// obtenemos el index del paso activo
const indexPasoActivo = pasos.indexOf(pasoActivo);
    if(indexPasoActivo < pasos.length - 1){
        console.log(indexPasoActivo);
        // eliminamos la clase de paso activo
        pasoActivo.querySelector("span").classList.remove("linea-pasos__paso-check--active");

        pasos[indexPasoActivo + 1].querySelector("span").classList.add("linea-pasos__paso-check--active");

        const id = pasos[indexPasoActivo + 1].dataset.paso;
       document.querySelector(`.formulario__body [data-paso="${id}"]`).scrollIntoView({
        inline: "start",
        behavior: "smooth",
       });
    }
};

const marcarPaso = (paso) => {
    document.querySelector(`.linea-pasos [data-paso="${paso}"] span`).classList.add("linea-pasos__paso-check--checked");
    
};

const formulario$1  = document.getElementById("formulario");

const validarCorreo = () =>{
    const expRegCorreo  = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    // aceptamos caulquier digito (0-9) y un punto con decimales (opcional)
    const inputCorreo = formulario$1["correo-receptor"];
    // obtenemos el valor del input 
    if(expRegCorreo.test(inputCorreo.value)){
        inputCorreo.classList.remove("formulario__input--error");
        return true;
    }else {
        inputCorreo.classList.add("formulario__input--error");
        return false;
    }
};

const formulario = document.getElementById("formulario");

// reiniciando scroll al cargar el formulario

formulario.querySelector(".formulario__body").scrollLeft = 0;



// eventlistener para comprobar los campos de formulario cuando el usario corrige

formulario.addEventListener("keyup",  (e) => {
    if(e.target.tagName === "INPUT" ){
        if(e.target.id === "cantidad"){
            validarCantidad();
            
        }else if(e.target.id === "nombre-receptor"){
            validaNombre();
        }else if(e.target.id === "correo-receptor"){
            validarCorreo();
        }
    }
});

const btnFormulario = document.getElementById("formulario__btn");
btnFormulario.addEventListener("click", (e) => {
    e.preventDefault();

    const pasoActual = document.querySelector(".linea-pasos__paso-check--active").closest(".linea-pasos__paso").dataset.paso;

    if(pasoActual === "cantidad"){
        if(validarCantidad()){
            marcarPaso("cantidad");
            siguientePaso();
        }
    } else if(pasoActual === "datos"){
        if(validaNombre() && validarCorreo()){
            marcarPaso("datos");
            siguientePaso();
        }
    }  else if(pasoActual === "metodo"){
        marcarPaso("metodo");
        // formato de moneda
        const opciones = {style: "currency", currency: "EUR"};
        const formatoMoneda = new Intl.NumberFormat("es-ES", opciones);
        document.querySelector("[data-valor=cantidad] span").innerText = formatoMoneda.format(formulario.cantidad.value);
        document.querySelector("[data-valor=nombre-receptor] span").innerText = formulario["nombre-receptor"].value;
        siguientePaso();
        document.querySelector("[data-valor=correo-receptor] span").innerText = formulario["correo-receptor"].value;
        siguientePaso();
        document.querySelector("[data-valor=metodo] span").innerHTML = formulario.metodo.value;
        // cambiamos el texto del btn a transferir
         btnFormulario.querySelector("span").innerHTML = "Transferir";
        //  agregamos la clase que deshabilita el boton  

        btnFormulario.classList.add("formulario__btn--disabled");

        // Ocultamos el icono de siguiente 
        // formulario__btn-contenedor-icono--active

        btnFormulario.querySelector("[data-icono=siguiente]").classList.remove("formulario__btn-contenedor-icono--active");
        btnFormulario.querySelector("[data-icono=banco]").classList.add("formulario__btn-contenedor-icono--active");

        siguientePaso();

        // Eliminamos la clase de disabled despues de 4 segundos 
        setTimeout(() =>{
            btnFormulario.classList.remove("formulario__btn--disabled");

        },4000);


    }else if (pasoActual === "confirmacion"  && !btnFormulario.matches(".formulario__btn--disabled")){
        // aqui se haria la peticion al servidor, una redireccion . etc


        // Cambiamos el texto del btn a "Transferir "
        btnFormulario.querySelector("span").innerText = "Transfiriendo";
        // Agregamos la clase que deshabilita el boton
        btnFormulario.classList.add("formulario__btn--disabled");
        setTimeout(() => {
            formulario.classList.add("formulario--hidden");
            document.getElementById("alerta").classList.add("alerta--active");
        },4000);
    }
});

const linea = document.getElementById("linea-pasos");
linea.addEventListener("click", (e)=>{
    // validamos que el click sea en un paso
    if(!e.target.closest(".linea-pasos__paso")) return;
    const pasoActual = document.querySelector(".linea-pasos__paso-check--active").closest(".linea-pasos__paso").dataset.paso;
if(pasoActual === "cantidad"){
    if(!validarCantidad()) return;
}else if(pasoActual === "datos"){
    if(!validaNombre() || !validarCorreo()) return;
}else if(!validarCorreo())return;

// obtenemos el paso al que queremos navegar 
const pasoNavegar = e.target.closest(".linea-pasos__paso");

// comprobamos si el paso tiene el icono de palomita.
// solo queremos poder dar click a los que tienen palomita.
if(pasoNavegar.querySelector(".linea-pasos__paso-check--checked")){
    const pasoActual = linea.querySelector(".linea-pasos__paso-check--active");
    pasoActual.classList.remove("linea-pasos__paso-check--active");

    // Obtenemos el identificador del paso a navegar.
    const id = pasoNavegar.dataset.paso;

    // Agregamos la clase de active al nuevo paso.
    linea.querySelector(`[data-paso=${id}] span`).classList.add("linea-pasos__paso-check--active");
    
    const btnFormulario = document.querySelector("#formulario__btn");

    btnFormulario.querySelector("span").innerText = "Siguiente";
    // Nos aseguramos de ocultar el icono de  banco.
    btnFormulario.querySelector("[data-icono=banco]").classList.remove("formulario__btn-contenedor-icono--active");

    // Nos aseguramos de mostrar el icono del siguiente
    btnFormulario.querySelector("[data-icono=siguiente]").classList.add("formulario__btn-contenedor-icono--active");
    // Nos aseguramos de que no tenga la clase de disabled 
    btnFormulario.classList.remove("formulario__btn--disabled");


    // Navegamos al paso.
    document.querySelector(`.formulario__body [data-paso=${id}]`).scrollIntoView({
        inline: "start",
        behavior: "smooth"
    });
    


}

});
//# sourceMappingURL=bundle.js.map
