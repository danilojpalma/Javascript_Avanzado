import { Leon, Lobo, Oso, Serpiente, Aguila } from './animales.js';
import recibirDatos from './recibirDatos.js';

const nombreAnimal = document.getElementById('animal');
const imgAnimal = document.getElementById('preview');
const textarea = document.getElementById('comentarios');
const edadSelect = document.getElementById('edad');
const sonido =  document.querySelector("#player");

// Objeto que mapee los nombres de las clases a sus constructores
const animalConstructors = {
    Leon,
    Lobo,
    Oso,
    Serpiente,
    Aguila
};

// Funcion autoejecutable para cargar las imagenes y sonidos cuando se seleccione un animal
(async () => {
    const listaImagenes = await recibirDatos();
    const listaSonidos = await recibirDatos();

    nombreAnimal.addEventListener('change', () => {
        const indiceSeleccionado = nombreAnimal.selectedIndex;
        imgAnimal.style.backgroundImage = `url(${listaImagenes.imagenes[indiceSeleccionado]})`;
        
        
        sonido.setAttribute("src", `${listaSonidos.sonidos[indiceSeleccionado]}`)

      });
})();

  
// Evento para registrar un nuevo animal
document.getElementById('btnRegistrar').addEventListener('click', async () => {

    let disabledOptionNombre = nombreAnimal.querySelector('option[disabled]').value;
    let disabledOptionEdad = edadSelect.querySelector('option[disabled]').value;
    
    if (nombreAnimal.value === disabledOptionNombre || textarea.value === '' || edadSelect.value === disabledOptionEdad) {
        alert('Por favor, complete los campos requeridos');
        return;
    }

    const resultados = await recibirDatos();
    const nombre = nombreAnimal.value;
    const edad = edadSelect.value;
    const comentarios = textarea.value;
    const img = imgAnimal.style.backgroundImage;
    
    

    resultados.animales.forEach(animal => {
        if (animal.name === nombre) {
            //console.log("Animal encontrado:", animal.name);
            // Usa el objeto animalConstructors para crear una nueva instancia de la clase correspondiente
            const AnimalConstructor = animalConstructors[animal.name];

            

            if (AnimalConstructor) {
                // Crea una nueva instancia del sonido para cada animal para no sobreescribir el sonido de los animales anteriores
                const sonidoAnimal = new Audio(sonido.src);
                //console.log(sonidoAnimal);
                const animalInstance = new AnimalConstructor(nombre, edad, img, comentarios, sonidoAnimal);
                //console.log(animalInstance);
                //Llama a la funcion construirTarjeta y le pasa la instancia del nuevo animal
                construirTarjeta(animalInstance);
                //Genera el modal con los datos del animal
                generarModal(animalInstance);
                limpiarFormulario();
                
                
            } else {
                console.log('Constructor no encontrado para el animal:', animal.name);
            }
        }  
    });
});
    
// Funcion para construir la tarjeta de cada animal
const construirTarjeta = (animalInstance) => {

    //Crear elementos HTML para la tarjeta
    const contenedor = document.getElementById('Animales');
    const wrapper = document.createElement('div');
    const divImg = document.createElement('div');
    const btnPlay = document.createElement('button');
    const icono = document.createElement('i');
    const linkModal = document.createElement('a');


    icono.classList.add('fa-solid', 'fa-volume-high');
    divImg.style.backgroundImage = animalInstance.Img;
    divImg.classList.add('imagen');
    wrapper.classList.add('wrapper' );
    btnPlay.classList.add('btnPlay');
    btnPlay.appendChild(icono);
    linkModal.setAttribute('data-bs-toggle', 'modal');
    linkModal.setAttribute('data-bs-target', '#exampleModal');
    linkModal.setAttribute('type', 'button');
    linkModal.appendChild(divImg);
    wrapper.appendChild(linkModal);
    wrapper.appendChild(btnPlay);
    contenedor.appendChild(wrapper);
    

    
    // Evento para reproducir el sonido del animal dependiendo de su clase
    btnPlay.addEventListener('click', () => {
        
        if (animalInstance instanceof Leon) {
            animalInstance.Rugir();
        } else if (animalInstance instanceof Lobo) {
            animalInstance.Aullar();
        } else if (animalInstance instanceof Oso) {
            animalInstance.Gruñir();
        } else if (animalInstance instanceof Serpiente) {
            animalInstance.Sisear();
        } else if (animalInstance instanceof Aguila) {
            animalInstance.Chillar();
        }
    })
   
    
};


// Funcion para limpiar el formulario
const limpiarFormulario = () => {
    nombreAnimal.value = nombreAnimal.options[0].value;
    imgAnimal.style.backgroundImage = '';
    textarea.value = '';
    edadSelect.value = edadSelect.options[0].value;
}

// Funcion para generar el modal con los datos del animal
const generarModal = (animalInstance) => {
    const titleModal = document.querySelector('.modal-title');
    const imgModal = document.querySelector('.imgModal');
    const edadModal = document.querySelector('.edadModal');
    const comentariosModal = document.querySelector('.comentariosModal');

    titleModal.textContent = animalInstance.Nombre;
    imgModal.style.backgroundImage = animalInstance.Img;
    edadModal.textContent = animalInstance.Edad;
    comentariosModal.textContent = animalInstance.Comentarios;

}