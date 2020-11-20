// @flow
import React from 'react';
import { Link } from 'gatsby';

import './student.scss';

export default class StudentGridItem extends React.Component {

  render() {
    const student = this.props.student;
    return (
      <div className="grid-item">
        <Link to={student.url}>
          <div className="box interview-grid-item has-text-centered">
            <div className="interview-grid-item__avatar">
              <figure className="image is-96x96">
                <img
                  src={student.avatar}
                  alt={student.title}
                  style={{ width: 96, height: 96, borderRadius: '50%' }}
                />
              </figure>
            </div>
            <div style={{ marginBottom: 10 }}>
              <p className="title is-5">{student.name}</p>
              <p className="subtitle is-7">{student.position}</p>
            </div>
            <p className="has-text-grey">{student.title}</p>
          </div>
        </Link>
      </div>
    );
  }
}

