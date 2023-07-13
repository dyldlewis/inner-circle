import React, { useState } from "react";

const ImagePreview = () => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [uploadableImage, setUploadableImage] = useState(null);

  const handleImage = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
    setIsPreviewOpen(true);
    setUploadableImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", uploadableImage);
    formData.append("alt", caption);
    const jwt = localStorage.getItem("jwt");
    const formattedJwt = `Bearer ${jwt}`;

    let result = await fetch("http://localhost:3001/upload", {
      method: "post",
      body: formData,
      headers: {
        Authorization: formattedJwt,
      },
    }).then((response) => {
      console.log(response);
    });

    setImage(null);
    setCaption("");
    setIsPreviewOpen(false);
  };

  return (
    <div className="text-slate-100">
      <label htmlFor="fileInput" className="file-input-label">
        <img className="h-10 w-10 cursor-pointer" src="/plus.svg" />
      </label>
      <input
        type="file"
        id="fileInput"
        className="hidden"
        onChange={handleImage}
      />

      {isPreviewOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-90">
          <form className="flex flex-col items-center">
            <img src={image} className="max-w-xs max-h-xs mb-4 mx-auto" />
            <input
              type="text"
              placeholder="caption"
              className="w-full p-2 border border-gray-300 rounded text-black"
              onChange={(e) => setCaption(e.target.value)}
            />
            <button
              className="border m-2 bg-black w-1/3 border-lime-500 rounded-full"
              onClick={handleSubmit}
            >
              Upload
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ImagePreview;
