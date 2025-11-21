"use client";

import React, { useState } from "react";

interface ImageUploaderProps {
  initialUrl?: string;
  onUploaded: (url: string) => void;
}

export default function ImageUploader({ initialUrl, onUploaded }: ImageUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleSelect = (file: File | null) => {
    setFile(file);
    if (file) {
      const localUrl = URL.createObjectURL(file); // local preview
      setPreviewUrl(localUrl);
    } else {
      setPreviewUrl(null);
    }
  };

  const upload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/upload`, {
      method: "POST",
      body: formData,
    });

    const json = await res.json();
    setUploading(false);

    if (res.ok) {
      onUploaded(json.url);
    } else {
      alert("Upload failed");
    }
  };

  return (
    <div className="flex items-center gap-4">
      <label htmlFor="image-upload" className="sr-only">
        Upload Image
      </label>

      <input
        id="image-upload"
        type="file"
        accept="image/*"
        aria-label="Upload image file"
        onChange={(e) => handleSelect(e.target.files?.[0] ?? null)}
      />

      <button
        type="button"
        onClick={upload}
        disabled={!file || uploading}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>

      {/* Local preview BEFORE upload */}
      {previewUrl && (
        <img
          src={previewUrl}
          alt="local preview"
          className="w-28 h-20 object-cover rounded border"
        />
      )}

      {/* Existing image from DB */}
      {!previewUrl && initialUrl && (
        <img
          src={initialUrl}
          alt="existing preview"
          className="w-28 h-20 object-cover rounded border"
        />
      )}
    </div>
  );
}
