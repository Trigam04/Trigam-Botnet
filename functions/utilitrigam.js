const functions = {
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
    progress: (currentVal, rangeMax, maxBarVal, emptyStr, fullStr, thumbStr) => { 
        let num = Math.round(functions.convertRange(currentVal, [0, rangeMax], [0, maxBarVal]));
        let diff = maxBarVal - num;
        var str = `${functions.repeat(fullStr, num - 1)}${num == 0 ? '' : thumbStr}${functions.repeat(emptyStr, diff)}`;
        return str;
    },
    convertRange: (value, r1, r2) => { return ( value - r1[0] ) * ( r2[1] - r2[0] ) / ( r1[1] - r1[0] ) + r2[0] },
    repeat: (text, num) => { if (!isNaN(Number(num)) && num !== undefined) return text.repeat(functions.limit(Number(num), 0, 500)); else return ''; },
    limit: (number, min = 0, max = 4294967296) => { return number < min ? min : number > max ? max : number; },
    unurban: (str, remove) => { return str.replace(/\[/g, remove ? '' : '__').replace(/\]/g, remove ? '' : '__') },
    fetchURL: async (url) => {
        let response = await fetch(url);
        let data = await response.json();
        return data;
    },
}
module.exports = functions;