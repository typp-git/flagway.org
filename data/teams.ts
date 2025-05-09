import { createClient } from '@/utils/supabase/client';

export type Player = {
  id?: number; // Unique identifier for the player
  created_at?: string; // Timestamp when the player was created
  first_name?: string; // Player's first name
  last_name?: string; // Player's last name
  name: string; // Player's full name
  tshirt_size: string | null; // T-shirt size (nullable)
  dietary_restrictions: string | null; // Dietary restrictions (nullable)
  emergency_contact_name: string | null; // Emergency contact's name (nullable)
  emergency_contact_phone_number: string | null; // Emergency contact's phone number (nullable)
  emergency_contact_relationship: string | null; // Emergency contact's relation (nullable)
  grade: number; // Player's grade 
  team_id: number; // Foreign key referencing the team
  verified: boolean; // Whether the player is verified
  yearsYPP: number; // Years at YPP
  city: string; // City of the player
};

export type Chaperone = Omit<Player, "grade">;
export type Coach = Player

export type Team = {
  id: number;
  created_at: string;
  name: string;
  country: string;
  coordinator_first_name: string;
  coordinator_last_name: string;
  coordinator_email: string;
  coordinator_phone: string;
  name_abbreviation: string;
  state: string;
  city: string;
  slug?: string;
  region?: string;
  players: Player[];
};

export type Region = {
  name: string;
  data: {
    teams: Team[];
  };
};

const createMockPlayer = (name: string, grade: number, city: string, yearsYPP: number): Player => ({
  name,
  grade,
  city,
  yearsYPP,
  tshirt_size: null,
  dietary_restrictions: null,
  emergency_contact_name: null,
  emergency_contact_phone_number: null,
  emergency_contact_relationship: null,
  team_id: 0,
  verified: false
});

const createMockTeam = (name: string, state: string, players: Player[] = []): Team => ({
  id: 0,
  created_at: new Date().toISOString(),
  name,
  country: "USA",
  coordinator_first_name: "",
  coordinator_last_name: "",
  coordinator_email: "",
  coordinator_phone: "",
  name_abbreviation: name.split(" ").map(word => word[0]).join("").toUpperCase(),
  state,
  city: "",
  players
});

const regions: Region[] = [
  {
    name: "Northeast",
    data: {
      teams: [
        createMockTeam("Greater Boston", "MA", [
          createMockPlayer("Robert Sluis", 9, "Boston", 1),
          createMockPlayer("Ethel Amanda Mc'Cain", 8, "Boston", 2),
          createMockPlayer("Breanna Marcus", 7, "Boston", 3)
        ]),
        createMockTeam("VSU", "VA"),
        createMockTeam("Baltimore Algebra Project", "MD"),
      ],
    },
  },
  {
    name: "Midwest",
    data: {
      teams: [
        createMockTeam("Metro HS", "OH"),
        createMockTeam("FOCUOUS", "IL"),
        createMockTeam("inStem", "IL"),
        createMockTeam("Redwing", "MN"),
      ],
    },
  },
  {
    name: "South",
    data: {
      teams: [
        createMockTeam("Metro Atlanta Clayton County", "GA"),
        createMockTeam("Bob Moses Research Center", "FL"),
      ],
    },
  },
  {
    name: "West",
    data: {
      teams: [createMockTeam("Crossroads", "CA")],
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

export async function updateTeam(teamId: number, updatedData: Partial<Team>) {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('teams')
    .update(updatedData)
    .eq('id', teamId)
    .select()
    .single();

  if (error) {
    console.error('Error updating team:', error);
    return { error };
  }

  return { data };
}

export default regions;
