import { casesData } from '@/data/cases';

export const dynamic = "force-static";

export default function sitemap() {
  const baseUrl = 'https://www.saliukautomation.online';

  // Base routes
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];

  // Dynamic case routes
  const caseRoutes = casesData.map((c) => ({
    url: `${baseUrl}/cases/${c.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...routes, ...caseRoutes];
}
