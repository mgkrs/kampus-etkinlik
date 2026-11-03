import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

interface RegisterErrors { name?: string; email?: string; password?: string; password4?: string; }

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password4, setPassword4] = useState("");
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const found: RegisterErrors = {};
    if (name.trim().length < 3) found.name = "En az 3 karakter.";
    if (!email.includes("@")) found.email = "Geçerli bir e-posta girin.";
    if (password.length < 6) found.password = "Şifre en az 6 karakter olmalı.";
    if (password !== password4) found.password4 = "Şifreler aynı değil.";
    
    setErrors(found);
    setSent(Object.keys(found).length === 0);
  }

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h2>Kayıt Ol</h2>
      <form className="form" onSubmit={handleSubmit} noValidate>
        <div className="form-grup">
          <label>Ad Soyad</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} aria-invalid={errors.name ? true : undefined} />
          <span className="hata-metni">{errors.name}</span>
        </div>
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
        <div className="form-grup">
          <label>Şifre (tekrar)</label>
          <input type="password" value={password4} onChange={e => setPassword4(e.target.value)} aria-invalid={errors.password4 ? true : undefined} />
          <span className="hata-metni">{errors.password4}</span>
        </div>
        <button type="submit">Kayıt ol</button>
      </form>
      {sent && <p style={{ color: "green", marginTop: "1rem" }}>Kayıt başarılı (demo)</p>}
      <div style={{ marginTop: "1rem", fontSize: "0.9rem" }}>
        <Link to="/login">Zaten hesabın var mı? Giriş yap</Link>
      </div>
    </div>
  );
}