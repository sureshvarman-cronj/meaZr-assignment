import { Route }   from 'react-router';
import React       from 'react';
import CoreLayout  from 'layouts/coreLayout';
import Home    from 'views/home-view.react';

export default (
    <Route component={CoreLayout}>
    	<Route name='Home' path='/' component={Home} />
    </Route>
);
