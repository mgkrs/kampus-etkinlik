import { useState, useEffect } from "react";
import "./App.css";
import type { CampusEvent, Category } from "./types/campus-event";
import { events } from "./data/events";
import { searchEvents, filterByCategory, findEventById } from "./utils/filter-events";

type PageName = "home" | "events" | "detail" | "add" | "update";

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
}

export default function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | "">("");

  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
    window.scrollTo(0, 0);
  }

  const upcoming = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 2);

  const filtered = filterByCategory(searchEvents(events, searchText), selectedCategory);
  const selectedEvent = selectedId ? findEventById(events, selectedId) : undefined;
  const categories = [...new Set(events.map(e => e.category))] as Category[];

  useEffect(() => {
    let title = "Ana Sayfa";
    if (page === "events") title = "Tüm Etkinlikler";
    if (page === "add") title = "Etkinlik Ekle";
    if (page === "update") title = "Etkinlik Güncelle";
    if (page === "detail" && selectedEvent) title = selectedEvent.title;

    document.title = `Kampüs Etkinlikleri — ${title}`;
  }, [page, selectedEvent]);

  function renderCard(event: CampusEvent) {
    return (
      <article className="kart" key={event.id}>
        <h3>{event.title}</h3>
        <p>{event.category}</p>
        <p><time>{formatDate(event.date)}, {event.time}</time></p>
        <p>{event.location}</p>
        <a 
          href="#" 
          className="detay-link" 
          onClick={(e) => { e.preventDefault(); go("detail", event.id); }}
        >
          Detayları gör &rarr;
        </a>
      </article>
    );
  }

  return (
    <>
      <header>
        <h1>Kampüs Etkinlikleri</h1>
        <nav>
          <a href="#" aria-current={page === "home" ? "page" : undefined} onClick={(e) => { e.preventDefault(); go("home"); }}>Ana Sayfa</a> &middot;
          <a href="#" aria-current={page === "events" ? "page" : undefined} onClick={(e) => { e.preventDefault(); go("events"); }}>Etkinlikler</a> &middot;
          <a href="#" aria-current={page === "add" ? "page" : undefined} onClick={(e) => { e.preventDefault(); go("add"); }}>Ekle</a>
        </nav>
      </header>
      
      <main>
        {page === "home" && (
          <>
            <p>Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.</p>
            <br />
            <h2>Yaklaşan 2 etkinlik</h2>
            <br />
            <section className="etkinlik-grid ikili">
              {upcoming.map(renderCard)}
            </section>
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); go("events"); }} 
              style={{ color: "var(--renk-ana)", fontWeight: "bold", textDecoration: "none" }}
            >
              Tüm etkinlikleri gör &rarr;
            </a>
          </>
        )}

        {page === "events" && (
          <>
            <form className="filtre" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="arama">Etkinlik ara</label>
                <input 
                  type="search" 
                  id="arama" 
                  placeholder="atölye, kariyer..." 
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="kategori-filtre">Kategori</label>
                <select 
                  id="kategori-filtre" 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as Category | "")}
                >
                  <option value="">Tümü ▼</option>
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </form>
            <p id="sonuc">
              {filtered.length === 0 ? "Aramanıza uygun etkinlik bulunamadı." : `${filtered.length} etkinlik listeleniyor.`}
            </p>
            <section className="etkinlik-grid uclu">
              {filtered.map(renderCard)}
            </section>
          </>
        )}

        {page === "detail" && !selectedEvent && (
          <>
            <div style={{ background: "#f8d7da", color: "#721c24", padding: "1rem", borderRadius: "8px", border: "1px solid #f5c6cb", marginBottom: "1rem" }}>
              "{selectedId}" numaralı bir etkinlik yok. Listeden bir etkinlik seçin.
            </div>
            <a href="#" onClick={(e) => { e.preventDefault(); go("events"); }} style={{ display: "inline-block", background: "var(--renk-ana)", color: "white", padding: "0.5rem 1rem", textDecoration: "none", borderRadius: "4px" }}>&larr; Listeye dön</a>
          </>
        )}

        {page === "detail" && selectedEvent && (
          <article className="detay-grid">
            {selectedEvent.image && (
              <figure>
                <img src={`/${selectedEvent.image}`} alt={`${selectedEvent.title} görseli`} />
              </figure>
            )}
            <div>
              <h2>{selectedEvent.title}</h2>
              <dl>
                <dt>Tarih</dt>
                <dd>{formatDate(selectedEvent.date)}, {selectedEvent.time}</dd>
                <dt>Yer</dt>
                <dd>{selectedEvent.location}</dd>
                <dt>Kategori</dt>
                <dd>{selectedEvent.category}</dd>
                <dt>Kontenjan</dt>
                <dd>{selectedEvent.capacity ? `${selectedEvent.capacity} kişi` : 'Sınırsız'}</dd>
              </dl>
              <p>{selectedEvent.description}</p>
              <br />
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <a href="#" onClick={(e) => { e.preventDefault(); go("events"); }} style={{ background: "var(--renk-ana)", color: "white", padding: "0.5rem 1rem", textDecoration: "none", borderRadius: "4px" }}>&larr; Listeye dön</a>
                <a href="#" onClick={(e) => { e.preventDefault(); go("update", selectedEvent.id); }} style={{ background: "#28a745", color: "white", padding: "0.5rem 1rem", textDecoration: "none", borderRadius: "4px" }}>Bu etkinliği güncelle</a>
              </div>
            </div>
          </article>
        )}

        {(page === "add" || page === "update") && (
          <>
            {page === "update" && !selectedEvent ? (
              <>
                <div style={{ background: "#f8d7da", color: "#721c24", padding: "1rem", borderRadius: "8px", border: "1px solid #f5c6cb", marginBottom: "1rem" }}>
                  Güncellenecek etkinlik seçilmedi.
                </div>
                <a href="#" onClick={(e) => { e.preventDefault(); go("events"); }} style={{ display: "inline-block", background: "var(--renk-ana)", color: "white", padding: "0.5rem 1rem", textDecoration: "none", borderRadius: "4px" }}>Etkinliklere git</a>
              </>
            ) : (
              <>
                <p style={{ marginBottom: "1rem", color: "#666" }}>Bu sprintte form sadece görünüm; kayıt yapılmaz.</p>
                <form className="form" onSubmit={(e) => e.preventDefault()}>
                  <div className="form-grup">
                    <label htmlFor="title">Etkinlik Adı *</label>
                    <input type="text" id="title" maxLength={80} defaultValue={page === "update" ? selectedEvent?.title : ""} />
                  </div>
                  <div className="form-grup">
                    <label htmlFor="category">Kategori *</label>
                    <select id="category" defaultValue={page === "update" ? selectedEvent?.category : ""}>
                      <option value="">Seçiniz ▼</option>
                      <option value="Seminer">Seminer</option>
                      <option value="Atölye">Atölye</option>
                      <option value="Söyleşi">Söyleşi</option>
                    </select>
                  </div>
                  <div className="form-grup">
                    <label htmlFor="date">Tarih *</label>
                    <input type="date" id="date" defaultValue={page === "update" ? selectedEvent?.date : ""} />
                  </div>
                  <div className="form-grup">
                    <label htmlFor="time">Saat *</label>
                    <input type="time" id="time" defaultValue={page === "update" ? selectedEvent?.time : ""} />
                  </div>
                  <div className="form-grup">
                    <label htmlFor="location">Yer *</label>
                    <input type="text" id="location" defaultValue={page === "update" ? selectedEvent?.location : ""} />
                  </div>
                  <div className="form-grup">
                    <label htmlFor="capacity">Kontenjan</label>
                    <input type="number" id="capacity" defaultValue={page === "update" ? (selectedEvent?.capacity || "") : ""} />
                  </div>
                  <div className="form-grup">
                    <label htmlFor="description">Açıklama</label>
                    <textarea id="description" rows={5} defaultValue={page === "update" ? selectedEvent?.description : ""}></textarea>
                  </div>
                  <button type="submit">{page === "update" ? "Güncelle" : "Kaydet"}</button>
                </form>
              </>
            )}
          </>
        )}
      </main>
      
      <footer>
        <p>&copy; Muhammet Gazi Kuruş &middot; 2026</p>
      </footer>
    </>
  );
}