const ut = require('./utilitrigam.js');

module.exports = {
    // MATH/NUMBERS
    // Math (Simple)
    add: (...nums) => { return nums.reduce((a, b) => Number(a) + Number(b)) },
    subtract: (...nums) => { return nums.reduce((a, b) => Number(a) - Number(b)) },
    multiply: (...nums) => { return nums.reduce((a, b) => Number(a) * Number(b)) },
    divide: (...nums) => { return nums.reduce((a, b) => Number(a) / Number(b)) },
    exponent: (...nums) => { return nums.reduce((a, b) => Number(a) ** Number(b)) },
    power: (...nums) => { return nums.reduce((a, b) => Number(a) ** Number(b)) },
    pow: (...nums) => { return nums.reduce((a, b) => Number(a) ** Number(b)) },
    modulo: (...nums) => { return nums.reduce((a, b) => Number(a) % Number(b)) },
    remainder: (...nums) => { return nums.reduce((a, b) => Number(a) % Number(b)) },
    rng: (min, max, seed) => { return ut.rng(Number(max ? min : 1), Number(max ? max : min), seed) },
    pi: () => { return Math.PI },
    root: (num, root) => { return ut.root(Number(num), Number(root)) },
    // Math (logic)
    and: (...nums) => {
        let num = nums[0]; nums.shift();
        nums.map(x => num &= Number(x));
        return num;
    },
    or: (...nums) => {
        let num = nums[0]; nums.shift();
        nums.map(x => num |= Number(x));
        return num;
    },
    xor: (...nums) => {
        let num = nums[0]; nums.shift();
        nums.map(x => num ^= Number(x));
        return num;
    },
    not: (...nums) => {
        let num = !!+nums[0]; nums.shift();
        nums.map(x => num = num != !!+Number(x));
        return Number(!num);
    },
    bit: (num1, operator, num2) => {
        switch (operator.toLowerCase()) {
            case 'and': return Number(num1) & Number(num2);
            case 'or': return Number(num1) | Number(num2);
            case 'xor': return Number(num1) ^ Number(num2);
            case 'not': return ~Number(num1);
        }
    },
    bbit: (num1, operator, num2) => {
        num1 = parseInt(num1, 2);
        num2 = parseInt(num2, 2);
        var operated = 0;
        switch (operator.toLowerCase()) {
            case 'and': operated = Number(num1) & (num2); break;
            case 'or': operated = Number(num1) | Number(num2); break;
            case 'xor': operated = Number(num1) ^ Number(num2); break;
            case 'not': operated = ~Number(num1); break;
        }
        return operated.toString(2);
    },
    lessthan: (num1, num2) => { return Number(num1 < num2).toString() },
    less: (num1, num2) => { return Number(num1 < num2).toString() },
    greaterthan: (num1, num2) => { return Number(num1 > num2).toString() },
    greater: (num1, num2) => { return Number(num1 > num2).toString() },
    equalto: (num1, num2) => { return Number(num1 === num2).toString() },
    equal: (num1, num2) => { return Number(num1 === num2).toString() },
};


/*
?--| USER |--
{username} / {name}
{tag}
{@} / {mention}
{nickname} / {nick}
{discrim} / {discriminator}
{id}
{bot}
{avatar}
{roles} / {role} / {hasroles} / {hasrole}
{color} / {colour} / {rolecolor} / {rolecolour}
{status}
{activity}
{permission} / {permissions} / {perms} / {perm}
{joined} / {joinedat}
{created} / {createdat} / {timestamp}
{bannable}
{kickable}
{nitro}

?--| SERVER |--
{server|name}
{server|id}
{server|members}
{server|bots}
{server|channels| text, voice, category, news, store, stage, thread }
{server|emojis| normal, animated }
{server|stickers}
{server|boost| count, tier } / {server|nitro| count, tier }
{server|filter} / {server|contentfilter}
{server|verification} / {server|verificationlevel}
{server|notifs} / {server|notifications}
{server|created} / {server|createdat} / {server|timestamp}
{server|owner}
{server|icon}
{server|roles}
{server|filelimit} / {server|uploadlimit}
{server|emojilimit}
{server|region}
{server|afkchannel}
{server|afktimeout}
{server|banner}
{server|description}
{server|splash}
{server|invites}
{server|large}
{server|maxbitrate} / {server|bitratelimit} / {server|bitrate} / {server|maximumbitrate}
{server|maxmembers} / {server|memberlimit} / {server|maximummembers}
{server|maxpresences} / {server|presencelimit} / {server|maximumpresences}
{server|nsfw} / {server|nsfwlevel}
{server|partnered}
{server|publicupdates} / {server|publicupdateschannel}
{server|ruleschannel}
{server|systemchannel}
{server|vanityurl} / {server|vanity}
{server|vanityurluses} / {server|vanityuses}
{server|verified}
{server|widget} / {server|widgetchannel}

?--| CHANNEL |--
{channel|name}
{channel|id}
{channel|topic}
{channel|type}
{channel|nsfw}
{channel|category}
{channel|tag}
{channel|url}
{channel|slowmode}
{channel|members}
{channel|created}
{channel|thread}
{channel|manageable}
{channel|position}
{channel|rawposition}
{channel|viewable}

?--| MESSAGE |--
{message|id}
{message|content}
{message|timestamp} / {message|created} / {message|createdat}
{message|edited} / {message|editedat}
{message|tts} / {message|texttospeech}
{message|url}
{message|emojis}
{message|author}
{message|channel}
{message|server} / {message|guild}
{message|type}
{message|system}
{message|pinned}
{message|edited}
{message|attachments}
{message|embeds}
{message|mentions}
{message|reactions}
{message|editable}
{message|deletable}
{message|pinnable}
{message|components}
{message|cleancontent}
{message|crossposted}
{message|hasthread} / {message|thread}
{message|interaction}
{message|position}
{message|stickers}
{message|webhook}
*/