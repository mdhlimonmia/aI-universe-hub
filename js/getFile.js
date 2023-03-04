const loadSite = async(minimum) =>{
    loade(true)
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    const res = await fetch(url);
    const data = await res.json();
    displaySite(data.data.tools, minimum);
}

const displaySite = (site, minimum) =>{
    const siteContainer = document.getElementById('site-container');
    siteContainer.textContent = '';
    const seeMore = document.getElementById('see-more');
    if(minimum && site.length > 6) {
        site = site.slice(0, 6);
        seeMore.classList.remove('d-none');
    }
    else{
        seeMore.classList.add('d-none');
    }
    
    
    site.forEach(site =>{
        const siteBox  = document.createElement('div');
        siteBox.classList.add('col');
        siteBox.innerHTML = `
        <div class="card p-4" style="height: 500px">
            <img src="${site.image}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">Features</h5>
            <ol id = "${site.id}">
            ${site.features[0]?  ` <li> ${site.features[0]} </li>`: 'No Features Found'}
            ${site.features[1]?  ` <li> ${site.features[1]} </li>`: ''}
            ${site.features[2]?  ` <li> ${site.features[2]} </li>`: ''}
            ${site.features[3]?  ` <li> ${site.features[3]} </li>`: ''}
            </ol> 
            </div>
            <hr>
           <div class="d-flex justify-content-between align-items-center" >
             <div>
                <h4 class="fs-5 ">${site.name}</h4> 
                <p> <i class="fa-regular fa-calendar-days"></i> ${site.published_in}</p>
            </div>
            <div>
            <a onclick="loadPhoneDetails('${site.id}')" style="background-color: #FEF7F7; border-radius: 50%;" href="#" class="text-danger " data-bs-toggle="modal" data-bs-target="#phoneDetailModal"><i class="fa-solid fa-arrow-right"></i></a>
            </div>
            </div>
        </div>
        `;
        siteContainer.appendChild(siteBox);
    });
    // stop spinner or loader
    loade(false);
}

const loade = isLoading => {
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('d-none')
    }
    else{
        loaderSection.classList.add('d-none');
    }
}


// not the best way to load show All
document.getElementById('btn-see-more').addEventListener('click', function(){
    loadSite()
})

const loadPhoneDetails = async id =>{
    const url =`https://openapi.programming-hero.com/api/ai/tool/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
}

const displayPhoneDetails = more =>{
    console.log(more)
    
    const modal = document.getElementById('modal-inner');
    modal.innerHTML = '';
    const modalInner = document.createElement('div');
 
    modalInner.innerHTML = `
    <div class="d-md-flex justify-content-between gap-2 p-3">
    
        <div class="border p-5 col-md-6" style="
        background-color: #EB57570D;">
            <p class=""> ${more.description} </p>
            <div class="d-flex gap-2">
                <div class="col-4 bg-white text-success text-center rounded-3">
                    ${more.pricing[0].plan ? `<p> ${more.pricing[0].plan} </p>` : 'Not Found'}
                    ${more.pricing[0].price ? `<p> ${more.pricing[0].price} </p>` : 'Not Found'}
                </div>
                <div class="col-4 bg-white text-warning text-center  rounded-3">
                    ${more.pricing[1].plan ? `<p> ${more.pricing[1].plan} </p>` : 'Not Found'}
                    ${more.pricing[1].price ? `<p> ${more.pricing[1].price} </p>` : 'Not Found'}
                </div>
                <div class="col-4 bg-white text-danger text-center rounded-3">
                    ${more.pricing[2].plan ? `<p> ${more.pricing[2].plan} </p>` : 'Not Found'}
                    ${more.pricing[2].price ? `<p> ${more.pricing[2].price} </p>` : 'Not Found'}
                </div>
            </div>
            <div class="d-flex justify-content-between ">
                <div>
                    <h3 class="fs-5">Features</h3>
                    <ul>
                        ${more.features['1'].feature_name ? `<li> ${more.features['1'].feature_name} </li>` : 'Not Found'}
                        ${more.features['2'].feature_name ? `<li> ${more.features['2'].feature_name} </li>` : ''}
                        ${more.features['3'].feature_name ? `<li> ${more.features['3'].feature_name} </li>` : ''}
                    </ul>
                </div>
                <div>
                    <h3 class="fs-5">Integrations</h3>
                    <ul>
                        ${more.integrations[0] ? `<li> ${more.integrations[0]} </li>` : 'Not Found'}
                        ${more.integrations[1] ? `<li> ${more.integrations[1]} </li>` : ''}
                        ${more.integrations[2] ? `<li> ${more.integrations[2]} </li>` : ''}
                        ${more.integrations[3] ? `<li> ${more.integrations[3]} </li>` : ''}
                    </ul>
                </div>
            </div>
        </div>
        <div class="modal-img col-md-6 text-center border ">
            <div class="position-relative"> 
            ${more.accuracy.score ? `<p class="btn btn-danger position-absolute"  style="top: 25px; right: 25px;  border-radius: 10px;"> ${more.accuracy.score * 100 }% accuracy  </p>`: ""}
                 <img class="w-100 p-4 rounded-3" src="${more.image_link[0]}" alt="">
                 
            </div>
            <h4> ${more.input_output_examples[0].input ? `<p> ${more.input_output_examples[0].input } </p>` : 'Not Found'}</h4>
            <P> ${more.input_output_examples[0].output ? `<p> ${more.input_output_examples[0].output } </p>` : 'Not Found'}</h4>
        </div>
    </div>` ;
        modal.appendChild(modalInner);
}
loadSite(6);
