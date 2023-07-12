import React from "react";
// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

export default function FileImport({ files, onFilesUpload }) {
  return (
    <div className="App">
      <FilePond
        files={files}
        onupdatefiles={onFilesUpload}
        allowMultiple={true}
        maxFiles={3}
        name="files"
        server={{
          url: "/api",
          process: null,
          revert: null,
          restore: null,
          load: null,
          fetch: null,
        }}
        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
      />
    </div>
  );
}
