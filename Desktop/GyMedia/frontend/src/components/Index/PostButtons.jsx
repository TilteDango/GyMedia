import React from "react";
import IndexCommentButton from "../Buttons/IndexCommentButton";
import IndexMgButton from "../Buttons/IndexMgButton";
import IndexShareButton from "../Buttons/IndexShareButton";
import IndexStoreButton from "../Buttons/IndexStoreButton";

export default function PostButtons({ id, liked_by }) {
  return (
    <div className="flex items-center justify-between mx-4 mt-3 mb-2">
      <div className="flex gap-5">
        <IndexMgButton id={id} liked_by={liked_by} />
        <IndexCommentButton />
        <IndexShareButton />
      </div>
      <div className="flex">
        <IndexStoreButton />
      </div>
    </div>
  );
}
