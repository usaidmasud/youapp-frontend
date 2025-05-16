import { MessageType } from "@/types/chat.model";
import clsx from "clsx";
import dayjs from "dayjs";

interface MessageProps {
  message: MessageType;
  isSender?: boolean;
}

export default function Message({ message, isSender = false }: MessageProps) {
  return (
    <div
      className={clsx("mb-2 flex", isSender ? "justify-end" : "justify-start")}
    >
      <div
        className={clsx(
          "px-8 pt-2 pb-3 max-w-[80%] break-words",
          isSender
            ? "bg-blue-500 text-white rounded-l-2xl rounded-tr-2xl text-right"
            : "bg-gray-200 text-black rounded-r-2xl rounded-bl-2xl text-left"
        )}
      >
        <span
          className={clsx(
            "block text-[10px] mt-1 opacity-70",
            isSender ? "text-white/80" : "text-gray-600"
          )}
        >
          {dayjs(message.createdAt).format("HH:mm A")}
        </span>
        <p className="text-sm">{message.messages}</p>
      </div>
    </div>
  );
}
