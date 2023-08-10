import { useState } from "react";
import ImagePreview from "./ImagePreview";
import SelectFile from "./SelectFile";
function Main() {
  const [selectedFile, setselectedFile] = useState();
  const [fileCompressSummary, setfileCompressSummary] = useState();
  function fileChangeHandler(files, summary) {
    setselectedFile(files);
    setfileCompressSummary(summary);
  }
  function closePreviewHandler() {
    setselectedFile(undefined);
    setfileCompressSummary(undefined);
  }

  return (
    <>
      {!selectedFile && <SelectFile onFileChange={fileChangeHandler} />}
      {selectedFile && (
        <ImagePreview
          selectedFile={selectedFile}
          fileCompressSummary={fileCompressSummary}
          onClose={closePreviewHandler}
        />
      )}
    </>
  );
}
export default Main;
