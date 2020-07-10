import React from 'react';
import { Redirect } from 'react-router-dom';

class History extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
    };
  }

  renderLight = () => {
    let items = [];
    console.log('waffle');
    for (let i = 0; i < this.props.calls.length; i++) {
      items.push(
        <div key={i} className='historyItem' onClick={this.handleClick}>
          <p>
            <strong className='method'>{this.props.calls[i].method}</strong>:{' '}
            <span className='url'>{this.props.calls[i].url}</span>
          </p>
          <p className='body'>{this.props.calls[i].body}</p>
        </div>,
      );
    }
    return items;
  };

  renderDetailed = () => {
    let items = [];
    for (let i = 0; i < this.props.calls.length; i++) {
      items.push(
        <div key={i} className='historyItem'>
          <p>
            <strong className='method'>{this.props.calls[i].method}</strong>:{' '}
            <span className='url'>{this.props.calls[i].url}</span>
          </p>
          <p className='body'>{this.props.calls[i].body}</p>
          <button onClick={this.handleClick}>Rerun Request</button>
        </div>,
      );
    }
    return items;
  };

  handleClick = (e) => {
    const clicked = e.target.closest('.historyItem');
    const request = {
      url: clicked.querySelector('.url').innerText,
      reqType: clicked.querySelector('.method').innerText,
      reqBody: clicked.querySelector('.body').textContent,
    };
    this.props.rerun(request);
    this.setState({ ...this.state, redirect: true });
  };

  render() {
    let children;
    if (this.props.depth === 'light') {
      children = this.renderLight();
    } else if (this.props.depth === 'detailed') {
      children = this.renderDetailed();
    }

    if (this.state.redirect) {
      return <Redirect push to='/' />;
    } else {
      return (
        <div className='history'>
          <h2>History</h2>
          {children}
        </div>
      );
    }
  }
}

export default History;
