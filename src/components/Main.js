import { useState } from "react";
import ImagePreview from "./ImagePreview";
import SelectFile from "./SelectFile";
function Main() {
  const [selectedFile, setselectedFile] = useState();
  function fileChangeHandler(file) {
    console.log(file);
    setselectedFile(file);
  }
  /////////////////////////////////////////////////

  return (
    <>
      {!selectedFile && <SelectFile onFileChange={fileChangeHandler} />}
      {selectedFile && <ImagePreview selectedFile={selectedFile} />}
    </>
  );
}
export default Main;
