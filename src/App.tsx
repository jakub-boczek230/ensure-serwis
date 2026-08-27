import { useEffect, useState, type FormEvent } from 'react';
import {
  ArrowRight,
  Briefcase,
  Camera,
  ClipboardCheck,
  Clock,
  FileText,
  Globe2,
  Loader2,
  Mail,
  MapPin,
  Menu,
  PackageSearch,
  Phone,
  Send,
  ShieldCheck,
  Truck,
  Wrench,
  X,
  type LucideIcon,
} from 'lucide-react';
import PrivacyPolicy from './PrivacyPolicy';

type Language = 'pl' | 'en';

type NavKey = 'start' | 'services' | 'expert' | 'gallery' | 'process' | 'faq' | 'contact';
type FaqKey = 'cost' | 'afterCollision' | 'duration' | 'appeal' | 'area' | 'documents';
type ServiceKey =
  | 'liability'
  | 'estimates'
  | 'inspection'
  | 'repair'
  | 'trucks'
  | 'business'
  | 'international'
  | 'loading';
type ProcessKey = 'contact' | 'documentation' | 'formalities' | 'repair';
type GalleryKey = 'claim' | 'inspection' | 'repair';
type ClaimTypeKey =
  | 'thirdPartyLiability'
  | 'comprehensive'
  | 'estimate'
  | 'inspection'
  | 'accidentRepair'
  | 'businessFleet'
  | 'international'
  | 'loading'
  | 'other';

type Translation = {
  meta: {
    title: string;
    description: string;
  };
  nav: Record<NavKey, string>;
  hero: {
    owner: string;
    brandFirst: string;
    brandSecond: string;
    headline: string;
    description: string;
    call: string;
    report: string;
    taxId: string;
  };
  servicesIntro: {
    label: string;
    title: string;
    description: string;
  };
  services: Record<ServiceKey, { title: string; description: string }>;
  gallery: {
    label: string;
    title: string;
  };
  galleryItems: Record<GalleryKey, { title: string; alt: string }>;
  processIntro: {
    label: string;
    title: string;
  };
  process: Record<ProcessKey, { title: string; description: string }>;
  contact: {
    label: string;
    title: string;
    description: string;
    addressLabel: string;
    taxIdLabel: string;
    mapTitle: string;
    hoursLabel: string;
    hoursWeek: string;
    hoursUrgent: string;
  };
  faqIntro: {
    label: string;
    title: string;
    description: string;
  };
  faq: Record<FaqKey, { question: string; answer: string }>;
  form: {
    title: string;
    honeypot: string;
    name: string;
    phone: string;
    email: string;
    vehicle: string;
    claimType: string;
    location: string;
    message: string;
    placeholders: {
      name: string;
      phone: string;
      email: string;
      vehicle: string;
      location: string;
      message: string;
    };
    claimTypes: Record<ClaimTypeKey, string>;
    consent: string;
    submit: string;
    sending: string;
    success: string;
    error: string;
  };
  expert: {
    label: string;
    title: string;
    description: string;
    bullets: string[];
  };
  footer: {
    tagline: string;
    privacy: string;
  };
};

const navItems: { id: NavKey; labelKey: NavKey }[] = [
  { id: 'start', labelKey: 'start' },
  { id: 'services', labelKey: 'services' },
  { id: 'expert', labelKey: 'expert' },
  { id: 'gallery', labelKey: 'gallery' },
  { id: 'process', labelKey: 'process' },
  { id: 'faq', labelKey: 'faq' },
  { id: 'contact', labelKey: 'contact' },
];

const faqItems: FaqKey[] = ['cost', 'afterCollision', 'duration', 'appeal', 'area', 'documents'];

const serviceItems: { key: ServiceKey; icon: LucideIcon }[] = [
  { key: 'liability', icon: ShieldCheck },
  { key: 'estimates', icon: FileText },
  { key: 'inspection', icon: ClipboardCheck },
  { key: 'repair', icon: Wrench },
  { key: 'trucks', icon: Truck },
  { key: 'business', icon: Briefcase },
  { key: 'international', icon: Globe2 },
  { key: 'loading', icon: PackageSearch },
];

const processItems: { key: ProcessKey; number: string }[] = [
  { key: 'contact', number: '01' },
  { key: 'documentation', number: '02' },
  { key: 'formalities', number: '03' },
  { key: 'repair', number: '04' },
];

const galleryItems: { key: GalleryKey; src: string }[] = [
  { key: 'claim', src: '/images/ensure-damage-scene.jpg' },
  { key: 'inspection', src: '/images/gallery/ogledziny-pojazdu.jpg' },
  { key: 'repair', src: '/images/gallery/naprawa-powypadkowa.jpg' },
];

const claimTypeKeys: ClaimTypeKey[] = [
  'thirdPartyLiability',
  'comprehensive',
  'estimate',
  'inspection',
  'accidentRepair',
  'businessFleet',
  'international',
  'loading',
  'other',
];

