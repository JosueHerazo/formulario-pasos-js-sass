const siguientePaso = () => {
    // crear un arreglo con los pasos.
    const pasos = [...document.querySelectorAll(".linea-pasos__paso")];
// obtener el paso activo
const pasoActivo = document.querySelector(".linea-pasos__paso-check--active").closest(".linea-pasos__paso")
// obtenemos el index del paso activo
const indexPasoActivo = pasos.indexOf(pasoActivo)
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

export default siguientePaso; 