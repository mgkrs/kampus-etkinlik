import { useState, useEffect } from "react";
import "./App.css";
import type { Category } from "./types/campus-event";
import type { PageName } from "./types/page";
import { events } from "./data/events";
import { searchEvents, filterByCategory, findEventById } from "./utils/filter-events";

import Header from "./components/layout/Header";
import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";
import EventList from "./components/events/EventList";
import EventFilter from "./components/events/EventFilter";
import EventDetail from "./components/events/EventDetail";
import EventForm from "./components/forms/EventForm";

export default function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | "">("");

  function go(next: PageName, id: string | null = null) {
    setPage(next); setSelectedId(id); window.scrollTo(0, 0);
  }

  const upcoming = [...events].sort((a, b) => a.date.localeCompare(b.date)).slice(0, 2);
  const filtered = filterByCategory(searchEvents(events, searchText), selectedCategory);
  const selectedEvent = selectedId ? findEventById(events, selectedId) : undefined;
  const categories = [...new Set(events.map(e => e.category))] as Category[];

  let headerTitle = "Kampüs Etkinlikleri";
  let headerText = "";
  if (page === "home") headerText = "Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.";
  else if (page === "events") headerTitle = "Tüm Etkinlikler";
  else if (page === "add") headerTitle = "Etkinlik Ekle";
  else if (page === "update") headerTitle = "Etkinlik Güncelle";
  else if (page === "detail" && selectedEvent) headerTitle = selectedEvent.title;

  useEffect(() => { document.title = `Kampüs Etkinlikleri — ${headerTitle}`; }, [headerTitle]);

  return (
    <>
      <Header title={headerTitle} text={headerText}>
        <Navigation current={page} onNavigate={go} />
      </Header>
      
      <main>
        {page === "home" && (
          <>
            <br /><h2>Yaklaşan 2 etkinlik</h2><br />
            <section className="etkinlik-grid ikili">
              <EventList events={upcoming} onShowDetail={(id) => go("detail", id)} emptyText="Yok." />
            </section>
            <a href="#" onClick={(e) => { e.preventDefault(); go("events"); }} style={{ color: "var(--renk-ana)", fontWeight: "bold", textDecoration: "none" }}>Tüm etkinlikleri gör &rarr;</a>
          </>
        )}

        {page === "events" && (
          <>
            <EventFilter searchText={searchText} category={selectedCategory} categories={categories} onSearchChange={setSearchText} onCategoryChange={setSelectedCategory} />
            <p id="sonuc">
              {filtered.length === 0 ? "Aramanıza uygun etkinlik bulunamadı." : `${filtered.length} etkinlik listeleniyor.`}
            </p>
            <section className="etkinlik-grid uclu">
              <EventList events={filtered} onShowDetail={(id) => go("detail", id)} emptyText="" />
            </section>
          </>
        )}

        {page === "detail" && (
          selectedEvent 
            ? <EventDetail event={selectedEvent} onBack={() => go("events")} onEdit={(id) => go("update", id)} />
            : <div className="kart"><p>Etkinlik bulunamadı.</p><button onClick={() => go("events")}>Geri</button></div>
        )}

        {(page === "add" || page === "update") && (
          (page === "update" && !selectedEvent) 
            ? <div className="kart"><p>Seçili etkinlik yok.</p><button onClick={() => go("events")}>Geri</button></div>
            : <EventForm mode={page} event={selectedEvent} onSubmit={() => window.scrollTo(0, 0)} />
        )}
      </main>
      
      <Footer />
    </>
  );
}