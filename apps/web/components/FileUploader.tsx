"use client";

import React, { useCallback, useEffect, useState } from "react";
import Dropzone, {
  type DropzoneProps,
  type FileRejection,
} from "react-dropzone";
import Image from "next/image";
import { formatBytes } from "@/lib/utils";
import { useControllableState } from "@/hooks/use-controllable-state";
import { toast } from "sonner";
import { cn } from "@repo/ui/lib/utils";
import { Button } from "@repo/ui/components/button";
import { Progress } from "@repo/ui/components/progress";

type FileWithPreviewType = File & { preview: string };

interface FileUploaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Value of the uploader.
   * @type File[]
   * @default undefined
   * @example value={files}
   */
  value?: File[];

  /**
   * Function to be called when the value changes.
   * @type React.Dispatch<React.SetStateAction<File[]>>
   * @default undefined
   * @example onValueChange={(files) => setFiles(files)}
   */
  onValueChange?: React.Dispatch<React.SetStateAction<File[]>>;

  /**
   * Function to be called when files are uploaded.
   * @type (files: File[]) => Promise<void>
   * @default undefined
   * @example onUpload={(files) => uploadFiles(files)}
   */
  onUpload?: (files: File[]) => Promise<void>;

  /**
   * Progress of the uploaded files.
   * @type Record<string, number> | undefined
   * @default undefined
   * @example progresses={{ "file1.png": 50 }}
   */
  progresses?: Record<string, number>;

  /**
   * Accepted file types for the uploader.
   * @type { [key: string]: string[]}
   * @default
   * ```ts
   * { "image/*": [] }
   * ```
   * @example accept={["image/png", "image/jpeg"]}
   */
  accept?: DropzoneProps["accept"];

  /**
   * Maximum file size for the uploader.
   * @type number | undefined
   * @default 1024 * 1024 * 2 // 2MB
   * @example maxSize={1024 * 1024 * 2} // 2MB
   */
  maxSize?: DropzoneProps["maxSize"];

  /**
   * Maximum number of files for the uploader.
   * @type number | undefined
   * @default 1
   * @example maxFiles={5}
   */
  maxFiles?: DropzoneProps["maxFiles"];

  /**
   * Whether the uploader should accept multiple files.
   * @type boolean
   * @default false
   * @example multiple
   */
  multiple?: boolean;

  /**
   * Whether the uploader is disabled.
   * @type boolean
   * @default false
   * @example disabled
   */
  disabled?: boolean;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  value,
  onValueChange,
  onUpload,
  progresses,
  accept = { "image/*": [] },
  maxSize = 1024 * 1024 * 2,
  maxFiles = 1,
  multiple = false,
  disabled = false,
  className,
  ...props
}) => {
  const [isUploading, setIsUploading] = useState(false);

  // Update internal state when value changes
  const [files, setFiles] = useControllableState({
    prop: value,
    onChange: onValueChange,
  });

  // Update value when files change
  useEffect(() => {
    if (onValueChange && files !== value) {
      onValueChange(files ?? []);
    }
  }, [files, onValueChange, value]);

  const onDrop = useCallback(
    async (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      if (!multiple && maxFiles === 1 && acceptedFiles.length > 1) {
        toast("Cannot upload more than 1 file at a time");
        return;
      }
      if ((files?.length ?? 0) + acceptedFiles.length > maxFiles) {
        toast(
          `Cannot upload more than ${maxFiles} file${maxFiles > 1 ? "s" : ""}`
        );
        return;
      }

      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      const updatedFiles = files ? [...files, ...newFiles] : newFiles;

      setFiles(updatedFiles);

      // Show error for rejected files
      if (rejectedFiles.length > 0) {
        rejectedFiles.forEach(({ file, errors }) => {
          const errorMessages = errors.map((e) => {
            if (e.code === "file-too-large") {
              return `File ${file.name} is too large. Max size is ${formatBytes(
                maxSize
              )}`;
            }
            if (e.code === "file-invalid-type") {
              return `File ${file.name} has invalid type`;
            }
            return e.message;
          });

          addToast({
            title: "File Rejected",
            description: errorMessages.join(", "),
            severity: "danger",
          });
        });
      }

      // Handle auto upload if onUpload is provided
      if (
        files &&
        onUpload &&
        acceptedFiles.length > 0 &&
        updatedFiles.length > 0 &&
        updatedFiles.length <= maxFiles
      ) {
        try {
          setIsUploading(true);

          await onUpload(updatedFiles);

          toast("Files have been uploaded successfully", {
            onDismiss: () => {
              setFiles([]); // Clear files after successful upload
            },
          });
        } catch (error) {
          toast(
            error instanceof Error ? error.message : "Failed to upload files"
          );
        } finally {
          setIsUploading(false);
        }
      }
    },
    [files, multiple, maxFiles, onUpload, setFiles, maxSize]
  );

  const handleRemoveFile = (index: number) => {
    if (!files) return;
    const newFiles = [...files];

    // Revoke object URL to avoid memory leaks
    if (newFiles[index] && (newFiles[index] as FileWithPreviewType).preview) {
      URL.revokeObjectURL(
        (newFiles[index] as FileWithPreviewType).preview as string
      );
    }

    newFiles.splice(index, 1);
    setFiles(newFiles);
    if (onValueChange) {
      onValueChange(newFiles);
    }
  };

  return (
    <div className={cn("w-full", className)} {...props}>
      <Dropzone
        accept={accept}
        maxSize={maxSize}
        maxFiles={maxFiles}
        multiple={multiple}
        disabled={disabled || isUploading}
        onDrop={onDrop}
      >
        {({ getRootProps, getInputProps, isDragActive }) => (
          <div
            {...getRootProps()}
            className={cn(
              "border-2 border-dashed rounded-xl p-6 transition-colors flex flex-col items-center justify-center cursor-pointer",
              isDragActive
                ? "border-[#8936FF] bg-[#8936FF]/10"
                : "border-gray-300 dark:border-gray-700 hover:border-[#8936FF]/70",
              disabled && "opacity-50 cursor-not-allowed",
              className
            )}
          >
            <input {...getInputProps()} />

            <div className="flex flex-col items-center justify-center text-center p-4">
              <div className="w-14 h-14 rounded-full bg-[#8936FF]/20 flex items-center justify-center mb-4">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-[#8936FF]"
                >
                  <path
                    d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M17 8L12 3L7 8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 3V15"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <p className="text-sm font-medium mb-1">
                {isDragActive
                  ? "Drop files here"
                  : files && files.length >= maxFiles
                    ? "File limit reached"
                    : "Drag & drop files here"}
              </p>

              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                {files && files.length >= maxFiles
                  ? `Maximum ${maxFiles} file${maxFiles > 1 ? "s" : ""} allowed`
                  : `or browse to upload (max ${formatBytes(maxSize)})`}
              </p>

              {!isDragActive &&
                files &&
                files.length < maxFiles &&
                !disabled && (
                  <Button
                    size="sm"
                    color="primary"
                    variant={"ghost"}
                    className="mt-2"
                    disabled={disabled || isUploading}
                  >
                    Select File{multiple ? "s" : ""}
                  </Button>
                )}
            </div>
          </div>
        )}
      </Dropzone>

      {/* File Preview */}
      {files && files.length > 0 && (
        <div className="mt-4 space-y-3">
          {files.map((file, index) => {
            const progress = progresses?.[file.name] ?? 0;
            const isImage = file.type.startsWith("image/");

            return (
              <div
                key={`${file.name}-${index}`}
                className="flex items-center p-3 rounded-lg bg-gray-100 dark:bg-gray-800"
              >
                <div className="flex-shrink-0 mr-3">
                  {isImage && (file as FileWithPreviewType).preview ? (
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700">
                      <Image
                        src={(file as FileWithPreviewType).preview}
                        alt={file.name}
                        width={48}
                        height={48}
                        loading="lazy"
                        className="aspect-square shrink-0 rounded-md object-cover size-12 w-auto h-auto"
                      />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-lg bg-[#8936FF]/20 flex items-center justify-center">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-[#8936FF]"
                      >
                        <path
                          d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M14 2V8H20"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {formatBytes(file.size)}
                  </p>

                  {progresses && (
                    <Progress
                      value={progress}
                      className="h-1 mt-1"
                      color="primary"
                    />
                  )}
                </div>

                <div className="flex-shrink-0 ml-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    color="danger"
                    onClick={() => handleRemoveFile(index)}
                    disabled={disabled || isUploading}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18 6L6 18"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M6 6L18 18"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FileUploader;
