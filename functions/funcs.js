const ut = require('./utilitrigam.js');

class Bracketeer {
    constructor(args, bot, Discord, interaction) {
        // Input
        this.args = args;
        this.bot = bot;
        this.Discord = Discord;
        this.interaction = interaction;
        // Output
        this.ephemeral = false;
    };

    // MATH/NUMBERS
    // Math (Simple)
    add(...nums) { return nums.reduce((a, b) => Number(a) + Number(b)) };
    subtract (bot, ...nums) { return nums.reduce((a, b) => Number(a) - Number(b)) };
    multiply (bot, ...nums) { return nums.reduce((a, b) => Number(a) * Number(b)) };
    divide (bot, ...nums) { return nums.reduce((a, b) => Number(a) / Number(b)) };
    modulo (bot, ...nums) { return nums.reduce((a, b) => Number(a) % Number(b)) };
    remainder (bot, ...nums) { return nums.reduce((a, b) => Number(a) % Number(b)) };
    exponent (bot, ...nums) { return nums.reduce((a, b) => Number(a) ** Number(b)) };
    power (bot, ...nums) { return nums.reduce((a, b) => Number(a) ** Number(b)) };
    pow (bot, ...nums) { return nums.reduce((a, b) => Number(a) ** Number(b)) };
    round (bot, num) { return Math.round(Number(num)) };
    fixed (bot, num, n) { return Number.parseFloat(num).toFixed(n) };
    floor (bot, num) { return Math.floor(Number(num)) };
    ceil (bot, num) { return Math.ceil(Number(num)) };
    precise (bot, num, places) { return Number(num).toPrecision(places) };
    trunc (bot, num) { return Math.trunc(Number(num)) };
    truncate (bot, num) { return Math.trunc(Number(num)) };
    abs (bot, num) { return Math.abs(Number(num)) };
    absolute (bot, num) { return Math.abs(Number(num)) };
    random (bot, min, max, seed) { return ut.rng(Number(max ? min : 1), Number(max ? max : min), seed) };
    rng (bot, min, max, seed) { return ut.rng(Number(max ? min : 1), Number(max ? max : min), seed) };
    clamp (bot, num, min, max) { return ut.limit(Number(num), Number(min), Number(max)) };
    commafy (bot, num, splitter) { return ut.commafy(num, splitter) };
    nth (bot, num, exclude) { return ut.nthify(num, exclude) };
    nthify (bot, num, exclude) { return this.nth(num, exclude) };
    pi (bot) { return Math.PI };
    // Math (logic)
    //and (bot, ...nums) { return ut.bitwise('and', nums) };
    //or (bot, ...nums) { return ut.bitwise('or', nums) };
    //xor (bot, ...nums) { return ut.bitwise('xor', nums) };
    //not (bot, ...nums) { return ut.bitwise('not', nums) };
    /*bit (bot, num1, operator, num2) {
        switch (operator) {
            case 'and': return ut.bitwise('and', [ num1, num2 ]);
            case 'or': return ut.bitwise('or', [ num1, num2 ]);
            case 'xor': return ut.bitwise('xor', [ num1, num2 ]);
            case 'not': return ut.bitwise('not', [ num1 ]);
        };
    };*/
    /*bbit (bot, num1, operator, num2) {
        switch (operator) {
            case 'and': return ut.bitwise('and', [ num1, num2 ], true);
            case 'or': return ut.bitwise('or', [ num1, num2 ], true);
            case 'xor': return ut.bitwise('xor', [ num1, num2 ], true);
            case 'not': return ut.bitwise('not', [ num1 ], true);
        };
    };*/
    lessthan (bot, num1, num2, orEqual) { return orEqual ? Number(num1 < num2 || num1 == num2).toString() : Number(num1 < num2).toString() };
    less (bot, num1, num2, orEqual) { return orEqual ? Number(num1 < num2 || num1 == num2).toString() : Number(num1 < num2).toString() };
    greaterthan (bot, num1, num2, orEqual) { return orEqual ? Number(num1 > num2 || num1 == num2).toString() : Number(num1 > num2).toString() };
    greater (bot, num1, num2, orEqual) { return orEqual ? Number(num1 > num2 || num1 == num2).toString() : Number(num1 > num2).toString() };
    equalto (bot, num1, num2) { return Number(num1 === num2).toString() };
    equal (bot, num1, num2) { return Number(num1 === num2).toString() };
    // Math (complex)
    sqrt (bot, num) { return Math.sqrt(Number(num)) };
    root (bot, num, root) { return ut.root(Number(num), Number(root)) };
    // log
    // logbase
    // base
    // factorial
    // cos
    // cosh
    // acos
    // acosh
    // sin
    // sinh
    // asin
    // asinh
    // tan
    // tanh
    // atan
    // atanh

