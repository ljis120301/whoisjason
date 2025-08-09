export const metadata = {
  title: 'Terms of Service | Jason',
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <main className="prose dark:prose-invert max-w-3xl mx-auto px-4 py-12">
      <h1>Terms of Service</h1>
      <p>
        By accessing or using this website, you agree to these terms. Content is provided
        for informational purposes. We may update or modify content at any time without notice.
      </p>
      <h2>Acceptable Use</h2>
      <p>
        You agree not to misuse the site, including attempting to gain unauthorized access,
        interfering with operation, or violating applicable laws.
      </p>
      <h2>Liability</h2>
      <p>
        This site is provided &quot;as is&quot; without warranties. We are not liable for any damages
        arising from use of the site.
      </p>
      <h2>Contact</h2>
      <p>
        For any questions about these terms, please use the contact section of the site.
      </p>
      <p className="text-sm text-gray-500">Last updated: {new Date().getFullYear()}</p>
    </main>
  );
}


