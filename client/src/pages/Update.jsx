import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function Update() {

    const [formData, setFormData] = useState({});
    const [publishError, setPublishError] = useState(null);
   
    const navigate = useNavigate();

    
    

      const { idd } = useParams();
  

   

 
  
  useEffect(() => {
    try {
      const fetchE = async () => {
        const res = await fetch(
          `http://localhost:3000/api/getall?upId=${idd}`
        );
        const data = await res.json();
        console.log("data", data);

        if (!res.ok) {
          console.log(data.message);
          setPublishError(data.message);
          return;
        }
        if (res.ok) {
          const selectedE = data.cou.find(
            (course) => course._id === idd
          );
          if (selectedE) {
            setFormData(selectedE);
          }
        }
      };
      fetchE();
    } catch (error) {
      console.log(error.message);
    }
  }, [idd]);




  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        
      const res = await fetch(`http://localhost:3000/api/updatee/${formData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),

      });
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        
        alert("sucsses ")
        navigate("/");
        
      }
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };


 
 


 

  return (
    <div className="">
    <div className="h-[600px]   bg-slate-200 relative">

     <div className='flex justify-center items-center  '>
     <div className="">
        <div>
          <div className=" flex  justify-center items-center">
            <div className='mt-4'>
              <h1 className="text-4xl  font-serif opacity-90 uppercase   text-black">
                Update Course
              </h1>
            </div>
          </div>
          <div className="flex justify-center items-center">
              <Link to={`/feedback`}>
                <button className="text-md hover:text-blue-600 font-serif underline text-gray-800">
                  Back
                </button>
              </Link>
            </div>
          <div>
            <div className="flex justify-center mt-4 items-center">
              <form className="flex flex-col mt-10  gap-4" onSubmit={handleSubmit}>
                <div className="flex justify-center items-center gap-28">
                  <div className="mt-[-20px]">
                    <div className="mt-4">
                      <input
                        className=" bg-slate-100 p-3 border-none rounded-lg w-[400px] h-10"
                        type="text"
                        placeholder="Student Number"
                        id="sId"
                        onChange={(e) => setFormData({ ...formData, sId: e.target.value })}
                        value={formData.sId}
                      />
                    </div>
                    <div className="mt-4">
                      <input
                        className=" bg-slate-100 p-3 border-none rounded-xl w-[400px] h-10"
                        type="text"
                        placeholder="Name"
                        id="name"
                        maxLength={10}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        value={formData.name}
                      />
                       <div bl>
                   
                    </div> 
                      

                  
                    </div>

                    <div className="mt-6">
                      



<select
                    name="gender"
                    id="gender"
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    value={formData.gender}
                   
                    className="bg-slate-100 p-3 border-none rounded-xl w-[400px] h-14"
                    required
                  >
                    <option value="" disabled>
                      Select Gender
                    </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                      

                  
                    </div>

                    <div className="mt-4">
                      <input
                        className=" bg-slate-100 p-3 border-none rounded-xl w-[400px] h-10"
                        type="text"
                        placeholder="Intake"
                        id="intake"
                        onChange={(e) => setFormData({ ...formData, intake: e.target.value })}
                        value={formData.intake}
                      />
                      

                  
                    </div>

                    <div className="mt-4">
                      <input
                        className=" bg-slate-100 p-3 border-none rounded-xl w-[400px] h-10"
                        type="text"
                        placeholder="Batch"
                        id="batch"
                        onChange={(e) => setFormData({ ...formData, batch: e.target.value })}
                        value={formData.batch}
                      />
                      
                      <p className="mt-0 text-red-600 h-0     rounded-lg text-center ">
                    must be a Number
                    </p>
                  
                    </div>

                    <div className="mt-6">
                      <input
                        className=" bg-slate-100 p-3 border-none rounded-xl w-[400px] h-10"
                        type="text"
                        placeholder="Operations"
                        id="operations"
                        onChange={(e) => setFormData({ ...formData, operations: e.target.value })}
                        value={formData.operations}
                      />
                      
                     
                  
                    </div>
                    


                    
                  
                   

                



                    <div className="mt-6">
                      <button
                        className=" bg-blue-600 uppercase mb-10  hover:text-black font-serif text-white p-3 rounded-lg w-[400px] h-11 hover:opacity-90"
                        type="submit"
                      >
                        submit
                      </button>
                    </div>
                  </div>

                 
                </div>
              </form>
            </div>
          </div>
          <div className="flex">
            <div className=" mb-1 mt-4   "></div>
          </div>
        </div>

      
      </div>

     </div>
  
    </div>
    </div>
  )
}
