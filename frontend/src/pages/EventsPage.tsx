import { useState } from "react";
import { useEvents } from "../context/EventsContext";
import EventFilter from "../components/events/EventFilter";
import EventList from "../components/events/EventList";
import { searchEvents, filterByCategory } from "../utils/filter-events";
import type { Category } from "../types/campus-event";

export default function EventsPage() {
  const { events } = useEvents();
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  const categories = [...new Set(events.map(e => e.category))] as Category[];
  const filtered = filterByCategory(searchEvents(events, searchText), category);

  return (
    <>
      <EventFilter searchText={searchText} category={category} categories={categories} onSearchChange={setSearchText} onCategoryChange={setCategory} />
      <p id="sonuc">{filtered.length === 0 ? "Aramanıza uygun etkinlik bulunamadı." : `${filtered.length} etkinlik listeleniyor.`}</p>
      <section className="etkinlik-grid uclu">
        <EventList events={filtered} emptyText="" />
      </section>
    </>
  );
}