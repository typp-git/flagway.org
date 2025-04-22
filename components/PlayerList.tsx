import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@headlessui/react";
import { EditPlayerModal } from "./EditPlayerModal";
import { Player, Chaperone, Coach } from "@/data/teams";
import { BsThreeDots } from "react-icons/bs";


export default function PlayerList({ id }: {id: number}) {
  const supabase = createClient()
  const [players, setPlayers] = useState<Player[]>([])

  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [showModal, setShowModal] = useState(false);

  function editPlayer(player) {
    setSelectedPlayer(player);
    if(selectedPlayer != null){
      setShowModal(true);
    }
  }

  function handleModalClose(){
    setShowModal(false);
  }

  useEffect(() => {
    async function fetchFromTable() {
      const { data, error } = await supabase.from('players').select().eq('team_id', id);
      if (error) {
        console.error('Error fetching teams:', error);
      } else {
        setPlayers(data);
      }
      console.log("playerfetcheddate", data)
    }
    fetchFromTable()
  }, [id])
  
  return (
    <div className="flex flex-col overflow-y-scroll">
      {(players.length > 0)? 
      
        players.map((player) => {
        return (
          <div className="flex justify-between items-center bg-gray-300 rounded-lg my-1 p-2" key={player.id}>
            {showModal? <EditPlayerModal playerData={selectedPlayer} onClose={handleModalClose}/>: <div></div>}
            <div className="flex flex-row items-center space-x-4 text-base">
              <span>
                <strong>{player.last_name}, {player.first_name}</strong>
              </span>
              <span className="text-gray-700">Grade: {player.grade}</span>
            </div>
            <Button
              onClick={() => editPlayer(player)}
              className="w-10 h-10 flex items-center justify-center text-black border-2 border-black rounded-full hover:bg-gray-400"
            >
              <BsThreeDots size={20} />
            </Button>
          </div>
          
        )
      }): 
        <div>No Players Found</div>
      }
    {/* <Button className="bg-[#427c41] hover:bg-[#59a957] rounded-lg text-white font-bold">+ Add</Button> */}
    </div>
  );
}
