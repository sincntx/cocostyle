var csCrypto = {};

csCrypto.md5 = function (b, c, a) {
    if (!c) {
        if (!a) {
            return csCrypto.hex_md5(b)
        }
        return csCrypto.raw_md5(b)
    }
    if (!a) {
        return csCrypto.hex_hmac_md5(c, b)
    }
    return csCrypto.raw_hmac_md5(c, b)
};
csCrypto.safe_add = function (a, b) {
    var c = (a & 65535) + (b & 65535),
        d = (a >> 16) + (b >> 16) + (c >> 16);
    return (d << 16) | (c & 65535)
};
csCrypto.bit_rol = function (a, b) {
    return (a << b) | (a >>> (32 - b))
};
csCrypto.md5_cmn = function (f, e, c, h, d, g) {
    return csCrypto.safe_add(csCrypto.bit_rol(csCrypto.safe_add(csCrypto.safe_add(e, f), csCrypto.safe_add(h, g)), d), c)
};
csCrypto.md5_ff = function (h, e, f, i, k, g, j) {
    return csCrypto.md5_cmn((e & f) | ((~e) & i), h, e, k, g, j)
};
csCrypto.md5_gg = function (h, e, f, i, k, g, j) {
    return csCrypto.md5_cmn((e & i) | (f & (~i)), h, e, k, g, j)
};
csCrypto.md5_hh = function (h, e, f, i, k, g, j) {
    return csCrypto.md5_cmn(e ^ f ^ i, h, e, k, g, j)
};
csCrypto.md5_ii = function (h, e, f, i, k, g, j) {
    return csCrypto.md5_cmn(f ^ (e | (~i)), h, e, k, g, j)
};
csCrypto.binl_md5 = function (n, h) {
    n[h >> 5] |= 128 << (h % 32);
    n[(((h + 64) >>> 9) << 4) + 14] = h;
    var l, o, k, m, p, g = 1732584193,
        e = -271733879,
        f = -1732584194,
        j = 271733878;
    for (l = 0; l < n.length; l += 16) {
        o = g;
        k = e;
        m = f;
        p = j;
        g = csCrypto.md5_ff(g, e, f, j, n[l], 7, -680876936);
        j = csCrypto.md5_ff(j, g, e, f, n[l + 1], 12, -389564586);
        f = csCrypto.md5_ff(f, j, g, e, n[l + 2], 17, 606105819);
        e = csCrypto.md5_ff(e, f, j, g, n[l + 3], 22, -1044525330);
        g = csCrypto.md5_ff(g, e, f, j, n[l + 4], 7, -176418897);
        j = csCrypto.md5_ff(j, g, e, f, n[l + 5], 12, 1200080426);
        f = csCrypto.md5_ff(f, j, g, e, n[l + 6], 17, -1473231341);
        e = csCrypto.md5_ff(e, f, j, g, n[l + 7], 22, -45705983);
        g = csCrypto.md5_ff(g, e, f, j, n[l + 8], 7, 1770035416);
        j = csCrypto.md5_ff(j, g, e, f, n[l + 9], 12, -1958414417);
        f = csCrypto.md5_ff(f, j, g, e, n[l + 10], 17, -42063);
        e = csCrypto.md5_ff(e, f, j, g, n[l + 11], 22, -1990404162);
        g = csCrypto.md5_ff(g, e, f, j, n[l + 12], 7, 1804603682);
        j = csCrypto.md5_ff(j, g, e, f, n[l + 13], 12, -40341101);
        f = csCrypto.md5_ff(f, j, g, e, n[l + 14], 17, -1502002290);
        e = csCrypto.md5_ff(e, f, j, g, n[l + 15], 22, 1236535329);
        g = csCrypto.md5_gg(g, e, f, j, n[l + 1], 5, -165796510);
        j = csCrypto.md5_gg(j, g, e, f, n[l + 6], 9, -1069501632);
        f = csCrypto.md5_gg(f, j, g, e, n[l + 11], 14, 643717713);
        e = csCrypto.md5_gg(e, f, j, g, n[l], 20, -373897302);
        g = csCrypto.md5_gg(g, e, f, j, n[l + 5], 5, -701558691);
        j = csCrypto.md5_gg(j, g, e, f, n[l + 10], 9, 38016083);
        f = csCrypto.md5_gg(f, j, g, e, n[l + 15], 14, -660478335);
        e = csCrypto.md5_gg(e, f, j, g, n[l + 4], 20, -405537848);
        g = csCrypto.md5_gg(g, e, f, j, n[l + 9], 5, 568446438);
        j = csCrypto.md5_gg(j, g, e, f, n[l + 14], 9, -1019803690);
        f = csCrypto.md5_gg(f, j, g, e, n[l + 3], 14, -187363961);
        e = csCrypto.md5_gg(e, f, j, g, n[l + 8], 20, 1163531501);
        g = csCrypto.md5_gg(g, e, f, j, n[l + 13], 5, -1444681467);
        j = csCrypto.md5_gg(j, g, e, f, n[l + 2], 9, -51403784);
        f = csCrypto.md5_gg(f, j, g, e, n[l + 7], 14, 1735328473);
        e = csCrypto.md5_gg(e, f, j, g, n[l + 12], 20, -1926607734);
        g = csCrypto.md5_hh(g, e, f, j, n[l + 5], 4, -378558);
        j = csCrypto.md5_hh(j, g, e, f, n[l + 8], 11, -2022574463);
        f = csCrypto.md5_hh(f, j, g, e, n[l + 11], 16, 1839030562);
        e = csCrypto.md5_hh(e, f, j, g, n[l + 14], 23, -35309556);
        g = csCrypto.md5_hh(g, e, f, j, n[l + 1], 4, -1530992060);
        j = csCrypto.md5_hh(j, g, e, f, n[l + 4], 11, 1272893353);
        f = csCrypto.md5_hh(f, j, g, e, n[l + 7], 16, -155497632);
        e = csCrypto.md5_hh(e, f, j, g, n[l + 10], 23, -1094730640);
        g = csCrypto.md5_hh(g, e, f, j, n[l + 13], 4, 681279174);
        j = csCrypto.md5_hh(j, g, e, f, n[l], 11, -358537222);
        f = csCrypto.md5_hh(f, j, g, e, n[l + 3], 16, -722521979);
        e = csCrypto.md5_hh(e, f, j, g, n[l + 6], 23, 76029189);
        g = csCrypto.md5_hh(g, e, f, j, n[l + 9], 4, -640364487);
        j = csCrypto.md5_hh(j, g, e, f, n[l + 12], 11, -421815835);
        f = csCrypto.md5_hh(f, j, g, e, n[l + 15], 16, 530742520);
        e = csCrypto.md5_hh(e, f, j, g, n[l + 2], 23, -995338651);
        g = csCrypto.md5_ii(g, e, f, j, n[l], 6, -198630844);
        j = csCrypto.md5_ii(j, g, e, f, n[l + 7], 10, 1126891415);
        f = csCrypto.md5_ii(f, j, g, e, n[l + 14], 15, -1416354905);
        e = csCrypto.md5_ii(e, f, j, g, n[l + 5], 21, -57434055);
        g = csCrypto.md5_ii(g, e, f, j, n[l + 12], 6, 1700485571);
        j = csCrypto.md5_ii(j, g, e, f, n[l + 3], 10, -1894986606);
        f = csCrypto.md5_ii(f, j, g, e, n[l + 10], 15, -1051523);
        e = csCrypto.md5_ii(e, f, j, g, n[l + 1], 21, -2054922799);
        g = csCrypto.md5_ii(g, e, f, j, n[l + 8], 6, 1873313359);
        j = csCrypto.md5_ii(j, g, e, f, n[l + 15], 10, -30611744);
        f = csCrypto.md5_ii(f, j, g, e, n[l + 6], 15, -1560198380);
        e = csCrypto.md5_ii(e, f, j, g, n[l + 13], 21, 1309151649);
        g = csCrypto.md5_ii(g, e, f, j, n[l + 4], 6, -145523070);
        j = csCrypto.md5_ii(j, g, e, f, n[l + 11], 10, -1120210379);
        f = csCrypto.md5_ii(f, j, g, e, n[l + 2], 15, 718787259);
        e = csCrypto.md5_ii(e, f, j, g, n[l + 9], 21, -343485551);
        g = csCrypto.safe_add(g, o);
        e = csCrypto.safe_add(e, k);
        f = csCrypto.safe_add(f, m);
        j = csCrypto.safe_add(j, p)
    }
    return [g, e, f, j]
};
csCrypto.binl2rstr = function (c) {
    var b, a = "";
    for (b = 0; b < c.length * 32; b += 8) {
        a += String.fromCharCode((c[b >> 5] >>> (b % 32)) & 255)
    }
    return a
};
csCrypto.rstr2binl = function (c) {
    var b, a = [];
    a[(c.length >> 2) - 1] = undefined;
    for (b = 0; b < a.length; b += 1) {
        a[b] = 0
    }
    for (b = 0; b < c.length * 8; b += 8) {
        a[b >> 5] |= (c.charCodeAt(b / 8) & 255) << (b % 32)
    }
    return a
};
csCrypto.rstr_md5 = function (a) {
    return csCrypto.binl2rstr(csCrypto.binl_md5(csCrypto.rstr2binl(a), a.length * 8))
};
csCrypto.rstr_hmac_md5 = function (f, b) {
    var d, a = csCrypto.rstr2binl(f),
        e = [],
        g = [],
        c;
    e[15] = g[15] = undefined;
    if (a.length > 16) {
        a = csCrypto.binl_md5(a, f.length * 8)
    }
    for (d = 0; d < 16; d += 1) {
        e[d] = a[d] ^ 909522486;
        g[d] = a[d] ^ 1549556828
    }
    c = csCrypto.binl_md5(e.concat(csCrypto.rstr2binl(b)), 512 + b.length * 8);
    return csCrypto.binl2rstr(binl_md5(g.concat(c), 512 + 128))
};
csCrypto.rstr2hex = function (d) {
    var c = "0123456789abcdef",
        a = "",
        e, b;
    for (b = 0; b < d.length; b += 1) {
        e = d.charCodeAt(b);
        a += c.charAt((e >>> 4) & 15) + c.charAt(e & 15)
    }
    return a
};
csCrypto.str2rstr_utf8 = function (a) {
    return unescape(encodeURIComponent(a))
};
csCrypto.raw_md5 = function (a) {
    return csCrypto.rstr_md5(csCrypto.str2rstr_utf8(a))
};
csCrypto.hex_md5 = function (a) {
    return csCrypto.rstr2hex(csCrypto.raw_md5(a))
};
csCrypto.raw_hmac_md5 = function (a, b) {
    return csCrypto.rstr_hmac_md5(csCrypto.str2rstr_utf8(a), csCrypto.str2rstr_utf8(b))
};
csCrypto.hex_hmac_md5 = function (a, b) {
    return csCrypto.rstr2hex(csCrypto.raw_hmac_md5(a, b))
};

csCrypto.sha1 = function (s) {
    function U(a, b, c) {
        while (0 < c--) a.push(b)
    }
    function L(a, b) {
        return (a << b) | (a >>> (32 - b))
    }
    function P(a, b, c) {
        return a ^ b ^ c
    }
    function A(a, b) {
        var c = (b & 0xFFFF) + (a & 0xFFFF),
            d = (b >>> 16) + (a >>> 16) + (c >>> 16);
        return ((d & 0xFFFF) << 16) | (c & 0xFFFF)
    }
    var B = "0123456789abcdef";
    return (function (a) {
        var c = [],
            d = a.length * 4,
            e;
        for (var i = 0; i < d; i++) {
            e = a[i >> 2] >> ((3 - (i % 4)) * 8);
            c.push(B.charAt((e >> 4) & 0xF) + B.charAt(e & 0xF))
        }
        return c.join('')
    }((function (a, b) {
        var c, d, e, f, g, h = a.length,
            v = 0x67452301,
            w = 0xefcdab89,
            x = 0x98badcfe,
            y = 0x10325476,
            z = 0xc3d2e1f0,
            M = [];
        U(M, 0x5a827999, 20);
        U(M, 0x6ed9eba1, 20);
        U(M, 0x8f1bbcdc, 20);
        U(M, 0xca62c1d6, 20);
        a[b >> 5] |= 0x80 << (24 - (b % 32));
        a[(((b + 65) >> 9) << 4) + 15] = b;
        for (var i = 0; i < h; i += 16) {
            c = v;
            d = w;
            e = x;
            f = y;
            g = z;
            for (var j = 0, O = []; j < 80; j++) {
                O[j] = j < 16 ? a[j + i] : L(O[j - 3] ^ O[j - 8] ^ O[j - 14] ^ O[j - 16], 1);
                var k = (function (a, b, c, d, e) {
                    var f = (e & 0xFFFF) + (a & 0xFFFF) + (b & 0xFFFF) + (c & 0xFFFF) + (d & 0xFFFF),
                        g = (e >>> 16) + (a >>> 16) + (b >>> 16) + (c >>> 16) + (d >>> 16) + (f >>> 16);
                    return ((g & 0xFFFF) << 16) | (f & 0xFFFF)
                })(j < 20 ? (function (t, a, b) {
                    return (t & a) ^ (~t & b)
                }(d, e, f)) : j < 40 ? P(d, e, f) : j < 60 ? (function (t, a, b) {
                    return (t & a) ^ (t & b) ^ (a & b)
                }(d, e, f)) : P(d, e, f), g, M[j], O[j], L(c, 5));
                g = f;
                f = e;
                e = L(d, 30);
                d = c;
                c = k
            }
            v = A(v, c);
            w = A(w, d);
            x = A(x, e);
            y = A(y, f);
            z = A(z, g)
        }
        return [v, w, x, y, z]
    }((function (t) {
        var a = [],
            b = 255,
            c = t.length * 8;
        for (var i = 0; i < c; i += 8) {
            a[i >> 5] |= (t.charCodeAt(i / 8) & b) << (24 - (i % 32))
        }
        return a
    }(s)).slice(), s.length * 8))))
}

