export type Player = {
  name: string;
  grade: number;
  city: string;
  yearsYPP: number;
};

export type Team = {
  name: string;
  state: string;
  players: Player[];
  slug?: string; // Add the optional slug property
  region?: string;
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
            { name: "Player 1", grade: 9, city: "Boston", yearsYPP: 1 },
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
