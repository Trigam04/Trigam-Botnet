module.exports = (hoistedOptions) => {
    var options = {};
    hoistedOptions.forEach(option => {
        options[option.name] = option.value;
    });
    return options;
}