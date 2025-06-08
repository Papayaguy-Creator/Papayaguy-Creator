import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  ShoppingCart, 
  Users, 
  Trophy, 
  Star,
  Plus,
  Minus,
  X,
  Crown,
  Heart,
  Zap
} from 'lucide-react';
import { GameCard, mockPlayer, mockCards } from './components';

// Mock Data for additional screens
const mockDecks = [
  { id: 1, name: "Main Deck", cards: [1, 2, 3, 4, 5, 6, 7, 8], active: true },
  { id: 2, name: "Giant Deck", cards: [6, 7, 8, 9, 1, 2, 3, 4], active: false },
  { id: 3, name: "Spell Deck", cards: [5, 8, 10, 11, 2, 3, 4, 6], active: false }
];

const mockShopItems = [
  {
    id: 1,
    type: "card",
    name: "Barbarians",
    count: 250,
    cost: 2000,
    currency: "gold",
    rarity: "Common",
    image: "https://images.pexels.com/photos/14468417/pexels-photo-14468417.jpeg"
  },
  {
    id: 2,
    type: "card", 
    name: "Princess",
    count: 1,
    cost: 40000,
    currency: "gold",
    rarity: "Legendary",
    image: "https://images.unsplash.com/photo-1524373050940-8f19e9b858a9"
  },
  {
    id: 3,
    type: "chest",
    name: "Magical Chest",
    cost: 500,
    currency: "gems",
    image: "https://images.pexels.com/photos/366791/pexels-photo-366791.jpeg"
  },
  {
    id: 4,
    type: "chest",
    name: "Super Magical Chest", 
    cost: 4600,
    currency: "gems",
    image: "https://images.pexels.com/photos/366791/pexels-photo-366791.jpeg"
  }
];

const mockClanMembers = [
  { name: "EliteLeader", role: "Leader", trophies: 6234, level: 14, donations: 2547 },
  { name: "ProPlayer99", role: "Co-Leader", trophies: 5987, level: 13, donations: 1876 },
  { name: "RoyalKnight", role: "Elder", trophies: 5456, level: 13, donations: 1234 },
  { name: "DragonMaster", role: "Member", trophies: 5123, level: 12, donations: 987 },
  { name: "WizardFan", role: "Member", trophies: 4789, level: 12, donations: 756 }
];



