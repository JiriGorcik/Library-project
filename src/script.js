const openModal = document.querySelector("[data-open-modal]")
const modal = document.querySelector("[data-modal]")
const modalSubmit = document.querySelector("[data-modal-submit]")

/* Open Modal */
openModal.addEventListener("click", () => {
  modal.showModal()
})

/* Close Modal */
modal.addEventListener("mousedown", (e) => {
  const dialogDimensions = modal.getBoundingClientRect()

  if (
    e.clientX < dialogDimensions.left ||
    e.clientX > dialogDimensions.right ||
    e.clientY < dialogDimensions.top ||
    e.clientY > dialogDimensions.bottom
  ) {
    modal.close()
  }
})

let library = []

/* Book Constructor */
function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
}

Book.prototype.toggleRead = function () {
  this.read = !this.read
}

const toggleRead = (index) => {
  library[index].toggleRead()
  render()
}

const render = () => {
  let libraryBook = document.querySelector(".book-sect")
  libraryBook.textContent = ""

  document.querySelector("[data-title]").value = ""
  document.querySelector("[data-author]").value = ""
  document.querySelector("[data-pages]").value = ""
  document.querySelector("[data-read]").checked = ""

  for (let i = 0; i < library.length; i++) {
    let oneBook = library[i]

    let bookCard = document.createElement("article")
    bookCard.classList.add("bookCard")
    libraryBook.appendChild(bookCard)

    let bookTitle = document.createElement("h2")
    bookTitle.textContent = oneBook.title
    bookTitle.classList.add("text-3xl", "font-bold")
    bookCard.appendChild(bookTitle)

    let bookAuthor = document.createElement("h2")
    bookAuthor.textContent = oneBook.author
    bookAuthor.classList.add("text-2xl")
    bookCard.appendChild(bookAuthor)

    let bookPages = document.createElement("p")
    bookPages.textContent = `${oneBook.pages} pages`
    bookPages.classList.add("text-xl")
    bookCard.appendChild(bookPages)

    let bookButtonDiv = document.createElement("div")
    bookButtonDiv.classList.add("mt-5", "flex", "flex-col", "gap-5")
    bookCard.appendChild(bookButtonDiv)

    let bookReadBtn = document.createElement("button")
    bookReadBtn.addEventListener("click", () => {
      toggleRead(i)
    })
    if (oneBook.read) {
      bookReadBtn.textContent = "Read"
      bookReadBtn.classList.add("readButton")
      bookCard.classList.add("border-2", "border-green-300")
    } else {
      bookReadBtn.textContent = "Not read"
      bookReadBtn.classList.add("notReadButton")
      bookCard.classList.add("border-2", "border-red-300")
    }
    bookButtonDiv.appendChild(bookReadBtn)

    let bookRemoveBtn = document.createElement("button")
    bookRemoveBtn.addEventListener("click", () => {
      removeBook(i)
    })
    bookRemoveBtn.textContent = "Remove"
    bookRemoveBtn.classList.add("removeButton")
    bookButtonDiv.appendChild(bookRemoveBtn)
  }
}

const removeBook = (index) => {
  library.splice(index, 1)
  render()
}

const addBookToLibrary = () => {
  let title = document.querySelector("[data-title]").value
  let author = document.querySelector("[data-author]").value
  let pages = document.querySelector("[data-pages]").value
  let read = document.querySelector("[data-read]").checked

  let newBook = new Book(title, author, pages, read)
  library.push(newBook)

  render()
}

modalSubmit.addEventListener("click", (e) => {
  if (document.querySelector("form").checkValidity()) {
    e.preventDefault()
    modal.close()
    addBookToLibrary()
  }
})
