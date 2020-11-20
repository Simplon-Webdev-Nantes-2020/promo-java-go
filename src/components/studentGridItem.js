// @flow
import React from 'react';
import { Link } from 'gatsby';

export default class StudentGridItem extends React.Component {

  render() {
    const student = this.props.student;
    return (
      <div className="grid-item">
        <Link to={student.url}>
          <div className="student-grid-item">
            <div className="interview-grid-item__avatar">
              <figure>
                <img
                  src={student.avatar}
                  alt={student.title}
                  style={{ width: 96, height: 96, borderRadius: '50%' }}
                />
              </figure>
            </div>
            <div style={{ marginBottom: 10 }}>
              <p className="name">{student.name}</p>
              <p className="position">{student.position}</p>
            </div>
            <p className="title">{student.title}</p>
          </div>
        </Link>
      </div>
    );
  }
}

