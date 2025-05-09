"use client";

import { addPersonToDatabase, addTeamToDatabase } from "@/utils/supabase/database_functions";
import { useState } from "react";
import { MdAddCircle } from "react-icons/md";

const playerColumns = [
  { label: "First Name *", type: "text" },
  { label: "Last Name *", type: "text" },
  { label: "T-shirt Size *", type: "select", options: ["XS", "S", "M", "L", "XL", "XXL"] },
  { label: "Dietary Restrictions", type: "text" },
  { label: "Emergency Contact Name *", type: "text" },
  { label: "Emergency Contact Phone Number *", type: "text" },
  { label: "Emergency Contact Relationship *", type: "text" },
  { label: "Grade *", type: "text" },
  { label: "Gender *", type: "select", options: ["Male", "Female"] },
  { label: "City", type: "text" },
  { label: "Years in YPP", type: "text" },
  { label: "Previous Tournament Experience?", type: "checkbox" },
  { label: "Photo Consent Given?", type: "checkbox" },
  { label: "Photo Upload", type: "image" }, 
];

const coachColumns = [
  { label: "First Name *", type: "text" },
  { label: "Last Name *", type: "text" },
  { label: "T-shirt Size *", type: "select", options: ["XS", "S", "M", "L", "XL", "XXL"] },
  { label: "Dietary Restrictions", type: "text" },
  { label: "Emergency Contact Name *", type: "text" },
  { label: "Emergency Contact Phone Number *", type: "text" },
  { label: "Emergency Contact Relationship *", type: "text" },
  { label: "Grade *", type: "text" },
  { label: "Gender *", type: "select", options: ["Male", "Female"] },
  { label: "City", type: "text" },
  { label: "Years in YPP", type: "text" },
  { label: "Previous Tournament Experience?", type: "checkbox" },
  { label: "Photo Consent Given?", type: "checkbox" },
  { label: "Photo Upload", type: "image" }, 
];

const chaperoneColumns = [
  { label: "First Name *", type: "text" },
  { label: "Last Name *", type: "text" },
  { label: "Email *", type: "text" },
  { label: "Phone Number *", type: "text" },
  { label: "T-shirt Size *", type: "select", options: ["XS", "S", "M", "L", "XL", "XXL"] },
  { label: "Dietary Restrictions", type: "text" },
  { label: "Emergency Contact Name", type: "text" },
  { label: "Emergency Contact Phone Number", type: "text" },
  { label: "Emergency Contact Relationship", type: "text" },
  { label: "Gender *", type: "select", options: ["Male", "Female"] },
  { label: "City", type: "text" },
  { label: "Years in YPP", type: "text" },
  { label: "Photo Consent Given?", type: "checkbox" },
  { label: "Photo Upload", type: "image" }, 
];

