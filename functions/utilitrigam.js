const seedrandom = require('seedrandom');
const bots = require('../config/bots.js');
const permissions = require('../types/permission.js');
const colors = require('../types/color.js');
const functions = {
    // !Vars
    collectFilter: (m) => m.author.id === interaction.author.id,

    // !Functions
    // GETTERS/FETCHERS
    getMember: (user, interaction, bot) => {
        var username = user.toLowerCase();
		var found = bot.users.cache.find(user => user.id == username);
        // Get user
		if (!found) found = bot.users.cache.find(user => user.username.toLowerCase() == username);
		if (!found) found = interaction.guild.members.cache.find(member => member.nickname?.toLowerCase() == username);
        // Convert to member
        if (found) found = interaction.guild.members.cache.find(member => member.id == found.id);
        return found ? found : null;
    },
    getRole: (role, interaction) => {
        let roleObj = interaction.guild.roles.cache.find(gRole => gRole.name.toLowerCase() == role.toLowerCase());
        if (!roleObj) roleObj = interaction.guild.roles.cache.find(gRole => gRole.id == role);
        return roleObj ? roleObj : null;
    },
    getChannel: (channel, interaction) => {
        let channelObj = interaction.guild.channels.cache.find(gChannel => gChannel.name.toLowerCase() == channel.toLowerCase());
        if (!channelObj) channelObj = interaction.guild.channels.cache.find(gChannel => gChannel.id == channel);
        return channelObj ? channelObj : null;
    },
    getMessage: async (channel, message, interaction) => {
        let channelObj = functions.getChannel(channel, interaction);
        if (!channelObj) return null;
        let messageObj = await channelObj.messages.fetch(message);
        return messageObj ? messageObj : null;
    },
    fetchURL: async (url) => {
        let response = await fetch(url);
        let data = await response.json();
        return data;
    },
    forceFetchUser: async (id) => {
        let user = await fetch(`https://discord.com/api/v8/users/${id}`, {
            method: 'GET',
            headers: {
                Authorization: `Bot ${bots.ToolboxConfig.token}`
            }
        }).then(res => res.json());
        return user;
    },
    getColor: (name) => {
        name = name.replace(/ /g, '').toLowerCase();
        let color = colors.find(color => color.names.includes(name));
        return color ? color : null;
    },
    // STRING MANIPULATION
    nthify: (num, exclude) => {
        switch (Math.abs(Number(num)) % 10) {
            case 1: return exclude ? "st" : num + "st";
            case 2: return exclude ? "nd" : num + "nd";
            case 3: return exclude ? "rd" : num + "rd";
            default: return exclude ? "th" : num + "th";
        }; 
	},
    commafy: (num, splitter) => { return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, splitter ? splitter : ","); },
    repeat: (text, num) => { if (!isNaN(Number(num)) && num !== undefined) return text.repeat(functions.limit(Number(num), 0, 500)); else return ''; },
    limit: (number, min = 0, max = 4294967296) => { return number < min ? min : number > max ? max : number; },
    ellipsify: (str, max) => { return str.length > max ? str.substring(0, max - 3) + '...' : str },
    toFirstCase: (str) => {
		if (str.length < 2) return str;
		return str[0].toUpperCase() + str.slice(1).toLowerCase();
	},
	toGrammarCase: function (str, all) {
		if (!all) return this.toFirstCase(str);
		return str.split(' ').map(this.toFirstCase).join(' ');
	},
	toRandomCase: (str) => {
		nums = [];
		for (var i = 0; i < str.length; i++) nums.push(Math.floor(Math.random() * 2));
		return str.split('').map((char, i) => (nums[i] == 0) ? char.toLowerCase() : char.toUpperCase()).join('');
	},
	toAlternatingCase: (str) => {
		const arr = str.split("");
		const results = [];
		arr.map((char, index) => { if (index % 2 === 0) { results.push(char.toLowerCase()) } else { results.push(char.toUpperCase()) }});
		return results.join("");
	},
    aposify: (text) => {
		let list = text.split(' ');
		for (var word in list) { if (typeof list[word] == 'string') list[word] = (list[word][list[word].length - 1].toLowerCase() == 's') ? `${list[word]}'` : `${list[word]}'s` };
		return list.join(' ');
	},
    unurban: (str, remove) => { return str.replace(/\[/g, remove ? '' : '__').replace(/\]/g, remove ? '' : '__') },
    stripMarkdown: (text) => { return text.replace(/([*_~`#|])/g, '\\$1') },
    addItemEvery: (str, item, every) => {
        var newStr = "";
        for (let i = 0; i < str.length; i++) {
            if (i % every == 0) newStr += `${str.substring(i, i + every)}${item}`;
        };
        return newStr;
    },
    insertStr: (string, index, substr) => {
        if (index > 0) {
            return string.substring(0, index) + substr + string.substring(index, string.length);
        }
        return substr + string;
    },
    // STRING GENERATION
    progress: (currentVal, rangeMax, maxBarVal, emptyStr, fullStr, thumbStr) => { 
        let num = Math.round(functions.convertRange(currentVal, [0, rangeMax], [0, maxBarVal]));
        let diff = maxBarVal - num;
        var str = `${functions.repeat(fullStr, num - 1)}${num == 0 ? '' : thumbStr}${functions.repeat(emptyStr, diff)}`;
        return str;
    },
    // NUMBER MANIPULATION
    convertRange: (value, r1, r2) => { return ( value - r1[0] ) * ( r2[1] - r2[0] ) / ( r1[1] - r1[0] ) + r2[0] },
    // NUMBER GENERATION
    rng: (min, max) => { return min + Math.floor(Math.random() * ((max + 1) - min)) },
    unitsSince: (unix, unit) => {
		let now = new Date();
		let then = new Date(unix);
		let difference = now.getTime() - then.getTime();
		if (!unix || !unit) return null;
		switch (unit) {
			case 'milliseconds':
			case 'millisecond':
            case 'millis': return difference;
			case 'seconds':
			case 'second': return Math.round(difference / 1000)
			case 'minutes':
			case 'minute': return Math.floor(difference / (1000 * 60));
			case 'hours':
			case 'hour': return Math.floor(difference / (1000 * 60 * 60));
			case 'days':
			case 'day': return Math.floor(difference / (1000 * 60 * 60 * 24));
			case 'weeks':
			case 'week': return Math.floor(difference / (1000 * 60 * 60 * 24 * 7));
			case 'months':
			case 'month': return Math.floor(difference / (1000 * 60 * 60 * 24 * 7 * 4.34524));
			case 'years':
			case 'year': return Math.floor(difference / (1000 * 60 * 60 * 24 * 7 * 4.34524 * 12));
			case 'decades':
			case 'decade': return Math.floor(difference / (1000 * 60 * 60 * 24 * 7 * 4.34524 * 12 * 10));
			case 'centuries':
			case 'century': return Math.floor(difference / (1000 * 60 * 60 * 24 * 7 * 4.34524 * 12 * 10 * 100));
			case 'milleniums':
			case 'millenium': return Math.floor(difference / (1000 * 60 * 60 * 24 * 7 * 4.34524 * 12 * 10 * 100 * 10));
		};
    },
    // CALCULATION
    root: (x, n) => { return (((x > 1 || x < -1) && n == 0) ? Infinity : ((x > 0 || x < 0) && n == 0) ? 1 : (x < 0 && n % 2 == 0) ? `${((x < 0 ? -x : x) ** (1 / n))}${"i"}` : (n == 3 && x < 0) ? -Math.cbrt(-x) : (x < 0) ? -((x < 0 ? -x : x) ** (1 / n)) : (n == 3 && x > 0 ? Math.cbrt(x) : (x < 0 ? -x : x) ** (1 / n))); },
    bitwise: (operator, nums, binary) => {
        // tau can you try and make this work
        return 'under development!';
    },
    // CONVERSION
    decimalToBinary: (num) => { return (num >>> 0).toString(2) },
    binaryToDecimal: (num) => { return parseInt(num, 2) },
    stringToHex: (str) => { return parseInt("0x" + str.replace(/#/g, '').slice(0, 6)) },
    // VALIDATION
    validURL: (str) => {
        var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
            '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return !!pattern.test(str);
    },
    // RANDOM
    randomElem: (arr, seed) => {
        if (seed) return arr[Math.floor(seedrandom(seed).quick() * arr.length)];
        else return arr[Math.floor(Math.random() * arr.length)];
    },
    randomMember: (interaction) => {
        let member = interaction.guild.members.cache.random();
        return member;
    },
    randomArray: (arr, amount) => {
        let newArr = [];
        for (let i = 0; i < amount; i++) {
            newArr.push(arr[Math.floor(Math.random() * arr.length)]);
        };
        return newArr;
    },
    // FILE SHIT
    readTxt: async (attachment) => {
        if (attachment.contentType !== 'text/plain; charset=utf-8') return null;
        let response = await fetch(attachment.url);
        if (!response.ok) return null;
        return response.text();
    },
    // DISCORD DATA
    serverFileSizeLimit: (interaction) => {
        let guild = interaction.guild;
        let limit = 8;
        switch (guild.premiumTier) {
            case 2: limit = 50; break;
            case 3: limit = 100; break;
        };
        return limit;
    },
    serverEmojiLimit: (interaction) => {
        let guild = interaction.guild;
        let limit = 50;
        switch (guild.premiumTier) {
            case 1: limit = 100; break;
            case 2: limit = 150; break;
            case 3: limit = 250; break;
        };
        return limit;
    },
    serverStickerLimit: (interaction) => {
        let guild = interaction.guild;
        let limit = 5;
        switch (guild.premiumTier) {
            case 1: limit = 15; break;
            case 2: limit = 30; break;
            case 3: limit = 60; break;
        };
        return limit;
    },
    memberHasPerm: (user, perm) => {
        if (perm.startsWith('0x')) try { return user.permissions.has(perm); } catch { return false; };
        perm = perm.toLowerCase().replace(/ /g, '_');
		let matched = permissions[perm];
        if (!matched) return false;
        else try { return user.permissions.has(matched); } catch { return false; };
	},
};
module.exports = functions;