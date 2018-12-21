function classMapFromValues(classPrefix, propName, values, prepend) {
  let mapValueToClassName = {};
  for (let i = 0; i < values.length; ++i) {
    let v = values[i];
    if (!v) continue;

    if (prepend) {
      let valueUpperCase = v.charAt(0).toUpperCase() + v.slice(1);
      mapValueToClassName[v] = classPrefix + propName + valueUpperCase;
    } else {
      mapValueToClassName[v] = classPrefix + v;
    }
  }
  return mapValueToClassName;
}

function classMapFromBoolean(classPrefix, propName, value) {
  let mapValueToClassName = {};
  mapValueToClassName[value] = classPrefix + propName;
  return mapValueToClassName;
}

function createFromProps(blockName, config) {
  let classPrefix = blockName + '--';
  let mapPropToValueClassNameMap = {};

  for (let propName in config) {
    let value = config[propName];
    if (value === null || value === undefined) continue;

    let valueType = typeof value;

    let classMap;
    if (valueType === 'boolean') {
      classMap = classMapFromBoolean(classPrefix, propName, value);
    } else if (Array.isArray(value) && value.length) {
      classMap = classMapFromValues(classPrefix, propName, value);
    } else if (valueType === 'object') {
      classMap = classMapFromValues(
        classPrefix,
        propName,
        value.values,
        value.prepend
      );
    } else {
      continue;
    }

    mapPropToValueClassNameMap[propName] = classMap;
  }

  let fromProps = function(props) {
    let classes = [];
    classes.push(blockName);
    for (let propName in mapPropToValueClassNameMap) {
      let propValue = props[propName];
      let className = mapPropToValueClassNameMap[propName][propValue];
      if (className) {
        classes.push(mapPropToValueClassNameMap[propName][propValue]);
      }
    }
    return classes;
  };

  return fromProps;
}

module.exports = {
  createFromProps: createFromProps,
};