csCrypto.sha256 = function (f, l) {
    var s = 64;
    var j = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225];
    var v = j.length;
    var h = function (A) {
        var z = [];
        if (r(A)) {
            z = A
        } else {
            if (d(A)) {
                z = o(A)
            } else {
                "unknown type"
            }
        }
        z = x(z);
        return w(z)
    };
    var r = function (z) {
        return z && z.constructor === [].constructor
    };
    var d = function (z) {
        return typeof(z) == typeof("string")
    };
    var g = function (A, z) {
        return (A >>> z) | (A << (32 - z))
    };
    var e = function (z) {
        return g(z, 2) ^ g(z, 13) ^ g(z, 22)
    };
    var p = function (z) {
        return g(z, 6) ^ g(z, 11) ^ g(z, 25)
    };
    var a = function (z) {
        return g(z, 7) ^ g(z, 18) ^ (z >>> 3)
    };
    var m = function (z) {
        return g(z, 17) ^ g(z, 19) ^ (z >>> 10)
    };
    var y = function (z, B, A) {
        return (z & B) ^ (~z & A)
    };
    var t = function (z, B, A) {
        return (z & B) ^ (z & A) ^ (B & A)
    };
    var w = function (F) {
        var A = [];
        var D = [];
        var E, C, B, z, G = [];
        for (C = 0; C < v; C++) {
            A[C] = j[C]
        }
        for (E = 0; E < F.length; E += s) {
            for (C = 0; C < v; C++) {
                D[C] = A[C]
            }
            G = c(F.slice(E, E + s));
            for (C = 16; C < 64; C++) {
                G[C] = m(G[C - 2]) + G[C - 7] + a(G[C - 15]) + G[C - 16]
            }
            for (C = 0; C < 64; C++) {
                B = A[7] + p(A[4]) + y(A[4], A[5], A[6]) + q[C] + G[C];
                z = e(A[0]) + t(A[0], A[1], A[2]);
                A[7] = A[6];
                A[6] = A[5];
                A[5] = A[4];
                A[4] = A[3] + B;
                A[3] = A[2];
                A[2] = A[1];
                A[1] = A[0];
                A[0] = B + z
            }
            for (C = 0; C < v; C++) {
                A[C] += D[C]
            }
        }
        return k(A)
    };
    var x = function (A) {
        var z = A.length;
        var B = z;
        A[B++] = 128;
        while (B % s != 56) {
            A[B++] = 0
        }
        z *= 8;
        return A.concat(0, 0, 0, 0, k([z]))
    };
    var b = function (A) {
        var B, z = "";
        for (B = 0; B < A.length; B++) {
            z += (A[B] > 15 ? "" : "0") + A[B].toString(16)
        }
        return z
    };
    var k = function (A) {
        var z = [];
        for (n = i = 0; i < A.length; i++) {
            z[n++] = (A[i] >>> 24) & 255;
            z[n++] = (A[i] >>> 16) & 255;
            z[n++] = (A[i] >>> 8) & 255;
            z[n++] = A[i] & 255
        }
        return z
    };
    var c = function (C) {
        var B = [];
        var A, z;
        for (z = A = 0; A < C.length; A += 4, z++) {
            B[z] = (C[A] << 24) | (C[A + 1] << 16) | (C[A + 2] << 8) | C[A + 3]
        }
        return B
    };
    var o = function (D) {
        var B, C, A, z = [];
        for (C = B = 0; B < D.length; B++) {
            A = D.charCodeAt(B);
            if (A <= 255) {
                z[C++] = A
            } else {
                z[C++] = A >>> 8;
                z[C++] = A & 255
            }
        }
        return z
    };
    var u = function (z) {
        var A, B = "";
        for (A in z) {
            B += String.fromCharCode(z[A])
        }
        return B
    };
    var q = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298];
    if (f == "hex") {
        return b(h(l))
    } else {
        if (f == "dec") {
            return h(l)
        } else {
            if (f == "bin") {
                return u(h(l))
            }
        }
    }
};

(function(){
    var typeOf = this.typeOf = function (item) {
        if (item == null) return 'null';
        if (item.$family) return item.$family();

        if (item.nodeName) {
            if (item.nodeType == 1) return 'element';
            if (item.nodeType == 3) return (/\S/).test(item.nodeValue) ? 'textnode' : 'whitespace';
        } else if (typeof item.length == 'number') {
            if (item.callee) return 'arguments';
            if ('item' in item) return 'collection';
        }

        return typeof item;
    };

    var instanceOf = this.instanceOf = function (item, object) {
        if (item == null) return false;
        var constructor = item.$constructor || item.constructor;
        while (constructor) {
            if (constructor === object) return true;
            constructor = constructor.parent;
        }
        return item instanceof object;
    };

// Function overloading

    var Function = this.Function;

    var enumerables = true;
    for (var i in {toString: 1}) enumerables = null;
    if (enumerables) enumerables = ['hasOwnProperty', 'valueOf', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'constructor'];

    Function.prototype.overloadSetter = function (usePlural) {
        var self = this;
        return function (a, b) {
            if (a == null) return this;
            if (usePlural || typeof a != 'string') {
                for (var k in a) self.call(this, k, a[k]);
                if (enumerables) for (var i = enumerables.length; i--;) {
                    k = enumerables[i];
                    if (a.hasOwnProperty(k)) self.call(this, k, a[k]);
                }
            } else {
                self.call(this, a, b);
            }
            return this;
        };
    };

    Function.prototype.overloadGetter = function (usePlural) {
        var self = this;
        return function (a) {
            var args, result;
            if (usePlural || typeof a != 'string') args = a;
            else if (arguments.length > 1) args = arguments;
            if (args) {
                result = {};
                for (var i = 0; i < args.length; i++) result[args[i]] = self.call(this, args[i]);
            } else {
                result = self.call(this, a);
            }
            return result;
        };
    };

    Function.prototype.extend = function (key, value) {
        this[key] = value;
    }.overloadSetter();

    Function.prototype.implement = function (key, value) {
        this.prototype[key] = value;
    }.overloadSetter();

// From

    var slice = Array.prototype.slice;

    Function.from = function (item) {
        return (typeOf(item) == 'function') ? item : function () {
            return item;
        };
    };

    Array.from = function (item) {
        if (item == null) return [];
        return (Type.isEnumerable(item) && typeof item != 'string') ? (typeOf(item) == 'array') ? item : slice.call(item) : [item];
    };

    Number.from = function (item) {
        var number = parseFloat(item);
        return isFinite(number) ? number : null;
    };

    String.from = function (item) {
        return item + '';
    };

// hide, protect

    Function.implement({

        hide: function () {
            this.$hidden = true;
            return this;
        },

        protect: function () {
            this.$protected = true;
            return this;
        }

    });

// Type
    var Type = this.Type = function (name, object) {
        if (name) {
            var lower = name.toLowerCase();
            var typeCheck = function (item) {
                return (typeOf(item) == lower);
            };

            Type['is' + name] = typeCheck;
            if (object != null) {
                object.prototype.$family = (function () {
                    return lower;
                }).hide();

            }
        }

        if (object == null) return null;

        object.extend(this);
        object.$constructor = Type;
        object.prototype.$constructor = object;

        return object;
    };

    var toString = Object.prototype.toString;

    Type.isEnumerable = function (item) {
        return (item != null && typeof item.length == 'number' && toString.call(item) != '[object Function]' );
    };

    var hooks = {};

    var hooksOf = function (object) {
        var type = typeOf(object.prototype);
        return hooks[type] || (hooks[type] = []);
    };

    var implement = function (name, method) {
        if (method && method.$hidden) return;

        var hooks = hooksOf(this);

        for (var i = 0; i < hooks.length; i++) {
            var hook = hooks[i];
            if (typeOf(hook) == 'type') implement.call(hook, name, method);
            else hook.call(this, name, method);
        }

        var previous = this.prototype[name];
        if (previous == null || !previous.$protected) this.prototype[name] = method;

        if (this[name] == null && typeOf(method) == 'function') extend.call(this, name, function (item) {
            return method.apply(item, slice.call(arguments, 1));
        });
    };

    var extend = function (name, method) {
        if (method && method.$hidden) return;
        var previous = this[name];
        if (previous == null || !previous.$protected) this[name] = method;
    };

    Type.implement({

        implement: implement.overloadSetter(),

        extend: extend.overloadSetter(),

        alias: function (name, existing) {
            implement.call(this, name, this.prototype[existing]);
        }.overloadSetter(),

        mirror: function (hook) {
            hooksOf(this).push(hook);
            return this;
        }

    });

    new Type('Type', Type);

// Default Types

var force = function(name, object, methods){
    var isType = (object != Object),
        prototype = object.prototype;

    if (isType) object = new Type(name, object);

    for (var i = 0, l = methods.length; i < l; i++){
        var key = methods[i],
            generic = object[key],
            proto = prototype[key];

        if (generic) generic.protect();

        if (isType && proto){
            delete prototype[key];
            prototype[key] = proto.protect();
        }
    }

    if (isType) object.implement(prototype);

    return force;
};

force('String', String, [
    'charAt', 'charCodeAt', 'concat', 'indexOf', 'lastIndexOf', 'match', 'quote', 'replace', 'search',
    'slice', 'split', 'substr', 'substring', 'trim', 'toLowerCase', 'toUpperCase'
])('Array', Array, [
    'pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift', 'concat', 'join', 'slice',
    'indexOf', 'lastIndexOf', 'filter', 'forEach', 'every', 'map', 'some', 'reduce', 'reduceRight'
])('Number', Number, [
    'toExponential', 'toFixed', 'toLocaleString', 'toPrecision'
])('Function', Function, [
    'apply', 'call', 'bind'
])('RegExp', RegExp, [
    'exec', 'test'
])('Object', Object, [
    'create', 'defineProperty', 'defineProperties', 'keys',
    'getPrototypeOf', 'getOwnPropertyDescriptor', 'getOwnPropertyNames',
    'preventExtensions', 'isExtensible', 'seal', 'isSealed', 'freeze', 'isFrozen'
])('Date', Date, ['now']);

Object.extend = extend.overloadSetter();

Date.extend('now', function(){
    return +(new Date);
});

new Type('Boolean', Boolean);

// fixes NaN returning as Number

Number.prototype.$family = function(){
    return isFinite(this) ? 'number' : 'null';
}.hide();

// Number.random

Number.extend('random', function(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
});

// forEach, each

var hasOwnProperty = Object.prototype.hasOwnProperty;
Object.extend('forEach', function(object, fn, bind){
    for (var key in object){
        if (hasOwnProperty.call(object, key)) fn.call(bind, object[key], key, object);
    }
});

Object.each = Object.forEach;

Array.implement({

    forEach: function(fn, bind){
        for (var i = 0, l = this.length; i < l; i++){
            if (i in this) fn.call(bind, this[i], i, this);
        }
    },

    each: function(fn, bind){
        Array.forEach(this, fn, bind);
        return this;
    }

});

// Array & Object cloning, Object merging and appending

var cloneOf = function(item){
    switch (typeOf(item)){
        case 'array': return item.clone();
        case 'object': return Object.clone(item);
        default: return item;
    }
};

Array.implement('clone', function(){
    var i = this.length, clone = new Array(i);
    while (i--) clone[i] = cloneOf(this[i]);
    return clone;
});

var mergeOne = function(source, key, current){
    switch (typeOf(current)){
        case 'object':
            if (typeOf(source[key]) == 'object') Object.merge(source[key], current);
            else source[key] = Object.clone(current);
            break;
        case 'array': source[key] = current.clone(); break;
        default: source[key] = current;
    }
    return source;
};

Object.extend({

    merge: function(source, k, v){
        if (typeOf(k) == 'string') return mergeOne(source, k, v);
        for (var i = 1, l = arguments.length; i < l; i++){
            var object = arguments[i];
            for (var key in object) mergeOne(source, key, object[key]);
        }
        return source;
    },

    clone: function(object){
        var clone = {};
        for (var key in object) clone[key] = cloneOf(object[key]);
        return clone;
    },

    append: function(original){
        for (var i = 1, l = arguments.length; i < l; i++){
            var extended = arguments[i] || {};
            for (var key in extended) original[key] = extended[key];
        }
        return original;
    }

});

// Object-less types

['Object', 'WhiteSpace', 'TextNode', 'Collection', 'Arguments'].each(function(name){
    new Type(name);
});

// Unique ID

var UID = Date.now();

String.extend('uniqueID', function(){
    return (UID++).toString(36);
});

})();

    /*
     ---

     name: Class

     description: Contains the Class Function for easily creating, extending, and implementing reusable Classes.

     license: MIT-style license.

     requires: [Array, String, Function, Number]

     provides: Class

     ...
     */

    (function () {

        var Class = this.Class = new Type('Class', function (params) {
            if (instanceOf(params, Function)) params = {initialize: params};

            var newClass = function () {
                reset(this);
                if (newClass.$prototyping) return this;
                this.$caller = null;
                var value = (this.initialize) ? this.initialize.apply(this, arguments) : this;
                this.$caller = this.caller = null;
                return value;
            }.extend(this).implement(params);

            newClass.$constructor = Class;
            newClass.prototype.$constructor = newClass;
            newClass.prototype.parent = parent;

            return newClass;
        });

        var parent = function () {
            if (!this.$caller) throw new Error('The method "parent" cannot be called.');
            var name = this.$caller.$name,
                parent = this.$caller.$owner.parent,
                previous = (parent) ? parent.prototype[name] : null;
            if (!previous) throw new Error('The method "' + name + '" has no parent.');
            return previous.apply(this, arguments);
        };

        var reset = function (object) {
            for (var key in object) {
                var value = object[key];
                switch (typeOf(value)) {
                    case 'object':
                        var F = function () {
                        };
                        F.prototype = value;
                        object[key] = reset(new F);
                        break;
                    case 'array':
                        object[key] = value.clone();
                        break;
                }
            }
            return object;
        };

        var wrap = function (self, key, method) {
            if (method.$origin) method = method.$origin;
            var wrapper = function () {
                if (method.$protected && this.$caller == null) throw new Error('The method "' + key + '" cannot be called.');
                var caller = this.caller, current = this.$caller;
                this.caller = current;
                this.$caller = wrapper;
                var result = method.apply(this, arguments);
                this.$caller = current;
                this.caller = caller;
                return result;
            }.extend({$owner: self, $origin: method, $name: key});
            return wrapper;
        };

        var implement = function (key, value, retain) {
            if (Class.Mutators.hasOwnProperty(key)) {
                value = Class.Mutators[key].call(this, value);
                if (value == null) return this;
            }

            if (typeOf(value) == 'function') {
                if (value.$hidden) return this;
                this.prototype[key] = (retain) ? value : wrap(this, key, value);
            } else {
                Object.merge(this.prototype, key, value);
            }

            return this;
        };

        var getInstance = function (klass) {
            klass.$prototyping = true;
            var proto = new klass;
            delete klass.$prototyping;
            return proto;
        };

        Class.implement('implement', implement.overloadSetter());

        Class.Mutators = {

            Extends: function (parent) {
                this.parent = parent;
                this.prototype = getInstance(parent);
            },

            Implements: function (items) {
                Array.from(items).each(function (item) {
                    var instance = new item;
                    for (var key in instance) implement.call(this, key, instance[key], true);
                }, this);
            }
        };

    })();


    /*
     ---

     name: Class.Extras

     description: Contains Utility Classes that can be implemented into your own Classes to ease the execution of many common tasks.

     license: MIT-style license.

     requires: Class

     provides: [Class.Extras, Chain, Events, Options]

     ...
     */

    (function () {

        this.Chain = new Class({

            $chain: [],

            chain: function () {
                this.$chain.append(Array.flatten(arguments));
                return this;
            },

            callChain: function () {
                return (this.$chain.length) ? this.$chain.shift().apply(this, arguments) : false;
            },

            clearChain: function () {
                this.$chain.empty();
                return this;
            }

        });

        var removeOn = function (string) {
            return string.replace(/^on([A-Z])/, function (full, first) {
                return first.toLowerCase();
            });
        };

        this.Events = new Class({

            $events: {},

            addEvent: function (type, fn, internal) {
                type = removeOn(type);


                this.$events[type] = (this.$events[type] || []).include(fn);
                if (internal) fn.internal = true;
                return this;
            },

            addEvents: function (events) {
                for (var type in events) this.addEvent(type, events[type]);
                return this;
            },

            fireEvent: function (type, args, delay) {
                type = removeOn(type);
                var events = this.$events[type];
                if (!events) return this;
                args = Array.from(args);
                events.each(function (fn) {
                    if (delay) fn.delay(delay, this, args);
                    else fn.apply(this, args);
                }, this);
                return this;
            },

            removeEvent: function (type, fn) {
                type = removeOn(type);
                var events = this.$events[type];
                if (events && !fn.internal) {
                    var index = events.indexOf(fn);
                    if (index != -1) delete events[index];
                }
                return this;
            },

            removeEvents: function (events) {
                var type;
                if (typeOf(events) == 'object') {
                    for (type in events) this.removeEvent(type, events[type]);
                    return this;
                }
                if (events) events = removeOn(events);
                for (type in this.$events) {
                    if (events && events != type) continue;
                    var fns = this.$events[type];
                    for (var i = fns.length; i--;) if (i in fns) {
                        this.removeEvent(type, fns[i]);
                    }
                }
                return this;
            }

        });

        this.Options = new Class({

            setOptions: function () {
                var options = this.options = Object.merge.apply(null, [
                    {},
                    this.options
                ].append(arguments));
                if (this.addEvent) for (var option in options) {
                    if (typeOf(options[option]) != 'function' || !(/^on[A-Z]/).test(option)) continue;
                    this.addEvent(option, options[option]);
                    delete options[option];
                }
                return this;
            }

        });

    })();

