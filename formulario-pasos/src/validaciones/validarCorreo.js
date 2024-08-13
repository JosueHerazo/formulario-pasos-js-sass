const formulario  = document.getElementById("formulario")

const validarCorreo = () =>{
    const expRegCorreo  = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    // aceptamos caulquier digito (0-9) y un punto con decimales (opcional)
    const inputCorreo = formulario["correo-receptor"];
    // obtenemos el valor del input 
    if(expRegCorreo.test(inputCorreo.value)){
        inputCorreo.classList.remove("formulario__input--error")
        return true;
    }else{
        inputCorreo.classList.add("formulario__input--error")
        return false;
    }
}


export default validarCorreo;