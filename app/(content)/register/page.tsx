"use client";

import { submitEntireTeamForm, getStateIDs } from "@/utils/supabase/database_functions";
import { useState } from "react";
import { MdAddCircle, MdRemoveCircle, MdClose } from "react-icons/md";
import { emptyPlayerForm, emptyCoachForm, emptyChaperoneForm, emptyTeamForm } from "@/data/teams";

/**
 *  getStateIDs().then((data) => {);
  });
 */
const states = [ // TODO: can replace with a database call to states in useeffect
  { id: "09ae4904-f62a-4a4f-ad85-e2e22e1f4a95", name: "Maryland", abbreviation: "MD" },
  { id: "1014f81b-681d-469c-a673-f6dcac6ba677", name: "Illinois", abbreviation: "IL" },
  { id: "170a6ec5-8302-4533-9a9e-1ec95b889464", name: "Florida", abbreviation: "FL" },
  { id: "737208e0-7015-4851-a5d9-657bc503f5f0", name: "California", abbreviation: "CA" },
  { id: "93c552bd-f232-4b74-bce6-7c135ceb41fa", name: "Ohio", abbreviation: "OH" },
  { id: "ab8103e8-d140-4603-969c-fbd6ce3d9943", name: "Georgia", abbreviation: "GA" },
  { id: "ae96df6c-4289-444b-9fd7-6c05af759107", name: "Virginia", abbreviation: "VA" },
  { id: "b4feca4c-de10-4b2f-b085-42ee14f9aab2", name: "Massachusetts", abbreviation: "MA" },
  { id: "fb6c9c1d-4409-44e8-8804-1cf6f5a12d7b", name: "Minnesota", abbreviation: "MN" },
];

const teamColumns = [
  { field_name: "name", label: "Team Name *", type: "text", required: true },
  { field_name: "name_abbreviation", label: "Team Abbreviation", type: "text", required: false },
  { field_name: "school_organization", label: "School/Organization *", type: "text", required: true },
  { field_name: "country", label: "Country *", type: "select", options: ["USA"], required: true },
  { field_name: "state_id", label: "State", type: "select", options: states, required: false },
  { field_name: "coordinator_first_name", label: "Coordinator First Name *", type: "text", required: true },
  { field_name: "coordinator_last_name", label: "Coordinator Last Name *", type: "text", required: true },
  { field_name: "coordinator_email", label: "Coordinator Email *", type: "text", required: true },
  { field_name: "coordinator_phone", label: "Coordinator Phone # *", type: "text", required: true },
  { field_name: "special_accommodations", label: "Special Accommodations", type: "text", required: false },
  { field_name: "photo_submission_file", label: "Team Logo", type: "image", required: false }
];

const playerColumns = [
  { field_name:"first_name", label: "First Name *", type: "text", required: true },
  { field_name:"last_name", label: "Last Name *", type: "text", required: true },
  { field_name:"tshirt_size", label: "T-shirt Size *", type: "select", options: ["XS", "S", "M", "L", "XL", "XXL"], required: true },
  { field_name:"dietary_restrictions", label: "Dietary Restrictions", type: "text", required: false },
  { field_name:"emergency_contact_name", label: "Emergency Contact Name *", type: "text", required: true},
  { field_name:"emergency_contact_phone", label: "Emergency Contact Phone Number *", type: "text", required: true },
  { field_name:"emergency_contact_relationship", label: "Emergency Contact Relationship *", type: "text", required: true },
  { field_name:"grade", label: "Grade *", type: "number", options: ["0","1","2","3","4","5","6","7","8","9","10","11","12"], required: true },
  { field_name:"gender", label: "Gender *", type: "select", options: ["Male", "Female"], required: true },
  { field_name:"city", label: "City", type: "text", required: false },
  { field_name:"years_YPP", label: "Years in YPP", type: "number", required: false },
  { field_name:"previous_tournament_experience", label: "Previous Tournament Experience?", type: "checkbox", required: false},
  { field_name:"photo_consent_given", label: "Photo Consent Given?", type: "checkbox", required: false},
  { field_name:"photo_submission_file", label: "Photo Upload", type: "image", required: false} 
];

