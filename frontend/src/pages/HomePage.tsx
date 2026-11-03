import { Link } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import EventList from "../components/events/EventList";

export default function HomePage() {
  const { events } = useEvents();
  const upcoming = [...events].sort((a, b) => a.date.localeCompare(b.date)).slice(0, 2);

  return (
    <>
      <br /><h2>Yaklaşan 2 etkinlik</h2><br />
      <section className="etkinlik-grid ikili">
        <EventList events={upcoming} emptyText="Yaklaşan etkinlik yok." />
      </section>
      <Link to="/events" style={{ color: "var(--renk-ana)", fontWeight: "bold", textDecoration: "none" }}>
        Tüm etkinlikleri gör &rarr;
      </Link>
    </>
  );
}