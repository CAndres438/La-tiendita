//Consumir
const getData= async(url) => {

    const resp = await fetch(url);
    const data = await resp.json();
    console.log(data);
    return data;

}

export default getData;