export const personalInfo = {
  name: 'Ganesh Prasad Bhandari',
  title: 'Frontend Developer',
  tagline: 'Building modern, scalable and accessible web experiences using React, Next.js, Tailwind CSS and TypeScript.',
  email: 'bhandariganesh1725@gmail.com',
  phone: '+977 9848958471',
  location: 'Tilottama-6, Manigram, Rupandehi, Nepal',
  resumeUrl: '#',
  avatar: '/hero.png',
  social: {
    github: 'https://github.com/GANNI1725',
    linkedin: 'https://www.linkedin.com/in/ganesh-prasad-bhandari-b54a34323',
    instagram: 'https://www.instagram.com/ganeshbhandari14/',
  },
}

export const stats = [
  { value: '3+', label: 'Projects Completed' },
  { value: '3', label: 'Months Internship' },
  { value: '5+', label: 'Certifications' },
]

export const aboutContent = {
  paragraphs: [
    'I am a passionate Frontend Developer based in Nepal, dedicated to building visually stunning and highly interactive web applications. My journey started with a curiosity for how things work on the screen, which led me to specialize in modern tools like React, Next.js, and Tailwind CSS.',
    'During my internship at Sweven Incorporate Pvt. Ltd., I sharpened my skills in building responsive UIs, optimizing dashboard performance, and creating seamless user experiences. I believe that every line of code should contribute to a better, more accessible web.',
    'When I\'m not coding, you\'ll find me exploring new design trends, experimenting with 3D web graphics, or contributing to personal projects that challenge my creative limits.',
  ],
}

export interface Skill {
  name: string
  percentage: number
  category: 'language' | 'framework' | 'tool'
}

export const skills: Skill[] = [
  { name: 'HTML', percentage: 100, category: 'language' },
  { name: 'CSS', percentage: 100, category: 'language' },
  { name: 'JavaScript', percentage: 100, category: 'language' },
  { name: 'TypeScript', percentage: 75, category: 'language' },
  { name: 'React', percentage: 85, category: 'framework' },
  { name: 'Next.js', percentage: 80, category: 'framework' },
  { name: 'Tailwind CSS', percentage: 95, category: 'framework' },
  { name: 'Three.js', percentage: 60, category: 'framework' },
  { name: 'GitHub', percentage: 98, category: 'tool' },
  { name: 'VS Code', percentage: 100, category: 'tool' },
  { name: 'Figma', percentage: 70, category: 'tool' },
  { name: 'Vercel', percentage: 80, category: 'tool' },
  { name: 'Firebase', percentage: 65, category: 'tool' },
]

export interface Experience {
  company: string
  role: string
  period: string
  location: string
  type: 'work' | 'academic'
  description: string[]
}

export const experiences: Experience[] = [
  {
    company: 'Sweven Incorporate Pvt. Ltd.',
    role: 'Frontend Intern',
    period: '2025 – Present',
    location: 'Nepal',
    type: 'work',
    description: [
      'Developed responsive user interfaces using React and Tailwind CSS.',
      'Optimized performance of internal dashboards, reducing load times by 20%.',
      'Collaborated with designers to implement pixel-perfect UI components.',
      'Integrated RESTful APIs and managed complex state with React hooks.',
    ],
  },
  {
    company: 'Tribhuvan University (BCA)',
    role: 'BCA VI – Full Stack Project',
    period: '2025 – 2026',
    location: 'Nepal',
    type: 'academic',
    description: [
      'Developed "TravelBuddy", a Travel Recommendation System in collaboration with Pramish Bhandari.',
      'Implemented recommendation algorithms to suggest destinations based on user preferences.',
      'Designed a responsive web interface for seamless itinerary planning.',
    ],
  },
  {
    company: 'Tribhuvan University (BCA)',
    role: 'BCA IV – Full Stack Project',
    period: '2024 – 2025',
    location: 'Nepal',
    type: 'academic',
    description: [
      'Built "DIGITAL MENU", a Restaurant Menu Ordering System in collaboration with Pramish Bhandari.',
      'Developed a Full Stack solution with real-time ordering and menu management.',
      'Presented the project as a core component of the BCA IV curriculum.',
    ],
  },
  {
    company: 'Personal Freelance Work',
    role: 'UI/UX & Frontend Developer',
    period: '2024 – 2025',
    location: 'Remote',
    type: 'work',
    description: [
      'Designed and developed custom portfolio websites for clients.',
      'Improved website accessibility and SEO for local businesses.',
      'Created interactive prototypes using Figma and Framer Motion.',
    ],
  },
]

export interface Project {
  title: string
  subtitle: string
  category: string
  description: string
  image: string
  imageWidth: number
  imageHeight: number
  link?: string
  techStack?: string[]
}

