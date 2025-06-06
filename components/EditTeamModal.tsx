'use client'
import { useState, useEffect, FormEvent } from 'react';
import { Button } from '@headlessui/react';
import { updateTeam } from '@/utils/supabase/database_functions';
import { Team, TeamForm } from '@/data/teams';
import { EditField } from './EditField';

const STRING_FIELDS = [
  'name',
  'country',
  'coordinator_first_name',
  'coordinator_last_name',
  'coordinator_email',
  'coordinator_phone',
  'name_abbreviation',
] as const;

type TeamStringFields = typeof STRING_FIELDS[number];

export function EditTeamModal({ teamData, onClose }: { teamData: Team, onClose: () => void }) {
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  async function submitData(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    // Build updated team object for TeamForm
    const updatedTeam: Partial<TeamForm> = {
      name: formData.get("name") as string,
      country: formData.get("country") as string,
      coordinator_first_name: formData.get("coordinator_first_name") as string,
      coordinator_last_name: formData.get("coordinator_last_name") as string,
      coordinator_email: formData.get("coordinator_email") as string,
      coordinator_phone: formData.get("coordinator_phone") as string,
      name_abbreviation: formData.get("name_abbreviation") as string,
      // If you have state_id or special_accommodations, add them here
    };

    // Convert empty strings to null for nullable fields
    Object.keys(updatedTeam).forEach((key) => {
      if (updatedTeam[key as keyof TeamForm] === "") {
        updatedTeam[key as keyof TeamForm] = undefined;
      }
    });

    if (!teamData.id) {
      console.error("Team ID is missing.");
      return;
    }
    const result = await updateTeam(teamData.id as string, {
      ...teamData,
      ...updatedTeam,
    });

    if (result && result.error) {
      console.error("Error While Submitting Data", result.error);
      return;
    }

    setHasUnsavedChanges(false);
    onClose();
  }

  useEffect(() => {
    setHasUnsavedChanges(false);
  }, [teamData]);

  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center bg-gray-800/50 z-50">
      <div className="bg-white rounded-lg py-4 px-6 max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-display font-bold">Edit Team</h3>
          {hasUnsavedChanges && (
            <span className="text-sm text-yellow-600">Unsaved changes</span>
          )}
        </div>
        <form onSubmit={submitData} id="team-form">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <EditField
              label="Team Name"
              name="name"
              defaultValue={teamData.name || ''}
              type="text"
              form_id="team-form"
              onChange={() => setHasUnsavedChanges(true)}
            />
            <EditField
              label="Country"
              name="country"
              defaultValue={teamData.country || ''}
              type="text"
              form_id="team-form"
              onChange={() => setHasUnsavedChanges(true)}
            />
            <EditField
              label="Coordinator First Name"
              name="coordinator_first_name"
              defaultValue={teamData.coordinator_first_name || ''}
              type="text"
              form_id="team-form"
              onChange={() => setHasUnsavedChanges(true)}
            />
            <EditField
              label="Coordinator Last Name"
              name="coordinator_last_name"
              defaultValue={teamData.coordinator_last_name || ''}
              type="text"
              form_id="team-form"
              onChange={() => setHasUnsavedChanges(true)}
            />
            <EditField
              label="Coordinator Phone"
              name="coordinator_phone"
              defaultValue={teamData.coordinator_phone || ''}
              type="text"
              form_id="team-form"
              onChange={() => setHasUnsavedChanges(true)}
            />
            <EditField
              label="Coordinator Email"
              name="coordinator_email"
              defaultValue={teamData.coordinator_email || ''}
              type="email"
              form_id="team-form"
              onChange={() => setHasUnsavedChanges(true)}
            />
            <EditField
              label="Name Abbreviation"
              name="name_abbreviation"
              defaultValue={teamData.name_abbreviation || ''}
              type="text"
              form_id="team-form"
              onChange={() => setHasUnsavedChanges(true)}
            />
          </div>

          <div className="mt-6 flex justify-end">
            <Button
              type="submit"
              form="team-form"
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