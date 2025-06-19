import {
  Team, 
  Player, 
  Coach, 
  Chaperone,
  Region,
  TeamForm,
  PlayerForm,
  CoachForm,
  ChaperoneForm, 
  EntireTeamSubmissionForm,
} from "@/data/teams"

import { createClient } from "@/utils/supabase/client";

// Name of the tables in Supabase/identifiers
type PersonType = "players" | "coaches" | "chaperones";

// Map of person types to their respective form types
type PersonFormMap = {
  players: PlayerForm;
  coaches: CoachForm;
  chaperones: ChaperoneForm;
};

/**
 * Uploads a profile image to the specified bucket in Supabase storage.
 * @param file The file to upload
 * @param bucket The name of the bucket to upload to
 * @param filepath The path within the bucket where the file should be stored, including folders
 * @returns 
 */
const addProfileImageToStorage = async (file: File, bucket: string, filepath: string) => {
  // id is used as the folder name
  const supabase = await createClient(); 
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filepath, file);
  
  if (error) {
    console.error("Error uploading image to (bucket:", bucket, ", file_path", filepath, ") :", error);
    return { error };
  }

  console.log("Successfully uploaded image to (bucket:", bucket, ", file_path", filepath, ") :", data);

  // Return both success and the file reference (filepath)
  return { success: true, filepath: data.path };
};

/**
 * Adds Person to database, given a team_id and a person type.
 * @param newPersonForm
 * @param personType Also the name of the table in Supabase
 * @param team_id 
 * @returns 
 */
export async function addPersonToDatabase<T extends PersonType>(
  newPersonForm: PersonFormMap[T],
  personType: T,
  team_id: string
) {
  console.log(`Attempting to create a new ${personType}`);

  const { photo_submission_file, ...personData } = newPersonForm;
  const finalPersonForm = {
    ...personData,
    team_id: team_id,
  };

  const supabase = await createClient();

  // 1. Insert person data
  const { data, error } = await supabase
    .from(personType)
    .insert(finalPersonForm)
    .select("id");

  if (error || !data || !data[0]?.id) {
    console.error(`Error inserting ${personType}:`, error);
    return { error: error ?? new Error("No person ID returned") };
  }

  const newPersonId = data[0].id;
  
  console.log(`Successfully created a new ${personType}:`, newPersonId);

  if (!photo_submission_file) {
    return { success: true, id: newPersonId };
  }

  // 2. Upload photo
  const filepath = `${newPersonId}/${photo_submission_file.name}`;
  const uploadResult = await addProfileImageToStorage(
    photo_submission_file,
    personType,
    filepath
  );

  if (uploadResult.error) {
    console.error("Error uploading image:", uploadResult.error);
    return { success: true, id: newPersonId, warning: "Photo upload failed" };
  }

  // 3. Update person with photo_ref 
  const { error: updateError } = await supabase
    .from(personType)
    .update({ photo_ref: uploadResult.filepath })
    .eq("id", newPersonId);

  if (updateError) {
    console.error(`Error updating ${personType} with photo reference:`, updateError);
    return { success: true, id: newPersonId, warning: "Photo uploaded, but record not updated" };
  }

  console.log(`Successfully updated ${personType} with photo reference.`);
  return { success: true, id: newPersonId };
}

/**
 *  Adds a new team to the database.
 * @param newTeamForm TeamForm containing team data and an optional photo_submission_file
 * @returns success or error object
 */
export async function addTeamToDatabase(newTeamForm: TeamForm) {
  console.log("Attempting to create a new team");

  const { photo_submission_file, ...teamData } = newTeamForm;
  let finalTeamForm = teamData as Team; // cast to Team type

  const supabase = await createClient();

  // 0. add a slug to each team to make it easier to link to the team page
  const slug = finalTeamForm.name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // remove special chars except space and dash
    .replace(/\s+/g, "-")         // replace spaces with dash
    .replace(/-+/g, "-")          // collapse multiple dashes
    .replace(/^-+|-+$/g, "");     // trim leading/trailing dashes

  finalTeamForm = {
    ...teamData,
    slug,
  };

  // 1. Insert team data
  const { data, error } = await supabase
    .from("teams")
    .insert(finalTeamForm)
    .select("id");

  if (error || !data || !data[0]?.id) {
    console.error("Error inserting team:", error);
    return { error: error ?? new Error("No team ID returned") };
  }

  const newTeamId = data[0].id;
  console.log("Successfully created a new team:", newTeamId);

  // 2. If no photo, return success
  if (!photo_submission_file) {
    return { success: true, id: newTeamId };
  }

  // 3. Upload photo
  const filepath = `${newTeamId}/${photo_submission_file.name}`;
  const uploadResult = await addProfileImageToStorage(
    photo_submission_file,
    "teams", // the name of the bucket
    filepath
  );

  if (uploadResult.error) {
    console.error("Error uploading image:", uploadResult.error);
    return { success: true, id: newTeamId, warning: "Photo upload failed" };
  }

  // 4. Update team with photo_ref
  const { error: updateError } = await supabase
    .from("teams")
    .update({ photo_ref: uploadResult.filepath })
    .eq("id", newTeamId);

  if (updateError) {
    console.error("Error updating team with photo reference:", updateError);
    return { success: true, id: newTeamId, warning: "Photo uploaded, but team not updated" };
  }

  console.log("Successfully updated team with photo reference.");
  return { success: true, id: newTeamId };
}