/*
 *	Data Conversion Utilities:
 *	Copyright (c) 2013, Jeff Lyon. (http://rubbingalcoholic.com)
 *
 *	Licensed under The MIT License. (http://www.opensource.org/licenses/mit-license.php)
 *	Redistributions of files must retain the above copyright notice.
 */
/**
 *	@classdesc
 *	This static class offers a grab bag of methods for various types of data conversion operations.
 *	WARNING: unless otherwise noted, any method that accepts a string input *must* be ASCII-encoded.
 *	(ie. no UTF8 / Unicode multibyte characters values are accepted) Use {@link convert.utf8.encode}
 *	to encode any non-ASCII string data as needed. Ignore this warning at your own peril.
 *
 *	@namespace
 *	@type {Object}
 *
 *	@author		Jeff Lyon <jeff@rubbingalcoholic.com>
 *	@copyright	Copyright (c) 2013, Jeff Lyon. ({@link http://rubbingalcoholic.com})
 *	@license	{@link http://www.opensource.org/licenses/mit-license.php|The MIT License}
 */
var convert = {
    /**
     *	Converts an ASCII string to an array of 8-bit integer bytes.
     *
     *	@static
     *	@param {string} str		The input string
     *	@return {Array}			The byte array
     */
    to_bytes: function(str)
    {
        var bytes = [];

        for (var i = 0; i < str.length; i++)
            bytes.push(str.charCodeAt(i) & 255);

        return bytes;
    },

    /**
     *	Converts an ASCII string or byte array to an array of "words" (32-bit integers)
     *	(RA NOTE ~ Assumes the input string length is a multiple of 4)
     *
     *	@param {string|Array} data						The input string or array
     *	@param {Object} [options]						Optional options object.
     *	@param {boolean} [options.reverse_endian=false]	Whether to reverse the endian-ness (byte order) of the word bytes
     *	@return {Array}									An array of 32-bit integers
     */
    to_words: function(data, options)
    {
        options || (options = {});
        options.reverse_endian || (options.reverse_endian = false);

        var words		= [];
        var _to_word 	= this.to_word;

        if (typeof data != 'string')
            if (!options.reverse_endian)
                for (var i=0; i<data.length; i+=4)
                    words.push(_to_word(data[i], data[i+1], data[i+2], data[i+3]));
            else
                for (var i=0; i<data.length; i+=4)
                    words.push(_to_word(data[i+3], data[i+2], data[i+1], data[i]));
        else
        if (!options.reverse_endian)
            for (var i=0; i<data.length; i+=4)
                words.push(_to_word(data.charCodeAt(i), data.charCodeAt(i+1), data.charCodeAt(i+2), data.charCodeAt(i+3)));
        else
            for (var i=0; i<data.length; i+=4)
                words.push(_to_word(data.charCodeAt(i+3), data.charCodeAt(i+2), data.charCodeAt(i+1), data.charCodeAt(i)));

        return words;
    },

    /**
     *	Joins up to 4 arbitrary 8-bit integer bytes into one 32-bit integer word
     *
     *	@param {number} byte1		8-bit integer. Most significant byte
     *	@param {number} byte2		8-bit integer. Second most significant byte
     *	@param {number} byte3		8-bit integer. Third most significant byte
     *	@param {number} byte4		8-bit integer. Least significant byte
     *	@return {number}			A 32 bit integer word
     */
    to_word: function()
    {
        if (arguments.length == 4)
            return ((arguments[0] & 255) << 24) | ((arguments[1] & 255) << 16) | ((arguments[2] & 255) << 8) | (arguments[3] & 255);
        /*
         // RA NOTE ~ No longer support passing one string byte into this method. Not sure why I ever did.
         else if (typeof arguments[0] == 'string')
         return this.to_words(arguments[0]).shift();
         */

        var joined 	= 0;
        for (var i = arguments.length-1; i >= 0; i--)
            joined |= (arguments[i] & 255) << 8*(arguments.length-1-i);

        return joined;
    },

    /**
     *	Converts an array of 32-bit integer words to an ASCII-encoded binary string
     *
     *	@param {Array} words	Array of 32-bit integer words
     *	@return {string}		ASCII-encoded binary string
     */
    words_to_binstring: function(words)
    {
        var binary 				= '';
        var _word_to_binstring	= this.word_to_binstring;

        for (var i = 0; i < words.length; i++)
            binary += _word_to_binstring(words[i]);

        return binary;
    },

    /**
     *	Converts an array of 32-bit integer words to a hex string
     *
     *	@param {Array} words	Array of 32-bit integer words
     *	@return {string}		Hexademical string
     */
    words_to_hex: function(words)
    {
        return this.binstring_to_hex(this.words_to_binstring(words));
    },

    /**
     *	Converts an array of 32-bit integer words to an array of 8-bit integer bytes
     *
     *	@param {Array} words	Array of 32-bit integer words
     *	@return {Array}			Array of 8-bit integer bytes
     */
    words_to_bytes: function(words)
    {
        var bytes 				= [];
        var _word_to_bytes		= this.word_to_bytes;

        for (var i = 0; i < words.length; i++)
            bytes = bytes.concat(_word_to_bytes(words[i]));

        return bytes;
    },

    /**
     *	Converts a 32-bit integer word to a 4 byte ASCII-encoded binary string
     *
     *	@param {number} word	32-bit integer word
     *	@return {string}		ASCII-encoded binary string
     */
    word_to_binstring: function(word)
    {
        return 		String.fromCharCode((word >>> 24) & 255)
            + 	String.fromCharCode((word >>> 16) & 255)
            + 	String.fromCharCode((word >>> 8) & 255)
            +	String.fromCharCode(word & 255);
    },

    /**
     *	Splits a 32-bit integer word to an array of four 8-bit integers
     *
     *	@param {number} word	32-bit integer word
     *	@param {Array}			Array of 8-bit integers
     */
    word_to_bytes: function(word)
    {
        return [
            ((word >>> 24) & 255),
            ((word >>> 16) & 255),
            ((word >>> 8) & 255),
            (word & 255)
        ];
    },

    /**
     *	Converts a hex string to an ASCII-encoded binary string.
     *
     *	@param {string} hex		Hexadecimal string (do not prefix with '0x'}
     *	@return {string}		ASCII-encoded binary string
     */
    hex_to_binstring: function(hex)
    {
        if (hex.length % 2 == 1)
            hex = '0'+hex;

        var binary = '';

        for (var i = 0; i < hex.length; i += 2)
            binary += String.fromCharCode(parseInt(hex.substr(i, 2),16));

        return binary;
    },

    /**
     *	Converts an ASCII-encoded binary string to a hexadecimal string
     *
     *	@param {string} str		ASCII-encoded binary string
     *	@return {string}		Hexadecimal string
     */
    binstring_to_hex: function(str)
    {
        var hex = '';
        for (var i=0; i < str.length; i++)
            hex += (str.charCodeAt(i).toString(16).length == 1 ? '0' : '') + str.charCodeAt(i).toString(16);

        return hex;
    },

    /**
     *	@classdesc Static class for Base64 Encoder / Decoder functionality. This is a child of {@link convert}.
     *	@namespace
     */
    base64:
    {
        /**
         *	The list of characters used in the conversion process
         *	@private
         */
        chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',

        /**
         *	Encodes string data into Base64 format string
         *
         *	@param {string} data	ASCII-encoded string data
         *	@return {string}		Base64-encoded string
         *
         *	@example
         *
         *	convert.base64.encode("They don't call me honest nothing for abe!");
         *	// outputs "VGhleSBkb24ndCBjYWxsIG1lIGhvbmVzdCBub3RoaW5nIGZvciBhYmUh"
         *
         */
        encode: function(data)
        {
            var output = '';
            for (i=0, c=data.length; i<c; i += 3)
            {
                var char1 = data.charCodeAt(i) >> 2;
                var char2 = ((data.charCodeAt(i) & 3) << 4) | data.charCodeAt(i+1) >> 4;
                var char3 = ((data.charCodeAt(i+1) & 15) << 2) | data.charCodeAt(i+2) >> 6;
                var char4 = data.charCodeAt(i+2) & 63;

                output 	+= 	this.chars.charAt(char1)
                    + 	this.chars.charAt(char2)
                    +	this.chars.charAt(char3)
                    +	this.chars.charAt(char4);
            }
            if (c % 3 == 1)
                output = output.substr(0, output.length - 2) + '==';
            else if (c % 3 == 2)
                output = output.substr(0, output.length - 1) + '=';

            return output;
        },

        /**
         *	Decodes data from Base64 format string into plaintext
         *
         *	@param {string} str	Base64 string to decode
         *	@return {string}	ASCII-encoded plaintext string
         *
         *	@example
         *
         *	convert.base64.decode("VGhleSBkb24ndCBjYWxsIG1lIGhvbmVzdCBub3RoaW5nIGZvciBhYmUh");
         *	// outputs "They don't call me honest nothing for abe!"
         *
         */
        decode: function(str)
        {
            var data = '';

            for (i=0, c=str.length; i<c; i += 4)
            {
                var char1 = this.chars.indexOf(str.charAt(i));
                var char2 = this.chars.indexOf(str.charAt(i+1));
                var char3 = this.chars.indexOf(str.charAt(i+2));
                var char4 = this.chars.indexOf(str.charAt(i+3));

                data += String.fromCharCode(char1 << 2 | char2 >> 4);
                if (char3 != -1)
                    data += String.fromCharCode((char2 & 15) << 4 | char3 >> 2)
                if (char4 != -1)
                    data += String.fromCharCode((char3 & 3) << 6 | char4);
            }
            return data;
        }
    },

    /**
     *	@classdesc
     *	Static class for UTF8 Encode / Decode functionality.
     *	This is a child of {@link convert}.
     *
     *	Since most of our encryption, hashing and {@link convert} methods expect
     *	ASCII-encoded binary strings (ie. 0 <= [character code] <= 255), they
     *	will misbehave on non-ASCII characters. We can use
     *  {@link convert.utf8.is_utf8_string} to test whether we need to use
     *	{@link convert.utf8.encode} to encode to ASCII before using elsewhere.
     *
     *	@namespace
     */
    utf8:
    {
        /**
         *	Encodes UTF8 Unicode data to ASCII.
         *
         *	@param {string} data	A non-ASCII string
         *	@return {string}		An ASCII string
         *
         *	@example
         *
         *	var unicode_string = "힇칫흟커킷 ������琯";
         *	convert.utf8.encode(unicode_string);	// ASCII output: "횇혷횆짤횇혖횆쩔횇쨋 횉혲횈혶횊혞횎혰횎혱횋혰횓쨉"
         *
         */
        encode: function(data)
        {
            return unescape(encodeURIComponent(data));
        },

        /**
         *	Decodes encoded ASCII back to UTF-8.
         *
         *	@param {string} data	An ASCII string
         *	@return {string}		A (potentially) UTF-8 String
         *
         *	@example
         *
         *	var ascii_string = "횇혷횆짤횇혖횆쩔횇쨋 횉혲횈혶횊혞횎혰횎혱횋혰횓쨉";		// it's really ASCII, trust me.
         *	convert.utf8.decode(ascii_string);		// Unicode output: "힇칫흟커킷 ������琯"
         *
         *
         */
        decode: function(data)
        {
            return decodeURIComponent(escape(data));
        },

        /**
         *	Checks to see if a string has UTF8 characters.
         *
         *	(We check for character codes that are multi-byte integer values > 255)
         *
         *	@param {string} str		A string, maybe containing UTF8 characters
         *	@return {boolean}		True if UTF8 characters are found
         *
         *	@example
         *
         *	convert.utf8.is_utf8_string("힇칫흟커킷 ������琯");	// returns true
         */
        is_utf8_string: function(str)
        {
            return /[^\u0000-\u00ff]/.test(str);
        }
    }
}

