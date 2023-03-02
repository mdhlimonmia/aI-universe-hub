const loadData = async() =>{
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    const res = await fetch(url);
    const hubs = await res.json();
    displayData(hubs.data.tools);
}
const displayData = (hubs) =>{

    const dataContainer = document.getElementById('hubs-container');
    console.log(hubs);
    hubs.forEach(hub =>{
        const hubDiv = document.createElement('div');
        hubDiv.classList.add('col');
        hubDiv.innerHTML = `
        <div class="card">
        <div class="card">
            <img src="${hub.image}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title"></h5>
            <p class="card-text"></p>
            </div>
        `;
        console.log(hubDiv);
        dataContainer.appendChild(hubDiv);
    });
}

loadData();