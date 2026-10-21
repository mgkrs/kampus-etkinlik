import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventCardProps {
  event: CampusEvent;
  onShowDetail: (id: string) => void;
}

export default function EventCard({ event, onShowDetail }: EventCardProps) {
  return (
    <article className="kart">
      <h3>{event.title}</h3>
      <p>{event.category}</p>
      <p><time>{formatDate(event.date)}, {event.time}</time></p>
      <p>{event.location}</p>
      <a 
        href="#" 
        className="detay-link" 
        onClick={(e) => { e.preventDefault(); onShowDetail(event.id); }}
      >
        Detayları gör &rarr;
      </a>
    </article>
  );
}