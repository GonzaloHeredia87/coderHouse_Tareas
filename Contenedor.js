const fs = require('fs');
class Contenedor {
    static item = 1;
    static objeto = [];
    constructor(nombreArchivo){
        this.nombreArchivo = nombreArchivo;
    }

    save(objetoNuevo){
        
        let productos = [];
        try {
            const data = fs.readFileSync(this.nombreArchivo, 'utf-8');
            //console.log(data);
            if(data){
                //console.log("Ya existe, se debe agregar");
                productos = JSON.parse(data);
                
                //Contenedor.item = productos.length;
                let indica_actual = productos[productos.length-1];
                Contenedor.item = indica_actual.id;
                let objetoAi = {
                    id: Contenedor.item +1,
                    title: objetoNuevo.title,
                    price: objetoNuevo.price,
                    thumbnail: objetoNuevo.thumbnail
                }
                // REVISANDO SI NO EXISTE
                
                productos.push(objetoAi);
                //console.log(indica_actual.id);
                //console.log(productos[Contenedor.item]);
                fs.writeFileSync(this.nombreArchivo, JSON.stringify(productos, null, 2));
                // console.log("Item :" +Contenedor.item);
                console.log(`nuevo objeto creado: ${objetoAi.title}, tiene tiene por id: ${objetoAi.id}`);
                return objetoAi.id;
            }
            else{

                let objetoAi = {
                    id: Contenedor.item,
                    title: objetoNuevo.title,
                    price: objetoNuevo.price,
                    thumbnail: objetoNuevo.thumbnail
                }
                productos.push(objetoAi);
                fs.writeFileSync(this.nombreArchivo,JSON.stringify(productos, null, 2));
                console.log(`nuevo objeto creado: ${objetoAi.title}, tiene tiene por id: ${objetoAi.id}`);
                return objetoAi.id;
            }
        }
        catch(error){
            //console.log("Error al leer el archivo");
            let objetoAi = {
                id: Contenedor.item,
                title: objetoNuevo.title,
                price: objetoNuevo.price,
                thumbnail: objetoNuevo.thumbnail
            }
            // console.log(Contenedor.item);
            //console.log("Se debe crear desde cero incluyendo archivo");
            // console.log(objetoAi);
            productos.push(objetoAi);
            fs.writeFileSync(this.nombreArchivo,JSON.stringify(productos, null, 2));
            console.log(`nuevo objeto creado: ${objetoAi.title}, tiene por id: ${objetoAi.id}`);
            return objetoAi.id;

        }

    }

    getById(numero){
        let obj_search = null;
        fs.promises.readFile(this.nombreArchivo, 'utf-8')
            .then(contenido=> {
                const productos = JSON.parse(contenido);
                if (productos.length>0){
                    for(let i=0; i<productos.length;i++){
                        if (productos[i].id==numero){
                            obj_search = productos[i];
                            console.log(`Busqueda por id: ${numero},  el objeto es: `);
                        }else{
                            console.log(`El id: ${numero}, no fue encontrado`);
                        }
                    }
                }
                
                console.log(obj_search);
                return obj_search;
            })
            .catch(error=>{
                console.log("Error: "+error);
                return obj_search;
            })
    }

    getAll(){
        try{
            const contenido = fs.readFileSync(this.nombreArchivo,'utf-8');
            console.log("Resultado de getAll()");
            //return console.log(Contenedor.objeto);
            return JSON.parse(contenido);
        }
        catch(error){
            return console.log("Error al capturar los datos");
        }
        
    }

    async deleteById(numero){
        try {
            const contenido = await fs.promises.readFile(this.nombreArchivo, 'utf-8');
            const productos = JSON.parse(contenido);
            if (productos.length>0){
                for(let i=0; i<productos.length;i++){
                    if (productos[i].id==numero){
                        productos.splice(i, 1);
                        fs.writeFileSync(this.nombreArchivo, JSON.stringify(productos, null, 2));
                        console.log(`El id: ${numero}, fue eliminado correctamente`);
                    }
                    // else{
                    //     console.log(`El id: ${numero}, no fue encontrado para eliminar`);
                    // }
                }
                
            }
            else{
                console.log(`No existen elementos en el archivo, para eliminar`);
            }
            //console.log(`Eliminando un objeto del archivo, el objeto con id: ${numero}, fue eliminado correctamente`);
        }
        catch(error) {
            return console.log("Falla en metodo deleteById");
        }
    }

    async deleteAll(){
        try{
            const contenido = await fs.promises.readFile(this.nombreArchivo,'utf-8');
            const productos = [];//JSON.parse(contenido);
            fs.writeFileSync(this.nombreArchivo, JSON.stringify(productos, null, 2));
            console.log("Productos eliminados");
            // fs.unlinkSync(this.nombreArchivo);
            // console.log("Productos eliminados");
            // const eliminando = fs.unlinkSync(this.nombreArchivo);
            // console.log(eliminando);
        }
        catch(error){
            console.log("Falla al momento de eliminar datos del archivo: "+ error);
        }

    }
}



module.exports = Contenedor;