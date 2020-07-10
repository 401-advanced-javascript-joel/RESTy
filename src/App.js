import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './scss/main.scss';
import Header from './components/Header';
import Resty from './components/Resty';
import History from './components/History';
import Footer from './components/Footer';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      url: '',
      reqType: 'GET',
      reqBody: '',
      loading: false,
      resHeaders: null,
      resBody: null,
      calls: [],
    };
  }

  async componentDidMount() {
    await this.updateCalls();
  }

  // update calls with calls stored in local storage
  updateCalls = async () => {
    if (!window.localStorage.getItem('calls')) {
      window.localStorage.setItem('calls', []);
    } else {
      const calls = JSON.parse(window.localStorage.getItem('calls'));
      await this.setState({ ...this.state, calls });
    }
  };

  // callback for updating state
  updateState = async (name, value) => {
    await this.setState({ ...this.state, [name]: value });
  };

  // makes api call
  fetchData = async () => {
    await this.setState({ ...this.state, loading: true });
    const response = await fetch(this.state.url, {
      method: this.state.reqType,
      headers: {
        Accept: 'application/json',
      },
      // only send body if not get request
      body: this.state.reqType !== 'GET' ? this.state.reqBody : undefined,
    });

    // Save successful calls in local storage
    let calls = window.localStorage.getItem('calls');
    if (calls) {
      calls = JSON.parse(calls);
    } else {
      calls = [];
    }
    let request = {
      url: this.state.url,
      method: this.state.reqType,
      body: this.state.reqType !== 'GET' ? this.state.reqBody : undefined,
    };

    // Only store if it is unique
    let exists = calls.filter(
      (call) =>
        call.url === request.url &&
        call.method === request.method &&
        call.body === request.body,
    );
    if (exists.length === 0) {
      calls.push(request);
    }

    window.localStorage.setItem('calls', JSON.stringify(calls));

    let headers = {};
    for (const entry of response.headers.entries()) {
      headers[entry[0]] = entry[1];
    }

    let body = await response.text();
    try {
      body = JSON.parse(body);
    } catch (e) {
      console.log(e);
    }

    await this.setState({
      ...this.state,
      resBody: 'Response: ' + JSON.stringify(body, null, 4),
      resHeaders: 'Headers: ' + JSON.stringify(headers, null, 4),
      loading: false,
    });
    await this.updateCalls();
  };

  rerun = async ({ url, reqType, reqBody }) => {
    await this.setState({ ...this.state, url, reqType, reqBody });
  };

  render() {
    const links = [
      {
        url: '/',
        label: 'Home',
      },
      {
        url: '/history',
        label: 'History',
      },
    ];
    return (
      <>
        <BrowserRouter>
          <Header links={links} />
          <Route exact path='/'>
            <Resty
              url={this.state.url}
              reqType={this.state.reqType}
              reqBody={this.state.reqBody}
              resHeaders={this.state.resHeaders}
              resBody={this.state.resBody}
              loading={this.state.loading}
              calls={this.state.calls}
              updateState={this.updateState}
              fetchData={this.fetchData}
              updateCalls={this.updateCalls}
              rerun={this.rerun}
            />
          </Route>
          <Route path='/history'>
            <History
              depth='detailed'
              calls={this.state.calls}
              rerun={this.rerun}
            />
          </Route>
          <Footer />
        </BrowserRouter>
      </>
    );
  }
}

export default App;
