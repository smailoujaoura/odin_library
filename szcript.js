

const myLibrary = [];

document.addEventListener('DOMContentLoaded', e => {
	let button = document.querySelector(".add-button");
	button.addEventListener('click', addButton);
});

function Book(uuid, name="None", author="None", status="None", pages=0) {
	if (!new.target)
		throw Error("Book constructor not called with new");
	
	this.name = name;
	this.author = author;
	this.status = status;
	this.pages = pages;
	this.uuid = uuid;
}

function addBookToLIbrary(name, author, status, pages) {
	let uuid = crypto.randomUUID();
	let book = new Book(uuid, name, author, status, pages);
	myLibrary.push(book);
	let bookElement = document.createElement("div");
	bookElement.setAttribute('id', uuid);
	let inner = `<p> Title: ${name}</p>
				 <p> Author: ${author}</p>
				 <p> Pages: ${pages}</p>
				 <p> Status: ${status}</p>			 
	`;
	bookElement.innerHTML = inner;
	document.querySelector(".to-read-list").appendChild(bookElement);
}

function addButton(e) {
	let body = document.querySelector("body");
	let dialog = document.createElement("dialog", {id: "modal-dialog"});
	dialog.classList = "modal-dialog"
	dialog.setAttribute("style", "width: 40vw; height: 50vh; border-radius: 10px; background: gray")
	dialog.innerHTML = `
		<svg class="close-dialog" style="position: absolute; top: 0.5em; right: 0.5em; border: 1px solid red; margin-top: 10px; margin-right: 10px; cursor: pointer;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
     		<line x1="4" y1="4" x2="20" y2="20" stroke="black" stroke-width="2"/>
      		<line x1="20" y1="4" x2="4" y2="20" stroke="black" stroke-width="2"/>
    	</svg>
		<p class="font-weight: bold"> Enter the book details </p>
		<form>
			<div>
				<label for="book">Book Name: </label>
				<input id="book" type="text" placeholder="The Tale of Two Cities" required>
			</div>
			<div>
				<label for="author">Author Name: </label>
				<input type="text" id="author" placeholder="Charles Dickens" required>
			</div>
			<div>
				<label for="pages">Page Count: </lable>
				<input id="pages" type="number" placeholder="800" val required>
			</div>
			<button type="submit" class="submit-book">Submit</button>
		</form>
	`;
	body.appendChild(dialog);
	dialog.showModal();
	dialog.querySelector(".close-dialog").addEventListener("click", (e) => {
		dialog.close();
	});
	dialog.querySelector("form").addEventListener("submit", (e) => {
		e.preventDefault();
		const bookName = dialog.querySelector("#book").value;
		const authorName = dialog.querySelector("#author").value;
		const pageCount = dialog.querySelector("#pages").value;
		addBookToLIbrary(bookName, authorName, "unread", pageCount);
		dialog.close();
	});
}

function closeDialog() {
	let dialog = document.querySelector(".modal-dialog");
	dialog.close();
}