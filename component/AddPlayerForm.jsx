import React, { useState } from 'react';

function AddPlayerForm({ onAddPlayer }) {
  const [formData, setFormData] = useState({
    name: '',
    breed: '',
    status: '',
    image: '',
    teamId: '',
    owner: '' 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onAddPlayer(formData);
    setFormData({ name: '', breed: '', status: '', image: '', teamId: '', owner: '' }); 
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          name="name"
          type="text"
          placeholder="Puppy 4-20 characters"
          minLength="4"
          maxLength="20"
          required
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Breed:</label>
        <input
          name="breed"
          type="text"
          placeholder="Breed 1-20 characters"
          minLength="1"
          maxLength="20"
          required
          value={formData.breed}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Status:</label>
        <select
          name="status"
          required
          value={formData.status}
          onChange={handleChange}
        >
          <option value="" disabled>Please Select One:</option>
          <option value="bench">bench</option>
          <option value="field">field</option>
        </select>
      </div>
      <div>
        <label>Photo:</label>
        <input
          name="image"
          type="text"
          placeholder="Image Url"
          required
          value={formData.image}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>TeamID:</label>
        <input
          name="teamId"
          type="text"
          placeholder="Enter Team ID"
          required
          value={formData.teamId}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Owner:</label> 
        <input
          name="owner"
          type="text"
          placeholder="Enter Owner"
          required
          value={formData.owner}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default AddPlayerForm;
