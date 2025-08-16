let form = document.getElementById("addForm");
let itemList = document.getElementById("items");
let filter = document.getElementById("filter");

// fetching the books from database
async function fetchBooks(){
    const res = await fetch("https://web-oxwu.onrender.com/api/books");
    if(!res.ok)
        return console.log("Failed to fetch!");

    const books = await res.json();

    books.forEach(book => {
        let li = createLi();
        let button = createButton();
        let text = document.createTextNode(`${book.title}`);
        li.appendChild(text);
        li.appendChild(button);
        itemList.appendChild(li);
    });
}
fetchBooks();


form.addEventListener("submit",addItem);

async function addItem(e){
    // e.preventDefault();
    let newItem = document.getElementById("item");
    
    let li = createLi();
    let button = createButton();
    
    let text = document.createTextNode(`${newItem.value}`);
    const res = await fetch("https://web-oxwu.onrender.com/api/books",{
        method : "POST",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify({title : text.textContent})
    });
    
    if (!res.ok)
        return console.log("Failed to fetch!")

    const book = await res.json();
    console.log(`Book: ${book}`);
    console.log(`Book Title: ${book.title}`);
    li.appendChild(text);
    li.appendChild(button);
    itemList.appendChild(li);
    newItem.value ="";
}

function createLi(){
    let li = document.createElement('li');
    // li.className= itemList.firstElementChild.className;
    li.className = "list-group-item";
    return li;
}

function createButton (){

    let button = document.createElement('button');
    button.className = "btn btn-danger btn-sm delete float-right";
    button.innerText = "X";

    return button;

}

itemList.addEventListener('click',removeItem);

async function removeItem(e){
    if(e.target.classList.contains("delete")){
        if(confirm("Are you sure?")){
            const deletedItem = e.target.parentElement.firstChild;
            const res =await fetch("https://web-oxwu.onrender.com/api/books",{
                method : "DELETE",
                headers : {"Content-Type" : "application/json"},
                body : JSON.stringify({title : deletedItem.textContent})
            });
            let response = await res.json();
            let li = e.target.parentElement;
            
            itemList.removeChild(li);
            // li.remove();
            console.log(response.msg);
        }

    }
    
}

filter.addEventListener("keyup",filterItems);

function filterItems(){

    let filterValue = filter.value.toLowerCase();
    
    // let items = itemList.querySelectorAll('li'); // it is not live reload

    let items = itemList.getElementsByTagName("li");

    Array.from(items).forEach((item) =>{
        let itemName = item.firstChild.textContent;
        if(itemName.toLowerCase().indexOf(filterValue) != -1){
            // item.parentElement.style.display = "";
            item.style.display = "block";

        }else{
            // item.parentElement.style.display = "none";
            item.style.display = "none";

        }
    });
};