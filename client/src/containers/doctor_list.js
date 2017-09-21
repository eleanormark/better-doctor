import React, { Component } from 'react';
import { connect } from 'react-redux';

class DoctorList extends Component {
  renderDoctor(data) {
    return (
      <tr key={data.npi}>
        <td>
          <img src={data.profile.image_url} />
        </td>
        <td width="150px">
          {data.profile.first_name} {data.profile.middle_name}{' '}
          {data.profile.last_name}, {data.profile.title}
        </td>
        <td> {data.profile.bio}</td>
      </tr>
    );
  }
  render() {
    if (this.props.doctor[0] === undefined) {
      return <div />;
    }

    return (
      <table className="table-hover">
        <tbody>{this.props.doctor[0].map(this.renderDoctor)}</tbody>
      </table>
    );
  }
}

function mapStateToProps(state) {
  return { doctor: state.doctor };
}

export default connect(mapStateToProps)(DoctorList);
