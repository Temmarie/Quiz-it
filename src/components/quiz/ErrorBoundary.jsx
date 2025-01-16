import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state to display fallback UI on error
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    this.setState({ error, errorInfo });
    console.error("Error occurred: ", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Render fallback UI
      return (
        <div className="error-message text-center text-indigo-500">
          <h2>Something went wrong.</h2>
          <p>Please try again later.</p>
        </div>
      );
    }

    return this.props.children; // Render the children if no error occurs
  }
}

export default ErrorBoundary;
