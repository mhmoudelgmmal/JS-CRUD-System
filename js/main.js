var nameInput = document.getElementById("productName");
var categoryInput = document.getElementById("ProductCategory");
var priceInput = document.getElementById("ProductPrice");
var descInput = document.getElementById("ProductDescription");
var tbody = document.getElementById("tbody");
var updateSit = 0;
var updatedIndex;
var btn = document.getElementById("btn");
btn.value = "Add Product";
var productContainer;

if(localStorage.getItem("allproducts") == null){
productContainer = [];
}else{
  productContainer = JSON.parse(localStorage.getItem("allproducts"));
  display();
}


function createProduct() {
   if(validateInputs() == true && categoryInput.value != "" 
   && priceInput.value != "" && descInput.value != ""){
    if(btn.value == "Add Product"){
      var oneProduct = {
        pname:nameInput.value,
        price:priceInput.value,
        category:categoryInput.value,
        desc:descInput.value,
    };
          productContainer.push(oneProduct);
          localStorage.setItem("allproducts",JSON.stringify(productContainer));
          var trs = "";
          for(var i=0;i<productContainer.length;i++){
              trs += `
              <tr>
                <td>${i+1}</td>
                <td>${productContainer[i].pname}</td>
                <td>${productContainer[i].category}</td>
                <td>${productContainer[i].price}</td>
                <td>${productContainer[i].desc}</td>
                <td>
                  <button onclick="updateRow(${i})" class="btn btn-outline-success"> <i class="fa fa-solid fa-edit"></i>  </button>
                </td>
                <td>
                  <button onclick="deleteRow(${i})" class="btn btn-outline-danger"> <i class="fa-solid fa-trash-can"></i>  </button>
                </td>
              </tr>`;
              tbody.innerHTML = trs;
    };
        clearText();
    }else if(btn.value == "Update product"){
            productContainer[updatedIndex].pname = nameInput.value;
            productContainer[updatedIndex].category = categoryInput.value;
            productContainer[updatedIndex].price = priceInput.value;
            productContainer[updatedIndex].desc = descInput.value;
            localStorage.setItem("allproducts",JSON.stringify(productContainer));  
            display();
            clearText();
    }
   }else{
     
     alert("Please insert a valid informations");
     return false;
   }
}
function clearText(){
    nameInput.value ="";
    priceInput.value = "";
    categoryInput.value = "";
    descInput.value = "";
    updateSit = 0;
    btn.value = "Add Product";
    if(validateInputs() == false){
      i.classList.remove("d-block");
      i.classList.add("d-none");
      p.classList.remove("d-block");
      p.classList.add("d-none");
    }
}

function searchText(){
var search = document.getElementById("search").value;  

    tbody.innerHTML = "";
    for(var i=0; i<productContainer.length;i++){
      
        if(productContainer[i].pname.toLowerCase().includes(search.toLowerCase())){
          
            tbody.innerHTML += `
            <tr>
              <td>${i+1}</td>
              <td id = td${i}>${productContainer[i].pname}</td>
              <td>${productContainer[i].category}</td>
              <td>${productContainer[i].price}</td>
              <td>${productContainer[i].desc}</td>
              <td>
                <button onclick="updateRow(${i})" class="btn btn-outline-success"> <i class="fa fa-solid fa-edit"></i>  </button>
              </td>
              <td>     
                <button onclick="deleteRow(${i})" class="btn btn-outline-danger"> <i class="fa-solid fa-trash-can"></i>  </button>

              </td>
            </tr>`;            
             if(search != ""){    
                textTosearch = search.replace(/[.**?^${}()|[\]\\]/g,"\\$&");             
                let patern = new RegExp(`${textTosearch}`,"gi");
                var newText = productContainer[i].pname.replace(patern,match=>`<mark class="s">${match}</mark>`);
                document.getElementById("td"+i+"").innerHTML = newText;
             }
            
         }           
    }  
}

function display(){
    tbody.innerHTML =""; 
    for(var x=0;x<productContainer.length;x++){
        tbody.innerHTML += `
        <tr>
          <td>${x+1}</td>
          <td>${productContainer[x].pname}</td>
          <td>${productContainer[x].category}</td>
          <td>${productContainer[x].price}</td>
          <td>${productContainer[x].desc}</td>
          <td>
            <button onclick="updateRow(${x})" class="btn btn-outline-success"> <i class="fa fa-solid fa-edit"></i>  </button>
          </td>
          <td>
    
            <button onclick="deleteRow(${x})" class="btn btn-outline-danger"> <i class="fa-solid fa-trash-can"></i>  </button>
          </td>
        </tr>`;                
    }
}
function deleteRow(index){
        if(productContainer.indexOf(index)){
            productContainer.splice(index,1); 
            localStorage.setItem("allproducts",JSON.stringify(productContainer));           
            display();            
    }
}
function updateRow(index){
  updateSit = 1;
  if(productContainer.indexOf(index) && updateSit == 1){
    btn.value = "Update product";
    nameInput.value = productContainer[index].pname;
    categoryInput.value = productContainer[index].category;
    priceInput.value = productContainer[index].price;
    descInput.value = productContainer[index].desc;
    window.scroll({ top: 0, behavior: "smooth" });
    nameInput.focus();
    updatedIndex = index;
    updateSit = 0;
  }
}
function changeTxt(){
  if(updateSit == 0){
    btn.value = "Add Product";
  }
}

// begin validation
var i = document.getElementById("i");
  var p = document.getElementById("p");
function validateInputs(){  
  var pnameRegExp = /^[A-Z][a-z]{2,8}$/;
  var pname = nameInput.value;
  
  if(pnameRegExp.test(pname) == true){
    i.classList.remove("d-block");
    i.classList.add("d-none");
    p.classList.remove("d-block");
    p.classList.add("d-none");
    return true;
  }else{
    i.classList.remove("d-none");
    i.classList.add("d-block");
    p.classList.remove("d-none");
    p.classList.add("d-block");
    return false;
  }
}
