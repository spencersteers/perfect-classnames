const tap = require('tap');
const createFromProps = require('./index').createFromProps;

tap.test('usage', function(tap) {
  const fromProps = createFromProps('FlexComponent', {
    direction: {
      prepend: true,
      values: ['row', 'column'],
    },
    size: ['small', 'medium', 'large'],
    wrap: true,
  });
  const classes = fromProps({
    direction: 'row',
    size: 'medium',
    wrap: true,
  });
  const expected = [
    'FlexComponent',
    'FlexComponent--directionRow',
    'FlexComponent--medium',
    'FlexComponent--wrap',
  ];
  tap.same(classes, expected);

  tap.end();
});

tap.test('config object - prepend prop name', function(tap) {
  const fromProps = createFromProps('Component', {
    size: {
      prepend: true,
      values: ['small', 'medium', 'large'],
    },
  });
  const classes = fromProps({
    size: 'small',
    direction: 'one',
  });
  tap.same(classes, ['Component', 'Component--sizeSmall']);

  tap.end();
});

tap.test('config object', function(tap) {
  const fromProps = createFromProps('Component', {
    size: {
      prepend: false,
      values: ['small', 'medium', 'large'],
    },
  });
  const classes = fromProps({
    size: 'small',
  });
  tap.same(classes, ['Component', 'Component--small']);

  tap.end();
});

tap.test('array', function(tap) {
  const fromProps = createFromProps('Component', {
    size: ['small', 'medium', 'large'],
    color: ['red', 'green', 'blue'],
  });
  const classes = fromProps({
    size: 'medium',
    color: 'red',
  });
  tap.same(classes, ['Component', 'Component--medium', 'Component--red']);

  tap.end();
});

tap.test('boolean - true', function(tap) {
  const fromProps = createFromProps('Component', {
    classWhenTrue: true,
  });

  const classesTrue = fromProps({
    classWhenTrue: true,
  });
  tap.same(classesTrue, ['Component', 'Component--classWhenTrue']);

  const classesFalse = fromProps({
    classWhenTrue: false,
  });
  tap.same(classesFalse, ['Component']);

  tap.end();
});

tap.test('boolean - false', function(tap) {
  const fromProps = createFromProps('Component', {
    classWhenFalse: false,
  });

  const classesFalse = fromProps({
    classWhenFalse: false,
  });
  tap.same(classesFalse, ['Component', 'Component--classWhenFalse']);

  const classesTrue = fromProps({
    classWhenFalse: true,
  });
  tap.same(classesTrue, ['Component']);

  tap.end();
});

tap.test('ignores', function(tap) {
  const fromProps = createFromProps('Component', {
    nullArray: [null],
    undefinedArray: [undefined],
    emptyArray: [],
    configEmptyArray: { includePropName: true, values: [] },
    propUndefined: undefined,
    propNull: null,
    valueString: 'string',
    valueNumber: 100.0,
  });

  const classes = fromProps({
    emptyArray: null,
    undefinedArray: undefined,
    emptyArray: null,
    configEmptyArray: undefined,
    propUndefined: undefined,
    propNull: null,
    valueString: 'string',
    valueNumber: 100.0,
  });
  tap.same(classes, ['Component']);

  tap.end();
});