/*
 *	Symmetric block cipher support classes
 *	Copyright (c) 2013, Jeff Lyon. (http://rubbingalcoholic.com)
 *
 *	Licensed under The MIT License. (http://www.opensource.org/licenses/mit-license.php)
 *	Redistributions of files must retain the above copyright notice.
 */
/**
 *	@abstract
 *	@class
 *	@classdesc		Abstract class which provides base functionality used by all symmetric block cipher subclasses
 *	@desc			NOTE: you can't instantiate this class directly. Instead, create instances of a subclass, such as {@link AES} or {@link Twofish}.
 *	@requires		convert
 */
var BlockCipher = new Class(
    /** @lends BlockCipher.prototype */
    {
        /**
         *	The block cipher mode of operation (see {@link https://en.wikipedia.org/wiki/Block_cipher_mode_of_operation})
         *	@type {BlockCipherMode}
         *	@private
         */
        block_mode: 	null,

        /**
         *	The block byte padding mode (see {@link http://en.wikipedia.org/wiki/Padding_%28cryptography%29})
         *	@type {PaddingMode}
         *	@private
         */
        pad_mode: 		null,

        /**
         *	Initial vector for non-ECB block cipher modes
         *	@private
         */
        iv: 			'',

        /**
         *	Passphrase, stored temporarily before key derivation
         *	@private
         */
        passphrase: 	'',

        /**
         *	Salt used for passphrase based key derivation
         *	@private
         */
        salt: 			'',

        /**
         *	Toggles OpenSSL mode.
         *	@private
         */
        openssl_mode: 	false,

        /**
         *	Turn this on to enable the {@link BlockCipher#debug_write} method to log debug output to the console.
         *
         *	@type {Boolean}
         *  @default false
         */
        debug_mode: true,

        /**
         *	Invoked during subclass initialization. All properties needed to initialize the class must be passed in.
         *
         *	@param {Object} data									A list of properties used to initialize the class.
         *	@param {string} [data.key]								A binary string containing the symmetric key. Required if a passphrase is not specified.
         *															Must match a key length supported by the subclass.
         *	@param {BlockCipherMode} [data.block_mode={@link CBC}]	The block cipher mode of operation to use for *cryption
         *	@param {PaddingMode} [data.pad_mode={@link PKCS7}]		The block byte padding mode
         *	@param {string} [data.passphrase]						A passphrase to derive a key from. Required if a key is not explicitly specified.
         *	@param {string} [data.salt]								A binary string containing the cryptographic salt used for key derivation.
         *	@param {boolean} [data.openssl_mode=false]				Toggles OpenSSL interoperability mode. This prepends salt data to the encryption output, and
         *															uses the prepended salt data during decryption to derive a key (in combination with a
         *															passphrase), if needed.
         *	@return {BlockCipher}
         */
        initialize: function(data)
        {
            data || (data = {});

            for (var attr in data)
                this[attr] = data[attr];

            if (!data.block_mode)
                this.block_mode = CBC;

            if (!data.pad_mode)
                this.pad_mode = PKCS7;

            if (data.passphrase && this.openssl_mode == false)
                this._derive_key_from_passphrase();

            return this;
        },

        /**
         *	Encrypts a string using the padding and block cipher mode of operation specificed on initialization.
         *
         *	@param {String} plaintext	An ASCII string to encrypt. Can be binary or plaintext.
         *								For plaintext, be sure to use {@link convert.utf8.encode} to encode any UTF characters.
         *	@return {String}			Decrypted data
         */
        encrypt: function(plaintext)
        {
            if (this.openssl_mode && this.get_key().length == 0)
                this._derive_key_from_passphrase();

            plaintext		= new this.pad_mode({ cipher: this }).do_pad(plaintext);

            var plaintext 	= convert.to_words(plaintext);
            var operator	= new this.block_mode({ cipher: this });
            var ciphertext	= operator.encrypt_blocks(plaintext);

            ciphertext		= convert.words_to_binstring(ciphertext);

            if (this.openssl_mode && this.get_salt())
                ciphertext	= 'Salted__' + this.get_salt() + ciphertext;

            return ciphertext;
        },

        /**
         *	Decrypts a string.
         *
         *	@param {String} ciphertext	An ASCII string to decrypt.
         *	@return {String}			Encrypted data
         */
        decrypt: function(ciphertext)
        {
            if (this.openssl_mode && ciphertext.substr(0, 8) == 'Salted__')
            {
                if (this.get_key().length == 0)
                {
                    this.salt	= ciphertext.substr(8, 8);
                    this._derive_key_from_passphrase();
                }
                ciphertext		= ciphertext.substr(16);
            }

            var ciphertext 		= convert.to_words(ciphertext);
            var operator		= new this.block_mode({ cipher: this });
            var plaintext		= convert.words_to_binstring(operator.decrypt_blocks(ciphertext));

            plaintext			= new this.pad_mode({ cipher: this }).undo_pad(plaintext);

            return plaintext;
        },

        /**
         *	Gets the salt used for any passphrase-based key derivation.
         *	@return {String}
         */
        get_salt: function()
        {
            return this.salt;
        },

        /**
         *	Writes debug information to the console if {@link BlockCipher#debug_mode} is turned on.
         *	@param {...mixed} arguments The variables to write to console
         */
        debug_write: function()
        {
            if (this.debug_mode) console.log.apply(console, arguments);
        },

        /**
         *	Derives a key from a passphrase.
         *	@private
         */
        _derive_key_from_passphrase: function()
        {
            var key_bytes		= (this.get_key_length() / 8);
            var block_bytes		= (this.get_block_size() / 8);

            if (this.openssl_mode)
            {
                if (!this.get_salt())
                    this.salt	= this._random_salt();

                var key			= new EVPKDF({key_size: (key_bytes+block_bytes)}).compute(this.passphrase, this.get_salt().substr(0, 8));
            }
            else
                var key			= new PBKDF2({key_size: (key_bytes+block_bytes)}).compute(this.passphrase, this.get_salt());

            this.iv				= key.substr(key_bytes);
            this.passphrase		= '';

            this.set_key(key.substr(0, key_bytes));
        },

        /**
         *	Generates a random salt
         *	@private
         */
        _random_salt: function()
        {
            var rb = function () { return String.fromCharCode(Math.floor(Math.random() * 256)); }
            return rb() + rb() + rb() + rb() + rb() + rb() + rb() + rb();
        }
    });

/**
 *	@abstract
 *	@class
 *	@classdesc		Abstract class which provides base functionality for block cipher mode operator subclasses
 *	@desc			NOTE: you can't instantiate this class directly. Instead, create instances of a subclass, such as {@link CBC} or {@link ECB}.
 *	@requires		convert
 */
var BlockCipherMode = new Class(
    /** @lends BlockCipherMode.prototype */
    {
        /**
         *	Stores a reference to the BlockCipher subclass instance used for *cryption
         *	@type {BlockCipher}
         *	@private
         */
        cipher: null,

        /**
         *	Invoked during subclass initialization. All properties needed to initialize the class must be passed in.
         *
         *	@param {Object} data				A list of properties used to initialize the class.
         *	@param {BlockCipher} data.cipher	A reference to a BlockCipher subclass instance. Used to actually *crypt any given block.
         *	@param {string} [data.iv]			ASCII string containing Initial Vector (IV). Not required for {@link ECB}
         *	@return {BlockCipherMode}
         */
        initialize: function(data)
        {
            for (var attr in data)
                this[attr] = data[attr];

            return this;
        },

        /**
         *	Invoked during subclass initialize when an Initial Vector is required.
         *	Converts any supplied Initial Vector to an array of 32-bit words and does a length check.
         *	@private
         *	@throws Throws an error if the Initial Vector length doesn't match the block length.
         */
        init_iv: function()
        {
            var iv = convert.to_words(this.cipher.iv);
            if (iv.length != this.get_words_per_block())
                throw new Error('Initial vector size must match block size!');

            this.iv = iv;
        },

        /**
         *	Convenience function to get the number of 32-bit words required for each block
         *	@return {number}
         */
        get_words_per_block: function()
        {
            return this.cipher.get_block_size() / 32;
        },

        /**
         *	XORs two blocks together. (A block is an array of 32-bit words of the correct length)
         *	@private
         *	@param {Array} block1	The first block
         *	@param {Array} block2	The second block
         *	@return {Array}			The result of XOR'ing the two blocks together
         */
        xor_block: function(block1, block2)
        {
            for (var i=0; i < block1.length; i++) block1[i] ^= block2[i];
            return block1;
        }

    });

/**
 *	@class
 *	@classdesc				Implements ECB block cipher mode. Used internally during symmetric *cryption.
 *	@extends				BlockCipherMode
 *	@requires				convert
 *
 *	@desc					Creates a new ECB block cipher mode instance
 *	@param {Object} data	Initialization options for the class, passed automatically into {@link ECB#initialize}
 */
var ECB = new Class(
    /** @lends ECB.prototype */
    {

        Extends: BlockCipherMode,

        /**
         *	Called automatically on class instantiation.
         *	Invokes {@link BlockCipherMode#initialize}.
         *
         *	@override
         *	@param {Object} data See {@link BlockCipherMode#initialize} for a list of supported properties.
         *	@return {ECB}
         */
        initialize: function(data)
        {
            this.parent(data);
            return this;
        },

        /**
         *	Encrypts blocks.
         *
         *	@param {Array} words	An array of 32-bit words whose length must be an integer multiple of {@link ECB#get_words_per_block}
         *	@return {Array}			Encrypted blocks
         */
        encrypt_blocks: function(words)
        {
            var ciphertext 		= [];
            var words_per_block	= this.get_words_per_block();

            for (var i = 0; i < words.length; i += words_per_block)
            {
                var block = words.slice(i, i+words_per_block);
                ciphertext = ciphertext.concat(this.cipher.block_encrypt(block));
            }

            return ciphertext;
        },

        /**
         *	Decrypt blocks.
         *
         *	@param {Array} words	An array of 32-bit words whose length must be an integer multiple of {@link ECB#get_words_per_block}
         *	@return {Array}			Decrypted blocks
         */
        decrypt_blocks: function(words)
        {
            var plaintext 		= [];
            var words_per_block	= this.get_words_per_block();

            for (var i = 0; i < words.length; i += words_per_block)
            {
                var block = words.slice(i, i+words_per_block);
                plaintext = plaintext.concat(this.cipher.block_decrypt(block));
            }

            return plaintext;
        },

    });

/**
 *	@class
 *	@classdesc				Implements CBC block cipher mode. Used internally during symmetric *cryption.
 *	@extends				BlockCipherMode
 *	@requires				convert
 *
 *	@desc					Creates a new CBC block cipher mode instance
 *	@param {Object} data	Initialization options for the class, passed automatically into {@link CBC#initialize}
 */
