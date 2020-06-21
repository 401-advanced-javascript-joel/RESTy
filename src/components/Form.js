import React from 'react';

const Form = ({ reqType, url, reqBody, updateState, submitButton }) => {
  return (
    <div className='form'>
      <div className='form-top'>
        <select
          id='reqType'
          value={reqType}
          onChange={(e) => updateState('reqType', e.target.value)}
        >
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
          onChange={(e) => updateState('url', e.target.value)}
        />
        <button type='submit' id='submit' onClick={submitButton}>
          Request
        </button>
      </div>
      <div className='form-bottom'>
        <textarea
          id='reqBody'
          placeholder='Raw JSON Request Body'
          rows='5'
          value={reqBody}
          onChange={(e) => updateState('reqBody', e.target.value)}
        />
      </div>
    </div>
  );
};

export default Form;
