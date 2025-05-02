import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@headlessui/react";
import { EditPlayerModal } from "./EditPlayerModal";
import { Player } from "@/data/teams";
import { FaEdit } from "react-icons/fa";

export default function PlayerList({ id }: {id: number}) {
  const supabase = createClient()
  const [players, setPlayers] = useState<Player[]>([])
  const [isLoading, setIsLoading] = useState(true);

  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchPlayers = useCallback(async () => {
    setIsLoading(true);
    const { data, error } = await supabase.from('players').select().eq('team_id', id);
    if (error) {
      console.error('Error fetching teams:', error);
    } else {
      setPlayers(data);
    }
    setIsLoading(false);
  }, [id, supabase]);

  function editPlayer(player) {
    setSelectedPlayer(player);
    setShowModal(true);
  }

  async function handleModalClose(){
    setShowModal(false);
    await fetchPlayers();
  }

  useEffect(() => {
    fetchPlayers();
  }, [id, supabase, fetchPlayers])
  
  return (
    <div className="flex flex-col overflow-y-scroll">
      {isLoading ? (
        <div className="flex justify-center items-center py-4">
          <div className="w-12 h-12 border-4 border-green-700 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (players.length > 0) ? 
        players.map((player) => {
          return (<div key={player.id}> 
            {showModal? <EditPlayerModal playerData={selectedPlayer} onClose={handleModalClose}/>: <div></div>}
            <div className={`grid grid-cols-1 sm:grid-cols-[2fr_2fr_1fr_auto] items-center bg-gray-100 rounded-lg pl-3 my-1 p-2 ${isLoading ? 'opacity-50' : ''}`}>
              <span className="font-display">
                {player.last_name}, {player.first_name}
              </span>
              <div className="grid grid-cols-3 sm:contents gap-2 mt-1 sm:mt-0">
                <span className="text-gray-700">Grade: {player.grade}</span>
                <span className="text-gray-700">{player.verified ? "Verified" : "Needs verification"}</span>
                <Button
                  onClick={() => editPlayer(player)}
                  className="w-8 h-8 flex items-center justify-center text-gray-600 hover:cursor-pointer rounded-full hover:bg-gray-300 justify-self-end"
                >
                  <FaEdit size={13} />
                </Button>
              </div>
            </div>
          </div>
          )
        }): 
        <div>No Players Found</div>
      }
    {/* <Button className="bg-[#427c41] hover:bg-[#59a957] rounded-lg text-white font-bold">+ Add</Button> */}
    </div>
  );
}