const translations: Record<Language, Translation> = {
  pl: {
    meta: {
      title: 'ENSURE-SERWIS Mateusz Radzikowski | Obsługa szkód i naprawa pojazdów',
      description:
        'ENSURE-SERWIS Mateusz Radzikowski: likwidacja szkód z OC/AC, szkody zagraniczne, szkody przy załadunku i rozładunku, kosztorysy naprawy, oględziny pojazdów i obsługa firm.',
    },
    nav: {
      start: 'Start',
      services: 'Usługi',
      expert: 'Rzeczoznawca',
      gallery: 'Galeria',
      process: 'Jak działamy',
      faq: 'FAQ',
      contact: 'Kontakt',
    },
    hero: {
      owner: 'Mateusz Radzikowski',
      brandFirst: 'Ensure-',
      brandSecond: 'Serwis',
      headline: 'Obsługa szkód OC/AC, kosztorysy i naprawy powypadkowe',
      description:
        'Pomagamy kierowcom i firmom w kompleksowej obsłudze szkód - od zgłoszenia po naprawę. Zajmujemy się dokumentacją, formalnościami i kosztorysami, obsługując pojazdy osobowe, dostawcze i ciężarowe, również w przypadku szkód zagranicznych oraz powstałych podczas załadunku i rozładunku.',
      call: 'Zadzwoń teraz',
      report: 'Zgłoś szkodę',
      taxId: 'NIP: 821 266 89 71',
    },
    servicesIntro: {
      label: 'Zakres usług',
      title: 'Wszystko, czego potrzebujesz po szkodzie',
      description:
        'Zamiast kilku telefonów i niejasnych formalności masz jeden kontakt, który porządkuje zgłoszenie, dokumentację, kosztorys i dalszą naprawę.',
    },
    services: {
      liability: {
        title: 'Likwidacja szkód z OC/AC',
        description: 'Zgłoszenie szkody, kompletowanie informacji i kontakt z ubezpieczycielem.',
      },
      estimates: {
        title: 'Kosztorysy naprawy',
        description: 'Przygotowanie i analiza kosztorysów po kolizji, wypadku lub szkodzie parkingowej.',
      },
      inspection: {
        title: 'Oględziny pojazdów',
        description: 'Dokumentacja uszkodzeń aut osobowych, dostawczych i ciężarowych.',
      },
      repair: {
        title: 'Naprawy powypadkowe',
        description: 'Organizacja naprawy oraz pomoc w przejściu przez cały proces po szkodzie.',
      },
      trucks: {
        title: 'Pojazdy ciężarowe',
        description: 'Obsługa szkód i napraw pojazdów pracujących w firmach oraz flotach.',
      },
      business: {
        title: 'Obsługa firm',
        description: 'Stała pomoc dla przedsiębiorców, pośrednictwo ubezpieczeniowe i wsparcie flot.',
      },
      international: {
        title: 'Likwidacja szkód za granicą',
        description:
          'Obsługa szkód komunikacyjnych powstałych poza granicami Polski, wraz z pełną dokumentacją i formalnościami.',
      },
      loading: {
        title: 'Szkody przy załadunku i rozładunku',
        description: 'Dokumentacja i likwidacja szkód powstałych podczas załadunku oraz rozładunku towaru.',
      },
    },
    gallery: {
      label: 'Galeria',
      title: 'Zdjęcia Poglądowe',
    },
    galleryItems: {
      claim: {
        title: 'Obsługa szkody po kolizji',
        alt: 'Uszkodzony samochód po kolizji przygotowany do obsługi szkody',
      },
      inspection: {
        title: 'Oględziny i dokumentacja',
        alt: 'Oględziny pojazdu i dokumentowanie uszkodzeń',
      },
      repair: {
        title: 'Ensure-Serwis - naprawa powypadkowa',
        alt: 'Pojazd w warsztacie podczas naprawy powypadkowej',
      },
    },
    processIntro: {
      label: 'Jak działamy',
      title: 'Szybko, czytelnie, bez zgadywania',
    },
    process: {
      contact: {
        title: 'Kontakt',
        description: 'Dzwonisz lub wysyłasz formularz. Ustalamy, co się stało i czego potrzebujesz.',
      },
      documentation: {
        title: 'Dokumentacja',
        description: 'Oglądamy pojazd, zapisujemy uszkodzenia i kompletujemy potrzebne informacje.',
      },
      formalities: {
        title: 'Formalności',
        description: 'Pomagamy przy zgłoszeniu, kosztorysie i kontakcie z ubezpieczycielem.',
      },
      repair: {
        title: 'Naprawa',
        description: 'Porządkujemy dalszy proces, aby pojazd mógł szybko wrócić do jazdy.',
      },
    },
    contact: {
      label: 'Kontakt',
      title: 'Zgłoś szkodę lub zapytaj o obsługę firmy',
      description:
        'Najszybciej skontaktujesz się telefonicznie. Możesz też wysłać formularz, a wrócimy z informacją, jakie dokumenty i zdjęcia będą potrzebne.',
      addressLabel: 'Adres:',
      taxIdLabel: 'NIP:',
      mapTitle: 'Mapa lokalizacji Ensure-Serwis w Siedlcach',
      hoursLabel: 'Godziny pracy',
      hoursWeek: 'Poniedziałek - Piątek: 08:00 - 16:00',
      hoursUrgent: 'W nagłych przypadkach dostępni całodobowo',
    },
    faqIntro: {
      label: 'Najczęstsze pytania',
      title: 'Odpowiadamy na to, o co pytacie najczęściej',
      description:
        'Zebraliśmy pytania, które słyszymy niemal przy każdym zgłoszeniu. Jeśli nie znajdziesz tu swojej sytuacji, zadzwoń - wyjaśnimy wszystko podczas rozmowy.',
    },
    faq: {
      cost: {
        question: 'Ile kosztuje wycena szkody?',
        answer:
          'Wynagrodzenie ustalamy indywidualnie dla każdej sprawy. Najczęściej rozliczamy się od różnicy pomiędzy kwotą, którą udało nam się wywalczyć, a tym, co pierwotnie zaproponował ubezpieczyciel. Warunki zawsze omawiamy przed rozpoczęciem pracy, więc nie ma tu żadnych niespodzianek.',
      },
      afterCollision: {
        question: 'Co zrobić zaraz po kolizji?',
        answer:
          'Najlepiej po prostu do nas zadzwonić. Podpowiemy, jakie zdjęcia wykonać, jakie dane spisać od drugiego uczestnika zdarzenia i jakie kroki podjąć w pierwszej kolejności, żeby nie utrudnić sobie późniejszej likwidacji szkody.',
      },
      duration: {
        question: 'Ile trwa likwidacja szkody?',
        answer:
          'Nie ma jednej uniwersalnej odpowiedzi. Każda sprawa ma inny zakres uszkodzeń, inne dokumenty i innego ubezpieczyciela. Po zapoznaniu się ze szczegółami jesteśmy w stanie realnie oszacować, ile potrwa Twoja sprawa.',
      },
      appeal: {
        question: 'Czy pomagacie odwołać się od zaniżonej wyceny?',
        answer:
          'Tak, to jeden z głównych obszarów naszej pracy. Weryfikujemy kosztorys ubezpieczyciela, przygotowujemy niezależną opinię w systemie Audatex-Eurotax i prowadzimy sprawę dalej, aby odszkodowanie odpowiadało rzeczywistym kosztom naprawy.',
      },
      area: {
        question: 'Na jakim obszarze działacie?',
        answer:
          'Bazujemy w Siedlcach, ale obsługujemy klientów z całego regionu, w tym z Warszawy, Łukowa, Garwolina, Sokołowa Podlaskiego, Węgrowa i Białej Podlaskiej. Prowadzimy również sprawy dotyczące szkód powstałych poza granicami Polski.',
      },
      documents: {
        question: 'Jakie dokumenty będą potrzebne?',
        answer:
          'Zwykle wystarczy numer szkody, dane pojazdu, zdjęcia uszkodzeń oraz kosztorys otrzymany od ubezpieczyciela. Jeśli czegoś brakuje, powiemy dokładnie, co skompletować - nie musisz się znać na procedurach.',
      },
    },
    form: {
      title: 'Formularz zgłoszenia szkody',
      honeypot: 'Nie wypełniaj tego pola',
      name: 'Imię i nazwisko',
      phone: 'Telefon',
      email: 'E-mail',
      vehicle: 'Pojazd',
      claimType: 'Rodzaj sprawy',
      location: 'Miejscowość',
      message: 'Opis sprawy',
      placeholders: {
        name: 'Jan Kowalski',
        phone: '729 979 400',
        email: 'adres@email.pl',
        vehicle: 'Marka, model, rocznik',
        location: 'np. Siedlce, Łuków, Warszawa',
        message: 'Napisz krótko, co się stało i czego potrzebujesz.',
      },
      claimTypes: {
        thirdPartyLiability: 'Szkoda z OC sprawcy',
        comprehensive: 'Szkoda z AC',
        estimate: 'Kosztorys naprawy',
        inspection: 'Oględziny pojazdu',
        accidentRepair: 'Naprawa powypadkowa',
        businessFleet: 'Obsługa firmy / floty',
        international: 'Szkoda za granicą',
        loading: 'Szkoda przy załadunku / rozładunku',
        other: 'Inna sprawa',
      },
      consent: 'Zapoznałem/am się z informacją o przetwarzaniu danych osobowych zawartą w',
      submit: 'Wyślij zgłoszenie',
      sending: 'Wysyłanie...',
      success: 'Otwieramy program pocztowy z gotową wiadomością. Kliknij „Wyślij" w swoim programie e-mail, aby przesłać zgłoszenie.',
      error: 'Wystąpił problem z formularzem. Zadzwoń pod 729 979 400 lub napisz na ensure.serwis@gmail.com.',
    },
    expert: {
      label: 'Niezależny rzeczoznawca',
      title: 'Niezależna wycena szkody i weryfikacja kosztorysu',
      description:
        'Jako niezależny rzeczoznawca zajmujemy się profesjonalną wyceną szkód komunikacyjnych oraz weryfikacją kosztorysów przygotowanych przez ubezpieczycieli. Sporządzamy niezależne opinie techniczne i kosztorysy w oparciu o system Audatex-Eurotax – dokumenty te są honorowane przez sądy oraz firmy ubezpieczeniowe. Jeśli uważasz, że ubezpieczyciel zaniżył wycenę Twojej szkody, przygotujemy rzetelną, niezależną opinię, która pomoże Ci uzyskać pełne i sprawiedliwe odszkodowanie.',
      bullets: [
        'Niezależne opinie techniczne na potrzeby sądów i ubezpieczycieli',
        'Kosztorysy w systemie Audatex-Eurotax',
        'Weryfikacja zaniżonych wycen od zakładów ubezpieczeń',
        'Pomoc w dochodzeniu pełnego odszkodowania',
      ],
    },
    footer: {
      tagline: 'Fachowa obsługa szkód / firm | Siedlce',
      privacy: 'Polityka prywatności',
    },
  },
  en: {
    meta: {
      title: 'ENSURE-SERWIS Mateusz Radzikowski | Claims Handling and Vehicle Repairs',
      description:
        'ENSURE-SERWIS Mateusz Radzikowski: third-party and comprehensive insurance claims, international claims, loading and unloading damage, repair estimates, vehicle inspections and business support.',
    },
    nav: {
      start: 'Home',
      services: 'Services',
      expert: 'Expert',
      gallery: 'Gallery',
      process: 'How we work',
      faq: 'FAQ',
      contact: 'Contact',
    },
    hero: {
      owner: 'Mateusz Radzikowski',
      brandFirst: 'Ensure-',
      brandSecond: 'Serwis',
      headline: 'Insurance claims, repair estimates and post-accident repairs',
      description:
        'We help drivers and companies manage claims from report to repair. We handle documentation, paperwork and repair estimates for passenger cars, vans and trucks, including international claims and damage occurring during loading and unloading.',
      call: 'Call now',
      report: 'Report a claim',
      taxId: 'Tax ID: 821 266 89 71',
    },
    servicesIntro: {
      label: 'Services',
      title: 'Everything you need after a claim',
      description:
        'Instead of multiple phone calls and unclear paperwork, you get one point of contact to organize the claim, documentation, estimate and repair process.',
    },
    services: {
      liability: {
        title: 'Third-party and comprehensive claims',
        description: 'Claim reporting, information gathering and communication with the insurance company.',
      },
      estimates: {
        title: 'Repair estimates',
        description: 'Preparation and review of repair estimates after collisions, accidents or parking damage.',
      },
      inspection: {
        title: 'Vehicle inspections',
        description: 'Damage documentation for passenger cars, delivery vans and heavy goods vehicles.',
      },
      repair: {
        title: 'Post-accident repairs',
        description: 'Repair organization and support throughout the entire claim process.',
      },
      trucks: {
        title: 'Truck support',
        description: 'Claims and repair support for vehicles used by companies and fleets.',
      },
      business: {
        title: 'Business support',
        description: 'Ongoing support for companies, insurance assistance and fleet service coordination.',
      },
      international: {
        title: 'International claim handling',
        description: 'Support for vehicle claims that occurred outside Poland, including documentation and formal procedures.',
      },
      loading: {
        title: 'Loading and unloading damage',
        description: 'Documentation and claim handling for damage caused during loading or unloading of goods.',
      },
    },
    gallery: {
      label: 'Gallery',
      title: 'Reference Photos',
    },
    galleryItems: {
      claim: {
        title: 'Claim support after collision',
        alt: 'Damaged car after a collision prepared for claim handling',
      },
      inspection: {
        title: 'Inspection and documentation',
        alt: 'Vehicle inspection and damage documentation',
      },
      repair: {
        title: 'Ensure-Serwis - post-accident repair',
        alt: 'Vehicle in a workshop during post-accident repair',
      },
    },
    processIntro: {
      label: 'How we work',
      title: 'Fast, clear and without guesswork',
    },
    process: {
      contact: {
        title: 'Contact',
        description: 'Call us or send the form. We determine what happened and what kind of support you need.',
      },
      documentation: {
        title: 'Documentation',
        description: 'We inspect the vehicle, record the damage and collect the necessary information.',
      },
      formalities: {
        title: 'Paperwork',
        description: 'We assist with claim reporting, repair estimates and communication with the insurer.',
      },
      repair: {
        title: 'Repair',
        description: 'We organize the next steps so the vehicle can return to the road as quickly as possible.',
      },
    },
    contact: {
      label: 'Contact',
      title: 'Report a claim or ask about business support',
      description:
        'The fastest way to reach us is by phone. You can also submit the form and we will let you know which documents and photos are needed.',
      addressLabel: 'Address:',
      taxIdLabel: 'Tax ID:',
      mapTitle: 'Ensure-Serwis location map in Siedlce',
      hoursLabel: 'Opening hours',
      hoursWeek: 'Monday - Friday: 08:00 - 16:00',
      hoursUrgent: 'Available around the clock in urgent cases',
    },
    faqIntro: {
      label: 'Frequently asked questions',
      title: 'Answers to what clients ask us most often',
      description:
        'We gathered the questions we hear with almost every case. If your situation is not covered here, give us a call and we will explain everything directly.',
    },
    faq: {
      cost: {
        question: 'How much does a damage appraisal cost?',
        answer:
          'We agree the fee individually for each case. Most often we settle based on the difference between the amount we manage to obtain and what the insurer originally offered. Terms are always discussed before we start, so there are no surprises.',
      },
      afterCollision: {
        question: 'What should I do right after a collision?',
        answer:
          'The best first step is simply to call us. We will tell you which photos to take, what details to collect from the other party and what to do first so that the claim process is not complicated later on.',
      },
      duration: {
        question: 'How long does claim handling take?',
        answer:
          'There is no single answer. Every case has a different scope of damage, different paperwork and a different insurer. Once we review the details, we can give you a realistic estimate for your particular case.',
      },
      appeal: {
        question: 'Do you help appeal against an undervalued assessment?',
        answer:
          'Yes, this is one of the core areas of our work. We review the insurer estimate, prepare an independent opinion in the Audatex-Eurotax system and continue the case so that the compensation reflects the real cost of repair.',
      },
      area: {
        question: 'What area do you cover?',
        answer:
          'We are based in Siedlce but work with clients across the region, including Warsaw, Łuków, Garwolin, Sokołów Podlaski, Węgrów and Biała Podlaska. We also handle claims for damage that occurred outside Poland.',
      },
      documents: {
        question: 'What documents will be needed?',
        answer:
          'Usually the claim number, vehicle details, photos of the damage and the estimate received from the insurer. If anything is missing, we will tell you exactly what to gather - you do not need to know the procedures.',
      },
    },
    form: {
      title: 'Claim report form',
      honeypot: 'Do not fill this field',
      name: 'Full name',
      phone: 'Phone',
      email: 'E-mail',
      vehicle: 'Vehicle',
      claimType: 'Case type',
      location: 'Location',
      message: 'Case description',
      placeholders: {
        name: 'John Smith',
        phone: '+48 729 979 400',
        email: 'email@example.com',
        vehicle: 'Make, model, year',
        location: 'e.g. Siedlce, Łuków, Warsaw',
        message: 'Briefly describe what happened and what you need.',
      },
      claimTypes: {
        thirdPartyLiability: 'Third-party liability claim',
        comprehensive: 'Comprehensive insurance claim',
        estimate: 'Repair estimate',
        inspection: 'Vehicle inspection',
        accidentRepair: 'Post-accident repair',
        businessFleet: 'Company / fleet support',
        international: 'International claim',
        loading: 'Loading / unloading damage',
        other: 'Other case',
      },
      consent: 'I have read the information on the processing of personal data contained in the',
      submit: 'Send report',
      sending: 'Sending...',
      success: 'Opening your e-mail app with a prepared message. Click "Send" in your e-mail program to submit the report.',
      error: 'There was a problem with the form. Please call 729 979 400 or write to ensure.serwis@gmail.com.',
    },
    expert: {
      label: 'Independent expert',
      title: 'Independent damage appraisal and estimate verification',
      description:
        'As an independent vehicle damage expert, we professionally assess the value of claims and verify insurer-prepared repair estimates. We produce independent technical reports and repair estimates using the Audatex-Eurotax system – documents that are accepted by courts and insurance companies. If you believe your insurer has undervalued your claim, we will prepare a reliable, independent opinion to help you obtain a full and fair settlement.',
      bullets: [
        'Independent technical reports for courts and insurers',
        'Repair estimates prepared in Audatex-Eurotax',
        'Verification of undervalued insurance assessments',
        'Support in obtaining full compensation',
      ],
    },
    footer: {
      tagline: 'Professional claims and business support | Siedlce',
      privacy: 'Privacy Policy',
    },
  },
};

