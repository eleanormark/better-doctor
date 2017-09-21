import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchDoctor } from '../actions/index';
import { debounce } from 'throttle-debounce';
import keys from '../config/keys';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { term: '', options: [] };
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.handleSearch = debounce(500, this.handleSearch.bind(this));
  }

  renerDatalistOptions(option) {
    return <option key={option.slug} value={option.full_name} />;
  }

  onInputChange(event) {
    this.handleSearch(event.target.value);
    this.setState({ term: event.target.value });
  }

  onFormSubmit(event) {
    event.preventDefault();
    this.props.fetchDoctor(this.state.term);
    this.setState({ term: '' });
  }

  handleSearch(query) {
    if (!query) return;

    const API_KEY = keys.betterDoctorKey;
    const ROOT_URL = 'https://api.betterdoctor.com/2016-03-01/doctors?location=37.773,-122.413,100&skip=2&limit=12&user_key=' + API_KEY;
    const queryNames = query.replace(/\s+/g, '%20');
    const url = `${ROOT_URL}&name=${queryNames}`;

    fetch(url)
      .then(res => res.json())
      .then(json => {
        this.setState({
          options: json.data.map(each => {
            let mid_name = each.profile.middle_name ? `${each.profile.middle_name} ` : '';
            each.profile.full_name = `${each.profile.first_name} ${mid_name} ${each.profile.last_name}`;
            return each.profile;
          })
        });
      })
      .catch(() => {
        console.log( "handleSearch fetch failed" );
      });
  };

  render() {
    return (
      <form onSubmit={this.onFormSubmit} className="input-group">
        <input
          placeholder="FistName LastName"
          className="form-control"
          value={this.state.term}
          onChange={this.onInputChange}
          list="names"
        />
        <datalist id="names">
          {this.state.options.map(this.renerDatalistOptions)}
        </datalist>

        <span className="input-group-btn">
          <button type="submit" className="btn btn-default">
            Submit
          </button>
        </span>
      </form>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchDoctor }, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchBar);
