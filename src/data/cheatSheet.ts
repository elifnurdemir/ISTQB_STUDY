export interface FormulaCard {
  id: string;
  title: string;
  formula?: string;
  body: string[];
  note?: string;
}

export const formulaCards: FormulaCard[] = [
  {
    id: "ep",
    title: "Denklik Paylarına Ayırma (EP)",
    body: [
      "Örnek: sistem 18-65 yaş arası kullanıcıları kabul eder → geçersiz (<18), geçerli (18-65), geçersiz (>65).",
      "%100 EP kapsamı: her paydan en az 1 değer test et → minimum 3 test senaryosu (ör. 10, 30, 80).",
    ],
    note: "Birden fazla parametre varsa Each Choice kapsamı her pay grubundan her payı en az 1 kez dener (kombinasyonları değil).",
  },
  {
    id: "bva",
    title: "Sınır Değer Analizi (BVA)",
    formula: "Kapsam % = (denenen sınır değer sayısı / toplam tanımlı sınır değer sayısı) × 100",
    body: [
      "Aynı örnek (18-65 yaş), sınırlar: 17, 18 (alt) ve 65, 66 (üst).",
      "2 değerli BVA: sınır + 1 komşu → 17, 18, 65, 66 (4 nokta).",
      "3 değerli BVA: sınır + 2 komşu → 17, 18, 19, 64, 65, 66 (6 nokta).",
    ],
  },
  {
    id: "decision-table",
    title: "Karar Tablosu",
    body: [
      "%100 kapsam için tüm uygulanabilir kuralları (sütunları) en az 1 kez dene.",
      "Bir sütunda hem \"Gönder\" hem \"Reddet\" aksiyonu aynı anda işaretliyse → çelişkili kural, mantık hatası.",
    ],
  },
  {
    id: "state-transition",
    title: "Durum Geçişi Testi",
    body: [
      "Tüm durumlar kapsamı: her durumu en az bir kez ziyaret et (en zayıf kriter).",
      "Geçerli geçişler kapsamı (0-anahtar): tanımlı tüm geçerli geçişleri en az 1 kez dene (en yaygın kullanılan).",
      "Tüm geçişler kapsamı: geçersiz geçişleri de dener (kritik/emniyet sistemlerinde minimum gereksinim).",
    ],
    note: "Geçerli geçişlerin tamamına ulaşmak, tüm durumlar kapsamının tamamına ulaşmayı otomatik garanti eder.",
  },
  {
    id: "statement-branch",
    title: "Komut (Statement) ve Dal (Branch) Kapsamı",
    formula: "Kapsam % = (denenen komut/dal sayısı / toplam komut/dal sayısı) × 100",
    body: [
      "Tek bir test (x=5) ile if/else yapısında %100 komut kapsamı sağlanamaz (else dalı hiç çalışmaz).",
      "%100 dal kapsamı için en az 2 test gerekir: biri true dalı, biri false dalı.",
      "Bu 2 test aynı zamanda %100 komut kapsamını da otomatik sağlar — ama tersi doğru değildir.",
    ],
  },
  {
    id: "three-point",
    title: "Üç Noktalı Tahminleme (en sık çıkan hesaplama sorusu)",
    formula: "E = (a + 4m + b) / 6      SD = (b − a) / 6",
    body: [
      "a = en iyimser tahmin, m = en olası tahmin, b = en kötümser tahmin.",
      "Örnek: a=6, m=9, b=18 → E = (6+36+18)/6 = 10, SD = (18-6)/6 = 2 → Sonuç: 10 ± 2 kişi-saat.",
    ],
  },
  {
    id: "ratio-estimation",
    title: "Oranlara Dayalı Tahminleme",
    body: [
      "Örnek: önceki projede geliştirme:test oranı 3:2. Yeni projede geliştirme eforu 600 kişi-gün.",
      "600 / 3 = 200 birim → 200 × 2 = 400 kişi-gün test eforu.",
    ],
  },
  {
    id: "risk-level",
    title: "Risk Seviyesi (Nicel Yaklaşım)",
    formula: "Risk Seviyesi = Risk Olasılığı × Risk Etkisi",
    body: ["Örnek: Olasılık=0.3, Etki=8 → Risk Seviyesi = 0.3 × 8 = 2.4.", "Yüksek risk seviyesi = önce ele alınması gereken risk."],
  },
];

export interface QuickReviewItem {
  question: string;
  answer: string;
}

export interface QuickReviewChapter {
  chapter: number;
  items: QuickReviewItem[];
}

