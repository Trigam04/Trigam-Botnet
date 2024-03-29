const moment = require('moment');
const ut = require('./utilitrigam.js');
const { ChannelType } = require('discord.js');
const channelType = require('../types/channelType.js');

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
        this.emb = null;
    };

    // MATH (SIMPLE)
    add(...nums) { return nums.reduce((a, b) => Number(a) + Number(b)) };
    sub (...nums) { return nums.reduce((a, b) => Number(a) - Number(b)) };
    subtract (...nums) { return this.sub(...nums) };
    mult (...nums) { return nums.reduce((a, b) => Number(a) * Number(b)) };
    multiply (...nums) { return this.mult(...nums) };
    div (...nums) { return nums.reduce((a, b) => Number(a) / Number(b)) };
    divide (...nums) { return this.div(...nums) };
    mod (...nums) { return nums.reduce((a, b) => Number(a) % Number(b)) };
    modulo (...nums) { return this.mod(...nums) };
    rem (...nums) { return nums.reduce((a, b) => Number(a) % Number(b)) };
    remainder (...nums) { return this.rem(...nums) };
    exponent (...nums) { return nums.reduce((a, b) => Number(a) ** Number(b)) };
    pow (...nums) { return this.exponent(...nums) };
    power (...nums) { return this.exponent(...nums) };
    round (num) { return Math.round(Number(num)) };
    fixed (num, n) { return Number.parseFloat(num).toFixed(n) };
    floor (num) { return Math.floor(Number(num)) };
    ceil (num) { return Math.ceil(Number(num)) };
    precise (num, places) { return Number(num).toPrecision(places) };
    trunc (num) { return Math.trunc(Number(num)) };
    truncate (num) { return this.truncate(num) };
    abs (num) { return Math.abs(Number(num)) };
    absolute (num) { return this.abs(num) };
    rng (min, max, seed) { return ut.rng(Number(max ? min : 1), Number(max ? max : min), seed) };
    random (min, max, seed) { return this.rng(min, max, seed) };
    clamp (num, min, max) { return ut.limit(Number(num), Number(min), Number(max)) };
    commafy (num, splitter) { return ut.commafy(num, splitter) };
    nth (num, exclude) { return ut.nthify(num, exclude) };
    nthify (num, exclude) { return this.nth(num, exclude) };
    pi () { return Math.PI };
    // MATH (ADVANCED)
    sqrt (num) { return Math.sqrt(Number(num)) };
    root (num, root) { return ut.root(Number(num), Number(root)) };
    log (num) { return Math.log10(Number(num)) };
    logbase (num, base) { return Math.log(Number(num)) / Math.log(Number(base)) };
    // base
    fact (num) {
        let rval = 1;
        for (let i = 2; i <= Number(num); i++) rval = rval * i;
        return rval;
    };
    factorial (num) { return this.fact(num) };
    cos (num) { return Math.cos(Number(num)) };
    cosh (num) { return Math.cosh(Number(num)) };
    acos (num) { return Math.acos(Number(num)) };
    acosh (num) { return Math.acosh(Number(num)) };
    sin (num) { return Math.sin(Number(num)) };
    sinh (num) { return Math.sinh(Number(num)) };
    asin (num) { return Math.asin(Number(num)) };
    asinh (num) { return Math.asinh(Number(num)) };
    tan (num) { return Math.tan(Number(num)) };
    tanh (num) { return Math.tanh(Number(num)) };
    atan (num) { return Math.atan(Number(num)) };
    atan2 (num1, num2) { return Math.atan2(Number(num1), Number(num2)) };
    atanh (num) { return Math.atanh(Number(num)) };
    // MATH (LOGIC)
    //and (...nums) { return ut.bitwise('and', nums) };
    //or (...nums) { return ut.bitwise('or', nums) };
    //xor (...nums) { return ut.bitwise('xor', nums) };
    //not (...nums) { return ut.bitwise('not', nums) };
    /*bit (num1, operator, num2) {
        switch (operator) {
            case 'and': return ut.bitwise('and', [ num1, num2 ]);
            case 'or': return ut.bitwise('or', [ num1, num2 ]);
            case 'xor': return ut.bitwise('xor', [ num1, num2 ]);
            case 'not': return ut.bitwise('not', [ num1 ]);
        };
    };*/
    /*bbit (num1, operator, num2) {
        switch (operator) {
            case 'and': return ut.bitwise('and', [ num1, num2 ], true);
            case 'or': return ut.bitwise('or', [ num1, num2 ], true);
            case 'xor': return ut.bitwise('xor', [ num1, num2 ], true);
            case 'not': return ut.bitwise('not', [ num1 ], true);
        };
    };*/
    less (num1, num2, orEqual) { return orEqual ? Number(num1 < num2 || num1 == num2).toString() : Number(num1 < num2).toString() };
    lessthan (num1, num2, orEqual) { return this.less(num1, num2, orEqual) };
    greater (num1, num2, orEqual) { return orEqual ? Number(num1 > num2 || num1 == num2).toString() : Number(num1 > num2).toString() };
    greaterthan (num1, num2, orEqual) { return this.greater(num1, num2, orEqual) };
    equal (num1, num2) { return Number(num1 === num2).toString() };
    equalto (num1, num2) { return this.equal(num1, num2) };

    // TEXT
    trim (text) { return text.trim() };
    test (text1, text2, match, noMatch) { 
        let matching = (text1?.trim() === text2?.trim());
        if (matching) return match?.trim();
        else if (!matching && noMatch) return noMatch?.trim();
        else return '';
    };
    length (text) { return text.length };
    upper (text) { return text.toUpperCase() };
    lower (text) { return text.toLowerCase() };
    capitalize (text, all) { return ut.toGrammarCase(text, all) };
    deform (text, alternating) { return alternating ? ut.toAlternatingCase(text) : ut.toRandomCase(text) };
    reverse (text) { return text.split('').reverse().join('') };
    repeat (text, times) { return text.repeat(times) };
    limit (string, num) { return string.slice(0, Math.abs(Number(num))) };
    split (string, index, splitter = ' ') { return string.split(splitter)[index] };
    url (text) { return encodeURIComponent(text) };
    urlify (text) { return this.url(text) };
    apos (text) { return ut.aposify(text) };
    aposify (text) { return this.apos(text) };
    slice (string, start, end) { return end ? string.slice(Math.abs(Number(start)), string.length - Math.abs(Number(end))) : string.slice(Math.abs(Number(start))) };
    unmark (...strings) { return ut.stripMarkdown(strings.join('')) };
    contains (string, substring) { return string.split(substring).length - 1 };
    spoiler (string) { return `||${string}||` };
    insert (string, chars, substring) { return ut.addItemEvery(string, substring, Number(chars)) };
    replace (string, find, replace, caseSensitive = false) { return caseSensitive ? string.split(find).join(replace) : string.split(find.toLowerCase()).join(replace.toLowerCase()) };
    multireplace (string, ...replacements) {
        let newString = string;
        for (let replacement of replacements) {
            let [ find, replace ] = replacement.split(':');
            newString = this.replace(newString, find, replace, true);
        };
        return newString;
    };
    regex (string, expression, index, captureGroups = false) {
        let regex = new RegExp(expression.replace(/❴/g, '{').replace(/❵/g, '}'), captureGroups ? '' : 'g');
        let result = string.match(regex);
        if (!result) return '';
        if (index) return result[Number(index)];
        return result;
    };
    regexreplace (string, expression, replace) { return string.replace(new RegExp(expression.replace(/❴/g, '{').replace(/❵/g, '}'), 'g'), replace) };

    // LIST
    params (list, splitter) { return list.split(splitter).join('|') };
    choose (...list) { return list[Math.floor(Math.random() * list.length)] };
    multichoose (results, splitter, ...list) {
        let chosen = [];
        let newList = list;
        for (let i = 0; i < results; i++) {
            let item = newList[Math.floor(Math.random() * newList.length)];
            chosen.push(item);
            newList = newList.filter(i => i !== item);
            if (newList.length === 0) newList = list;
        }
        return chosen.join(splitter);
    };
    empty (...list) { return list.find(i => i) || '' };
    before (index, splitter, ...list) { return list.slice(0, Math.abs(Number(index))).join(splitter) };
    after (index, splitter, ...list) { return list.slice(Math.abs(Number(index)) + 1).join(splitter) };
    diff (list1, list2, splitter, joiner) {
        let arr1 = list1.split(splitter);
        let arr2 = list2.split(splitter);
        return arr1.filter(x => !arr2.includes(x)).concat(arr2.filter(x => !arr1.includes(x))).join(joiner);
    };
    difference (list1, list2, splitter, joiner) { return this.diff(list1, list2, splitter, joiner) };
    intersect (list1, list2, splitter, joiner) { return list1.split(splitter).filter(x => list2.split(splitter).includes(x)).join(joiner) };
    union (list1, list2, splitter, joiner) { return list1.split(splitter).concat(list2.split(splitter).filter(x => !list1.split(splitter).includes(x))).join(joiner) }
    unite (list1, list2, splitter, joiner) { return this.union(list1, list2, splitter, joiner) };
    uniq (splitter, ...list) { return [...new Set(list)].join(splitter) };
    unique (splitter, ...list) { return this.uniq(splitter, ...list) };
    // UTILITY
    args (index) {
        if (!index) return this.argsArr ? this.argsArr.join(' ') : '';
        if (index == '#') return this.argsArr?.length;
        return this.argsArr ? this.argsArr[index] ? this.argsArr[index] : '' : '';
    };
    var (name, val) {
        if (val) { this.vars[name] = val; return '' };
        return this.vars[name];
    };
    switch (string, ...cases) {
        let defaultCase = cases.find(c => !c.includes(':')) || cases.find(c => c.split(':')[0]?.trim() === 'default');
        if (defaultCase && defaultCase.includes(':')) var defaultResult = defaultCase.split(':')[1]?.trim();
        else if (defaultCase && !defaultCase.includes(':')) var defaultResult = defaultCase.trim();
        let result = cases.find(c => c.split(':')[0]?.trim() === string.trim());
        return result ? result.split(':')[1]?.trim() : defaultResult ? defaultResult : '';
    };
    hexcolor (color) { return ut.getColor(color)?.hex };
    char (...codes) { return String.fromCharCode(...codes) };
    charcode (string) {
        let codes = [];
        for (let i = 0; i < string.length; i++) {
            codes.push(string.charCodeAt(i));
        }
        return codes.length === 1 ? codes[0] : codes;
    };
    date (formatting, offset, timestamp) {
        offset = (Number(offset) + 1);
        if (isNaN(offset)) offset = 1;
        let time = moment(timestamp ? timestamp : Date.now())
        return time.utcOffset(offset).format(formatting);
    };
    unix (divide) { return Math.floor(Date.now() / (divide ? 1000 : 1)) };

    // USER
    async user(user, property, ...properties) {
        if (!user) user = this.interaction.user.id;
        let member = ut.getMember(user, this.interaction, this.bot);
        if (!member) {
            properties.unshift(user);
            user = this.interaction.user.id;
            member = ut.getMember(user, this.interaction, this.bot);
        };
        if (!user || !member) return 'Invalid user!';
        let fetchedMember = await ut.forceFetchUser(member.user.id);
        switch (property) {
            case '@':
            case 'mention': {
                if (properties[0] == 'here') return '@here';
                if (properties[0] == 'everyone') return '@everyone';
                if (properties[0] == 'random' || properties[0] == 'someone') return `<@${ut.randomMember(this.interaction).user.id}>`;
                return member.user.toString() || '<@0>';
            };
            case 'name':
            case 'display':
            case 'displayname': return fetchedMember.display_name || 'Unknown';
            case 'username': return member.user.username || 'Unknown';
            case 'nick':
            case 'nickname': return member.nickname ? member.nickname : member.user.username || 'Unknown';
            case 'id': return member.user.id || 0;
            case 'bot': return member.user.bot || false;
            case 'pfp':
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
            case 'hasperm':
            case 'permission':
            case 'haspermission': return ut.memberHasPerm(member, properties[0]);
            case 'perms':
            case 'permissions': return member.permissions.bitfield;
            case 'joined':
            case 'joinedat': {
                let unit = properties[0] || 'timestamp';
                let date = member.joinedAt.getTime() || 0;
                return unit == 'timestamp' ? Math.round(date/1000) : ut.unitsSince(date, unit);
            };
            case 'created':
            case 'createdat': {
                let unit = properties[0] || 'timestamp';
                let date = member.user.createdAt.getTime() || 0;
                return unit == 'timestamp' ? Math.round(date/1000) : ut.unitsSince(date, unit);
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
    display (user) { return this.user(user, 'display') };
    displayname (user) { return this.user(user, 'displayname') };
    username (user) { return this.user(user, 'username') };
    nick (user) { return this.user(user, 'nick') };
    nickname (user) { return this.user(user, 'nickname') };
    id (user) { return this.user(user, 'id') };
    bot (user) { return this.user(user, 'bot') };
    pfp (user) { return this.user(user, 'pfp') };
    avatar (user) { return this.user(user, 'avatar') };
    hasrole (user, role) { return this.user(user, 'hasrole', role) };
    roles (user) { return this.user(user, 'roles') };
    color (user) { return this.user(user, 'color') };
    colour (user) { return this.user(user, 'colour') };
    rolecolor (user) { return this.user(user, 'rolecolor') };
    rolecolour (user) { return this.user(user, 'rolecolour') };
    status (user) { return this.user(user, 'status') };
    hasperm (user, perm) { return perm ? this.user(user, 'hasperm', perm) : this.user(this.interaction.member.id, 'hasperm', user) };
    permission (user, perm) { return this.hasperm(user, perm) };
    haspermission (user, perm) { return this.hasperm(user, perm) };
    perms (user) { return this.user(user, 'perms') };
    permissions (user) { return this.user(user, 'permissions') };
    joined (user, unit) { return unit ? this.user(user, 'joined', unit) : this.user(this.interaction.member.id, 'joined', user) };
    joinedat (user, unit) { return this.joined(user, unit) };
    created (user, unit) { return unit ? this.user(user, 'created', unit) : this.user(this.interaction.member.id, 'created', user) };
    createdat (user, unit) { return this.created(user, unit) };
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
            case '@':
            case 'tag':
            case 'mention': return role.toString();
            case 'color':
            case 'colour': return role.hexColor;
            case 'position': return role.position;
            case 'rawposition': return role.rawPosition;
            case 'hoist':
            case 'hoisted': return role.hoist;
            case 'mentionable': return role.mentionable;
            case 'external':
            case 'managed': return role.managed;
            case 'timestamp':
            case 'created':
            case 'createdat': {
                let unit = properties[0] || 'timestamp';
                let date = role.createdAt.getTime() || 0;
                return unit == 'timestamp' ? Math.round(date/1000) : ut.unitsSince(date, unit);
            };
            case 'editable': return role.editable;
            case 'members': return role.members.size;
            case 'permissions':
            case 'perms': return role.permissions.bitfield;
            default: return role.name;
        };
    };
    // Bot User
    client (property, ...properties) { return this.user(this.bot.user.id, property, ...properties) };
    // User funcs
    randomuser () { return ut.randomMember(this.interaction).user.id };

    // SERVER
    server (property, ...properties) {
        let server = this.interaction.guild;
        switch (property) {
            case 'name': return server.name;
            case 'id': return server.id;
            case 'icon': return server.iconURL();
            case 'members': return server.memberCount;
            case 'bots': return server.members.cache.filter(m => m.user.bot).size;
            case 'channels': switch (properties[0]) {
                case 'text': return server.channels.cache.filter(c => c.type == ChannelType.GuildText).size;
                case 'voice': return server.channels.cache.filter(c => c.type == ChannelType.GuildVoice).size;
                case 'category': return server.channels.cache.filter(c => c.type == ChannelType.GuildCategory).size;
                case 'news': return server.channels.cache.filter(c => c.type == ChannelType.GuildNews).size;
                case 'stage': return server.channels.cache.filter(c => c.type == ChannelType.GuildStageVoice).size;
                case 'thread': return server.channels.cache.filter(c => c.type == ChannelType.GuildPublicThread || c.type == ChannelType.GuildPrivateThread).size;
                default: return server.channels.cache.size;
            };
            // list all channels in the server
            case 'listchannels': {
                let type = properties[0] || 'all';
                let inputCategory = properties[1] || false;
                let splitter = properties[2] || ', ';
                let category, exclude, channels;

                if (inputCategory && inputCategory.startsWith('!')) {
                    category = ut.getChannel(inputCategory.slice(1), this.interaction) || false;
                    exclude = true;
                } else if (inputCategory) {
                    category = ut.getChannel(inputCategory, this.interaction) || false;
                    exclude = false;
                };

                // if category is specified, filter channels by category
                if (category) {
                    if (exclude) channels = server.channels.cache.filter(c => c.parentId != category.id);
                    else channels = server.channels.cache.filter(c => c.parentId == category.id);
                } else channels = server.channels.cache;

                switch (type) {
                    case 'text': channels = channels.filter(c => c.type == ChannelType.GuildText); break;
                    case 'voice': channels = channels.filter(c => c.type == ChannelType.GuildVoice); break;
                    case 'category': channels = channels.filter(c => c.type == ChannelType.GuildCategory); break;
                    case 'news': channels = channels.filter(c => c.type == ChannelType.GuildNews); break;
                    case 'stage': channels = channels.filter(c => c.type == ChannelType.GuildStageVoice); break;
                    case 'thread': channels = channels.filter(c => c.type == ChannelType.GuildPublicThread || c.type == ChannelType.GuildPrivateThread); break;
                };
                return channels.map(c => c.toString()).join(splitter);
            }
            case 'emojis': switch (properties[0]) {
                case 'animated': return server.emojis.cache.filter(e => e.animated).size;
                case 'normal':
                case 'still':
                case 'static': return server.emojis.cache.filter(e => !e.animated).size;
                default: return server.emojis.cache.size;
            };
            case 'stickers': return server.stickers.cache.size;
            case 'nitro':
            case 'boost': switch (properties[0]) {
                case 'tier':
                case 'tiers':
                case 'level':
                case 'levels': return server.premiumTier;
                case 'boosts':
                case 'amount':
                case 'count': return server.premiumSubscriptionCount;
            };
            case 'filter':
            case 'contentfilter':
            case 'explicitcontentfilter': switch (server.explicitContentFilter) {
                case 0: return 'Disabled';
                case 1: return 'MembersWithoutRoles';
                case 2: return 'AllMembers';
            };
            case 'verif':
            case 'verification':
            case 'verificationlevel': switch (server.verificationLevel) {
                case 0: return 'None';
                case 1: return 'Low';
                case 2: return 'Medium';
                case 3: return 'High';
                case 4: return 'VeryHigh';
            };
            case 'afk':
            case 'afkchannel': return server.afkChannelId || "None";
            case 'afktimeout': return server.afkTimeout;
            case 'systemchannel': return server.systemChannelId || "None";
            case 'notifs':
            case 'notifications': switch (server.defaultMessageNotifications) {
                case 0: return 'AllMessages';
                case 1: return 'OnlyMentions';
            };
            case 'created':
            case 'createdat': {
                let unit = properties[0] || 'timestamp';
                let date = server.createdAt.getTime() || 0;
                return unit == 'timestamp' ? Math.round(date/1000) : ut.unitsSince(date, unit);
            };
            case 'owner': return server.ownerId;
            case 'roles': return server.roles.cache.size;
            case 'filelimit':
            case 'uploadlimit': return ut.serverFileSizeLimit(this.interaction);
            case 'emojilimit': return ut.serverEmojiLimit(this.interaction);
            case 'stickerlimit':
            case 'stickerslimit': return ut.serverStickerLimit(this.interaction);
            case 'banner': return server.bannerURL() || "None";
            case 'description': return server.description || "None";
            case 'discovery':
            case 'discoverysplash': return server.discoverySplashURL() || "None";
            case 'features': switch (properties[0]) {
                case 'gifbanner':
                case 'animatedbanner': return server.features.includes('ANIMATED_BANNER');
                case 'gificon':
                case 'animatedicon': return server.features.includes('ANIMATED_ICON');
                case 'newcommandpermissions':
                case 'applicationcommandpermissionsv2': return server.features.includes('APPLICATION_COMMAND_PERMISSIONS_V2');
                case 'automod':
                case 'automoderation': return server.features.includes('AUTO_MODERATION');
                case 'banner': return server.features.includes('BANNER');
                case 'community': return server.features.includes('COMMUNITY');
                case 'creatormonetizable':
                case 'creatormonetizableprovisional': return server.features.includes('CREATOR_MONETIZABLE_PROVISIONAL');
                case 'storepage':
                case 'creatorstorepage': return server.features.includes('CREATOR_STORE_PAGE');
                case 'devsupportserver':
                case 'develeopersupportserver': return server.features.includes('DEVELOPER_SUPPORT_SERVER');
                case 'discoverable': return server.features.includes('DISCOVERABLE');
                case 'featurable': return server.features.includes('FEATURABLE');
                case 'directoryentry':
                case 'hasdirectoryentry': return server.features.includes('HAS_DIRECTORY_ENTRY');
                case 'hub': return server.features.includes('HUB');
                case 'splash':
                case 'invitesplash': return server.features.includes('INVITE_SPLASH');
                case 'invitesdisabled': return server.features.includes('INVITES_DISABLED');
                case 'linkedtohub': return server.features.includes('LINKED_TO_HUB');
                case 'verificationgate':
                case 'verificationgateenabled':
                case 'memberverificationgateenabled': return server.features.includes('MEMBER_VERIFICATION_GATE_ENABLED');
                case 'monetization':
                case 'monetizationenabled': return server.features.includes('MONETIZATION_ENABLED');
                case 'morestickers': return server.features.includes('MORE_STICKERS');
                case 'news': return server.features.includes('NEWS');
                case 'partnered': return server.features.includes('PARTNERED');
                case 'previewenabled': return server.features.includes('PREVIEW_ENABLED');
                case 'privatethreads': return server.features.includes('PRIVATE_THREADS');
                case 'relayenabled': return server.features.includes('RELAY_ENABLED');
                case 'roleicons': return server.features.includes('ROLE_ICONS');
                case 'rolesubscriptionsavailableforpurchase': return server.features.includes('ROLE_SUBSCRIPTIONS_AVAILABLE_FOR_PURCHASE');
                case 'rolesubscriptionsenabled': return server.features.includes('ROLE_SUBSCRIPTIONS_ENABLED');
                case 'ticketedeventsenabled': return server.features.includes('TICKETED_EVENTS_ENABLED');
                case 'vipregions': return server.features.includes('VIP_REGIONS');
                case 'vanityurl': return server.features.includes('VANITY_URL');
                case 'verified': return server.features.includes('VERIFIED');
                case 'welcomescreen':
                case 'welcomescreenenabled': return server.features.includes('WELCOME_SCREEN_ENABLED');
                default: return server.features.join(', ');
            };
            case 'splash': return server.splashURL() || "None";
            case 'invites': return server.invites.cache.size;
            case 'large': return server.large;
            case 'maxbitrate':
            case 'maxvoicebitrate':
            case 'bitratelimit':
            case 'voicebitratelimit':
            case 'maximumbitrate':
            case 'maximumvoicebitrate':
            case 'bitrate': return server.maximumBitrate;
            case 'maxmembers':
            case 'maxmemberslimit':
            case 'maximummembers':
            case 'maximummemberslimit':
            case 'memberslimit': return server.maximumMembers;
            case 'maxpresences':
            case 'maxpresenceslimit':
            case 'maximumpresences':
            case 'maximumpresenceslimit':
            case 'presenceslimit': return server.maximumPresences || "None";
            case 'nsfwlevel':
            case 'nsfw': switch(server.nsfwLevel) {
                case 0: return 'Default';
                case 1: return 'Explicit';
                case 2: return 'Safe';
                case 3: return 'AgeRestricted';
            };
            case 'partnered': return server.partnered;
            case 'communityupdateschannel':
            case 'communityupdates':
            case 'publicupdateschannel':
            case 'publicupdates': return server.publicUpdatesChannel ? server.publicUpdatesChannel.id : "None";
            case 'ruleschannel':
            case 'rules': return server.rulesChannel ? server.rulesChannel.id : "None";
            case 'vanityurl':
            case 'vanityinvite':
            case 'vanity': return server.vanityURLCode || "None";
            case 'vanityurluses':
            case 'vanityinviteuses':
            case 'vanityuses': return server.vanityURLUses || "None";
            case 'verified': return server.verified;
            case 'widgetchannel':
            case 'widget': return server.widgetChannel ? server.widgetChannel.id : "None";
        };
    };
    
    // CHANNEL
    channel (property, ...args) {
        let channel = this.interaction.channel;
        if (args[0] && ut.getChannel(args[0], this.interaction)) {
            channel = ut.getChannel(args[0], this.interaction);
            args = args.slice(1);
        };
        switch (property) {
            case 'name': return channel.name;
            case 'id': return channel.id;
            case 'topic': return channel.topic || "None";
            case 'type': return channelType[channel.type];
            case 'nsfw': return channel.nsfw;
            case 'parent':
            case 'category': return channel.parent ? channel.parent.id : "None";
            case 'tag': return channel.toString();
            case 'url': return channel.url;
            case 'ratelimit':
            case 'slowmode': return channel.rateLimitPerUser;
            case 'created':
            case 'createdat': {
                let unit = args[0] || 'timestamp';
                let date = channel.createdAt.getTime() || 0;
                return unit == 'timestamp' ? Math.round(date/1000) : ut.unitsSince(date, unit);
            };
            case 'thread': return channel.isThread();
            case 'manageable': return channel.manageable;
            case 'position': return channel.position;
            case 'rawposition': return channel.rawPosition;
            case 'viewable': return channel.viewable;
            case 'members': return Array.from(channel.members.keys()).length;
        }
    };

    // MESSAGE

    // COMPONENTS
    embed (property, ...args) {
        if (this.emb == null) this.emb = { fields: [] };
        switch (property) {
            case 'title': this.emb.title = args[0]; break;
            case 'description': this.emb.description = args[0]; break;
            case 'author': this.emb.author = {name: args[0], icon_url: args[1]}; break;
            case 'color': this.emb.color = ut.stringToHex(args[0]); break;
            case 'time':
            case 'timestamp': this.emb.timestamp = new Date(Number(args[0]) * 1000).toISOString(); break;
            case 'footer': this.emb.footer = {text: args[0], icon_url: args[1]}; break;
            case 'thumbnail': this.emb.thumbnail = {url: args[0]}; break;
            case 'image': this.emb.image = {url: args[0]}; break;
            case 'field': {
                let inline = args[2] ? true : false;
                this.emb.fields.push({
                    name: args[0] ? args[0] : "No name",
                    value: args[1] ? args[1] : "No value",
                    inline: inline
                });
                break;
            };
        };
        return "";
    };

    // FUNCTIONS
    // VERY EARLY PROTOTYPES
    send (channel, content) {
        let fetchedChannel = ut.getChannel(channel, this.interaction);
        if (!fetchedChannel) return "Invalid channel!";
        fetchedChannel.send({ content: content })
        return "";
    };
    async reply (channel, message, content) {
        let fetchedMessage = await ut.getMessage(channel, message, this.interaction);
        if (!fetchedMessage) return "Invalid message!";
        fetchedMessage.reply({ content: content })
        return "";
    };
};

module.exports = Bracketeer;