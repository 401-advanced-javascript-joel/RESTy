import React from 'react';

const Form = ({ reqType, url, changeText, changeSelect, submitButton }) => {
  return (
    <div className='form'>
      <select id='reqType' value={reqType} onChange={changeSelect}>
        <option value='GET'>GET</option>
        <option value='POST'>POST</option>
        <option value='PUT'>PUT</option>
        <option value='DELETE'>DELETE</option>
      </select>
      <input
        id='url'
        type='text'
        placeholder='http://swapi.dev/api/people/1'
        value={url}
        onChange={changeText}
      />
      <button type='submit' id='submit' onClick={submitButton}>
        Request
      </button>
    </div>
  );
};

export default Form;
