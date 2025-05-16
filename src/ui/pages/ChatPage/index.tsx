"use client";
import { useGetMessage } from "@/hooks/chat/UseGetMessage";
import { useSendMessage } from "@/hooks/chat/useSendMessage";
import { useSocket } from "@/libs/socket/SocketProvider";
import {
  MessageResponse,
  MessageType,
  SendMessagePayload,
} from "@/types/chat.model";
import Button from "@/ui/components/Button";
import CopyableIcon from "@/ui/components/CopyableIcon";
import FormGroup from "@/ui/components/FormGroup";
import PageHeader from "@/ui/components/PageHeader";
import Spinner from "@/ui/components/Spinner";
import TextInputOutline from "@/ui/components/TextInputOutline";
import MainLayout from "@/ui/layouts/MainLayout";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import Message from "./components/Message";
import { sendMessageSchema } from "./schemas/send-message.schema";
import { useGetAnotherUser } from "@/hooks/profile/useGetAnotherUser";
import SelectInput from "@/ui/components/SelectInput";
import { SelectOption } from "@/types/root.model";

export default function ChatPage() {
  const { data: session } = useSession();
  const [selectedReceiver, setSelectedReceiver] =
    React.useState<SelectOption | null>(null);
  const socket = useSocket();
  const { data: anotherUser } = useGetAnotherUser();
  const {
    reset,
    handleSubmit,
    control,
    formState: { errors, isValid },
    watch,
    setFocus,
  } = useForm<SendMessagePayload>({
    resolver: zodResolver(sendMessageSchema),
    defaultValues: {
      receiverId: "",
      messages: "",
    },
  });

  const {
    data: messages,
    refetch: refetchMessages,
    isLoading: isLoadingMessages,
  } = useGetMessage({
    receiverId: watch("receiverId"),
  });

  React.useEffect(() => {
    if (!socket) return;
    socket.on("notification", () => {
      refetchMessages();
    });

    return () => {
      socket.off("notification");
    };
  }, [socket, refetchMessages]);

  const { mutate: sendMessage } = useSendMessage();

  const onSubmit = (data: SendMessagePayload) => {
    sendMessage(data);
    refetchMessages();
    reset({
      receiverId: data.receiverId,
      messages: "",
    });
    setTimeout(() => {
      setFocus("messages");
    }, 200);
  };
  return (
    <MainLayout>
      <PageHeader
        title="Chat"
        backUrl="/"
        extra={
          <div
            className={clsx(
              "w-3 h-3 rounded-full animate-pulse",
              socket?.connected ? "bg-green-500" : "bg-red-500"
            )}
          ></div>
        }
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="receiverId"
          control={control}
          render={({ field }) => (
            <FormGroup
              className="mb-4"
              label="Receiver ID"
              error={errors.receiverId?.message}
            >
              <SelectInput
                align="left"
                options={anotherUser?.map((user) => ({
                  value: user._id,
                  label: user.username,
                }))}
                value={selectedReceiver}
                onChange={(value) => {
                  setSelectedReceiver(value);
                  field.onChange(value?.value);
                }}
                placeholder="Receiver ID"
              />
            </FormGroup>
          )}
        />
        <Controller
          name="messages"
          control={control}
          render={({ field }) => (
            <FormGroup
              className="mb-4"
              label="Message"
              error={errors.messages?.message}
            >
              <TextInputOutline align="left" placeholder="Message" {...field} />
            </FormGroup>
          )}
        />
        <Button type="submit" isActive={isValid}>
          Send
        </Button>
      </form>
      <div className=" mt-6 flex flex-col gap-2  overflow-auto">
        {isLoadingMessages ? (
          <Spinner size="md" />
        ) : (
          messages?.data?.map((message: MessageType) => (
            <Message
              key={message._id}
              message={message}
              isSender={message.senderId === session?.userId}
            />
          ))
        )}
      </div>
    </MainLayout>
  );
}
