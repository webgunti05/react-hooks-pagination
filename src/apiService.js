
let baseUrl = "https://api.instantwebtools.net/v1/passenger";


export const getAllAirLines = async(page, size) =>{
    try{
        const response = await fetch(`${baseUrl}?page=${page}&size=${size}`)
        const data = await response.json();
       return data;
    } catch(error){
        console.log(error)
    }
}