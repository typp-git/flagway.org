import { Player } from "@/data/teams"
import { createClient } from "@/utils/supabase/client";

export async function updatePlayer(playerID: number, newPlayerData:  Omit<Player, "id" | "created_at" | "team_id">){
    const supabase = await createClient();
    console.log("attempting to update player with ID", playerID)

    const dataToChange = {
      first_name: newPlayerData.first_name,
      last_name: newPlayerData.last_name,
      tshirt_size: newPlayerData.tshirt_size, 
      dietary_restrictions: newPlayerData.dietary_restrictions, 
      emergency_contact_name: newPlayerData.emergency_contact_name, 
      emergency_contact_phone_number: newPlayerData.emergency_contact_phone_number,
      emergency_contact_relationship: newPlayerData.emergency_contact_relationship,
      grade: Number(newPlayerData.grade),
      // team_id: number,
      verified: Boolean(newPlayerData.verified)
    }

    console.log("Verification value in updatePlayer:", {
      input: newPlayerData.verified,
      converted: Boolean(newPlayerData.verified),
      final: dataToChange.verified
    });
    
    console.log("Formatted Player:", dataToChange)
    
    const { error } = await supabase
      .from('players')
      .update(dataToChange)
      .eq('id', playerID)
      if (error) {
        return { error };
      }
    
    console.log("Successfully Updated Player");
    return { success: true };
}
 

// REQUIRES TEAM_ID
export async function addPlayer(newPlayerData:  Omit<Player, "id" | "created_at">){
    const supabase = await createClient();

    console.log("attempting to add player")

    const dataToChange = {
      first_name: newPlayerData.first_name,
      last_name: newPlayerData.last_name,
      role: "player",
      tshirt_size: newPlayerData.tshirt_size, 
      dietary_restrictions: newPlayerData.dietary_restrictions, 
      emergency_contact_name: newPlayerData.emergency_contact_name, 
      emergency_contact_phone_number: newPlayerData.emergency_contact_phone_number,
      emergency_contact_relationship: newPlayerData.emergency_contact_relationship,
      grade: Number(newPlayerData.grade),
      team_id: Number(newPlayerData.team_id),
      verified: Boolean(newPlayerData.verified)
    }

    console.log("Formatted Player:", dataToChange)
    
    const { error } = await supabase
      .from('players')
      .insert(dataToChange)
      if (error) {
        return { error };
      }
    
    console.log("Successfully Updated Player");
    return { success: true };
}

