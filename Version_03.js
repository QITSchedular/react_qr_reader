import React, { Component } from "react";
import QrReader from "react-qr-reader";

class QrContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      error: null,
      scanning: false
    };
    this.handleScan = this.handleScan.bind(this);
    this.handleError = this.handleError.bind(this);
    this.startScan = this.startScan.bind(this);
    this.stopScan = this.stopScan.bind(this);
  }

  startScan() {
    this.setState({ scanning: true });
  }

  stopScan() {
    this.setState({ scanning: false });
  }

  handleScan(result) {
    if (result) {
      this.setState((prevState) => ({
        results: [...prevState.results, result],
        scanning: false
      }));
    }
  }

  handleError(error) {
    this.setState({ error, scanning: false });
  }

  render() {
    const { results, error, scanning } = this.state;

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
        <button onClick={this.startScan} disabled={scanning}>
          Scan QR Code
        </button>
        {scanning && (
          <div style={camStyle}>
            <QrReader
              delay={100}
              style={previewStyle}
              onError={this.handleError}
              onScan={this.handleScan}
            />
          </div>
        )}
        {error && <p style={textStyle}>{error.message}</p>}
        {results.length > 0 && (
          <React.Fragment>
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
            <button onClick={this.stopScan}>Close Camera</button>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default QrContainer;
