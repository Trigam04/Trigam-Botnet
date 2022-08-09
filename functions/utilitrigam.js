module.exports = {
    // Vars
    collectFilter: (m) => m.author.id === interaction.author.id,
    // Functions
    nthify: (num, exclude) => {
        switch (Math.abs(Number(num)) % 10) {
            case 1: return exclude ? "st" : num + "st";
            case 2: return exclude ? "nd" : num + "nd";
            case 3: return exclude ? "rd" : num + "rd";
            default: return exclude ? "th" : num + "th";
        }; 
	},
    validURL: (str) => {
        var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
            '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return !!pattern.test(str);
    },
}