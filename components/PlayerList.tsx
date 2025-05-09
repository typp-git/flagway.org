import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@headlessui/react";
import { EditPlayerModal } from "./EditPlayerModal";
import { Player } from "@/data/teams";
import { FaEdit, FaCheck } from "react-icons/fa";

function DeleteConfirmationModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  selectedCount 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  onConfirm: () => void;
  selectedCount: number;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
        <p className="mb-4">
          Are you sure you want to delete {selectedCount} player{selectedCount !== 1 ? 's' : ''}? 
          This action is irreversible and will permanently remove the player{selectedCount !== 1 ? 's' : ''} from the system.
        </p>
        <div className="flex justify-end gap-2">
          <Button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function PlayerList({ id }: {id: number}) {
  const supabase = createClient()
  const [players, setPlayers] = useState<Player[]>([])
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPlayers, setSelectedPlayers] = useState<number[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [showModal, setShowModal] = useState(false);

  const fetchPlayers = useCallback(async () => {
    setIsLoading(true);
    const { data, error } = await supabase.from('players').select().eq('team_id', id);
    if (error) {
      console.error('Error fetching teams:', error);
    } else {
      setPlayers(data || []);
    }
    setIsLoading(false);
  }, [id, supabase]);

  function editPlayer(player: Player) {
    setSelectedPlayer(player);
    setShowModal(true);
  }

  async function handleModalClose(){
    setShowModal(false);
    await fetchPlayers();
  }

  const handleBulkSelect = (playerId: number) => {
    setSelectedPlayers(prev => 
      prev.includes(playerId) 
        ? prev.filter(id => id !== playerId)
        : [...prev, playerId]
    );
  };

  const handleBulkDelete = async () => {
    console.log('Selected players to delete:', selectedPlayers);
    if (selectedPlayers.length === 0) return;
    
    // Add more detailed error logging
    const { data, error } = await supabase
      .from('players')
      .delete()
      .in('id', selectedPlayers);
    
    if (error) {
      console.error('Error deleting players:', error);
      console.error('Error details:', error.details);
      console.error('Error hint:', error.hint);
      console.error('Error message:', error.message);
    } else {
      console.log('Successfully deleted players:', data);
      setSelectedPlayers([]);
      await fetchPlayers();
    }
    setShowDeleteModal(false);
  };

  const handleBulkVerify = async () => {
    if (selectedPlayers.length === 0) return;
    
    const { error } = await supabase
      .from('players')
      .update({ verified: true })
      .in('id', selectedPlayers);
    
    if (error) {
      console.error('Error verifying players:', error);
    } else {
      setSelectedPlayers([]);
      await fetchPlayers();
    }
  };

  const handleVerifyPlayer = async (playerId: number) => {
    const { error } = await supabase
      .from('players')
      .update({ verified: true })
      .eq('id', playerId);
    
    if (error) {
      console.error('Error verifying player:', error);
    } else {
      await fetchPlayers();
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, [id, supabase, fetchPlayers]);

  const verifiedPlayers = players.filter(player => player.verified);
  const unverifiedPlayers = players.filter(player => !player.verified);
  
  return (
    <div className="flex flex-col gap-4">
      {/* Unverified Players Section */}
      <div className="flex flex-col">
        <h2 className="text-lg font-bold mb-2">Unverified Players</h2>
        <div className="flex gap-2 mb-2 justify-end">
          <Button
            onClick={handleBulkVerify}
            disabled={selectedPlayers.length === 0}
            className={`px-4 py-2 rounded-lg ${
              selectedPlayers.length === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            Approve Selected ({selectedPlayers.length})
          </Button>
          <Button
            onClick={() => setShowDeleteModal(true)}
            disabled={selectedPlayers.length === 0}
            className={`px-4 py-2 rounded-lg ${
              selectedPlayers.length === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-red-500 hover:bg-red-600 text-white'
            }`}
          >
            Delete Selected ({selectedPlayers.length})
          </Button>
        </div>
        <div className="flex flex-col overflow-y-scroll">
          {isLoading ? (
            <div className="flex justify-center items-center py-4">
              <div className="w-12 h-12 border-4 border-green-700 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : unverifiedPlayers.length > 0 ? 
            unverifiedPlayers.map((player) => (
              <div key={player.id} className="grid grid-cols-1 sm:grid-cols-[auto_2fr_2fr_1fr_auto] items-center bg-gray-100 rounded-lg pl-3 my-1 p-2">
                <input
                  type="checkbox"
                  checked={selectedPlayers.includes(player.id || 0)}
                  onChange={() => handleBulkSelect(player.id || 0)}
                  className="mr-2"
                />
                <span className="font-display">
                  {player.last_name}, {player.first_name}
                </span>
                <div className="grid grid-cols-3 sm:contents gap-2 mt-1 sm:mt-0">
                  <span className="text-gray-700">Grade: {player.grade}</span>
                  <Button
                    onClick={() => player.id && handleVerifyPlayer(player.id)}
                    className="w-8 h-8 flex items-center justify-center text-green-600 hover:cursor-pointer rounded-full hover:bg-gray-300"
                  >
                    <FaCheck size={13} />
                  </Button>
                  <Button
                    onClick={() => editPlayer(player)}
                    className="w-8 h-8 flex items-center justify-center text-gray-600 hover:cursor-pointer rounded-full hover:bg-gray-300"
                  >
                    <FaEdit size={13} />
                  </Button>
                </div>
              </div>
            )) : 
            <div>No Unverified Players Found</div>
          }
        </div>
      </div>

      {/* Verified Players Section */}
      <div className="flex flex-col">
        <h2 className="text-lg font-bold mb-2">Verified Players</h2>
        <div className="flex flex-col overflow-y-scroll">
          {verifiedPlayers.length > 0 ? 
            verifiedPlayers.map((player) => (
              <div key={player.id} className="grid grid-cols-1 sm:grid-cols-[2fr_2fr_1fr_auto] items-center bg-gray-100 rounded-lg pl-3 my-1 p-2">
                <span className="font-display">
                  {player.last_name}, {player.first_name}
                </span>
                <div className="grid grid-cols-3 sm:contents gap-2 mt-1 sm:mt-0">
                  <span className="text-gray-700">Grade: {player.grade}</span>
                  <span className="text-green-600">Verified</span>
                  <Button
                    onClick={() => editPlayer(player)}
                    className="w-8 h-8 flex items-center justify-center text-gray-600 hover:cursor-pointer rounded-full hover:bg-gray-300"
                  >
                    <FaEdit size={13} />
                  </Button>
                </div>
              </div>
            )) : 
            <div>No Verified Players Found</div>
          }
        </div>
      </div>

      {showModal && selectedPlayer && <EditPlayerModal playerData={selectedPlayer} onClose={handleModalClose}/>}
      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleBulkDelete}
        selectedCount={selectedPlayers.length}
      />
    </div>
  );
}
