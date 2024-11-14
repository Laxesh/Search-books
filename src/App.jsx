import { useEffect, useState } from "react";
import "./App.css";
import close from "/src/icon/icons8-close.svg";

function App() {
  const [bookName, setBookName] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState(false);

  async function fatchApi(bookName) {
    setLoading(true);
    const api = await fetch(`https://openlibrary.org/search.json?q=${bookName}`);
    const data = await api.json();
    setBooks(data.docs);
    setLoading(false);
    setTableData(true);
  }

  const clickme = () => {
    setBookName(" ");
  };
  const sortBooksByaYear = () => {
    const sortedBooks = [...books].sort((a, b) => (a.first_publish_year || 0) - (b.first_publish_year || 0));
    setBooks(sortedBooks);
  };
  const sortBooksBydYear = () => {
    const sortedBooks = [...books].sort((a, b) => (b.first_publish_year || 0) - (a.first_publish_year || 0));
    setBooks(sortedBooks);
  };

  return (
    <>
      <main className="flex min-h-screen flex-col items-center p-16">
        <div className="flex items-center border rounded-md overflow-hidden">
          <input
            className="px-4 py-2 w-full focus:outline-none bg-white"
            type="text"
            name=""
            id=""
            placeholder="Search books here"
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                fatchApi(bookName);
              }
            }}
          />
          <button className="bg-gray-300 text-gray-700 px-4 py-2" onClick={clickme}>
            <img src={close} alt="" className="w-6 h-6 bg-transparent" />
          </button>
        </div>
        <div>
          <h1 className="text-3xl font-bold mt-8 mb-4">Book Information</h1>
          <div className="">
            <p>Enter a search term to find books.</p>
          </div>
        </div>
        <div className="my-1">
          <button className="bg-gray-300  text-black px-4 py-2 rounded-md mt-1" onClick={sortBooksByaYear}>
            Sort Ascending By Publish Year
          </button>
          <button className="bg-gray-300  text-black px-4 py-2 rounded-md m-1" onClick={sortBooksBydYear}>
            Sort Descending By Publish Year
          </button>
        </div>
        <div className="">
          {loading ? <p>Loading.....</p> : <div></div>}
          {tableData ? (
            <div className="container mx-auto mt-7 bg-white">
              <table className="min-w-full bg-white border border-gray-200 max-w-[1250px]">
                <thead className="block">
                  <tr>
                    <th className="py-2 px-4 border-b w-[30%] text-left">Title</th>
                    <th className="py-2 px-4 border-b w-[20%] text-left">Author(s)</th>
                    <th className="py-2 px-4 border-b w-[15%] text-left">Year First Published</th>
                    <th className="py-2 px-4 border-b w-[20%] text-left">ISBN</th>
                    <th className="py-2 border-b w-[15%] text-left ml-1">Number of Pages</th>
                  </tr>
                </thead>
                <tbody className="max-h-72 overflow-y-auto block">
                  {books.map((book, index) => (
                    <tr key={index}>
                      <td className="py-2 px-4 border-b w-[30%] break-words">{book.title}</td>
                      <td className="py-2 px-4 border-b w-[20%] break-words">
                        {book.author_name ? book.author_name.join(", ") : "N/A"}
                      </td>
                      <td className="py-2 px-4 border-b w-[15%] break-words">{book.first_publish_year || "N/A"}</td>
                      <td className="py-2 px-4 border-b w-[20%] break-words">{book.isbn ? book.isbn[0] : "N/A"}</td>
                      <td className="py-2 px-4 border-b w-[15%] break-words">{book.number_of_pages_median || "N/A"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </main>
    </>
  );
}

export default App;
