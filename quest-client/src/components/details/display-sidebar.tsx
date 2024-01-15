import QuestDetails from './quest-details';

export default function DisplaySidebar() {
  return (
    <div className="bg-slate-100 flex flex-col h-screen top-0 sticky p-4">
      <QuestDetails></QuestDetails>
    </div>
  );
}
