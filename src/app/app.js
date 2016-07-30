// moved required physical files
// -- -- -- -- -- -- -- -- -- -- -- -- --
import 'file?name=/public/index.ejs!../public/index.ejs';
// -- -- -- -- -- -- -- -- -- -- -- -- --

import React from 'react';
import ReactDom from 'react-dom';

import App from 'app/components/App';

ReactDom.render(<App />, document.getElementById('main'));
