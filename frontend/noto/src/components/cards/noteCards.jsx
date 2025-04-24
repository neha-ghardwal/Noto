import {
  MdOutlinePushPin,
  MdPushPin, // ← import the filled pin
  MdCreate,
  MdDelete,
  MdLabel,
  MdCalendarToday,
} from "react-icons/md";
import moment from "moment";

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
    <div className="relative rounded-xl bg-neutral-800 border border-green-500/30 shadow-[0_0_8px_#00ff5530] hover:shadow-[0_0_12px_#00ff5560] transition-all duration-200 p-5 group">
      {/* Header */}
      <div className="flex justify-between items-start gap-3 mb-3">
        <div className="overflow-hidden flex items-center gap-2">
          <div>
            <h6 className="text-lg font-medium text-green-400 truncate">
              {title}
            </h6>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <MdCalendarToday className="text-xs" />
              <span className="font-mono">
                {moment(date).format("Do MMMM YYYY")}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={onPinNote}
          className="p-1 rounded-full hover:bg-green-500/10 transition-colors group-hover:opacity-100"
          aria-label={isPinned ? "Unpin note" : "Pin note"}
        >
          {isPinned ? (
            <MdPushPin className="text-xl text-green-400" />
          ) : (
            <MdOutlinePushPin className="text-xl text-gray-600" />
          )}
        </button>
      </div>

      {/* Content */}
      <p className="text-gray-300 text-sm line-clamp-3 mb-4 leading-relaxed pl-7 relative">
        {content}
      </p>

      {/* Footer */}
      <div className="flex justify-between items-center border-t border-green-500/10 pt-3">
        <div className="flex items-center gap-1 text-xs text-green-300 bg-green-500/10 px-2 py-1 rounded-full">
          <MdLabel className="text-xs" />
          <span className="font-mono">{tags.join(", ")}</span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={onEdit}
            className="p-1.5 rounded-full hover:bg-green-500/10 text-gray-400 hover:text-green-400 transition-colors"
            aria-label="Edit note"
          >
            <MdCreate className="text-lg" />
          </button>
          <button
            onClick={onDelete}
            className="p-1.5 rounded-full hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-colors"
            aria-label="Delete note"
          >
            <MdDelete className="text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
