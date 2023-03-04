const loadPhones = async(dataLimit) =>{
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data.tools, dataLimit);
    // console.log(data.data.tools);
}

const displayPhones = (phones, dataLimit) =>{
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.textContent = '';
    // display 10 phones only 
    const showAll = document.getElementById('show-all');
    if(dataLimit && phones.length > 6) {
        phones = phones.slice(0, 6);
        showAll.classList.remove('d-none');
    }
    else{
        showAll.classList.add('d-none');
    }
    

    // // display no phones found
    // const noPhone = document.getElementById('no-found-message');
    // if(phones.length === 0){
    //     noPhone.classList.remove('d-none');
    // }
    // else{
    //     noPhone.classList.add('d-none');
    // }
    // display all phones
    
    phones.forEach(site =>{
        const phoneDiv  = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card p-4" style="height: 500px">
            <img src="${site.image}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">Features</h5>
            <ol id = "${site.id}">
            ${site.features[0]?  ` <li> ${site.features[0]} </li>`: ''}
            ${site.features[1]?  ` <li> ${site.features[1]} </li>`: ''}
            ${site.features[2]?  ` <li> ${site.features[2]} </li>`: ''}
            ${site.features[3]?  ` <li> ${site.features[3]} </li>`: ''}
            </ol> 
            </div>
            <hr>
           <div class="d-flex justify-content-between align-items-center" >
             <div>
                <h4 class="fs-5 ">${site.name}</h4> 
                <p>${site.published_in}</p>
            </div>
            <div>
            <button onclick="loadPhoneDetails('${site.id}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>
            </div>
            </div>
        </div>
        `;
        phonesContainer.appendChild(phoneDiv);
    });
    // stop spinner or loader
    // toggleSpinner(false);
}

// const toggleSpinner = isLoading => {
//     const loaderSection = document.getElementById('loader');
//     if(isLoading){
//         loaderSection.classList.remove('d-none')
//     }
//     else{
//         loaderSection.classList.add('d-none');
//     }
// }


// not the best way to load show All
document.getElementById('btn-show-all').addEventListener('click', function(){
    loadPhones()
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
    // console.log(modalInner);
    modalInner.innerHTML = `
    <div class="d-flex justify-content-between gap-2 p-3">
    
        <div class="border p-5 col-md-6" style="
        background-color: #EB57570D;">
            <p class=""> ${more.description} </p>
            <div class="d-flex gap-2">
                <div class="col-4 bg-white text-success text-center rounded-3">
                    ${more.pricing[0].plan ? `<p> ${more.pricing[0].plan} </p>` : ''}
                    ${more.pricing[0].price ? `<p> ${more.pricing[0].price} </p>` : ''}
                </div>
                <div class="col-4 bg-white text-warning text-center  rounded-3">
                    ${more.pricing[1].plan ? `<p> ${more.pricing[1].plan} </p>` : ''}
                    ${more.pricing[1].price ? `<p> ${more.pricing[1].price} </p>` : ''}
                </div>
                <div class="col-4 bg-white text-danger text-center rounded-3">
                    ${more.pricing[2].plan ? `<p> ${more.pricing[2].plan} </p>` : ''}
                    ${more.pricing[2].price ? `<p> ${more.pricing[2].price} </p>` : ''}
                </div>
            </div>
            <div class="d-flex justify-content-between ">
                <div>
                    <h3 class="fs-5">Features</h3>
                    <ul>
                        ${more.features['1'].feature_name ? `<li> ${more.features['1'].feature_name} </li>` : ''}
                        ${more.features['2'].feature_name ? `<li> ${more.features['2'].feature_name} </li>` : ''}
                        ${more.features['3'].feature_name ? `<li> ${more.features['3'].feature_name} </li>` : ''}
                    </ul>
                </div>
                <div>
                    <h3 class="fs-5">Integrations</h3>
                    <ul>
                        ${more.integrations[0] ? `<li> ${more.integrations[0]} </li>` : ''}
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
            <h4> ${more.input_output_examples[0].input ? `<p> ${more.input_output_examples[0].input } </p>` : ''}</h4>
            <P> ${more.input_output_examples[0].output ? `<p> ${more.input_output_examples[0].output } </p>` : ''}</h4>
        </div>
    </div>` ;
        modal.appendChild(modalInner);
}

// const displayPhoneDetails = phone =>{
//     console.log(phone);
//     const modalTitle = document.getElementById('phoneDetailModalLabel');
//     modalTitle.innerText = phone.name;
//     const phoneDetails = document.getElementById('phone-details');
//     console.log(phone.mainFeatures.sensors[0]);
//     phoneDetails.innerHTML = `
//         <p>Release Date: ${phone.releaseDate ? phone.releaseDate : 'No Release Date Found'}</p>
//         <p>Storage: ${phone.mainFeatures ? phone.mainFeatures.storage : 'No Storage Information '}</p>
//         <p>Others: ${phone.others ? phone.others.Bluetooth : 'No Bluetooth Information'}</p>
//         <p>Sensor: ${phone.mainFeatures.sensors ? phone.mainFeatures.sensors[0] : 'no sensor'}</p>
//     `
// }

loadPhones(6);

{/* <div class="d-flex ">
                <div class="container">
                    ${more.pricing[0].plan ? `<p> ${more.pricing[0].plan} </p>` : ''}
                    ${more.pricing[0].price ? `<p> ${more.pricing[0].price} </p>` : ''}
                <div class="pro">
                    ${more.pricing[1].plan ? `<p> ${more.pricing[1].plan} </p>` : ''}
                    ${more.pricing[1].price ? `<p> ${more.pricing[1].price} </p>` : ''}
                </div>
                <div class="enterprise">
                    ${more.pricing[2].plan ? `<p> ${more.pricing[2].plan} </p>` : ''}
                    ${more.pricing[2].price ? `<p> ${more.pricing[2].price} </p>` : ''}
                </div>
            </div> */}