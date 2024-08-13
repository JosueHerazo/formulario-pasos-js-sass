import validaNombre from "./validaciones/validaNombre";
import validarCantidad from "./validaciones/validarCantidad";
import validarCorreo from "./validaciones/validarCorreo";



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
    const pasoActual = linea.querySelector(".linea-pasos__paso-check--active")
    pasoActual.classList.remove("linea-pasos__paso-check--active")

    // Obtenemos el identificador del paso a navegar.
    const id = pasoNavegar.dataset.paso;

    // Agregamos la clase de active al nuevo paso.
    linea.querySelector(`[data-paso=${id}] span`).classList.add("linea-pasos__paso-check--active");
    
    const btnFormulario = document.querySelector("#formulario__btn");

    btnFormulario.querySelector("span").innerText = "Siguiente"
    // Nos aseguramos de ocultar el icono de  banco.
    btnFormulario.querySelector("[data-icono=banco]").classList.remove("formulario__btn-contenedor-icono--active");

    // Nos aseguramos de mostrar el icono del siguiente
    btnFormulario.querySelector("[data-icono=siguiente]").classList.add("formulario__btn-contenedor-icono--active")
    // Nos aseguramos de que no tenga la clase de disabled 
    btnFormulario.classList.remove("formulario__btn--disabled")


    // Navegamos al paso.
    document.querySelector(`.formulario__body [data-paso=${id}]`).scrollIntoView({
        inline: "start",
        behavior: "smooth"
    });
    


}

})