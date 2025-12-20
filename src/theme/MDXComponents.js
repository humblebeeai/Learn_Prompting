import React from 'react';
// Import the original mapper
import MDXComponents from '@theme-original/MDXComponents';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { AIOutput, AIInput } from './AIElement'; // Corrected import statement

import Admonition from '@theme/Admonition';

export default {
	// Re-use the default mapping
	...MDXComponents,
	LazyLoadImage,
	AIOutput,
	AIInput,
	Image: LazyLoadImage,
	Tip: (props) => <Admonition type="tip" {...props} />,
};
