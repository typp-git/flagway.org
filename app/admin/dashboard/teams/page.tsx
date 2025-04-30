'use client'
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client'
import { Button } from '@headlessui/react';
import PlayerList from '@/components/PlayerList';
import Container from '@/components/container';
import { Team, Coach, Player } from '@/data/teams';

export default function TeamsDashboard() {
  const supabase = createClient()
  const [teams, setTeams] = useState<Team[]>([])
  const [selectedTeam, setSelectedTeam] = useState<Team>()

  useEffect(() => {
    async function fetchTeams() {
      const { data, error } = await supabase.from('teams').select();
      if (error) {
        console.error('Error fetching teams:', error);
      } else {
        setTeams(data);
      }
      console.log(data)
    }
    fetchTeams();
    setSelectedTeam((teams.length > 0)? teams[0]: undefined)
  }, [])

  const handleTeamSelection = function(team: Team) { 
    setSelectedTeam(team)
  }

  const editTeam = function(ev) {
  }

  console.log("value outside useEffect", teams)
  return (
    <Container className="flex flex-col gap-8 pb-10">
      <h1 className="text-3xl font-bold">Teams Dashboard</h1>
      <p className="text-gray-600">
        Manage your teams here. You can create, edit, and delete teams.
      </p>
      <div className="flex flex-row">
        <div className="flex flex-col min-h-130 bg-gray-300 rounded-lg p-2 mr-5">
        {teams.map((team, index) => (
          <div className={`flex flex-row hover:bg-gray-100 mb-2 mr-1.5 h-12 overflow-hidden ${(selectedTeam && selectedTeam.id == team.id)? 'bg-gray-100':'bg-gray-200 '}`}>
            <div className={`w-1.5 mr-1 ${(selectedTeam && selectedTeam.id == team.id)? 'bg-amber-400':'bg-gray-300'}`}></div>
            <Button key={index} className="w-full h-full text-left font-bold" onClick={(ev) => {ev.preventDefault(); handleTeamSelection(team)}}>
            {team.name}
          </Button>
          </div>

        ))}
          {/* <Button className="bg-[#427c41] hover:bg-[#59a957] rounded-lg text-white font-bold">+ Add Team</Button> */}

        </div>
        <div className="flex flex-col w-full bg-gray-300 rounded-lg p-8">
        {(teams.length > 0 && selectedTeam != undefined)?
          <div>
            <div className="flex flex-col justify-between md:flex-row bg-gray-300 p-4 mb-8">
              
              <div>
                <div className="flex flex-row mb-2">
                  {/* <div className="font-bold text-lg">Edit {selectedTeam.name} Metadata</div> */}
                  <Button className="ml-5 bg-white border-2 px-1 py-0.5 rounded-sm border-black">EDIT</Button>
                </div>
                <div className="font-bold">State ID</div>
                <div>{selectedTeam.state_id}</div>
                <div className="font-bold">Country</div>
                <div>{selectedTeam.country}</div>
              </div>

              <div className="w-80">
                <div className="font-bold">Coordinator</div>
                <div>{selectedTeam.coordinator_last_name}, {selectedTeam.coordinator_first_name}</div>
                <div className="font-bold">Phone Number</div>
                <div>{selectedTeam.coordinator_phone}</div>
                <div className="font-bold">Email</div>
                <div>{selectedTeam.coordinator_email}</div>
              </div>
              
            </div>

            <div className="bg-gray-200 rounded-lg p-2">
              <div className="font-bold text-lg rounded-lg">Player List</div>
              <PlayerList id={selectedTeam.id}>              
              </PlayerList>
            </div>

          </div>
          : 
          <></>
          }
        </div>
      </div>

    </Container>
  );
}