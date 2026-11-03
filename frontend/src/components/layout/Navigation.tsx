import { NavLink } from "react-router-dom";

export default function Navigation() {
  const menu = [
    { to: "/", label: "Ana Sayfa" },
    { to: "/events", label: "Etkinlikler" },
    { to: "/admin", label: "Yönetim" },
    { to: "/login", label: "Giriş" },
  ];

  return (
    <nav>
      {menu.map((item, index) => (
        <span key={item.to}>
          <NavLink to={item.to} end={item.to === "/"}>
            {item.label}
          </NavLink>
          {index < menu.length - 1 && " · "}
        </span>
      ))}
    </nav>
  );
}