import Categories from './categoreis';
import SearchBar from './searchbar';

export default function Sidebar() {
  return (
    <div className="flex flex-col p-4 bg-slate-100 h-screen sticky top-0">
      <SearchBar></SearchBar>
      <Categories></Categories>
    </div>
  );
}
