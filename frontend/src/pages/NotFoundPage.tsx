import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div style={{ textAlign: "center", padding: "3rem 0" }}>
      <h2>Sayfa bulunamadı</h2>
      <p style={{ margin: "1rem 0" }}>Aradığınız sayfa ya da etkinlik yok.</p>
      <Link to="/" style={{ background: "var(--renk-ana)", color: "white", padding: "0.7rem 1.5rem", textDecoration: "none", borderRadius: "4px", display: "inline-block" }}>Ana sayfaya dön</Link>
    </div>
  );
}