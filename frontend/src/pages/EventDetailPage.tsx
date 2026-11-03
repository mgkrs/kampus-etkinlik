import { useParams, Link } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import { findEventById } from "../utils/filter-events";
import EventDetail from "../components/events/EventDetail";
import NotFoundPage from "./NotFoundPage";

export default function EventDetailPage() {
  const { id } = useParams();
  const { events } = useEvents();
  const event = findEventById(events, id ?? "");

  if (!event) return <NotFoundPage />;

  return (
    <>
      <h2>{event.title}</h2>
      <EventDetail event={event} />
      <br />
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <Link to="/events" style={{ background: "var(--renk-ana)", color: "white", padding: "0.5rem 1rem", textDecoration: "none", borderRadius: "4px" }}>&larr; Listeye dön</Link>
        <Link to={`/admin/${event.id}/edit`} style={{ background: "#28a745", color: "white", padding: "0.5rem 1rem", textDecoration: "none", borderRadius: "4px" }}>Bu etkinliği güncelle</Link>
      </div>
    </>
  );
}