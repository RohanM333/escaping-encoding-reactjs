import React, { useState } from 'react';
import DOMPurify from 'dompurify'; // Library for input sanitization
import he from 'he'; // Library for HTML escaping

const SecureInput = () => {
  const [inputValue, setInputValue] = useState('');
  const [encodedValue, setEncodedValue] = useState('');

  const handleChange = (event) => {
    const userInput = event.target.value;
    
    // Sanitize input to remove dangerous characters
    const sanitizedInput = DOMPurify.sanitize(userInput);

    // Escape HTML characters
    const escapedInput = he.escape(sanitizedInput);

    setInputValue(escapedInput);

    // URL encode the input for safe transmission
    const urlEncodedInput = encodeURIComponent(sanitizedInput);
    setEncodedValue(urlEncodedInput);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Server-side validation and sanitization should also be applied here
    console.log('Escaped value:', inputValue);
    console.log('URL encoded value:', encodedValue);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="secureInput">Secure Input:</label>
      <input
        type="text"
        id="secureInput"
        onChange={handleChange}
        maxLength={50} // Limit input length
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default SecureInput;
