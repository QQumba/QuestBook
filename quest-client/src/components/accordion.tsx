import { useState } from 'react';

export default function Accrodion({
  header,
  children,
}: {
  header: any;
  children: any;
}) {
  const [opened, setOpened] = useState<boolean>(false);

  return (
    <div className="border rounded bg-slate-50">
      <div onClick={() => setOpened((prev) => !prev)} className="select-none p-2 hover:bg-slate-100">
        {header()}
      </div>
      <div
        className={`grid transition-grid ${
          opened ? 'grid-rows-1' : 'grid-rows-collapsed-1'
        }`}
      >
        <div className="overflow-hidden m-2 mt-0">{children}</div>
      </div>
    </div>
  );
}
