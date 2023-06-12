import React from "react";
import { useState, useContext } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import FilePondPluginImageCrop from "filepond-plugin-image-crop";
import FilePondPluginImageResize from "filepond-plugin-image-resize";
import FilePondPluginImageTransform from "filepond-plugin-image-transform";
import FilePondPluginImageEdit from "filepond-plugin-image-edit";
import { AuthContext } from "../../Context/AuthContext";

registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType,
  FilePondPluginImageCrop,
  FilePondPluginImageResize,
  FilePondPluginImageTransform,
  FilePondPluginImageEdit
);
export default function PostImage() {
  const [files, setFiles] = useState([]);
  const { token, setToken } = useContext(AuthContext);

  const server = {
    url: "http://localhost:6001/api/post/image",
    process: {
      method: "POST",
      ondata: (formData) => {
        formData.append("userId", token);
        return formData;
      },
    },
  };

  return (
    <div className="w-4/4 h-96">
      <style>{`.filepond--credits{display:none}`}</style>
      <FilePond
        labelIdle='Arrastra su imagén o <span class="filepond--label-action">Cargala desde aquí</span>'
        files={files}
        onupdatefiles={setFiles}
        server={server}
        name="files"
        imageCropAspectRatio="1:1"
        imagePreviewHeight="350"
        imageResizeTargetWidth="200"
        styleLoadIndicatorPosition="center bottom"
        styleProgressIndicatorPosition="right bottom"
        styleButtonRemoveItemPosition="left bottom"
        styleButtonProcessItemPosition="right bottom"
      />
    </div>
  );
}