var CBC = new Class(
    /** @lends CBC.prototype */
    {
        Extends: BlockCipherMode,

        /**
         *	Array of 32-bit words for the Initial Vector (IV)
         *	@private
         */
        iv: [],

        /**
         *	Called automatically on class instantiation.
         *	Invokes {@link BlockCipherMode#initialize} before handling class-specific functionality.
         *
         *	@override
         *	@param {Object} data See {@link BlockCipherMode#initialize} for a list of supported properties.
         *	@return {CBC}
         */
        initialize: function(data)
        {
            this.parent(data);
            this.init_iv();
            return this;
        },

        /**
         *	Encrypts blocks.
         *
         *	@param {Array} words	An array of 32-bit words whose length must be an integer multiple of {@link CBC#get_words_per_block}
         *	@return {Array}			Encrypted blocks
         */
        encrypt_blocks: function(words)
        {
            var ciphertext 		= [];
            var words_per_block	= this.get_words_per_block();
            var _prev_block		= this.iv;

            for (var i = 0; i < words.length; i += words_per_block)
            {
                var block			= words.slice(i, i+words_per_block);
                var xor_block		= this.xor_block(block, _prev_block);
                var cipher_block	= this.cipher.block_encrypt(xor_block)
                ciphertext 			= ciphertext.concat(cipher_block);
                _prev_block			= cipher_block;
            }

            return ciphertext;
        },

        /**
         *	Decrypt blocks.
         *
         *	@param {Array} words	An array of 32-bit words whose length must be an integer multiple of {@link CBC#get_words_per_block}
         *	@return {Array}			Decrypted blocks
         */
        decrypt_blocks: function(words)
        {
            var plaintext 		= [];
            var words_per_block	= this.get_words_per_block();
            var _prev_block		= this.iv;

            for (var i = 0; i < words.length; i += words_per_block)
            {
                var block 			= words.slice(i, i+words_per_block);
                var decrypted 		= this.cipher.block_decrypt(block);
                var xor_decrypted	= this.xor_block(decrypted, _prev_block);
                plaintext 			= plaintext.concat(xor_decrypted);
                _prev_block			= block;
            }

            return plaintext;
        },

    });

/**
 *	@class
 *	@classdesc				Implements CFB block cipher mode. Used internally during symmetric *cryption.
 *	@extends				BlockCipherMode
 *	@requires				convert
 *
 *	@desc					Creates a new CFB block cipher mode instance
 *	@param {Object} data	Initialization options for the class, passed automatically into {@link CFB#initialize}
 */
var CFB = new Class(
    /** @lends CFB.prototype */
    {

        Extends: BlockCipherMode,

        /**
         *	Array of 32-bit words for the Initial Vector (IV)
         *	@private
         */
        iv: [],

        /**
         *	Called automatically on class instantiation.
         *	Invokes {@link BlockCipherMode#initialize} before handling class-specific functionality.
         *
         *	@override
         *	@param {Object} data See {@link BlockCipherMode#initialize} for a list of supported properties.
         *	@return {CFB}
         */
        initialize: function(data)
        {
            this.parent(data);
            this.init_iv();
            return this;
        },

        /**
         *	Encrypts blocks.
         *
         *	@param {Array} words	An array of 32-bit words whose length must be an integer multiple of {@link CFB#get_words_per_block}
         *	@return {Array}			Encrypted blocks
         */
        encrypt_blocks: function(words)
        {
            var ciphertext 		= [];
            var words_per_block	= this.get_words_per_block();
            var _prev_block		= this.iv;

            for (var i = 0; i < words.length; i += words_per_block)
            {
                var cipher_block	= this.cipher.block_encrypt(_prev_block)
                var block			= words.slice(i, i+words_per_block);
                var xor_block		= this.xor_block(block, cipher_block);
                ciphertext 			= ciphertext.concat(xor_block);
                _prev_block			= xor_block;
            }

            return ciphertext;
        },

        /**
         *	Decrypt blocks.
         *
         *	@param {Array} words	An array of 32-bit words whose length must be an integer multiple of {@link CFB#get_words_per_block}
         *	@return {Array}			Decrypted blocks
         */
        decrypt_blocks: function(words)
        {
            var plaintext 		= [];
            var words_per_block	= this.get_words_per_block();
            var _prev_block		= this.iv;

            for (var i = 0; i < words.length; i += words_per_block)
            {
                var cipher_block	= this.cipher.block_encrypt(_prev_block)
                var block 			= words.slice(i, i+words_per_block);
                var xor_decrypted	= this.xor_block(cipher_block, block);
                plaintext 			= plaintext.concat(xor_decrypted);
                _prev_block			= block;
            }

            return plaintext;
        },
    });

/**
 *	@abstract
 *	@class
 *	@classdesc		Abstract class which provides base functionality for byte padding subclasses
 *	@desc			NOTE: you can't instantiate this class directly. Instead, create instances of a subclass, such as {@link ZeroPadding} or {@link PKCS7}.
 */
var PaddingMode = new Class(
    /** @lends PaddingMode.prototype */
    {
        /**
         *	Stores a reference to the BlockCipher subclass instance (used to get data about the block size)
         *	@type {BlockCipher}
         *	@private
         */
        cipher: null,

        /**
         *	Invoked during subclass instantiation. All properties needed to initialize the class must be passed in.
         *
         *	@param {Object} data				A list of properties used to initialize the class.
         *	@param {BlockCipher} data.cipher	A reference to a BlockCipher subclass instance. Used to get information about the block size.
         *	@return {PaddingMode}
         */
        initialize: function(data)
        {
            for (var attr in data)
                this[attr] = data[attr];

            return this;
        }
    });

/**
 *	@class
 *	@classdesc				Implements Zero Padding functionality. Data is padded to the correct block length multiple with zero bytes.
 *	@extends				PaddingMode
 *
 *	@desc					Creates a new ZeroPadding padding mode instance
 *	@param {Object} data	Initialization options for the class, passed automatically into {@link ZeroPadding#initialize}
 */
var ZeroPadding = new Class(
    /** @lends ZeroPadding.prototype */
    {
        Extends: PaddingMode,

        /**
         *	Perform the padding on the data.
         *
         *	@param {string} data	A binary data string (ASCII)
         *	@return {string} 		Padded data
         */
        do_pad: function(data)
        {
            if ((data.length * 8) % this.cipher.get_block_size() != 0)
                for (var i=0; data.length % (this.cipher.get_block_size() / 8) != 0; i++)
                    data += String.fromCharCode(0);

            return data;
        },

        /**
         *	There is no safe way to undo zero padding. Simply returns the input string.
         *
         *	@param {string} data	A binary data string (ASCII)
         *	@return {string} 		The exact same string that was passed in.
         */
        undo_pad: function(data)
        {
            return data;
        }
    });

/**
 *	@class
 *	@classdesc				Implements ANSI X.923 Padding functionality.
 *							Data is padded with zeros until the last byte, which is then set to the number of padded bytes.
 *							If the data length is already a "clean" multiple of the block length, it is still padded out
 *							to another block, so we can safely undo the padding afterwards.
 *	@extends				PaddingMode
 *
 *	@desc					Creates a new AnsiX923 padding mode instance
 *	@param {Object} data	Initialization options for the class, passed automatically into {@link AnsiX923#initialize}
 */
var AnsiX923 = new Class(
    /** @lends AnsiX923.prototype */
    {
        Extends: PaddingMode,

        /**
         *	Perform the padding on the data.
         *
         *	@param {string} data	A binary data string (ASCII)
         *	@return {string} 		Padded data
         */
        do_pad: function(data)
        {
            // Pad the block out with zeros
            for (var i=0; i == 0 || data.length % (this.cipher.get_block_size() / 8) != 0; i++)
                data += String.fromCharCode(0);

            // Slice off the last byte and replace with our count
            data = data.substr(0, data.length - 1);
            data += String.fromCharCode(i);

            return data;
        },

        /**
         *	Undo padding on padded data.
         *
         *	@param {string} data	A binary data string (ASCII)
         *	@return {string} 		A binary string with the padding data stripped off the end.
         */
        undo_pad: function(data)
        {
            var pad_length = data.charCodeAt(data.length-1);
            return data.substr(0, data.length - pad_length);
        }
    });

/**
 *	@class
 *	@classdesc				Implements PKCS7 Padding functionality.
 *							The byte value we pad with is the number total number of bytes being padded onto the data.
 *							If the data length is already a "clean" multiple of the block length, it is still padded out
 *							to another block, so we can safely undo the padding afterwards.
 *	@extends				PaddingMode
 *
 *	@desc					Creates a new PKCS7 padding mode instance
 *	@param {Object} data	Initialization options for the class, passed automatically into {@link PKCS7#initialize}
 */
var PKCS7 = new Class(
    /** @lends AnsiX923.prototype */
    {
        Extends: PaddingMode,

        /**
         *	Perform the padding on the data.
         *
         *	@param {string} data	A binary data string (ASCII)
         *	@return {string} 		Padded data
         */
        do_pad: function(data)
        {
            var block_bytes	= (this.cipher.get_block_size() / 8);

            var pad_count	= data.length % block_bytes != 0 ? block_bytes - (data.length % block_bytes) : block_bytes;

            for (var i=0; i == 0 || data.length % (this.cipher.get_block_size() / 8) != 0; i++)
                data += String.fromCharCode(pad_count);

            return data;
        },

        /**
         *	Undo padding on padded data.
         *
         *	@param {string} data	A binary data string (ASCII)
         *	@return {string} 		A binary string with the padding data stripped off the end.
         */
        undo_pad: function(data)
        {
            var pad_length = data.charCodeAt(data.length-1);
            return data.substr(0, data.length - pad_length);
        }
    });

