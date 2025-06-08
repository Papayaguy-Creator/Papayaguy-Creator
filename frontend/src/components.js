import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Crown, 
  Sword, 
  Shield, 
  Zap, 
  Star, 
  Trophy, 
  Heart, 
  Settings, 
  Users, 
  ShoppingCart,
  Play,
  Pause,
  RotateCcw,
  Plus,
  Minus,
  X
} from 'lucide-react';

// Mock Data
export const mockPlayer = {
  name: "Royal Player",
  level: 13,
  trophies: 5247,
  experience: 89650,
  clan: "Elite Warriors",
  gems: 1250,
  gold: 15640
};

export const mockCards = [
  // Common Cards
  { id: 1, name: "Barbarians", type: "Troop", rarity: "Common", elixir: 5, level: 13, count: 1847, maxCount: 2000, image: "https://images.pexels.com/photos/14468417/pexels-photo-14468417.jpeg" },
  { id: 2, name: "Archers", type: "Troop", rarity: "Common", elixir: 3, level: 13, count: 1654, maxCount: 2000, image: "https://images.pexels.com/photos/20161750/pexels-photo-20161750.jpeg" },
  { id: 3, name: "Knight", type: "Troop", rarity: "Common", elixir: 3, level: 13, count: 1789, maxCount: 2000, image: "https://images.unsplash.com/photo-1460194436988-671f763436b7" },
  { id: 4, name: "Goblins", type: "Troop", rarity: "Common", elixir: 2, level: 13, count: 1234, maxCount: 2000, image: "https://images.pexels.com/photos/29856799/pexels-photo-29856799.jpeg" },
  { id: 5, name: "Arrows", type: "Spell", rarity: "Common", elixir: 3, level: 13, count: 1567, maxCount: 2000, image: "https://images.pexels.com/photos/7978766/pexels-photo-7978766.jpeg" },
  
  // Rare Cards
  { id: 6, name: "Giant", type: "Troop", rarity: "Rare", elixir: 5, level: 11, count: 245, maxCount: 400, image: "https://images.pexels.com/photos/10547072/pexels-photo-10547072.jpeg" },
  { id: 7, name: "Wizard", type: "Troop", rarity: "Rare", elixir: 5, level: 11, count: 198, maxCount: 400, image: "https://images.pexels.com/photos/7978816/pexels-photo-7978816.jpeg" },
  { id: 8, name: "Fireball", type: "Spell", rarity: "Rare", elixir: 4, level: 11, count: 167, maxCount: 400, image: "https://images.pexels.com/photos/8391393/pexels-photo-8391393.jpeg" },
  
  // Epic Cards
  { id: 9, name: "Baby Dragon", type: "Troop", rarity: "Epic", elixir: 4, level: 8, count: 34, maxCount: 50, image: "https://images.pexels.com/photos/32418643/pexels-photo-32418643.jpeg" },
  { id: 10, name: "Lightning", type: "Spell", rarity: "Epic", elixir: 6, level: 8, count: 28, maxCount: 50, image: "https://images.unsplash.com/photo-1634409884980-a30da0b2b010" },
  
  // Legendary Cards
  { id: 11, name: "Princess", type: "Troop", rarity: "Legendary", elixir: 3, level: 5, count: 3, maxCount: 5, image: "https://images.unsplash.com/photo-1524373050940-8f19e9b858a9" },
  { id: 12, name: "Ice Wizard", type: "Troop", rarity: "Legendary", elixir: 3, level: 5, count: 4, maxCount: 5, image: "https://images.pexels.com/photos/7979099/pexels-photo-7979099.jpeg" },
];

const rarityColors = {
  Common: "from-gray-400 to-gray-600",
  Rare: "from-orange-400 to-orange-600",
  Epic: "from-purple-400 to-purple-600",
  Legendary: "from-yellow-400 to-yellow-600"
};

