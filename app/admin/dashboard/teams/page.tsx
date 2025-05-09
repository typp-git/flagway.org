'use client'
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client'
import { Button } from '@headlessui/react';
import PlayerList from '@/components/PlayerList';
import Container from '@/components/container';
import { Team } from '@/data/teams';
import { FaEdit } from 'react-icons/fa';
import { EditTeamModal } from '@/components/EditTeamModal';

export default function TeamsDashboard() {
  const supabase = createClient()
  const [teams, setTeams] = useState<Team[]>([])
  const [selectedTeam, setSelectedTeam] = useState<Team>()
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

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
  }, [supabase, teams])

  const handleTeamSelection = function(team: Team) { 
    setSelectedTeam(team)
  }

  const handleEditClick = () => {
    setIsEditModalOpen(true)
  }

  const handleEditClose = async () => {
    setIsEditModalOpen(false)
    // Fetch updated team data
    const { data, error } = await supabase.from('teams').select().eq('id', selectedTeam?.id).single();
    if (error) {
      console.error('Error fetching updated team:', error);
    } else {
      // Update the selected team
      setSelectedTeam(data);
      // Update the team in the teams list
      setTeams(teams.map(team => team.id === data.id ? data : team));
    }
  }

  return (
    <Container className="flex flex-col gap-8 pb-10">
      <h1 className="text-3xl font-bold">Teams Dashboard</h1>
      <div className="flex flex-row">
        <div className="flex flex-col min-h-130 bg-gray-200 rounded-lg p-2 mr-5">
        {teams.map((team, index) => (
          <div key={index} className={`rounded-lg font-display flex flex-row hover:bg-gray-50 mb-2 mr-1.5 h-12 overflow-hidden ${(selectedTeam && selectedTeam.id == team.id)? 'bg-gray-50':'bg-gray-100 '}`}>
            <div className={`w-1.5 mr-1 rounded-l-lg ${(selectedTeam && selectedTeam.id == team.id)? 'bg-amber-400':'bg-gray-100'}`}></div>
            <Button key={index} className="w-full h-full text-left" onClick={(ev) => {ev.preventDefault(); handleTeamSelection(team)}}>
            {team.name}
          </Button>
          </div>
        ))}
        </div>
        <div className="flex flex-col w-full bg-gray-200 rounded-lg p-8">
        {(teams.length > 0 && selectedTeam != undefined)?
          <div>
            <div className="flex flex-col justify-between md:flex-row rounded-lg bg-gray-100 p-4 mb-8">
              <div className="flex justify-between items-start w-full">
                <div className="w-full">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">{selectedTeam.name}</h2>
                    <Button className="text-gray-600 hover:text-gray-800 transition-colors" onClick={handleEditClick}>
                      <FaEdit className="w-5 h-5" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
                    <div>
                      <div className="font-bold font-display text-gray-600">City</div>
                      <div className="text-gray-800">{selectedTeam.city}</div>
                    </div>
                    <div>
                      <div className="font-bold font-display text-gray-600">State</div>
                      <div className="text-gray-800">{selectedTeam.state}</div>
                    </div>
                    <div>
                      <div className="font-bold font-display text-gray-600">Country</div>
                      <div className="text-gray-800">{selectedTeam.country}</div>
                    </div>
                    <div>
                      <div className="font-bold font-display text-gray-600">Coordinator</div>
                      <div className="text-gray-800">{selectedTeam.coordinator_first_name} {selectedTeam.coordinator_last_name}</div>
                    </div>
                    <div>
                      <div className="font-bold font-display text-gray-600">Phone Number</div>
                      <div className="text-gray-800">{selectedTeam.coordinator_phone}</div>
                    </div>
                    <div>
                      <div className="font-bold font-display text-gray-600">Email</div>
                      <div className="text-gray-800">{selectedTeam.coordinator_email}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-2">
              <div className="font-bold font-display ml-2 text-lg rounded-lg">Player List</div>
              <PlayerList id={selectedTeam.id}>              
              </PlayerList>
            </div>
          </div>
          : 
          <></>
          }
        </div>
      </div>
      {isEditModalOpen && selectedTeam && (
        <EditTeamModal teamData={selectedTeam} onClose={handleEditClose} />
      )}
    </Container>
  );
}