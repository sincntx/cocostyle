var csCrypto = {};

csCrypto.md5 = function(string, key, raw) {
    if (!key) {
        if (!raw) {
            return csCrypto.hex_md5(string);
        }
        return csCrypto.raw_md5(string);
    }
    if (!raw) {
        return csCrypto.hex_hmac_md5(key, string);
    }
    return csCrypto.raw_hmac_md5(key, string);
}

csCrypto.safe_add = function(x, y) {
    var lsw = (x & 0xFFFF) + (y & 0xFFFF),
        msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xFFFF);
}

csCrypto.bit_rol = function (num, cnt) {
    return (num << cnt) | (num >>> (32 - cnt));
}

csCrypto.md5_cmn = function(q, a, b, x, s, t) {
    return csCrypto.safe_add(csCrypto.bit_rol(csCrypto.safe_add(csCrypto.safe_add(a, q), csCrypto.safe_add(x, t)), s), b);
}

csCrypto.md5_ff = function(a, b, c, d, x, s, t) {
    return csCrypto.md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
}

csCrypto.md5_gg = function(a, b, c, d, x, s, t) {
    return csCrypto.md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
}

csCrypto.md5_hh = function(a, b, c, d, x, s, t) {
    return csCrypto.md5_cmn(b ^ c ^ d, a, b, x, s, t);
}

csCrypto.md5_ii = function(a, b, c, d, x, s, t) {
    return csCrypto.md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
}

csCrypto.binl_md5 = function(x, len) {
    /* append padding */
    x[len >> 5] |= 0x80 << (len % 32);
    x[(((len + 64) >>> 9) << 4) + 14] = len;

    var i, olda, oldb, oldc, oldd,
        a =  1732584193,
        b = -271733879,
        c = -1732584194,
        d =  271733878;

    for (i = 0; i < x.length; i += 16) {
        olda = a;
        oldb = b;
        oldc = c;
        oldd = d;

        a = csCrypto.md5_ff(a, b, c, d, x[i],       7, -680876936);
        d = csCrypto.md5_ff(d, a, b, c, x[i +  1], 12, -389564586);
        c = csCrypto.md5_ff(c, d, a, b, x[i +  2], 17,  606105819);
        b = csCrypto.md5_ff(b, c, d, a, x[i +  3], 22, -1044525330);
        a = csCrypto.md5_ff(a, b, c, d, x[i +  4],  7, -176418897);
        d = csCrypto.md5_ff(d, a, b, c, x[i +  5], 12,  1200080426);
        c = csCrypto.md5_ff(c, d, a, b, x[i +  6], 17, -1473231341);
        b = csCrypto.md5_ff(b, c, d, a, x[i +  7], 22, -45705983);
        a = csCrypto.md5_ff(a, b, c, d, x[i +  8],  7,  1770035416);
        d = csCrypto.md5_ff(d, a, b, c, x[i +  9], 12, -1958414417);
        c = csCrypto.md5_ff(c, d, a, b, x[i + 10], 17, -42063);
        b = csCrypto.md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
        a = csCrypto.md5_ff(a, b, c, d, x[i + 12],  7,  1804603682);
        d = csCrypto.md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
        c = csCrypto.md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
        b = csCrypto.md5_ff(b, c, d, a, x[i + 15], 22,  1236535329);

        a = csCrypto.md5_gg(a, b, c, d, x[i +  1],  5, -165796510);
        d = csCrypto.md5_gg(d, a, b, c, x[i +  6],  9, -1069501632);
        c = csCrypto.md5_gg(c, d, a, b, x[i + 11], 14,  643717713);
        b = csCrypto.md5_gg(b, c, d, a, x[i],      20, -373897302);
        a = csCrypto.md5_gg(a, b, c, d, x[i +  5],  5, -701558691);
        d = csCrypto.md5_gg(d, a, b, c, x[i + 10],  9,  38016083);
        c = csCrypto.md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
        b = csCrypto.md5_gg(b, c, d, a, x[i +  4], 20, -405537848);
        a = csCrypto.md5_gg(a, b, c, d, x[i +  9],  5,  568446438);
        d = csCrypto.md5_gg(d, a, b, c, x[i + 14],  9, -1019803690);
        c = csCrypto.md5_gg(c, d, a, b, x[i +  3], 14, -187363961);
        b = csCrypto.md5_gg(b, c, d, a, x[i +  8], 20,  1163531501);
        a = csCrypto.md5_gg(a, b, c, d, x[i + 13],  5, -1444681467);
        d = csCrypto.md5_gg(d, a, b, c, x[i +  2],  9, -51403784);
        c = csCrypto.md5_gg(c, d, a, b, x[i +  7], 14,  1735328473);
        b = csCrypto.md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);

        a = csCrypto.md5_hh(a, b, c, d, x[i +  5],  4, -378558);
        d = csCrypto.md5_hh(d, a, b, c, x[i +  8], 11, -2022574463);
        c = csCrypto.md5_hh(c, d, a, b, x[i + 11], 16,  1839030562);
        b = csCrypto.md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
        a = csCrypto.md5_hh(a, b, c, d, x[i +  1],  4, -1530992060);
        d = csCrypto.md5_hh(d, a, b, c, x[i +  4], 11,  1272893353);
        c = csCrypto.md5_hh(c, d, a, b, x[i +  7], 16, -155497632);
        b = csCrypto.md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
        a = csCrypto.md5_hh(a, b, c, d, x[i + 13],  4,  681279174);
        d = csCrypto.md5_hh(d, a, b, c, x[i],      11, -358537222);
        c = csCrypto.md5_hh(c, d, a, b, x[i +  3], 16, -722521979);
        b = csCrypto.md5_hh(b, c, d, a, x[i +  6], 23,  76029189);
        a = csCrypto.md5_hh(a, b, c, d, x[i +  9],  4, -640364487);
        d = csCrypto.md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
        c = csCrypto.md5_hh(c, d, a, b, x[i + 15], 16,  530742520);
        b = csCrypto.md5_hh(b, c, d, a, x[i +  2], 23, -995338651);

        a = csCrypto.md5_ii(a, b, c, d, x[i],       6, -198630844);
        d = csCrypto.md5_ii(d, a, b, c, x[i +  7], 10,  1126891415);
        c = csCrypto.md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
        b = csCrypto.md5_ii(b, c, d, a, x[i +  5], 21, -57434055);
        a = csCrypto.md5_ii(a, b, c, d, x[i + 12],  6,  1700485571);
        d = csCrypto.md5_ii(d, a, b, c, x[i +  3], 10, -1894986606);
        c = csCrypto.md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
        b = csCrypto.md5_ii(b, c, d, a, x[i +  1], 21, -2054922799);
        a = csCrypto.md5_ii(a, b, c, d, x[i +  8],  6,  1873313359);
        d = csCrypto.md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
        c = csCrypto.md5_ii(c, d, a, b, x[i +  6], 15, -1560198380);
        b = csCrypto.md5_ii(b, c, d, a, x[i + 13], 21,  1309151649);
        a = csCrypto.md5_ii(a, b, c, d, x[i +  4],  6, -145523070);
        d = csCrypto.md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
        c = csCrypto.md5_ii(c, d, a, b, x[i +  2], 15,  718787259);
        b = csCrypto.md5_ii(b, c, d, a, x[i +  9], 21, -343485551);

        a = csCrypto.safe_add(a, olda);
        b = csCrypto.safe_add(b, oldb);
        c = csCrypto.safe_add(c, oldc);
        d = csCrypto.safe_add(d, oldd);
    }
    return [a, b, c, d];
}

