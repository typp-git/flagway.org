import {
  Team, 
  Player, 
  Coach, 
  Chaperone,
  TeamForm,
  PlayerForm,
  CoachForm,
  ChaperoneForm, 
  EntireTeamSubmissionForm,
  emptyPlayerForm,
  emptyCoachForm, 
  emptyChaperoneForm,
  emptyTeamForm,
} from "@/data/teams"

import { createClient } from "@/utils/supabase/client";

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

type PersonType = "players" | "coaches" | "chaperones";

type PersonFormMap = {
  players: PlayerForm;
  coaches: CoachForm;
  chaperones: ChaperoneForm;
};

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

export async function addTeamToDatabase(newTeamForm: TeamForm) {
  console.log("Attempting to create a new team");

  const { photo_submission_file, ...teamData } = newTeamForm;
  const finalTeamForm = teamData as Omit<TeamForm, "photo_submission_file">; // restructure to remove photo_submission_file

  const supabase = await createClient();

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

export async function getNestedAllRegionTeams() { 
  const supabase = await createClient();

  try {
  const { data, error } = await supabase
    .from('regions')
    .select(`
      *,
      states (
        *,
        teams (
          *,
          players (*)
        )
      )
    `);

    if (error) {
      console.error("Error fetching nested all regions:", error);
      return [];
    }

    return data ?? [];
  } catch (error) { 
    console.error("Error fetching nested all regions", error);
    return [];
  }
}

export async function getSimpleTeams() { 
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
          players (id, first_name, last_name, grade), 
          coaches (id, first_name, last_name, grade),
          chaperones (id, first_name, last_name)
        )
      )
    `);

    if (error) {
      console.error("Error fetching nested all regions:", error);
      return [];
    }

    return data ?? [];
  } catch (error) { 
    console.error("Error fetching nested all regions", error);
    return [];
  }
}