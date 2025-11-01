"use client";
import React, { useState } from "react";

const PosteContent = () => {
  type BlockProps = { text: string | null } | { Image_Url: string | null };

  const [articale, setArtical] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [blocks, setBlocks] = useState<BlockProps[]>([]);

  const AddText = () => {
    setBlocks([...blocks, { text: articale }]);
    setArtical("");
  };
  const AddImage = async () => {
    try {
      if (!image) return console.error("image not found");
      const formData = new FormData();
      formData.append("file", image);
      const res = await fetch(`/api/image-upload`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) return console.error("response not found");
      const ImageUrl = await res.json();
      if (!ImageUrl.url || ImageUrl.url === "")
        return console.error("Image url not returned");
      const newImageUrl: string = ImageUrl.url;
      console.log(ImageUrl?.url);
      setBlocks([...blocks, { Image_Url: newImageUrl }]);
      setImage(null);
    } catch (error) {
      console.error("Something went worng");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (blocks.length === 0) return;
      const fromData = new FormData();
      fromData.append("blocks", JSON.stringify(blocks));
      const res = await fetch(`/api/test-api`, {
        method: "POST",
        body: fromData,
      });
      if (!res.ok) return console.error("response not ok");
      alert("content upload successfully");
    } catch (error) {
      console.error("message", error);
    }
  };
  return (
    <div className="p-4 max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Add new articale"
          value={articale}
          onChange={(e) => setArtical(e.target.value)}
          className="w-full p-2 border"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="w-full p-2 border"
        />
        <div className="flex gap-2">
          <button
            type="button"
            onClick={AddText}
            disabled={!articale}
            className="px-3 py-1 bg-blue-500 text-white rounded"
          >
            Add new text
          </button>
          <button
            type="button"
            onClick={AddImage}
            disabled={!image}
            className="px-3 py-1 bg-green-500 text-white rounded disabled:opacity-50"
          >
            Add new image
          </button>
        </div>
        <button
          type="submit"
          disabled={blocks.length === 0}
          className="w-full py-2 bg-indigo-600 text-white rounded"
        >
          Post
        </button>
      </form>

      <div>
        {blocks.map((block, index) => (
          <div key={index}>
            {"text" in block && <p>{block.text}</p>}
            {"Image_Url" in block && block.Image_Url && (
              <img src={block.Image_Url} alt="" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PosteContent;
