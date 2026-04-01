const myUrl = "https://makerslab.em-lyon.com/dww/data/products.json";

const getData = async(doStuffs) => {
    try {
        const response = await fetch(myUrl);
        if(!response.ok){
            throw new Error("Network response not ok :" + response.statusText);
        }
        const data = await response.json();
        doStuffs(data);
    } catch(error) {
        console.error("Problem occurend while getting your data" + error);
    }
}

getData((data) => {
    console.log(data);

    const container = document.querySelector('.product-list');

    data.forEach((product) => {
        
        const cardHTML = `
            <article class="product-card">
                <div class="card-header">
                    <div class="product-info">
                        <h3>${product.name}</h3>
                        <p class="brand">${product.brand}</p>
                        <p class="quote">"${product.description}"</p>
                    </div>
                    <a href="product.html" class="btn-buy">BUY</a>
                </div>
                <div class="card-body">
                    <img src="${product.image}" alt="${product.name}" class="product-img">
                    <img src="chart-1.png" alt="Price History" class="chart-img">
                </div>
            </article>
        `;

        container.innerHTML += cardHTML;
    });
});

