class Supermarket{
    constructor(name, domestic, price, weight, description){
        this.name = name;
        this.domestic = domestic;
        this.price = price;
        this.weight = weight;
        this.description = description;
    }
}

class ProductsType {
    constructor(domesticProducts, importedProducts){
        this.domesticProducts = domesticProducts;
        this.importedProducts = importedProducts;
    }
}

class UI{
    listAllMarkets(productsType) {

        const listDomestic = document.getElementById('domestic');
        const listImported = document.getElementById('imported');
        
      

        productsType.domesticProducts.sort(function(a,b){
            return a.name > b.name ? 1 : -1;
        });
        
        productsType.importedProducts.sort(function(a,b){
            return a.name > b.name ? 1 : -1;
        });
        
    

        console.log(productsType)

        
        productsType.domesticProducts.forEach(product => {
            console.log(product);
            let weight = this.checkWeight(product.weight);
            let desc = this.truncDescription(product.description);
            const ul = document.createElement('ul');
            ul.innerHTML = `
            <li>... ${product.name}</li>
            <li>&emsp; $${product.price.toFixed(1)}</li>
            <li>&emsp; ${desc}...</li>
            <li>&emsp; ${weight}</li>
            `;

            listDomestic.appendChild(ul);
        });
    
        productsType.importedProducts.forEach(product => {
            console.log(product);
            let weight = this.checkWeight(product.weight);
            let desc = this.truncDescription(product.description);
            const ul = document.createElement('ul');
            ul.innerHTML = `
            <li>... ${product.name}</li>
            <li>&emsp; $${product.price.toFixed(1)}</li>
            <li>&emsp; ${desc}...</li>
            <li>&emsp; ${weight}</li>
            `;

            listImported.appendChild(ul);
        });

     
    
    }

    productPrice(productsType){
        let domesticPrice=0;
        let importedPrice=0;
    
        productsType.domesticProducts.forEach(product => {
            console.log(typeof(product.price));
            domesticPrice+=product.price;            
        });

        productsType.importedProducts.forEach(product => {
            importedPrice+=product.price;
        });
        console.log(domesticPrice);

        const showPrice = document.getElementById('price');
        const pDomestic = document.createElement('p');
        pDomestic.innerHTML = `Domestic cost: $${domesticPrice.toFixed(1)}`;

        
        const pImported = document.createElement('p');
        pImported.innerHTML = `Imported cost: $${importedPrice.toFixed(1)}`;

        showPrice.appendChild(pDomestic);
        showPrice.appendChild(pImported)
        console.log("hello");
    }

    countProductsType(productsType){
        const countDiv = document.getElementById('count');

        console.log(productsType.domesticProducts.length);

        const pDomestic = document.createElement('p');
    
        pDomestic.innerHTML = `Domestic count: ${productsType.domesticProducts.length}`;

        
        const pImported = document.createElement('p');
        pImported.innerHTML = `Imported count: ${productsType.importedProducts.length}`;

        countDiv.appendChild(pDomestic);
        countDiv.appendChild(pImported)

    }


    checkWeight(weight){
        if(isNaN(weight))
            weight = "N/A";
        
        return weight;
    }

    truncDescription(description){
        if(description.length > 10)
            return description.substring(0, 10);
    }


   


}


function getResponse(res) {
    //console.log(res);
    if(res.ok){
        return res.json();
    }else{
        alert("Not successful response");
    }
}

function processJson(json) {
    //console.log(json);
    let superMarkets = json;
    let domesticProducts = [];
    let importedProducts = [];

   
    const ui = new UI();
    console.log(superMarkets);
    superMarkets.forEach(elem => {
        const superMarket = new Supermarket(elem.name, elem.domestic, elem.price, elem.weight, elem.description);
        if(superMarket.domestic)
            domesticProducts.push(superMarket);
        else
            importedProducts.push(superMarket);
    });

    const productsType = new ProductsType(domesticProducts, importedProducts);
    
    ui.listAllMarkets(productsType);
    ui.productPrice(productsType);
    ui.countProductsType(productsType);
}

function showError(error) {
    console.log("Error");
}


//List all products in a supermarket
fetch('https://interview-task-api.mca.dev/qr-scanner-codes/alpha-qr-gFpwhsQ8fkY1', {
    method: 'GET',
}).then(getResponse).then(processJson).catch(showError);



