import React, { Component } from 'react';
import './styles.sass';

class ErrorPage extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    document.querySelector('.menu').classList.remove('open');
  }
  render() {
    return (
      <h3 className="error text-center">404(Page Not Found)</h3>
    );
  }
}

export default ErrorPage;
