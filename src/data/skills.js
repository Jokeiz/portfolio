export const skillCategories = [
  {
    id: 'frontend',
    label: 'Frontend Engineering',
    accent: '#7df9d4',
    description:
      'React-shaped brain. Type-safe, accessible, performance-first applications that ship.',
    items: [
      { name: 'React', level: 95 },
      { name: 'Next.js 14 (App Router)', level: 92 },
      { name: 'TypeScript', level: 90 },
      { name: 'Zustand · Jotai', level: 86 },
      { name: 'TanStack Query', level: 84 },
      { name: 'Vite · Turbopack', level: 88 },
    ],
  },
  {
    id: 'three',
    label: '3D · WebGL · Motion',
    accent: '#a78bfa',
    description:
      'Where most portfolios stop, mine begins. Custom shaders, scroll-driven scenes, post-processing.',
    items: [
      { name: 'Three.js', level: 92 },
      { name: 'React Three Fiber + Drei', level: 92 },
      { name: 'GLSL · Custom shaders', level: 78 },
      { name: 'GSAP · ScrollTrigger', level: 94 },
      { name: 'Framer Motion', level: 90 },
      { name: 'Lenis · Smooth scroll', level: 86 },
    ],
  },
  {
    id: 'backend',
    label: 'Full-stack & Backend',
    accent: '#7df9d4',
    description:
      'I build the boring 80% well — auth, payments, integrations, content models, infra.',
    items: [
      { name: 'Node.js · Express · Fastify', level: 90 },
      { name: 'MongoDB · Mongoose', level: 88 },
      { name: 'PostgreSQL · Prisma', level: 82 },
      { name: 'REST · GraphQL · tRPC', level: 86 },
      { name: 'Auth (Clerk · NextAuth · JWT)', level: 90 },
      { name: 'Stripe · Razorpay · Webhooks', level: 84 },
    ],
  },
  {
    id: 'design',
    label: 'Design & UI Systems',
    accent: '#a78bfa',
    description:
      'I read briefs as a designer would. Type, spacing, motion, microcopy — all of it.',
    items: [
      { name: 'Tailwind CSS', level: 96 },
      { name: 'Figma · Auto-layout', level: 88 },
      { name: 'Design systems · Tokens', level: 86 },
      { name: 'Accessibility (WCAG AA)', level: 84 },
      { name: 'Motion design', level: 82 },
      { name: 'Brand systems', level: 78 },
    ],
  },
];

export const tools = [
  'Vercel', 'AWS', 'Cloudflare', 'Sanity', 'Contentful',
  'Linear', 'Notion', 'Figma', 'GitHub', 'Sentry',
  'PostHog', 'Stripe', 'Razorpay', 'Resend', 'Upstash',
];