const coachColumns = [
  { field_name:"first_name", label: "First Name *", type: "text", required: true },
  { field_name:"last_name", label: "Last Name *", type: "text", required: true },
  { field_name:"tshirt_size", label: "T-shirt Size *", type: "select", options: ["XS", "S", "M", "L", "XL", "XXL"], required: true },
  { field_name:"dietary_restrictions", label: "Dietary Restrictions", type: "text", required: false },
  { field_name:"emergency_contact_name", label: "Emergency Contact Name *", type: "text", required: true},
  { field_name:"emergency_contact_phone", label: "Emergency Contact Phone Number *", type: "text", required: true },
  { field_name:"emergency_contact_relationship", label: "Emergency Contact Relationship *", type: "text", required: true },
  { field_name:"grade", label: "Grade *", type: "number", options: ["0","1","2","3","4","5","6","7","8","9","10","11","12"], required: true },
  { field_name:"gender", label: "Gender *", type: "select", options: ["Male", "Female"], required: true },
  { field_name:"city", label: "City", type: "text", required: false },
  { field_name:"years_YPP", label: "Years in YPP", type: "number", required: false },
  { field_name:"previous_tournament_experience", label: "Previous Tournament Experience?", type: "checkbox", required: false},
  { field_name:"photo_consent_given", label: "Photo Consent Given?", type: "checkbox", required: false},
  { field_name:"photo_submission_file", label: "Photo Upload", type: "image", required: false} 
];

const chaperoneColumns = [
  { field_name:"first_name", label: "First Name *", type: "text", required: true },
  { field_name:"last_name", label: "Last Name *", type: "text", required: true },
  { field_name:"email", label: "Email *", type: "text", required: true},
  { field_name:"phone", label: "Phone Number *", type: "text", required: true},
  { field_name:"tshirt_size", label: "T-shirt Size *", type: "select", options: ["XS", "S", "M", "L", "XL", "XXL"], required: true },
  { field_name:"dietary_restrictions", label: "Dietary Restrictions", type: "text", required: false },
  { field_name:"emergency_contact_name", label: "Emergency Contact Name *", type: "text", required: true},
  { field_name:"emergency_contact_phone", label: "Emergency Contact Phone Number *", type: "text", required: true },
  { field_name:"emergency_contact_relationship", label: "Emergency Contact Relationship *", type: "text", required: true },
  { field_name:"gender", label: "Gender *", type: "select", options: ["Male", "Female"], required: true },
  { field_name:"city", label: "City", type: "text", required: false },
  { field_name:"years_YPP", label: "Years in YPP", type: "number", required: false },
  { field_name:"photo_consent_given", label: "Photo Consent Given?", type: "checkbox", required: false},
  { field_name:"photo_submission_file", label: "Photo Upload", type: "image", required: false} 
];

const defaultPlayerSize = 6;
const defaultCoachSize = 2;
const defaultChaperoneSize = 2;

