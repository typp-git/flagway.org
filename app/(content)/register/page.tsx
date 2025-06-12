"use client";

import { submitEntireTeamForm } from "@/utils/supabase/database_functions";
import { useState } from "react";
import { MdAddCircle, MdRemoveCircle} from "react-icons/md";
import { emptyPlayerForm, emptyCoachForm, emptyChaperoneForm, emptyTeamForm } from "@/data/teams";
import { createTableRow, createExpandedFormSection } from "../../../components/registerComponents";
import { playerFieldMetadata, coachFieldMetadata, chaperoneFieldMetadata, teamFieldMetadata} from "./registrationFieldMetadata"

// Controls the default lengths for each section, can be changed as needed
const defaultPlayerSize = 6;
const defaultCoachSize = 2;
const defaultChaperoneSize = 2;

export default function RegistrationForm() {
	const [isSubmitted, setIsSubmitted] = useState(false); // If isSubmitted, shows Completion Page, Submit Another?
  
  // List of errors of format: "{section}-{index}-{field}-{error}"
  // for example: "coaches-years_ypp-years ypp must be a number"
  const [errors, setErrors] = useState<Record<string, string>>({}); 
 
  // Submission data that is changed when the form is edited
  // Not the complete team/individual object because it contains Files
  // Contains some empty fields, but the entries, and possible values in these fields depend on playerColumns
	const [formData, setFormData] = useState({
    team: {... emptyTeamForm},
    players: Array.from({ length: defaultPlayerSize }, () => ({... emptyPlayerForm})),
    coaches: Array.from({ length:  defaultCoachSize }, () =>  ({... emptyCoachForm})), 
    chaperones: Array.from({ length: defaultChaperoneSize }, () => ({... emptyChaperoneForm})),
  });
  
  const resetForm = () => { // resets form to default size, called when submitted 
		setFormData({
		  team: {... emptyTeamForm},
      players: Array.from({ length: defaultPlayerSize }, () => ({... emptyPlayerForm})),
      coaches: Array.from({ length:  defaultCoachSize }, () =>  ({... emptyCoachForm})), 
      chaperones: Array.from({ length: defaultChaperoneSize }, () => ({... emptyChaperoneForm})),
		});
		setIsSubmitted(false);
    setErrors({}) // Clear all Errors
	};

const addRow = ( // adds empty row to person sections
  section: "players" | "coaches" | "chaperones",
  emptyForm: typeof emptyPlayerForm | typeof emptyCoachForm | typeof emptyChaperoneForm
) => (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();
  setFormData((prevForm) => ({
    ...prevForm,
    [section]: [...prevForm[section], { ...emptyForm }],
  }));
};

const removeLastRow = ( // removes last row of person section and clears its errors.
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
 * Evaluates Errors given Field Metadata and a Value: Same between individual and Team registration
 * 
 * @param singleFieldMeta Metadata for the Field
 * @param value 
 * @returns Empty String for No Error or String Describing Error
 */
const validateField = (
  singleFieldMeta: { field_name: string; label: string; type: string; required?: boolean; options?: string[]|{id:string,name:string}[], validate?: (value: string | File | number | boolean | null) => string },
  value: string | File | number | boolean | null
): string => {
  let error = "";

  // Required fields must not be empty
  const isEmpty = 
    value === undefined ||
    value === null ||
    (typeof value === "string" && value.trim() === "") ||
    (singleFieldMeta.type === "select" && value === "") ||
    (singleFieldMeta.type === "checkbox" && value !== true) ||
    (singleFieldMeta.type === "image" && !(value instanceof File));
  
  if (singleFieldMeta.required && isEmpty) {
    return `${singleFieldMeta.label} is required`;
  }

  // Validate if there exists a validate function in the field metadata
  if (typeof singleFieldMeta.validate === "function") {
    error = singleFieldMeta.validate(value);
  }

  return error;
};
	  
  /**
   * Called Whenever an input is changed. 
   * Updates FormData with new values, and Updates Errors if these new values are incorrect
   * 
   * @param section // Restrict valid sections "team" | "players" | "coaches" | "chaperones"
   * @param rowIndex // number of the indiviudal, or 0 for team
   * @param singleFieldMeta // Field Metadata of field that will be changed
   * @param value // New value of that field
   */
  const handleChange = (
  section: "team" | "players" | "coaches" | "chaperones", 
  rowIndex: number, 
  singleFieldMeta: { field_name: string; label: string; type: string; required?: boolean; options?: string[]|{id:string,name:string}[], validate?: (value: string | File | number | boolean | null) => string },
  newValue: string | File | boolean | number | null // accepts files
  ) => {
    const errorKey = `${section}-${rowIndex}-${singleFieldMeta.field_name}`; // eg: students-3-grade or chaperones-0-first_name
    const error = validateField(singleFieldMeta, newValue);
  
    setErrors((prevErrors) => ({
      ...prevErrors,
      [errorKey]: error, // Update the error for the specific field
    }));

    if (section == "team") { // team updates must update team field
      setFormData((prev) => ({
        ...prev,
        team: {...prev.team, [singleFieldMeta.field_name]: newValue, },
      }));
    } else { // "players" "coaches" "chaperones" updates must update field of an individual in a list
      setFormData((prev) => ({ 
        ...prev,
        [section]: prev[section].map((person, i) =>
          (i === rowIndex) ? {...person, [singleFieldMeta.field_name]: newValue, } : person
        ),
      }));
    }
  };

  /**
   * runs validateField on every field in the form
   * @returns true if no errors
   */
  const validateAll = () => {
    const updatedErrors: Record<string, string> = {};
    const sections = [
      {
        section: "team",
        getData: () => [formData.team], // Wrap single object in array
        fieldsMetadata: teamFieldMetadata,
      },
      {
        section: "players",
        getData: () => formData.players,
        fieldsMetadata: playerFieldMetadata,
      },
      {
        section: "coaches",
        getData: () => formData.coaches,
        fieldsMetadata: coachFieldMetadata,
      },
      {
        section: "chaperones",
        getData: () => formData.chaperones,
        fieldsMetadata: chaperoneFieldMetadata,
      },
    ] as const;

    sections.forEach(({ section, getData, fieldsMetadata }) => { // Run through every field on FormData
      getData().forEach((entry, rowIndex) => {
        fieldsMetadata.forEach((singleFieldMeta) => {
          const value = entry[singleFieldMeta.field_name as keyof typeof entry];
          const error = validateField(singleFieldMeta, value ?? ""); // cast to "" if undefined
          if (error) {
            const key = `${section}-${rowIndex}-${singleFieldMeta.field_name}`;
            updatedErrors[key] = error;
          }
        });
      });
    });

    setErrors(updatedErrors); // update errors
    return Object.keys(updatedErrors).length === 0; // return true if there are no errors, false if errors
  };

  /**
   * Called when the Form is Submitted
   * Validates all fields, and if no errors, submits form to Supabase
   * 
   * @param e event
   * @returns 
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("errors", errors)
    console.log("formData", formData)

    const isValidated = validateAll(); // Check if there are any errors present on the form

    if (!isValidated) { // Errors still exist, Return
      alert("Please fix the errors before submitting.");
      return;
    }

    submitEntireTeamForm(formData).then((result) => {  // Submit Entire Form
      if (result.error) { // Database Error, Not Submitted
        console.error("Error submitting form:", result.error);
        alert("Failed to submit the form. Check console for details.");
      } else { // Success
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

      <div className="flex flex-row flex-center justify-center mb-12 gap-12">
        {/* <a className="text-blue-700 hover:underline" href='/register/'>Register a Team Instead</a> */}
        <a className="text-blue-700 hover:underline" href='/register/individual'>Register an Individual Instead</a>
      </div>

      {!isSubmitted ? ( // Show form if it has NOT been submitted yet
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* TEAM INFO SECTION */}
          <div>
            <h3 className="text-lg font-semibold">Flagway Team Information</h3>
            <p className="text-lg font-semibold">(Required *)</p>
            <div>
              {createExpandedFormSection("team", teamFieldMetadata, 0, handleChange, formData.team, errors)}
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
                    {playerFieldMetadata.map((col, i) => ( // TODO: REPEATED HEADER CODE among coach,chaperone,player, MAKE OWN MODULE
                    <th key={i} className={`p-2 border border-black text-white ${(col.type === "checkbox")? "w-2":""}`}>
                      {col.label}
                    </th>
                  ))}
                  </tr>
                </thead>
                <tbody>
                {formData.players.map((person, personIndex) => ( // TODO: REPEATED ROW CODE among coach,chaperone,player, MAKE OWN MODULE
                    createTableRow("players", playerFieldMetadata, personIndex, handleChange, person, errors)
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
                  {coachFieldMetadata.map((col, i) => (
                    <th key={i} className={`p-2 border border-black text-white ${(col.type === "checkbox")? "w-2":""}`}>
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
                <tbody>
                  {formData.coaches.map((person, personIndex) => (
                    createTableRow("coaches", coachFieldMetadata, personIndex, handleChange, person, errors)
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
                    {chaperoneFieldMetadata.map((col, i) => (
                      <th key={i} className={`p-2 border border-black text-white ${(col.type === "checkbox")? "w-2":""}`}>
                        {col.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                {formData.chaperones.map((person, personIndex) => ( // TODO: REPEATED ROW CODE among coach,chaperone,player, MAKE OWN MODULE
                      createTableRow("chaperones", chaperoneFieldMetadata, personIndex, handleChange, person, errors)  
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
        ) : ( // Show this message and button when form is submitted
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
        )
      }
    </div>
  );
}