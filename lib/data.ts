export const PROJECTS = [
 {
    id: 1,
    tag: 'MISSION-CRITICAL SYSTEM',
    emoji: '🏔️',
    color: 'linear-gradient(135deg, #0f172a, #1e293b)', // ألوان رسمية داكنة تناسب أنظمة الطوارئ
    title: 'Vang Beredskap (Skutshorn)',
    desc: 'An enterprise-grade crisis management and early warning system built for Vang Kommune to monitor mountain stability and automate emergency evacuations.',
    fullDesc: 'A highly resilient, real-time emergency response platform engineered to save lives. Built entirely on an asynchronous architecture, it integrates live geological telemetry (NVE) and meteorological data (Yr.no) to dynamically calculate evacuation margins. The system features automated SMS & Voice robocalls, a geospatial tactical map with live HTMX updates, an AI-powered volunteer dispatch system (Digital Neighbor), and an immutable audit log. It is PWA-enabled to ensure operational continuity even during severe internet outages.',
    tech:['Django 6 (Async)', 'HTMX', 'PostGIS & Leaflet', 'Celery & Redis', 'Twilio API', 'PWA'],
    features:[
      'Real-time geological & weather telemetry integration',
      'Automated SMS & Voice Robocalls for rapid evacuation',
      'Geospatial tactical map with instant DOM updates',
      'AI-powered volunteer dispatch system (Digital Neighbor)',
      'Immutable Audit Log with 1-click official PDF reporting',
      'Progressive Web App (PWA) with offline resilience',
    ],
    link: '#', // يمكنك وضع رابط الـ GitHub هنا إذا كان الكود مفتوحاً، أو رابط فيديو يوتيوب يشرح المشروع
  },
 {
    id: 2,
    tag: 'MEDTECH AI',
    emoji: '🏥',
    color: 'linear-gradient(135deg, #0f172a, #1e3a8a)', // ألوان زرقاء داكنة توحي بالثقة الطبية والتكنولوجيا
    title: 'AI-Powered Medical Support System',
    desc: 'A real-time, multilingual communication platform bridging the language gap between refugees and medical staff using AI.',
    fullDesc: 'An enterprise-grade healthcare platform designed for refugee camps in Norway. It provides real-time, bi-directional translation for text and voice notes, enabling patients to communicate in their native language while nurses respond in Norwegian. The system features AI-driven medical image analysis, automated triage for critical cases, an epidemic early warning system, and strict GDPR compliance with automated data retention policies.',
    tech:['Django 6', 'PostgreSQL', 'Celery & Redis', 'Azure OpenAI', 'WebSockets'],
    features:[
      'Real-time multilingual chat with auto-translation',
      'Voice-to-text medical transcription (Whisper AI)',
      'AI-driven medical image analysis (GPT-4o Vision)',
      'Automated triage & Epidemic outbreak alerts',
      'Strict GDPR compliance with auto-data cleanup',
    ],
    link: 'https://camp-web.onrender.com', // رابط مشروعك الحي
  },
  {
    id: 3,
    tag: 'SAAS',
    emoji: '📊',
    color: 'linear-gradient(135deg,#011a12,#022a1a)',
    title: 'Business Analytics Dashboard',
    desc: 'A real-time data analytics board with interactive charts and exportable reports.',
    fullDesc: 'A specialised SaaS tool that helps businesses understand their data and make number-driven decisions. It provides a fully customisable dashboard with interactive charts, smart alerts when certain conditions are met, and the ability to connect multiple data sources.',
    tech: ['Vue.js', 'Python', 'FastAPI', 'ClickHouse', 'Chart.js'],
    features: [
      'Connect multiple data sources',
      'Fully customisable dashboards',
      'Automated smart alerts',
      'PDF/Excel report export',
      'Open API for integrations',
    ],
    link: '#',
  },
];

export const SOCIALS = [
  { name: 'GitHub',   handle: 'https://github.com/alinorwa',  icon: '🐙', color: 'rgba(255,255,255,.05)', ac: 'rgba(200,200,200,.15)', link: 'https://github.com/alinorwa',       desc: 'Open-source projects' },
  { name: 'LinkedIn', handle: 'https://www.linkedin.com/in/ali-n-264bba405/', icon: '💼', color: 'rgba(10,102,194,.08)',  ac: 'rgba(10,102,194,.18)',  link: 'https://www.linkedin.com/in/ali-n-264bba405/',     desc: 'Professional network' },

  { name: 'WhatsApp', handle: '+47 97380317',   icon: '💬', color: 'rgba(37,211,102,.06)', ac: 'rgba(37,211,102,.16)',  desc: 'Direct contact' },
  { name: 'Email',    handle: 'alialrubay499@gmail.com',icon: '📧', color: 'rgba(245,200,66,.05)', ac: 'rgba(245,200,66,.14)', link: 'mailto:alialrubay499@gmail.com',     desc: 'Collaboration & work' },

];
