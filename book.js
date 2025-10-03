export const bookView = `
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
	<div>
		<label for="imgInput">Cover:</label>
		<input type="file" id="imgInput" accept="image/*">
		<img id="preview"/>
	</div>
	<button type="submit" class="submit-book">Submit</button>
</form>
`;

export function createBookPane(title, author, cover, pages, uuid) {
	const url = cover ? URL.createObjectURL(cover) : "";
	return `
	<div id="${uuid}" class="bookpane" draggable="true">
		<div class="bookpane__cover">
			${cover ? `<img src="${url}" alt="Cover Image"/>` : ""}
		</div>
		<div class="bookpane__title">Title: ${title}</div>
		<div class="bookpane__author">Author: ${author}</div>
		<div class="bookpane__pages">Pages: ${pages}</div>
	</div>
	`;
}
