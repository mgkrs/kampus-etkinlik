import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventDetailProps {
  event: CampusEvent;
  onBack: () => void;
  onEdit: (id: string) => void;
}

export default function EventDetail({ event, onBack, onEdit }: EventDetailProps) {
  return (
    <article className="detay-grid">
      {event.image && (
        <figure>
          <img src={`/${event.image}`} alt={`${event.title} görseli`} />
        </figure>
      )}
      <div>
        <h2>{event.title}</h2>
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
        <br />
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); onBack(); }} 
            style={{ background: "var(--renk-ana)", color: "white", padding: "0.5rem 1rem", textDecoration: "none", borderRadius: "4px" }}
          >
            &larr; Listeye dön
          </a>
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); onEdit(event.id); }} 
            style={{ background: "#28a745", color: "white", padding: "0.5rem 1rem", textDecoration: "none", borderRadius: "4px" }}
          >
            Bu etkinliği güncelle
          </a>
        </div>
      </div>
    </article>
  );
}