var AES = new Class({
    Extends: BlockCipher,
    key: 			[],				// 16 byte binstring
    key_expanded: 	[],
    key_length: 	256,			// 128 | 192 | 256 (can be overridden by set key)
    block_size: 	128,			// 128 bits
    debug_mode: false,
    initialize: function(data) {
        this.parent(data);

        if (this.key.length)
            this.set_key(this.key);

            return this;
        },
    set_key: function(key) {
        if (typeof key == 'string')
            key = convert.to_bytes(key)

        if (key.length != 16 && key.length != 24 && key.length != 32)
            throw new Error('AES key must be 16, 24 or 32 bytes!');

        this.key			= key;
        this.key_expanded	= [];
            this.key_length		= (this.key.length * 8);

            return this;
        },

        /**
         *	Getter function for the key
         *	@return {Array} The byte array for the key
         */
        get_key: function()
        {
            return this.key;
        },

        /**
         *	Getter function for the key length
         *	@return {Number} The key length (in bits)
         */
        get_key_length: function()
        {
            return this.key_length;
        },

        /**
         *	Getter function for the block size
         *	@return {Number} The block size (in bits)
         */
        get_block_size: function()
        {
            return this.block_size;
        },

        /**
         *	Encrypts a block. This is normally called internally by a subclass instance of {@link BlockCipherMode}.
         *
         *	@private
         *	@param {Array} state	An array of 32-bit words
         *	@return {Array}			An array of encrypted 32-bit words
         */
        block_encrypt: function(state)
        {
            this.debug_write('Encrypting...');

            var k 		= 	this.get_expanded_key();
            state 		= 	this.add_round_key(state, k.slice(0, 4));

            for (var i = 0; i < (this.key.length / 4) + 5; i++)
                state	= 	this.add_round_key(this.mix_columns(this.shift_rows(this.bytes_sub(state))), k.slice((i+1)*4, ((i+1)*4)+4));

            state	= this.add_round_key(this.shift_rows(this.bytes_sub(state)), k.slice((i+1)*4, ((i+1)*4)+4));

            return state;
        },

        /**
         *	Decrypts a block. This is normally called internally by a subclass instance of {@link BlockCipherMode}.
         *
         *	@private
         *	@param {Array} state	An array of 32-bit words
         *	@return {Array}			An array of decrypted 32-bit words
         */
        block_decrypt: function(state)
        {
            this.debug_write('Decrypting...');

            var k 		= 	this.get_expanded_key();
            var ki		= 	k.length;

            state 		= 	this.add_round_key(state, k.slice(ki-4, ki));

            for (var i = (this.key.length / 4) + 5, ki = ki - 4; i > 0; i--, ki -= 4)
                state 	= 	this.inverse_mix_columns(this.add_round_key(this.inverse_bytes_sub(this.inverse_shift_rows(state)), k.slice(ki-4, ki)));

            state = this.add_round_key(this.inverse_bytes_sub(this.inverse_shift_rows(state)), k.slice(0, 4));

            return state;
        },

        /**
         *	Adds the stupid round key
         *	@private
         *	@param {Array} state		Word array for the current state
         *	@param {Array} round_key	Word array for the round key
         *	@return {Array}				Word array of XOR'ed result
         */
        add_round_key: function(state, round_key)
        {
            return [
                    state[0] ^ round_key[0],
                    state[1] ^ round_key[1],
                    state[2] ^ round_key[2],
                    state[3] ^ round_key[3]
            ];
        },

        /**
         *	This simulates Galois Field multiplication
         *	It does matrix multiplication with a lookup table
         *	@private
         *	@param {Array} state	Word array for the current state
         *	@return {Array}			Word array
         */
        mix_columns: function(state)
        {
            var m2 = this.mult_2, m3 = this.mult_3, out = [];

            for (var i = 0; i < 4; i++)
            {
                var a0 = (state[i] >>> 24) & 255;
                var a1 = (state[i] >>> 16) & 255;
                var a2 = (state[i] >>> 8) & 255;
                var a3 = (state[i] & 255);

                out[i]	= (( m2[a0] ^ m3[a1] ^ a2     ^ a3)     << 24)
                    | (( a0     ^ m2[a1] ^ m3[a2] ^ a3)     << 16)
                    | (( a0     ^ a1     ^ m2[a2] ^ m3[a3]) << 8)
                    | (( m3[a0] ^ a1     ^ a2     ^ m2[a3]) << 0)
            }
            return out;
        },

        /**
         *	This is the inverse of mix_columns
         *	It uses a lookup table for the inverted matrix used previously
         *	@private
         *	@param {Array} state	Word array for the current state
         *	@return {Array}			Word array
         */
        inverse_mix_columns: function(state)
        {
            var m9 = this.mult_9, mb = this.mult_11, md = this.mult_13, me = this.mult_14, out = [];

            for (var i = 0; i < 4; i++)
            {
                var a0 = (state[i] >>> 24) & 255;
                var a1 = (state[i] >>> 16) & 255;
                var a2 = (state[i] >>> 8) & 255;
                var a3 = (state[i] & 255);

                out[i]	= (( me[a0] ^ mb[a1] ^ md[a2] ^ m9[a3]) << 24)
                    | (( m9[a0] ^ me[a1] ^ mb[a2] ^ md[a3]) << 16)
                    | (( md[a0] ^ m9[a1] ^ me[a2] ^ mb[a3]) << 8)
                    | (( mb[a0] ^ md[a1] ^ m9[a2] ^ me[a3]) << 0)
            }
            return out;
        },

        /**
         *	Shuffles bytes between the 4 32-bit integers that make up the state
         *	@private
         *	@param {Array} state	Word array for the current state
         *	@return {Array}			Word array
         */
        shift_rows: function(state)
        {
            return [
                    (state[3] & 255) | (((state[2] >>> 8) & 255) << 8) | (((state[1] >>> 16) & 255) << 16) | (((state[0] >>> 24) & 255) << 24),
                    (state[0] & 255) | (((state[3] >>> 8) & 255) << 8) | (((state[2] >>> 16) & 255) << 16) | (((state[1] >>> 24) & 255) << 24),
                    (state[1] & 255) | (((state[0] >>> 8) & 255) << 8) | (((state[3] >>> 16) & 255) << 16) | (((state[2] >>> 24) & 255) << 24),
                    (state[2] & 255) | (((state[1] >>> 8) & 255) << 8) | (((state[0] >>> 16) & 255) << 16) | (((state[3] >>> 24) & 255) << 24)
            ];
        },

        /**
         *	(Inverse of shift_rows)
         *	Unshuffles bytes between the 4 32-bit integers that make up the state
         *	@private
         *	@param {Array} state	Word array for the current state
         *	@return {Array}			Word array
         */
        inverse_shift_rows: function(state)
        {
            return [
                    (state[1] & 255) | (((state[2] >>> 8) & 255) << 8) | (((state[3] >>> 16) & 255) << 16) | (((state[0] >>> 24) & 255) << 24),
                    (state[2] & 255) | (((state[3] >>> 8) & 255) << 8) | (((state[0] >>> 16) & 255) << 16) | (((state[1] >>> 24) & 255) << 24),
                    (state[3] & 255) | (((state[0] >>> 8) & 255) << 8) | (((state[1] >>> 16) & 255) << 16) | (((state[2] >>> 24) & 255) << 24),
                    (state[0] & 255) | (((state[1] >>> 8) & 255) << 8) | (((state[2] >>> 16) & 255) << 16) | (((state[3] >>> 24) & 255) << 24)
            ];
        },

        /**
         *	Does an s-box lookup replacement on each byte of the state
         *	@private
         *	@param {Array} state	Word array for the current state
         *	@return {Array}			Word array
         */
        bytes_sub: function(state)
        {
            var s		= this.s_e;

            return [
                    (s[state[0] >>> 24] << 24) | (s[(state[0] >>> 16) & 255] << 16) | (s[(state[0] >>> 8) & 255] << 8) | s[state[0] & 255],
                    (s[state[1] >>> 24] << 24) | (s[(state[1] >>> 16) & 255] << 16) | (s[(state[1] >>> 8) & 255] << 8) | s[state[1] & 255],
                    (s[state[2] >>> 24] << 24) | (s[(state[2] >>> 16) & 255] << 16) | (s[(state[2] >>> 8) & 255] << 8) | s[state[2] & 255],
                    (s[state[3] >>> 24] << 24) | (s[(state[3] >>> 16) & 255] << 16) | (s[(state[3] >>> 8) & 255] << 8) | s[state[3] & 255]
            ];
        },

        /**
         *	Does an inverse s-box lookup replacement on each byte of the state for decryption
         *	@private
         *	@param {Array} state	Word array for the current state
         *	@return {Array}			Word array
         */
        inverse_bytes_sub: function(state)
        {
            var s		= this.s_d;

            return [
                    (s[state[0] >>> 24] << 24) | (s[(state[0] >>> 16) & 255] << 16) | (s[(state[0] >>> 8) & 255] << 8) | s[state[0] & 255],
                    (s[state[1] >>> 24] << 24) | (s[(state[1] >>> 16) & 255] << 16) | (s[(state[1] >>> 8) & 255] << 8) | s[state[1] & 255],
                    (s[state[2] >>> 24] << 24) | (s[(state[2] >>> 16) & 255] << 16) | (s[(state[2] >>> 8) & 255] << 8) | s[state[2] & 255],
                    (s[state[3] >>> 24] << 24) | (s[(state[3] >>> 16) & 255] << 16) | (s[(state[3] >>> 8) & 255] << 8) | s[state[3] & 255]
            ];
        },

        /**
         *	Performs the stupid key expansion routine
         *	@private
         *	@throws	Throws an error if key is missing or invalid
         *	@return {Array} The expanded key
         */
        get_expanded_key: function()
        {
            if (this.key_expanded.length)
                return this.key_expanded;

            if (this.key.length != 32 && this.key.length != 24 && this.key.length != 16)
                throw new Error('Missing or invalid key!');

            this.debug_write('Generating key schedule...');

            var w	= [];
            var n_k	= (this.key.length / 4);
            var n_r = n_k + 6;
            var n_b = 4;

            for (var i = 0; i < n_k; i++)
                w[i] = convert.to_word(this.key[4*i], this.key[4*i+1], this.key[4*i+2], this.key[4*i+3]);

            // It was nice of the FIPS-197 spec to give pseudo code that actually works
            for (i = i; i < n_b * (n_r + 1); i++)
            {
                var temp = w[i-1];

                if (i % n_k == 0)
                    temp = this.word_bytes_sub(this.rot_word(temp)) ^ this.rcon[(i/n_k)-1];
                else if (n_k > 6 && i % n_k == 4)
                    temp = this.word_bytes_sub(temp);

                w[i] = w[i-n_k] ^ temp;
            }

            this.key_expanded = w;

            return w;
        },

        /**
         *	Does an s-box lookup replacement on each byte of a word
         *	@private
         *	@param {Number} word	32-bit word
         *	@return {Number}		S-box'ed word
         */
        word_bytes_sub: function(word)
        {
            var s = this.s_e;
            return (s[word >>> 24] << 24) | (s[(word >>> 16) & 255] << 16) | (s[(word >>> 8) & 255] << 8) | s[word & 255];
        },

        /**
         *	rot_word function used in key generation (does a circular left shift on a 32-bit word)
         *	@private
         *	@param {Number} word	32-bit word
         *	@return {Number}		Rotated word
         */
        rot_word: function(word)
        {
            return (word << 8) | (word >>> 24);
        },

        /**
         *	debug.writes a pretty formatted table containing the state values
         *	only outputs anything if this.debug_mode is true.
         *
         *	@private
         *	@see 					{@link BlockCipher#debug_mode}
         *	@param {Array} state	The state array
         */
        debug_dump_state: function(state)
        {
            var hex = function(num)
            {
                var str = (num).toString(16)
                if (str.length != 2)
                    str = '0' + str;
                return str;
            };
            var pad32 = function(num)
            {
                var str = (num >>> 0).toString(16);
                for (i=0; str.length % 8 != 0; i++)
                     var str = '0' + str;
                return str;
            };
            this.debug_write('----\n'
                    +	pad32(state[0]) + pad32(state[1]) + pad32(state[2]) + pad32(state[3]) + '\n'
                    +	hex((state[0] >>> 24) & 255) + ' ' + hex((state[1] >>> 24) & 255) + ' ' + hex((state[2] >>> 24) & 255) + ' ' + hex((state[3] >>> 24) & 255) + '\n'
                    +	hex((state[0] >>> 16) & 255) + ' ' + hex((state[1] >>> 16) & 255) + ' ' + hex((state[2] >>> 16) & 255) + ' ' + hex((state[3] >>> 16) & 255) + '\n'
                    +	hex((state[0] >>> 8) & 255)  + ' ' + hex((state[1] >>> 8) & 255)  + ' ' + hex((state[2] >>> 8) & 255)  + ' ' + hex((state[3] >>> 8) & 255) + '\n'
                    +	hex((state[0]) & 255)        + ' ' + hex((state[1]) & 255)        + ' ' + hex((state[2]) & 255)        + ' ' + hex((state[3]) & 255) + '\n----'
            );
        },

        /**
         *	RCON array used in Key Generation
         *	@private
         */
        rcon: [
            0x01000000,
            0x02000000,
            0x04000000,
            0x08000000,
            0x10000000,
            0x20000000,
            0x40000000,
            0x80000000,
            0x1B000000,
            0x36000000,
            0x6C000000,
            0xD8000000,
            0xAB000000,
            0x4D000000,
            0x9A000000
        ],

        /**
         *	s-box for encryption
         *	@private
         */
        s_e: [
            0x63, 0x7C, 0x77, 0x7B, 0xF2, 0x6B, 0x6F, 0xC5, 0x30, 0x01, 0x67, 0x2B, 0xFE, 0xD7, 0xAB, 0x76,
            0xCA, 0x82, 0xC9, 0x7D, 0xFA, 0x59, 0x47, 0xF0, 0xAD, 0xD4, 0xA2, 0xAF, 0x9C, 0xA4, 0x72, 0xC0,
            0xB7, 0xFD, 0x93, 0x26, 0x36, 0x3F, 0xF7, 0xCC, 0x34, 0xA5, 0xE5, 0xF1, 0x71, 0xD8, 0x31, 0x15,
            0x04, 0xC7, 0x23, 0xC3, 0x18, 0x96, 0x05, 0x9A, 0x07, 0x12, 0x80, 0xE2, 0xEB, 0x27, 0xB2, 0x75,
            0x09, 0x83, 0x2C, 0x1A, 0x1B, 0x6E, 0x5A, 0xA0, 0x52, 0x3B, 0xD6, 0xB3, 0x29, 0xE3, 0x2F, 0x84,
            0x53, 0xD1, 0x00, 0xED, 0x20, 0xFC, 0xB1, 0x5B, 0x6A, 0xCB, 0xBE, 0x39, 0x4A, 0x4C, 0x58, 0xCF,
            0xD0, 0xEF, 0xAA, 0xFB, 0x43, 0x4D, 0x33, 0x85, 0x45, 0xF9, 0x02, 0x7F, 0x50, 0x3C, 0x9F, 0xA8,
            0x51, 0xA3, 0x40, 0x8F, 0x92, 0x9D, 0x38, 0xF5, 0xBC, 0xB6, 0xDA, 0x21, 0x10, 0xFF, 0xF3, 0xD2,
            0xCD, 0x0C, 0x13, 0xEC, 0x5F, 0x97, 0x44, 0x17, 0xC4, 0xA7, 0x7E, 0x3D, 0x64, 0x5D, 0x19, 0x73,
            0x60, 0x81, 0x4F, 0xDC, 0x22, 0x2A, 0x90, 0x88, 0x46, 0xEE, 0xB8, 0x14, 0xDE, 0x5E, 0x0B, 0xDB,
            0xE0, 0x32, 0x3A, 0x0A, 0x49, 0x06, 0x24, 0x5C, 0xC2, 0xD3, 0xAC, 0x62, 0x91, 0x95, 0xE4, 0x79,
            0xE7, 0xC8, 0x37, 0x6D, 0x8D, 0xD5, 0x4E, 0xA9, 0x6C, 0x56, 0xF4, 0xEA, 0x65, 0x7A, 0xAE, 0x08,
            0xBA, 0x78, 0x25, 0x2E, 0x1C, 0xA6, 0xB4, 0xC6, 0xE8, 0xDD, 0x74, 0x1F, 0x4B, 0xBD, 0x8B, 0x8A,
            0x70, 0x3E, 0xB5, 0x66, 0x48, 0x03, 0xF6, 0x0E, 0x61, 0x35, 0x57, 0xB9, 0x86, 0xC1, 0x1D, 0x9E,
            0xE1, 0xF8, 0x98, 0x11, 0x69, 0xD9, 0x8E, 0x94, 0x9B, 0x1E, 0x87, 0xE9, 0xCE, 0x55, 0x28, 0xDF,
            0x8C, 0xA1, 0x89, 0x0D, 0xBF, 0xE6, 0x42, 0x68, 0x41, 0x99, 0x2D, 0x0F, 0xB0, 0x54, 0xBB, 0x16
        ],

        /**
         *	s-box for decryption
         *	@private
         */
        s_d: [
            0x52, 0x09, 0x6A, 0xD5, 0x30, 0x36, 0xA5, 0x38, 0xBF, 0x40, 0xA3, 0x9E, 0x81, 0xF3, 0xD7, 0xFB,
            0x7C, 0xE3, 0x39, 0x82, 0x9B, 0x2F, 0xFF, 0x87, 0x34, 0x8E, 0x43, 0x44, 0xC4, 0xDE, 0xE9, 0xCB,
            0x54, 0x7B, 0x94, 0x32, 0xA6, 0xC2, 0x23, 0x3D, 0xEE, 0x4C, 0x95, 0x0B, 0x42, 0xFA, 0xC3, 0x4E,
            0x08, 0x2E, 0xA1, 0x66, 0x28, 0xD9, 0x24, 0xB2, 0x76, 0x5B, 0xA2, 0x49, 0x6D, 0x8B, 0xD1, 0x25,
            0x72, 0xF8, 0xF6, 0x64, 0x86, 0x68, 0x98, 0x16, 0xD4, 0xA4, 0x5C, 0xCC, 0x5D, 0x65, 0xB6, 0x92,
            0x6C, 0x70, 0x48, 0x50, 0xFD, 0xED, 0xB9, 0xDA, 0x5E, 0x15, 0x46, 0x57, 0xA7, 0x8D, 0x9D, 0x84,
            0x90, 0xD8, 0xAB, 0x00, 0x8C, 0xBC, 0xD3, 0x0A, 0xF7, 0xE4, 0x58, 0x05, 0xB8, 0xB3, 0x45, 0x06,
            0xD0, 0x2C, 0x1E, 0x8F, 0xCA, 0x3F, 0x0F, 0x02, 0xC1, 0xAF, 0xBD, 0x03, 0x01, 0x13, 0x8A, 0x6B,
            0x3A, 0x91, 0x11, 0x41, 0x4F, 0x67, 0xDC, 0xEA, 0x97, 0xF2, 0xCF, 0xCE, 0xF0, 0xB4, 0xE6, 0x73,
            0x96, 0xAC, 0x74, 0x22, 0xE7, 0xAD, 0x35, 0x85, 0xE2, 0xF9, 0x37, 0xE8, 0x1C, 0x75, 0xDF, 0x6E,
            0x47, 0xF1, 0x1A, 0x71, 0x1D, 0x29, 0xC5, 0x89, 0x6F, 0xB7, 0x62, 0x0E, 0xAA, 0x18, 0xBE, 0x1B,
            0xFC, 0x56, 0x3E, 0x4B, 0xC6, 0xD2, 0x79, 0x20, 0x9A, 0xDB, 0xC0, 0xFE, 0x78, 0xCD, 0x5A, 0xF4,
            0x1F, 0xDD, 0xA8, 0x33, 0x88, 0x07, 0xC7, 0x31, 0xB1, 0x12, 0x10, 0x59, 0x27, 0x80, 0xEC, 0x5F,
            0x60, 0x51, 0x7F, 0xA9, 0x19, 0xB5, 0x4A, 0x0D, 0x2D, 0xE5, 0x7A, 0x9F, 0x93, 0xC9, 0x9C, 0xEF,
            0xA0, 0xE0, 0x3B, 0x4D, 0xAE, 0x2A, 0xF5, 0xB0, 0xC8, 0xEB, 0xBB, 0x3C, 0x83, 0x53, 0x99, 0x61,
            0x17, 0x2B, 0x04, 0x7E, 0xBA, 0x77, 0xD6, 0x26, 0xE1, 0x69, 0x14, 0x63, 0x55, 0x21, 0x0C, 0x7D
        ],

        /**
         *	precomputed matrix for Galois field multiplication by 2
         *	@private
         */
        mult_2: [
            0x00, 0x02, 0x04, 0x06, 0x08, 0x0a, 0x0c, 0x0e, 0x10, 0x12, 0x14, 0x16, 0x18, 0x1a, 0x1c, 0x1e,
            0x20, 0x22, 0x24, 0x26, 0x28, 0x2a, 0x2c, 0x2e, 0x30, 0x32, 0x34, 0x36, 0x38, 0x3a, 0x3c, 0x3e,
            0x40, 0x42, 0x44, 0x46, 0x48, 0x4a, 0x4c, 0x4e, 0x50, 0x52, 0x54, 0x56, 0x58, 0x5a, 0x5c, 0x5e,
            0x60, 0x62, 0x64, 0x66, 0x68, 0x6a, 0x6c, 0x6e, 0x70, 0x72, 0x74, 0x76, 0x78, 0x7a, 0x7c, 0x7e,
            0x80, 0x82, 0x84, 0x86, 0x88, 0x8a, 0x8c, 0x8e, 0x90, 0x92, 0x94, 0x96, 0x98, 0x9a, 0x9c, 0x9e,
            0xa0, 0xa2, 0xa4, 0xa6, 0xa8, 0xaa, 0xac, 0xae, 0xb0, 0xb2, 0xb4, 0xb6, 0xb8, 0xba, 0xbc, 0xbe,
            0xc0, 0xc2, 0xc4, 0xc6, 0xc8, 0xca, 0xcc, 0xce, 0xd0, 0xd2, 0xd4, 0xd6, 0xd8, 0xda, 0xdc, 0xde,
            0xe0, 0xe2, 0xe4, 0xe6, 0xe8, 0xea, 0xec, 0xee, 0xf0, 0xf2, 0xf4, 0xf6, 0xf8, 0xfa, 0xfc, 0xfe,
            0x1b, 0x19, 0x1f, 0x1d, 0x13, 0x11, 0x17, 0x15, 0x0b, 0x09, 0x0f, 0x0d, 0x03, 0x01, 0x07, 0x05,
            0x3b, 0x39, 0x3f, 0x3d, 0x33, 0x31, 0x37, 0x35, 0x2b, 0x29, 0x2f, 0x2d, 0x23, 0x21, 0x27, 0x25,
            0x5b, 0x59, 0x5f, 0x5d, 0x53, 0x51, 0x57, 0x55, 0x4b, 0x49, 0x4f, 0x4d, 0x43, 0x41, 0x47, 0x45,
            0x7b, 0x79, 0x7f, 0x7d, 0x73, 0x71, 0x77, 0x75, 0x6b, 0x69, 0x6f, 0x6d, 0x63, 0x61, 0x67, 0x65,
            0x9b, 0x99, 0x9f, 0x9d, 0x93, 0x91, 0x97, 0x95, 0x8b, 0x89, 0x8f, 0x8d, 0x83, 0x81, 0x87, 0x85,
            0xbb, 0xb9, 0xbf, 0xbd, 0xb3, 0xb1, 0xb7, 0xb5, 0xab, 0xa9, 0xaf, 0xad, 0xa3, 0xa1, 0xa7, 0xa5,
            0xdb, 0xd9, 0xdf, 0xdd, 0xd3, 0xd1, 0xd7, 0xd5, 0xcb, 0xc9, 0xcf, 0xcd, 0xc3, 0xc1, 0xc7, 0xc5,
            0xfb, 0xf9, 0xff, 0xfd, 0xf3, 0xf1, 0xf7, 0xf5, 0xeb, 0xe9, 0xef, 0xed, 0xe3, 0xe1, 0xe7, 0xe5
        ],

        /**
         *	precomputed matrix for Galois field multiplication by 3
         *	@private
         */
        mult_3: [
            0x00, 0x03, 0x06, 0x05, 0x0c, 0x0f, 0x0a, 0x09, 0x18, 0x1b, 0x1e, 0x1d, 0x14, 0x17, 0x12, 0x11,
            0x30, 0x33, 0x36, 0x35, 0x3c, 0x3f, 0x3a, 0x39, 0x28, 0x2b, 0x2e, 0x2d, 0x24, 0x27, 0x22, 0x21,
            0x60, 0x63, 0x66, 0x65, 0x6c, 0x6f, 0x6a, 0x69, 0x78, 0x7b, 0x7e, 0x7d, 0x74, 0x77, 0x72, 0x71,
            0x50, 0x53, 0x56, 0x55, 0x5c, 0x5f, 0x5a, 0x59, 0x48, 0x4b, 0x4e, 0x4d, 0x44, 0x47, 0x42, 0x41,
            0xc0, 0xc3, 0xc6, 0xc5, 0xcc, 0xcf, 0xca, 0xc9, 0xd8, 0xdb, 0xde, 0xdd, 0xd4, 0xd7, 0xd2, 0xd1,
            0xf0, 0xf3, 0xf6, 0xf5, 0xfc, 0xff, 0xfa, 0xf9, 0xe8, 0xeb, 0xee, 0xed, 0xe4, 0xe7, 0xe2, 0xe1,
            0xa0, 0xa3, 0xa6, 0xa5, 0xac, 0xaf, 0xaa, 0xa9, 0xb8, 0xbb, 0xbe, 0xbd, 0xb4, 0xb7, 0xb2, 0xb1,
            0x90, 0x93, 0x96, 0x95, 0x9c, 0x9f, 0x9a, 0x99, 0x88, 0x8b, 0x8e, 0x8d, 0x84, 0x87, 0x82, 0x81,
            0x9b, 0x98, 0x9d, 0x9e, 0x97, 0x94, 0x91, 0x92, 0x83, 0x80, 0x85, 0x86, 0x8f, 0x8c, 0x89, 0x8a,
            0xab, 0xa8, 0xad, 0xae, 0xa7, 0xa4, 0xa1, 0xa2, 0xb3, 0xb0, 0xb5, 0xb6, 0xbf, 0xbc, 0xb9, 0xba,
            0xfb, 0xf8, 0xfd, 0xfe, 0xf7, 0xf4, 0xf1, 0xf2, 0xe3, 0xe0, 0xe5, 0xe6, 0xef, 0xec, 0xe9, 0xea,
            0xcb, 0xc8, 0xcd, 0xce, 0xc7, 0xc4, 0xc1, 0xc2, 0xd3, 0xd0, 0xd5, 0xd6, 0xdf, 0xdc, 0xd9, 0xda,
            0x5b, 0x58, 0x5d, 0x5e, 0x57, 0x54, 0x51, 0x52, 0x43, 0x40, 0x45, 0x46, 0x4f, 0x4c, 0x49, 0x4a,
            0x6b, 0x68, 0x6d, 0x6e, 0x67, 0x64, 0x61, 0x62, 0x73, 0x70, 0x75, 0x76, 0x7f, 0x7c, 0x79, 0x7a,
            0x3b, 0x38, 0x3d, 0x3e, 0x37, 0x34, 0x31, 0x32, 0x23, 0x20, 0x25, 0x26, 0x2f, 0x2c, 0x29, 0x2a,
            0x0b, 0x08, 0x0d, 0x0e, 0x07, 0x04, 0x01, 0x02, 0x13, 0x10, 0x15, 0x16, 0x1f, 0x1c, 0x19, 0x1a
        ],

        /**
         *	precomputed matrix for Galois field multiplication by 9
         *	@private
         */
        mult_9: [
            0x00, 0x09, 0x12, 0x1b, 0x24, 0x2d, 0x36, 0x3f, 0x48, 0x41, 0x5a, 0x53, 0x6c, 0x65, 0x7e, 0x77,
            0x90, 0x99, 0x82, 0x8b, 0xb4, 0xbd, 0xa6, 0xaf, 0xd8, 0xd1, 0xca, 0xc3, 0xfc, 0xf5, 0xee, 0xe7,
            0x3b, 0x32, 0x29, 0x20, 0x1f, 0x16, 0x0d, 0x04, 0x73, 0x7a, 0x61, 0x68, 0x57, 0x5e, 0x45, 0x4c,
            0xab, 0xa2, 0xb9, 0xb0, 0x8f, 0x86, 0x9d, 0x94, 0xe3, 0xea, 0xf1, 0xf8, 0xc7, 0xce, 0xd5, 0xdc,
            0x76, 0x7f, 0x64, 0x6d, 0x52, 0x5b, 0x40, 0x49, 0x3e, 0x37, 0x2c, 0x25, 0x1a, 0x13, 0x08, 0x01,
            0xe6, 0xef, 0xf4, 0xfd, 0xc2, 0xcb, 0xd0, 0xd9, 0xae, 0xa7, 0xbc, 0xb5, 0x8a, 0x83, 0x98, 0x91,
            0x4d, 0x44, 0x5f, 0x56, 0x69, 0x60, 0x7b, 0x72, 0x05, 0x0c, 0x17, 0x1e, 0x21, 0x28, 0x33, 0x3a,
            0xdd, 0xd4, 0xcf, 0xc6, 0xf9, 0xf0, 0xeb, 0xe2, 0x95, 0x9c, 0x87, 0x8e, 0xb1, 0xb8, 0xa3, 0xaa,
            0xec, 0xe5, 0xfe, 0xf7, 0xc8, 0xc1, 0xda, 0xd3, 0xa4, 0xad, 0xb6, 0xbf, 0x80, 0x89, 0x92, 0x9b,
            0x7c, 0x75, 0x6e, 0x67, 0x58, 0x51, 0x4a, 0x43, 0x34, 0x3d, 0x26, 0x2f, 0x10, 0x19, 0x02, 0x0b,
            0xd7, 0xde, 0xc5, 0xcc, 0xf3, 0xfa, 0xe1, 0xe8, 0x9f, 0x96, 0x8d, 0x84, 0xbb, 0xb2, 0xa9, 0xa0,
            0x47, 0x4e, 0x55, 0x5c, 0x63, 0x6a, 0x71, 0x78, 0x0f, 0x06, 0x1d, 0x14, 0x2b, 0x22, 0x39, 0x30,
            0x9a, 0x93, 0x88, 0x81, 0xbe, 0xb7, 0xac, 0xa5, 0xd2, 0xdb, 0xc0, 0xc9, 0xf6, 0xff, 0xe4, 0xed,
            0x0a, 0x03, 0x18, 0x11, 0x2e, 0x27, 0x3c, 0x35, 0x42, 0x4b, 0x50, 0x59, 0x66, 0x6f, 0x74, 0x7d,
            0xa1, 0xa8, 0xb3, 0xba, 0x85, 0x8c, 0x97, 0x9e, 0xe9, 0xe0, 0xfb, 0xf2, 0xcd, 0xc4, 0xdf, 0xd6,
            0x31, 0x38, 0x23, 0x2a, 0x15, 0x1c, 0x07, 0x0e, 0x79, 0x70, 0x6b, 0x62, 0x5d, 0x54, 0x4f, 0x46
        ],

        /**
         *	precomputed matrix for Galois field multiplication by 11
         *	@private
         */
        mult_11: [
            0x00, 0x0b, 0x16, 0x1d, 0x2c, 0x27, 0x3a, 0x31, 0x58, 0x53, 0x4e, 0x45, 0x74, 0x7f, 0x62, 0x69,
            0xb0, 0xbb, 0xa6, 0xad, 0x9c, 0x97, 0x8a, 0x81, 0xe8, 0xe3, 0xfe, 0xf5, 0xc4, 0xcf, 0xd2, 0xd9,
            0x7b, 0x70, 0x6d, 0x66, 0x57, 0x5c, 0x41, 0x4a, 0x23, 0x28, 0x35, 0x3e, 0x0f, 0x04, 0x19, 0x12,
            0xcb, 0xc0, 0xdd, 0xd6, 0xe7, 0xec, 0xf1, 0xfa, 0x93, 0x98, 0x85, 0x8e, 0xbf, 0xb4, 0xa9, 0xa2,
            0xf6, 0xfd, 0xe0, 0xeb, 0xda, 0xd1, 0xcc, 0xc7, 0xae, 0xa5, 0xb8, 0xb3, 0x82, 0x89, 0x94, 0x9f,
            0x46, 0x4d, 0x50, 0x5b, 0x6a, 0x61, 0x7c, 0x77, 0x1e, 0x15, 0x08, 0x03, 0x32, 0x39, 0x24, 0x2f,
            0x8d, 0x86, 0x9b, 0x90, 0xa1, 0xaa, 0xb7, 0xbc, 0xd5, 0xde, 0xc3, 0xc8, 0xf9, 0xf2, 0xef, 0xe4,
            0x3d, 0x36, 0x2b, 0x20, 0x11, 0x1a, 0x07, 0x0c, 0x65, 0x6e, 0x73, 0x78, 0x49, 0x42, 0x5f, 0x54,
            0xf7, 0xfc, 0xe1, 0xea, 0xdb, 0xd0, 0xcd, 0xc6, 0xaf, 0xa4, 0xb9, 0xb2, 0x83, 0x88, 0x95, 0x9e,
            0x47, 0x4c, 0x51, 0x5a, 0x6b, 0x60, 0x7d, 0x76, 0x1f, 0x14, 0x09, 0x02, 0x33, 0x38, 0x25, 0x2e,
            0x8c, 0x87, 0x9a, 0x91, 0xa0, 0xab, 0xb6, 0xbd, 0xd4, 0xdf, 0xc2, 0xc9, 0xf8, 0xf3, 0xee, 0xe5,
            0x3c, 0x37, 0x2a, 0x21, 0x10, 0x1b, 0x06, 0x0d, 0x64, 0x6f, 0x72, 0x79, 0x48, 0x43, 0x5e, 0x55,
            0x01, 0x0a, 0x17, 0x1c, 0x2d, 0x26, 0x3b, 0x30, 0x59, 0x52, 0x4f, 0x44, 0x75, 0x7e, 0x63, 0x68,
            0xb1, 0xba, 0xa7, 0xac, 0x9d, 0x96, 0x8b, 0x80, 0xe9, 0xe2, 0xff, 0xf4, 0xc5, 0xce, 0xd3, 0xd8,
            0x7a, 0x71, 0x6c, 0x67, 0x56, 0x5d, 0x40, 0x4b, 0x22, 0x29, 0x34, 0x3f, 0x0e, 0x05, 0x18, 0x13,
            0xca, 0xc1, 0xdc, 0xd7, 0xe6, 0xed, 0xf0, 0xfb, 0x92, 0x99, 0x84, 0x8f, 0xbe, 0xb5, 0xa8, 0xa3
        ],

        /**
         *	precomputed matrix for Galois field multiplication by 13
         *	@private
         */
        mult_13: [
            0x00, 0x0d, 0x1a, 0x17, 0x34, 0x39, 0x2e, 0x23, 0x68, 0x65, 0x72, 0x7f, 0x5c, 0x51, 0x46, 0x4b,
            0xd0, 0xdd, 0xca, 0xc7, 0xe4, 0xe9, 0xfe, 0xf3, 0xb8, 0xb5, 0xa2, 0xaf, 0x8c, 0x81, 0x96, 0x9b,
            0xbb, 0xb6, 0xa1, 0xac, 0x8f, 0x82, 0x95, 0x98, 0xd3, 0xde, 0xc9, 0xc4, 0xe7, 0xea, 0xfd, 0xf0,
            0x6b, 0x66, 0x71, 0x7c, 0x5f, 0x52, 0x45, 0x48, 0x03, 0x0e, 0x19, 0x14, 0x37, 0x3a, 0x2d, 0x20,
            0x6d, 0x60, 0x77, 0x7a, 0x59, 0x54, 0x43, 0x4e, 0x05, 0x08, 0x1f, 0x12, 0x31, 0x3c, 0x2b, 0x26,
            0xbd, 0xb0, 0xa7, 0xaa, 0x89, 0x84, 0x93, 0x9e, 0xd5, 0xd8, 0xcf, 0xc2, 0xe1, 0xec, 0xfb, 0xf6,
            0xd6, 0xdb, 0xcc, 0xc1, 0xe2, 0xef, 0xf8, 0xf5, 0xbe, 0xb3, 0xa4, 0xa9, 0x8a, 0x87, 0x90, 0x9d,
            0x06, 0x0b, 0x1c, 0x11, 0x32, 0x3f, 0x28, 0x25, 0x6e, 0x63, 0x74, 0x79, 0x5a, 0x57, 0x40, 0x4d,
            0xda, 0xd7, 0xc0, 0xcd, 0xee, 0xe3, 0xf4, 0xf9, 0xb2, 0xbf, 0xa8, 0xa5, 0x86, 0x8b, 0x9c, 0x91,
            0x0a, 0x07, 0x10, 0x1d, 0x3e, 0x33, 0x24, 0x29, 0x62, 0x6f, 0x78, 0x75, 0x56, 0x5b, 0x4c, 0x41,
            0x61, 0x6c, 0x7b, 0x76, 0x55, 0x58, 0x4f, 0x42, 0x09, 0x04, 0x13, 0x1e, 0x3d, 0x30, 0x27, 0x2a,
            0xb1, 0xbc, 0xab, 0xa6, 0x85, 0x88, 0x9f, 0x92, 0xd9, 0xd4, 0xc3, 0xce, 0xed, 0xe0, 0xf7, 0xfa,
            0xb7, 0xba, 0xad, 0xa0, 0x83, 0x8e, 0x99, 0x94, 0xdf, 0xd2, 0xc5, 0xc8, 0xeb, 0xe6, 0xf1, 0xfc,
            0x67, 0x6a, 0x7d, 0x70, 0x53, 0x5e, 0x49, 0x44, 0x0f, 0x02, 0x15, 0x18, 0x3b, 0x36, 0x21, 0x2c,
            0x0c, 0x01, 0x16, 0x1b, 0x38, 0x35, 0x22, 0x2f, 0x64, 0x69, 0x7e, 0x73, 0x50, 0x5d, 0x4a, 0x47,
            0xdc, 0xd1, 0xc6, 0xcb, 0xe8, 0xe5, 0xf2, 0xff, 0xb4, 0xb9, 0xae, 0xa3, 0x80, 0x8d, 0x9a, 0x97
        ],

        /**
         *	precomputed matrix for Galois field multiplication by 14
         *	@private
         */
        mult_14: [
            0x00, 0x0e, 0x1c, 0x12, 0x38, 0x36, 0x24, 0x2a, 0x70, 0x7e, 0x6c, 0x62, 0x48, 0x46, 0x54, 0x5a,
            0xe0, 0xee, 0xfc, 0xf2, 0xd8, 0xd6, 0xc4, 0xca, 0x90, 0x9e, 0x8c, 0x82, 0xa8, 0xa6, 0xb4, 0xba,
            0xdb, 0xd5, 0xc7, 0xc9, 0xe3, 0xed, 0xff, 0xf1, 0xab, 0xa5, 0xb7, 0xb9, 0x93, 0x9d, 0x8f, 0x81,
            0x3b, 0x35, 0x27, 0x29, 0x03, 0x0d, 0x1f, 0x11, 0x4b, 0x45, 0x57, 0x59, 0x73, 0x7d, 0x6f, 0x61,
            0xad, 0xa3, 0xb1, 0xbf, 0x95, 0x9b, 0x89, 0x87, 0xdd, 0xd3, 0xc1, 0xcf, 0xe5, 0xeb, 0xf9, 0xf7,
            0x4d, 0x43, 0x51, 0x5f, 0x75, 0x7b, 0x69, 0x67, 0x3d, 0x33, 0x21, 0x2f, 0x05, 0x0b, 0x19, 0x17,
            0x76, 0x78, 0x6a, 0x64, 0x4e, 0x40, 0x52, 0x5c, 0x06, 0x08, 0x1a, 0x14, 0x3e, 0x30, 0x22, 0x2c,
            0x96, 0x98, 0x8a, 0x84, 0xae, 0xa0, 0xb2, 0xbc, 0xe6, 0xe8, 0xfa, 0xf4, 0xde, 0xd0, 0xc2, 0xcc,
            0x41, 0x4f, 0x5d, 0x53, 0x79, 0x77, 0x65, 0x6b, 0x31, 0x3f, 0x2d, 0x23, 0x09, 0x07, 0x15, 0x1b,
            0xa1, 0xaf, 0xbd, 0xb3, 0x99, 0x97, 0x85, 0x8b, 0xd1, 0xdf, 0xcd, 0xc3, 0xe9, 0xe7, 0xf5, 0xfb,
            0x9a, 0x94, 0x86, 0x88, 0xa2, 0xac, 0xbe, 0xb0, 0xea, 0xe4, 0xf6, 0xf8, 0xd2, 0xdc, 0xce, 0xc0,
            0x7a, 0x74, 0x66, 0x68, 0x42, 0x4c, 0x5e, 0x50, 0x0a, 0x04, 0x16, 0x18, 0x32, 0x3c, 0x2e, 0x20,
            0xec, 0xe2, 0xf0, 0xfe, 0xd4, 0xda, 0xc8, 0xc6, 0x9c, 0x92, 0x80, 0x8e, 0xa4, 0xaa, 0xb8, 0xb6,
            0x0c, 0x02, 0x10, 0x1e, 0x34, 0x3a, 0x28, 0x26, 0x7c, 0x72, 0x60, 0x6e, 0x44, 0x4a, 0x58, 0x56,
            0x37, 0x39, 0x2b, 0x25, 0x0f, 0x01, 0x13, 0x1d, 0x47, 0x49, 0x5b, 0x55, 0x7f, 0x71, 0x63, 0x6d,
            0xd7, 0xd9, 0xcb, 0xc5, 0xef, 0xe1, 0xf3, 0xfd, 0xa7, 0xa9, 0xbb, 0xb5, 0x9f, 0x91, 0x83, 0x8d
        ],

        // ----------------------------------------------------------------------------------------------------

        /**
         *	Sanity test for the class.
         *
         *	NOTE: You must initialize the instance with data.block_mode set to {@link ECB}
         *	and data.pad_mode set to {@link ZeroPadding} for this to work!
         *	See {@link BlockCipher#initialize} for more information on initialization properties.
         *
         *	@return {boolean}
         */
        test: function()
        {
            this.debug_write('AES-256 TEST');
            this._do_test(
                '000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f',
                '00112233445566778899aabbccddeeff',
                '8ea2b7ca516745bfeafc49904b496089'
            );

            this.debug_write('AES-192 TEST');
            this._do_test(
                '000102030405060708090a0b0c0d0e0f1011121314151617',
                '00112233445566778899aabbccddeeff',
                'dda97ca4864cdfe06eaf70a0ec0d7191'
            );

            this.debug_write('AES-128 TEST');
            this._do_test(
                '000102030405060708090a0b0c0d0e0f',
                '00112233445566778899aabbccddeeff',
                '69c4e0d86a7b0430d8cdb78070b4c55a'
            );

            return true;
        },

        /**
         *	Run the test for a key / plaintext / expected value combo
         *
         *	@private
         *	@throws						Throws an error if any test fails.
         *	@param {string} key			Hexadecimal string for key
         *	@param {string} plaintext	Hexadecimal string for plaintext
         *	@param {string} expected	Hexadecimal string for expected value
         *	@return {boolean}
         */
        _do_test: function(key, plaintext, expected)
        {
            var key_bin		= convert.hex_to_binstring(key);
            var plain_bin	= convert.hex_to_binstring(plaintext);

            this.set_key(key_bin);

            this.debug_write('------------------------------------------');
            this.debug_write('Test key: [binary] (length: '+key_bin.length+' bytes)');
            this.debug_write('Test key (hex): '+key);
            this.debug_write('Plaintext: [binary] (length: '+plain_bin.length+' bytes)');
            this.debug_write('Plaintext (hex): '+plaintext);
            this.debug_write('Expecting ciphertext (hex): '+expected);

            var ciphertext	= this.encrypt(plain_bin);
            var hex 		= convert.binstring_to_hex(ciphertext);

            this.debug_write('Ciphertext: [binary] (length: '+ciphertext.length+' bytes)');
            this.debug_write('Ciphertext (hex): '+hex);

            if (hex != expected)
                throw new Error('TEST FAILED: Invalid ciphertext! Expected: '+expected+', Got: ' + hex);

            this.debug_write('GOT EXPECTED CIPHERTEXT!');

            var plaintext2	= this.decrypt(ciphertext);
            var hex2 		= convert.binstring_to_hex(plaintext2);

            this.debug_write('Decrypted ciphertext: [binary] (length: '+plaintext2.length+' bytes)');
            this.debug_write('Decrypted ciphertext (hex): '+hex2);

            if (hex2 != plaintext)
                throw new Error('TEST FAILED: Invalid decrypted ciphertext! Expected: '+plaintext+', Got: ' + hex2);

            this.debug_write('SUCCESSFULLY DECRYPTED CIPHERTEXT!');
            this.debug_write('------------------------------------------');

            return true;
        }

    });
