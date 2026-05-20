import Landing from "@/components/landing";
import BASE_URL from '@/lib/seo';

export default function Home() {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Ashwin Parande',
    url: BASE_URL,
    jobTitle: 'Full-stack Developer',
    description:
      'Full-stack developer building modern web apps with Next.js, TypeScript, and scalable video pipelines.',
    sameAs: [
      'https://github.com/Ashpara10',
      'https://www.linkedin.com/in/ashwin-parande-657653294/',
      "https://x.com/ashhhwwinnn"
    ],
  };
  return (
   <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
    />
    <Landing/>
   </>
  );
}
