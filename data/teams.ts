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
  state_id: string | null; // State Dropdown
  coordinator_first_name: string; // coordinator first name *
  coordinator_last_name: string; // coordinator first name *
  coordinator_email: string; // Coordinator email*
  coordinator_phone: string; // // Coordinator phone*
  name_abbreviation: string | null; // Team name Abbreviation
  photo_ref: string | null; // Link to Team Image
  special_accommodations: string | null; // Special Accommodations
  verified: boolean; // Whether team is accepted
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
  verified: false, // false on new persons
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
  verified: false, // false on new persons
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
  state_id: null,
  coordinator_first_name: "",
  coordinator_last_name: "",
  coordinator_email: "",
  coordinator_phone: "",
  verified: false, // false on empty teams
  name_abbreviation: null,
  photo_submission_file: null, 
  photo_ref: null,
  special_accommodations: null,
}; 

//// OLD CODE BEYOND HERE ////

export type Region = {
  id: string;
  name: string;
  states: {
    id: string,
    name: string,
    teams: {
      id: string;
      name: string;
      slug?: string; // For linking to team page
      region?: string
      state?: string
      coaches: {id:string, first_name:string, last_name:string, grade:number}[];
      players: {id:string, first_name:string, last_name:string, grade:number}[];
      chaperones: {id:string, first_name:string, last_name:string}[];
    }[];
  }[];
};