export default function RegistrationForm() {
	const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

	const [formData, setFormData] = useState({
    team: {... emptyTeamForm},
    players: Array.from({ length: defaultPlayerSize }, () => ({... emptyPlayerForm})),
    coaches: Array.from({ length:  defaultCoachSize }, () =>  ({... emptyCoachForm})), 
    chaperones: Array.from({ length: defaultChaperoneSize }, () => ({... emptyChaperoneForm})),
  });
  
  const resetForm = () => {
		setFormData({
		  team: {... emptyTeamForm},
      players: Array.from({ length: defaultPlayerSize }, () => ({... emptyPlayerForm})),
      coaches: Array.from({ length:  defaultCoachSize }, () =>  ({... emptyCoachForm})), 
      chaperones: Array.from({ length: defaultChaperoneSize }, () => ({... emptyChaperoneForm})),
		});
		setIsSubmitted(false);
	};

const addRow = (
  section: "players" | "coaches" | "chaperones",
  emptyForm: typeof emptyPlayerForm | typeof emptyCoachForm | typeof emptyChaperoneForm
) => (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();
  setFormData((prevForm) => ({
    ...prevForm,
    [section]: [...prevForm[section], { ...emptyForm }],
  }));
};

const removeLastRow = (
  section: "players" | "coaches" | "chaperones"
) => (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();
  setFormData((prevForm) => ({
    ...prevForm,
    [section]: prevForm[section].length > 0
      ? prevForm[section].slice(0, -1)
      : prevForm[section],
  }));

  // Remove Errors of Last Row
  setErrors((prevErrors) => {
    const lastIndex = formData[section].length - 1;
    const newErrors = { ...prevErrors };
    Object.keys(newErrors).forEach((key) => {
      if (key.startsWith(`${section}-${lastIndex}-`)) {
        delete newErrors[key];
      }
    });
    return newErrors;
  });
};

/**
 * Validates a Single Field After it is Filled, Does not Detect Unfilled Fields
 * @param section 
 * @param field 
 * @param value 
 * @returns Empty String for No Error or String Describing Error
 */
const validateField = (
  section: string,
  colMeta: { field_name: string; label: string; type: string; required?: boolean; options?: string[]|{id:string,name:string}[] },
  value: string | File | number | boolean | null
): string => {
  let error = "";
  const field = colMeta.field_name;
  const isString = (v: any): v is string => typeof v === "string";

  const isEmpty =
    value === undefined ||
    value === null ||
    (typeof value === "string" && value.trim() === "") ||
    (colMeta.type === "select" && value === "") ||
    (colMeta.type === "checkbox" && value !== true) ||
    (colMeta.type === "image" && !(value instanceof File));
  
  if (colMeta.required && isEmpty) {
    return `${colMeta.label} is required`;
  }

  if ( (field === "coordinator_phone" || field === "phone" || field === "emergency_contact_phone") && isString(value)) {
      const phoneRegex = /^[0-9]{10,}$/;
      if (value.trim() !== "" && !phoneRegex.test(value)) {
        error = "Invalid phone number";
      }
  }

  if (field === "grade") {
    if (value === null) {
      error = "Grade is required";
    } else if (typeof value === "number" && (value < 0 || value > 12)) {
      error = "Grade must be between 0 and 12";
    }
  }

  if (field === "years_YPP") { // can be null
    if (value === null) {
      return ""; // Allow null for years YPP
    } else if (typeof value === "number" && value < 0) {
      error = "Years YPP must be a whole number";
    }
  }
  return error;
};
	  
  /**
   * Change the Team Info
   * @param section 
   * @param row 
   * @param col 
   * @param value 
   */
  const handleChange = (
  section: "team" | "players" | "coaches" | "chaperones", // ✅ Restrict valid sections
  rowIndex: number, // 0 for team, 0-indexed for players/coaches/chaperones
  colMeta: { field_name: string; label: string; type: string; required?: boolean; options?: string[]|{id:string,name:string}[] },
  newValue: string | File | boolean | number | null // accepts files
  ) => {
    const errorKey = `${section}-${rowIndex}-${colMeta.field_name}`; // eg: students-3-grade or chaperones-0-first_name
    const error = validateField(section, colMeta, newValue);
  
    setErrors((prevErrors) => ({
      ...prevErrors,
      [errorKey]: error, // Update the error for the specific field
    }));

    if (section == "team") {
      setFormData((prev) => ({
        ...prev,
        team: {...prev.team, [colMeta.field_name]: newValue, },
      }));
    } else { // "players" "coaches" "chaperones"
      setFormData((prev) => ({ // update the specific info
        ...prev,
        [section]: prev[section].map((person, i) =>
          (i === rowIndex) ? {...person, [colMeta.field_name]: newValue, } : person
        ),
      }));

    }
  };

  // Validate Form by Validating Every Field that is Required!!
  const validateAll = () => {
    const newErrors: Record<string, string> = {};

    const sections = [
      {
        section: "team",
        getData: () => [formData.team], // Wrap single object in array
        columns: teamColumns,
      },
      {
        section: "players",
        getData: () => formData.players,
        columns: playerColumns,
      },
      {
        section: "coaches",
        getData: () => formData.coaches,
        columns: coachColumns,
      },
      {
        section: "chaperones",
        getData: () => formData.chaperones,
        columns: chaperoneColumns,
      },
    ] as const;

    sections.forEach(({ section, getData, columns }) => {
      getData().forEach((entry, rowIndex) => {
        columns.forEach((colMeta) => {
          const value = entry[colMeta.field_name as keyof typeof entry];
          const error = validateField(section, colMeta, value ?? ""); // cast to "" if undefined
          if (error) {
            const key = `${section}-${rowIndex}-${colMeta.field_name}`;
            newErrors[key] = error;
          }
        });
      });
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Takes FormData
   * @param e 
   * @returns 
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("errors", errors)

    console.log(formData)
    // Check if there are any errors present on the form
    const isValidated = validateAll();

    if (!isValidated) {
      alert("Please fix the errors before submitting.");
      return;
    }

    //TODO: At the moment, handling all numbers as text. change this to number inputs, and adjust validation and handleChange accordingly 

    submitEntireTeamForm(formData).then((result) => {
      if (result.error) {
        console.error("Error submitting form:", result.error);
        alert("Failed to submit the form. Check console for details.");
      } else {
        console.log("Form submitted successfully:", result);
        setIsSubmitted(true);
      }
    });

  }

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
      <div>
        {createExpandedFormSection("team", teamColumns, 0, handleChange, formData.team, errors)}
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
              <th key={i} className={`p-2 border border-black text-white ${(col.type === "checkbox")? "w-2":""}`}>
                {col.label}
              </th>
            ))}
            </tr>
          </thead>
          <tbody>
          {formData.players.map((person, personIndex) => ( // TODO: REPEATED ROW CODE among coach,chaperone,player, MAKE OWN MODULE
              createTableRow("players", playerColumns, personIndex, handleChange, person, errors)
          ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4 gap-2">
        <button
          onClick={addRow("players", emptyPlayerForm)}
          className="text-yellow-500 hover:text-yellow-700"
          title="Add Row"
        >
          <MdAddCircle className="w-10 h-10" />
        </button>
        <button
          onClick={removeLastRow("players")}
          className="text-red-500 hover:text-red-800"
          title="Remove Row"
        >
          <MdRemoveCircle className="w-10 h-10" />
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
              <th key={i} className={`p-2 border border-black text-white ${(col.type === "checkbox")? "w-2":""}`}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
          <tbody>
            {formData.coaches.map((person, personIndex) => (
              createTableRow("coaches", coachColumns, personIndex, handleChange, person, errors)
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-4 gap-2">
        <button
          onClick={addRow("coaches", emptyCoachForm)}
          className="text-yellow-500 hover:text-yellow-700"
          title="Add Row"
        >
          <MdAddCircle className="w-10 h-10" />
        </button>
        <button
          onClick={removeLastRow("coaches")}
          className="text-red-400 hover:text-red-800"
          title="Remove Row"
        >
          <MdRemoveCircle className="w-10 h-10" />
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
            <th key={i} className={`p-2 border border-black text-white ${(col.type === "checkbox")? "w-2":""}`}>
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
      {formData.chaperones.map((person, personIndex) => ( // TODO: REPEATED ROW CODE among coach,chaperone,player, MAKE OWN MODULE
            createTableRow("chaperones", chaperoneColumns, personIndex, handleChange, person, errors)  
      ))}
      </tbody>
    </table>
  </div>

  <div className="flex justify-center mt-4 gap-2">
    <button
      onClick={addRow("chaperones", emptyChaperoneForm)}
      className="text-yellow-500 hover:text-yellow-700"
      title="Add Row"
    >
      <MdAddCircle className="w-10 h-10" />
    </button>
    <button
      onClick={removeLastRow("chaperones")}
      className="text-red-400 hover:text-red-800"
      title="Remove Row"
    >
      <MdRemoveCircle className="w-10 h-10" />
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


/**
 * 
 * @param role: "players" | "coaches" | "chaperones"
 * @param columnFormat: columnDescriptor
 */
function createTableRow(
  role: "team" | "players" | "coaches" | "chaperones",
  columnFormat: { field_name: string; label: string; type: string; required?: boolean; options?: string[] | {id: string, name: string }[] }[],
  rowIndex: number,
  handleChange: (
    section: "team" | "players" | "coaches" | "chaperones",
    rowIndex: number,
    colMeta: { field_name: string; label: string; type: string; required?: boolean; options?: string[] | {id:string,name:string}[]  },
    value: string | File | boolean | number | null
  ) => void,
  rowData: Record<string, any>,
  errors: Record<string, string>
){
  return (
    <tr key={rowIndex}>
      <td className="p-2 border text-center">{rowIndex + 1}</td>
      {columnFormat.map((colMeta, colIndex) => {
        const value = rowData[colMeta.field_name];
        const error = errors[`${role}-${rowIndex}-${colMeta.field_name}`];
        return ( 
          <td key={colIndex} className="p-2 border">
            {colMeta.type === "checkbox" ? (
              <input
                type="checkbox"
                checked={value === true || value === "true"}
                onChange={(e) =>
                  handleChange(role, rowIndex, colMeta, e.target.checked)
                }
                className="w-5 h-5"
                title={error || ""}
              />
            ) : colMeta.type === "select" ? (
              <select
                value={value}
                onChange={(e) =>
                  handleChange(role, rowIndex, colMeta, e.target.value)
                }
                className={`w-full p-2 border rounded-lg ${
                  error ? "border-red-500 bg-red-100/50" : "border-gray-300"
                }`}
                title={error || ""}
              >
                <option value="">Select...</option>
                  {(colMeta.options ?? []).map((opt) => {
                    if (typeof opt === 'string') {
                      // option is a simple string
                      return (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      );
                    } else if (opt && typeof opt === 'object' && 'id' in opt && 'name' in opt) {
                      // option is an object with id and name
                      return (
                        <option key={opt.id} value={opt.id}>
                          {opt.name}
                        </option>
                      );
                    } else {
                      // fallback if shape unexpected
                      return null;
                    }
                  })}
              </select>
            ) : colMeta.type === "image" ? (
                <div className="flex flex-col gap-1 items-start">
                  <div className="flex flex-row gap-1 items-center">
                    <label title="Upload Image" className="text-xs bg-blue-100 hover:bg-blue-300 px-2 py-1 rounded cursor-pointer">
                      Upload
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            handleChange(role, rowIndex, colMeta, file);
                          }
                        }}
                        className="hidden"
                      />
                    </label>
                    <button className=" text-black hover:text-red-500 cursor-pointer" title="Remove Image"
                      onClick={(e) => {e.preventDefault(); handleChange(role, rowIndex, colMeta, null)}}
                    >
                      <MdClose className="w-4 h-4"/>
                    </button>
                  </div>
                {(() => {
                  const preview =
                    value instanceof File ? URL.createObjectURL(value) :
                    typeof value === "string" ? value : "";
                    
                  return preview ? (
                    <img src={preview} alt="Preview" className="w-10 h-10 object-cover rounded" />
                  ) : null;
                })()}
              </div>
            ) : colMeta.type === "number" ? (
              <input
                type="number"
                value={value ?? ""}
                onChange={e =>
                  handleChange(
                    role,
                    rowIndex,
                    colMeta, 
                    isNaN(e.target.valueAsNumber) ? null : e.target.valueAsNumber
                  )
                }
                className={`w-full p-2 border rounded-lg ${error ? "border-red-500 bg-red-100/50" : "border-gray-300"}`}
                title={error || ""}
              />
            ) : (
              <input
                type="text"
                value={value}
                onChange={(e) =>
                  handleChange(role, rowIndex, colMeta, e.target.value)
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
  )
}

/**
 * 
 * @param role: "players" | "coaches" | "chaperones"
 * @param columnFormat: columnDescriptor
 */
function createExpandedFormSection(
  role: "team" | "players" | "coaches" | "chaperones",
  columnFormat: { field_name: string; label: string; type: string; required?: boolean; options?: string[] | {id:string,name:string}[] }[],
  rowIndex: number,
  handleChange: (
    section: "team" | "players" | "coaches" | "chaperones",
    rowIndex: number,
    colMeta: { field_name: string; label: string; type: string; required?: boolean; options?: string[]|{id:string,name:string}[] },
    value: string | File | boolean | number | null
  ) => void,
  rowData: Record<string, any>,
  errors: Record<string, string>
) {
  return (
    <div key={rowIndex} className="border border-gray-300 p-4 rounded-lg mb-4">
      <div className="grid grid-cols-3 gap-4">
        {columnFormat.map((colMeta, colIndex) => {
          const value = rowData[colMeta.field_name];
          const error = errors[`${role}-${rowIndex}-${colMeta.field_name}`];

          return (
            <div key={colIndex}>
              <label className="block font-bold text-black mb-1">
                {colMeta.label}
              </label>

              {colMeta.type === "checkbox" ? (
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={value === true || value === "true"}
                    onChange={(e) =>
                      handleChange(role, rowIndex, colMeta, e.target.checked)
                    }
                    className="w-5 h-5"
                    title={error || ""}
                  />
                  <span className="text-sm text-gray-700">{colMeta.label}</span>
                </div>
              ) : colMeta.type === "select" ? (
                <select
                  value={value}
                  onChange={(e) =>
                    handleChange(role, rowIndex, colMeta, e.target.value)
                  }
                  className={`w-full p-2 border rounded-lg ${
                    error ? "border-red-500 bg-red-100/50" : "border-gray-300"
                  }`}
                  title={error || ""}
                >
                  <option value="">Select...</option>
                    {(colMeta.options ?? []).map((opt) => {
                      if (typeof opt === 'string') {
                        // option is a simple string
                        return (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        );
                      } else if (opt && typeof opt === 'object' && 'id' in opt && 'name' in opt) {
                        // option is an object with id and name
                        return (
                          <option key={opt.id} value={opt.id}>
                            {opt.name}
                          </option>
                        );
                      } else {
                        // fallback if shape unexpected
                        return null;
                      }
                    })}
                </select>
              ) : colMeta.type === "image" ? (
                <div className="flex flex-col gap-1 items-start">
                  <div className="flex flex-row gap-1 items-center">
                    <label title="Upload Image" className="text-xs bg-blue-100 hover:bg-blue-300 px-2 py-1 rounded cursor-pointer">
                      Upload
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            handleChange(role, rowIndex, colMeta, file);
                          }
                        }}
                        className="hidden"
                      />
                    </label>
                    <button className=" text-black hover:text-red-500 cursor-pointer" title="Remove Image"
                      onClick={(e) => {e.preventDefault(); handleChange(role, rowIndex, colMeta, null)}}
                    >
                      <MdClose className="w-4 h-4"/>
                    </button>
                  </div>
                  {(() => {
                    const preview =
                      value instanceof File
                        ? URL.createObjectURL(value)
                        : typeof value === "string"
                        ? value
                        : "";

                    return preview ? (
                      <img
                        src={preview}
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded border border-gray-300 shadow"
                      />
                    ) : null;
                  })()}
                </div>
              ) : colMeta.type === "number" ? (
                <input
                  type="number"
                  value={value ?? ""}
                  onChange={e =>
                    handleChange(
                      role,
                      rowIndex,
                      colMeta, 
                      isNaN(e.target.valueAsNumber) ? null : e.target.valueAsNumber
                    )
                  }
                  className={`w-full p-2 border rounded-lg ${error ? "border-red-500 bg-red-100/50" : "border-gray-300"}`}
                  title={error || ""}
                />
              ) : (
                <input
                  type="text"
                  value={value}
                  onChange={(e) =>
                    handleChange(role, rowIndex, colMeta, e.target.value)
                  }
                  className={`w-full p-2 border rounded-lg ${
                    error ? "border-red-500 bg-red-100/50" : "border-gray-300"
                  }`}
                  title={error || ""}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
