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

csCrypto.sha1 = function(s){function U(a,b,c){while(0<c--)a.push(b)}function L(a,b){return(a<<b)|(a>>>(32-b))}function P(a,b,c){return a^b^c}function A(a,b){var c=(b&0xFFFF)+(a&0xFFFF),d=(b>>>16)+(a>>>16)+(c>>>16);return((d&0xFFFF)<<16)|(c&0xFFFF)}var B="0123456789abcdef";return(function(a){var c=[],d=a.length*4,e;for(var i=0;i<d;i++){e=a[i>>2]>>((3-(i%4))*8);c.push(B.charAt((e>>4)&0xF)+B.charAt(e&0xF))}return c.join('')}((function(a,b){var c,d,e,f,g,h=a.length,v=0x67452301,w=0xefcdab89,x=0x98badcfe,y=0x10325476,z=0xc3d2e1f0,M=[];U(M,0x5a827999,20);U(M,0x6ed9eba1,20);U(M,0x8f1bbcdc,20);U(M,0xca62c1d6,20);a[b>>5]|=0x80<<(24-(b%32));a[(((b+65)>>9)<<4)+15]=b;for(var i=0;i<h;i+=16){c=v;d=w;e=x;f=y;g=z;for(var j=0,O=[];j<80;j++){O[j]=j<16?a[j+i]:L(O[j-3]^O[j-8]^O[j-14]^O[j-16],1);var k=(function(a,b,c,d,e){var f=(e&0xFFFF)+(a&0xFFFF)+(b&0xFFFF)+(c&0xFFFF)+(d&0xFFFF),g=(e>>>16)+(a>>>16)+(b>>>16)+(c>>>16)+(d>>>16)+(f>>>16);return((g&0xFFFF)<<16)|(f&0xFFFF)})(j<20?(function(t,a,b){return(t&a)^(~t&b)}(d,e,f)):j<40?P(d,e,f):j<60?(function(t,a,b){return(t&a)^(t&b)^(a&b)}(d,e,f)):P(d,e,f),g,M[j],O[j],L(c,5));g=f;f=e;e=L(d,30);d=c;c=k}v=A(v,c);w=A(w,d);x=A(x,e);y=A(y,f);z=A(z,g)}return[v,w,x,y,z]}((function(t){var a=[],b=255,c=t.length*8;for(var i=0;i<c;i+=8){a[i>>5]|=(t.charCodeAt(i/8)&b)<<(24-(i%32))}return a}(s)).slice(),s.length*8))))}

