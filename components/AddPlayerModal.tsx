import { useEffect } from "react";
import { Button } from "@headlessui/react";
import { FormEvent } from 'react'
import { Player } from "@/data/teams";
import { EditField } from "./EditField";
import { updatePlayer } from "@/utils/supabase/database_functions";
import { emptyPlayerForm } from "@/data/teams";
const blankPlayer = {... emptyPlayerForm}

export function AddPlayerModal({ playerData = blankPlayer, onClose }: {playerData: Player, onClose:()=>void}) {
  async function submitData(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const updatedPlayer = { ...blankPlayer };

    formData.forEach((value, key) => {     
      if (key === "verified") {
        updatedPlayer.verified = formData.has("verified");
      } else if (key === "grade") {
        updatedPlayer.grade = Number(value);
      } else if (key === "team_id") {
        updatedPlayer.team_id = Number(value);
      } else if (key === "yearsYPP") {
        updatedPlayer.yearsYPP = Number(value);
      } else if (key === "first_name" || key === "last_name" || key === "name" || key === "city") {
        updatedPlayer[key] = value as string;
      } else if (key === "tshirt_size" || key === "dietary_restrictions" || 
                 key === "emergency_contact_name" || key === "emergency_contact_phone_number" || 
                 key === "emergency_contact_relationship") {
        updatedPlayer[key] = value as string | null;
      }
    });

    console.log("final object:", updatedPlayer)
    if (!playerData.id) {
      console.error("Cannot update player: No ID provided");
      return;
    }
    const result = await updatePlayer(playerData.id, updatedPlayer)
    
    if (result && result.error) {
      console.error("Error While Submitting Data", result.error);
      return;
    }
  
    onClose(); // Only close on success
  }

  useEffect(() => {
    // refresh when editedPlayer changes
  }, [playerData])
  
  return (
  <div className="fixed inset-0 flex flex-col justify-center items-center bg-gray-900/50 z-50">
    
    <div className="bg-white py-4 px-6">
      <form onSubmit={submitData} id="player-form">
        <div>
          <EditField label="First Name" name="first_name" required={true} defaultValue={playerData.first_name ?? ""} type="text" form_id="player-form" onChange={(val)=>{console.log("val", val)}}/>
          <EditField
            label="Last Name"
            name="last_name" 
            required={true}
            defaultValue={playerData.last_name ?? ""}
            type="text"
            form_id="player-form"
            onChange={(val)=>{console.log("val", val)}}
          />
          <EditField
            label="T-shirt Size"
            name="tshirt_size" 
            defaultValue={playerData.tshirt_size ?? ""}
            type="text"
            form_id="player-form"
            onChange={(val)=>{console.log("val", val)}}
          />
          <EditField
            label="Dietary Restrictions"
            name="dietary_restrictions" 
            defaultValue={playerData.dietary_restrictions ?? ""}
            type="text"
            form_id="player-form"
            onChange={(val)=>{console.log("val", val)}}
          />
          <EditField
            label="Emergency Contact Name"
            name="emergency_contact_name" 
            defaultValue={playerData.emergency_contact_name ?? ""}
            type="text"
            form_id="player-form"
            onChange={(val)=>{console.log("val", val)}}
          />
          <EditField
            label="Emergency Contact Phone"
            name="emergency_contact_phone_number" 
            defaultValue={playerData.emergency_contact_phone ?? ""}
            type="text"
            form_id="player-form"
            onChange={(val)=>{console.log("val", val)}}
          />
          <EditField label="Emergency Contact Relationship" name="emergency_contact_relationship" defaultValue={playerData.emergency_contact_relationship ?? ""} type="text" form_id="player-form" onChange={(val)=>{console.log("val", val)}}/>
          <EditField label="Grade" name="grade" defaultValue={playerData.grade ?? 0} type="number" form_id="player-form" onChange={(val)=>{console.log("val", val)}}/>

        <div>
          <label>
            <input name="verified" type="checkbox" form="player-form" defaultChecked={playerData.verified}/>
            Verified
          </label>
        </div>

        </div>
        <Button type="submit" form="player-form" className="bg-[#427c41] hover:bg-[#59a957] rounded-xl text-white font-bold mr-4 mt-4 py-2 px-4">Save</Button>
        <Button onClick={onClose} className="bg-gray-500 hover:bg-gray-400 rounded-xl text-white font-bold py-2 px-4">Cancel</Button>
      </form>
    </div>

  </div>
  );
}
