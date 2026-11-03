import type { CampusEvent } from "../types/campus-event";

export const events: CampusEvent[] = [
  {
    id: "event-1",
    title: "Geleceğin Yazılımcıları Semineri",
    category: "Seminer",
    date: "2026-11-15",
    time: "10:00",
    location: "SDÜ Prof. Dr. M. Lütfü Çakmakçı Kültür Merkezi, Isparta",
    capacity: 500,
    description: "Yapay zeka ve yazılım dünyasındaki yeni trendler üzerine vizyon açıcı bir seminer.",
    image: "sdu.png"
  },
  {
    id: "event-2",
    title: "Bilecik'te Web 3.0 Atölyesi",
    category: "Atölye",
    date: "2026-11-20",
    time: "14:00",
    location: "Bilecik Şeyh Edebali Üniversitesi Bilgisayar Lab",
    capacity: 40,
    description: "Uygulamalı Web 3.0, Blockchain temelleri ve Akıllı Kontrat geliştirme atölyesi.",
    image: "afis.jpg"
  },
  {
    id: "event-3",
    title: "Gül Hasadı ve Tarım Teknolojileri",
    category: "Söyleşi",
    date: "2026-11-25",
    time: "15:30",
    location: "Isparta Meydan AVM Etkinlik Alanı",
    capacity: null,
    description: "Geleneksel gül tarımı ile IoT (Nesnelerin İnterneti) teknolojilerinin buluşması üzerine keyifli bir sohbet.",
    image: "sdu.png"
  },
  {
    id: "event-4",
    title: "Ulusal Kodlama Yarışması (Hackathon)",
    category: "Yarışma",
    date: "2026-12-01",
    time: "09:00",
    location: "Türkiye Geneli (Online Katılım)",
    capacity: null,
    description: "48 saat sürecek kesintisiz hackathon heyecanı. Takımını kur, projeni geliştir, büyük ödülü kazan!",
    image: "afis.jpg"
  },
  {
    id: "event-5",
    title: "Bilecik Tarihi ve Dijitalleşme",
    category: "Seminer",
    date: "2026-12-05",
    time: "13:00",
    location: "Bilecik Belediyesi Kültür Kongre Merkezi",
    capacity: 200,
    description: "Kuruluşun şehri Bilecik'in tarihi mirasının dijital ortama ve Metaverse'e aktarılması üzerine seminer.",
    image: "sdu.png"
  },
  {
    id: "event-6",
    title: "Isparta Siber Güvenlik Zirvesi",
    category: "Söyleşi",
    date: "2026-12-10",
    time: "11:00",
    location: "SDÜ Mühendislik Fakültesi E-Blok Amfi",
    capacity: 150,
    description: "Sektörün önde gelen siber güvenlik uzmanlarıyla siber tehditler ve kariyer üzerine soru-cevap etkinliği.",
    image: "sdu.png"
  },
  {
    id: "event-7",
    title: "React ile Frontend Atölyesi",
    category: "Atölye",
    date: "2026-12-15",
    time: "10:00",
    location: "SDÜ Bilgisayar Mühendisliği Lab 1",
    capacity: 30,
    description: "Sıfırdan React öğreniyoruz. Kendi kişisel web siteni geliştirmek için bilgisayarını al ve gel.",
    image: "afis.jpg"
  },
  {
    id: "event-8",
    title: "Bilecik Oyun Geliştirme Yarışması",
    category: "Yarışma",
    date: "2026-12-20",
    time: "10:00",
    location: "Bilecik Teknopark",
    capacity: 100,
    description: "En iyi Indie (Bağımsız) oyunu sen yap, jüriyi etkile ve yatırımcılarla buluşma şansı yakala!",
    image: "afis.jpg"
  }
];