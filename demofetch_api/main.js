let fetchJSONButton= document.getElementById('fetchJSON');
fetchJSONButton.addEventListener('click',fetchJSONfun);

let fetchTXTButton =document.getElementById('fetchTXT');
fetchTXTButton.addEventListener('click',fetchTXTfun);

let fetchIMGButton =document.getElementById('fetchIMG');
fetchIMGButton.addEventListener('click',fetchIMGfun);

function fetchJSONfun(){
    fetch('data.json')
    .then(result=>{
        return result.json()
    })
    .then(res=>{
        console.log(res);
    })

    .catch(error=>{
        console.error(error);
    })
}

function fetchTXTfun(){
    fetch('data.txt')
    .then(result=>{
        return result.text()
    })
    .then(res=>{
        console.log(res)
    })
    .catch(error =>{
        console.error(error);
    })
}

function fetchIMGfun(){
    fetch('img3.png')
    .then(result=>{
        return result.blob()
    })
    .then (res=>{
        let container = document.getElementById('container');
        let img=document.createElement('img');
        container.appendChild(img);
        const imgURL=URL.createObjectURL(res);
        img.src = imgURL
    })
    .catch(error =>{
        console.error(error)
    })
}