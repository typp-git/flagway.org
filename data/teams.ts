import { createClient } from '@/utils/supabase/client';

export type Player = {
  id?: number; // Unique identifier for the player
  created_at?: string; // Timestamp when the player was created
  first_name: string; // Player's first name
  last_name: string; // Player's last name
  tshirt_size: string | null; // T-shirt size (nullable)
  dietary_restrictions: string | null; // Dietary restrictions (nullable)
  emergency_contact_name: string | null; // Emergency contact's name (nullable)
  emergency_contact_phone_number: string | null; // Emergency contact's phone number (nullable)
  emergency_contact_relationship: string | null; // Emergency contact's relation (nullable)
  grade: number; // Player's grade 
  team_id: number; // Foreign key referencing the team
  verified: boolean; // Whether the player is verified
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
};

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
            { name: "Robert Sluis", grade: 9, city: "Boston", yearsYPP: 1 },
            { name: "Ethel Amanda Mc'Cain", grade: 8, city: "Boston", yearsYPP: 2 },
            { name: "Breanna Marcus", grade: 7, city: "Boston", yearsYPP: 3 }
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