// sample data fetched from getSimpleTeams in database_functions.ts
const regions: Region[] =[
  {
    "id": "7217ee41-8274-475e-878f-74e346cd9916",
    "name": "Northeast",
    "states": [
      {
        "id": "09ae4904-f62a-4a4f-ad85-e2e22e1f4a95",
        "name": "Maryland",
        "teams": [
          {
            "id": "94638c70-d899-4341-8f72-646ad7ee4b8e",
            "name": "Baltimore Algebra Project",
            "coaches": [],
            "players": [],
            "chaperones": []
          }
        ]
      },
      {
        "id": "ae96df6c-4289-444b-9fd7-6c05af759107",
        "name": "Virginia",
        "teams": [
          {
            "id": "8cc0abeb-1fbd-4425-b02c-64e8676cc1c0",
            "name": "VSU",
            "coaches": [],
            "players": [
              {
                "id": "8bb0a03e-c35d-45da-8db8-30d117ef0a3d",
                "grade": 7,
                "last_name": "Man",
                "first_name": "Player"
              },
              {
                "id": "67bc201d-f771-414a-9e34-d18a89a03293",
                "grade": 7,
                "last_name": "Man",
                "first_name": "Player"
              },
              {
                "id": "70070d1e-9edd-4327-acca-b4e58c071f65",
                "grade": 6,
                "last_name": "Lowe",
                "first_name": "Rand"
              }
            ],
            "chaperones": []
          }
        ]
      },
      {
        "id": "b4feca4c-de10-4b2f-b085-42ee14f9aab2",
        "name": "Massachusetts",
        "teams": [
          {
            "id": "fbbc1014-22dd-403f-8572-4df4a6181abf",
            "name": "inStem",
            "coaches": [],
            "players": [],
            "chaperones": []
          },
          {
            "id": "1be90562-2c5b-4143-99d4-8ffdac821483",
            "name": "Greater Boston",
            "coaches": [
              {
                "id": "1b38431d-4c69-4b53-b44d-42727182b414",
                "grade": 10,
                "last_name": "Fielder",
                "first_name": "Wanda"
              }
            ],
            "players": [
              {
                "id": "23bf00c9-6546-4ae7-b4d7-d5f3d35711bf",
                "grade": 6,
                "last_name": "LName",
                "first_name": "Student"
              },
              {
                "id": "2e126905-7cb3-485f-878d-83735a30387b",
                "grade": 6,
                "last_name": "LName",
                "first_name": "Student"
              },
              {
                "id": "32620d81-f1cd-4fa1-8867-cb9ac33a3c70",
                "grade": 10,
                "last_name": "Moment",
                "first_name": "Bruh"
              },
              {
                "id": "65209312-b998-4072-be4a-8d256db8d520",
                "grade": 3,
                "last_name": "a",
                "first_name": "a"
              },
              {
                "id": "0daa7153-4af2-4c62-af01-9bda8294c1f8",
                "grade": 6,
                "last_name": "Man",
                "first_name": "Player"
              }
            ],
            "chaperones": []
          },
          {
            "id": "41dca300-2d8b-4368-b02e-45c772e75e07",
            "name": "Shrewsbury Sharks",
            "coaches": [
              {
                "id": "46127f4d-9dd8-43c3-8248-b51979617d77",
                "grade": 9,
                "last_name": "Guy",
                "first_name": "Coachman"
              }
            ],
            "players": [
              {
                "id": "c88b1769-d669-4b99-b455-3cbac3094e59",
                "grade": 6,
                "last_name": "Man",
                "first_name": "Player"
              },
              {
                "id": "a14eb671-8f3d-444c-bc9a-cb0ff0903001",
                "grade": 8,
                "last_name": "Men",
                "first_name": "Chris"
              },
              {
                "id": "a79a4b9a-4651-4c46-b447-95b7dd163a20",
                "grade": 9,
                "last_name": "Smith",
                "first_name": "Timot"
              },
              {
                "id": "e32888e0-5c2b-4377-a49e-68e42b567f6a",
                "grade": 8,
                "last_name": "Louise",
                "first_name": "Sandra"
              },
              {
                "id": "f53f77ab-0819-434b-8bd7-efbb6e2cca63",
                "grade": 9,
                "last_name": "Wong",
                "first_name": "Edmond"
              }
            ],
            "chaperones": []
          },
          {
            "id": "448a75a3-5af8-411c-aef4-20c2dd641317",
            "name": "Crossroads",
            "coaches": [],
            "players": [],
            "chaperones": []
          },
          {
            "id": "50e31118-6017-4fd9-80b4-e587f5e40fad",
            "name": "Redwing",
            "coaches": [],
            "players": [],
            "chaperones": []
          },
          {
            "id": "5e07f4a9-f56a-4bc2-b146-f4ded4a569b8",
            "name": "Metro HS",
            "coaches": [],
            "players": [],
            "chaperones": []
          },
          {
            "id": "f6c47208-44e0-489e-9b0f-57ad7e2faba1",
            "name": "FOCUOUS",
            "coaches": [],
            "players": [],
            "chaperones": []
          }
        ]
      }
    ]
  },
  {
    "id": "1bd7cd0b-6c94-45c7-86d3-0b8df5090639",
    "name": "Midwest",
    "states": [
      {
        "id": "93c552bd-f232-4b74-bce6-7c135ceb41fa",
        "name": "Ohio",
        "teams": []
      },
      {
        "id": "1014f81b-681d-469c-a673-f6dcac6ba677",
        "name": "Illinois",
        "teams": []
      },
      {
        "id": "fb6c9c1d-4409-44e8-8804-1cf6f5a12d7b",
        "name": "Minnesota",
        "teams": []
      }
    ]
  },
  {
    "id": "2120ea28-23de-4ca3-9cff-ec2a73db3144",
    "name": "South",
    "states": [
      {
        "id": "ab8103e8-d140-4603-969c-fbd6ce3d9943",
        "name": "Georgia",
        "teams": [
          {
            "id": "0e3c3aec-f410-46d6-ad25-14d24864bf8a",
            "name": "Georgia Browns",
            "coaches": [
              {
                "id": "a9338842-34e2-46e3-8a22-3b0baf847713",
                "grade": 5,
                "last_name": "GRB_lname",
                "first_name": "GRB_fname"
              }
            ],
            "players": [
              {
                "id": "6157b385-9b36-4ac4-97a1-f032e6b79723",
                "grade": 8,
                "last_name": "GRB_lname",
                "first_name": "GRB_fname"
              }
            ],
            "chaperones": [
              {
                "id": "58ca7317-0e96-4d34-8d88-c53f443431bc",
                "last_name": "GRB_lname",
                "first_name": "GRB_fname"
              }
            ]
          },
          {
            "id": "79ae0440-d3d8-46da-8a7e-418fe4b37ca8",
            "name": "Metro Atlanta Clayton County",
            "coaches": [],
            "players": [],
            "chaperones": []
          }
        ]
      },
      {
        "id": "170a6ec5-8302-4533-9a9e-1ec95b889464",
        "name": "Florida",
        "teams": [
          {
            "id": "5e3438e1-0b6f-4b26-8560-2d1210b7b7cf",
            "name": "Florida Gators",
            "coaches": [
              {
                "id": "319baf1b-84ee-4d91-90a7-2220a4b407fa",
                "grade": 9,
                "last_name": "LName",
                "first_name": "FLG_Coach"
              }
            ],
            "players": [
              {
                "id": "84866c42-9fbe-4abf-a270-0ff5aa81b6c3",
                "grade": 6,
                "last_name": "LName",
                "first_name": "FLG_Player"
              }
            ],
            "chaperones": [
              {
                "id": "f38344d2-2a72-4123-8f73-8e75c21b8a88",
                "last_name": "LName",
                "first_name": "FLG_Chap"
              }
            ]
          },
          {
            "id": "d5d36f79-def8-4ad7-9e99-448c5e42a27a",
            "name": "Bob Moses Research Center",
            "coaches": [],
            "players": [],
            "chaperones": []
          }
        ]
      }
    ]
  },
  {
    "id": "835b813d-37c0-4f4d-a45d-c70eb3738d92",
    "name": "West",
    "states": [
      {
        "id": "737208e0-7015-4851-a5d9-657bc503f5f0",
        "name": "California",
        "teams": []
      }
    ]
  }
]

// add a slug to each team to make it easier to link to the team page
regions.forEach((region) => {
  region.states.forEach((state) => {
    state.teams.forEach((team) => {
      // Create a slug from the team name
    team.slug = team.name.toLowerCase().replace(/ /g, "-");
    team.region = region.name;
    team.state = state.name;
    });
  });
});


export default regions;
