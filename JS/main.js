// global varibles

let productName = document.getElementById("productName");
let alertName = document.getElementById("alertName");
let productPrice = document.getElementById("productPrice");
let alertPrice = document.getElementById("alertPrice");
let productCategorey = document.getElementById("productCategorey");
let alertCate = document .getElementById("alertCate");
let productDesc = document.getElementById("productDesc");
let alertDesc = document.getElementById("alertDesc");
let hidderAlert = document.getElementById("hiddenAlert");
let addBtn = document.getElementById("add-btn");
let deleteBtnAll = document.getElementById("del-btn");
let searchInput = document.getElementById("search");
let productContainer =[];
let sameIndex;

// check the local storage

if(localStorage.getItem("myProducts") != null){

    productContainer = JSON.parse(localStorage.getItem("myProducts"));

    display();
} 



// add product

function addProduct(){

if(validateName() == true  && validatePrice() == true && validateCategorey() == true && validateDesc() == true){

    let product = {

        name : productName.value,
        price: productPrice.value,
        categorey : productCategorey.value,
        desc : productDesc.value,
    };

    productContainer.push(product);

    // save product in localstorage

    // localStorage.setItem("myProducts" , JSON.stringify(productContainer));

    // display();

    //   clear();
    }
        else{

            hidderAlert.classList.add("d-block");
            hidderAlert.classList.remove("d-none");
            
        }
}




addBtn.addEventListener("click" ,function(){

    /*
    on click button check add or update
    then save on localstorage and dispaly in table
    */


    if(productName.value == "" || 
       productPrice.value == "" ||
       productCategorey.value == ""||
       productDesc.value == ""){

        hidderAlert.classList.add("d-block");
        hidderAlert.classList.remove("d-none");
       

    }  else if(addBtn.innerHTML == "Add"){

        addProduct();
        hidderAlert.classList.remove("d-block");
        hidderAlert.classList.add("d-none");
        clear();

    } else{

        edit(sameIndex);
        hidderAlert.classList.remove("d-block");
        hidderAlert.classList.add("d-none");
        clear();
    }

    localStorage.setItem("myProducts" , JSON.stringify(productContainer));

    display();

});



// rest inputs field

function clear(){

    productName.value = "";
    productPrice.value = "";
    productCategorey.value = "";
    productDesc.value = "";

    productName.classList.remove("is-invalid");
    productName.classList.remove("is-valid");

    alertName.classList.remove("d-block");
    alertName.classList.add("d-none");

    productPrice.classList.remove("is-valid");
    productPrice.classList.remove("is-invalid");

    alertPrice.classList.remove("d-block");
    alertPrice.classList.add("d-none");

    productCategorey.classList.remove("is-valid"); 
    productCategorey.classList.remove("is-invalid");
    
    alertCate.classList.remove("d-block");
    alertCate.classList.add("d-none");


    productDesc.classList.remove("is-valid");
    productDesc.classList.remove("is-invalid");

    alertDesc.classList.remove("d-block");
    alertDesc.classList.add("d-none");

};


// display products in table

function display(){

    let tableContainer = '';

    for(let i = 0 ; i < productContainer.length; i++){

        tableContainer += `<tr>
            <td class="pt-3">${i}</td>
            <td class="pt-3">${productContainer[i].name}</td>
            <td class="pt-3">${productContainer[i].price}</td>
            <td class="pt-3">${productContainer[i].categorey}</td>
            <td class="pt-3">${productContainer[i].desc}</td>
            <td><button onclick="updateProduct(${i})" class="btn btn-warning text-capitalize">update</button></td>
            <td><button onclick="deleteProduct(${i})" class="btn btn-danger text-capitalize">delete</button></td>
        </tr>`

    }
    document.getElementById("table-body").innerHTML = tableContainer;

    // check the array length to delete all objects

    if(productContainer.length > 0){

        deleteBtnAll.classList.add("d-block");
        deleteBtnAll.classList.remove("d-none");

    } else{

        deleteBtnAll.classList.add("d-none");
        deleteBtnAll.classList.remove("d-block");
    }
};

// delete product item

function deleteProduct(item){

    productContainer.splice(item , 1);

    localStorage.setItem("myProducts" , JSON.stringify(productContainer));

    display();
};


// delete all products by click

function deleteAll(){

    localStorage.clear();
    productContainer.splice(0);
    display();
};

deleteBtnAll.addEventListener("click" , deleteAll);

// update product

function updateProduct(index){
    
    productName.value = productContainer[index].name;
    productPrice.value = productContainer[index].price;
    productCategorey.value = productContainer[index].categorey;
    productDesc.value = productContainer[index].desc;

    addBtn.innerHTML = "Update";

    addBtn.classList.add("btn-warning");
    scroll({

        top:0,
        behavior:"smooth",
    });
    sameIndex = index;
};

