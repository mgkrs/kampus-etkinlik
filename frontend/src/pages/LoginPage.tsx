import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const found: { email?: string; password?: string } = {};
    if (!email.includes("@")) found.email = "Geçerli bir e-posta girin.";
    if (password.length < 6) found.password = "Şifre en az 6 karakter olmalı.";
    
    setErrors(found);
    setSent(Object.keys(found).length === 0);
  }

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h2>Giriş Yap</h2>
      <form className="form" onSubmit={handleSubmit} noValidate>
        <div className="form-grup">
          <label>E-posta</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} aria-invalid={errors.email ? true : undefined} />
          <span className="hata-metni">{errors.email}</span>
        </div>
        <div className="form-grup">
          <label>Şifre</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} aria-invalid={errors.password ? true : undefined} />
          <span className="hata-metni">{errors.password}</span>
        </div>
        <button type="submit">Giriş yap</button>
      </form>
      {sent && <p style={{ color: "green", marginTop: "1rem" }}>Gerçek giriş Sprint 10'da</p>}
      <div style={{ marginTop: "1rem", fontSize: "0.9rem" }}>
        <Link to="/forgot-password">Şifremi unuttum</Link> &middot; <Link to="/register">Kayıt ol</Link>
      </div>
    </div>
  );
}