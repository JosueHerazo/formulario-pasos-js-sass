const formulario  = document.getElementById("formulario")

const validaNombre = () =>{
    const expRegNombre  = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;
    // aceptamos caulquier digito (0-9) y un punto con decimales (opcional)
    const inputNombre = formulario["nombre-receptor"];
    // obtenemos el valor del input 
    if(expRegNombre.test(inputNombre.value)){
        inputNombre.classList.remove("formulario__input--error")
        return true;
    }else{
        inputNombre.classList.add("formulario__input--error")
        return false;
    }
}


export default validaNombre;