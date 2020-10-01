import React from 'react';
import _ from 'lodash';
import { Link } from "gatsby"
import {graphql} from 'gatsby';

import components, {Layout} from '../components/index';

export const query = graphql`
  query($url: String) {
    sitePage(path: {eq: $url}) {
      id
    }
  }
`;

export default class NotFound extends React.Component {
    render() {
        return (
            <Layout {...this.props}>
                <h1>Page non trouvée</h1>
                <p>
                    <Link to="/">Retour à l'accueil</Link>
                </p>
            </Layout>
        );
    }
}
