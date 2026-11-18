# Kampüs Etkinlikleri - Backend API

Bu proje Express.js, MongoDB ve Mongoose kullanılarak geliştirilmiş REST API sunucusudur.

## Kurulum ve Çalıştırma

```bash
cd backend
npm install
npm run seed
npm run dev
```

## REST Sözleşmesi

| Method | Endpoint | Amaç | Başarılı | Hata | Durum |
| :--- | :--- | :--- | :--- | :--- | :--- |
| GET | `/health` | Sunucu durumu | 200 | - | Sprint 7 |
| GET | `/events` | Listeyi getir | 200 | - | Sprint 8 (MongoDB) |
| GET | `/events/:id` | Tek etkinlik | 200 | 404 | Sprint 8 (MongoDB) |
| POST | `/events` | Yeni etkinlik | 201 | 400 | Sprint 8 (MongoDB) |
| PATCH | `/events/:id` | Güncelle | 200 | 400, 404 | Sprint 9 |
| DELETE | `/events/:id` | Sil | 204 | 404 | Sprint 9 |

**Hata Formatı:**
```json
{
  "error": {
    "message": "Hata mesajı burada yer alır"
  }
}
```