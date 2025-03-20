import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";


export default function ManageEmp() {
  const [Info, setInfo] = useState([]);
  const [DId, setformId] = useState("");
  const [filter, setfilter] = useState([]);
  const [query, setQuery] = useState("");
  const [publishError, setPublishError] = useState(null);
  const [validation, setValidation] = useState(null);

  const [showModal, setShowModal] = useState(false); // State to handle modal visibility
  const [newCourse, setNewCourse] = useState({
    sId: "",
    name: "",
    gender: "",
    intake: "",
    batch: "",
    operations: ""
  }); // State to manage form inputs

  useEffect(() => {
    const fetchinfo = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/getall`);
        const data = await res.json();
        console.log(data);
        if (res.ok) {
          setInfo(data.cou);
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
      head: [["StudentId", "Name", "Gender", "Intake", "Batch", "Operations"]],
      body: filter.map((course) => [
        course.sId,
        course.name,
        course.gender,
        course.intake,
        course.batch,
        course.operations
      ]),
      theme: "grid",
      headStyles: { fillColor: [0, 0, 255] }
    });
    doc.save("course.pdf");
  };

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/delete/${DId}`, {
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
          course.sId &&
        course.sId.toLowerCase().includes(query.toLowerCase())
      );
      setfilter(filteredData);
    }
  }, [query, Info]);

  const handleAddCourse = async () => {
    if (!validateBatch(newCourse.batch)) {
      return; // Don't proceed if validation fails
    }

    try {
      const res = await fetch("http://localhost:3000/api/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newCourse)
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        alert("Course added successfully!");
        setShowModal(false); // Close the modal after successful submission

        setNewCourse({
          sId: "",
          name: "",
          gender: "",
          intake: "",
          batch: "",
          operations: ""
        }); // Clear the form fields
        window.location.reload();
      }
    } catch (error) {
      setPublishError("Something went wrong");
      console.error(error.message);
    }
  };

  // Batch validation function
  const validateBatch = (batch) => {
    const batchRegex = /^[1-9][0-9]*$/; // Matches positive integers (no zero)
    if (!batchRegex.test(batch)) {
      setValidation("Batch must be a positive integer.");
      return false;
    }
    setValidation(null);
    return true;
  };

  return (
    <div className="h-[800px] relative">
      <div className="items-center justify-center flex">
        <div className="items-center ">
          
          <div></div>
          <input
            type="text"
            placeholder="Search..."
            className="w-[400px] h-10 mt-4 rounded-full shadow-xl border border-slate-400 bg-opacity-10"
            onChange={(e) => setQuery(e.target.value)}
          />

          {/* Modal for adding a new course */}
          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
              <div className="bg-white p-8 rounded-lg shadow-xl w-96">
                <h2 className="text-2xl font-bold mb-4">Add Course</h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleAddCourse();
                  }}
                >
                  <input
                    type="text"
                    name="sId"
                    placeholder="IT Number"
                    value={newCourse.sId}
                    onChange={(e) =>
                      setNewCourse({ ...newCourse, sId: e.target.value })
                    }
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                    required
                  />
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={newCourse.name}
                    onChange={(e) =>
                      setNewCourse({ ...newCourse, name: e.target.value })
                    }
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                    required
                  />

                  <input
                    type="text"
                    name="intake"
                    placeholder="Intake"
                    value={newCourse.intake}
                    onChange={(e) =>
                      setNewCourse({ ...newCourse, intake: e.target.value })
                    }
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                    required
                  />

                  <select
                    name="gender"
                    value={newCourse.gender}
                    onChange={(e) =>
                      setNewCourse({ ...newCourse, gender: e.target.value })
                    }
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                    required
                  >
                    <option value="" disabled>
                      Select Gender
                    </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  <input
                    type="text"
                    name="batch"
                    placeholder="Batch"
                    value={newCourse.batch}
                    onChange={(e) => {
                      setNewCourse({ ...newCourse, batch: e.target.value });
                      validateBatch(e.target.value); // Check for batch validation on change
                    }}
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                    required
                  />

                  {validation && (
                    <p className="mt-[-10px] mb-2 text-red-600 text-sm">
                      {validation}
                    </p> // Show validation error message
                  )}

                  <input
                    type="text"
                    name="operations"
                    placeholder="Operations"
                    value={newCourse.operations}
                    onChange={(e) =>
                      setNewCourse({ ...newCourse, operations: e.target.value })
                    }
                    className="w-full p-2 mb-4  border border-gray-300 rounded"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded"
                    disabled={validation !== null} // Disable the button if there's a validation error
                  >
                    Submit
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="w-full bg-red-500 text-white py-2 px-4 rounded mt-4"
                  >
                    Close
                  </button>
                </form>
              </div>
            </div>
          )}

          <div className="flex  gap-4">
            <div>
              <button
                onClick={generatePDF}
                className="mt-4 bg-blue-600 text-white py-2 px-4 rounded"
              >
                Download PDF
              </button>
            </div>

            <div>
              <button
                onClick={() => setShowModal(true)}
                className="mt-4 bg-blue-600 text-white py-2 px-4 rounded"
              >
                Add Course
              </button>
            </div>
          </div>

          <div className="lg:w-[1200px]  mt-8 rounded-3xl shadow-xl bg-white overflow-hidden">
  <div className="overflow-x-auto lg:h-[500px] ">
    <table className="min-w-full bg-white text-sm text-gray-700">
      <thead className="bg-blue-600 text-white">
        <tr>
          <th className="px-6 py-4 text-left">Student ID</th>
          <th className="px-6 py-4 text-left">Name</th>
          <th className="px-6 py-4 text-left">Gender</th>
          <th className="px-6 py-4 text-left">Intake</th>
          <th className="px-6 py-4 text-left">Batch</th>
          <th className="px-6 py-4 text-left">Operations</th>
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
              <td className="px-6 py-4 border-b text-gray-800">{course.sId}</td>
              <td className="px-6 py-4 border-b text-gray-800">{course.name}</td>
              <td className="px-6 py-4 border-b text-gray-800">{course.gender}</td>
              <td className="px-6 py-4 border-b text-gray-800">{course.intake}</td>
              <td className="px-6 py-4 border-b text-gray-800">{course.batch}</td>
              <td className="px-6 py-4 border-b text-gray-800">{course.operations}</td>
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
