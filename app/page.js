import { metadata } from './metadata';
import HomeContent from "@/components/HomeContent";
import Script from 'next/script';

export { metadata };

export default function Home() {
  return (
    <>
      {/* Google Analytics */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-KV6KJZGD86"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-KV6KJZGD86');
        `}
      </Script>
      
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
            // Add social media URLs here
            'https://github.com/ljis120301',
          ]
        })
      }} />
      <HomeContent />
    </>
  );
}
