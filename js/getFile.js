const loadPhones = async(dataLimit) =>{
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data.tools, dataLimit);
    // console.log(data.data.tools);
}

const displayPhones = (phones, dataLimit) =>{
    const phonesContainer = document.getElementById('phones-container');
    // phonesContainer.textContent = '';
    // // display 10 phones only 
    // const showAll = document.getElementById('show-all');
    // if(dataLimit && phones.length > 10) {
    //     phones = phones.slice(0, 10);
    //     showAll.classList.remove('d-none');
    // }
    // else{
    //     showAll.classList.add('d-none');
    // }
    

    // // display no phones found
    // const noPhone = document.getElementById('no-found-message');
    // if(phones.length === 0){
    //     noPhone.classList.remove('d-none');
    // }
    // else{
    //     noPhone.classList.add('d-none');
    // }
    // display all phones
    
    phones.forEach(phone =>{
        const phoneDiv  = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card p-4">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.name}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <button onclick="loadPhoneDetails('${phone.id}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>
                
            </div>
        </div>
        `;
        phonesContainer.appendChild(phoneDiv);
    });
    // stop spinner or loader
    // toggleSpinner(false);
}

// const processSearch = (dataLimit) =>{
//     toggleSpinner(true);
//     const searchField = document.getElementById('search-field');
//     const searchText = searchField.value;
//     loadPhones(searchText, dataLimit);
// }

// // handle search button click
// document.getElementById('btn-search').addEventListener('click', function(){
//     // start loader
//     processSearch(10);
// })

// // search input field enter key handler
// document.getElementById('search-field').addEventListener('keypress', function (e) {
//     if (e.key === 'Enter') {
//         processSearch(10);
//     }
// });

// const toggleSpinner = isLoading => {
//     const loaderSection = document.getElementById('loader');
//     if(isLoading){
//         loaderSection.classList.remove('d-none')
//     }
//     else{
//         loaderSection.classList.add('d-none');
//     }
// }


// // not the best way to load show All
// document.getElementById('btn-show-all').addEventListener('click', function(){
//     processSearch();
// })

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
            <p class="modal-discript "> ${more.description} </p>
            <div class="d-flex">
                <div class="col-4 bg-white text-success">
                    ${more.pricing[0].plan ? `<p> ${more.pricing[0].plan} </p>` : ''}
                    ${more.pricing[0].price ? `<p> ${more.pricing[0].price} </p>` : ''}
                </div>
                <div class="col-4">
                    ${more.pricing[1].plan ? `<p> ${more.pricing[1].plan} </p>` : ''}
                    ${more.pricing[1].price ? `<p> ${more.pricing[1].price} </p>` : ''}
                </div>
                <div class="col-4">
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
        <div class="modal-img col-md-6 text-center border">
            <img class="w-50 " src="${more.image_link[0]}" alt="">
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

loadPhones();

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