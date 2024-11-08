export const metadata = {
  title: "Jason's Website | Portfolio & Projects",
  description: "Explore Jason's portfolio website featuring software engineering projects, technical blog posts, and professional experience in web development. Specializing in Next.js, React, and full-stack development with expertise in IT services, networking, and cloud solutions.",
  keywords: [
    // Core Professional Identity
    "software engineer", "web developer", "full stack developer", "IT professional", "freelance developer",
    
    // Technical Skills
    "JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Python", "HTML5", "CSS3", "Tailwind CSS",
    "REST API", "GraphQL", "SQL", "NoSQL", "MongoDB", "PostgreSQL", "Git", "Docker", "AWS", "cloud computing",
    
    // Services & Expertise
    "web development", "mobile development", "responsive design", "UI/UX design", "frontend development",
    "backend development", "database design", "API development", "system architecture", "DevOps",
    "cloud solutions", "IT consulting", "technical support", "network administration", "cybersecurity",
    
    // Project Types
    "portfolio website", "e-commerce solutions", "business applications", "web applications",
    "custom software development", "enterprise solutions", "startup solutions", "scalable applications",
    
    // Industry Specific
    "IT services", "technology consulting", "digital transformation", "software solutions",
    "tech infrastructure", "network solutions", "cloud migration", "system integration",
    
    // Certifications & Expertise Areas
    "Google certified", "IT fundamentals", "networking expert", "Linux administration",
    "cloud architecture", "security specialist", "AI implementation", "machine learning",
    
    // Location & Service Area
    "remote developer", "international freelancer", "global IT services",
    
    // Quality Indicators
    "professional developer", "experienced engineer", "reliable IT partner", "certified professional",
    "expert developer", "skilled programmer", "technical expert", "IT specialist",
    
    // Modern Tech Stack
    "modern web development", "JAMstack", "serverless", "microservices", "progressive web apps",
    "single page applications", "static site generation", "headless CMS",
    
    // Methodologies
    "agile development", "scrum methodology", "continuous integration", "continuous deployment",
    "test-driven development", "clean code", "best practices", "software architecture"
  ].join(", "), // Join array with commas for proper metadata formatting
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        sizes: 'any',
      },
    ],
    apple: [
      {
        url: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  },
  openGraph: {
    title: "Jason's Website | Portfolio & Projects",
    description: "Explore Jason's portfolio website featuring software engineering projects, technical blog posts, and professional experience in web development.",
    type: "website",
    url: "https://whoisjason.me",
    images: [
      {
        url: "/pi.png", // Add your actual OG image path
        width: 1200,
        height: 630,
        alt: "Jason's Portfolio Website",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jason's Website | Portfolio & Projects",
    description: "Explore Jason's portfolio website featuring software engineering projects, technical blog posts, and professional experience in web development.",
    images: ["/pi.png"], // Add your actual Twitter card image path
  },
  robots: {
    index: true,
    follow: true,
  },
};
