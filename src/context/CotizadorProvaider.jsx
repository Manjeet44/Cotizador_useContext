import { useState, createContext } from "react";
import { obtenerDiferenciaYear, calcularMarca, calcularPlan, formatearDinero } from "../helpers";

const CotizadorContext = createContext();

const CotizadorProvaider = ({children}) => {

    const [datos, setDatos] = useState({
        marca: '',
        year: '',
        plan: ''
    })

    const [error, setError] = useState('');
    const [resultado, setResultado] = useState(0);
    const [cargando, setCargando] = useState(false);

    const handleChangeDatos = e => {
        setDatos({
            ...datos,
            [e.target.name] : e.target.value
        })
        console.log(e.target.value)

    }

    const cotizarSeguro = () => {
        // Una Base
        let resultado = 2000;
        const restaPorYear = 3;
        
        
        //Obtener diferencia de años
        const diferencia = obtenerDiferenciaYear(datos.year);
        
        //Restar 3% por cada año
        resultado -= ((diferencia * restaPorYear) * resultado) / 100;

        //Americano 15%
        //Europeo 30%
        //Asiatico 5%
        resultado *= calcularMarca(datos.marca);

        //Basico 20%
        //Completo 50%
        resultado *= calcularPlan(datos.plan)
        resultado = formatearDinero(resultado)

        setCargando(true);
        setTimeout(() => {
            setResultado(resultado);
            setCargando(false);
        }, 3000);
    }

    return (
        <CotizadorContext.Provider
            value={{
                datos,
                handleChangeDatos,
                error,
                setError,
                cotizarSeguro,
                resultado,
                cargando
            }}
        >
            {children}
        </CotizadorContext.Provider>
    )
}

export {
    CotizadorProvaider
}
export default CotizadorContext;