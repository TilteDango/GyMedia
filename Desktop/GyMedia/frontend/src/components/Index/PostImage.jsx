import React from "react";

export default function PostImage({ image_path }) {
  return <img src={image_path} className="w-full min-h-full" />;
}
