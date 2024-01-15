import { BASE_URL } from '@/url-consts';

export async function updateQuest(quest: Quest): Promise<Quest | undefined> {
  const url = BASE_URL + `quests/${quest.questId}`;
  try {
    const response = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify(quest),
      headers: { 'Content-Type': 'application/json' },
    });
    const updatedQuest: Quest = await response.json();
    return updatedQuest;
  } catch {
    console.log('Error occured while updating quest');
  }
}

export async function loadQuests(): Promise<Quest[]> {
  const url = BASE_URL + 'quests';
  try {
    const response = await fetch(url);
    const quests: Quest[] = await response.json();
    return quests;
  } catch {
    console.log('Error occured while fetching quests');
    return [];
  }
}

export async function removeQuest(questId: number): Promise<boolean> {
  const url = BASE_URL + `quests/${questId}`;
  try {
    const response = await fetch(url, { method: 'DELETE' });
    if (response.ok) {
      return true;
    }
  } catch {
    console.log('Error occured while removing quest');
  }

  return false;
}

export async function createQuest(quest: CreateQuestRequest): Promise<Quest | undefined> {
  const url = BASE_URL + 'quests';
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(quest),
      headers: { 'Content-Type': 'application/json' },
    });
    const createdQuest: Quest = await response.json();
    return createdQuest;
  } catch {
    console.log('Error occured while creating quest');
  }
}