/**
 * 
 * @param formPayload EntireTeamSubmissionForm containing team, players, coaches, and chaperones
 * @returns 
 */
export async function submitEntireTeamForm(formPayload: EntireTeamSubmissionForm) {

  try {
    const teamResult = await addTeamToDatabase(formPayload.team);
    if (teamResult.error) throw new Error(`Failed to create team: ${teamResult.error}`);
    const team_id = teamResult.id;
    console.log("Successfully created a team with id", team_id);
    
    // Add players
    const playerResults = await Promise.all(
      formPayload.players.map(async (player) => {
        const result = await addPersonToDatabase(player, "players", team_id);
        if (result.error) throw new Error(`Failed to create player: ${result.error}`);
        console.log("Successfully created player:", result);
        return result;
      })
    );

    // Add coaches
    const coachResults = await Promise.all(
      formPayload.coaches.map(async (coach) => {
        const result = await addPersonToDatabase(coach, "coaches", team_id);
        if (result.error) throw new Error(`Failed to create coach: ${result.error}`);
        console.log("Successfully created coach:", result);
        return result;
      })
    );

    // Add chaperones
    const chaperoneResults = await Promise.all(
      formPayload.chaperones.map(async (chaperone) => {
        const result = await addPersonToDatabase(chaperone, "chaperones", team_id);
        if (result.error) throw new Error(`Failed to create chaperone: ${result.error}`);
        console.log("Successfully created chaperone:", result);
        return result;
      })
    );

    console.log("All members created successfully:", {
      team_id,
      playerResults,
      coachResults,
      chaperoneResults,
    });

    return { success: true, 
      team_id,
      playerResults,
      coachResults,
      chaperoneResults,
    };

  } catch (error) {
    console.error("Submission Error:", error);
    alert("Failed to submit the form. Check console for details.");
    return {
      error: "Failed to submit the form. Check console for details.",
      details: error instanceof Error ? error.message : String(error),
    };
  }
}

/**
 * 
 * @returns A list of all state IDs and names from the database.
 */
export async function getStateIDs() { 
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from("states")
      .select("id, name");

    if (error) {
      console.error("Error fetching state IDs:", error);
      return [];
    }

    return data ?? [];
  } catch (error) { 
    console.error("Unexpected error fetching state IDs:", error);
    return [];
  }
}

/**
 * Fetches all team IDs from the database.
 * @param onlyVerified 
 * @returns object with team IDs and names, or an empty array if an error occurs.
 */
export async function getTeamIDs(onlyVerified = false) { 
  const supabase = await createClient();

  try {
    let query = supabase.from("teams").select("id, name");

    if (onlyVerified) {
      query = query.eq("verified", true);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching team IDs:", error);
      return [];
    }

    return data ?? [];
  } catch (error) { 
    console.error("Unexpected error fetching team IDs:", error);
    return [];
  }
}

/**
 * @returns A list of all regions with their states and teams, including players, coaches, and chaperones.
 * This function is used to display teams on the Teams page. Filters out unverified teams and registrants
 */
export async function getDisplayTeams(): Promise<Region[]>{ 
  const supabase = await createClient();
  
  try {
  const { data, error } = await supabase
    .from('regions')
    .select(`
      id,
      name,
      states (
        id,
        name,
        teams (
          id,
          name,
          verified,
          photo_ref,
          school_organization,
          coordinator_phone,
          coordinator_email,
          name_abbreviation,
          slug,
          players (id, first_name, last_name, grade, photo_ref, years_YPP, city, grade, gender, verified), 
          coaches (id, first_name, last_name, grade, photo_ref, years_YPP, city, grade, gender, verified),
          chaperones (id, first_name, last_name, photo_ref, years_YPP, city, gender, verified)
        )
      )
    `);

    if (error) {
      console.error("Error fetching nested all regions:", error);
      return [];
    }

    console.log("Successfully fetched nested all regions:", data[0].states[2]);
    const data_as_region = data as Region[]; // cast to Region type
    
    // filter out all unverified teams
    const filteredData = data_as_region?.map(region => ({
      ...region,
      states: region.states.map(state => ({
        ...state,
        teams: state.teams.filter(team => team.verified).map(team => ({...team, 
          players: team.players.filter(player => player.verified),
          coaches: team.coaches.filter(coach => coach.verified),
          chaperones: team.chaperones.filter(chaperone => chaperone.verified)
        }))
      }))
    }));

    return filteredData ?? [];
  } catch (error) { 
    console.error("Error fetching nested all regions", error);
    return [];
  }
}

