import axios from "axios";
import { useState } from "react";

const App = () => {
  const [page_no, setPageNo] = useState("");
  const [pdf_file, setPdfFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState("");

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!pdf_file || !page_no) {
      console.error("All fields are mandatory!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("page", page_no);
      formData.append("file", pdf_file);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const res = await axios.post(
        "http://localhost:8000/api/extract-text/",
        formData,
        config
      );

      setExtractedText(res.data.result);
    } catch (error) {
      setExtractedText("");
      console.error("Errorr extracting text", error);
    }
  };

  return (
    <>
      <div className="p-6">
        <h1 className="text-3xl border-b">Extract Text from PDF</h1>
        <form className="pt-6 space-y-4" onSubmit={handleOnSubmit}>
          <div>
            <span className="pr-16">Upload PDF:</span>
            <input
              type="file"
              name="pdf_file"
              accept="application/pdf"
              onChange={(e) => e.target.files && setPdfFile(e.target.files[0])}
            />
          </div>
          <div>
            <span className="pr-7">Choose Page No:</span>
            <input
              type="number"
              name="page_no"
              onChange={(e) => setPageNo(e.target.value)}
              className="border border-3 border-black px-1"
            />
          </div>
          <div>
            <button className="bg-teal-700 hover:bg-teal-500 text-white py-2 px-4 rounded-md">
              Extract Text
            </button>
          </div>
        </form>

        {extractedText && (
          <div className="mt-8">
            <h2 className="text-2xl border-b">Extracted Text:</h2>
            <div>
              <pre>{extractedText}</pre>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default App;
