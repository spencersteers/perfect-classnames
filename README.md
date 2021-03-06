# Perfect Classnames [![Build Status](https://travis-ci.com/spencersteers/perfect-classnames.svg?branch=master)](https://travis-ci.com/spencersteers/perfect-classnames) [![Coverage Status](https://coveralls.io/repos/github/spencersteers/perfect-classnames/badge.svg?branch=master)](https://coveralls.io/github/spencersteers/perfect-classnames?branch=master)

React classnames made _Perfect_

## What is it?

A utility for generating class names in React. This library is made to be Perfect _for me_. As my css proclivities change this library will evolve with them in hopes of truly living up to it's name.

## Usage

`perfect-classnames` generates [BEM](http://getbem.com/) style class names from props.

```js
import { createFromProps } from 'perfect-classnames';

const fromProps = createFromProps(
  'FlexComponent', 
  {
    direction: {
      prepend: true,
      values: ['row', 'column'],
    },
    size: ['small', 'medium', 'large'],
    wrap: true,
  }
);

const FlexComponent = (props) => {
  let classes = fromProps(props);
  ...
};


<FlexComponent direction="row" size="small" wrap />
// ['FlexComponent', 'FlexComponent--directionRow', 'FlexComponent--medium', 'FlexComponent--wrap']

```
