export const metadata = {
  title: 'Privacy Policy | Jason',
  robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="prose dark:prose-invert max-w-3xl mx-auto px-4 py-12">
      <h1>Privacy Policy</h1>
      <p>
        We respect your privacy. This website may use cookies and similar technologies to
        analyze traffic and serve advertisements via Google AdSense. Data collection and
        usage comply with Google policies and applicable law.
      </p>
      <h2>Advertising and Cookies</h2>
      <p>
        Third-party vendors, including Google, use cookies to serve ads based on your prior
        visits to this website and other websites. Google’s use of advertising cookies enables
        it and its partners to serve ads based on your visits. You can opt out of personalized
        advertising by visiting Google’s Ads Settings.
      </p>
      <h2>Analytics</h2>
      <p>
        We may use analytics tools to understand site usage and improve performance. Data
        is aggregated and anonymized.
      </p>
      <h2>Contact</h2>
      <p>
        For privacy-related requests, please use the contact form on the site.
      </p>
      <p className="text-sm text-gray-500">Last updated: {new Date().getFullYear()}</p>
    </main>
  );
}


