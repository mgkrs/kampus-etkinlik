import { Link } from "react-router-dom";
import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventCardProps {
  event: CampusEvent;
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <article className="kart">
      <h3>{event.title}</h3>
      <p>{event.category}</p>
      <p><time>{formatDate(event.date)}, {event.time}</time></p>
      <p>{event.location}</p>
      <Link to={`/events/${event.id}`} className="detay-link">
        Detayları gör &rarr;
      </Link>
    </article>
  );
}