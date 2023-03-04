const loadData = async() =>{
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    const res = await fetch(url);
    const hubs = await res.json();
    displayData(hubs.data.tools);
}
const displayData = (hubs) =>{

    const dataContainer = document.getElementById('hubs-container');
    
    hubs.forEach(hub =>{
        const hubDiv = document.createElement('div');
        hubDiv.classList.add('col');
        hubDiv.innerHTML = `
        <div class="card p-3" style="height: 450px">
            <img style="height: 200px" src="${hub.image}" class="card-img-top" alt="...">
            <div class="card-body p-0">
            <h5 class="card-title">Features</h5>
            <ol id = "${hub.id}">
            ${hub.features[0]?  ` <li> ${hub.features[0]} </li>`: ''}
            ${hub.features[1]?  ` <li> ${hub.features[1]} </li>`: ''}
            ${hub.features[2]?  ` <li> ${hub.features[2]} </li>`: ''}
            ${hub.features[3]?  ` <li> ${hub.features[3]} </li>`: ''}
            </ol>            
           <hr>
           <div class="d-flex justify-content-between align-items-center" >
             <div>
                <h4 class="fs-5 ">${hub.name}</h4> 
                <p>${hub.published_in}</p>
            </div>
            <div>
                <button>button</button>
            </div>
            </div>
        </div>
        `;
/*
        const iD = parseInt(hub.id);
        console.log(typeof(iD));
        const featuresLine = document.getElementById('01');
         const newLine = document.createElement('li');
         newLine.innerText = `${hub.features[1]}`
        //  featuresLine.appendChild(newLine);
        //  console.log(newLine.innerText);
       
        hub.features.forEach(line => {
            newLine.innerHTML =`
            <li>${line}</li>
            ` 
            });
        //     featuresLine.appendChild(newLine);
        // console.log(featuresLine);  */
        dataContainer.appendChild(hubDiv);
    });
}

loadData();