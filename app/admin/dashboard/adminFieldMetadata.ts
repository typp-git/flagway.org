function validatePhone(value: string | number | boolean | File | null): string {
  if (typeof value !== "string") return "Phone number must be a string";
  const phoneRegex = /^[0-9]{10,}$/;
  if (typeof value === "string" && value.trim() !== "" && !phoneRegex.test(value)) {
    return "Invalid phone number";
  }
  return "";
}

function validateGrade(value: string | number | boolean | File | null): string {
  const num = typeof value === "number" ? value : Number(value);
  if (isNaN(num)) return "Grade must be a number";
  if (num < 0 || num > 12) return "Grade must be between 0 and 12";
  if (!Number.isInteger(num)) return "Grade must be a whole number";
  return "";
}

function validateYearsYPP(value: string | number | boolean | File | null): string {
  const num = typeof value === "number" ? value : Number(value);
  if (isNaN(num)) return "Years YPP must be a number";
  if (num < 0) return "Years YPP must be a whole number";
  if (!Number.isInteger(num)) return "Years YPP must be a whole number";
  return "";
}

export const states = [ // TODO: can replace with a database call to states in useeffect
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

export const teamFieldMetadata = [
  { field_name: "name", label: "Team Name *", type: "text", required: true },
  { field_name: "name_abbreviation", label: "Team Abbreviation", type: "text", required: false },
  { field_name: "school_organization", label: "School/Organization *", type: "text", required: true },
  { field_name: "country", label: "Country *", type: "select", options: ["USA"], required: true },
  { field_name: "state_id", label: "State", type: "select", options: states, required: false },
  { field_name: "coordinator_first_name", label: "Coordinator First Name *", type: "text", required: true },
  { field_name: "coordinator_last_name", label: "Coordinator Last Name *", type: "text", required: true },
  { field_name: "coordinator_email", label: "Coordinator Email *", type: "text", required: true },
  { field_name: "coordinator_phone", label: "Coordinator Phone # *", type: "text", required: true, validate: validatePhone },
  { field_name: "special_accommodations", label: "Special Accommodations", type: "text", required: false },
  { field_name: "photo_submission_file", label: "Team Logo", type: "image", required: false }
];

export const playerFieldMetadata = [
  { field_name:"first_name", label: "First Name *", type: "text", required: true },
  { field_name:"last_name", label: "Last Name *", type: "text", required: true },
  { field_name:"gender", label: "Gender *", type: "select", options: ["Male", "Female"], required: true },
  { field_name:"grade", label: "Grade *", type: "number", required: true, validate: validateGrade  },
  { field_name:"tshirt_size", label: "T-shirt Size *", type: "select", options: ["XS", "S", "M", "L", "XL", "XXL"], required: true },
  { field_name:"dietary_restrictions", label: "Dietary Restrictions", type: "text", required: false },
  { field_name:"emergency_contact_name", label: "Emergency Contact Name *", type: "text", required: true},
  { field_name:"emergency_contact_phone", label: "Emergency Contact Phone Number *", type: "text", required: true, validate: validatePhone },
  { field_name:"emergency_contact_relationship", label: "Emergency Contact Relationship *", type: "text", required: true },
  { field_name:"city", label: "City", type: "text", required: false },
  { field_name:"years_YPP", label: "Years in YPP", type: "number", required: false, validate: validateYearsYPP },
  { field_name:"previous_tournament_experience", label: "Previous Tournament Experience?", type: "checkbox", required: false},
  { field_name:"photo_consent_given", label: "Photo Consent Given?", type: "checkbox", required: false},
  { field_name:"photo_submission_file", label: "Photo Upload", type: "image", required: false} 
];

export const coachFieldMetadata = [
  { field_name:"first_name", label: "First Name *", type: "text", required: true },
  { field_name:"last_name", label: "Last Name *", type: "text", required: true },
  { field_name:"gender", label: "Gender *", type: "select", options: ["Male", "Female"], required: true },
  { field_name:"grade", label: "Grade *", type: "number", required: true, validate: validateGrade  },
  { field_name:"tshirt_size", label: "T-shirt Size *", type: "select", options: ["XS", "S", "M", "L", "XL", "XXL"], required: true },
  { field_name:"dietary_restrictions", label: "Dietary Restrictions", type: "text", required: false },
  { field_name:"emergency_contact_name", label: "Emergency Contact Name *", type: "text", required: true},
  { field_name:"emergency_contact_phone", label: "Emergency Contact Phone Number *", type: "text", required: true, validate: validatePhone },
  { field_name:"emergency_contact_relationship", label: "Emergency Contact Relationship *", type: "text", required: true },
  { field_name:"city", label: "City", type: "text", required: false },
  { field_name:"years_YPP", label: "Years in YPP", type: "number", required: false, validate: validateYearsYPP },
  { field_name:"previous_tournament_experience", label: "Previous Tournament Experience?", type: "checkbox", required: false},
  { field_name:"photo_consent_given", label: "Photo Consent Given?", type: "checkbox", required: false},
  { field_name:"photo_submission_file", label: "Photo Upload", type: "image", required: false} 
];

export const chaperoneFieldMetadata = [
  { field_name:"first_name", label: "First Name *", type: "text", required: true },
  { field_name:"last_name", label: "Last Name *", type: "text", required: true },
  { field_name:"gender", label: "Gender *", type: "select", options: ["Male", "Female"], required: true },
  { field_name:"email", label: "Email *", type: "text", required: true},
  { field_name:"phone", label: "Phone Number *", type: "text", required: true, validate: validatePhone },
  { field_name:"tshirt_size", label: "T-shirt Size *", type: "select", options: ["XS", "S", "M", "L", "XL", "XXL"], required: true },
  { field_name:"dietary_restrictions", label: "Dietary Restrictions", type: "text", required: false },
  { field_name:"emergency_contact_name", label: "Emergency Contact Name *", type: "text", required: true},
  { field_name:"emergency_contact_phone", label: "Emergency Contact Phone Number *", type: "text", required: true, validate: validatePhone },
  { field_name:"emergency_contact_relationship", label: "Emergency Contact Relationship *", type: "text", required: true },
  { field_name:"city", label: "City", type: "text", required: false },
  { field_name:"years_YPP", label: "Years in YPP", type: "number", required: false, validate: validateYearsYPP },
  { field_name:"photo_consent_given", label: "Photo Consent Given?", type: "checkbox", required: false},
  { field_name:"photo_submission_file", label: "Photo Upload", type: "image", required: false} 
];
