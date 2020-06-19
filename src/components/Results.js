import React from 'react';

const Results = ({ resHeaders, resBody }) => {
  return (
    <div className='results'>
      <pre className='results_headers'>Headers:{resHeaders}</pre>
      <pre className='results_body'>Response:{resBody}</pre>
    </div>
  );
};

export default Results;
