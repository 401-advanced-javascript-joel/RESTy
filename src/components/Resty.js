import React from 'react';
import Form from './Form';
import Results from './Results';

class Resty extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      url: '',
      reqType: 'GET',
      resHeaders: null,
      resBody: null,
    };
  }

  changeText = (e) => {
    this.setState({ ...this.state, url: e.target.value });
  };

  changeSelect = (e) => {
    this.setState({ ...this.state, reqType: e.target.value });
  };

  submitButton = async () => {
    await this.fetchData();
  };

  async fetchData() {
    const response = await fetch(this.state.url, {
      method: this.state.reqType,
      headers: {
        Accept: 'application/json',
      },
    });
    let headers = {};
    for (const entry of response.headers.entries()) {
      headers[entry[0]] = entry[1];
    }
    const body = await response.json();
    await this.setState({
      ...this.state,
      resBody: JSON.stringify(body, null, 4),
      resHeaders: JSON.stringify(headers, null, 4),
    });
  }

  render() {
    return (
      <div className='resty'>
        <Form
          reqType={this.state.reqType}
          url={this.state.url}
          changeText={this.changeText}
          changeSelect={this.changeSelect}
          submitButton={this.submitButton}
        />
        <Results
          resBody={this.state.resBody}
          resHeaders={this.state.resHeaders}
        />
      </div>
    );
  }
}

export default Resty;