export const quickReview: QuickReviewChapter[] = [
  {
    chapter: 1,
    items: [
      {
        question: "7 test prensibinden 3 tanesini say",
        answer:
          "Hata varlığı, %100 test imkansız, erken test, pareto ilkesi, antibiyotik direnci, bağlama bağlılık, hatasız=başarılı yanılgısı (herhangi 3'ü)",
      },
      { question: "Test analizi hangi soruya cevap verir?", answer: "\"Ne test edilecek?\"" },
      { question: "Test tasarımı hangi soruya cevap verir?", answer: "\"Nasıl test edilecek?\"" },
      {
        question: "Testin bağımsızlığının en yüksek seviyesi kim?",
        answer: "Şirket dışından test uzmanı",
      },
    ],
  },
  {
    chapter: 2,
    items: [
      {
        question: "Shift-left ne demek?",
        answer: "Testleri mümkün olduğunca erken yapmak (sonrasını ihmal etmeden)",
      },
      { question: "BDD hangi formatı kullanır?", answer: "Given/When/Then" },
      {
        question: "Regresyon testi neyi kontrol eder?",
        answer: "Değişikliğin başka yerlerde bozulma yaratıp yaratmadığını",
      },
      {
        question: "5 test seviyesini sırayla say",
        answer: "Bileşen, bileşen entegrasyon, sistem, sistem entegrasyon, kabul",
      },
    ],
  },
  {
    chapter: 3,
    items: [
      { question: "En resmi gözden geçirme çeşidi?", answer: "Teftiş" },
      {
        question: "Teftişte yazar hangi rolleri üstlenemez?",
        answer: "Gözden geçirme lideri veya katip",
      },
      { question: "Statik test kodu çalıştırır mı?", answer: "Hayır" },
      {
        question: "Gözden geçirme sürecinin 5 adımı?",
        answer: "Planlama, başlangıç, bireysel gözden geçirme, iletişim/analiz, düzeltme/raporlama",
      },
    ],
  },
  {
    chapter: 4,
    items: [
      { question: "BVA sadece hangi tür paylarda kullanılır?", answer: "Sıralı (ordered) paylarda" },
      {
        question: "En yaygın kullanılan durum geçişi kapsam kriteri?",
        answer: "Geçerli geçişler kapsamı (0-anahtar)",
      },
      { question: "%100 dal kapsamı neyi otomatik garanti eder?", answer: "%100 komut kapsamını" },
      {
        question: "INVEST neyin kısaltması?",
        answer: "Independent, Negotiable, Valuable, Estimable, Small, Testable",
      },
      { question: "3C nedir?", answer: "Card, Conversation, Confirmation" },
    ],
  },
  {
    chapter: 5,
    items: [
      { question: "3 noktalı tahminleme formülü?", answer: "E = (a+4m+b)/6" },
      { question: "Risk seviyesi formülü?", answer: "Olasılık × Etki" },
      { question: "Hazır Tanımı ne için kullanılır?", answer: "Giriş kriterleri (Çevik'te)" },
      { question: "Tamamlandı Tanımı ne için kullanılır?", answer: "Çıkış kriterleri (Çevik'te)" },
      {
        question: "Test piramidinin alt katmanı nasıl testler içerir?",
        answer: "Küçük, izole, hızlı, çok sayıda",
      },
    ],
  },
  {
    chapter: 6,
    items: [
      {
        question: "Test otomasyonunun bir riski?",
        answer: "Gerçekçi olmayan beklentiler / manuel testin daha uygun olduğu yerde araç kullanmak",
      },
      {
        question: "Test otomasyonunun bir faydası?",
        answer: "Tekrarlayan işlerde zaman tasarrufu, insan hatasını azaltma",
      },
    ],
  },
];

export const finalChecklist: string[] = [
  "7 test prensibi aklımda",
  "EP vs BVA farkını biliyorum",
  "Onaylama vs regresyon farkını biliyorum",
  "3 noktalı tahminleme formülünü elle çözebiliyorum",
  "Gözden geçirme çeşitlerini resmiyet sırasıyla sayabiliyorum",
  "Test seviyelerini (5) ve test çeşitlerini (4) karıştırmıyorum",
  "Risk seviyesi = olasılık × etki formülünü biliyorum",
];

export interface ExamStrategyRow {
  exam: string;
  target: string;
}

export const examStrategy: ExamStrategyRow[] = [
  { exam: "A (kısmi)", target: "Çözdüğün soruların en az %70'i doğru" },
  { exam: "B", target: "24-28 / 40" },
  { exam: "C", target: "28-32 / 40" },
  { exam: "D", target: "32+ / 40" },
];
