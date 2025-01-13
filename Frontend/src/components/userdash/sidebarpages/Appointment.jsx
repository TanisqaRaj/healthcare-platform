import React from "react";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";

const Appointment = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit(data) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Submitting the form...", data);
  }

  const [age, setAge] = useState("");
  const today = new Date().toISOString().split("T")[0];
  const birthdate = watch("birthdate");

  useEffect(() => {
    if (birthdate) {
      const calculateAge = (dob) => {
        const today = new Date();
        const birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (
          monthDifference < 0 ||
          (monthDifference === 0 && today.getDate() < birthDate.getDate())
        ) {
          age--;
        }
        return age;
      };
      const calculatedAge = calculateAge(birthdate);
      setAge(calculatedAge);
      setValue("age", calculatedAge);
    } else {
      setAge(""); // Reset age if no birthdate is selected
    }
  }, [birthdate, setValue]);

  return (
    <div>
      <div className="min-h-screen flex justify-center items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full min-w-10 p-6 space-y-4 bg-white shadow-lg rounded-lg"
        >
          {/* Patient name */}
          <div className="flex gap-1 items-center">
            <label>Patient name</label>
            <input
              {...register("patientname", {
                required: true,
                maxLength: { value: 100, message: "max length atmost 100" },
                minLength: { value: 2, message: "min length atleast 2" },
              })}
              placeholder="Enter patient name..."
              onChange={(e) => validUsername(e.target.value, errors)}
              type="text"
              className="w-full mb-2 px-3 py-1 border border-gray-300 rounded-lg "
            />
            {errors.patientname && (
              <p className="text-red-700">{errors.patientname.message}</p>
            )}
          </div>
          {/* DOB */}
          <div className="flex gap-1 items-center">
            {/* Birthdate */}
            <div className="flex gap-1 items-center">
              <label className="w-full">Date of Birth</label>
              <input
                {...register("birthdate", {
                  required: true,
                })}
                placeholder="Enter Birth date..."
                type="date"
                max={today}
                defaultValue={today}
                className="w-full mb-2 px-3 py-1 border border-gray-300 rounded-lg "
              />
              {errors.birthdate && (
                <p className="text-red-700">{errors.birthdate.message}</p>
              )}
            </div>
            {/* Age */}
            <div className="flex gap-1 items-center">
              <label>Age</label>
              <input
                {...register("age", {
                  required: true,
                })}
                value={age}
                readOnly
                className="w-full mb-2 px-3 py-1 border border-gray-300 rounded-lg "
              />
            </div>
          </div>
          {/* gender */}
          <div>
            <label>Gender</label>
            <input type="radio" name="gender" id="male" />
            <label htmlFor="male">Male</label>
            <input type="radio" name="gender" id="female" />
            <label htmlFor="female">Female</label>
            <input type="radio" name="gender" id="other" />
            <label htmlFor="other">Other</label>
          </div>
          {/* Contact */}
          <div>
            <label>Contact</label>
            <input
              {...register("contact", {
                required: true,
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Please enter a valid 10-digit phone number.",
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
          {/* Disease */}
          <div>
            <label>Disease</label>
            <textarea
                  className={"w-full px-4 py-2 border rounded"}
                  placeholder="Write about your disease....."
                  {...register("disease", { required: true })}
            />
            {errors.disease && (
              <p className=" text-red-500">{errors.disease.message}</p>
            )}
          </div>
          {/* Mode */}
          <div>
            <label>Mode</label>
            <input type="radio" name="mode" id="offline" />
            <label htmlFor="offline">Offline</label>
            <input type="radio" name="mode" id="online" />
            <label htmlFor="online">Online</label>
          </div>
          {/* Choose date for appointment */}
          <div className="flex gap-1 items-center">
            <label>Select date of appointment</label>
            <input
                {...register("appodate", {
                  required: true,
                })}
                type="date"
                min={today}
                defaultValue={today}
                className="w-full mb-2 px-3 py-1 border border-gray-300 rounded-lg "
              />
              {errors.appodate && (
                <p className="text-red-700">{errors.appodate.message}</p>
              )}
          </div>
          {/* Submit Button */}
          <div className="flex">
            <div>
              <button
                type="Submit"
                className="w-full px-4 py-2 font-medium text-white bg-emerald-500 rounded-lg hover:bg-emerald-600 "
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Appointment;