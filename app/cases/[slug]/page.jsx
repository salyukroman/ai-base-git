import { getCaseById, casesData } from '@/data/cases';
import CaseDetailView from './CaseDetailView';

export function generateStaticParams() {
  return casesData.map((c) => ({
    slug: c.id,
  }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const caseData = getCaseById(resolvedParams.slug);
  if (!caseData) return { title: 'Case Not Found' };
  
  return {
    title: `${caseData.title} | Роман Салюк`,
    description: caseData.description,
  };
}

export default async function CasePage({ params }) {
  const resolvedParams = await params;
  const caseData = getCaseById(resolvedParams.slug);
  return <CaseDetailView caseData={caseData} />;
}
