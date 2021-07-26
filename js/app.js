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
    // const storedManga = [
    //   {
    //     title: "5cm per Second",
    //     author: "Makoto Shinkai",
    //     year: "2007",
    //     serialNumber: "SN39695535",
    //   },
    //   {
    //     title: "Uzumaki",
    //     author: "Junji Ito",
    //     year: "2010",
    //     serialNumber: "SN59204832",
    //   },
    // ];

    const mangas = Store.getManga();

    // Keluarkan data dengan perulangan
    mangas.forEach((manga) => UI.addMangaToList(manga));
  }

  static addMangaToList(manga) {
    const list = document.querySelector("#manga-list");
    const tableRow = document.createElement("tr");
    tableRow.innerHTML = `
      <td>${manga.title}</td>
      <td>${manga.author}</td>
      <td>${manga.year}</td>
      <td>${manga.serialNumber}</td>
      <td><button class="btn btn-small red accent-4 delete"><i class="sm material-icons">clear</i></button></td>
    `;
    list.appendChild(tableRow);
  }

  static clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#year").value = "";
    document.querySelector("#serialNumber").value = "";
  }

  static deleteManga(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.remove();
    }
  }

  static showAlert(className, text) {
    const div = document.createElement("div");
    div.className = `alert white-text ${className}`;
    div.appendChild(document.createTextNode(text));

    const container = document.querySelector(".container");
    const cardForm = document.querySelector(".card-form");
    container.insertBefore(div, cardForm);

    // Otomatis hilang dalam 2 detik
    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, 2000);
  }
}

// Store Class - Handle Local Storage
class Store {
  static getManga() {
    let mangas;
    if (localStorage.getItem("mangas") === null) {
      mangas = [];
    } else {
      mangas = JSON.parse(localStorage.getItem("mangas"));
    }
    return mangas;
  }

  static addManga(manga) {
    const mangas = Store.getManga();
    mangas.push(manga);
    localStorage.setItem("mangas", JSON.stringify(mangas));
  }

  static deleteManga(serialNumber) {
    const mangas = Store.getManga();

    mangas.forEach((manga, index) => {
      if (manga.serialNumber === serialNumber) {
        mangas.splice(index, 1);
      }
    });

    localStorage.setItem("mangas", JSON.stringify(mangas));
  }
}

// Event - Display Manga
document.addEventListener("DOMContentLoaded", UI.displayManga());

// Event - Add Manga
document.querySelector("#manga-form").addEventListener("submit", (e) => {
  // prevent default
  e.preventDefault();

  // Tangkap fields dari form nya
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const year = document.querySelector("#year").value;
  const serialNumber = document.querySelector("#serialNumber").value;

  // Buat Validasi
  if (title === "" || author === "" || year === "" || serialNumber === "") {
    UI.showAlert("orange", "Please fill in all fields");
  } else {
    // Instansiasi Object Manga
    const manga = new Manga(title, author, year, serialNumber);

    // Tambah Manga ke List
    UI.addMangaToList(manga);

    // Masukkan ke Local Storage
    Store.addManga(manga);

    // Tampilkan alert
    UI.showAlert("green", "Manga has been added");

    // Hapus Fields setelah input
    UI.clearFields();
  }
});

// Event - Remove Manga
document.querySelector("#manga-list").addEventListener("click", (e) => {
  // Hapus dari UI UI
  UI.deleteManga(e.target);

  Store.deleteManga(e.target.parentElement.previousElementSibling.textContent);

  // Tampilkan alert
  UI.showAlert("red", "Manga has been deleted");
});
