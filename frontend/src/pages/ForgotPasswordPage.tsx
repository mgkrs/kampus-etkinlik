import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) {
      setError("Geçerli bir e-posta girin.");
      setSent(false);
    } else {
      setError("");
      setSent(true);
    }
  }

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h2>Şifremi Unuttum</h2>
      <p style={{ marginBottom: "1rem" }}>Kayıtlı e-posta adresinizi yazın, şifre yenileme bağlantısı gönderelim.</p>
      
      {sent && <p style={{ background: "#d4edda", color: "#155724", padding: "1rem", borderRadius: "4px", marginBottom: "1rem" }}>Bağlantı {email} adresine gönderildi (demo).</p>}
      
      <form className="form" onSubmit={handleSubmit} noValidate>
        <div className="form-grup">
          <label>E-posta</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} aria-invalid={error ? true : undefined} />
          <span className="hata-metni">{error}</span>
        </div>
        <button type="submit">Bağlantı gönder</button>
      </form>
      <div style={{ marginTop: "1rem", fontSize: "0.9rem" }}>
        <Link to="/login">&larr; Girişe dön</Link>
      </div>
    </div>
  );
}