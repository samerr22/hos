import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable
} from "firebase/storage";
import { app } from "../firebase";
import { useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Link, useNavigate } from "react-router-dom";

export default function Inventry() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const [Cvalidation, setCValidation] = useState(null);

  console.log(formData);

  const navigate = useNavigate();

  const handleUpdloadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("Please select an image");
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError("Image upload failed");
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError("Image upload failed");
      setImageUploadProgress(null);
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/inventoryc", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        alert("successfull");
        navigate("");
      }
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };

  const handlepriceChange = (e) => {
    const price = e.target.value.trim();
    const pricePattern = /^[1-9]\d*$/; // Pattern for positive integers

    if (price === "") {
      setCValidation(null);
    } else if (!pricePattern.test(price)) {
      if (isNaN(price)) {
        setCValidation("price must be a number");
      } else {
        setCValidation("price must be a positive integer");
      }
    } else {
      setFormData({ ...formData, price });
      setCValidation(null);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-white">
    <div className="relative bg-white mt-14 mb-28 bg-opacity-10 shadow-sm shadow-black w-[900px] max-w-[900px] p-6 md:p-8 rounded-3xl border border-opacity-50 flex flex-col items-center">
      <div className="flex justify-center items-center">
        <Link to={`/`}>
          <button className="text-md hover:text-blue-400 font-serif underline text-blue-600">
            Back
          </button>
        </Link>
      </div>
      <div className="my-7 flex items-center justify-center">
        <h1 className="text-3xl font-serif uppercase text-blue-600">
          Add Item
        </h1>
      </div>
  
      <div className="w-[800px] h-[510px] bg-white bg-opacity-90 border shadow-xl rounded-3xl">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex gap-4 items-center justify-between border-2 rounded-2xl shadow-xl p-3">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="border border-gray-300 shadow-sm bg-white rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
            />
            <button
              type="button"
              className="w-40 h-10 rounded-lg bg-blue-500 uppercase shadow-lg text-white hover:opacity-90"
              size="sm"
              onClick={handleUpdloadImage}
              disabled={imageUploadProgress}
            >
              {imageUploadProgress ? (
                <div className="w-16 h-16">
                  <CircularProgressbar
                    value={imageUploadProgress}
                    text={`${imageUploadProgress || 0}%`}
                  />
                </div>
              ) : (
                "Upload Image"
              )}
            </button>
          </div>
          {imageUploadError && (
            <p className="mt-5 text-red-600 bg-red-300 w-300 h-7 rounded-lg text-center">
              {imageUploadError}
            </p>
          )}
          {formData.image && (
            <img
              src={formData.image}
              alt="upload"
              className="w-48 h-20 object-cover"
            />
          )}
  
          <div className="flex flex-col gap-4 sm:flex-row justify-between">
            <input
              className="flex-1 bg-slate-100 shadow-sm shadow-slate-500 p-3 rounded-lg w-[460px] h-11"
              type="text"
              placeholder=" Name"
              required
              id="name"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
  
          <div className="flex justify-center items-center gap-4">
            <div>
              <select
                className="bg-slate-100 shadow-sm shadow-slate-500 p-3 rounded-lg w-[200px] h-15"
                onChange={(e) =>
                  setFormData({ ...formData, quantity: e.target.value })
                }
              >
                <option value="">Select</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
            <div>
              <input
                className="bg-slate-100 shadow-sm shadow-slate-500 p-3 rounded-lg w-[200px] h-15"
                type="date"
                placeholder="Expiredate"
                required
                id="Expiredate"
                onChange={(e) =>
                  setFormData({ ...formData, Expiredate: e.target.value })
                }
              />
            </div>
  
            <div>
              <input
                className="bg-slate-100 shadow-sm shadow-slate-500 p-3 rounded-lg w-[200px] h-15"
                type="text"
                placeholder="price"
                required
                id="price"
                onChange={handlepriceChange}
              />
  
              {Cvalidation && (
                <p className="mt-0 text-red-600 h-0 rounded-lg text-center">
                  {Cvalidation}
                </p>
              )}
            </div>
          </div>
  
          <div className="flex justify-center mt-4 items-center">
            <textarea
              type="description"
              placeholder="description"
              required
              id="description"
              className="flex-1 bg-slate-100 shadow-sm shadow-slate-500 p-3 rounded-lg w-[460px] h-15"
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>
  
          <button
            type="submit"
            className="bg-blue-500 uppercase text-white border-black p-3 rounded-lg w-[460px] h-11 hover:opacity-90 lg:w-full"
          >
            Submit
          </button>
  
          {publishError && (
            <p className="mt-5 text-red-600 bg-white w-300 h-7 rounded-lg text-center">
              {publishError}
            </p>
          )}
        </form>
      </div>
    </div>
  </div>
  
  );
}
