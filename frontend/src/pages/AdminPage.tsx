import { Link } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import { formatDate } from "../utils/format-date";

export default function AdminPage() {
  const { events, deleteEvent } = useEvents();

  function handleDelete(id: string, title: string) {
    if (window.confirm(`"${title}" silinsin mi?`)) {
      deleteEvent(id);
    }
  }

  return (
    <>
      <h2>Etkinlik Yönetimi</h2>
      <br />
      <Link to="/admin/new" style={{ background: "#28a745", color: "white", padding: "0.5rem 1rem", textDecoration: "none", borderRadius: "4px", display: "inline-block", marginBottom: "1rem" }}>+ Yeni etkinlik</Link>
      
      {events.length === 0 ? (
        <p>Henüz etkinlik yok.</p>
      ) : (
        <table className="tablo">
          <thead>
            <tr>
              <th>Etkinlik</th>
              <th>Tarih</th>
              <th>Kategori</th>
              <th>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {events.map(event => (
              <tr key={event.id}>
                <td data-baslik="Etkinlik: ">{event.title}</td>
                <td data-baslik="Tarih: ">{formatDate(event.date)}</td>
                <td data-baslik="Kategori: ">{event.category}</td>
                <td className="islemler">
                  <Link to={`/admin/${event.id}/edit`} style={{ background: "#28a745", color: "white", padding: "0.4rem 0.8rem", textDecoration: "none", borderRadius: "4px", marginRight: "0.5rem" }}>Düzenle</Link>
                  <button className="buton-sil" onClick={() => handleDelete(event.id, event.title)} style={{ padding: "0.4rem 0.8rem", width: "auto" }}>Sil</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}