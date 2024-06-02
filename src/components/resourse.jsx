import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import { FaEdit, FaTrash } from 'react-icons/fa';

function Resource({ resource, updateResource, deleteResource }) {
  const [isEditing, setIsEditing] = useState(false);
  const [resourceContent, setResourceContent] = useState(resource.content);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'RESOURCE',
    item: resource,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const handleContentChange = (e) => setResourceContent(e.target.value);

  const saveContent = () => {
    const updatedResource = { ...resource, content: resourceContent };
    updateResource(updatedResource);
    setIsEditing(false);
  };

  return (
    <div ref={drag} className={`resource ${isDragging ? 'dragging' : ''}`}>
      {isEditing ? (
        <>
          {resource.type === 'link' && (
            <input value={resourceContent} onChange={handleContentChange} />
          )}
          <button onClick={saveContent}>Save</button>
        </>
      ) : (
        <>
          {resource.type === 'link' && <a href={resource.content} target="_blank" rel="noopener noreferrer">{resource.content}</a>}
          {resource.type === 'file' && resource.fileName && (
            <>
              {resource.fileName.match(/\.(jpeg|jpg|gif|png)$/) && (
                <img src={resource.content} alt={resource.fileName} style={{ maxWidth: '100%' }} />
              )}
              {resource.fileName.match(/\.(pdf)$/) && (
                <a href={resource.content} target="_blank" rel="noopener noreferrer">{resource.fileName}</a>
              )}
            </>
          )}
          <button onClick={() => setIsEditing(true)}><FaEdit /></button>
        </>
      )}
      <button onClick={() => deleteResource(resource.id)}><FaTrash /></button>
    </div>
  );
}

export default Resource;
