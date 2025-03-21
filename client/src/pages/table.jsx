import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";


export default function ManageEmp() {
  const [Info, setInfo] = useState([]);
  const [DId, setformId] = useState("");
  const [filter, setfilter] = useState([]);
  const [query, setQuery] = useState("");


 

  useEffect(() => {
    const fetchinfo = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/iget`);
        const data = await res.json();
        console.log(data);
        if (res.ok) {
          setInfo(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchinfo();
  }, []);

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [[ "name", "quantity", "price", "Expiredate", "description"]],
      body: filter.map((course) => [
       
        course.name,
        course.quantity,
        course.price,
        course.Expiredate,
        course.description
      ]),
      theme: "grid",
      headStyles: { fillColor: [0, 0, 255] }
    });
    doc.save("course.pdf");
  };

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/inventoryd/${DId}`, {
        method: "DELETE"
      });
      if (res.ok) {
        setInfo((prev) => prev.filter((course) => course._id !== DId));
        alert("Deleted");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (query.trim() === "") {
      setfilter([...Info]);
    } else {
      const filteredData = Info.filter(
        (course) =>
          course.name &&
        course.name.toLowerCase().includes(query.toLowerCase())
      );
      setfilter(filteredData);
    }
  }, [query, Info]);



  return (
    <div className="h-[800px] relative">
      <div className="items-center justify-center flex">
        <div className="items-center ">

          
          <div className="flex justify-center items-center ">
          <input
            type="text"
            placeholder="Search..."
            className="w-[400px] h-10 mt-4 rounded-full shadow-xl border border-slate-400 bg-opacity-10"
            onChange={(e) => setQuery(e.target.value)}
          />

          <div className="flex ml-5  gap-4">
            <div>
              <button
                onClick={generatePDF}
                className="mt-4 bg-blue-600 text-white py-2 px-4 rounded"
              >
                Download PDF
              </button>
            </div>

            <div>
              <Link to="/addinvetry">
              <button
                
                className="mt-4 bg-blue-600 text-white py-2 px-4 rounded"
              >
                Add Item
              </button>
              </Link>
            </div>
          </div>
          </div>

          <div className="lg:w-[1200px]  mt-8 rounded-3xl shadow-xl bg-white overflow-hidden">
  <div className="overflow-x-auto  scrollbar-none lg:h-[500px] ">
    <table className="min-w-full bg-white text-sm text-gray-700">
      <thead className="bg-blue-500 text-white">
        <tr>
       
          <th className="px-6 py-4 text-left">image</th>
          <th className="px-6 py-4 text-left">name</th>
          <th className="px-6 py-4 text-left">price</th>
          <th className="px-6 py-4 text-left">Expiredate</th>
          <th className="px-6 py-4 text-left">description</th>
          <th className="px-6 py-4 text-center">Edit</th>
          <th className="px-6 py-4 text-center">Delete</th>
        </tr>
      </thead>
      <tbody>
        {filter && filter.length > 0 ? (
          filter.map((course) => (
            <tr
              key={course._id}
              className="hover:bg-blue-50 transition-colors duration-300"
            >
              <td className="px-6 py-4 border-b text-gray-800">
  <img src={course.image} alt="Course" className="w-16 h-16 object-cover rounded" />
</td>
              <td className="px-6 py-4 border-b text-gray-800">{course.name}</td>
              <td className="px-6 py-4 border-b text-gray-800">{course.price}</td>
              <td className="px-6 py-4 border-b text-gray-800">{course.Expiredate}</td>
              <td className="px-6 py-4 border-b text-gray-800">{course.description}</td>
       
              <td className="px-6 py-4 border-b text-center">
                <Link to={`/manage/${course._id}`}>
                  <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg shadow-md transition duration-300">
                    Edit
                  </button>
                </Link>
              </td>
              <td className="px-6 py-4 border-b text-center">
                <button
                  onClick={() => {
                    setformId(course._id);
                    handleDeleteUser();
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg shadow-md transition duration-300"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="8" className="text-center text-gray-500 py-4">
              No records found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>


        </div>
      </div>
    </div>
  );
}
