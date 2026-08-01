import type { ConfusablePair } from "../types";

export const confusablePairs: ConfusablePair[] = [
  {
    id: "onaylama-vs-regresyon",
    title: "Onaylama Testi vs Regresyon Testi",
    chapter: 2,
    points: [
      "Onaylama: \"Düzelttiğim hata gerçekten düzeldi mi?\" → aynı arızayı tetikleyen testi tekrar çalıştır",
      "Regresyon: \"Bu değişiklik başka bir yeri bozdu mu?\" → etkilenebilecek diğer alanları test et",
      "İkisi birlikte yapılır ama amaçları farklıdır.",
    ],
  },
  {
    id: "ep-vs-bva",
    title: "Denklik Paylarına Ayırma (EP) vs Sınır Değer Analizi (BVA)",
    chapter: 4,
    points: [
      "EP: veriyi gruplara (paylara) ayır, her gruptan 1 temsilci test yeterli",
      "BVA: sadece sıralı paylarda, payların sınırlarına (min/max) odaklan çünkü hatalar orada yoğunlaşır",
      "BVA, EP'nin üzerine kurulur — önce EP ile paylar belirlenir, sonra BVA ile sınırlar test edilir.",
    ],
  },
  {
    id: "2-vs-3-degerli-bva",
    title: "2 Değerli vs 3 Değerli Sınır Değer Analizi",
    chapter: 4,
    points: [
      "2 değerli: sınır + 1 komşu (toplam 2 nokta)",
      "3 değerli: sınır + 2 komşu (toplam 3 nokta) → daha titiz, x≤10 yerine yanlışlıkla x=10 yazılan hataları yakalar",
    ],
  },
  {
    id: "statement-vs-branch",
    title: "Komut (Statement) Kapsamı vs Dal (Branch) Kapsamı",
    chapter: 4,
    points: [
      "Komut kapsamı: her satırın en az 1 kez çalışması",
      "Dal kapsamı: her karar çıktısının (true/false) en az 1 kez denenmesi",
      "%100 dal kapsamı otomatik olarak %100 komut kapsamını garanti eder — ama tersi DOĞRU DEĞİL.",
    ],
  },
  {
    id: "durum-gecisi-kapsamlari",
    title: "Tüm Durumlar / Geçerli Geçişler / Tüm Geçişler Kapsamı",
    chapter: 4,
    points: [
      "Tüm durumlar kapsamı: en zayıf (sadece durumların çalıştığını görür)",
      "Geçerli geçişler kapsamı (0-anahtar): en yaygın kullanılan, geçerli geçişlerin tamamını dener",
      "Tüm geçişler kapsamı: geçersiz geçişleri de dener, kritik/emniyet sistemlerinde minimum gereksinim",
      "Geçerli geçişlerin tamamına ulaşmak, tüm durumlar kapsamının tamamına ulaşmayı garanti eder.",
    ],
  },
  {
    id: "statik-vs-dinamik",
    title: "Statik Test vs Dinamik Test",
    chapter: 3,
    points: [
      "Statik: kod çalıştırılmaz (gözden geçirme, statik analiz), hatayı doğrudan bulur",
      "Dinamik: kod çalıştırılır, arızayı tetikler, hata sonradan analizle bulunur",
    ],
  },
  {
    id: "test-vs-kg",
    title: "Test Etme vs Kalite Güvence (KG)",
    chapter: 1,
    points: [
      "Test = ürün odaklı, düzeltici",
      "KG = süreç odaklı, önleyici (projedeki HERKESİN sorumluluğu)",
    ],
  },
  {
    id: "test-yonetimi-vs-test-etme",
    title: "Test Yönetimi Rolü vs Test Etme Rolü",
    chapter: 1,
    points: [
      "Test yönetimi: planlama, gözetim/kontrol, tamamlama (liderlik)",
      "Test etme: analiz, tasarım, uyarlama, koşum (teknik/mühendislik)",
      "Çevik'te bazı yönetim görevleri ekip tarafından üstlenilebilir.",
    ],
  },
  {
    id: "gozden-gecirme-cesitleri",
    title: "Gözden Geçirme Çeşitleri (resmiyet artan sıra)",
    chapter: 3,
    points: [
      "Gayri resmi → Üzerinden geçme → Teknik gözden geçirme → Teftiş",
      "Teftiş en resmi olanıdır: maksimum anomali bulma hedefi vardır, yazar lider veya katip OLAMAZ.",
    ],
  },
  {
    id: "proje-vs-urun-riski",
    title: "Proje Riski vs Ürün Riski",
    chapter: 5,
    points: [
      "Proje riski: projeyi yönetme/kontrol etmeyle ilgili (bütçe, personel, tedarikçi)",
      "Ürün riski: ürünün kalite karakteristiğiyle ilgili (hatalı hesaplama, güvenlik açığı, kötü performans)",
    ],
  },
  {
    id: "ilerleme-vs-tamamlama-raporu",
    title: "Test İlerleme Raporu vs Test Tamamlama Raporu",
    chapter: 5,
    points: [
      "İlerleme raporu: düzenli/sık (günlük, haftalık), devam eden kontrolü destekler",
      "Tamamlama raporu: bir kez, kilometre taşında (proje/seviye/döngü bitince)",
    ],
  },
  {
    id: "hata-tahmini-vs-kesif-vs-kontrol-listesi",
    title: "Hata Tahminleme vs Keşif Testi vs Kontrol Listesine Dayalı Test",
    chapter: 4,
    points: [
      "Hata tahminleme: geçmiş tecrübeyle \"nerede hata olabilir\" tahmini yap, hedefli testler tasarla",
      "Keşif testi: test tasarımı + koşumu + öğrenme eş zamanlı, gereksinim az/yetersizken kullanışlı",
      "Kontrol listesine dayalı: soru formatında bir listeye göre test et, ayrıntılı senaryo yoksa yol gösterici",
    ],
  },
  {
    id: "tdd-vs-atdd-vs-bdd",
    title: "TDD vs ATDD vs BDD",
    chapter: 2,
    points: [
      "TDD: kod → test odaklı, testler kodlamayı yönlendirir (birim seviyesi)",
      "ATDD: kabul kriterlerinden testler türetilir, ekip birlikte yazar (müşteri + geliştirici + test)",
      "BDD: Given/When/Then formatında doğal dil, davranış odaklı",
    ],
  },
  {
    id: "piramit-vs-ceyrekler",
    title: "Test Piramidi vs Test Çeyrekleri",
    chapter: 2,
    points: [
      "Piramit: testleri otomasyon seviyesi/hıza göre katmanlara ayırır (birim → servis → UI)",
      "Çeyrekler: testleri iş/teknoloji odaklı ve destekleyici/eleştirel eksenlerinde 4 gruba ayırır (Q1-Q4)",
    ],
  },
  {
    id: "giris-vs-cikis-kriterleri",
    title: "Giriş Kriterleri vs Çıkış Kriterleri",
    chapter: 5,
    points: [
      "Giriş: bir aktivite başlamadan ÖNCE karşılanması gerekenler (Hazır Tanımı)",
      "Çıkış: aktivite TAMAMLANMIŞ sayılması için gerekenler (Tamamlandı Tanımı)",
    ],
  },
];
