import  { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Multiselect from "multiselect-react-dropdown";

const Registration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const [isDoctor, setIsDoctor] = useState("");

  function roleChange(e) {
    setIsDoctor(e.target.value);
  }
  function validUsername(text, errors) {
    if (!/^[^0-9]*$/.test(text)) {
      errors.name = true;
      errors.name.message = "Name can only include letters and spaces";
    }
  }

  const [image, setImage] = useState("");
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    setImage(event.target.files[0]);
  };

  const navigate = useNavigate();

  const handleNavigateLogin = () => {
    navigate("/login");
  };
  // const [step, setStep] = useState(1);
  const [options]=useState(['option1', 'option2' , 'option3'])
  async function onSubmit(data) {
    await new Promise((resolve) => setTimeout(resolve , 2000));
    console.log("Submitting the form...", data);
  }
  return (
    <div>
      <div className="min-h-screen flex justify-center items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full min-w-10 p-6 space-y-4 bg-white shadow-lg rounded-lg"
        >
          {/* Name */}
          <div className="flex gap-1 items-center">
            <label>Name</label>
            <div className="flex flex-row w-[500px]">
              <input
                {...register("firstname", {
                  required: true,
                  maxLength: { value: 100, message: "max length atmost 100" },
                  minLength: { value: 2, message: "min length atleast 2" },
                })}
                onChange={(e) => validUsername(e.target.value, errors)}
                type="text"
                placeholder="First name"
                className="w-full mb-2 px-3 py-1 border border-gray-300 rounded-lg "
                // className={errors.name? 'input-error': " "}
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
                className="w-full mb-2 px-3 py-1 border border-gray-300 rounded-lg "
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
                required: true,
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
                required: true,
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
          <div>
            <label>Password</label>
            <input
              {...register("password", {
                required: true,
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
              {...register("contact", { required: true,
                pattern:{
                  value:/^[0-9]{10}$/,
                  message:"Please enter a valid 10-digit phone number."
                },
                
               })}
              type="text"
              placeholder="Enter your Contact no.."
              className="w-full px-3 py-1 mb-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
            />
            {errors.contact && (
              <p className="text-red-700">{errors.contact.message}</p>
            )}
          </div>
          {/* Gender */}
          <div>
            <label>Gender</label>
            <input type="radio" name="gender" id="male" />
            <label htmlFor="male">Male</label>
            <input type="radio" name="gender" id="female" />
            <label htmlFor="female">Female</label>
            <input type="radio" name="gender" id="other" />
            <label htmlFor="other">Other</label>
          </div>
          {/* ProfilePic */}
          <div className="flex gap-1">
            <label>Upload pic </label>

            <input
              {...register("profilepic", { required: true })}
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
              {...register("role", {
                required:true,
              })}
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
              {/* DoctorBio */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-600">
                  Doctor Bio
                </label>
                <textarea
                  className={"w-full px-4 py-2 border rounded"}
                  placeholder="Write bio....."
                  {...register("doctorBio", { required: true })}
                />
                {errors.doctorBio && (
                  <p className=" text-red-500">{errors.doctorBio.message}</p>
                )}
              </div>
              {/* UploadCertificate */}
              <div>
                <label>Upload Certificate</label>
                <input
                  type="file"
                  {...register("uploadCerificate", { required: true })}
                />
              </div>
              {/* Experience */}
              <div>
                <label>Experience</label>
                <input
                  className="border items-center"
                  type="number"
                  {...register("experience", { required: true })}
                />
                <span>Years</span>
              </div>
              {/* Department */}
              <div>
                <Multiselect
                  className="border rounded-md"
                  options={options} 
                  isObject={false}
                />

              </div>
            </div>
          )}
          {/* SignIn SignUp Button */}
          <div className="flex">
            <div>
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
    </div>
  );
};

export default Registration;

