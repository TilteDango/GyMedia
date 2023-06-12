import React, { useEffect, useState } from "react";
import PostButtons from "./PostButtons";
import PostHeader from "./PostHeader";
import PostImage from "./PostImage";
import PostLikes from "./PostLikes";

export default function PostComponent({ post, active }) {
  const { image_path, creator, description, liked_by, _id } = post;

  return (
    <div className="bg-white border rounded-sm max-w-md m-auto my-3">
      <PostHeader creator={creator} />
      <PostImage image_path={image_path} />
      <p className="ml-4 my-2">{description}</p>
      <PostButtons id={_id} liked_by={liked_by} />
      <PostLikes likedBy={liked_by} />
    </div>
  );
}
