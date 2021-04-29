import React, {
  Component
} from 'react'
import './App.css';
import axios from 'axios'
class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedFile: null
    }
  }
  // validate uploaded file
  changeHandler = event => {
    this.setState({
      selectedFile: event.target.files[0]

    });

    if (
      event.target.files[0].type === 'application/vnd.ms-excel' ||
      event.target.files[0].type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ) {
      setTimeout(() => {
        this.apicall();
      }, 1500);
    }
  };

  // calling from back api call
  apicall = () => {
    const {
      selectedFile
    } = this.state;
    const data = new FormData();
    data.append('file', selectedFile);
    console.log(data)
    axios
      .post(`http://localhost:8080/create`, data)
      .then(response => response.data)
      .then(
        result => {
          document.getElementById('uploadFile').value = '';
        },
        err => {
          document.getElementById('uploadFile').value = '';
        }
      );
  };
  render() {
    return (
      <div className="App">
         <input type="file" id='uploadFile' single 
      		accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
      		onChange={this.changeHandler.bind(this)} 
         ></input>      
      </div>
    );
  }
}

export default App;