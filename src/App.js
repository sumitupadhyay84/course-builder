import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Module from './components/Module';
import './App.css';

function App() {
  const [modules, setModules] = useState([]);

  const addModule = () => {
    const newModule = { id: Date.now(), name: 'New Module', resources: [] };
    setModules([...modules, newModule]);
  };

  const updateModule = (updatedModule) => {
    const updatedModules = modules.map(module =>
      module.id === updatedModule.id ? updatedModule : module
    );
    setModules(updatedModules);
  };

  const deleteModule = (moduleId) => {
    const filteredModules = modules.filter(module => module.id !== moduleId);
    setModules(filteredModules);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container">
         <header>
         <h1>Course Builder</h1>
          <button onClick={addModule}>Add Module</button>
         </header>
         {modules.map(module => (
          <Module
            key={module.id}
            module={module}
            updateModule={updateModule}
            deleteModule={deleteModule}
          />
        ))}
      </div>
    </DndProvider>
  );
}

export default App;
