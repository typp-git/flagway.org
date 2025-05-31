// JS/Supabase Schema
/**
KEY:
New Fields
Cannot be Edited in Team Submission
Changed Fields 
Fields with * are Required (Non-null)
*/

export type Team = {
  id?: string; // uuid (Not on Submission Form) 
  created_at?: string;  // Time created (Not on Submission Form) 
  slug?: string; // slug (For Frontend Use, Not on Submission Form, Not in Database) 
  school_organization: string;  // Team School/Organization Name*
  name: string; // Team Name*
  country: string; // Country Dropdown*
  state: string | null; // State Dropdown
  coordinator_first_name: string; // coordinator first name *
  coordinator_last_name: string; // coordinator first name *
  coordinator_email: string; // Coordinator email*
  coordinator_phone: string; // // Coordinator phone*
  name_abbreviation: string | null; // Team name Abbreviation
  photo_ref: string | null; // Link to Team Image
  special_accommodations: string | null; // Special Accommodations
  };
  
  export type Player = {
  id?: string;  // uuid (Not on Submission Form) 
  created_at?: string; // Timestamp when the player was created (Not on Submission Form) 
  team_id?: number; // Foreign key referencing the team (Not on Submission Form) 
  first_name: string; // First name*
  last_name: string; // Last name* 
  gender: string; // Gender*
  grade: number; // Grade*
  tshirt_size: string; // T-shirt size*
  photo_consent_given: boolean; // Photo Consent Given*
  previous_tournament_experience: boolean; // Whether player/coach has previous experience*
  verified: boolean; // Whether the person is accepted to team* 
  email: string | null; // Email Required for chaperone
  phone: string | null; // Phone Required for chaperone
  dietary_restrictions: string | null; // Dietary restrictions
  emergency_contact_name: string | null; // Emergency contact name
  emergency_contact_phone: string | null; // Emergency contact phone
  emergency_contact_relationship: string | null; // Emergency contact relation
  city: string | null; // City 
  years_YPP: number | null; // Years at YPP
  photo_ref: string | null; // Image to Link 
  };
  
  export type Coach = Player
  
  export type Chaperone = Omit<Player, 
    'grade' |  'previous_tournament_experience'
  > & {
    email: string; // Email*
    phone: string; // Phone*
  };
  
  // SUBMISSION FORMS
  
  export type TeamForm = Omit<Team,
    'id' | 'created_at' | 'slug' 
  > & {  photo_submission_file?: File | null;  }; // add submission file

  /**
   * Keep ID from changing
   * If photo_submission_file is not null, then add it. 
   */
  export type PlayerForm = Omit<Player,
    'id' | 'created_at'
  > & { photo_submission_file ?: File | null;  }; // add submission file
  
  export type CoachForm = PlayerForm 
  
  export type ChaperoneForm = Omit<Chaperone,
    'id' | 'created_at' 
  > & { photo_submission_file ?: File | null;  }; // add submission file
  
  export type EntireTeamSubmissionForm = {
    team: TeamForm; 
    players: PlayerForm[];
    coaches: CoachForm[];
    chaperones: ChaperoneForm[];
  }
  
  // EMPTY SUBMISSION FORMS
  
  // usage: let localForm = { ...emptyPlayerForm }
  
  export const emptyPlayerForm: PlayerForm = {
    first_name: "",
    last_name: "",
    gender: "",
    grade: 0,
    tshirt_size: "",
    photo_consent_given: false,
    previous_tournament_experience: false,
    verified: false,
    email: null,
    phone: null,
    dietary_restrictions: null,
    emergency_contact_name: null,
    emergency_contact_phone: null,
    emergency_contact_relationship: null,
    city: null,
    years_YPP: null,
    photo_submission_file: null,
    photo_ref: null
  };
  
  export const emptyCoachForm = emptyPlayerForm;
  
  export const emptyChaperoneForm: ChaperoneForm = {
    first_name: "",
    last_name: "",
    gender: "",
    tshirt_size: "",
    photo_consent_given: false,
    verified: false,
    email: "",
    phone: "",
    dietary_restrictions: null,
    emergency_contact_name: null,
    emergency_contact_phone: null,
    emergency_contact_relationship: null,
    city: null,
    years_YPP: null,
    photo_ref: null,
    photo_submission_file: null,
  };
  
  export const emptyTeamForm: TeamForm = {
    school_organization: "",
    name: "",
    country: "",
    state: null,
    coordinator_first_name: "",
    coordinator_last_name: "",
    coordinator_email: "",
    coordinator_phone: "",
    name_abbreviation: null,
    photo_submission_file: null, 
    photo_ref: null,
    special_accommodations: null,
  };
  

  //// OLD CODE BEYOND HERE ////

export type Region = {
  name: string;
  data: {
    teams: Team[];
  };
};

const regions: Region[] = [
  {
    name: "Northeast",
    data: {
      teams: [
        {
          name: "Greater Boston",
          state: "MA",
          players: [
            { first_name: "Player 1", grade: 9 },
            
          ],
        },
        { name: "VSU", state: "VA", players: [] },
        { name: "Baltimore Algebra Project", state: "MD", players: [] },
      ],
    },
  },
  {
    name: "Midwest",
    data: {
      teams: [
        { name: "Metro HS", state: "OH", players: [] },
        { name: "FOCUOUS", state: "IL", players: [] },
        { name: "inStem", state: "IL", players: [] },
        { name: "Redwing", state: "MN", players: [] },
      ],
    },
  },
  {
    name: "South",
    data: {
      teams: [
        { name: "Metro Atlanta Clayton County", state: "GA", players: [] },
        { name: "Bob Moses Research Center", state: "FL", players: [] },
      ],
    },
  },
  {
    name: "West",
    data: {
      teams: [{ name: "Crossroads", state: "CA", players: [] }],
    },
  },
];

// add a slug to each team to make it easier to link to the team page
regions.forEach((region) => {
  region.data.teams.forEach((team) => {
    team.slug = team.name.toLowerCase().replace(/ /g, "-");
    team.region = region.name;
  });
});

export default regions;
