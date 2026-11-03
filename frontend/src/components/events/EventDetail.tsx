import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventDetailProps {
  event: CampusEvent;
}

export default function EventDetail({ event }: EventDetailProps) {
  return (
    <article className="detay-grid">
      {event.image && (
        <figure>
          <img src={`/${event.image}`} alt={`${event.title} görseli`} />
        </figure>
      )}
      <div>
        <dl>
          <dt>Tarih</dt>
          <dd>{formatDate(event.date)}, {event.time}</dd>
          <dt>Yer</dt>
          <dd>{event.location}</dd>
          <dt>Kategori</dt>
          <dd>{event.category}</dd>
          <dt>Kontenjan</dt>
          <dd>{event.capacity ? `${event.capacity} kişi` : 'Sınırsız'}</dd>
        </dl>
        <p>{event.description}</p>
      </div>
    </article>
  );
}