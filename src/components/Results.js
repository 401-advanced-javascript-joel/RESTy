import React from 'react';

const Results = ({ loading, resHeaders, resBody }) => {
  // loading screen
  if (loading) {
    return (
      <div className='results'>
        <h2>Loading...</h2>
      </div>
    );
  }

  // dont show if no results exist
  if (!resHeaders && !resBody) {
    return <></>;
  }

  return (
    <div className='results'>
      <pre className='results_headers'>{resHeaders}</pre>
      <pre className='results_body'>{resBody}</pre>
    </div>
  );
};

export default Results;
