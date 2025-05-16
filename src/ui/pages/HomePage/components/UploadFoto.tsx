import Image from "next/image";
import React, { useCallback } from "react";

interface UploadFotoProps {
  imageUrl?: string;
  onImageChange: (file: File | null) => void;
}
function UploadFoto({ imageUrl, onImageChange }: UploadFotoProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(file);
        if (onImageChange) {
          onImageChange(file);
        }
      } else {
        setPreviewUrl(null);
        if (onImageChange) {
          onImageChange(null);
        }
      }
    },
    [onImageChange]
  );

  return (
    <div className="flex items-center gap-4">
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
        ref={fileInputRef}
      />
      <div
        className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center overflow-hidden cursor-pointer"
        onClick={handleImageClick}
      >
        {!imageUrl && (
          <Image
            src="/assets/icons/plus-golden.svg"
            alt="upload"
            width={20}
            height={20}
          />
        )}
        {imageUrl && !previewUrl && (
          <div className="relative w-full h-full">
            <Image src={imageUrl} alt="upload" fill className="object-cover" />
          </div>
        )}
        {imageUrl && previewUrl && (
          <div className="relative w-full h-full">
            <Image
              src={previewUrl}
              alt="upload"
              fill
              className="object-cover"
            />
          </div>
        )}
      </div>
      <p className="font-medium text-xs text-white">Add image</p>
    </div>
  );
}
export default React.memo(UploadFoto);
