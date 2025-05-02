import { useEffect, useState } from "react";
import { Button } from "@headlessui/react";
import { FormEvent } from 'react'
import { Player } from "@/data/teams";
import { EditField } from "./EditField";
import { updatePlayer } from "@/utils/supabase/database_functions";

export function EditPlayerModal({ playerData, onClose }: {playerData: Player, onClose:()=>void}) {
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  async function submitData(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const blankPlayer = {}

    console.log("Form data entries:");
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    // First, copy all non-verified fields
    formData.forEach(function(value, key){     
      if (key !== "verified") {
        blankPlayer[key] = value;
      }
    });

    // Then handle the verified checkbox separately
    // Get the actual checkbox element to check its checked state
    const verifiedCheckbox = event.currentTarget.querySelector('input[name="verified"]') as HTMLInputElement;
    blankPlayer["verified"] = verifiedCheckbox ? verifiedCheckbox.checked : false;
    
    console.log("Verification checkbox value:", {
      checked: verifiedCheckbox?.checked,
      final: blankPlayer["verified"]
    });

    console.log("Submitting player data:", blankPlayer);
    const result = await updatePlayer(playerData.id, blankPlayer)
    
    if (result && result.error) {
      console.error("Error While Submitting Data", result.error);
      return;
    }
  
    setHasUnsavedChanges(false);
    onClose(); // ✅ Only close on success
  }

  useEffect(() => {
    // refresh when editedPlayer changes
  }, [playerData])
  
  return (
  <div className="fixed inset-0 flex flex-col justify-center items-center bg-gray-800/50 z-50">
    
    <div className="bg-white rounded-lg py-4 px-6 max-w-3xl w-full mx-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-display font-bold">Edit Player</h3>
        {hasUnsavedChanges && (
          <span className="text-sm text-yellow-600">Unsaved changes</span>
        )}
      </div>
      <form onSubmit={submitData} id="player-form">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <EditField 
            label="First Name" 
            name="first_name" 
            defaultValue={playerData.first_name} 
            type="text" 
            form_id="player-form" 
            onChange={() => setHasUnsavedChanges(true)}
          />
          <EditField
            label="Last Name"
            name="last_name" 
            defaultValue={playerData.last_name}
            type="text"
            form_id="player-form"
            onChange={() => setHasUnsavedChanges(true)}
          />
          <EditField
            label="T-shirt Size"
            name="tshirt_size" 
            defaultValue={playerData.tshirt_size ?? ""}
            type="text"
            form_id="player-form"
            onChange={() => setHasUnsavedChanges(true)}
          />
          <EditField
            label="Dietary Restrictions"
            name="dietary_restrictions" 
            defaultValue={playerData.dietary_restrictions ?? ""}
            type="text"
            form_id="player-form"
            onChange={() => setHasUnsavedChanges(true)}
          />
          <EditField
            label="Emergency Contact Name"
            name="emergency_contact_name" 
            defaultValue={playerData.emergency_contact_name ?? ""}
            type="text"
            form_id="player-form"
            onChange={() => setHasUnsavedChanges(true)}
          />
          <EditField
            label="Emergency Contact Phone"
            name="emergency_contact_phone_number" 
            defaultValue={playerData.emergency_contact_phone_number ?? ""}
            type="text"
            form_id="player-form"
            onChange={() => setHasUnsavedChanges(true)}
          />
          <EditField 
            label="Emergency Contact Relationship" 
            name="emergency_contact_relationship" 
            defaultValue={playerData.emergency_contact_relationship ?? ""} 
            type="text" 
            form_id="player-form" 
            onChange={() => setHasUnsavedChanges(true)}
          />
          <EditField 
            label="Grade" 
            name="grade" 
            defaultValue={playerData.grade} 
            type="number" 
            form_id="player-form" 
            onChange={() => setHasUnsavedChanges(true)}
          />
        </div>

        <div className="mt-4">
          <label className="flex items-center">
            <input 
              name="verified" 
              type="checkbox" 
              form_id="player-form" 
              defaultChecked={playerData.verified} 
              className="mr-3"
              onChange={() => setHasUnsavedChanges(true)}
            />
            Verified
          </label>
        </div>

        <div className="mt-6 flex justify-end">
          <Button 
            type="submit" 
            form="player-form" 
            className={`rounded-xl text-white font-bold mr-4 py-2 px-4 ${
              hasUnsavedChanges 
                ? 'bg-[#427c41] hover:bg-[#59a957]' 
                : 'bg-gray-400 cursor-not-allowed'
            }`}
            disabled={!hasUnsavedChanges}
          >
            Save
          </Button>
          <Button 
            onClick={onClose} 
            className="bg-gray-500 hover:bg-gray-400 rounded-xl text-white font-bold py-2 px-4"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>

  </div>
  );
}
