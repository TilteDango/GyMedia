import React from "react";

export default function PostLikes({ likedBy }) {
  return (
    <div className="font-semibold text-sm mx-4 mt-2 mb-4">
      {likedBy.length} Me gusta
    </div>
  );
}
