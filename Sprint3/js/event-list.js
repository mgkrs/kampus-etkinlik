import { events } from "./data.js";

const list = document.querySelector("#etkinlik-listesi");
const aramaInput = document.querySelector("#arama");
const kategoriSelect = document.querySelector("#kategori-filtre");
const sonucSatiri = document.querySelector("#sonuc");

function formatDate(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
}

function createCard(event) {
    return `<article class="kart">
        <h3>${event.title}</h3>
        <p>${event.category}</p>
        <p><time>${formatDate(event.date)}, ${event.time}</time></p>
        <p>${event.location}</p>
        <a href="etkinlik-detay.html?id=${event.id}" class="detay-link">Detayları gör &rarr;</a>
    </article>`;
}

function render(dizi) {
    if (!list) return;
    list.innerHTML = dizi.map(createCard).join("");
}

if (list && list.dataset.limit) {
    const yaklasan = [...events]
        .sort((a, b) => a.date.localeCompare(b.date))
        .slice(0, Number(list.dataset.limit));
    render(yaklasan);
} else if (list) {
    render(events);
    if (sonucSatiri) sonucSatiri.textContent = `${events.length} etkinlik listeleniyor.`;

    if (kategoriSelect) {
        const kategoriler = [...new Set(events.map(e => e.category))];
        kategoriler.forEach(kat => {
            kategoriSelect.innerHTML += `<option value="${kat}">${kat}</option>`;
        });
    }

    function filtrele() {
        const aranan = aramaInput.value.toLocaleLowerCase("tr-TR");
        const secilenKat = kategoriSelect.value;

        const sonuc = events.filter(e => {
            const metinUyuyor = e.title.toLocaleLowerCase("tr-TR").includes(aranan) || 
                                e.category.toLocaleLowerCase("tr-TR").includes(aranan);
            const kategoriUyuyor = secilenKat === "" || e.category === secilenKat;
            return metinUyuyor && kategoriUyuyor;
        });

        render(sonuc);
        if (sonuc.length === 0) {
            sonucSatiri.textContent = "Aramanıza uygun etkinlik bulunamadı.";
        } else {
            sonucSatiri.textContent = `${sonuc.length} etkinlik listeleniyor.`;
        }
    }

    if (aramaInput) aramaInput.addEventListener("input", filtrele);
    if (kategoriSelect) kategoriSelect.addEventListener("change", filtrele);
}