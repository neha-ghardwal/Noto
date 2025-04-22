import { MdOutlinePushPin } from "react-icons/md";
import { MdCreate, MdDelete } from "react-icons/md";

const NoteCard = ({
  title,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
}) => {
  return (
    <div className="rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h6 className="text-lg font-semibold text-gray-800">{title}</h6>
          <span className="text-sm text-gray-500">{date}</span>
        </div>

        <MdOutlinePushPin
          className={`text-xl cursor-pointer ${
            isPinned ? "text-blue-500" : "text-gray-400"
          }`}
          onClick={onPinNote}
        />
      </div>

      <p className="text-gray-600 text-sm line-clamp-2 mb-4">{content}</p>

      <div className="flex justify-between items-center">
        <div className="text-xs text-gray-500">{tags}</div>

        <div className="flex items-center gap-3">
          <MdCreate
            className="text-gray-600 hover:text-green-600 cursor-pointer"
            onClick={onEdit}
          />
          <MdDelete
            className="text-gray-600 hover:text-red-600 cursor-pointer"
            onClick={onDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