const rarityBorders = {
  Common: "border-gray-400",
  Rare: "border-orange-400", 
  Epic: "border-purple-400",
  Legendary: "border-yellow-400"
};

// Navigation Component
export const Navigation = ({ activeScreen, setActiveScreen }) => {
  const navItems = [
    { id: 'home', icon: Crown, label: 'Home' },
    { id: 'battle', icon: Sword, label: 'Battle' },
    { id: 'cards', icon: Star, label: 'Cards' },
    { id: 'deck', icon: Shield, label: 'Deck' },
    { id: 'shop', icon: ShoppingCart, label: 'Shop' },
    { id: 'clan', icon: Users, label: 'Clan' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-purple-900 via-blue-900 to-purple-900 border-t-2 border-purple-500 z-50">
      <div className="flex justify-around items-center py-2 px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <motion.button
              key={item.id}
              onClick={() => setActiveScreen(item.id)}
              className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-all ${
                activeScreen === item.id 
                  ? 'text-yellow-400 bg-purple-800' 
                  : 'text-purple-200 hover:text-yellow-300'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon size={20} />
              <span className="text-xs font-bold">{item.label}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

// Card Component
export const GameCard = ({ card, onClick, selected = false, size = "normal" }) => {
  const sizeClasses = {
    small: "w-16 h-20",
    normal: "w-20 h-28", 
    large: "w-24 h-32"
  };

  return (
    <motion.div
      onClick={() => onClick && onClick(card)}
      className={`${sizeClasses[size]} ${rarityBorders[card.rarity]} border-2 rounded-lg overflow-hidden cursor-pointer relative ${
        selected ? 'ring-2 ring-yellow-400' : ''
      }`}
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className={`h-full bg-gradient-to-b ${rarityColors[card.rarity]} relative overflow-hidden`}>
        <img 
          src={card.image} 
          alt={card.name}
          className="w-full h-3/5 object-cover"
        />
        
        {/* Elixir Cost */}
        <div className="absolute top-1 left-1 bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold border border-purple-300">
          {card.elixir}
        </div>
        
        {/* Card Name */}
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white text-xs p-1 text-center">
          <div className="font-bold truncate">{card.name}</div>
          <div className="text-xs opacity-80">Lvl {card.level}</div>
        </div>
      </div>
    </motion.div>
  );
};

// Home Screen Component
export const HomeScreen = ({ setActiveScreen }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-blue-900 to-purple-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <img 
          src="https://images.unsplash.com/photo-1597466599360-3b9775841aec" 
          alt="Background" 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Top Bar */}
      <div className="relative z-10 flex justify-between items-center p-4 bg-black bg-opacity-30">
        <div className="flex items-center space-x-3">
          <Crown className="text-yellow-400" size={24} />
          <div>
            <div className="text-white font-bold">{mockPlayer.name}</div>
            <div className="text-yellow-400 text-sm">Level {mockPlayer.level}</div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1 bg-purple-600 px-3 py-1 rounded-full">
            <Trophy className="text-yellow-400" size={16} />
            <span className="text-white font-bold">{mockPlayer.trophies}</span>
          </div>
          
          <div className="flex items-center space-x-1 bg-blue-600 px-3 py-1 rounded-full">
            <div className="w-4 h-4 bg-blue-300 rounded-full"></div>
            <span className="text-white font-bold">{mockPlayer.gems}</span>
          </div>
          
          <Settings 
            className="text-white cursor-pointer hover:text-yellow-400" 
            size={24}
            onClick={() => setActiveScreen('settings')}
          />
        </div>
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-8 space-y-8">
        {/* Battle Button */}
        <motion.button
          onClick={() => setActiveScreen('battle')}
          className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-2xl px-12 py-6 rounded-2xl border-4 border-yellow-400 shadow-2xl relative overflow-hidden"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{ 
            boxShadow: ["0 0 20px rgba(255,165,0,0.5)", "0 0 40px rgba(255,165,0,0.8)", "0 0 20px rgba(255,165,0,0.5)"]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Sword className="inline mr-3" size={32} />
          BATTLE!
        </motion.button>
        
        {/* Chests */}
        <div className="grid grid-cols-4 gap-4 w-full max-w-md">
          {[1, 2, 3, 4].map((chest) => (
            <motion.div
              key={chest}
              className="bg-gradient-to-b from-yellow-600 to-yellow-800 p-4 rounded-lg border-2 border-yellow-400 text-center cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img 
                src="https://images.pexels.com/photos/366791/pexels-photo-366791.jpeg" 
                alt="Chest" 
                className="w-12 h-12 object-cover rounded mx-auto mb-2"
              />
              <div className="text-white text-xs font-bold">
                {chest === 1 ? "OPEN" : `${chest * 2}h`}
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 w-full max-w-md">
          <div className="bg-black bg-opacity-50 p-3 rounded-lg text-center">
            <Users className="text-purple-400 mx-auto mb-1" size={20} />
            <div className="text-white text-sm font-bold">{mockPlayer.clan}</div>
            <div className="text-purple-300 text-xs">Clan</div>
          </div>
          
          <div className="bg-black bg-opacity-50 p-3 rounded-lg text-center">
            <Star className="text-yellow-400 mx-auto mb-1" size={20} />
            <div className="text-white text-sm font-bold">{mockCards.length}</div>
            <div className="text-yellow-300 text-xs">Cards</div>
          </div>
          
          <div className="bg-black bg-opacity-50 p-3 rounded-lg text-center">
            <Trophy className="text-orange-400 mx-auto mb-1" size={20} />
            <div className="text-white text-sm font-bold">Arena 15</div>
            <div className="text-orange-300 text-xs">Legendary</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Battle Screen Component
export const BattleScreen = () => {
  const [elixir, setElixir] = useState(10);
  const [battleTime, setBattleTime] = useState(180);
  const [selectedCard, setSelectedCard] = useState(null);
  const [battleDeck] = useState(mockCards.slice(0, 4));

  useEffect(() => {
    const elixirTimer = setInterval(() => {
      setElixir(prev => (prev < 10 ? prev + 1 : 10));
    }, 2800);

    const battleTimer = setInterval(() => {
      setBattleTime(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      clearInterval(elixirTimer);
      clearInterval(battleTimer);
    };
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-400 via-blue-500 to-green-600 relative overflow-hidden">
      {/* Battle Arena Background */}
      <div className="absolute inset-0">
        <img 
          src="https://images.pexels.com/photos/10547072/pexels-photo-10547072.jpeg" 
          alt="Battle Arena" 
          className="w-full h-full object-cover opacity-80"
        />
      </div>
      
      {/* Battle UI */}
      <div className="relative z-10 h-screen flex flex-col">
        {/* Top Battle Info */}
        <div className="flex justify-between items-center p-4 bg-black bg-opacity-50">
          <div className="flex items-center space-x-2">
            <Crown className="text-blue-400" size={20} />
            <span className="text-white font-bold">Enemy Player</span>
            <span className="text-blue-400">Lvl 13</span>
          </div>
          
          <div className="bg-black bg-opacity-70 px-4 py-2 rounded-full">
            <span className="text-yellow-400 font-bold text-xl">{formatTime(battleTime)}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-red-400">Lvl 13</span>
            <span className="text-white font-bold">{mockPlayer.name}</span>
            <Crown className="text-red-400" size={20} />
          </div>
        </div>
        
        {/* Towers */}
        <div className="flex-1 relative">
          {/* Enemy Towers */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
            <img 
              src="https://images.pexels.com/photos/32400698/pexels-photo-32400698.jpeg" 
              alt="Enemy King Tower" 
              className="w-16 h-20 object-cover rounded-lg border-2 border-blue-400"
            />
          </div>
          
          <div className="absolute top-16 left-8">
            <img 
              src="https://images.pexels.com/photos/30643539/pexels-photo-30643539.jpeg" 
              alt="Enemy Princess Tower" 
              className="w-12 h-16 object-cover rounded-lg border-2 border-blue-400"
            />
          </div>
          
          <div className="absolute top-16 right-8">
            <img 
              src="https://images.pexels.com/photos/30643539/pexels-photo-30643539.jpeg" 
              alt="Enemy Princess Tower" 
              className="w-12 h-16 object-cover rounded-lg border-2 border-blue-400"
            />
          </div>
          
          {/* Player Towers */}
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
            <img 
              src="https://images.pexels.com/photos/32400698/pexels-photo-32400698.jpeg" 
              alt="Player King Tower" 
              className="w-16 h-20 object-cover rounded-lg border-2 border-red-400"
            />
          </div>
          
          <div className="absolute bottom-32 left-8">
            <img 
              src="https://images.pexels.com/photos/30643539/pexels-photo-30643539.jpeg" 
              alt="Player Princess Tower" 
              className="w-12 h-16 object-cover rounded-lg border-2 border-red-400"
            />
          </div>
          
          <div className="absolute bottom-32 right-8">
            <img 
              src="https://images.pexels.com/photos/30643539/pexels-photo-30643539.jpeg" 
              alt="Player Princess Tower" 
              className="w-12 h-16 object-cover rounded-lg border-2 border-red-400"
            />
          </div>
        </div>
        
        {/* Bottom UI */}
        <div className="bg-black bg-opacity-70 p-4">
          {/* Elixir Bar */}
          <div className="flex items-center justify-center mb-4">
            <div className="flex space-x-1">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className={`w-6 h-6 rounded-full border-2 border-purple-400 ${
                    i < elixir ? 'bg-purple-500' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
            <div className="ml-4 text-purple-400 font-bold text-xl">{elixir}/10</div>
          </div>
          
          {/* Battle Deck */}
          <div className="flex justify-center space-x-4">
            {battleDeck.map((card) => (
              <GameCard
                key={card.id}
                card={card}
                onClick={setSelectedCard}
                selected={selectedCard?.id === card.id}
                size="normal"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Cards Collection Screen
export const CardsScreen = () => {
  const [selectedRarity, setSelectedRarity] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  
  const rarities = ['All', 'Common', 'Rare', 'Epic', 'Legendary'];
  const types = ['All', 'Troop', 'Spell', 'Building'];
  
  const filteredCards = mockCards.filter(card => {
    return (selectedRarity === 'All' || card.rarity === selectedRarity) &&
           (selectedType === 'All' || card.type === selectedType);
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-900 pb-20">
      {/* Header */}
      <div className="bg-black bg-opacity-50 p-4">
        <h1 className="text-white text-2xl font-bold text-center mb-4">Card Collection</h1>
        
        {/* Filters */}
        <div className="space-y-4">
          {/* Rarity Filter */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-2">Rarity</h3>
            <div className="flex space-x-2 overflow-x-auto">
              {rarities.map(rarity => (
                <button
                  key={rarity}
                  onClick={() => setSelectedRarity(rarity)}
                  className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap ${
                    selectedRarity === rarity
                      ? 'bg-yellow-500 text-black'
                      : 'bg-gray-700 text-white'
                  }`}
                >
                  {rarity}
                </button>
              ))}
            </div>
          </div>
          
          {/* Type Filter */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-2">Type</h3>
            <div className="flex space-x-2">
              {types.map(type => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-4 py-2 rounded-full text-sm font-bold ${
                    selectedType === type
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-700 text-white'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Cards Grid */}
      <div className="p-4">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
          {filteredCards.map(card => (
            <div key={card.id} className="relative">
              <GameCard card={card} size="normal" />
              {/* Card Count */}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded-full">
                {card.count}/{card.maxCount}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};