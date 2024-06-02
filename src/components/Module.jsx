import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import Resource from './resourse';
import ResourceForm from './resourseForm';
import { FaEdit, FaTrash } from 'react-icons/fa';

function Module({ module, updateModule, deleteModule }) {
  const [isEditing, setIsEditing] = useState(false);
  const [moduleName, setModuleName] = useState(module.name);

  const [, drop] = useDrop({
    accept: 'RESOURCE',
    drop: (item) => {
      const newResource = { ...item, id: Date.now() };
      const updatedModule = {
        ...module,
        resources: [...module.resources, newResource],
      };
      updateModule(updatedModule);
    },
  });

  const handleNameChange = (e) => setModuleName(e.target.value);

  const saveName = () => {
    const updatedModule = { ...module, name: moduleName };
    updateModule(updatedModule);
    setIsEditing(false);
  };

  const addResource = (resource) => {
    const newResource = { ...resource, id: Date.now() };
    const updatedModule = {
      ...module,
      resources: [...module.resources, newResource],
    };
    updateModule(updatedModule);
  };

  const updateResource = (updatedResource) => {
    const updatedResources = module.resources.map(resource =>
      resource.id === updatedResource.id ? updatedResource : resource
    );
    const updatedModule = { ...module, resources: updatedResources };
    updateModule(updatedModule);
  };

  const deleteResource = (resourceId) => {
    const filteredResources = module.resources.filter(resource => resource.id !== resourceId);
    const updatedModule = { ...module, resources: filteredResources };
    updateModule(updatedModule);
  };

  return (
    <div ref={drop} className="module">
      <div className="module-header">
        {isEditing ? (
          <>
            <input value={moduleName} onChange={handleNameChange} />
            <button onClick={saveName}>Save</button>
          </>
        ) : (
          <>
            <h2>{module.name}</h2>
            <button onClick={() => setIsEditing(true)}><FaEdit /></button>
          </>
        )}
        <button onClick={() => deleteModule(module.id)}><FaTrash /></button>
      </div>
      <div className="resources">
        {module.resources.map(resource => (
          <Resource
            key={resource.id}
            resource={resource}
            updateResource={updateResource}
            deleteResource={deleteResource}
          />
        ))}
        <ResourceForm addResource={addResource} />
      </div>
    </div>
  );
}

export default Module;
