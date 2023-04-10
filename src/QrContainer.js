import React, { Component } from "react";
import QrReader from "react-qr-reader";

class QrContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      error: null,
    };
    this.handleScan = this.handleScan.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  handleScan(result) {
    if (result) {
      this.setState((prevState) => ({
        results: [...prevState.results, result],
      }));
    }
  }

  handleError(error) {
    this.setState({ error });
  }

  render() {
    const { results, error } = this.state;

    const tableStyle = {
      borderCollapse: "collapse",
      marginTop: "50px",
    };

    const thStyle = {
      border: "1px solid black",
      padding: "10px",
      textAlign: "left",
      background: "lightgray",
    };

    const tdStyle = {
      border: "1px solid black",
      padding: "10px",
    };

    const previewStyle = {
      height: 700,
      width: 1000,
      display: "flex",
      justifyContent: "center",
    };

    const camStyle = {
      display: "flex",
      justifyContent: "center",
      marginTop: "-50px",
    };

    const textStyle = {
      fontSize: "30px",
      textAlign: "center",
      marginTop: "-50px",
    };

    return (
      <React.Fragment>
        <div style={camStyle}>
          <QrReader
            delay={100}
            style={previewStyle}
            onError={this.handleError}
            onScan={this.handleScan}
          />
        </div>
        {error && <p style={textStyle}>{error.message}</p>}
        {results.length > 0 && (
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Result</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, index) => (
                <tr key={index}>
                  <td style={tdStyle}>{result}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </React.Fragment>
    );
  }
}

export default QrContainer;
