import React from 'react';
import ReactDom from 'react-dom';

import HelloWorld from 'app/components/HelloWorld'

console.log('rendering from app.js');
ReactDom.render(<HelloWorld text="fromjs" />, document.getElementById('react-main-mount'));
