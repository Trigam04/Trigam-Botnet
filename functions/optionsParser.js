module.exports = (hoisted) => {
    var options = {};
    for (let i = 0; i < hoisted.length; i++) options[hoisted[i].name] = hoisted[i].value;
    return options;
}