// Deck Builder Screen
export const DeckScreen = () => {
  const [selectedDeck, setSelectedDeck] = useState(mockDecks[0]);
  const [deckCards, setDeckCards] = useState(
    selectedDeck.cards.map(cardId => mockCards.find(c => c.id === cardId))
  );
  const [showCardSelector, setShowCardSelector] = useState(false);
  const [editingSlot, setEditingSlot] = useState(null);

  const averageElixir = (deckCards.reduce((sum, card) => sum + card.elixir, 0) / 8).toFixed(1);

  const handleCardSlotClick = (index) => {
    setEditingSlot(index);
    setShowCardSelector(true);
  };

  const handleCardSelect = (card) => {
    if (editingSlot !== null) {
      const newDeckCards = [...deckCards];
      newDeckCards[editingSlot] = card;
      setDeckCards(newDeckCards);
      setShowCardSelector(false);
      setEditingSlot(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-blue-900 pb-20">
      {/* Header */}
      <div className="bg-black bg-opacity-50 p-4">
        <h1 className="text-white text-2xl font-bold text-center mb-4">Deck Builder</h1>
        
        {/* Deck Selector */}
        <div className="flex space-x-2 overflow-x-auto mb-4">
          {mockDecks.map(deck => (
            <button
              key={deck.id}
              onClick={() => setSelectedDeck(deck)}
              className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap ${
                selectedDeck.id === deck.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-700 text-gray-300'
              }`}
            >
              {deck.name}
              {deck.active && <Star className="inline ml-1" size={14} />}
            </button>
          ))}
        </div>
      </div>

      {/* Current Deck */}
      <div className="p-4">
        <div className="bg-black bg-opacity-50 rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-white text-xl font-bold">{selectedDeck.name}</h2>
            <div className="flex items-center space-x-4">
              <div className="text-purple-400">
                <Zap className="inline mr-1" size={16} />
                Avg Elixir: {averageElixir}
              </div>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold">
                Use Deck
              </button>
            </div>
          </div>
          
          {/* Deck Cards Grid */}
          <div className="grid grid-cols-4 gap-4">
            {deckCards.map((card, index) => (
              <div
                key={index}
                onClick={() => handleCardSlotClick(index)}
                className="cursor-pointer relative"
              >
                <GameCard card={card} size="normal" />
                <div className="absolute inset-0 bg-purple-500 bg-opacity-0 hover:bg-opacity-20 rounded-lg transition-all" />
              </div>
            ))}
          </div>
        </div>

        {/* Deck Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-black bg-opacity-50 p-4 rounded-lg">
            <h3 className="text-white font-bold mb-2">Deck Analysis</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-300">
                <span>Troops:</span>
                <span>{deckCards.filter(c => c.type === 'Troop').length}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Spells:</span>
                <span>{deckCards.filter(c => c.type === 'Spell').length}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Buildings:</span>
                <span>{deckCards.filter(c => c.type === 'Building').length}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-black bg-opacity-50 p-4 rounded-lg">
            <h3 className="text-white font-bold mb-2">Elixir Cost</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-300">
                <span>1-3 Elixir:</span>
                <span>{deckCards.filter(c => c.elixir <= 3).length}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>4-6 Elixir:</span>
                <span>{deckCards.filter(c => c.elixir >= 4 && c.elixir <= 6).length}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>7+ Elixir:</span>
                <span>{deckCards.filter(c => c.elixir >= 7).length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Card Selector Modal */}
      <AnimatePresence>
        {showCardSelector && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-gray-900 rounded-lg p-6 max-w-4xl max-h-3/4 overflow-y-auto w-full"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-white text-xl font-bold">Select Card</h3>
                <button
                  onClick={() => setShowCardSelector(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-4">
                {mockCards.map(card => (
                  <div key={card.id} onClick={() => handleCardSelect(card)}>
                    <GameCard card={card} size="normal" />
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Shop Screen
export const ShopScreen = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-600 via-orange-600 to-red-600 pb-20">
      {/* Header */}
      <div className="bg-black bg-opacity-50 p-4">
        <h1 className="text-white text-2xl font-bold text-center mb-4">Shop</h1>
        
        {/* Player Currency */}
        <div className="flex justify-center space-x-6">
          <div className="flex items-center space-x-2 bg-yellow-600 px-4 py-2 rounded-full">
            <div className="w-6 h-6 bg-yellow-300 rounded-full"></div>
            <span className="text-white font-bold">{mockPlayer.gold.toLocaleString()}</span>
          </div>
          <div className="flex items-center space-x-2 bg-blue-600 px-4 py-2 rounded-full">
            <div className="w-6 h-6 bg-blue-300 rounded-full"></div>
            <span className="text-white font-bold">{mockPlayer.gems.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Shop Items */}
      <div className="p-4 space-y-6">
        {/* Daily Deals */}
        <div>
          <h2 className="text-white text-xl font-bold mb-4">Daily Deals</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {mockShopItems.slice(0, 2).map(item => (
              <motion.div
                key={item.id}
                className="bg-black bg-opacity-50 rounded-lg p-4 border-2 border-yellow-400"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="text-white font-bold">{item.name}</h3>
                    {item.count && (
                      <p className="text-gray-300 text-sm">{item.count} cards</p>
                    )}
                    <div className="flex items-center space-x-2 mt-2">
                      <div className={`w-4 h-4 rounded-full ${
                        item.currency === 'gold' ? 'bg-yellow-400' : 'bg-blue-400'
                      }`}></div>
                      <span className="text-white font-bold">{item.cost.toLocaleString()}</span>
                    </div>
                  </div>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold">
                    Buy
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Chests */}
        <div>
          <h2 className="text-white text-xl font-bold mb-4">Chests</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {mockShopItems.slice(2).map(item => (
              <motion.div
                key={item.id}
                className="bg-black bg-opacity-50 rounded-lg p-4 border-2 border-purple-400"
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg mx-auto mb-3"
                  />
                  <h3 className="text-white font-bold mb-2">{item.name}</h3>
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    <div className={`w-4 h-4 rounded-full ${
                      item.currency === 'gold' ? 'bg-yellow-400' : 'bg-blue-400'
                    }`}></div>
                    <span className="text-white font-bold">{item.cost.toLocaleString()}</span>
                  </div>
                  <button className="bg-purple-600 text-white px-6 py-2 rounded-lg font-bold w-full">
                    Purchase
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Special Offers */}
        <div>
          <h2 className="text-white text-xl font-bold mb-4">Special Offers</h2>
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-6 border-2 border-yellow-400">
            <div className="text-center">
              <Crown className="text-yellow-400 mx-auto mb-2" size={32} />
              <h3 className="text-white text-xl font-bold mb-2">Royal Pass</h3>
              <p className="text-gray-200 mb-4">Unlock exclusive rewards and bonuses!</p>
              <div className="flex items-center justify-center space-x-2 mb-4">
                <div className="w-6 h-6 bg-blue-400 rounded-full"></div>
                <span className="text-white text-xl font-bold">4.99 USD</span>
              </div>
              <button className="bg-yellow-500 text-black px-8 py-3 rounded-lg font-bold text-lg">
                Get Royal Pass
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Clan Screen
export const ClanScreen = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-700 via-blue-700 to-purple-700 pb-20">
      {/* Header */}
      <div className="bg-black bg-opacity-50 p-4">
        <h1 className="text-white text-2xl font-bold text-center mb-4">Clan</h1>
        
        {/* Clan Info */}
        <div className="bg-black bg-opacity-30 rounded-lg p-4 mb-4">
          <div className="flex items-center space-x-4">
            <Shield className="text-green-400" size={48} />
            <div>
              <h2 className="text-white text-xl font-bold">{mockPlayer.clan}</h2>
              <p className="text-green-400">#2Y8CPVR</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-1">
                  <Trophy className="text-yellow-400" size={16} />
                  <span className="text-white">45,234</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="text-blue-400" size={16} />
                  <span className="text-white">48/50</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Clan Stats */}
      <div className="p-4">
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-black bg-opacity-50 p-4 rounded-lg text-center">
            <Trophy className="text-yellow-400 mx-auto mb-2" size={24} />
            <div className="text-white font-bold text-lg">45,234</div>
            <div className="text-gray-300 text-sm">Clan Score</div>
          </div>
          
          <div className="bg-black bg-opacity-50 p-4 rounded-lg text-center">
            <Heart className="text-red-400 mx-auto mb-2" size={24} />
            <div className="text-white font-bold text-lg">12,847</div>
            <div className="text-gray-300 text-sm">Donations</div>
          </div>
          
          <div className="bg-black bg-opacity-50 p-4 rounded-lg text-center">
            <Star className="text-purple-400 mx-auto mb-2" size={24} />
            <div className="text-white font-bold text-lg">Legendary</div>
            <div className="text-gray-300 text-sm">League</div>
          </div>
        </div>

        {/* Clan Members */}
        <div className="bg-black bg-opacity-50 rounded-lg p-4">
          <h3 className="text-white text-lg font-bold mb-4">Members (48/50)</h3>
          
          <div className="space-y-3">
            {mockClanMembers.map((member, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-gray-600 last:border-b-0">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{index + 1}</span>
                  </div>
                  <div>
                    <div className="text-white font-semibold">{member.name}</div>
                    <div className="text-sm text-gray-400">{member.role}</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 text-sm">
                  <div className="text-center">
                    <div className="text-white">{member.trophies}</div>
                    <div className="text-gray-400">Trophies</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-white">{member.level}</div>
                    <div className="text-gray-400">Level</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-green-400">{member.donations}</div>
                    <div className="text-gray-400">Donated</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Clan Actions */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <button className="bg-green-600 text-white py-3 rounded-lg font-bold">
            Request Cards
          </button>
          <button className="bg-blue-600 text-white py-3 rounded-lg font-bold">
            Clan War
          </button>
        </div>
      </div>
    </div>
  );
};