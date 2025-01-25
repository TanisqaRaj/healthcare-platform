import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Multiselect from "multiselect-react-dropdown";
import axios from "axios";


const Registration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelect = (selectedList) => {
    setSelectedOptions(selectedList);
  };

  const handleRemove = (selectedList) => {
    setSelectedOptions(selectedList);
  };

  const [isDoctor, setIsDoctor] = useState("");
  const [image, setImage] = useState("");
  const [certificate, setCertificate] = useState("");
  const navigate = useNavigate();
  function roleChange(e) {
    setIsDoctor(e.target.value);
  }

  function validUsername(text, errors) {
    if (!/^[^0-9]*$/.test(text)) {
      errors.name = true;
      errors.name.message = "Name can only include letters and spaces";
    }
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    setImage(event.target.files[0]);
  };
  const handleCertificateChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    setCertificate(event.target.files[0]);
  };

  const handleNavigateLogin = () => {
    navigate("/login");
  };
  // const [step, setStep] = useState(1);
  const [options] = useState([
    "General Physician",
    "Cardiologist",
    "Surgeon",
    "Pediatrician",
    "Dermatologist",
    "Gynecologist",
    "Orthopedic Surgeon",
    "Neurologist",
    "Ophthalmologist",
    "Dentist",
    "ENT Specialist",
    "Neurosurgeon",
    "Cosmetic Surgeon",
    "Anaesthetic",
  ]);

  async function onSubmit(data) {
    let url =
      data.role === "patient"
        ? "http://localhost:8080/auth/register/user"
        : "http://localhost:8080/auth/register/doctor";
    const registerObj = {
      name: data.firstname.trim() + " " + data.lastname.trim(),
      email: data.email,
      phone: data.phone,
      role: data.role === "patient" ? "user" : "doctor",
      username: data.username,
      password: data.password,
      gender: data.gender,
      bio: data.role === "doctor" ? data.doctorBio : null,
      mciNumber: data.role === "doctor" ? data.mciNumber : null,
      profession: data.role === "doctor" ? selectedOptions : null, //Skills
      experience: data.role === "doctor" ? data.experience : null,
      department: data.role === "doctor" ? data.department : null,
    };

    const processFileToBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(",")[1]);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    };

    try {
      // Process profile image
      if (image) {
        registerObj.image = await processFileToBase64(image);
      }

      // Process certificate
      if (certificate) {
        registerObj.certificate = await processFileToBase64(certificate);
      }

      console.log("Register object:", registerObj);

      // Submit the form with updated object
      axios
        .post(url, registerObj)
        .then((response) => {
          console.log("Registration successful:", response.data);
          navigate("/login");
        })
        .catch((error) => {
          console.error("Registration failed:", error);
        });
    } catch (error) {
      console.error("Error processing files:", error);
    }
  }

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <div className=" w-full min-h-screen flex justify-center items-center rounded-lg  py-10 px-20">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" w-full min-w-10 px-16 pb-6 space-y-4 bg-white rounded-lg shadow-lg"
      >
        {/* Previous page */}
        <button onClick={handleBackClick} className="text-emerald-600 mb-4">
          <i className="fas fa-arrow-left"></i>
        </button>
        {/* Signup text */}
        <div className="flex items-center justify-center">
          <h2 className="text-2xl sm:text-4xl text-emerald-500 p-2 mb-1">
            Let&apos;s you sign up
          </h2>
        </div>

        {/* Name */}
        <div className="flex-col gap-1 items-center">
          <label>Name</label>
          <div className="flex flex-row w-full space-x-6">
            <input
              {...register("firstname", {
                maxLength: { value: 100, message: "max length atmost 100" },
                minLength: { value: 2, message: "min length atleast 2" },
              })}
              onChange={(e) => validUsername(e.target.value, errors)}
              type="text"
              placeholder="First name"
              className="w-1/2 mb-2 px-3 py-1 border border-gray-300 rounded-lg "
            />
            {errors.firstname && (
              <p className="text-red-700">{errors.firstname.message}</p>
            )}
            <input
              {...register("lastname", {
                maxLength: { value: 100, message: "max length atmost 100" },
                minLength: { value: 2, message: "min length atleast 2" },
              })}
              onChange={(e) => validUsername(e.target.value, errors)}
              type="text"
              placeholder="Last name"
              className="w-1/2 mb-2 px-3 py-1 border border-gray-300 rounded-lg "
            />
            {errors.lastname && (
              <p className="text-red-700">{errors.lastname.message}</p>
            )}
          </div>
        </div>
        {/* Username */}
        <div>
          <label>Username</label>
          <input
            {...register("username", {
              maxLength: { value: 100, message: "max length atmost 100" },
              minLength: { value: 2, message: "min length atleast 2" },
            })}
            onChange={(e) => validUsername(e.target.value, errors)}
            type="text"
            placeholder="Enter your name..."
            className="w-full mb-2 px-3 py-1 border border-gray-300 rounded-lg "
          />
          {errors.username && (
            <p className="text-red-700">{errors.username.message}</p>
          )}
        </div>
        {/* Email */}
        <div>
          <label>Email</label>
          <input
            {...register("email", {
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address",
              },
            })}
            type="email"
            placeholder="Enter your email..."
            className="w-full px-3 mb-2 py-1 border border-gray-300 rounded-lg"
          />
          {errors.email && (
            <p className="text-red-700">{errors.email.message}</p>
          )}
        </div>
        {/* Password */}
        <div>
          <label>Password</label>
          <input
            {...register("password", {
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message:
                  "Password must be at least 8 characters long, include uppercase, lowercase, a number, and a special character",
              },
            })}
            type="password"
            placeholder="Type password..."
            className="w-full px-3 py-1 mb-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
          />
          {errors.password && (
            <p className="text-red-700">{errors.password.message}</p>
          )}
        </div>
        {/* Contact */}
        <div>
          <label>Contact</label>
          <input
            {...register("phone", {
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Please enter a valid 10-digit phone number.",
              },
            })}
            type="text"
            placeholder="Enter your Contact no.."
            className="w-full px-3 py-1 mb-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
          />
          {errors.phone && (
            <p className="text-red-700">{errors.phone.message}</p>
          )}
        </div>
        {/* Gender */}
        <div className="flex space-x-2">
          <label>Gender</label>
          <input
            {...register("gender")}
            value="male"
            type="radio"
            name="gender"
            id="male"
          />
          <label htmlFor="male">Male</label>
          <input
            {...register("gender")}
            value="female"
            type="radio"
            name="gender"
            id="female"
          />
          <label htmlFor="female">Female</label>
          <input
            {...register("gender")}
            value="other"
            type="radio"
            name="gender"
            id="other"
          />
          <label htmlFor="other">Other</label>
        </div>
        {/* ProfilePic */}
        <div className="flex gap-1">
          <label>Upload pic </label>

          <input
            {...register("profilepic")}
            type="file"
            onChange={handleImageChange}
          />
          {image ? (
            <img
              src={URL.createObjectURL(image)}
              alt=""
              className="border w-40 h-40 rounded-md"
            />
          ) : (
            <img src={image} alt="" className="border w-4 h-4 rounded-md" />
          )}
        </div>
        {/* Select Role */}
        <div>
          <label>Select Role</label>
          <select
            {...register("role")}
            className={`w-full px-3 py-1 mb-2 border "hover:bg-emerald-500 rounded-lg`}
            value={isDoctor}
            onChange={roleChange}
            placeholder="Select role"
          >
            <option value="">Select role</option>
            <option value="doctor">Doctor</option>
            <option value="patient">Patient</option>
          </select>
          {errors.role && (
            <p className=" text-red-700">{errors.role.message}</p>
          )}
        </div>
        {/* If selected role is doctor */}
        {isDoctor === "doctor" && (
          <div>
            <div className="flex justify-between items-center space-x-5">
              {/* DoctorBio */}
              <div className="flex-row w-1/2">
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Doctor Bio
                </label>
                <textarea
                  className={"w-full px-4 py-2 border rounded"}
                  placeholder="Write bio....."
                  {...register("doctorBio")}
                />
                {errors.doctorBio && (
                  <p className=" text-red-500">{errors.doctorBio.message}</p>
                )}
              </div>

              {/* Skills */}
              <div className=" w-1/2 flex-col space-y-2">
                <label className="block text-gray-700 text-sm font-medium">
                  Skills
                </label>
                <Multiselect
                  className="w-full"
                  // {...register("skills")}
                  options={options} // Options for the dropdown
                  isObject={false}
                  selectedValues={selectedOptions}
                  onSelect={handleSelect}
                  onRemove={handleRemove}
                />
              </div>
            </div>
            {/* MCI number */}
            <div>
              <label>MCI number</label>
              <input
                type="text"
                {...register("mciNumber")}
                className="w-full px-3 mb-2 py-1 border border-gray-300 rounded-lg"
              />
            </div>
            {/* UploadCertificate */}
            <div>
              <label>Upload Certificate</label>
              <input
                {...register("uploadCerificate")}
                type="file"
                onChange={handleCertificateChange}
                className="w-full px-3 mb-2 py-1 border border-gray-300 rounded-lg"
              />
            </div>
            {/* Experience and department */}
            <div className="w-full flex justify-center flex-row space-x-2">
              {/* Experience */}
              <div className="w-1/2">
                <label>Experience</label>
                <input
                  className="border items-center w-full h-8"
                  type="number"
                  {...register("experience")}
                />
                <span>Years</span>
              </div>
              {/* department*/}
              <div className="w-1/2 flex flex-col">
                <label className="gap-x-3 p-1">Department</label>
                <select {...register("department")} className="border">
                  <option>Select department</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="Dermatology">Dermatology</option>
                  <option value="Gynecology">Gynecology</option>
                  <option value="Orthopedic">Orthopedic</option>
                  <option value="Psychiatry">Psychiatry</option>
                </select>
              </div>
            </div>
          </div>
        )}
        {/* SignIn SignUp Button */}
        <div className="flex w-full">
          <div className="w-1/2">
            <button
              type="Submit"
              className="w-full px-4 py-2 font-medium text-white bg-emerald-500 rounded-lg hover:bg-emerald-600 "
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "SignUp"}
            </button>
          </div>
          <div>
            <button
              onClick={handleNavigateLogin}
              type="submit"
              className="w-full px-4 py-2 font-medium text-white bg-emerald-500 rounded-lg hover:bg-emerald-600 "
              disabled={isSubmitting}
            >
              {isSubmitting && !Registration ? "Submitting..." : "SignIn"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Registration;
