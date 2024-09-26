import axios from 'axios'
/*
Cuando entras a la aplicacion lo primero que carga es el archivo App.jsx que manda a llamar a import { getAnotaciones } from './servicios/APIRest'
cuando enstra al archivo APIRest.jsx lee desde arriba y encuenttra la condicion del si hya algo en el loclaStorage si no hay entonces genera el token
*/
let bearer = ""
if(localStorage.getItem('tokenAnotaciones') != null ){
    bearer = localStorage.getItem('tokenAnotaciones')
}else{
    let datos = authLogin({correo: import.meta.env.VITE_API_CORREO, password:import.meta.env.VITE_API_PASSWORD})
    bearer = localStorage.getItem('tokenAnotaciones')
}

//estos cabeceros es para cuando ya tienes un login (token)
let cabeceros = {
    'content-type':'application/json',
    'Authorization':'Bearer ' + bearer
}
export async function authLogin(request){
    
    const datos = axios.post(`${import.meta.env.VITE_API_URL}login`, request, {
        headers:{'content-type':'application/json'}
    } ).then((response)=>{
        localStorage.setItem('tokenAnotaciones',response.data.token)
        return '';
    }).catch((error)=>{
            return {"estado":"error"}
        });
    return datos;
}

export async function getAnotaciones(){
    const datos = axios.get(`${import.meta.env.VITE_API_URL}anotaciones`, {
        headers:cabeceros
    } ).then((response)=>{
        return response.data;
    }).catch((error)=>{
            console.log(error)
        });
    return datos;
}
export async function addAnotaciones(request){
    const datos = axios.post(`${import.meta.env.VITE_API_URL}anotaciones`,request, {
        headers:cabeceros
    } ).then((response)=>{
        return response.data;
    }).catch((error)=>{
            console.log(error)
        });
    return datos;
}
export async function deleteAnotaciones(id){
    console.log(id)
    
    const datos = axios.delete(`${import.meta.env.VITE_API_URL}anotaciones/${id}`, {
        headers:cabeceros
    } ).then((response)=>{
        return response.status;
    }).catch((error)=>{
            console.log(error)
        });
    return datos;
}