function stringToArray(text, splitter) {
    return text.split(splitter || ',');
}

module.exports = stringToArray;