import React, { useState, useEffect } from 'react'
import './gallery.css'
import { products } from '../../data/products'
import Producto from './producto/Producto'


const Gallery = ({ keyword }) => {
    const [productos, setProductos] = useState(products)

    console.log("el primero", productos)

    useEffect(() => {
        if (keyword !== "") {
            console.log('keyword', keyword);
            let producto = products.find(product => product.nombre.match(keyword));

            console.log ("ese es el",  producto)
            producto !== undefined ? setProductos([producto]) : setProductos([]);
                
            console.log("ese es el segundo", producto)
        } else {
            console.log("entró al else")
            setProductos(products);
        }
    }, [keyword])



    return (
        <div className="galleryComponent">
            <h1>{productos[0].nombre}</h1>
            {(productos !== undefined && productos.length > 0) ?
        
                productos.map(item => {
                    return (
                        <Producto item={item} />
                    );

                }) :
                productos !== undefined ?
                    <div>
                        Ningun producto coincide con la busqueda
                    </div>
                    :
                    <div>
                        Error en la conexión, intenta mas tarde
                    </div>
            }
        </div>
    )
}

export default Gallery


//productos.length > 0 &&