csCrypto.binl2rstr = function(input) {
    var i,
        output = '';
    for (i = 0; i < input.length * 32; i += 8) {
        output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xFF);
    }
    return output;
}

csCrypto.rstr2binl = function(input) {
    var i,
        output = [];
    output[(input.length >> 2) - 1] = undefined;
    for (i = 0; i < output.length; i += 1) {
        output[i] = 0;
    }
    for (i = 0; i < input.length * 8; i += 8) {
        output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << (i % 32);
    }
    return output;
}

csCrypto.rstr_md5 = function(s) {
    return csCrypto.binl2rstr(csCrypto.binl_md5(csCrypto.rstr2binl(s), s.length * 8));
}

csCrypto.rstr_hmac_md5 = function(key, data) {
    var i,
        bkey = csCrypto.rstr2binl(key),
        ipad = [],
        opad = [],
        hash;
    ipad[15] = opad[15] = undefined;
    if (bkey.length > 16) {
        bkey = csCrypto.binl_md5(bkey, key.length * 8);
    }
    for (i = 0; i < 16; i += 1) {
        ipad[i] = bkey[i] ^ 0x36363636;
        opad[i] = bkey[i] ^ 0x5C5C5C5C;
    }
    hash = csCrypto.binl_md5(ipad.concat(csCrypto.rstr2binl(data)), 512 + data.length * 8);
    return csCrypto.binl2rstr(binl_md5(opad.concat(hash), 512 + 128));
}

csCrypto.rstr2hex = function(input) {
    var hex_tab = '0123456789abcdef',
        output = '',
        x,
        i;
    for (i = 0; i < input.length; i += 1) {
        x = input.charCodeAt(i);
        output += hex_tab.charAt((x >>> 4) & 0x0F) +
            hex_tab.charAt(x & 0x0F);
    }
    return output;
}

csCrypto.str2rstr_utf8 = function(input) {
    return unescape(encodeURIComponent(input));
}

csCrypto.raw_md5 = function(s) {
    return csCrypto.rstr_md5(csCrypto.str2rstr_utf8(s));
}
csCrypto.hex_md5 = function(s) {
    return csCrypto.rstr2hex(csCrypto.raw_md5(s));
}
csCrypto.raw_hmac_md5 = function(k, d) {
    return csCrypto.rstr_hmac_md5(csCrypto.str2rstr_utf8(k), csCrypto.str2rstr_utf8(d));
}
csCrypto.hex_hmac_md5 = function(k, d) {
    return csCrypto.rstr2hex(csCrypto.raw_hmac_md5(k, d));
}
