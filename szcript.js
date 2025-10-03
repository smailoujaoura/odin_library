import { bookView, createBookPane } from "./book.js";

const myLibrary = [];

document.addEventListener('DOMContentLoaded', e => {
	document.querySelector(".add-button")
		.addEventListener('click', addButton);
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

let draggedItem = null;
function drag(event) {
	draggedItem = event.target.closest(".bookpane");
}
window.drag = drag;

function allowDrop(event) {
	event.preventDefault();
}
window.allowDrop = allowDrop;

function drop(event) {
	event.preventDefault();
	const list = event.currentTarget;
	
	if (draggedItem) {
		list.appendChild(draggedItem);
		draggedItem = null;
	}
}
window.drop = drop;

function addBookToLibrary(name, author, status, pages, cover) {
	let uuid = crypto.randomUUID();
	let book = new Book(uuid, name, author, status, pages);
	myLibrary.push(book);

	const tempDiv = document.createElement("div");
	tempDiv.innerHTML = createBookPane(name, author, cover, pages, uuid);

	const bookElement = tempDiv.firstElementChild;
	bookElement.addEventListener("dragstart", drag);
	
	document.querySelector(".to-read-list").appendChild(bookElement);
}

function addButton(e) {
	let body = document.querySelector("body");
	let dialog = document.createElement("dialog", {id: "modal-dialog"});
	dialog.classList = "modal-dialog"
	dialog.setAttribute("style", "width: 40vw; height: 50vh; border-radius: 10px; background: gray")
	dialog.innerHTML = bookView;
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
		const coverImage = dialog.querySelector("#imgInput").files[0];
		addBookToLibrary(bookName, authorName, "unread", pageCount, coverImage);
		dialog.close();
	});
}