export default function RegistrationForm() {
	const resetForm = () => {
		setFormData({
		  teamInfo: Array(11).fill(""),
		  players: Array.from({ length: 6 }, () => Array(playerColumns.length).fill("")),
		  coaches: Array.from({ length: 2 }, () => Array(coachColumns.length).fill("")),
		  chaperones: Array.from({ length: 2 }, () => Array(chaperoneColumns.length).fill("")),
		});
		setIsSubmitted(false);
	  };
	  
	const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

	const [formData, setFormData] = useState({
		teamInfo: Array(11).fill(""), // ✅ Fills array with empty strings
		players: Array.from({ length: 6 }, () => Array(playerColumns.length).fill("")), // ✅ Generates a 12x8 matrix
		coaches: Array.from({ length: 2 }, () => Array(coachColumns.length).fill("")), // ✅ Generates a 5x8 matrix
		chaperones: Array.from({ length: 2 }, () => Array(chaperoneColumns.length).fill("")), // ✅ Generates a 4x7 matrix
	  });

  const addPlayerRow = (e: React.MouseEvent<HTMLButtonElement>) => { 
    e.preventDefault();
    setFormData((prevForm) => ({
      ...prevForm,
      players: [...prevForm.players, Array(playerColumns.length).fill("")],
    }))
  }

  const addCoachRow = (e: React.MouseEvent<HTMLButtonElement>) => { 
    e.preventDefault();
    setFormData((prevForm) => ({
      ...prevForm,
      coaches: [...prevForm.coaches, Array(coachColumns.length).fill("")], 
    })) 
  }
  
  const addChaperoneRow = (e: React.MouseEvent<HTMLButtonElement>) => { 
    e.preventDefault();
    setFormData((prevForm) => ({
      ...prevForm,
      chaperones: [...prevForm.chaperones, Array(chaperoneColumns.length).fill("")],
    })) 
  }

  const validateField = (section: string, row: number, col: number, value: string) => {
    let error = "";

    if (section === "team") {
      if (col === 8) {
        // Validate Coordinator Phone Number
        const phoneRegex = /^[0-9]{10}$/; // Example: 10-digit phone number
        if (value.trim() !== "" && !phoneRegex.test(value)) {
          error = "Invalid phone number";
        }
      }
    }

    if (section === "players" || section === "coaches"){
      if (col === 5) {// Validate phone number
        const phoneRegex = /^[0-9]{10,14}$/; // Example: 10-digit phone number
        if (value !== "" && !phoneRegex.test(value)) {
          error = "Invalid phone number";
        }
      } else if (col === 7) {// Validate grade (only for players and coaches)
        const grade = parseInt(value, 10);
        if (value !== "" && (isNaN(grade) || grade < 1 || grade > 12)) {
          error = "Grade must be between 1 and 12";
        }
      } else if (col === 10) {// Validate yearsYPP (only for players and coaches)
        const yearsYPP = parseInt(value, 10);
        if (value !== "" && (isNaN(yearsYPP) || yearsYPP < 0)) {
          error = "Years YPP must be a positive number";
        }
      }
    } 
    
    if (section === "chaperones") {
        if (col === 7 || col === 3) {
        // Validate phone number
        const phoneRegex = /^[0-9]{10,14}$/; // Example: 10-digit phone number
        if (value !== "" && !phoneRegex.test(value)) {
          error = "Invalid phone number";
        }
      } else if (col === 11) {// Validate yearsYPP
        const yearsYPP = parseInt(value, 10);
        if (value !== "" && (isNaN(yearsYPP) || yearsYPP < 0)) {
          error = "Years YPP must be a positive number";
        }
      }
    }

  return error;
};
	  
	  const handleChange = (
		section: "players" | "coaches" | "chaperones", // ✅ Restrict valid sections
		row: number,
		col: number,
		value: string | File // accepts files
	  ) => {
      const errorKey = `${section}-${row}-${col}`;
      const error = validateField(section, row, col, value);
    
      setErrors((prevErrors) => ({
        ...prevErrors,
        [errorKey]: error, // Update the error for the specific field
      }));

      setFormData((prev) => ({
        ...prev,
        [section]: prev[section].map((r, i) =>
        i === row ? r.map((c, j) => (j === col ? value : c)) : [...r] // ✅ Ensures immutability
        ),
      }));
	  };

  const handleSingleChange = (index: number, value: string) => {
    const errorKey = `team-0-${index}`;
    const error = validateField("team", 0, index, value);

    setErrors((prevErrors) => ({
      ...prevErrors,
      [errorKey]: error, // Update the error for the specific field
    }));
  
    setFormData((prev) => ({
      ...prev,
      teamInfo: prev.teamInfo.map((val, i) => (i === index ? value : val)),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
	e.preventDefault();

  const hasErrors = Object.values(errors).some((error) => error !== "");
  if (hasErrors) {
    alert("Please fix the errors in the form before submitting.");
    return;
  }

  // Filter out empty rows
  const filterEmptyRows = (rows: string[][]) =>
    rows.filter((row) => row.some((value) => value.trim() !== ""));
  //TODO: Post-Testing, Test a minimum number of players/chaperones

	// const scriptURL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;

	const formPayload = {
    team:
    {
      name: formData.teamInfo[0],
      name_abbreviation: formData.teamInfo[1],
      school_organization: formData.teamInfo[2],
      state: formData.teamInfo[3],
      country: formData.teamInfo[4],
      coordinator_first_name: formData.teamInfo[5],
      coordinator_last_name: formData.teamInfo[6],
      coordinator_email: formData.teamInfo[7],
      coordinator_phone: formData.teamInfo[8],
      special_accommodations: formData.teamInfo[9],
      photo_ref: formData.teamInfo[10],
    }, 
    players: filterEmptyRows(formData.players).map((row) => ({
      first_name: row[0],
      last_name: row[1],
      tshirt_size: row[2],
      dietary_restrictions: row[3],
      emergency_contact_name: row[4],
      emergency_contact_phone_number: row[5],
      emergency_contact_relationship: row[6],
      grade: row[7],
      gender: row[8], 
      city: row[9], 
      years_YPP: row[10], 
      previous_tournament_experience: row[11],
      photo_consent_given: row[12],
      photo_ref: row[13]
    }))
    , 
    coaches: filterEmptyRows(formData.coaches).map((row) => ({
      first_name: row[0],
      last_name: row[1],
      tshirt_size: row[2],
      dietary_restrictions: row[3],
      emergency_contact_name: row[4],
      emergency_contact_phone_number: row[5],
      emergency_contact_relationship: row[6],
      grade: row[7],
      gender: row[8], 
      city: row[9], 
      years_YPP: row[10], 
      previous_tournament_experience: row[11],
      photo_consent_given: row[12],
      photo_ref: row[13]
    }))
    ,
    chaperones: filterEmptyRows(formData.chaperones).map((row) => ({
      first_name: row[0],
      last_name: row[1],
      email: row[2],
      phone: row[3],
      tshirt_size: row[4],
      dietary_restrictions: row[5],
      emergency_contact_name: row[6],
      emergency_contact_phone_number: row[7],
      emergency_contact_relationship: row[8],
      gender: row[9],
      city: row[10],
      years_YPP: row[11], 
      photo_consent_given: row[12],
      photo_ref: row[13]
    }))
	};
  
	try {
    console.log("FINAL FORM", formPayload)

    const teamResult = await addTeamToDatabase(formPayload.team);
    if (teamResult.error) {
      console.error("Error creating team:", teamResult.error);
      throw new Error(`Failed to create team: ${teamResult.error}`);
    }
    const team_id = teamResult.id
    console.log("Successfully created a team with id", team_id);

    const playerResults = await Promise.all(
      formPayload.players.map(async (s) => {
        const result = await addPersonToDatabase(s, "player", team_id); 
        if (result.error) {
          console.error("Error creating player:", result.error);
          throw new Error(`Failed to create player: ${result.error}`);
        }
        console.log("Successfully created a player:", result);
        return result;
      })
    );

    console.log("All players processed successfully:", playerResults);

    const coachResults = await Promise.all(
      formPayload.coaches.map(async (s) => {
        const result = await addPersonToDatabase(s, "coach", team_id);
        if (result.error) {
          console.error("Error creating coach:", result.error);
          throw new Error(`Failed to create coach: ${result.error}`);
        }
        console.log("Successfully created a coach:", result);
        return result;
      })
    );

    console.log("All coaches processed successfully:", coachResults);

    const chaperoneResults = await Promise.all(
      formPayload.coaches.map(async (s) => {
        const result = await addPersonToDatabase(s, "chaperone", team_id);
        if (result.error) {
          console.error("Error creating chaperone:", result.error);
          throw new Error(`Failed to create chaperone: ${result.error}`);
        }
        console.log("Successfully created a chaperone:", result);
        return result;
      })
    );

    console.log("All chaperones processed successfully:", chaperoneResults);

  } catch (error) {
    console.error("Submission Error:", error);
    alert("Failed to submit the form. Check console for details.");
  }

    setIsSubmitted(true); // Show confirmation screen
    // Handle success response
    const wantToSubmitAnother = window.confirm(
      "Your team has been successfully registered! Would you like to submit another team?"
    );
    if (wantToSubmitAnother) {
      resetForm();
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
      <p className="text-lg font-semibold">(Required *)</p>

      <div className="grid grid-cols-3 gap-4 mt-4">
        {[
          "Team Name *",
          "Team Abbreviation",
          "School/Organization *",
          "State",
          "Country *",
          "Coordinator First Name *",
          "Coordinator Last Name *",
          "Coordinator Email *",
          "Coordinator Phone # *",
          "Special Accommodations (Or NA)", 
        ].map((label, index) => (
          <div key={index}>
            <label className="block font-bold text-black">{label}</label>
            <input
              type="text"
              value={formData.teamInfo[index]}
              onChange={(e) => handleSingleChange(index, e.target.value)}
              className={`w-full mt-1 p-2 border ${
                errors[`team-0-${index}`]
                  ? "border-red-500 bg-red-100/50"
                  : "border-gray-300"
              } rounded-lg`}
              title={errors[`team-0-${index}`] || ""} // Show error as tooltip
              required
            />
          </div>
        ))}
      </div>
    </div>

    {/* PLAYER INFO SECTION */}
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
              {coachColumns.map((col, i) => ( // TODO: REPEATED HEADER CODE among coach,chaperone,player, MAKE OWN MODULE
              <th key={i} className={`p-2 border border-black text-white ${(col.type === "checkbox" || col.label==="Years in YPP")? "w-2":""}`}>
                {col.label}
              </th>
            ))}
            </tr>
          </thead>
          <tbody>
          {formData.players.map((row, rowIndex) => ( // TODO: REPEATED ROW CODE among coach,chaperone,player, MAKE OWN MODULE
              <tr key={rowIndex}>
                <td className="p-2 border text-center">{rowIndex + 1}</td>
                {playerColumns.map((colMeta, colIndex) => {
                  const value = row[colIndex];
                  const error = errors[`players-${rowIndex}-${colIndex}`];
                  return ( 
                    <td key={colIndex} className="p-2 border">
                      {colMeta.type === "checkbox" ? (
                        <input
                          type="checkbox"
                          checked={value === true || value === "true"}
                          onChange={(e) =>
                            handleChange("players", rowIndex, colIndex, e.target.checked)
                          }
                          className="w-5 h-5"
                          title={error || ""}
                        />
                      ) : colMeta.type === "select" ? (
                        <select
                          value={value}
                          onChange={(e) =>
                            handleChange("players", rowIndex, colIndex, e.target.value)
                          }
                          className={`w-full p-2 border rounded-lg ${
                            error ? "border-red-500 bg-red-100/50" : "border-gray-300"
                          }`}
                          title={error || ""}
                        >
                          <option value="">Select...</option>
                          {colMeta.options.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      ) : colMeta.type === "image" ? (
                        <div className="flex flex-col gap-1 items-center">
                          <label className="text-xs bg-blue-100 px-2 py-1 rounded cursor-pointer">
                            Upload
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                console.log("attempting file", file)
                                if (file) {
                                  handleChange("players", rowIndex, colIndex, file);
                                  console.log("adding file value", value);
                                }
                              }}
                              className="hidden"
                            />
                          </label>
                          {(() => {
                            const preview =
                              value instanceof File ? URL.createObjectURL(value) :
                              typeof value === "string" ? value : "";
                              
                            return preview ? (
                              <img src={preview} alt="Preview" className="w-10 h-10 object-cover rounded" />
                            ) : null;
                          })()}
                        </div>
                      ) : (
                        <input
                          type="text"
                          value={value}
                          onChange={(e) =>
                            handleChange("players", rowIndex, colIndex, e.target.value)
                          }
                          className={`w-full p-2 border rounded-lg ${
                            error ? "border-red-500 bg-red-100/50" : "border-gray-300"
                          }`}
                          title={error || ""}
                        />
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={addPlayerRow}
          className="text-yellow-500 hover:text-yellow-700"
          title="Add Row"
        >
          <MdAddCircle className="w-10 h-10" />
        </button>
      </div>
    </div>

    {/* COACH INFO SECTION */}
    <div>
      <h3 className="text-lg font-semibold">Flagway Coaches (MLWs)</h3>
      <p className="text-xl">8:1 minor to chaperone ratio required</p>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 mt-4">
        <thead>
          <tr className="bg-red-800">
            <th className="p-2 border border-black text-white">Coach</th>
            {coachColumns.map((col, i) => (
              <th key={i} className={`p-2 border border-black text-white ${(col.type === "checkbox" || col.label==="Years in YPP")? "w-2":""}`}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
          <tbody>
            {formData.coaches.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td className="p-2 border text-center">{rowIndex + 1}</td>
                {coachColumns.map((colMeta, colIndex) => {
                  const value = row[colIndex];
                  const error = errors[`coaches-${rowIndex}-${colIndex}`];
                  return ( 
                    <td key={colIndex} className="p-2 border">
                      {colMeta.type === "checkbox" ? (
                        <input
                          type="checkbox"
                          checked={value === true || value === "true"}
                          onChange={(e) =>
                            handleChange("coaches", rowIndex, colIndex, e.target.checked)
                          }
                          className="w-5 h-5"
                          title={error || ""}
                        />
                      ) : colMeta.type === "select" ? (
                        <select
                          value={value}
                          onChange={(e) =>
                            handleChange("coaches", rowIndex, colIndex, e.target.value)
                          }
                          className={`w-full p-2 border rounded-lg ${
                            error ? "border-red-500 bg-red-100/50" : "border-gray-300"
                          }`}
                          title={error || ""}
                        >
                          <option value="">Select...</option>
                          {colMeta.options.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      ) : colMeta.type === "image" ? (
                        <div className="flex flex-col gap-1 items-center">
                          <label className="text-xs bg-blue-100 px-2 py-1 rounded cursor-pointer">
                            Upload
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                console.log("attempting file", file)
                                if (file) {
                                  handleChange("coaches", rowIndex, colIndex, file);
                                  console.log("adding file value", value);
                                }
                              }}
                              className="hidden"
                            />
                          </label>
                          {(() => {
                            const preview =
                              value instanceof File ? URL.createObjectURL(value) :
                              typeof value === "string" ? value : "";
                              
                            return preview ? (
                              <img src={preview} alt="Preview" className="w-10 h-10 object-cover rounded" />
                            ) : null;
                          })()}
                        </div>
                      ) : (
                        <input
                          type="text"
                          value={value}
                          onChange={(e) =>
                            handleChange("coaches", rowIndex, colIndex, e.target.value)
                          }
                          className={`w-full p-2 border rounded-lg ${
                            error ? "border-red-500 bg-red-100/50" : "border-gray-300"
                          }`}
                          title={error || ""}
                        />
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-4">
        <button
          onClick={addCoachRow}
          className="text-yellow-500 hover:text-yellow-700"
          title="Add Row"
        >
          <MdAddCircle className="w-10 h-10" />
        </button>
      </div>
    </div>

	{/* CHAPERONE INFO SECTION */}
<div>
  <h3 className="text-lg font-semibold">Flagway Team Chaperone</h3>
  <p className="text-xl">8:1 minor to chaperone ratio required</p>
  <div className="overflow-x-auto">
    <table className="min-w-full border-collapse border border-gray-300 mt-4">
      <thead>
        <tr className="bg-yellow-500">
          <th className="p-2 border border-black text-white">Chaperones</th>
          {chaperoneColumns.map((col, i) => (
            <th key={i} className={`p-2 border border-black text-white ${(col.type === "checkbox" || col.label==="Years in YPP")? "w-2":""}`}>
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
      {formData.chaperones.map((row, rowIndex) => ( // TODO: REPEATED ROW CODE among coach,chaperone,player, MAKE OWN MODULE
              <tr key={rowIndex}>
                <td className="p-2 border text-center">{rowIndex + 1}</td>
                {chaperoneColumns.map((colMeta, colIndex) => {
                  const value = row[colIndex];
                  const error = errors[`chaperones-${rowIndex}-${colIndex}`];
                  return ( 
                    <td key={colIndex} className="p-2 border">
                      {colMeta.type === "checkbox" ? (
                        <input
                          type="checkbox"
                          checked={value === true || value === "true"}
                          onChange={(e) =>
                            handleChange("chaperones", rowIndex, colIndex, e.target.checked)
                          }
                          className="w-5 h-5"
                          title={error || ""}
                        />
                      ) : colMeta.type === "select" ? (
                        <select
                          value={value}
                          onChange={(e) =>
                            handleChange("chaperones", rowIndex, colIndex, e.target.value)
                          }
                          className={`w-full p-2 border rounded-lg ${
                            error ? "border-red-500 bg-red-100/50" : "border-gray-300"
                          }`}
                          title={error || ""}
                        >
                          <option value="">Select...</option>
                          {colMeta.options.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      ) : colMeta.type === "image" ? (
                        <div className="flex flex-col gap-1 items-center">
                          <label className="text-xs bg-blue-100 px-2 py-1 rounded cursor-pointer">
                            Upload
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                console.log("attempting file", file)
                                if (file) {
                                  handleChange("chaperones", rowIndex, colIndex, file);
                                  console.log("adding file value", value);
                                }
                              }}
                              className="hidden"
                            />
                          </label>
                          {(() => {
                            const preview =
                              value instanceof File ? URL.createObjectURL(value) :
                              typeof value === "string" ? value : "";
                              
                            return preview ? (
                              <img src={preview} alt="Preview" className="w-10 h-10 object-cover rounded" />
                            ) : null;
                          })()}
                        </div>
                      ) : (
                        <input
                          type="text"
                          value={value}
                          onChange={(e) =>
                            handleChange("chaperones", rowIndex, colIndex, e.target.value)
                          }
                          className={`w-full p-2 border rounded-lg ${
                            error ? "border-red-500 bg-red-100/50" : "border-gray-300"
                          }`}
                          title={error || ""}
                        />
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
      </tbody>
    </table>
  </div>

  <div className="flex justify-center mt-4">
    <button
      onClick={addChaperoneRow}
      className="text-yellow-500 hover:text-yellow-700"
      title="Add Row"
    >
      <MdAddCircle className="w-10 h-10" />
    </button>
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