import React from "react";
import { useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

export default function RutinasTitleUpload() {
  const [files, setFiles] = useState([]);

  return (
    <div className="App">
      <FilePond
        files={files}
        onupdatefiles={setFiles}
        allowMultiple={true}
        maxFiles={3}
        server={"http://localhost:6001/api/postExercices/sendImage"}
        name="files"
        labelIdle='Arrastra su imagén o <span class="filepond--label-action">Cárgala desde aquí</span>'
        credits={false}
      />
    </div>
  );
}
