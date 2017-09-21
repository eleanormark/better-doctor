import React, { Component } from 'react';
import SearchBar from '../containers/search_bar';
import DoctorLIst from '../containers/doctor_list';

class App extends Component {
  render() {
    return (
      <div>
        <SearchBar />
        <DoctorLIst />
      </div>
    );
  }
}

export default App;