const initialFormData = {
  name: '',
  phone: '',
  email: '',
  vehicle: '',
  claimType: 'thirdPartyLiability' as ClaimTypeKey,
  location: '',
  message: '',
};

// encodeForm kept for potential future Formspree/Netlify integration
// const encodeForm = (data: Record<string, string>) => new URLSearchParams(data).toString();

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const PRIVACY_PATH = '/polityka-prywatnosci';

function App() {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === 'undefined') return 'pl';
    return window.localStorage.getItem('ensure-language') === 'en' ? 'en' : 'pl';
  });
  const [route, setRoute] = useState<string>(() =>
    typeof window === 'undefined' ? '/' : window.location.pathname,
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<NavKey>('start');
  const [formData, setFormData] = useState(initialFormData);
  const [botField, setBotField] = useState('');
  const [consent, setConsent] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const t = translations[language];
  const isPrivacyPage = route === PRIVACY_PATH || route === `${PRIVACY_PATH}/`;

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = t.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description);
    window.localStorage.setItem('ensure-language', language);
  }, [language, t.meta.description, t.meta.title]);

  useEffect(() => {
    const handlePopState = () => setRoute(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: string) => (event: { preventDefault: () => void }) => {
    event.preventDefault();
    window.history.pushState({}, '', path);
    setRoute(path);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160;

      for (const item of navItems) {
        const section = document.getElementById(item.id);
        if (!section) continue;

        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          setActiveSection(item.id);
          break;
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const switchLanguage = (nextLanguage: Language) => {
    setLanguage(nextLanguage);
    setIsMenuOpen(false);
  };

  const scrollToSection = (id: NavKey) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (botField) return;

    const subject = encodeURIComponent(
      language === 'pl'
        ? `Zgłoszenie szkody - ${formData.name}`
        : `Claim report - ${formData.name}`,
    );
    const body = encodeURIComponent(
      [
        `${t.form.name}: ${formData.name}`,
        `${t.form.phone}: ${formData.phone}`,
        `${t.form.email}: ${formData.email || '-'}`,
        `${t.form.vehicle}: ${formData.vehicle || '-'}`,
        `${t.form.claimType}: ${t.form.claimTypes[formData.claimType]}`,
        `${t.form.location}: ${formData.location || '-'}`,
        '',
        `${t.form.message}:`,
        formData.message,
      ].join('\n'),
    );

    window.location.href = `mailto:biuro.ensure@gmail.com?subject=${subject}&body=${body}`;

    setFormStatus('success');
    setFormData(initialFormData);
    setConsent(false);
  };

  if (isPrivacyPage) {
    return <PrivacyPolicy language={language} onBack={navigateTo('/')} />;
  }

  return (
    <div className="min-h-screen bg-[#f5f9fd] font-sans text-[#142129]">
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-[#111c24]/95 text-white backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 lg:px-8">
          <a href="#start" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3" aria-label="Ensure-Serwis">
            <span className="block">
              <span className="block font-display text-2xl font-bold uppercase leading-none tracking-[0.08em]">Ensure-Serwis</span>
              <span className="mt-1 block text-xs font-semibold uppercase tracking-[0.24em] text-[#35c8ff]">Mateusz Radzikowski</span>
            </span>
          </a>

          <nav className="hidden items-center gap-7 lg:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className={`text-sm font-bold uppercase tracking-[0.16em] transition-colors ${
                  activeSection === item.id ? 'text-[#35c8ff]' : 'text-white/68 hover:text-white'
                }`}
              >
                {t.nav[item.labelKey]}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="flex border border-white/15 bg-white/5 p-1">
              {(['pl', 'en'] as Language[]).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => switchLanguage(item)}
                  aria-pressed={language === item}
                  className={`px-3 py-2 text-xs font-black uppercase tracking-[0.14em] transition ${
                    language === item ? 'bg-[#35c8ff] text-[#111c24]' : 'text-white/70 hover:text-white'
                  }`}
                >
                  {item === 'pl' ? 'PL' : 'ENG'}
                </button>
              ))}
            </div>

            <a
              href="tel:+48729979400"
              className="gold-glow-soft hidden items-center gap-2 bg-[#1e9dde] px-4 py-3 text-sm font-black uppercase tracking-[0.12em] text-white transition hover:bg-white hover:text-[#111c24] md:flex"
            >
              <Phone className="h-4 w-4" />
              729 979 400
            </a>

            <button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              className="flex h-11 w-11 items-center justify-center border border-white/20 text-white lg:hidden"
              aria-label="Menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <nav className="border-t border-white/10 bg-[#111c24] px-5 py-5 lg:hidden">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className={`text-left text-base font-black uppercase tracking-[0.16em] ${activeSection === item.id ? 'text-[#35c8ff]' : 'text-white'}`}
                >
                  {t.nav[item.labelKey]}
                </button>
              ))}
              <a href="tel:+48729979400" className="mt-2 inline-flex items-center gap-2 font-bold text-[#35c8ff]">
                <Phone className="h-5 w-5" />
                729 979 400
              </a>
            </div>
          </nav>
        )}
      </header>

      <main>
        <section id="start" className="relative flex min-h-screen items-center overflow-hidden bg-[#0c171f] pt-24 text-white">
          <div className="animate-image-drift absolute inset-0 bg-cover bg-center opacity-46" style={{ backgroundImage: "url('/images/ensure-appraiser-hero.jpg')" }} />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,20,28,0.98)_0%,rgba(12,24,34,0.91)_48%,rgba(12,24,34,0.38)_100%)]" />
          <div className="absolute -left-28 bottom-20 h-80 w-80 rounded-full bg-[#ffb13b]/20 blur-3xl" />
          <div className="absolute right-0 top-16 h-96 w-96 rounded-full bg-[#1e9dde]/28 blur-3xl" />
          <div className="gold-ambient absolute inset-0" />
          <div className="absolute bottom-0 left-0 h-2 w-full bg-gradient-to-r from-[#1e9dde] via-[#35c8ff] to-[#ffb13b]" />

          <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-20 lg:px-8">
            <div className="max-w-3xl animate-hero-reveal">
              <p className="mb-4 text-sm font-black uppercase tracking-[0.38em] text-[#35c8ff]">{t.hero.owner}</p>
              <h1 className="gold-text-glow font-display text-6xl font-bold uppercase leading-[0.9] tracking-[0.06em] sm:text-7xl lg:text-8xl">
                {t.hero.brandFirst}
                <span className="block bg-gradient-to-r from-[#35c8ff] to-[#ffcf78] bg-clip-text text-transparent">{t.hero.brandSecond}</span>
              </h1>
              <div className="mt-7 h-1 w-44 animate-sweep bg-gradient-to-r from-[#1e9dde] to-[#ffb13b]" />
              <p className="mt-8 max-w-3xl text-2xl font-black uppercase leading-tight tracking-[0.08em] sm:text-3xl">{t.hero.headline}</p>
              <p className="mt-5 max-w-3xl text-justify text-lg leading-8 text-white/82">{t.hero.description}</p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a
                  href="tel:+48729979400"
                  className="gold-glow-soft group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#1e9dde] to-[#35c8ff] px-7 py-4 text-base font-black uppercase tracking-[0.14em] text-white shadow-lg shadow-[#1e9dde]/25 transition hover:from-white hover:to-white hover:text-[#111c24]"
                >
                  {t.hero.call}
                  <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
                </a>
                <button
                  type="button"
                  onClick={() => scrollToSection('contact')}
                  className="gold-glow-soft inline-flex items-center justify-center border border-[#ffb13b]/80 px-7 py-4 text-base font-black uppercase tracking-[0.14em] text-white transition hover:bg-[#ffb13b] hover:text-[#111c24]"
                >
                  {t.hero.report}
                </button>
              </div>

              <p className="mt-7 text-sm font-black uppercase tracking-[0.18em] text-[#ffcf78]">{t.hero.taxId}</p>
            </div>
          </div>
        </section>

        <section id="services" className="relative overflow-hidden bg-[#f4f9ff] py-24">
          <div className="absolute -right-32 top-24 h-72 w-72 rounded-full bg-[#1e9dde]/12 blur-3xl" />
          <div className="absolute -left-28 bottom-20 h-72 w-72 rounded-full bg-[#ffb13b]/14 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
              <div className="lg:sticky lg:top-28">
                <p className="text-sm font-black uppercase tracking-[0.32em] text-[#1e9dde]">{t.servicesIntro.label}</p>
                <h2 className="mt-4 font-display text-5xl font-bold uppercase leading-none tracking-[0.04em] text-[#111c24] sm:text-6xl">
                  {t.servicesIntro.title}
                </h2>
                <p className="mt-6 max-w-md text-lg leading-8 text-[#4b5a64]">{t.servicesIntro.description}</p>
              </div>

              <div className="divide-y divide-[#cfdce6] border-y border-[#cfdce6] bg-white/45">
                {serviceItems.map((service, index) => (
                  <div key={service.key} className="group grid gap-5 py-7 transition hover:bg-white/70 sm:grid-cols-[92px_1fr] sm:px-4">
                    <div className="flex items-start gap-4 sm:block">
                      <span className="font-display text-3xl font-bold text-[#1e9dde]">0{index + 1}</span>
                      <span className="gold-glow-soft mt-4 flex h-14 w-14 items-center justify-center bg-[#111c24] text-[#35c8ff] transition group-hover:bg-[#ffb13b] group-hover:text-[#111c24] sm:flex">
                        <service.icon className="h-6 w-6" />
                      </span>
                    </div>
                    <div>
                      <h3 className="font-display text-2xl font-bold uppercase tracking-[0.04em] text-[#111c24]">{t.services[service.key].title}</h3>
                      <p className="mt-3 max-w-2xl text-lg leading-8 text-[#4b5a64]">{t.services[service.key].description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="expert" className="overflow-hidden bg-[#111c24] py-24 text-white">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.32em] text-[#ffcf78]">{t.expert.label}</p>
                <h2 className="mt-4 font-display text-5xl font-bold uppercase leading-none tracking-[0.04em] sm:text-6xl">
                  {t.expert.title}
                </h2>
                <p className="mt-6 text-justify text-lg leading-8 text-white/75">{t.expert.description}</p>
              </div>
              <div className="gold-panel bg-[#142129] p-8">
                <ul className="space-y-5">
                  {t.expert.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-4">
                      <span className="mt-2 block h-3 w-3 shrink-0 rounded-full bg-[#ffcf78] shadow-[0_0_14px_rgba(255,207,120,0.7)]" />
                      <span className="text-lg font-semibold leading-7 text-white/90">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="gallery" className="bg-gradient-to-b from-white via-[#f4fbff] to-white py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.32em] text-[#1e9dde]">{t.gallery.label}</p>
              <h2 className="mt-4 font-display text-5xl font-bold uppercase leading-none tracking-[0.04em] text-[#111c24] sm:text-6xl">
                {t.gallery.title}
              </h2>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {galleryItems.map((photo) => (
                <a key={photo.src} href={photo.src} target="_blank" rel="noreferrer" className="group block overflow-hidden bg-[#111c24] shadow-xl shadow-[#1e9dde]/8">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={photo.src} alt={t.galleryItems[photo.key].alt} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0c171f]/95 to-transparent p-5 pt-16">
                      <div className="flex items-center gap-3 text-white">
                        <Camera className="h-5 w-5 text-[#35c8ff]" />
                        <span className="font-display text-2xl font-bold uppercase tracking-[0.04em]">{t.galleryItems[photo.key].title}</span>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="process" className="bg-[#eaf6fc] py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-black uppercase tracking-[0.32em] text-[#1e9dde]">{t.processIntro.label}</p>
              <h2 className="mt-4 font-display text-5xl font-bold uppercase leading-none tracking-[0.04em] text-[#111c24] sm:text-6xl">
                {t.processIntro.title}
              </h2>
            </div>

            <div className="mt-14 grid gap-8 lg:grid-cols-4">
              {processItems.map((step) => (
                <div key={step.key} className="border-t-4 border-[#1e9dde] bg-white/55 px-1 pt-7 transition hover:border-[#ffb13b] hover:bg-white">
                  <span className="font-display text-5xl font-bold text-[#b8d6e8]">{step.number}</span>
                  <h3 className="mt-5 font-display text-2xl font-bold uppercase tracking-[0.04em] text-[#111c24]">{t.process[step.key].title}</h3>
                  <p className="mt-4 leading-7 text-[#4b5a64]">{t.process[step.key].description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="relative overflow-hidden bg-[#111c24] py-24 text-white">
          <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-[#1e9dde]/18 blur-3xl" />
          <div className="absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-[#ffb13b]/16 blur-3xl" />
          <div className="gold-ambient absolute inset-0" />

          <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-black uppercase tracking-[0.32em] text-[#ffcf78]">{t.faqIntro.label}</p>
              <h2 className="mt-4 font-display text-5xl font-bold uppercase leading-none tracking-[0.04em] sm:text-6xl">
                {t.faqIntro.title}
              </h2>
              <p className="mt-6 text-justify text-lg leading-8 text-white/75">{t.faqIntro.description}</p>
            </div>

            <div className="mt-14 grid gap-5 lg:grid-cols-2">
              {faqItems.map((key, index) => (
                <details
                  key={key}
                  className="group border-l-4 border-[#1e9dde] bg-[#142129] p-6 transition hover:border-[#ffb13b] sm:p-7"
                >
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-5">
                    <span className="flex items-start gap-4">
                      <span className="font-display text-2xl font-bold text-[#35c8ff]">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="font-display text-xl font-bold uppercase leading-tight tracking-[0.03em] text-white sm:text-2xl">
                        {t.faq[key].question}
                      </span>
                    </span>
                    <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center border border-[#35c8ff]/60 text-lg font-black text-[#35c8ff] transition group-open:rotate-45 group-open:border-[#ffb13b] group-open:text-[#ffb13b]">
                      +
                    </span>
                  </summary>
                  <p className="mt-5 border-t border-white/10 pt-5 text-justify leading-8 text-white/75">
                    {t.faq[key].answer}
                  </p>
                </details>
              ))}
            </div>

            <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                href="tel:+48729979400"
                className="gold-glow-soft group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#1e9dde] to-[#35c8ff] px-7 py-4 text-base font-black uppercase tracking-[0.14em] text-white transition hover:from-white hover:to-white hover:text-[#111c24]"
              >
                {t.hero.call}
                <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
              </a>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-white/60">
                {t.contact.hoursWeek}
              </p>
            </div>
          </div>
        </section>

        <section id="contact" className="bg-gradient-to-br from-white via-[#f4fbff] to-[#edf7ff] py-24">
          <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.32em] text-[#1e9dde]">{t.contact.label}</p>
              <h2 className="mt-4 font-display text-5xl font-bold uppercase leading-none tracking-[0.04em] text-[#111c24] sm:text-6xl">
                {t.contact.title}
              </h2>
              <p className="mt-6 text-lg leading-8 text-[#4b5a64]">{t.contact.description}</p>

              <div className="mt-10 space-y-6 border-y border-[#d9e2ea] py-8">
                <div className="flex items-center gap-4">
                  <a href="tel:+48729979400" className="flex items-center gap-2 text-xl font-black text-[#111c24] transition hover:text-[#1e9dde]">
                    <Phone className="h-6 w-6 text-[#1e9dde]" />
                    729 979 400
                  </a>
                  <a href="https://wa.me/48729979400" target="_blank" rel="noreferrer" className="flex items-center transition hover:scale-110" aria-label="WhatsApp 729 979 400">
                    <WhatsAppIcon className="h-7 w-7 text-[#25d366]" />
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  <a href="tel:+48602114688" className="flex items-center gap-2 text-xl font-black text-[#111c24] transition hover:text-[#1e9dde]">
                    <Phone className="h-6 w-6 text-[#1e9dde]" />
                    602 114 688
                  </a>
                  <a href="https://wa.me/48602114688" target="_blank" rel="noreferrer" className="flex items-center transition hover:scale-110" aria-label="WhatsApp 602 114 688">
                    <WhatsAppIcon className="h-7 w-7 text-[#25d366]" />
                  </a>
                </div>
                <a href="mailto:ensure.serwis@gmail.com" className="flex items-center gap-4 text-lg font-bold text-[#111c24] transition hover:text-[#1e9dde]">
                  <Mail className="h-6 w-6 text-[#1e9dde]" />
                  ensure.serwis@gmail.com
                </a>
                <a
                  href="https://maps.google.com/?q=52.1572729,22.2468620"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-4 text-lg font-bold text-[#111c24] transition hover:text-[#1e9dde]"
                >
                  <MapPin className="mt-1 h-6 w-6 shrink-0 text-[#1e9dde]" />
                  <span>
                    ul. Romanówka 7/5
                    <br />
                    08-110 Siedlce
                  </span>
                </a>
                <a
                  href="https://www.facebook.com/ensureserwis.mateuszradzikowski"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 text-lg font-bold text-[#111c24] transition hover:text-[#1e9dde]"
                >
                  <span className="flex h-6 w-6 items-center justify-center bg-[#1e9dde] font-black text-white">f</span>
                  /ensureserwis.mateuszradzikowski
                </a>
              </div>

              <div className="gold-panel mt-8 bg-[#1b2a3d] p-7 text-white shadow-xl shadow-[#17232b]/10 sm:p-9">
                <p className="font-display text-3xl font-bold uppercase tracking-[0.06em] text-white">Ensure-Serwis</p>
                <div className="mt-6 space-y-3 text-base leading-7">
                  <p>
                    <span className="font-black">{t.contact.taxIdLabel}</span> 821 266 89 71
                  </p>
                  <p>
                    <span className="font-black">{t.contact.addressLabel}</span> ul. Romanówka 7/5
                    <br />
                    08-110 Siedlce
                  </p>
                </div>

                <div className="mt-7 border-t border-white/15 pt-6">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-[#ffcf78]" />
                    <p className="text-sm font-black uppercase tracking-[0.16em] text-[#ffcf78]">
                      {t.contact.hoursLabel}
                    </p>
                  </div>
                  <p className="mt-4 text-base font-bold leading-7">{t.contact.hoursWeek}</p>
                  <p className="mt-1 text-base leading-7 text-white/75">{t.contact.hoursUrgent}</p>
                </div>
              </div>

              <div className="mt-8 overflow-hidden border border-[#d9e2ea] bg-[#f5f8fb]">
                <iframe
                  title={t.contact.mapTitle}
                  src="https://www.openstreetmap.org/export/embed.html?bbox=22.2428620%2C52.1548729%2C22.2508620%2C52.1596729&amp;layer=mapnik&amp;marker=52.1572729%2C22.2468620"
                  className="h-[300px] w-full border-0"
                  loading="lazy"
                />
              </div>
            </div>

            <form
              name="kontakt-szkoda"
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
              className="gold-panel bg-[#142129] p-6 text-white shadow-2xl shadow-[#17232b]/15 sm:p-8"
            >
              <input type="hidden" name="form-name" value="kontakt-szkoda" />
              <p className="hidden" aria-hidden="true">
                <label>
                  {t.form.honeypot}
                  <input name="bot-field" value={botField} onChange={(event) => setBotField(event.target.value)} />
                </label>
              </p>
              <div className="flex items-center gap-3 border-b border-white/15 pb-6">
                <Send className="h-6 w-6 text-[#35c8ff]" />
                <p className="text-sm font-black uppercase tracking-[0.18em] text-white">{t.form.title}</p>
              </div>

              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="text-xs font-black uppercase tracking-[0.18em] text-white">{t.form.name}</span>
                  <input
                    required
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                    className="mt-2 w-full border border-[#5b6872] bg-[#2d3841] px-4 py-4 text-sm font-semibold text-white outline-none transition placeholder:text-[#7f8d98] focus:border-[#35c8ff]"
                    placeholder={t.form.placeholders.name}
                  />
                </label>

                <label className="block">
                  <span className="text-xs font-black uppercase tracking-[0.18em] text-white">{t.form.phone}</span>
                  <input
                    required
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(event) => setFormData({ ...formData, phone: event.target.value })}
                    className="mt-2 w-full border border-[#5b6872] bg-[#2d3841] px-4 py-4 text-sm font-semibold text-white outline-none transition placeholder:text-[#7f8d98] focus:border-[#35c8ff]"
                    placeholder={t.form.placeholders.phone}
                  />
                </label>
              </div>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="text-xs font-black uppercase tracking-[0.18em] text-white">{t.form.email}</span>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                    className="mt-2 w-full border border-[#5b6872] bg-[#2d3841] px-4 py-4 text-sm font-semibold text-white outline-none transition placeholder:text-[#7f8d98] focus:border-[#35c8ff]"
                    placeholder={t.form.placeholders.email}
                  />
                </label>

                <label className="block">
                  <span className="text-xs font-black uppercase tracking-[0.18em] text-white">{t.form.vehicle}</span>
                  <input
                    name="vehicle"
                    type="text"
                    value={formData.vehicle}
                    onChange={(event) => setFormData({ ...formData, vehicle: event.target.value })}
                    className="mt-2 w-full border border-[#5b6872] bg-[#2d3841] px-4 py-4 text-sm font-semibold text-white outline-none transition placeholder:text-[#7f8d98] focus:border-[#35c8ff]"
                    placeholder={t.form.placeholders.vehicle}
                  />
                </label>
              </div>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="text-xs font-black uppercase tracking-[0.18em] text-white">{t.form.claimType}</span>
                  <select
                    name="claimType"
                    value={formData.claimType}
                    onChange={(event) => setFormData({ ...formData, claimType: event.target.value as ClaimTypeKey })}
                    className="mt-2 w-full border border-[#5b6872] bg-[#2d3841] px-4 py-4 text-sm font-bold text-white outline-none transition focus:border-[#35c8ff]"
                  >
                    {claimTypeKeys.map((item) => (
                      <option key={item} value={item}>
                        {t.form.claimTypes[item]}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="text-xs font-black uppercase tracking-[0.18em] text-white">{t.form.location}</span>
                  <input
                    name="location"
                    type="text"
                    value={formData.location}
                    onChange={(event) => setFormData({ ...formData, location: event.target.value })}
                    className="mt-2 w-full border border-[#5b6872] bg-[#2d3841] px-4 py-4 text-sm font-semibold text-white outline-none transition placeholder:text-[#7f8d98] focus:border-[#35c8ff]"
                    placeholder={t.form.placeholders.location}
                  />
                </label>
              </div>

              <label className="mt-5 block">
                <span className="text-xs font-black uppercase tracking-[0.18em] text-white">{t.form.message}</span>
                <textarea
                  required
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={(event) => setFormData({ ...formData, message: event.target.value })}
                  className="mt-2 w-full resize-none border border-[#5b6872] bg-[#2d3841] px-4 py-4 text-sm font-semibold text-white outline-none transition placeholder:text-[#7f8d98] focus:border-[#35c8ff]"
                  placeholder={t.form.placeholders.message}
                />
              </label>

              <label className="mt-6 flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  required
                  checked={consent}
                  onChange={(event) => setConsent(event.target.checked)}
                  className="mt-1 h-5 w-5 shrink-0 appearance-none border-2 border-[#5b6872] bg-[#2d3841] transition checked:border-[#35c8ff] checked:bg-[#35c8ff]"
                />
                <span className="text-sm leading-6 text-white/80">
                  {t.form.consent}{' '}
                  <a
                    href={PRIVACY_PATH}
                    onClick={navigateTo(PRIVACY_PATH)}
                    className="font-bold text-[#35c8ff] underline underline-offset-2 transition hover:text-white"
                  >
                    {language === 'pl' ? 'Polityce prywatności' : 'Privacy Policy'}
                  </a>
                  .
                </span>
              </label>

              <button
                type="submit"
                disabled={formStatus === 'sending' || !consent}
                className="mt-6 inline-flex w-full items-center justify-center gap-3 bg-gradient-to-r from-[#1e9dde] to-[#35c8ff] px-7 py-4 font-black uppercase tracking-[0.18em] text-white transition hover:from-white hover:to-white hover:text-[#111c24] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {formStatus === 'sending' ? t.form.sending : t.form.submit}
                {formStatus === 'sending' ? <Loader2 className="h-5 w-5 animate-spin" /> : <ArrowRight className="h-5 w-5" />}
              </button>

              {formStatus === 'success' && (
                <p className="mt-4 border border-[#35c8ff]/50 bg-[#35c8ff]/10 p-4 text-sm font-semibold text-white">{t.form.success}</p>
              )}

              {formStatus === 'error' && (
                <p className="mt-4 border border-red-300/50 bg-red-500/10 p-4 text-sm font-semibold text-white">{t.form.error}</p>
              )}
            </form>
          </div>
        </section>
      </main>

      <footer className="bg-[#101820] py-10 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p className="font-display text-3xl font-bold uppercase tracking-[0.08em]">Ensure-Serwis</p>
            <p className="mt-2 text-sm font-semibold uppercase tracking-[0.22em] text-[#35c8ff]">Mateusz Radzikowski</p>
          </div>
          <div className="text-sm leading-7 text-white/60 lg:text-right">
            <p>{t.footer.tagline}</p>
            <p>729 979 400 | 602 114 688 | ensure.serwis@gmail.com</p>
            <a
              href={PRIVACY_PATH}
              onClick={navigateTo(PRIVACY_PATH)}
              className="mt-2 inline-block font-bold text-[#35c8ff] underline underline-offset-4 transition hover:text-white"
            >
              {t.footer.privacy}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;