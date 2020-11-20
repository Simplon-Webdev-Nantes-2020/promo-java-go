import React from 'react';
import _ from 'lodash';
import CardGridItem from './studentGridItem'

export default class SectionContent extends React.Component {

  render() {
        let section = _.get(this.props, 'section', null);

        return (
          <div className="block-content">
            <div className="grid grid-col-8">
              {(section.students.sort((a,b) => a.order - b.order) || []).map(student => (
                <CardGridItem
                  student={student}
                  key={student.name}
                />
              ))}
            </div>
          </div>
        );
  }
}
