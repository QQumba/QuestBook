import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';

export default function DragDrophandle() {
  return (
    <span className=" text-gray-400 cursor-grab" style={{ margin: '0 -8px' }}>
      <EllipsisVerticalIcon
        className="h-6 inline"
        style={{ marginRight: '-18px' }}
      ></EllipsisVerticalIcon>
      <EllipsisVerticalIcon className="h-6 inline"></EllipsisVerticalIcon>
    </span>
  );
}
