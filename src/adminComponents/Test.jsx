import { Watch } from "lucide-react";
import React, { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

const Test = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      enrollments: [{ classId: "", sectionId: "", sessionsId: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "enrollments",
  });

  const classes = [
    { id: "c1", name: "Grade 10" },
    { id: "c2", name: "Grade 11" },
  ];
  const allSections = [
    { id: "s1", classId: "c1", name: "Section A" },
    { id: "s2", classId: "c1", name: "Section B" },
    { id: "s3", classId: "c2", name: "Section C" },
  ];
  const sessions = [
    { id: "ses1", timing: "2024-2025" },
    { id: "ses2", timing: "2025-2026" },
  ];
  const [showModal, setShowModal] = useState(false);

  const enrollmentFields = watch("enrollments");

  const onSubmit = async (data) => {
    console.log(data);
  };
  return (
    <div>
      <p>This is for just testing purpose buddy</p>
      <div>
        <button
          onClick={() => {
            setShowModal(true);
          }}
          className="border-2 border-black px-2 py-1"
        >
          Show Modal
        </button>
      </div>

      {showModal && (
        <div>
          <div className="sticky top-0 bg-black text-white px-6 py-4 flex justify-between items-center z-10">
            <h2 className="text-2xl font-bold">Add New Student</h2>
            <button
              onClick={() => setShowModal(false)}
              className="hover:bg-gray-800 p-2 rounded-full transition-colors"
            >
              ❌
            </button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} action="">
            {fields.map((field, ind) => {
              const currentClassId = enrollmentFields[ind]?.classId;

              const filteredSections = allSections.filter(
                (sec) => sec.classId === currentClassId
              );

              return (
                <div
                  key={field.id}
                  className="border-b border-gray-200 pb-4 mb-4 last:border-b-0 last:mb-0"
                >
                  <h4 className="font-bold mb-2 text-lg text-gray-700">
                    Enrollment #{ind + 1}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Class ID Select */}
                    <div>
                      <label
                        htmlFor={`enrollments[${ind}].classId`}
                        className="block mb-2 font-semibold text-gray-900 text-sm"
                      >
                        Class *
                      </label>
                      <select
                        {...register(`enrollments[${ind}].classId`, {
                          required: "Class is required",
                        })}
                        id={`enrollments[${ind}].classId`}
                        className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-black focus:outline-none transition-colors"
                      >
                        <option value="">--select class--</option>
                        {classes.map((val) => (
                          <option key={val.id} value={val.id}>
                            {val.name}
                          </option>
                        ))}
                      </select>
                      <p className="text-red-500 text-xs">
                        {errors.enrollments?.[ind]?.classId?.message}
                      </p>
                    </div>

                    {/* Section ID Select */}
                    <div>
                      <label
                        htmlFor={`enrollments[${ind}].sectionId`}
                        className="block mb-2 font-semibold text-gray-900 text-sm"
                      >
                        Section
                      </label>
                      <select
                        {...register(`enrollments[${ind}].sectionId`, {
                          required: false,
                        })}
                        id={`enrollments[${ind}].sectionId`}
                        className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-black focus:outline-none transition-colors"
                        disabled={!currentClassId} // Disable if no class is selected
                      >
                        <option value="">--select section--</option>
                        {filteredSections.map((val) => (
                          <option key={val.id} value={val.id}>
                            {val.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Session ID Select */}
                    <div>
                      <label
                        htmlFor={`enrollments[${ind}].sessionId`}
                        className="block mb-2 font-semibold text-gray-900 text-sm"
                      >
                        Session *
                      </label>
                      <select
                        {...register(`enrollments[${ind}].sessionId`, {
                          required: "Session is required",
                        })}
                        id={`enrollments[${ind}].sessionId`}
                        className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-black focus:outline-none transition-colors"
                      >
                        <option value="">--select session--</option>
                        {sessions.map((val) => (
                          <option key={val.id} value={val.id}>
                            {val.timing}
                          </option>
                        ))}
                      </select>
                      <p className="text-red-500 text-xs">
                        {errors.enrollments?.[ind]?.sessionId?.message}
                      </p>
                    </div>
                  </div>

                  {/* Remove Button */}
                  {ind > 0 && ( // Don't allow removing the very first field
                    <div className="mt-3 text-right">
                      <button
                        type="button"
                        onClick={() => remove(ind)}
                        className="px-3 py-1 bg-red-100 border border-red-400 text-red-600 rounded-lg hover:bg-red-200 transition-colors font-semibold text-sm"
                      >
                        Remove Enrollment
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
            <div className="pt-2">
              <button
                type="button"
                onClick={() =>
                  append({ classId: "", sectionId: "", sessionId: "" })
                }
                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-semibold text-sm flex items-center gap-1"
              >
                ➕ Add Another Class/Session
              </button>
            </div>

            <input
              {...register("talha")}
              name="talha"
              className="border-2 border-black px-2 mx-2 mt-1"
              type="text"
            />
            <input
              className="border-2 border-black px-2 mx-2 mt-1"
              type="text"
            />
            <input
              className="border-2 border-black px-2 mx-2 mt-1"
              type="text"
            />

            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t-2 border-gray-200">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-6 py-3 border-2 border-black text-black rounded-lg hover:bg-gray-100 transition-colors font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-semibold"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Test;