    // User
    async user(user, property, ...properties) {
        if (!user) user = this.interaction.user.id;
        let member = ut.getMember(user, this.interaction);
        if (!member) { properties.unshift(user); user = this.interaction.user.id; member = ut.getMember(user, this.interaction); }
        if (!user || !member) return 'Invalid user!';
        if (property == 'banner') member = ut.forceFetchUser(member.user.id);
        console.log(user, property, properties)
        switch (property) {
            case '@':
            case 'mention': {
                if (properties[0] == 'here') return '@here';
                if (properties[0] == 'everyone') return '@everyone';
                if (properties[0] == 'random' || properties[0] == 'someone') return `<@${ut.randomMember(this.interaction).user.id}>`;
                return member.user.toString();
            };
            case 'name':
            case 'username': return member.user.username;
            case 'tag': return member.user.tag;
            case 'nick':
            case 'nickname': return member.nickname ? member.nickname : member.user.username;
            case 'discrim':
            case 'discriminator': return member.user.discriminator;
            case 'id': return member.user.id;
            case 'bot': return member.user.bot;
            case 'avatar': return member.user.displayAvatarURL({ dynamic: true, size: 2048 });
            case 'hasrole': {
                if (!properties[0]) return 'Invalid role!';
                if (properties[0].toLowerCase() == 'everyone') return true;
                let role = ut.getRole(properties[0], this.interaction);
                if (!role) return 'Invalid role!';
                return member.roles.cache.has(role.id);
            };
        };
    };
    '@' (user) { return this.user(user, '@') };
    mention (user) { return this.user(user, 'mention') };
    name (user) { return this.user(user, 'name') };
    username (user) { return this.user(user, 'username') };
    tag (user) { return this.user(user, 'tag') };
    nick (user) { return this.user(user, 'nick') };
    nickname (user) { return this.user(user, 'nickname') };
    discrim (user) { return this.user(user, 'discrim') };
    discriminator (user) { return this.user(user, 'discriminator') };
    id (user) { return this.user(user, 'id') };
    bot (user) { return this.user(user, 'bot') };
    avatar (user) { return this.user(user, 'avatar') };
    hasrole (user, role) { return this.user(user, 'hasrole', role) };
    randomuser () { return ut.randomMember(this.interaction).user.id };
    // Bot User
    client (property, ...properties) { return this.user(this.bot.user.id, property, ...properties) };

    // Functions
    send (channel, content) {
        this.ephemeral = true;
        let fetchedChannel = ut.getChannel(channel, this.interaction);
        if (!fetchedChannel) return "Invalid channel!";
        fetchedChannel.send({ content: content })
        return "Sent message!";
    };
    async reply (channel, message, content) {
        this.ephemeral = true;
        let fetchedMessage = await ut.getMessage(channel, message, this.interaction);
        if (!fetchedMessage) return "Invalid message!";
        fetchedMessage.reply({ content: content })
        return "Replied to message!";
    };
};

module.exports = Bracketeer;