export const projects: Project[] = [
  {
    title: 'TravelBuddy',
    subtitle: 'Travel Recommendation System',
    category: 'Full Stack',
    description: 'A smart recommendation platform that suggests travel destinations and itineraries based on user preferences and historical data.',
    image: '/projects/travelbuddy.png',
    imageWidth: 903,
    imageHeight: 624,
    techStack: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS'],
  },
  {
    title: 'Digital Menu System',
    subtitle: 'Restaurant Menu System',
    category: 'Full Stack',
    description: 'A contactless ordering system with real-time menu updates and seamless customer ordering flow for restaurants.',
    image: '/projects/digital-menu.jpg',
    imageWidth: 1280,
    imageHeight: 831,
    techStack: ['Next.js', 'PostgreSQL', 'Prisma', 'Tailwind CSS'],
  },
  {
    title: 'HariyaliBazar',
    subtitle: 'Farm-to-Home E-Commerce',
    category: 'Frontend',
    description: 'An e-commerce platform connecting local Nepali farmers directly to consumers with organic produce listings and cart management.',
    image: '/projects/hariyalibazar.png',
    imageWidth: 1914,
    imageHeight: 956,
    link: 'https://hariyali-bazar.vercel.app/',
    techStack: ['React', 'Firebase', 'Tailwind CSS', 'Vercel'],
  },
]

export interface Certification {
  title: string
  issuer: string
  date: string
}

export const certifications: Certification[] = [
  {
    title: 'Frontend Development Internship',
    issuer: 'Sweven Incorporate Pvt. Ltd.',
    date: '2025',
  },
  {
    title: 'Advanced React & Next.js',
    issuer: 'Meta / Coursera',
    date: '2024',
  },
  {
    title: 'UI/UX Design Specialist',
    issuer: 'Google UX Design Certificate',
    date: '2024',
  },
]

export interface BlogPost {
  title: string
  excerpt: string
  date: string
  readTime: string
}

export const blogPosts: BlogPost[] = [
  {
    title: 'Why Next.js 15 is a Game Changer for Frontend Devs',
    excerpt: 'Discover how Next.js 15 transforms modern frontend development with improved routing, Partial Prerendering, enhanced Server Components, Turbopack optimizations, and better developer experience. Learn how these features help build faster, more scalable, and SEO-friendly web applications while reducing complexity in production. From the revolutionary App Router that simplifies nested layouts and server-side rendering to the new Partial Prerendering engine that combines static and dynamic content in a single response, every aspect of the framework has been refined. The improved Turbopack integration delivers near-instant Hot Module Replacement during development, while enhanced caching strategies reduce build times by up to 60%. With automatic image optimization, streaming SSR, and built-in SEO utilities, Next.js 15 makes it easier than ever to ship production-grade applications that delight users and search engines alike.',
    date: 'May 10, 2026',
    readTime: '5 min read',
  },
  {
    title: 'Mastering Framer Motion for Immersive Web Animations',
    excerpt: 'Learn how to create elegant, high-performance web animations using Framer Motion. From smooth page transitions and scroll-triggered reveals to interactive hover effects and micro-interactions, this guide explores techniques that elevate user experience without sacrificing performance or accessibility. We dive deep into the animation engine, exploring layout animations that effortlessly transition between states, gesture-based interactions like drag and swipe, and enter/exit animations that bring pages to life. You will learn how to orchestrate complex choreography using variants and stagger children, optimize animation performance with hardware-accelerated transforms, and ensure your animations respect user preferences with built-in reduced motion support. Real-world examples demonstrate how subtle motion can guide attention, provide feedback, and create a cohesive narrative across your interface.',
    date: 'April 25, 2026',
    readTime: '8 min read',
  },
  {
    title: 'My Journey as a Frontend Intern in Nepal',
    excerpt: 'A personal reflection on my frontend internship journey at Sweven Incorporate Pvt. Ltd., where I strengthened my React, Tailwind CSS, and modern frontend development skills. This article shares the real-world challenges I faced, the lessons I learned, and how collaborating on production-ready projects helped me grow as a developer. From debugging complex state management issues to optimizing dashboard performance under tight deadlines, every day presented new opportunities to push my abilities further. I discovered the importance of writing clean, maintainable code, the value of thorough code reviews, and the art of balancing pixel-perfect design with pragmatic engineering. Beyond the technical skills, I learned how to communicate effectively with designers, communicate technical decisions to non-technical stakeholders, and take ownership of features from conception to deployment. This journey transformed me from a hobbyist coder into a confident frontend engineer ready to contribute to real-world products.',
    date: 'April 10, 2026',
    readTime: '12 min read',
  },
]
