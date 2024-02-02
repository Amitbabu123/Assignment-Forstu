import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DynamicFormBuilder = ({ studentData }) => {
  const [formFields, setFormFields] = useState([]);
  const [completionStatus, setCompletionStatus] = useState([]);

  useEffect(() => {
   

    const pendingFields = ['Field1', 'Field2', 'Field3']; 

    setFormFields(pendingFields.map((field) => ({ label: field, type: 'text' })));
    setCompletionStatus(Array(pendingFields.length).fill(false));
  }, [studentData]);

  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    const updatedFields = [...formFields];
    updatedFields[index][name] = value;
    setFormFields(updatedFields);

    
    const updatedStatus = [...completionStatus];
    updatedStatus[index] = true;
    setCompletionStatus(updatedStatus);
  };

  const handleAddField = () => {
    setFormFields([...formFields, { label: '', type: '' }]);
    setCompletionStatus([...completionStatus, false]);
  };

  const handleRemoveField = (index) => {
    const updatedFields = [...formFields];
    updatedFields.splice(index, 1);
    setFormFields(updatedFields);

    const updatedStatus = [...completionStatus];
    updatedStatus.splice(index, 1);
    setCompletionStatus(updatedStatus);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      
      await axios.post('http://localhost:3001/submit-form', {
        ...formFields.reduce((acc, field) => ({ ...acc, [field.label]: '' }), {}),
      });

 

    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="mb-3">
        Progress: {((completionStatus.filter((status) => status).length / completionStatus.length) * 100).toFixed(2)}%
      </div>
      <form onSubmit={handleSubmit}>
        {formFields.map((field, index) => (
          <div key={index} className="mb-3">
            <label className="form-label">
              {field.label}:
              <input
                type={field.type}
                name={field.label}
                value={field[field.label]}
                onChange={(event) => handleInputChange(event, index)}
                className="form-control"
              />
            </label>
            <button type="button" onClick={() => handleRemoveField(index)} className="btn btn-danger m-2">
              Remove Field
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddField} className="btn btn-primary">
          Add Field
        </button>
        <button type="submit" className="btn btn-success">
          Submit
        </button>
      </form>
    </div>
  );
};

export default DynamicFormBuilder;
