import React, { Fragment } from 'react'

//{datos} son los valores que vienen desde App.jsx que se le pasan al componente <Listado datos={datos}/> via props
const Listado = ({ datos,handleEliminar }) => {

    return (
        <>
            <div className="list list-row block">
                {datos.map((dato) => (
                    
                        <div className="list-item" data-id="19" key={dato.id}>
                            <div>
                                <a onClick={() => handleEliminar(dato.id)} data-abc="true">
                                    <span className="w-48 avatar gd-warning">
                                        <img src="/image/pngegg.png" alt="logo eliminar" />
                                    </span>
                                </a>
                            </div>
                            <div className="flex">
                                <span className="item-author text-color" data-abc="true">
                                    {dato.titulo}
                                </span>
                                {/*En la etiqueta dangerouslySetInnerHTML={{__html:dato.descripcion}} se pasa asi ya que nuestro texto tiene etiquetas html y de esta forma se parse, no se recomienda pero esto es ejemplos */}
                                <div className="item-except text-muted text-sm h-1x" dangerouslySetInnerHTML={{__html:dato.descripcion}}>    
                                </div>
                            </div>
                            <div className="no-wrap">
                                <div className="item-date text-muted text-sm d-none d-md-block">
                                    {dato.fecha}
                                    </div>
                            </div>
                        </div>
                    
                ))}
            </div>
        </>
    )
}

export default Listado
