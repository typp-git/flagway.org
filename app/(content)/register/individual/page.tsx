"use client";

import {
  getTeamIDs,
  addPersonToDatabase,
} from "@/utils/supabase/database_functions";
import { useState, useEffect } from "react";
import {
  emptyPlayerForm,
  emptyCoachForm,
  emptyChaperoneForm,
} from "@/data/teams";
import { createExpandedFormSection } from "../../../../components/registerComponents";
import {
  playerFieldMetadata,
  coachFieldMetadata,
  chaperoneFieldMetadata,
} from "../registrationFieldMetadata";
import Image from "next/image";

export default function IndividualRegistrationForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [teamIDs, setTeamIDs] = useState<{ id: string; name: string }[]>([
    { id: "", name: "" },
  ]); // For storing team IDs
  const [selectedTeamID, setSelectedTeamID] = useState<string>(""); // For storing team IDs

  const [personType, setPersonType] = useState<
    "player" | "coach" | "chaperone"
  >("player");

  let sectionName: "coaches" | "chaperones" | "players" =
    personType === "coach"
      ? "coaches"
      : personType === "chaperone"
      ? "chaperones"
      : personType === "player"
      ? "players"
      : "players";
  let columnType =
    personType === "coach"
      ? coachFieldMetadata
      : personType === "chaperone"
      ? chaperoneFieldMetadata
      : personType === "player"
      ? playerFieldMetadata
      : playerFieldMetadata;
  let emptyFormType =
    personType === "coach"
      ? emptyCoachForm
      : personType === "chaperone"
      ? emptyChaperoneForm
      : personType === "player"
      ? emptyPlayerForm
      : emptyPlayerForm;

  const [formData, setFormData] = useState<
    typeof emptyPlayerForm | typeof emptyCoachForm | typeof emptyChaperoneForm
  >(emptyPlayerForm);

  /**
   * Resets Form to Default, Called after Submitting new Player
   */
  const resetForm = () => {
    setIsSubmitted(false);
    setFormData(emptyFormType);
    setErrors({});
    setSelectedTeamID(""); // Reset selected team ID
  };

  // Fetch Team IDs on Initial Render
  useEffect(() => {
    const fetchTeamIDs = async () => {
      try {
        const ids = await getTeamIDs(true);
        setTeamIDs(ids);
      } catch (error) {
        console.error("Error fetching team IDs:", error);
      }
    };
    fetchTeamIDs();
  }, []);

  // Reset Form Data When Person Type Changes
  useEffect(() => {
    console.log("Resetting form data");

    // Move the variables INSIDE the effect so they aren’t redefined on every render
    const sectionNameLocal =
      personType === "coach"
        ? "coaches"
        : personType === "chaperone"
        ? "chaperones"
        : personType === "player"
        ? "players"
        : "players";

    const columnTypeLocal =
      personType === "coach"
        ? coachFieldMetadata
        : personType === "chaperone"
        ? chaperoneFieldMetadata
        : personType === "player"
        ? playerFieldMetadata
        : playerFieldMetadata;

    const emptyFormLocal =
      personType === "coach"
        ? emptyCoachForm
        : personType === "chaperone"
        ? emptyChaperoneForm
        : personType === "player"
        ? emptyPlayerForm
        : emptyPlayerForm;

    // Use the local variables
    setErrors({});
    setFormData(emptyFormLocal);
    setIsSubmitted(false);
  }, [personType]);

  /**
   * Changed the Role of the Player
   * @param e
   */
  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPersonType(e.target.value as "player" | "coach" | "chaperone");
  };

  /**
   * Evaluates Errors given Field Metadata and a Value: Same between individual and Team registration
   *
   * @param singleFieldMeta Metadata for the Field
   * @param value
   * @returns Empty String for No Error or String Describing Error
   */
  const validateField = (
    singleFieldMeta: {
      field_name: string;
      label: string;
      type: string;
      required?: boolean;
      options?: string[] | { id: string; name: string }[];
      validate?: (value: string | File | number | boolean | null) => string;
    },
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
    section: "team" | "players" | "coaches" | "chaperones", // ✅ Restrict valid sections
    rowIndex: number, // 0 for team, 0-indexed for players/coaches/chaperones
    singleFieldMeta: {
      field_name: string;
      label: string;
      type: string;
      required?: boolean;
      options?: string[] | { id: string; name: string }[];
      validate?: (value: string | File | number | boolean | null) => string;
    }, // Field Metadata of field that will be changed
    newValue: string | File | boolean | number | null // accepts files
  ) => {
    const errorKey = `${section}-${rowIndex}-${singleFieldMeta.field_name}`; // eg: students-3-grade or chaperones-0-first_name
    const error = validateField(singleFieldMeta, newValue);

    setErrors((prevErrors) => ({
      ...prevErrors,
      [errorKey]: error, // Update the error for the specific field
    }));

    setFormData((prev) => ({
      // update the specific info
      ...prev,
      [singleFieldMeta.field_name]: newValue,
    }));
  };

  /**
   * runs validateField on every field in the form
   *
   * @returns true if no errors
   */
  const validateAll = () => {
    const updatedErrors: Record<string, string> = {};

    columnType.forEach((singleFieldMeta) => {
      const rowIndex = 0; // for individual submission, only need 0
      const value =
        formData[singleFieldMeta.field_name as keyof typeof formData];
      const error = validateField(singleFieldMeta, value ?? ""); // cast to "" if undefined
      if (error) {
        const key = `${sectionName}-${rowIndex}-${singleFieldMeta.field_name}`;
        updatedErrors[key] = error;
      }
    });

    setErrors(updatedErrors); // update errors
    return Object.keys(updatedErrors).length === 0; // check if updated Errors are empty
  };

  /**
   * Called when the Form is Submitted
   * Validates all fields, and if no errors, submits form to Supabase
   * Nearly identical to Team-Registration, except submits individual after validation
   *
   * @param e event
   * @returns
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("errors", errors);
    console.log("formData", formData);

    const isValidated = validateAll(); // Check if there are any errors present on the form

    if (!isValidated) {
      // Errors still exist, Return
      alert("Please fix the errors before submitting.");
      return;
    }

    const result = await addPersonToDatabase(
      formData,
      sectionName,
      selectedTeamID
    ); // Submit Individual
    if (result.error) {
      console.error("Error submitting form:", result.error);
      alert("There was an error submitting the form. Please try again.");
      return;
    } else {
      console.log(
        "Successfully Added",
        personType,
        formData.first_name,
        formData.last_name,
        "to team",
        teamIDs.find((team) => team.id === selectedTeamID)
      );
      setIsSubmitted(true); // ✅ Set submitted state to true
      // setFormData(emptyFormType); // Reset form data after successful submission
    }
  };

  return (
    <div className="py-15 w-[100%] mx-auto p-[4%] bg-white shadow-lg rounded-lg">
      <div className="flex justify-center">
        <Image
          src="/clear-structure.png"
          alt="Clear Structure"
          width={100}
          height={300}
          className="animate-spin-slow mb-6"
        />
      </div>

      <h1 className="text-6xl font-bold text-center mb-25">
        National Flagway Team Registration
      </h1>

      <div className="flex flex-row flex-center justify-center mb-12 gap-12">
        <a className="text-blue-700 hover:underline" href="/register/">
          Register a Team Instead
        </a>
        {/* <a className="text-blue-700 hover:underline" href='/register/individual'>Register an Individual Instead</a> */}
      </div>

      {!isSubmitted ? ( // Show form if it has NOT been submitted yet
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* SELECT TEAM SECTION */}
          <label className="block font-bold text-black mb-1">
            Select Team *
          </label>
          <select
            className="w-full p-2 border rounded-lg border-gray-300"
            value={selectedTeamID}
            onChange={(e) => setSelectedTeamID(e.target.value)}
            required
          >
            <option value="">Select...</option>
            {teamIDs.map((opt) => {
              return (
                <option key={opt.name} value={opt.id}>
                  {opt.name}
                </option>
              );
            })}
          </select>

          {/* SELECT ROLE SECTION */}
          <label className="block font-bold text-black mb-1">
            Select Team Role *
          </label>
          <select
            className="w-full p-2 border rounded-lg border-gray-300"
            value={personType}
            onChange={handleRoleChange}
            required
          >
            <option value="">Select...</option>
            {["player", "chaperone", "coach"].map((opt) => {
              return (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              );
            })}
          </select>

          {/* PLAYER INFO SECTION */}
          <div>
            <h3 className="text-lg font-semibold">
              Flagway {personType.charAt(0).toUpperCase() + personType.slice(1)}{" "}
              Information
            </h3>
            <p className="text-lg font-semibold">(Required *)</p>
            <div>
              {createExpandedFormSection(
                sectionName,
                columnType,
                0,
                handleChange,
                formData,
                errors
              )}
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
        // Show this message and button when form is submitted
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-900">
            Thank you!{" "}
            {`${formData.first_name} ${formData.last_name} has been successfully registered.`}
          </p>
          <button
            onClick={resetForm}
            className="mt-4 px-6 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600"
          >
            Submit Another Individual
          </button>
        </div>
      )}
    </div>
  );
}
