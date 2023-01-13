const ut = require('./utilitrigam.js');

module.exports = {
    // MATH/NUMBERS
    // Math (Simple)
    add: (...nums) => { return nums.reduce((a, b) => Number(a) + Number(b)) },
    subtract: (...nums) => { return nums.reduce((a, b) => Number(a) - Number(b)) },
    multiply: (...nums) => { return nums.reduce((a, b) => Number(a) * Number(b)) },
    divide: (...nums) => { return nums.reduce((a, b) => Number(a) / Number(b)) },
    modulo: (...nums) => { return nums.reduce((a, b) => Number(a) % Number(b)) },
    remainder: (...nums) => { return nums.reduce((a, b) => Number(a) % Number(b)) },
    exponent: (...nums) => { return nums.reduce((a, b) => Number(a) ** Number(b)) },
    power: (...nums) => { return nums.reduce((a, b) => Number(a) ** Number(b)) },
    pow: (...nums) => { return nums.reduce((a, b) => Number(a) ** Number(b)) },
    round: (num) => { return Math.round(Number(num)) },
    fixed: (num, n) => { return Number.parseFloat(num).toFixed(n) },
    floor: (num) => { return Math.floor(Number(num)) },
    ceil: (num) => { return Math.ceil(Number(num)) },
    precise: (num, places) => { return Number(num).toPrecision(places) },
    trunc: (num) => { return Math.trunc(Number(num)) },
    truncate: (num) => { return Math.trunc(Number(num)) },
    abs: (num) => { return Math.abs(Number(num)) },
    absolute: (num) => { return Math.abs(Number(num)) },
    random: (min, max, seed) => { return ut.rng(Number(max ? min : 1), Number(max ? max : min), seed) },
    rng: (min, max, seed) => { return ut.rng(Number(max ? min : 1), Number(max ? max : min), seed) },
    // clamp
    // commafy
    // nth
    pi: () => { return Math.PI },
    // Math (logic)
    //and: (...nums) => { return ut.bitwise('and', nums) },
    //or: (...nums) => { return ut.bitwise('or', nums) },
    //xor: (...nums) => { return ut.bitwise('xor', nums) },
    //not: (...nums) => { return ut.bitwise('not', nums) },
    /*bit: (num1, operator, num2) => {
        switch (operator) {
            case 'and': return ut.bitwise('and', [ num1, num2 ]);
            case 'or': return ut.bitwise('or', [ num1, num2 ]);
            case 'xor': return ut.bitwise('xor', [ num1, num2 ]);
            case 'not': return ut.bitwise('not', [ num1 ]);
        };
    },*/
    /*bbit: (num1, operator, num2) => {
        switch (operator) {
            case 'and': return ut.bitwise('and', [ num1, num2 ], true);
            case 'or': return ut.bitwise('or', [ num1, num2 ], true);
            case 'xor': return ut.bitwise('xor', [ num1, num2 ], true);
            case 'not': return ut.bitwise('not', [ num1 ], true);
        };
    },*/
    lessthan: (num1, num2, orEqual) => { return orEqual ? Number(num1 < num2 || num1 == num2).toString() : Number(num1 < num2).toString() },
    less: (num1, num2, orEqual) => { return orEqual ? Number(num1 < num2 || num1 == num2).toString() : Number(num1 < num2).toString() },
    greaterthan: (num1, num2, orEqual) => { return orEqual ? Number(num1 > num2 || num1 == num2).toString() : Number(num1 > num2).toString() },
    greater: (num1, num2, orEqual) => { return orEqual ? Number(num1 > num2 || num1 == num2).toString() : Number(num1 > num2).toString() },
    equalto: (num1, num2) => { return Number(num1 === num2).toString() },
    equal: (num1, num2) => { return Number(num1 === num2).toString() },
    // Math (complex)
    sqrt: (num) => { return Math.sqrt(Number(num)) },
    root: (num, root) => { return ut.root(Number(num), Number(root)) },
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