import { useState } from "react";
import "./App.css";
import close from "/src/icon/icons8-close.svg";
import up from "./icon/arrow-small-up.png";
import down from "./icon/arrow-small-down.png";
function App() {
  const [bookName, setBookName] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState(false);

  const [currentPage, setCureentPage] = useState(1);
  const recordsPage = 10;
  const lastIndex = currentPage * recordsPage;
  const firstIndex = lastIndex - recordsPage;
  const record = books.slice(firstIndex, lastIndex);
  const numOfPage = Math.ceil(books.length / recordsPage);
  const num = [...Array(numOfPage + 1).keys()].slice(1);

  async function fatchApi(bookName) {
    setLoading(true);
    try {
      const api = await fetch(`https://openlibrary.org/search.json?q=${bookName}`);
      const data = await api.json();
      // console.log(data.docs);
      if (data.docs == "") {
        setBooks([]);
        setLoading(false);
        setTableData(false);
      } else {
        setBooks(data.docs);
        setLoading(false);
        setTableData(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const clickme = () => {
    setBookName(" ");
  };
  const sortBooksByaYear = () => {
    const sortedBooks = [...books].sort((a, b) => a.first_publish_year - b.first_publish_year);
    setBooks(sortedBooks);
  };
  const sortBooksBydYear = () => {
    const sortedBooks = [...books].sort((a, b) => b.first_publish_year - a.first_publish_year);
    setBooks(sortedBooks);
  };

  const nextPage = () => {
    if (currentPage !== firstIndex) {
      setCureentPage(() => Math.max(currentPage - 1), 1);
    }
  };

  const curPage = (id) => {
    setCureentPage(id);
    console.log(id);
  };

  const prevPage = () => {
    setCureentPage(() => Math.min(currentPage - 1), lastIndex);
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

          <button
            className={`bg-gray-300 text-gray-700 px-4 py-2 transition-opacity ${
              bookName.trim() ? "opacity-100" : "hidden pointer-events-none"
            }`}
            onClick={clickme}
          >
            <img src={close} alt="" className="w-6 h-6 bg-transparent" />
          </button>
        </div>
        <div>
          <h1 className="text-3xl font-bold mt-8 mb-4">Book Information</h1>
          <div className="">
            <p>Enter a search term to find books.</p>
          </div>
        </div>

        <div className="">
          {loading ? <p>Loading.....</p> : <div></div>}
          {tableData ? (
            <div className="container mx-auto mt-7 bg-white">
              <table className="min-w-[1250px] bg-white border border-gray-200 ">
                <thead className="block">
                  <tr>
                    <th className="py-2 px-4 border-b w-[30%] text-left">Title</th>
                    <th className="py-2 px-4 border-b w-[20%] text-left">Author(s)</th>
                    <th className="py-2 px-4 border-b w-[15%] text-left">
                      Year First Published
                      <div className="flex justify-center gap-2">
                        <button className="h-4 w-4" onClick={sortBooksByaYear}>
                          <img src={up} alt="a" />
                        </button>
                        <button className="h-4 w-4">
                          <img src={down} alt="" onClick={sortBooksBydYear} />
                        </button>
                      </div>
                    </th>
                    <th className="py-2 px-4 border-b w-[20%] text-left">ISBN</th>
                    <th className="py-2 border-b w-[15%] text-left ml-1">Number of Pages</th>
                  </tr>
                </thead>
                <tbody className="max-h-full overflow-y-hidden block ">
                  {record.map((book, index) => (
                    <tr key={index}>
                      <td className="py-2 px-4 border-b w-[30%] break-words text-left">{book.title}</td>
                      <td className="py-2 px-4 border-b w-[20%] break-words text-left">
                        {book.author_name ? book.author_name.join(", ") : "N/A"}
                      </td>
                      <td className="py-2 px-4 border-b w-[15%] break-words text-left">
                        {book.first_publish_year || "N/A"}
                      </td>
                      <td className="py-2 px-4 border-b w-[20%] break-words text-left">
                        {book.isbn ? book.isbn[0] : "N/A"}
                      </td>
                      <td className="py-2 px-4 border-b w-[15%] break-words text-left">
                        {book.number_of_pages_median || "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <div className={`transition-opacity ${books == [] ? "opacity-100" : "hidden pointer-events-none"}`}>
          <ul className="flex gap-4">
            <li>
              <button onClick={prevPage} disabled={currentPage == firstIndex}>
                Prev
              </button>
            </li>
            {num.map((n, i) => (
              <li key={i}>
                <button onClick={() => curPage(n)}>{n}</button>
              </li>
            ))}
            <li>
              <button onClick={nextPage}>Next</button>
            </li>
          </ul>
        </div>
      </main>
    </>
  );
}

export default App;
