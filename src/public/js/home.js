const API_URL = "https://pokeapi.co/api/v2/pokemon/4/";

fetch(API_URL)
    .then(resp => resp.json())
    .then(data =>{
        console.log(data,"data")
    })
    .catch(error => console.log(error.message));