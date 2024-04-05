import { Leon, Lobo, Oso, Serpiente, Aguila } from './animales.js';
import recibirDatos from './recibirDatos.js';

const nombreAnimal = document.getElementById('animal');
const imgAnimal = document.getElementById('preview');
const textarea = document.getElementById('comentarios');
const edadSelect = document.getElementById('edad');
const sonido =  document.createElement("audio");

// Crea un objeto que mapee los nombres de las clases a sus constructores
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
  



// Funcion para registrar los animales

document.getElementById('btnRegistrar').addEventListener('click', async () => {

    const resultados = await recibirDatos();
    const nombre = nombreAnimal.value;
    const edad = edadSelect.value;
    const comentarios = textarea.value;
    const img = imgAnimal.style.backgroundImage;
   

    resultados.animales.forEach(animal => {
        if (animal.name === nombre) {
            console.log("Animal encontrado:", animal.name);
            // Usa el objeto animalConstructors para crear una nueva instancia de la clase correspondiente
            const AnimalConstructor = animalConstructors[animal.name];

            if (AnimalConstructor) {
                const animalInstance = new AnimalConstructor(nombre, edad, img, comentarios, sonido);
                console.log(animalInstance);
                construirTarjeta(animalInstance);
            } else {
                console.log('Constructor no encontrado para el animal:', animal.name);
            }
        }

        
    });

    
});
    

const construirTarjeta = (animalInstance) => {
    console.log(animalInstance);

    console.log(animalInstance.Nombre);
    console.log(animalInstance.Edad);
    console.log(animalInstance.Img);
    console.log(animalInstance.Comentarios);
    
    const play = document.querySelector('.playSound') //cambiar boton

    play.addEventListener('click', () => {

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
    // Aquí puedes construir la tarjeta usando animalInstance
    // Por ejemplo, creando un elemento div y agregándolo al DOM
   
};