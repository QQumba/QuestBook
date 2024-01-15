import DisplaySidebar from './details/display-sidebar';
import QuestDetailsProvider from './providers/quest-details-provider';
import QuestsProvider from './providers/quests-provider';
import Sidebar from './sidebar/sidebar';

export default function MainLayout({ children }: any) {
  return (
    <>
      <main className="grid grid-cols-12 gap-4">
        <div className="col-span-2">
          <Sidebar></Sidebar>
        </div>
        <div className="col-span-6">{children}</div>
        <div className="col-span-4">
          <DisplaySidebar></DisplaySidebar>
        </div>
      </main>
    </>
  );
}
