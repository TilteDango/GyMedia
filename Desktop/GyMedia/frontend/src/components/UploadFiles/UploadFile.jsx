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
export default function AvatarUpload() {
  const [files, setFiles] = useState([]);
  const { token, setToken } = useContext(AuthContext);

  const server = {
    url: "http://localhost:6001/api/user/background",
    process: {
      method: "POST",
      ondata: (formData) => {
        formData.append("userId", token);
        return formData;
      },
    },
  };

  return (
    <div>
      <style>{`.filepond--credits{display:none}`}</style>
      <FilePond
        labelIdle='Arrastra su imagén o <span class="filepond--label-action">Cargala desde aquí</span>'
        files={files}
        onupdatefiles={setFiles}
        server={server}
        name="files"
        imagePreviewHeight="170"
        imageCropAspectRatio="1:1"
        stylePanelLayout="compact"
        styleLoadIndicatorPosition="center bottom"
        styleProgressIndicatorPosition="right bottom"
        styleButtonRemoveItemPosition="left bottom"
        styleButtonProcessItemPosition="right bottom"
      />
    </div>
  );
}
