// FileUploadPage.tsx

import React from 'react';
import { useDropzone } from 'react-dropzone';
import 'tailwindcss/tailwind.css';

interface FileUploadPageProps {
  onFilesUploaded: (files: File[]) => void;
}

interface CustomFile extends File {
  preview: string;
}

const FileUploadPage: React.FC<FileUploadPageProps> = (props) => {
  const { onFilesUploaded } = props;

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'application/pdf',
    onDrop: (acceptedFiles) => {
      const files: CustomFile[] = acceptedFiles.map((file) => ({
        ...file,
        preview: URL.createObjectURL(file),
      }));

      onFilesUploaded(files);
    },
  });

  return (
    <div
      {...getRootProps()}
      className="flex flex-col items-center justify-center w-full h-screen border-2 border-dashed border-gray-400 rounded-lg p-8"
    >
      <input {...getInputProps()} />
      <div className="text-2xl font-semibold text-gray-600">
        Drag and drop your PDF resume here, or click to select a file
      </div>
      {isDragActive ? (
        <div className="text-xl text-gray-500 mt-2">Release to upload</div>
      ) : (
        <div className="text-xl text-gray-500 mt-2">PDF files only</div>
      )}
    </div>
  );
};

export default FileUploadPage;