import React from "react";
import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui";
interface DropdownMenuProps {
  trigger: React.ReactNode;
  menuItems: {
    label: string;
    onClick: () => void;
  }[];
}
export default function DropdownMenu({
  trigger,
  menuItems,
}: DropdownMenuProps) {
  return (
    <DropdownMenuPrimitive.Root>
      <DropdownMenuPrimitive.Trigger asChild>
        <div className="relative z-50">{trigger}</div>
      </DropdownMenuPrimitive.Trigger>
      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          sideOffset={5}
          align="end"
          side="top"
          className="bg-[#162329] rounded-2xl shadow-md p-0 w-40 z-50 overflow-hidden"
        >
          <DropdownMenuPrimitive.Arrow className="fill-[#162329]" />
          {menuItems.map((item, index) => (
            <DropdownMenuPrimitive.Item
              key={index}
              className="text-sm text-white px-3 py-2 cursor-pointer hover:bg-[#1f2d34]  transition duration-200 outline-none"
              onClick={item.onClick}
            >
              {item.label}
            </DropdownMenuPrimitive.Item>
          ))}
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  );
}
