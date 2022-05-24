const list = document.querySelector('#list');
const btnAdd = document.querySelector(".addBtn");
const input = document.querySelector(".input");
const bodyItem = document.getElementById("body");
let width, height
let dragEl;
let cloneEl;

const listIt = localStorage.getItem("Items") ? JSON.parse(localStorage.getItem("Items")): [];

console.log(listIt)

function loadData() {
    render();
}

btnAdd.addEventListener('click', e => {
    if (!input.value) {
        alert("You haven't text anythings");
    } else {
        listIt.push(input.value);
        localStorage.setItem("Items", JSON.stringify(listIt))
        input.value = "";
        render();
        console.log(listIt)
    }
})


    
function render() {
    let toDoRender = "";
    if (listIt) {
        list.style.display = "block";
        listIt.forEach((workToDo, index) => {
            toDoRender += `
                <div class="item" data-index="${index}">
                    <span></span>${workToDo}<span></span>
                    <button class="delete-btn" id="delete-btn" >Remove</button>
                </div>
            `
        })
    }
    return list.innerHTML = toDoRender;
}
list.addEventListener('mousedown', e => {

    if (e.target.classList.contains('delete-btn')) {

        const index = e.target.closest('.item').dataset.index
        console.log(index)

        listIt.splice(index, 1);
        localStorage.setItem("Items", JSON.stringify(listIt));
        render();
    } else {
        dragEl = e.target.closest(".item");
        
        cloneEl = dragEl.cloneNode();
        cloneEl.innerHTML = dragEl.innerHTML;
        document.getElementById("list").appendChild(cloneEl)

        cloneEl.classList.add('dragging')
        cloneEl.style.top = e.clientY + "px"
        cloneEl.style.left = e.clientX + "px"
    // }
}})
list.addEventListener('mouseup', e => {
	
	if(dragEl){

		const dropEl = e.target.closest('.item');
		const dropIndex = dropEl.dataset.index;
        
		const dragIndex = dragEl.dataset.index;

        console.log(dropIndex, dragIndex)

		localStorage.setItem("Items", JSON.stringify(listIt))

		const rect = dropEl.getBoundingClientRect()
		const { y, height:h } = rect
		const { clientY:cy } = e

		if(cy < (y+h/2)){
            if (dragIndex > dropIndex) {
                listIt.splice(dropIndex, 0, listIt[dragIndex]);
                listIt.splice(parseInt(dragIndex, 10) + 1, 1);
            } else {
                listIt.splice(dropIndex, 0, listIt[dragIndex]);
                listIt.splice(parseInt(dragIndex, 10), 1);
            }
		}
		else{
            if (dragIndex < dropIndex) {
                listIt.splice(parseInt(dropIndex, 10) + 1, 0, listIt[dragIndex]);
                listIt.splice(parseInt(dragIndex, 10), 1);
            
            } else {
                listIt.splice(parseInt(dropIndex, 10) + 1, 0, listIt[dragIndex]);
                listIt.splice(parseInt(dragIndex, 10), 1);
            }
		}
        console.log(listIt)
        localStorage.setItem("Items", JSON.stringify(listIt));
		// document.getElementById("list").removeChild(cloneEl)
        console.log(document.getElementById("list"));
		render()
        dragEl = null;
	// }
}
})

list.addEventListener('mousemove', e => {
	if(dragEl){
		cloneEl.style.top = e.clientY + "px"
		cloneEl.style.left = e.clientX + "px"
	}
})
