// Manga Class - Represent Manga Object
class Manga {
  constructor(title, author, year, serialNumber) {
    this.title = title;
    this.author = author;
    this.year = year;
    this.serialNumber = serialNumber;
  }
}

// UI Class - Handle UI Task
class UI {
  static displayManga() {
    // Buat dummy data
    const storedManga = [
      {
        title: "5cm per Second",
        author: "Makoto Shinkai",
        year: "2007",
        serialNumber: "SN39695535" 
      },
      {
        title: "Uzumaki",
        author: "Junji Ito",
        year: "2010",
        serialNumber: "SN59204832"
      }
    ];

    const mangas = storedManga;
    
    // Keluarkan data dengan perulangan
    mangas.forEach(manga => UI.addMangaToList(manga));
  }

  static addMangaToList(manga) {
    const list = document.querySelector('#manga-list');
    const tableRow = document.createElement('tr');
    tableRow.innerHTML = `
      <td>${manga.title}</td>
      <td>${manga.author}</td>
      <td>${manga.year}</td>
      <td>${manga.serialNumber}</td>
      <td><button class="btn btn-small red accent-4 delete"><i class="sm material-icons">clear</i></button></td>
    `;
    list.appendChild(tableRow);
  }

  static clearFields(){
    document.querySelector('#title').value = "";
    document.querySelector('#author').value = "";
    document.querySelector('#year').value = "";
    document.querySelector('#serialNumber').value = "";
  }

  static deleteManga(el) {
    if (el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }
}

// Store Class - Handle Local Storage

// Event - Display Manga 
document.addEventListener("DOMContentLoaded", UI.displayManga());

// Event - Add Manga
document.querySelector('#manga-form').addEventListener('submit', (e) => {
  // prevent default
  e.preventDefault();

  // Tangkap fields dari form nya
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const year = document.querySelector('#year').value;
  const serialNumber = document.querySelector('#serialNumber').value;

  // Making Validation
  if ( title === '' || author === '' || year === '' || serialNumber === '') {
    alert('Please fill in all fields');
  } else {
      // Instansiasi Object Manga
      const manga = new Manga(title, author, year, serialNumber);

      // Tambah Manga ke List
      UI.addMangaToList(manga);

      // Hapus Fields setelah input
      UI.clearFields();
  }

  
});

// Event - Remove Manga
document.querySelector('#manga-list').addEventListener('click', (e) => {
  // Delete from UI
  UI.deleteManga(e.target);
})