function edit(sameIndex){

    if(validateName() == true &&
       validatePrice() == true &&
       validateCategorey() == true &&
       validateDesc() == true){

        productContainer[sameIndex].name = productName.value;
        productContainer[sameIndex].price = productPrice.value;
        productContainer[sameIndex].categorey = productCategorey.value;
        productContainer[sameIndex].desc = productDesc.value;
        
       }

       addBtn.innerHTML = "Add";
       addBtn.classList.remove("btn-warning");
};

// search in the array

function search(term){

   let tableContainer = ``;

    for(let i = 0; i < productContainer.length; i++){

        if(productContainer[i].name.toLowerCase().includes(term.toLowerCase())){

            tableContainer += `<tr>
            <td class="pt-3">${i}</td>
            <td class="pt-3">${productContainer[i].name}</td>
            <td class="pt-3">${productContainer[i].price}</td>
            <td class="pt-3">${productContainer[i].categorey}</td>
            <td class="pt-3">${productContainer[i].desc}</td>
            <td><button onclick="updateProduct(${i})" class="btn btn-warning text-capitalize">update</button></td>
            <td><button onclick="deleteProduct(${i})" class="btn btn-danger text-capitalize">delete</button></td>
        </tr>`
    
        }
        }

    document.getElementById("table-body").innerHTML = tableContainer;
}

searchInput.addEventListener("keyup" , function(){
    
    search(this.value);
});


// ================ START VALIDATION=============


//---- validate product name


function validateName(){

    let ragexName = /^[A-Z][a-zA-Z0-9 ]{3,15}$/;
    
    if(ragexName.test(productName.value) == true){

        productName.classList.add("is-valid");
        productName.classList.remove("is-invalid");

        alertName.classList.add("d-none");
        alertName.classList.remove("d-block");

        hidderAlert.classList.remove("d-block");
        hidderAlert.classList.add("d-none");

        addBtn.removeAttribute("disabled");

        return true;
    }

    else{

        productName.classList.add("is-invalid");
        productName.classList.remove("is-valid");

       alertName.classList.add("d-block");
       alertName.classList.remove("d-none");

       addBtn.setAttribute("disabled" , "true");
       
       return false;

    }
};

productName.addEventListener("keyup" , validateName);


// validate price inpute

function validatePrice(){

    let ragexPrice = /^([0-9][0-9]|[0-9][0-9][0-9]|[0-9][0-9][0-9][0-9]|10000)$/;

    if(ragexPrice.test(productPrice.value) == true){

        productPrice.classList.add("is-valid");
        productPrice.classList.remove("is-invalid");

        alertPrice.classList.add("d-none");
        alertPrice.classList.remove("d-block");

        hidderAlert.classList.remove("d-block");
        hidderAlert.classList.add("d-none");

        addBtn.removeAttribute("disabled");

        return true;

    } else{

        productPrice.classList.add("is-invalid");
        productPrice.classList.remove("is-valid");

        alertPrice.classList.add("d-block");
        alertPrice.classList.remove("d-none");

        addBtn.setAttribute("disabled" , "true");

        return false;
    }
};

productPrice.addEventListener("keyup" , validatePrice);


// validate categorey

function validateCategorey(){

    let ragexCat = /^[A-Z]([A-Z]|[a-z]| |[0-9]){3,20}$/;

    if(ragexCat.test(productCategorey.value) == true){

        productCategorey.classList.add("is-valid");
        productCategorey.classList.remove("is-invalid");

        alertCate.classList.add("d-none");
        alertCate.classList.remove("d-block");

        hidderAlert.classList.remove("d-block");
        hidderAlert.classList.add("d-none");

        addBtn.removeAttribute("disabled");

        return true;

    } else{

        productCategorey.classList.add("is-invalid");
        productCategorey.classList.remove("is-valid");

        alertCate.classList.add("d-block");
        alertCate.classList.remove("d-none");

        addBtn.setAttribute("disabled" , "true");

        return false;

    }
};

productCategorey.addEventListener("keyup" , validateCategorey);


// validate desc

function validateDesc(){

    let ragexDesc = /^([A-Z]|[a-z]|[0-9]| ){3,30}$/;

    if(ragexDesc.test(productDesc.value) == true){

        productDesc.classList.add("is-valid");
        productDesc.classList.remove("is-invalid");

        alertDesc.classList.add("d-none");
        alertDesc.classList.remove("d-block");

        hidderAlert.classList.remove("d-block");
        hidderAlert.classList.add("d-none");

        addBtn.removeAttribute("disabled");

        return true;

    } else{

        productDesc.classList.add("is-invalid");
        productDesc.classList.remove("is-valid");

        alertDesc.classList.add("d-block");
        alertDesc.classList.remove("d-none");

        addBtn.setAttribute("disabled" , "true");

        return false;
    }
};

productDesc.addEventListener("keyup" , validateDesc);
