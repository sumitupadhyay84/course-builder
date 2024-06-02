import React, { useState } from 'react';

function ResourceForm({ addResource }) {
  const [type, setType] = useState('link');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === 'link' && content.trim() === '') return;

    if (type === 'file' && !file) return;

    const resource = {
      type,
      content: type === 'link' ? content : URL.createObjectURL(file),
      fileName: file ? file.name : '',
    };
    addResource(resource);
    setContent('');
    setFile(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="link">Link</option>
        <option value="file">File</option>
      </select>
      {type === 'link' ? (
        <input
          type="text"
          placeholder="Enter URL"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      ) : (
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
      )}
      <button type="submit">Add {type === 'link' ? 'Link' : 'File'}</button>
    </form>
  );
}

export default ResourceForm;
