const seedrandom = require('seedrandom');
const bots = require('../config/bots.js');
const permissions = require('../types/permission.js');
const functions = {
    // Vars
    collectFilter: (m) => m.author.id === interaction.author.id,
    // Functions
    getMember: (user, interaction) => {
        var username = user.replace(/_/g, ' ');
		var user = interaction.guild.members.cache.find(user => user.id == username);
		if (!user) var user = interaction.guild.members.cache.find(user => user.user.username == username);
		if (!user) var user = interaction.guild.members.cache.find(user => user.nickname == username);
		return user ? user : null;
    },
    nthify: (num, exclude) => {
        switch (Math.abs(Number(num)) % 10) {
            case 1: return exclude ? "st" : num + "st";
            case 2: return exclude ? "nd" : num + "nd";
            case 3: return exclude ? "rd" : num + "rd";
            default: return exclude ? "th" : num + "th";
        }; 
	},
    commafy: (num, splitter) => { return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, splitter ? splitter : ","); },
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
    rng: (min, max) => { return min + Math.floor(Math.random() * ((max + 1) - min)) },
    root: (x, n) => { return (((x > 1 || x < -1) && n == 0) ? Infinity : ((x > 0 || x < 0) && n == 0) ? 1 : (x < 0 && n % 2 == 0) ? `${((x < 0 ? -x : x) ** (1 / n))}${"i"}` : (n == 3 && x < 0) ? -Math.cbrt(-x) : (x < 0) ? -((x < 0 ? -x : x) ** (1 / n)) : (n == 3 && x > 0 ? Math.cbrt(x) : (x < 0 ? -x : x) ** (1 / n))); },
    bitwise: (operator, nums, binary) => {
        // tau can you try and make this work
        return 'under development!';
    },
    decimalToBinary: (num) => { return (num >>> 0).toString(2) },
    binaryToDecimal: (num) => { return parseInt(num, 2) },
    ellipsify: (str, max) => { return str.length > max ? str.substring(0, max - 3) + '...' : str },
    canvasSetFont: (ctx, fontFamily, fontSize, color, outlineColor, outlineWidth, align) => {
        ctx.font = `${fontSize}px ${fontFamily}`;
        ctx.fillStyle = color;
        ctx.strokeStyle = outlineColor;
        ctx.lineWidth = outlineWidth;
        ctx.textAlign = align;
    },
    canvasSetShadow: (ctx, color, blur, offsetX, offsetY) => {
        ctx.shadowColor = color;
        ctx.shadowBlur = blur;
        ctx.shadowOffsetX = offsetX;
        ctx.shadowOffsetY = offsetY;
    },
    canvasWriteText: (ctx, text, x, y, outline) => {
        ctx.fillText(text, x, y);
        ctx.shadowOffsetX = ctx.shadowOffsetY = 0;
        if (outline) ctx.strokeText(text, x, y);
    },
    randomElem: (arr, seed) => {
        if (seed) return arr[seedrandom(seed)() * arr.length];
        else return arr[Math.floor(Math.random() * arr.length)];
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
    getRole: (role, interaction) => {
        let roleObj = interaction.guild.roles.cache.find(gRole => gRole.name.toLowerCase() == role.toLowerCase());
        if (!roleObj) roleObj = interaction.guild.roles.cache.find(gRole => gRole.id == role);
        return roleObj ? roleObj : null;
    },
    randomMember: (interaction) => {
        let member = interaction.guild.members.cache.random();
        return member;
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
    memberHasPerm: (user, perm) => {
        if (perm.startsWith('0x')) try { return user.permissions.has(perm); } catch { return false; };
        perm = perm.toLowerCase().replace(/ /g, '_');
		let matched = permissions[perm];
        if (!matched) return false;
        else try { return user.permissions.has(matched); } catch { return false; };
	},
    unitsSince: (unix, unit) => {
		let now = new Date();
		let then = new Date(unix * 1000);
		let difference = now.getTime() - then.getTime();
		if (!unix || !unit) return null;
		switch (unit) {
			case 'milliseconds':
			case 'millisecond':
            case 'millis': return difference;
			case 'seconds':
			case 'second': return Math.floor(difference / 1000)
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
    randomArray: (arr, amount) => {
        let newArr = [];
        for (let i = 0; i < amount; i++) {
            newArr.push(arr[Math.floor(Math.random() * arr.length)]);
        };
        return newArr;
    },
    getRole: (role, interaction) => {
        let roleObj = interaction.guild.roles.cache.find(gRole => gRole.name.toLowerCase() == role.toLowerCase());
        if (!roleObj) roleObj = interaction.guild.roles.cache.find(gRole => gRole.id == role);
        return roleObj ? roleObj : null;
    }
};
module.exports = functions;