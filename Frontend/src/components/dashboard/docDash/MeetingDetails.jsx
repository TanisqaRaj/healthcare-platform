import React from "react";
import { useForm } from "react-hook-form";


const MeetingDetails = ({ visible, onClose, appointmentId, appointmentState, updateAppointmentStatus }) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleOnClose = (e) => {
    if (e.target.id === "container") onClose();
  };

  const onSubmit = async (data) => {
    const { link, password } = data;
    await updateAppointmentStatus(appointmentId, appointmentState, link, password);
    onClose();
  };

  if (!visible) return null;
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
      id="container"
      onClick={handleOnClose}
    >
      <div className="h-[70vh] w-[70vw] flex  rounded-lg bg-white shadow-lg overflow-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full min-w-10 p-10 space-y-3 bg-white  rounded-lg"
        >
          {/* meeting link */}
          <div className="flex flex-col gap-1">
            <label className="font-medium text-gray-800">Link</label>
            <input
              {...register("link", {
                required: true,
              })}
              type="text"
              placeholder="Enter meeting link..."
              className="w-full px-3 py-1 border border-gray-300 rounded-lg"
            />
            {errors.link && (
              <p className="text-red-700 text-sm">{errors.link.message}</p>
            )}
          </div>

          {/* password */}
          <div className="flex flex-col gap-1">
            <label className="font-medium text-gray-800">Password</label>
            <input
              {...register("password", {
                required: true,
              })}
              type="text"
              placeholder="Enter password..."
              className="w-full px-3 py-1 border border-gray-300 rounded-lg"
            />
            {errors.password && (
              <p className="text-red-700 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 mb-4 py-2 text-white bg-emerald-500 rounded-lg hover:bg-emerald-600"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MeetingDetails;
