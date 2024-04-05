const recibirDatos = async () => {
    try{
        const response = await fetch('animales.json')
        const data = await response.json()

        if(!response.ok){
            throw new Error('Ocurrio un error al solicitar los datos')
        } 
        
        const imagenes = [''].concat(data.animales.map(animal => `../assets/imgs/${animal.imagen}`));
        const sonidos = [''].concat(data.animales.map(animal => `../assets/sounds/${animal.sonido}`));
        
        return {
            imagenes: imagenes,
            sonidos: sonidos,
            animales: data.animales
        };
    }

    catch (error){
        console.log(error)
    };
}

export default recibirDatos;