class Animales{
    constructor(nombre, edad, img, comentarios, sonido){
        this._name = nombre;
        this._edad = edad;
        this._img = img;
        this._comentarios = comentarios;
        this._sonido = sonido;
        
    }

    get Nombre(){
        return this._name;
    }

    get Edad(){
        return this._edad;
    }

    get Img(){
        return this._img;
    }

    get Comentarios(){
        return this._comentarios;
    }
    
    set Comentarios(comentario){
        this._comentarios = comentario;
    }

    get Sonido(){
        return this._sonido;
    }
}

export class Leon extends Animales{
    constructor(nombre, edad, img, comentarios, sonido){
        super(nombre, edad, img, comentarios, sonido);
    }

    Rugir(){
        this._sonido.play();
        return this._sonido;
    }
}

export class Lobo extends Animales{
    constructor(nombre, edad, img, comentarios, sonido){
        super(nombre, edad, img, comentarios, sonido);
    }

    Aullar(){
        this._sonido.play();
        return this._sonido;
    }
}

export class Oso extends Animales{
    constructor(nombre, edad, img, comentarios, sonido){
        super(nombre, edad, img, comentarios, sonido);
    }

    Gruñir(){
        this._sonido.play();
        return this._sonido;
    }
}

export class Serpiente extends Animales{
    constructor(nombre, edad, img, comentarios, sonido){
        super(nombre, edad, img, comentarios, sonido);
    }

    Sisear(){
        this._sonido.play();
        return this._sonido;
    }
}

export class Aguila extends Animales{
    constructor(nombre, edad, img, comentarios, sonido){
        super(nombre, edad, img, comentarios, sonido);
    }

    Chillar(){
        return this._sonido;
    }
}

export default {Leon, Lobo, Oso, Serpiente, Aguila};