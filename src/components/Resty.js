import React from 'react';
import History from './History';
import Form from './Form';
import Results from './Results';

const Resty = (props) => {
  return (
    <div className='resty'>
      <div className='resty-left'>
        <History depth='light' calls={props.calls} rerun={props.rerun} />
      </div>
      <div className='resty-right'>
        <Form
          url={props.url}
          reqType={props.reqType}
          reqBody={props.reqBody}
          updateState={props.updateState}
          submitButton={props.fetchData}
        />
        <Results
          loading={props.loading}
          resBody={props.resBody}
          resHeaders={props.resHeaders}
        />
      </div>
    </div>
  );
};

export default Resty;
