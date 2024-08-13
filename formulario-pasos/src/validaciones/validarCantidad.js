const formulario  = document.getElementById("formulario")

const validarCantidad = () =>{
    const expRegCantidad  = /^\d+(\.\d+)?$/
    // aceptamos caulquier digito (0-9) y un punto con decimales (opcional)
    const inputCantidad = formulario.cantidad;
    // obtenemos el valor del input 
    if(expRegCantidad.test(inputCantidad.value)){
        inputCantidad.classList.remove("formulario__input--error")
        return true;
    }else{
        inputCantidad.classList.add("formulario__input--error")
        return false;
    }
}


export default validarCantidad;