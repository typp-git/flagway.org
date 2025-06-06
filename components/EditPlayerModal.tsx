import { useEffect, useState } from "react";
import { Button } from "@headlessui/react";
import { FormEvent } from "react";
import { Player } from "@/data/teams";
import { EditField } from "./EditField";
import { updatePlayer } from "@/utils/supabase/database_functions";

export function EditPlayerModal({
  playerData,
  onClose,
}: {
  playerData: Player;
  onClose: () => void;
}) {
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  async function submitData(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    // Build updated player object
    const updatedPlayer: Partial<Player> = {
      first_name: formData.get("first_name") as string,
      last_name: formData.get("last_name") as string,
      tshirt_size: formData.get("tshirt_size") as string,
      dietary_restrictions: formData.get("dietary_restrictions") as string,
      emergency_contact_name: formData.get("emergency_contact_name") as string,
      emergency_contact_phone: formData.get("emergency_contact_phone") as string,
      emergency_contact_relationship: formData.get("emergency_contact_relationship") as string,
      grade: Number(formData.get("grade")),
      verified: !!formData.get("verified"),
      city: formData.get("city") as string,
      gender: formData.get("gender") as string,
      photo_consent_given: formData.get("photo_consent_given") === "on",
      previous_tournament_experience: formData.get("previous_tournament_experience") === "on",
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      years_YPP: formData.get("years_YPP") ? Number(formData.get("years_YPP")) : null,
    };

    // Remove empty strings for nullable fields
    Object.keys(updatedPlayer).forEach((key) => {
      if (updatedPlayer[key as keyof Player] === "") {
        updatedPlayer[key as keyof Player] = undefined;
      }
    });

    if (playerData.id) {
      const result = await updatePlayer(playerData.id, {
        ...playerData,
        ...updatedPlayer,
      });

      if (result && result.error) {
        console.error("Error While Submitting Data", result.error);
        return;
      }
    }

    setHasUnsavedChanges(false);
    onClose();
  }

  useEffect(() => {
    // refresh when playerData changes
    setHasUnsavedChanges(false);
  }, [playerData]);

  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center bg-gray-800/50 z-50">
      <div
        className="bg-white rounded-lg py-4 px-6 max-w-3xl w-full mx-4
          max-h-[90vh] overflow-y-auto">
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
              defaultValue={playerData.first_name ?? ""}
              type="text"
              form_id="player-form"
              onChange={() => setHasUnsavedChanges(true)}
            />
            <EditField
              label="Last Name"
              name="last_name"
              defaultValue={playerData.last_name ?? ""}
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
              name="emergency_contact_phone"
              defaultValue={playerData.emergency_contact_phone ?? ""}
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
              defaultValue={playerData.grade ?? 0}
              type="number"
              form_id="player-form"
              onChange={() => setHasUnsavedChanges(true)}
            />
            <EditField
              label="City"
              name="city"
              defaultValue={playerData.city ?? ""}
              type="text"
              form_id="player-form"
              onChange={() => setHasUnsavedChanges(true)}
            />
            <EditField
              label="Gender"
              name="gender"
              defaultValue={playerData.gender ?? ""}
              type="text"
              form_id="player-form"
              onChange={() => setHasUnsavedChanges(true)}
            />
            <EditField
              label="Email"
              name="email"
              defaultValue={playerData.email ?? ""}
              type="email"
              form_id="player-form"
              onChange={() => setHasUnsavedChanges(true)}
            />
            <EditField
              label="Phone"
              name="phone"
              defaultValue={playerData.phone ?? ""}
              type="tel"
              form_id="player-form"
              onChange={() => setHasUnsavedChanges(true)}
            />
            <EditField
              label="Years at YPP"
              name="years_YPP"
              defaultValue={playerData.years_YPP ?? ""}
              type="number"
              form_id="player-form"
              onChange={() => setHasUnsavedChanges(true)}
            />
          </div>

          <div className="mt-4 flex flex-col gap-2">
            <label className="flex items-center">
              <input
                name="verified"
                type="checkbox"
                defaultChecked={playerData.verified}
                className="mr-3"
                onChange={() => setHasUnsavedChanges(true)}
              />
              Verified
            </label>
            <label className="flex items-center">
              <input
                name="photo_consent_given"
                type="checkbox"
                defaultChecked={playerData.photo_consent_given}
                className="mr-3"
                onChange={() => setHasUnsavedChanges(true)}
              />
              Photo Consent Given
            </label>
            <label className="flex items-center">
              <input
                name="previous_tournament_experience"
                type="checkbox"
                defaultChecked={playerData.previous_tournament_experience}
                className="mr-3"
                onChange={() => setHasUnsavedChanges(true)}
              />
              Previous Tournament Experience
            </label>
          </div>

          <div className="mt-6 flex justify-end">
            <Button
              type="submit"
              form="player-form"
              className={`rounded-xl text-white font-bold mr-4 py-2 px-4 ${
                hasUnsavedChanges
                  ? "bg-[#427c41] hover:bg-[#59a957]"
                  : "bg-gray-400 cursor-not-allowed"
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