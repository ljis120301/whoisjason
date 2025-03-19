import { metadata } from './metadata';
import HomeContent from "@/components/HomeContent";
import Script from 'next/script';

export { metadata };

export default function Home() {
  return (
    <>
      <Script id="schema-person" type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Jason',
          url: 'https://whoisjason.me',
          jobTitle: 'Software Engineer',
          knowsAbout: [
            'JavaScript',
            'React',
            'Next.js',
            'Full Stack Development',
            'IT Services',
            'Web Development'
          ],
          sameAs: [
            // Add your social media URLs here if applicable
            // 'https://github.com/yourusername',
            // 'https://linkedin.com/in/yourprofile',
          ]
        })
      }} />
      <HomeContent />
    </>
  );
}
