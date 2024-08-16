const alert = document.querySelector(".alert");
const form = document.querySelector(".grocery-form");
const grocery = document.getElementById("grocery");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");


let editElement;
let editFlag = false;
let editID = "";

// adding event listeners to our elements
// for the submit form
form.addEventListener("submit", addItem);
// load items
window.addEventListener('DOMContentLoaded', setupItems)

function addItem(e){
    e.preventDefault();
    const value = grocery.value;
    // giving an indivia´dual id to the element
    const id = new Date().getTime().toString();

    if(value !== "" && !editFlag){
        createListItem(id, value)
        // const element = document.createElement("article");
        // // adding class
        // element.classList.add("grocery-item");
        // // creating an id
        // let attr = document.createAttribute("data-id");
        // attr.value = id;
        // element.setAttributeNode(attr);
        // element.innerHTML = `<p class="title">${value}</p>
        // <div class="btn-container">
        //     <button type="button" class="edit-btn">
        //         <i class="uil uil-edit"></i> 
        //     </button>
        //     <button type="button" class="delete-btn">
        //         <i class="uil uil-trash-alt"></i>
        //     </button>
        // </div>`;

        // const deleteBtn = element.querySelector(".delete-btn");
        // const editBtn = element.querySelector(".edit-btn");

        // deleteBtn.addEventListener("click", deleteItem);
        // editBtn.addEventListener("click", editItem);

        // // appending
        // list.appendChild(element);
        displayAlert("item has been added to the list", "success");
        // to show the container
        container.classList.add("show-container");
        // adding to local storage
        addToLocalStorage(id, value);
        // stting back to default
        setBackToDefault();
    } else if (value !== "" && editFlag){
        editElement.innerHTML = value;
        displayAlert("value changed", "success");
        // editing local storage
        editLocalStorage(editID, value);
        setBackToDefault();
    } else {
        displayAlert("please enter value", "danger");
    }
}

// displaying the alert
function displayAlert(text, action){
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);

    // to remove the alert
    setTimeout(function(){
        alert.textContent = "";
        alert.classList.remove(`alert-${action}`);

    },1500);

}

// setting back to default
function setBackToDefault(){
    grocery.value = "";
    editFlag = false;
    editID = '';
    submitBtn.textContent = "submit";
}


// to clear items
clearBtn.addEventListener("click", clearItems);

function clearItems(){
    const  items = document.querySelectorAll(".grocery-item");
    if(items.length > 0){
        items.forEach(function(item){
            list.removeChild(item);
        });
    }
    container.classList.remove("show-container");
    displayAlert("empty list", "danger");
    localStorage.removeItem('list');
    setBackToDefault();
}




// deleting items
function deleteItem(e){
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;
    list.removeChild(element);
    if(list.children.length === 0){
        container.classList.remove("show-container");
    }
    displayAlert("item  removed", "danger");
    setBackToDefault();
    // deleting from local storage
    removeFromLocalStorage(id);
}


// editing items
function editItem(e){
    const element = e.currentTarget.parentElement.parentElement;
    // set edit item
    editElement = e.currentTarget.parentElement.previousElementSibling;
    
    // set form value
    grocery.value = editElement.innerHTML;
    editFlag = true;
    editID = element.dataset.id;
    submitBtn.textContent = "edit";
}

// function for local storage
function addToLocalStorage(id, value){
    const grocery = {id:id, value:value};
    let items = getLocalStorage();

    // console.log(items);
    items.push(grocery);
    localStorage.setItem("list", JSON.stringify(items));
}
function removeFromLocalStorage(id){
    let items = getLocalStorage();
    items = items.filter(function(item){
        if (item.id !== id){
            return item;
        }
    });
    localStorage.setItem("list", JSON.stringify(items));

}
function editLocalStorage(id, value){
    let items = getLocalStorage();
    items = items.map(function(item){
        if (item.id === id){
            item.value = value;
        }
        return item
    });
    localStorage.setItem("list", JSON.stringify(items));
}

// getting local storage
function getLocalStorage(){
    return localStorage.getItem("list") ?JSON.parse(localStorage.getItem("list")):[];

}

// setting up items from local storage
function setupItems(){
    let items = getLocalStorage();
    if (items.length > 0){
        items.forEach(function(item){
            createListItem(item.id, item.value)
        })
        container.classList.add('show-container')
    }
}

function createListItem(id, value){
    const element = document.createElement("article");
        // adding class
        element.classList.add("grocery-item");
        // creating an id
        let attr = document.createAttribute("data-id");
        attr.value = id;
        element.setAttributeNode(attr);
        element.innerHTML = `<p class="title">${value}</p>
        <div class="btn-container">
            <button type="button" class="edit-btn">
                <i class="uil uil-edit"></i> 
            </button>
            <button type="button" class="delete-btn">
                <i class="uil uil-trash-alt"></i>
            </button>
        </div>`;

        const deleteBtn = element.querySelector(".delete-btn");
        const editBtn = element.querySelector(".edit-btn");

        deleteBtn.addEventListener("click", deleteItem);
        editBtn.addEventListener("click", editItem);

        // appending
        list.appendChild(element);
}



