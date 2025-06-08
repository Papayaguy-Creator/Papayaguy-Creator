import { useState } from "react";
import "./App.css";
import { motion, AnimatePresence } from 'framer-motion';

// Import all components
import { 
  Navigation, 
  HomeScreen, 
  BattleScreen, 
  CardsScreen 
} from './components';

import { 
  DeckScreen, 
  ShopScreen, 
  ClanScreen 
} from './components2';

function App() {
  const [activeScreen, setActiveScreen] = useState('home');

  const renderScreen = () => {
    switch (activeScreen) {
      case 'home':
        return <HomeScreen setActiveScreen={setActiveScreen} />;
      case 'battle':
        return <BattleScreen />;
      case 'cards':
        return <CardsScreen />;
      case 'deck':
        return <DeckScreen />;
      case 'shop':
        return <ShopScreen />;
      case 'clan':
        return <ClanScreen />;
      default:
        return <HomeScreen setActiveScreen={setActiveScreen} />;
    }
  };

  return (
    <div className="App min-h-screen bg-gray-900 font-bold overflow-hidden">
      {/* Screen Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeScreen}
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -300 }}
          transition={{ duration: 0.3 }}
          className="relative z-10"
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>

      {/* Bottom Navigation */}
      <Navigation activeScreen={activeScreen} setActiveScreen={setActiveScreen} />
    </div>
  );
}

export default App;