/**
 * , Updates a player in the database.
 * @param playerId 
 * @param updatedPlayerForm possibly incomplete PlayerForm object (Playerforms have no ID)
 * @returns 
 */
export async function updatePlayer(
  playerId: string,
  updatedPlayerForm: PlayerForm
) {
  const supabase = await createClient();

  // Separate out the photo file if present
  const { photo_submission_file, ...playerData } = updatedPlayerForm;

  // 1. Update player data (excluding photo_ref for now)
  const { data, error } = await supabase
    .from("players")
    .update(playerData)
    .eq("id", playerId)
    .select("id");

  if (error || !data || !data[0]?.id) {
    console.error("Error updating player:", error);
    return { error: error ?? new Error("No player ID returned") };
  }

  // 2. If no new photo, return success
  if (!photo_submission_file) {
    return { success: true, id: playerId };
  }

  // 3. Upload new photo
  const filepath = `${playerId}/${photo_submission_file.name}`;
  const uploadResult = await addProfileImageToStorage(
    photo_submission_file,
    "players",
    filepath
  );

  if (uploadResult.error) {
    console.error("Error uploading image:", uploadResult.error);
    return { success: true, id: playerId, warning: "Photo upload failed" };
  }

  // 4. Update player with new photo_ref
  const { error: updateError } = await supabase
    .from("players")
    .update({ photo_ref: uploadResult.filepath })
    .eq("id", playerId);

  if (updateError) {
    console.error("Error updating player with photo reference:", updateError);
    return { success: true, id: playerId, warning: "Photo uploaded, but record not updated" };
  }

  console.log("Successfully updated player and photo.");
  return { success: true, id: playerId };
}

/**
 * Updates a team in the database.
 * @param teamId 
 * @param updatedTeamForm  possibly incomplete TeamForm object (Teamforms have no ID)
 * @returns 
 */
export async function updateTeam(
  teamId: string,
  updatedTeamForm: TeamForm
) {
  const supabase = await createClient();

  // Separate out the photo file if present
  const { photo_submission_file, ...teamData } = updatedTeamForm;

  // 1. Update team data (excluding photo_ref for now)
  const { data, error } = await supabase
    .from("teams")
    .update(teamData)
    .eq("id", teamId)
    .select("id");

  if (error || !data || !data[0]?.id) {
    console.error("Error updating team:", error);
    return { error: error ?? new Error("No team ID returned") };
  }

  // 2. If no new photo, return success
  if (!photo_submission_file) {
    return { success: true, id: teamId };
  }

  // 3. Upload new photo
  const filepath = `${teamId}/${photo_submission_file.name}`;
  const uploadResult = await addProfileImageToStorage(
    photo_submission_file,
    "teams",
    filepath
  );

  if (uploadResult.error) {
    console.error("Error uploading image:", uploadResult.error);
    return { success: true, id: teamId, warning: "Photo upload failed" };
  }

  // 4. Update team with new photo_ref
  const { error: updateError } = await supabase
    .from("teams")
    .update({ photo_ref: uploadResult.filepath })
    .eq("id", teamId);

  if (updateError) {
    console.error("Error updating team with photo reference:", updateError);
    return { success: true, id: teamId, warning: "Photo uploaded, but record not updated" };
  }

  console.log("Successfully updated team and photo.");
  return { success: true, id: teamId };
}

/**
 * Get File Links
 */
export function getPublicImageRef(bucket: string, filePath: string): string {
  return `https://qbrwntkvkdhrfolsgtpw.supabase.co/storage/v1/object/public/${bucket}/${filePath}`;
}

// the default images for teams 
export const defaultTeamImageRef = 'https://qbrwntkvkdhrfolsgtpw.supabase.co/storage/v1/object/public/teams/default/profile-picture.jpg';
// the default image for players
export const defaultPlayerImageRef = 'https://qbrwntkvkdhrfolsgtpw.supabase.co/storage/v1/object/public/teams/default/profile-picture.jpg';