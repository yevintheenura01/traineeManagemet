import React, {useState} from 'react';
import axios from 'axios';


const initialState = {
    name: '',
    mobile: '',
};

const CreateTrainee=() =>{
    const [formData, setFormData] = useState(initialState);

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
          const response = await axios.post('http://localhost:5000/trainees', formData);

          if(response.status === 201){
            alert('Trainee created successfully');
          } else {
            throw new Error('Failed to create trainee');
          }
        } catch (error){
          alert(error.message);
        }
    };
  

  return (
    <div>
        <h1>Create Trainee</h1>
        <form onSubmit={handleSubmit}>
            <label>Trainee Name:</label> <br />
                <input 
                    type="text" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                />
            <br />
            <label>Trainee mobile:</label> <br />
                <input 
                    type="mobile" 
                    name="mobile" 
                    value={formData.mobile} 
                    onChange={handleChange} 
                />
            <br />
            <button type="submit">Create Trainee</button>
        </form>
    </div>
  );
}

export default CreateTrainee;
