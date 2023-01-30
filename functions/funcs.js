const ut = require('./utilitrigam.js');

class Bracketeer {
    constructor(argsArr, bot, Discord, interaction) {
        // Input
        this.argsArr = argsArr;
        this.bot = bot;
        this.Discord = Discord;
        this.interaction = interaction;
        this.vars = [];
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
        // if member is null, set user to the interaction user, set property to the user, and shift properties and add property to it
        if (!member) {
            properties.unshift(property);
            property = user;
            user = this.interaction.user.id;
            member = ut.getMember(user, this.interaction);
        };
        if (!user || !member) return 'Invalid user!';
        if (property == 'banner') var fetchedMember = await ut.forceFetchUser(member.user.id);
        switch (property) {
            case '@':
            case 'mention': {
                if (properties[0] == 'here') return '@here';
                if (properties[0] == 'everyone') return '@everyone';
                if (properties[0] == 'random' || properties[0] == 'someone') return `<@${ut.randomMember(this.interaction).user.id}>`;
                return member.user.toString() || '<@0>';
            };
            case 'name':
            case 'username': return member.user.username || 'Unknown';
            case 'tag': return member.user.tag || 'Unknown#0000';
            case 'nick':
            case 'nickname': return member.nickname ? member.nickname : member.user.username || 'Unknown';
            case 'discrim':
            case 'discriminator': return member.user.discriminator || '0000';
            case 'id': return member.user.id || 0;
            case 'bot': return member.user.bot || false;
            case 'avatar': return member.user.displayAvatarURL({ dynamic: true, size: 2048 }) || 'https://cdn.discordapp.com/embed/avatars/0.png';
            case 'hasrole': {
                if (!properties[0]) return 'Invalid role!';
                if (properties[0].toLowerCase() == 'everyone') return true;
                let role = ut.getRole(properties[0], this.interaction);
                if (!role) return 'Invalid role!';
                return member.roles.cache.has(role.id);
            };
            case 'roles': return member.roles.cache.size || 0;
            case 'color':
            case 'colour':
            case 'rolecolor':
            case 'rolecolour': return member.displayHexColor || "#000000";
            case 'status': return member.presence.status || 'offline';
            case 'activity': {
                if (member.presence) {
                    let activity = member.presence.activities[0];
                    return activity ? activity.name : 'None';
                } else return "None";
            };
            case 'hasperm':
            case 'haspermission': return ut.memberHasPerm(member, properties[0]);
            case 'perms':
            case 'permissions': return member.permissions.bitfield;
            case 'joined':
            case 'joinedat': {
                let unit = properties[0] || 'millis';
                let date = member.joinedAt.getTime() / 1000 || 0;
                return ut.unitsSince(date, unit);
            };
            case 'created':
            case 'createdat': {
                let unit = properties[0] || 'millis';
                let date = member.user.createdAt.getTime() / 1000 || 0;
                return ut.unitsSince(date, unit);
            };
            case 'bannable': return member.bannable;
            case 'kickable': return member.kickable;
            case 'banner': {
                let banner = `https://cdn.discordapp.com/banners/${member.user.id}/${fetchedMember.banner}.png?size=1024`
                return fetchedMember.banner ? banner : 'No Banner!';
            };
            case 'userrole': {
                if (!properties[0]) return 'Invalid property!';
                let roleList = Array.from(member.roles.cache.values());
                if (roleList.length == 1) return 'None';
                let posSort = roleList.sort((a, b) => b.position - a.position);
                let role;
                switch (properties[0]) {
                    case 'highest': role = member.roles.highest || 'None'; break;
                    case 'lowest': role = posSort[posSort.length - 2] || 'None'; break;
                    case 'color': role = member.roles.color || 'None'; break;
                    case 'hoist': role = member.roles.hoist || 'None'; break;
                    case 'random': role = ut.randomArray(posSort, 1)[0] || 'None'; break;
                    default: return 'Invalid property!';
                };
                if (role == 'None') return 'None';
                if (properties[1]) return this.role(role, properties[1], ...properties.slice(2));
                else return role.id || 0;
            };
            default: return member.user.username;
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
    roles (user) { return this.user(user, 'roles') };
    color (user) { return this.user(user, 'color') };
    colour (user) { return this.user(user, 'colour') };
    rolecolor (user) { return this.user(user, 'rolecolor') };
    rolecolour (user) { return this.user(user, 'rolecolour') };
    status (user) { return this.user(user, 'status') };
    activity (user) { return this.user(user, 'activity') };
    hasperm (user, perm) { return this.user(user, 'hasperm', perm) };
    haspermission (user, perm) { return this.user(user, 'haspermission', perm) };
    perms (user) { return this.user(user, 'perms') };
    permissions (user) { return this.user(user, 'permissions') };
    joined (user) { return this.user(user, 'joined') };
    joinedat (user) { return this.user(user, 'joinedat') };
    created (user) { return this.user(user, 'created') };
    createdat (user) { return this.user(user, 'createdat') };
    bannable (user) { return this.user(user, 'bannable') };
    kickable (user) { return this.user(user, 'kickable') };
    banner (user) { return this.user(user, 'banner') };
    userrole (user, property) { return this.user(user, 'user role', property) };
    role (role, property, ...properties) {
        role = ut.getRole(role, this.interaction);
        if (!role) return "Invalid role!";
        switch (property) {
            case 'name': return role.name;
            case 'id': return role.id;
            case 'color':
            case 'colour': return role.hexColor;
            case 'position': return role.position;
            case 'members': return role.members.size;
            case '@':
            case 'mention': return role.toString();
            case 'created':
            case 'createdat': {
                let unit = properties[0] || 'millis';
                let date = role.createdAt.getTime() / 1000 || 0;
                return ut.unitsSince(date, unit);
            };
            case 'hoist':
            case 'hoisted': return role.hoist;
            case 'managed': return role.managed;
            case 'mentionable': return role.mentionable;
            case 'permissions':
            case 'perms': return role.permissions.bitfield;
            default: return role.name;
        };
    }
    // User funcs
    randomuser () { return ut.randomMember(this.interaction).user.id };
    // Bot User
    client (property, ...properties) { return this.user(this.bot.user.id, property, ...properties) };
    // Utility
    args (index) { return this.argsArr ? this.argsArr[index] : null };
    var (name, val) {
        if (val) { this.vars[name] = val; return '' };
        return this.vars[name];
    }

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
{role|rawposition}
{role|external}
{role|editable}
{role|icon}
{role|managed}
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
--| Logic |--
{and| [nums] }
{or| [nums] }
{xor| [nums] }
{not| [num] }
{bit| [num1] | [operator] | [num2] }
{bbit| [num1] | [operator] | [num2] }
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