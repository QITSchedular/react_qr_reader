# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

// version -1:
import React, { Component } from "react";
import  QrReader  from "react-qr-reader";

class QrContainer extends Component {
    constructor(props){
        super(props)
        this.state={
            result:"Hold Qr Code Steady and Clear to Scan.."
        }
        this.handleScan = this.handleScan.bind(this);
    }
    handleScan(result){
        this.setState({
            result: result
        });
    };
    handleError(err){
        console.error(err);
    }
  render() {
    const previewStyle ={
        height: 700,
        width: 1000,
        display: 'flex', 
        'justify-content':'center'
    };
    const camStyle = {
        display: "flex",
        justifyContent : "center",
        marginTop: '-50px'
    }
    const textStyle ={
        fontSize :'30px',
        "text-align":"center",
        marginTop:'-50px'
    }

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
        <p style={textStyle}>
            {this.state.result}
        </p>
      </React.Fragment>
    )
  }
}

export default QrContainer;


// version 2
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
