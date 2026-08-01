# ISTQB Study

ISTQB Foundation Level sınavına hazırlık için geliştirilmiş, tarayıcıda çalışan bir çalışma ve pratik uygulaması.

## Özellikler

- **Dashboard** — genel ilerleme özeti ve hızlı navigasyon
- **Modül Bazlı Quiz** — bölüm/chapter seçerek pratik sorular çözme
- **Sınav Simülasyonu** — süreli, gerçek sınav formatında deneme
- **Yanlışlar Bankası (Mistakes Bank)** — daha önce yanlış cevaplanan soruların tekrarı
- **Analytics** — günlük ilerleme ve doğru/yanlış istatistikleri
- **Sözlük (Glossary)** — ISTQB terimleri ve tanımları
- **Cheat Sheet** — bölüm bazlı özet notlar ve karıştırılan kavram çiftleri
- **Audio Coach** — sesli anlatım/pratik modu
- **Pomodoro Widget** — çalışma sırasında zaman yönetimi
- Karanlık/aydınlık tema desteği

## Teknolojiler

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Oxlint](https://oxc.rs/) (linting)
- [lucide-react](https://lucide.dev/) (ikonlar)

Veriler (`src/data/`) tarayıcının yerel depolamasında (localStorage) tutulur; ayrı bir backend gerekmez.

## Kurulum

```bash
npm install
```

## Kullanım

```bash
npm run dev       # geliştirme sunucusu
npm run build     # production build (dist/)
npm run preview   # build çıktısını yerelde önizleme
npm run lint      # Oxlint ile kod kontrolü
```

## Proje Yapısı

```
src/
  components/   # Sidebar, QuizContainer, Timer, Flashcard vb.
  pages/        # Dashboard, ModuleSelect, ExamIntro, Analytics, Glossary, CheatSheet, AudioCoach, MistakesBank
  context/      # StatsContext (istatistik durum yönetimi)
  hooks/        # useTheme, usePomodoro, useQuizStats, useFlashcardProgress, useSpeech
  data/         # sorular, syllabus, sözlük, cheat sheet içerikleri
  lib/          # storage ve zorluk seviyesi yardımcı fonksiyonları
```
