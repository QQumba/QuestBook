import { BASE_URL } from '@/url-consts';
import { useEffect, useState } from 'react';
import QuestSection from '@/components/quest-section';

export default function Index() {
  const [sections, setSections] = useState<Section[]>([]);

  useEffect(() => {
    fetchSections();
  }, []);

  async function fetchSections() {
    const url = BASE_URL + 'sections';
    try {
      const response = await fetch(url);
      const sections = await response.json();
      setSections(sections);
    } catch {
      console.log('Error while fetching sections');
    }
  }

  return (
    <div className="max-w-4xl m-auto space-y-4 mt-4">
      {sections.map((section) => (
        <QuestSection key={section.sectionId} section={section}></QuestSection>
      ))}
    </div>
  );
}
