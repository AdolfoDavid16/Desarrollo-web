import React, {useState, useEffect} from "react";

const Producto = ({item}) => {
    const [new_item,setNewItem]=useState(item)
    
    useEffect(() => {
        
        console.log ("item", item)
        setNewItem(item)
        
    }, [item])

    return (
        <div className="w-100"> 
        
            <div className="itemProduct">
                        <div><strong>Nombre:</strong> {new_item.nombre}</div>
                        <div><strong>Precio:</strong> {new_item.precio}</div>
                        <div><strong>Id:</strong> {new_item.id}</div>
                    </div>
        </div>
    )
}

export default Producto