/*
?--| USER |--
{roles} / {hasroles} / {hasrole}
{color} / {colour} / {rolecolor} / {rolecolour}
{status}
{activity}
{permission} / {permissions} / {perms} / {perm}
{joined} / {joinedat}
{created} / {createdat} / {timestamp}
{bannable}
{kickable}
{nitro}
{role| highest, lowest, color, hoist, random }

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

?--| ROLE |--
{role|name}
{role|id}
{role|tag}
{role|color} / {role|colour}
{role|position}
{role|rawposition}
{role|hoisted}
{role|mentionable}
{role|external}
{role|created} / {role|createdat} / {role|timestamp}
{role|editable}
{role|server} / {role|guild}
{role|icon}
{role|managed}
{role|members}
{role|permissions} / {role|perms}
{role|emoji} / {role|emote} / {role|unicodeemoji} / {role|unicodeemote} / {role|unicode}

?--| TEXT |--
{args| #, [num] }
{var|name|val}
{global|name|val}
{trim| [string] }
{test| [string1] | [string2] | [match] | [no match] }
{length| [string] }
{upper| [string] }
{lower| [string] }
{capitalize| [string] | [title?] }
{deform| [string] | [alternate?] }
{reverse| [string] }
{repeat| [string] | [times] }
{replace| [string] | [replace this] | [with this] | [case sensitive?] }
{regex| [string] | [expression] | [num] | [capture groups?] }
{regexreplace| [string] | [replace this] | [with this] }
{limit| [string] | [num] }
{split| [string] | [splitter] }
{url| [string] } / {urlify| [string] }
{apos| [string] } / {apostrophe| [string] } / {aposify| [string] }
{slice| [string] | [start] | [end] }

?--| NUMBERS |--
--| Simple |--
{add| [nums] }
{subtract| [nums] } / {sub| [nums] }
{multiply| [nums] } / {mult| [nums] }
{divide| [nums] } / {div| [nums] }
{modulo| [nums] } / {mod| [nums] }
{remainder| [nums] } / {rem| [nums] }
{exponent| [nums] } / {power| [nums] } / {pow| [nums] }
{round| [num] }
{fixed| [num] | [digits] }
{floor| [num] }
{ceil| [num] }
{precise| [num] | [digits] }
{truncate| [num] | [digits] } / {trunc| [num] | [digits] }
{absolute| [num] } / {abs| [num] }
{random| [min] | [max] | [seed] } / {rand| [min] | [max] | [seed] } / {rng| [min] | [max] | [seed] }
{clamp| [num] | [min] | [max] }
{commafy| [num] }
{nth| [num] | [exclude?] } / {nthify| [num] | [exclude?]} / {ordinal| [num] | [exclude?] } / {ord| [num] | [exclude?] }
{pi}
--| Logic |--
{and| [nums] }
{or| [nums] }
{xor| [nums] }
{not| [num] }
{bit| [num1] | [operator] | [num2] }
{bbit| [num1] | [operator] | [num2] }
{lessthan| [num1] | [num2] | [or equal?] }
{greaterthan| [num1] | [num2] | [or equal?] }
--| Complex |--
{sqrt| [num] }
{root| [num] | [root] }
{log| [num] }
{logbase| [num] | [base] }
{base| [num] | [base] | [reverse?] }
{factorial| [num] }
{cos| [num] }
{cosh| [num] }
{acos| [num] }
{acosh| [num] }
{sin| [num] }
{sinh| [num] }
{asin| [num] }
{asinh| [num] }
{tan| [num] }
{tanh| [num] }
{atan| [num] }
{atanh| [num] }

?--| LISTS |--
{choose| [list] }
{multichoose| [num results] | [splitter] | [list] }
{params| [string] | [splitter] }
{empty| [list] }
{before| [num] | [splitter] | [list] }
{after| [num] | [splitter] | [list] }
{diff| [list1] | [list2] | [splitter] | [joiner] } / {difference| [list1] | [list2] | [splitter] | [joiner] }
{union| [list1] | [list2] | [splitter] | [joiner] } / {unite| [list1] | [list2] | [splitter] | [joiner] }
{unique| [list] | [joiner] } / {uniq| [list] | [joiner] }
{llength| [list] } / {listlength| [list] }
{at| [list] | [num] }
{fill| [list] | [num] | [filler] }
{includes| [list] | [item] }
{pop| [list] }
{shift| [list] }
{push| [list] | [item] }
{reverselist| [list] }
{sort| [list] | [type] | [reverse?] }

?--| UTILITY |--
{date| [formatting] | [offset] | [timestamp] }
{hexcolor| [color] | [hsl] }
{unix| [seconds?] }
{file| [url] }
{switch| [string] | [case1]:[result1] | [case2]:[result2] | [default]:[result3]... }
{emoji| [name] }

?--| COMPONENTS |--
{embed|title| [string] }
{embed|description| [string] }
{embed|author| [string] | [image URL] }
{embed|color| [color] }
{embed|time| [timestamp] }
{embed|footer| [string] | [image URL] }
{embed|thumbnail| [image URL] }
{embed|image| [image URL] }
{embed|field| [name] | [value] | [inline?] }

{button| [label] | [url] }

?--| FUNCTIONS |-- (fuck you colon these are cool)
{edit| [message ID] | [string] }
{delete| [message ID] }
{react| [message ID] | [emoji] }
{unreact| [message ID] | [emoji] }
{send| [channel ID] | [string] | [embed?] | [buttons?] | [file?] }
{reply| [message ID] | [string] | [embed?] | [buttons?] | [file?] }
{dm| [user ID] | [string] | [embed?] | [buttons?] | [file?] }
*/