import validarCantidad from "./validaciones/validarCantidad"
import validaNombre from "./validaciones/validaNombre";
import siguientePaso from "./siguientePaso";
import marcarPaso from "./marcarpaso";
import validarCorreo from "./validaciones/validarCorreo";

const formulario = document.getElementById("formulario")

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
    e.preventDefault()

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
        document.querySelector("[data-valor=nombre-receptor] span").innerText = formulario["nombre-receptor"].value
        siguientePaso();
        document.querySelector("[data-valor=correo-receptor] span").innerText = formulario["correo-receptor"].value
        siguientePaso();
        document.querySelector("[data-valor=metodo] span").innerHTML = formulario.metodo.value
        // cambiamos el texto del btn a transferir
         btnFormulario.querySelector("span").innerHTML = "Transferir"
        //  agregamos la clase que deshabilita el boton  

        btnFormulario.classList.add("formulario__btn--disabled")

        // Ocultamos el icono de siguiente 
        // formulario__btn-contenedor-icono--active

        btnFormulario.querySelector("[data-icono=siguiente]").classList.remove("formulario__btn-contenedor-icono--active")
        btnFormulario.querySelector("[data-icono=banco]").classList.add("formulario__btn-contenedor-icono--active")

        siguientePaso();

        // Eliminamos la clase de disabled despues de 4 segundos 
        setTimeout(() =>{
            btnFormulario.classList.remove("formulario__btn--disabled")

        },4000)


    }else if (pasoActual === "confirmacion"  && !btnFormulario.matches(".formulario__btn--disabled")){
        // aqui se haria la peticion al servidor, una redireccion . etc


        // Cambiamos el texto del btn a "Transferir "
        btnFormulario.querySelector("span").innerText = "Transfiriendo"
        // Agregamos la clase que deshabilita el boton
        btnFormulario.classList.add("formulario__btn--disabled");
        setTimeout(() => {
            formulario.classList.add("formulario--hidden");
            document.getElementById("alerta").classList.add("alerta--active")
        },4000)
    }
});


