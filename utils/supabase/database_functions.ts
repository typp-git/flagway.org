import { Player } from "@/data/teams"
import { createClient } from "@/utils/supabase/client";



/**
 * 
 * @param playerData Player Object but with Strings as Each Value
 * @returns Player Object without id and created_at
 */
function parsePlayer(
    playerData: Partial<Record<keyof Player, string | number | boolean>>
  ): Partial<Omit<Player, "id" | "created_at">> | { error: string } {
    try {
      return {
        first_name: playerData.first_name as string | undefined,
        last_name: playerData.last_name as string | undefined,
        tshirt_size: playerData.tshirt_size as string | undefined,
        dietary_restrictions: playerData.dietary_restrictions as string | undefined,
        emergency_contact_name: playerData.emergency_contact_name as string | undefined,
        emergency_contact_phone: playerData.emergency_contact_phone as string | undefined,
        emergency_contact_relationship: playerData.emergency_contact_relationship as string | undefined,
        grade: playerData.grade ? Number(playerData.grade) : undefined, // Convert grade to number or undefined
        team_id: playerData.team_id ? Number(playerData.team_id) : undefined, // Convert team_id to number or undefined
        verified: playerData.verified !== undefined ? Boolean(playerData.verified) : undefined, // Convert verified to boolean or undefined
      };
    } catch (error) {
      console.error("Error parsing player data:", error);
      return { error: "Failed to parse player data. Please check the input format." };
    }
}

export async function updatePlayer(playerID: number, newPlayerData: Record<string, string | number | boolean>) {
    const supabase = await createClient();
    console.log("Attempting to update player with ID", playerID);
  
    // Parse the player data
    const parsedData = parsePlayer(newPlayerData);
  
    // Check for parsing errors
    if ("error" in parsedData) {
      console.error(parsedData.error);
      return { error: parsedData.error };
    }

    console.log("Formatted Player:", parsedData);
  
    const { error } = await supabase
      .from("players")
      .update(parsedData)
      .eq("id", playerID);
  
    if (error) {
      console.error("Error updating player:", error);
      return { error };
    }
  
    console.log("Successfully Updated Player");
    return { success: true };
  }

// REQUIRES TEAM_ID
export async function addPersonToDatabase(formData: Record<string, string | number | boolean>, role: string, team_id: number) {
    const supabase = await createClient();
    console.log("Attempting to create a new player");
    // Parse the player data
    const parsedData = parsePlayer(formData);
    // Check for parsing errors
    if ("error" in parsedData) {
      console.error(parsedData.error);
      return { error: parsedData.error };
    }
    
    // label with team_id
    parsedData.team_id = team_id
    
    console.log("Formatted Player Data:", parsedData);

    // Label as "player", "chaperone", "coach" for the database
    if (["chaperone", "player", "coach"].includes(role)){
        parsedData.role = role
    } else {
        return { error: "Internal error: passed-in role nonexistent"}
    }
    
    const { error } = await supabase.from("players").insert(parsedData);
  
    if (error) {
      console.error("Error creating player:", error);
      return { error };
    }
  
    console.log("Successfully created a new player");
    return { success: true };
}



function parseTeam(
    teamData: Record<string, string | number | boolean>
    ): Record<string, string | number> | { error: string } {
    try {
        return {
        name: teamData.name as string,
        name_abbreviation: teamData.name_abbreviation as string,
        city: teamData.city as string,
        state: teamData.state as string,
        country: teamData.country as string,
        coordinator_first_name: teamData.coordinator_first_name as string,
        coordinator_last_name: teamData.coordinator_last_name as string,
        coordinator_email: teamData.coordinator_email as string,
        coordinator_phone: teamData.coordinator_phone as string,
        };
    } catch (error) {
        console.error("Error parsing team data:", error);
        return { error: "Failed to parse team data. Please check the input format." };
    }
}

export async function addTeamToDatabase(teamData: Record<string, string | number | boolean>) {
    const supabase = await createClient();
    console.log("Attempting to create a new team");
  
    // Parse the team data
    const parsedData = parseTeam(teamData);
  
    // Check for parsing errors
    if ("error" in parsedData) {
      console.error(parsedData.error);
      return { error: parsedData.error };
    }
  
    console.log("Formatted Team Data:", parsedData);
  
    // Insert the team into the database
    const { data, error } = await supabase.from("teams").insert(parsedData).select("id");
  
    if (error) {
      console.error("Error creating team:", error);
      return { error };
    }
  
    console.log("Successfully created a new team", data);
    return { success: true, id: data[0].id };
}


// {
//   name: formData.teamInfo[0],
//   name_abbreviation: formData.teamInfo[1],
//   city: formData.teamInfo[2],
//   state: formData.teamInfo[3],
//   country: formData.teamInfo[4],
//   coordinator_first_name: formData.teamInfo[5],
//   coordinator_last_name: formData.teamInfo[6],
//   coordinator_email: formData.teamInfo[7],
//   coordinator_phone: formData.teamInfo[8],
// }, 

