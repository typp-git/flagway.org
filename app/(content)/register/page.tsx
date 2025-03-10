"use client";

import { useState } from "react";

export default function RegistrationForm() {
	const resetForm = () => {
		setFormData({
		  teamInfo: Array(9).fill(""),
		  students: Array.from({ length: 12 }, () => Array(8).fill("")),
		  coaches: Array.from({ length: 5 }, () => Array(8).fill("")),
		  additionalCoaches: Array.from({ length: 4 }, () => Array(7).fill("")),
		});
		setIsSubmitted(false);
	  };
	  
	  
	const [isSubmitted, setIsSubmitted] = useState(false);

	const [formData, setFormData] = useState({
		teamInfo: Array(9).fill(""), // ✅ Fills array with empty strings
		students: Array.from({ length: 12 }, () => Array(8).fill("")), // ✅ Generates a 12x8 matrix
		coaches: Array.from({ length: 5 }, () => Array(8).fill("")), // ✅ Generates a 5x8 matrix
		additionalCoaches: Array.from({ length: 4 }, () => Array(7).fill("")), // ✅ Generates a 4x7 matrix
	  });
	  

	  const handleChange = (
		section: "students" | "coaches" | "additionalCoaches", // ✅ Restrict valid sections
		row: number,
		col: number,
		value: string
	  ) => {
		setFormData((prev) => ({
		  ...prev,
		  [section]: prev[section].map((r, i) =>
			i === row ? r.map((c, j) => (j === col ? value : c)) : [...r] // ✅ Ensures immutability
		  ),
		}));
	  };
	  

  const handleSingleChange = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      teamInfo: prev.teamInfo.map((val, i) => (i === index ? value : val)),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
	e.preventDefault();
	setIsSubmitted(true); // Show confirmation screen
  
	const scriptURL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
  
	const formPayload = {
	  TeamName: formData.teamInfo[0],
	  TeamAbbreviation: formData.teamInfo[1],
	  City: formData.teamInfo[2],
	  State: formData.teamInfo[3],
	  Country: formData.teamInfo[4],
	  CoordinatorFirstName: formData.teamInfo[5],
	  CoordinatorLastName: formData.teamInfo[6],
	  CoordinatorEmail: formData.teamInfo[7],
	  CoordinatorPhone: formData.teamInfo[8],
  
	  ...Object.fromEntries(
		formData.students.flatMap((row, rowIndex) =>
		  row.map((value, colIndex) => [
			`Student${rowIndex + 1}${
			  ["FirstName", "LastName", "TshirtSize", "DietaryRestrictions", "EmergencyContactName", "EmergencyContactPhone", "EmergencyContactRelationship", "Grade"][colIndex]
			}`,
			value,
		  ])
		)
	  ),
  
	  ...Object.fromEntries(
		formData.coaches.flatMap((row, rowIndex) =>
		  row.map((value, colIndex) => [
			`Coach${rowIndex + 1}${
			  ["FirstName", "LastName", "TshirtSize", "DietaryRestrictions", "EmergencyContactName", "EmergencyContactPhone", "EmergencyContactRelationship", "Grade"][colIndex]
			}`,
			value,
		  ])
		)
	  ),
  
	  ...Object.fromEntries(
		formData.additionalCoaches.flatMap((row, rowIndex) =>
		  row.map((value, colIndex) => [
			`AdditionalCoach${rowIndex + 1}${
			  ["FirstName", "LastName", "TshirtSize", "DietaryRestrictions", "EmergencyContactName", "EmergencyContactPhone", "EmergencyContactRelationship"][colIndex]
			}`,
			value,
		  ])
		)
	  ),
	};
  
	try {
	  const response = await fetch(scriptURL!, {
		method: "POST",
		headers: {
		  "Content-Type": "application/x-www-form-urlencoded",
		},
		body: new URLSearchParams(formPayload).toString(),
	  });
  
	  if (response.ok) {
		const wantToSubmitAnother = window.confirm(
		  "Your team has been successfully registered! Would you like to submit another team?"
		);
  
		if (wantToSubmitAnother) {
		  resetForm();
		}
	  } else {
		alert("Error submitting form. Please try again.");
	  }
	} catch (error) {
	  console.error("Submission Error:", error);
	  alert("Failed to submit the form. Check console for details.");
	}
  };

  
  

  return (
    <div className="py-15 w-[100%] mx-auto p-[4%] bg-white shadow-lg rounded-lg">
      <div className="flex justify-center">
        <img
          src="/clear-structure.png"
          alt="Clear Structure"
          width={100} // Adjust as needed
          height={300} // Adjust as needed
          className="animate-spin-slow mb-6"
        />
      </div>

      <h1 className="text-6xl font-bold text-center mb-25">
        National Flagway Team Registration
      </h1>

      {!isSubmitted ? (
  // ✅ Show form if it has NOT been submitted yet
  <form onSubmit={handleSubmit} className="space-y-8">
    {/* TEAM INFO SECTION */}
    <div>
      <h3 className="text-lg font-semibold">Flagway Team Information</h3>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {[
          "Team Name",
          "Team Abbreviation",
          "City",
          "State",
          "Country",
          "Coordinator First Name",
          "Coordinator Last Name",
          "Coordinator Email",
          "Coordinator Phone #",
        ].map((label, index) => (
          <div key={index}>
            <label className="block font-bold text-black">{label}</label>
            <input
              type="text"
              value={formData.teamInfo[index]}
              onChange={(e) => handleSingleChange(index, e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
        ))}
      </div>
    </div>

    {/* STUDENT INFO SECTION */}
    <div>
      <h3 className="text-lg font-semibold">
        Flagway Team Roster (min of 6, max of 12)
      </h3>
      <p className="text-xl">8:1 minor to chaperone ratio required</p>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 mt-4">
          <thead>
            <tr className="bg-blue1">
              <th className="p-2 border border-black text-white">Player</th>
              {[
                "First Name",
                "Last Name",
                "T-shirt Size",
                "Dietary Restrictions",
                "Emergency Contact Name",
                "Emergency Contact Phone Number",
                "Emergency Contact Relationship",
                "Grade",
              ].map((col, i) => (
                <th key={i} className="p-2 border border-black text-white">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {formData.students.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td className="p-2 border text-center">{rowIndex + 1}</td>
                {row.map((col, colIndex) => (
                  <td key={colIndex} className="p-2 border">
                    <input
                      type="text"
                      value={col}
                      onChange={(e) =>
                        handleChange("students", rowIndex, colIndex, e.target.value)
                      }
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    {/* COACH INFO SECTION */}
    <div>
      <h3 className="text-lg font-semibold">Flagway Coaches (MLWs)</h3>
      <p className="text-xl">8:1 minor to chaperone ratio required</p>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 mt-4">
          <thead>
            <tr className="bg-red1">
              <th className="p-2 border border-black text-white">Coach</th>
              {[
                "First Name",
                "Last Name",
                "T-shirt Size",
                "Dietary Restrictions",
                "Emergency Contact Name",
                "Emergency Contact Phone Number",
                "Emergency Contact Relationship",
                "Grade",
              ].map((col, i) => (
                <th key={i} className="p-2 border border-black text-white">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {formData.coaches.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td className="p-2 border text-center">{rowIndex + 1}</td>
                {row.map((col, colIndex) => (
                  <td key={colIndex} className="p-2 border">
                    <input
                      type="text"
                      value={col}
                      onChange={(e) =>
                        handleChange("coaches", rowIndex, colIndex, e.target.value)
                      }
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

	{/* ADDITIONAL COACH INFO SECTION */}
<div>
  <h3 className="text-lg font-semibold">Flagway Team Chaperone</h3>
  <p className="text-xl">8:1 minor to chaperone ratio required</p>
  <div className="overflow-x-auto">
    <table className="min-w-full border-collapse border border-gray-300 mt-4">
      <thead>
        <tr className="bg-yellow1">
          <th className="p-2 border border-black text-white">Chaperone</th>
          {[
            "First Name",
            "Last Name",
            "T-shirt Size",
            "Dietary Restrictions",
            "Emergency Contact Name",
            "Emergency Contact Phone Number",
            "Emergency Contact Relationship",
          ].map((col, i) => (
            <th key={i} className="p-2 border border-black text-white">
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {formData.additionalCoaches.map((row, rowIndex) => (
          <tr key={rowIndex}>
            <td className="p-2 border text-center">{rowIndex + 1}</td>
            {row.map((col, colIndex) => (
              <td key={colIndex} className="p-2 border">
                <input
                  type="text"
                  value={col}
                  onChange={(e) =>
                    handleChange("additionalCoaches", rowIndex, colIndex, e.target.value)
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>


    {/* SUBMIT BUTTON */}
    <div className="flex justify-center">
      <button
        type="submit"
        className="px-6 py-2 bg-blue-600 text-white text-5xl font-semibold rounded-lg shadow-md hover:bg-green-500"
      >
        Submit
      </button>
    </div>
  </form>
) : (
  // ✅ Show this message and button when form is submitted
  <div className="text-center">
    <p className="text-lg font-semibold text-gray-900">
      Thank you! Your team has been successfully registered.
    </p>
    <button
      onClick={resetForm}
      className="mt-4 px-6 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600"
    >
      Submit Another Team
    </button>
  </div>
)}

    </div>
  );
}