csCrypto.sha256 = function(mode, data) {
    var blockLen = 64;
    var stateTable = [ 	0x6a09e667 , 0xbb67ae85 , 0x3c6ef372 , 0xa54ff53a ,
        0x510e527f , 0x9b05688c , 0x1f83d9ab , 0x5be0cd19 ];
    var stateLen = stateTable.length;

    var getMD = function(data) {
        var datz = [];
        if (isAry(data)) datz = data;
        else if (isStr(data)) datz = unpack(data);
        else "unknown type";
        datz = paddingData(datz);
        return round(datz);
    }

    var isAry = function(array) {
        return array && array.constructor === [].constructor;
    }

    var isStr = function(str) {
        return typeof(str) == typeof("string");
    }

    var rotr = function(v, s) { return (v >>> s) | (v << (32 - s)) };

    var S0 = function(v) { return rotr(v,  2) ^ rotr(v, 13) ^ rotr(v, 22) };
    var S1 = function(v) { return rotr(v,  6) ^ rotr(v, 11) ^ rotr(v, 25) };
    var s0 = function(v) { return rotr(v,  7) ^ rotr(v, 18) ^ (v >>>  3) };
    var s1 = function(v) { return rotr(v, 17) ^ rotr(v, 19) ^ (v >>> 10) };

    var ch = function(_b, _c, _d) { return (_b & _c) ^ (~_b & _d) };
    var maj = function(_b, _c, _d) { return (_b & _c) ^ (_b & _d) ^ (_c & _d) };

    var round = function(block) {
        var stt = [];
        var tempS= [];
        var i, j, temp1, temp2, x = [];
        for (j=0; j<stateLen; j++) stt[j] = stateTable[j];

        for (i=0; i<block.length; i+=blockLen)
        {
            for (j=0; j<stateLen; j++) tempS[j] = stt[j];
            x = toBigEndian32( block.slice(i, i+ blockLen) );
            for (j=16; j<64; j++)
                x[j] = s1(x[ j-2 ]) + x[ j-7 ] + s0(x[ j-15 ]) + x[ j-16 ];

            for (j=0; j<64; j++)
            {
                temp1 = stt[7] + S1(stt[4]) + ch( stt[4], stt[5], stt[6] ) + KTable[j] + x[j];
                temp2 = S0(stt[0]) + maj( stt[0], stt[1], stt[2] );

                stt[7] = stt[6];
                stt[6] = stt[5];
                stt[5] = stt[4];
                stt[4] = stt[3] + temp1;
                stt[3] = stt[2];
                stt[2] = stt[1];
                stt[1] = stt[0];
                stt[0] = temp1 + temp2;
            }
            for (j=0; j<stateLen; j++) stt[j] += tempS[j];
        }

        return fromBigEndian32(stt);
    }

    var paddingData = function(datas) {
        var dataLen = datas.length;
        var n = dataLen;
        datas[n++] = 0x80;
        while (n% blockLen != 56) datas[n++] = 0;
        dataLen *= 8;
        return datas.concat(0, 0, 0, 0, fromBigEndian32([dataLen]) );
    }

    var toHex = function(decs) {
        var i, hex = "";

        for (i=0; i<decs.length; i++)
            hex += (decs[i]>0xf?"":"0")+ decs[i].toString(16);
        return hex;
    }

    var fromBigEndian32 = function(block) {
        var temp = [];
        for (n=i=0; i<block.length; i++)
        {
            temp[n++] = (block[i] >>> 24) & 0xff;
            temp[n++] = (block[i] >>> 16) & 0xff;
            temp[n++] = (block[i] >>>  8) & 0xff;
            temp[n++] = block[i] & 0xff;
        }
        return temp;
    }

    var toBigEndian32 = function(block) {
        var temp = [];
        var i, n;
        for (n=i=0; i<block.length; i+=4, n++)
            temp[n] = (block[i]<<24) | (block[i+ 1]<<16) | (block[i+ 2]<<8) | block[i+ 3];
        return temp;
    }

    var unpack = function(data) {
        var i, n, c, temp = [];

        for (n=i=0; i<data.length; i++)
        {
            c = data.charCodeAt(i);
            if (c <= 0xff) temp[n++] = c;
            else {
                temp[n++] = c >>> 8;
                temp[n++] = c &  0xff;
            }
        }
        return temp;
    }

    var pack = function(array) {
        var i, temp = "";
        for (i in array) temp += String.fromCharCode(array[i]);
        return temp;
    }

    var KTable = [
        0x428a2f98 , 0x71374491 , 0xb5c0fbcf , 0xe9b5dba5 ,
        0x3956c25b , 0x59f111f1 , 0x923f82a4 , 0xab1c5ed5 ,
        0xd807aa98 , 0x12835b01 , 0x243185be , 0x550c7dc3 ,
        0x72be5d74 , 0x80deb1fe , 0x9bdc06a7 , 0xc19bf174 ,

        0xe49b69c1 , 0xefbe4786 , 0x0fc19dc6 , 0x240ca1cc ,
        0x2de92c6f , 0x4a7484aa , 0x5cb0a9dc , 0x76f988da ,
        0x983e5152 , 0xa831c66d , 0xb00327c8 , 0xbf597fc7 ,
        0xc6e00bf3 , 0xd5a79147 , 0x06ca6351 , 0x14292967 ,

        0x27b70a85 , 0x2e1b2138 , 0x4d2c6dfc , 0x53380d13 ,
        0x650a7354 , 0x766a0abb , 0x81c2c92e , 0x92722c85 ,
        0xa2bfe8a1 , 0xa81a664b , 0xc24b8b70 , 0xc76c51a3 ,
        0xd192e819 , 0xd6990624 , 0xf40e3585 , 0x106aa070 ,

        0x19a4c116 , 0x1e376c08 , 0x2748774c , 0x34b0bcb5 ,
        0x391c0cb3 , 0x4ed8aa4a , 0x5b9cca4f , 0x682e6ff3 ,
        0x748f82ee , 0x78a5636f , 0x84c87814 , 0x8cc70208 ,
        0x90befffa , 0xa4506ceb , 0xbef9a3f7 , 0xc67178f2
    ];

    if(mode == 'hex') {
        return toHex(getMD(data) );
    }
    else if(mode == 'dec') {
        return getMD(data);
    }
    else if(mode == 'bin') {
        return pack(getMD(data) );
    }

}
