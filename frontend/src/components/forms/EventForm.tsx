import type { CampusEvent } from "../../types/campus-event";

interface EventFormProps {
  onSubmit: () => void;
  event?: CampusEvent;
  mode: "add" | "update";
}

export default function EventForm({ onSubmit, event, mode }: EventFormProps) {
  return (
    <>
      <p style={{ marginBottom: "1rem", color: "#666" }}>Bu sprintte form sadece görünüm; kayıt yapılmaz.</p>
      <form className="form" onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
        <div className="form-grup">
          <label htmlFor="title">Etkinlik Adı *</label>
          <input type="text" id="title" maxLength={80} defaultValue={mode === "update" ? event?.title : ""} />
        </div>
        <div className="form-grup">
          <label htmlFor="category">Kategori *</label>
          <select id="category" defaultValue={mode === "update" ? event?.category : ""}>
            <option value="">Seçiniz ▼</option>
            <option value="Seminer">Seminer</option>
            <option value="Atölye">Atölye</option>
            <option value="Söyleşi">Söyleşi</option>
          </select>
        </div>
        <div className="form-grup">
          <label htmlFor="date">Tarih *</label>
          <input type="date" id="date" defaultValue={mode === "update" ? event?.date : ""} />
        </div>
        <div className="form-grup">
          <label htmlFor="time">Saat *</label>
          <input type="time" id="time" defaultValue={mode === "update" ? event?.time : ""} />
        </div>
        <div className="form-grup">
          <label htmlFor="location">Yer *</label>
          <input type="text" id="location" defaultValue={mode === "update" ? event?.location : ""} />
        </div>
        <div className="form-grup">
          <label htmlFor="capacity">Kontenjan</label>
          <input type="number" id="capacity" defaultValue={mode === "update" ? (event?.capacity || "") : ""} />
        </div>
        <div className="form-grup">
          <label htmlFor="description">Açıklama</label>
          <textarea id="description" rows={5} defaultValue={mode === "update" ? event?.description : ""}></textarea>
        </div>
        <button type="submit">{mode === "update" ? "Güncelle" : "Kaydet"}</button>
      </form>
    </>
  );
}