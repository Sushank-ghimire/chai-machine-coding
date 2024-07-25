import { GrNext, GrPrevious } from "react-icons/gr";
// import { tableData } from "./TableData";
// import "./Table.css";
// import { useState } from "react";

// const DataTable = () => {
//   const [dataTable] = useState([...tableData]);
//   const itemsPerPage = 10;
//   const [currentPage, setCurrentPage] = useState(1);

//   // Calculate the start and end indices of the items to display
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const currentItems = dataTable.slice(startIndex, endIndex);

//   // Calculate the total number of pages
//   const totalPages = Math.ceil(dataTable.length / itemsPerPage);

//   // Handlers for pagination controls
//   const handlePageChange = (page: number) => {
//     if (page < 1 || page > totalPages) return; // Prevent out-of-bounds
//     setCurrentPage(page);
//   };

//   const [searchQuery, setSearchQuery] = useState('');
//   const [filteredData, setFilteredData] = useState(tableData);

//   // Function to handle search input change
//   const handleSearchChange = (e: any) => {
//     const query = e.target.value.toLowerCase();
//     setSearchQuery(query);

//     // Filter data based on the search query
//     const filtered = tableData.filter(item =>
//       item.title.toLowerCase().includes(query) ||
//       item.price.toLowerCase().includes(query) ||
//       item.status.toLowerCase().includes(query)
//     );

//     setFilteredData(filtered);
//   };

//   return (
//     <div className="w-[90vw] text-black p-4 rounded bg-white m-auto mt-4 text-xl md:text-2xl">
//       <h1 className="text-xl md:text-3xl font-bold">Batches Table</h1>
//       <div className="flex space-x-3 mt-3">
//         <input
//           className="outline-none focus:ring-1 border-2 focus:ring-blue-500 p-2 rounded border-slate-400"
//           type="text"
//           placeholder="Search table data..."
//           value={searchQuery}
//           onChange={(e: any) => setSearchQuery(e.target.value)}
//         />
//         <button className="py-2 px-4 bg-indigo-600 text-white rounded">
//           Search
//         </button>
//       </div>
//       <div className="overflow-x-auto md:w-[90%] mx-auto mt-4">
//         <table className="border-collapse border-2 w-full mx-auto border-slate-950 rounded p-4">
//           <thead>
//             <tr>
//               <th className="p-3 bg-slate-300">Title</th>
//               <th className="p-3 bg-slate-300">Start Date</th>
//               <th className="p-3 bg-slate-300">End Date</th>
//               <th className="p-3 bg-slate-300">Price</th>
//               <th className="p-3 bg-slate-300">Validity</th>
//               <th className="p-3 bg-slate-300">Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentItems.map((data, index) => (
//               <tr className="mt-2 m-2 p-2 gap-4" key={index}>
//                 <td className="font-bold gap-3 flex">
//                   <span>{data.id}.</span>
//                   <span>{data.title}</span>
//                 </td>
//                 <td>{data.startDate}</td>
//                 <td>{data.endDate}</td>
//                 <td>{data.price}</td>
//                 <td>{data.validity}</td>
//                 <td>
//                   {data.status === "Published" ? (
//                     <button className="bg-green-500 p-1 rounded text-white">Published</button>
//                   ) : (
//                     <button className="border-2 border-slate-500 rounded bg-white p-1">
//                       Unpublished
//                     </button>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <div className="mt-4 flex justify-center">
//         <button
//           onClick={() => handlePageChange(currentPage - 1)}
//           disabled={currentPage === 1}
//           className="px-4 flex space-x-3 items-center py-2 border border-gray-300 rounded mr-2"
//         >
//          <span><GrPrevious /></span> Previous 
//         </button>
//         <span className="px-4 py-2">
//           Page {currentPage} of {totalPages}
//         </span>
//         <button
//           onClick={() => handlePageChange(currentPage + 1)}
//           disabled={currentPage === totalPages}
//           className="px-4 flex items-center space-x-3 py-2 border border-gray-300 rounded ml-2"
//         >
//           Next <span><GrNext /></span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default DataTable;


import { useState } from "react";
import { tableData } from "./TableData";
import "./Table.css";

const DataTable = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter data based on the search query
  const filteredData = tableData.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.price.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate the start and end indices of the items to display
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredData.slice(startIndex, endIndex);

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Handlers for pagination controls
  const handlePageChange = (page: any) => {
    if (page < 1 || page > totalPages) return; // Prevent out-of-bounds
    setCurrentPage(page);
  };

  return (
    <div className="w-[90vw] text-black p-4 rounded bg-white m-auto mt-4 text-xl md:text-2xl">
      <h1 className="text-xl md:text-3xl font-bold">Batches Table</h1>
      <div className="flex space-x-3 mt-3">
        <input
          className="outline-none focus:ring-1 border-2 focus:ring-blue-500 p-2 rounded border-slate-400"
          type="text"
          placeholder="Search table data..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="py-2 px-4 bg-indigo-600 text-white rounded">
          Search
        </button>
      </div>
      <div className="overflow-x-auto md:w-[90%] mx-auto mt-4">
        <table className="border-collapse border-2 w-full mx-auto border-slate-950 rounded p-4">
          <thead>
            <tr>
              <th className="p-3 bg-slate-300">Image</th>
              <th className="p-3 bg-slate-300">Courses</th>
              <th className="p-3 bg-slate-300">Start Date</th>
              <th className="p-3 bg-slate-300">End Date</th>
              <th className="p-3 bg-slate-300">Price</th>
              <th className="p-3 bg-slate-300">Validity</th>
              <th className="p-3 bg-slate-300">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-4 text-center">No data found</td>
              </tr>
            ) : (
              currentItems.map(item => (
                <tr key={item.id} className="mt-2 m-2 p-2 gap-4">
                  <td><img src={item.image} alt={item.title} className="w-16 h-16" /></td>
                  <td className="font-bold gap-3 flex">{item.title}</td>
                  <td>{item.startDate}</td>
                  <td>{item.endDate}</td>
                  <td>{item.price}</td>
                  <td>{item.validity}</td>
                  <td>
                    {item.status === "Published" ? (
                      <button className="bg-green-500">Published</button>
                    ) : (
                      <button className="border-2 border-slate-500 rounded bg-white p-1">
                        Unpublished
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {filteredData.length > 0 && (
        <div className="flex justify-between mt-4">
          <button
            className="py-2 px-4 flex space-x-3 items-center bg-indigo-600 text-white rounded"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous{" "} <span className="font-bold text-2xl"><GrPrevious/></span>
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            className="py-2 px-4 flex space-x-3 items-center bg-indigo-600 text-white rounded"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next {" "} <span className="font-bold text-2xl"><GrNext /></span>
          </button>
        </div>
      )}
    </div>
  );
};

export default DataTable;

