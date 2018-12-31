import { configure, addDecorator } from '@storybook/react';





function loadStories() {
  require('../components/stories.js');
}

configure(loadStories, module);
