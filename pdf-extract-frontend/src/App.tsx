const App = () => {
  return (
    <>
      <div className="p-6">
        <h1 className="text-3xl border-b">Extract Text from PDF</h1>
        <form className="pt-6 space-y-4">
          <div>
            <span className="pr-16">Upload PDF:</span>
            <input type="file" name="pdf_file" accept="application/pdf" />
          </div>
          <div>
            <span className="pr-7">Choose Page No:</span>
            <input
              type="number"
              name="page_no"
              accept="Page No."
              className="border border-3 border-black px-1"
            />
          </div>
          <div>
            <button className="bg-teal-700 hover:bg-teal-500 text-white py-2 px-4 rounded-md">
              Extract Text
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default App;
