/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import "prism-themes/themes/prism-a11y-dark.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";

export function onInitialClientRender() {
    if ('onGatsbyInitialClientRender' in window && typeof window.onGatsbyInitialClientRender === 'function') {
        window.onGatsbyInitialClientRender();
    }
}

export function onRouteUpdate() {
    if ('onGatsbyRouteUpdate' in window && typeof window.onGatsbyRouteUpdate === 'function') {
        window.onGatsbyRouteUpdate();
    }
}

export function onPreRouteUpdate() {
    if ('onGatsbyPreRouteUpdate' in window && typeof window.onGatsbyPreRouteUpdate === 'function') {
        window.onGatsbyPreRouteUpdate();
    }
}
