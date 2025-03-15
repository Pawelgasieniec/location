
function generateTableHead(table, data) {
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key of data) {
        let th = document.createElement("th");
        let text = document.createTextNode(key);
        th.appendChild(text);
        row.appendChild(th);
    }
}
function generateTable(table, data) {
    var circle = new Image();
    circle.src = "groby_wat2/pinezka.png";
    for (let element of data) {
        //LP
        let row = table.insertRow();
        let cell = row.insertCell();
        let text = document.createTextNode(element["lp"]);
        cell.appendChild(text);

        //Zyciorys
        cell = row.insertCell();
        let a = document.createElement('a');
        var linkText = document.createTextNode(element.imie_nazwisko);
        a.appendChild(linkText);
        a.title = element.imie_nazwisko;
        a.href = element.zyciorys;
        cell.appendChild(a);

        //trasa
        var circle = new Image();
        circle.src = "groby_wat2/pinezka.png";
        cell = row.insertCell();
        a = document.createElement('a');
        linkText = document.createTextNode(element.imie_nazwisko);
        a.appendChild(circle);
        a.title = "Trasa: " + element.imie_nazwisko;
        a.href = "trasa/trasa.html?latitude=" + element.latitude + "&longitude=" + element.longitude + "&name=" + element.imie_nazwisko;
        a.target = "_blank";
        cell.appendChild(a);

        //rejestracja
        var circle = new Image();
        circle.src = "groby_wat2/pinezka.png";
        cell = row.insertCell();
        a = document.createElement('a');
        linkText = document.createTextNode(element.imie_nazwisko);
        a.appendChild(circle);
        a.title = "Rejestracja: " + element.imie_nazwisko;
        a.href = "rejestracja/rejestracja.html?latitude=" + element.latitude + "&longitude=" + element.longitude + "&name=" + element.imie_nazwisko;
        a.target = "_blank";
        cell.appendChild(a);

        // Życiorys
        cell = row.insertCell();
        text = document.createTextNode(element.cmentarz);
        cell.appendChild(text);

    }
}

const people = [
    { lp: 43, latitude: 52.25068, longitude: 20.84772, imie_nazwisko: "Lesław Będkowski", zyciorys: "https://graedu.pl/content/wat/bedkowski.html", cmentarz: "Powązki Wojskowe" },
    { lp: 44, latitude: 52.24933, longitude: 20.84860, imie_nazwisko: "Jan Chmurkowski", zyciorys: "https://graedu.pl/content/wat/chmurkowski.html", cmentarz: "Powązki Wojskowe" },
    { lp: 45, latitude: 52.25025, longitude: 20.84697, imie_nazwisko: "Józef Sanecki", zyciorys: "https://graedu.pl/content/wat/sanecki.html", cmentarz: "Powązki Wojskowe" }
]

let table_data = [];
let table = document.querySelector("table");
let headers = ["Lp", "Imię nazwisko", "Trasa", "Rejestracja", "Cmentarz"];
generateTableHead(table, headers);
generateTable(table, people);