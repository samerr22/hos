import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Userview() {
  const [Info, setInfo] = useState([]);
  const [filter, setFilter] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null); // Track selected product
  const [showModal, setShowModal] = useState(false); // Modal visibility state

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/iget`);
        const data = await res.json();
        if (res.ok) {
          setInfo(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchInfo();
  }, []);

  useEffect(() => {
    if (query.trim() === "") {
      setFilter([...Info]);
    } else {
      const filteredData = Info.filter(
        (course) =>
          course.name &&
          course.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilter(filteredData);
    }
  }, [query, Info]);

  const handleOpenModal = (product) => {
    setSelectedProduct(product); // Set the selected product
    setShowModal(true); // Show the modal
  };

  const handleCloseModal = () => {
    setSelectedProduct(null); // Reset the selected product
    setShowModal(false); // Close the modal
  };

  return (
    <div className="h-[800px] relative">
      <div className="items-center justify-center flex">
        <div className="items-center">
            <div className="flex justify-center items-center">
            <input
            type="text"
            placeholder="Search..."
            className="w-[400px] h-10 mt-4 rounded-full shadow-xl border border-slate-400 bg-opacity-10"
            onChange={(e) => setQuery(e.target.value)}
          />

            </div>
         
           
           <div className="overflow-x-auto scrollbar-none mt-4 lg:h-[700px]">

          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8">
            {filter && filter.length > 0 ? (
              filter.map((course) => (
                <div
                  key={course._id}
                  className="border rounded-lg shadow-lg overflow-hidden"
                >
                  <img
                    src={course.image}
                    alt={course.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold">{course.name}</h3>
                    <p className="text-gray-700 mt-2">{course.description}</p>
                    <p className="text-lg font-semibold text-blue-600 mt-2">
                      Price: ${course.price}
                    </p>
                    <p className="text-gray-500 mt-2">Expire Date: {course.Expiredate}</p>
                    <div className="mt-4 flex justify-between items-center">
                     
                      <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-full py-4">
                No products found.
              </p>
            )}
          </div>

          </div>

         
        </div>
      </div>
    </div>
  );
}
