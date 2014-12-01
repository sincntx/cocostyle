var csValidator = cc.Class.extend({
    isEmail: function (str) {
        var email = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
        return email.test(str);
    },
    isURL: function (url, options) {
        var default_url_options = {
            protocols: [ 'http', 'https', 'ftp' ]
            , require_tld: true
            , require_protocol: false
            , allow_underscores: false
        };

        if (!url || url.length >= 2083) {
            return false;
        }
        if (url.indexOf('mailto:') === 0) {
            return false;
        }
        options = this.merge(options, default_url_options);
        var protocol, user, pass, auth, host, hostname, port,
            port_str, path, query, hash, split;
        split = url.split('://');
        if (split.length > 1) {
            protocol = split.shift();
            if (options.protocols.indexOf(protocol) === -1) {
                return false;
            }
        } else if (options.require_protocol) {
            return false;
        }
        url = split.join('://');
        split = url.split('#');
        url = split.shift();
        hash = split.join('#');
        if (hash && /\s/.test(hash)) {
            return false;
        }
        split = url.split('?');
        url = split.shift();
        query = split.join('?');
        if (query && /\s/.test(query)) {
            return false;
        }
        split = url.split('/');
        url = split.shift();
        path = split.join('/');
        if (path && /\s/.test(path)) {
            return false;
        }
        split = url.split('@');
        if (split.length > 1) {
            auth = split.shift();
            if (auth.indexOf(':') >= 0) {
                auth = auth.split(':');
                user = auth.shift();
                if (!/^\S+$/.test(user)) {
                    return false;
                }
                pass = auth.join(':');
                if (!/^\S*$/.test(user)) {
                    return false;
                }
            }
        }
        hostname = split.join('@');
        split = hostname.split(':');
        host = split.shift();
        if (split.length) {
            port_str = split.join(':');
            port = parseInt(port_str, 10);
            if (!/^[0-9]+$/.test(port_str) || port <= 0 || port > 65535) {
                return false;
            }
        }
        if (!this.isIP(host) && !this.isFQDN(host, options) &&
            host !== 'localhost') {
            return false;
        }
        if (options.host_whitelist &&
            options.host_whitelist.indexOf(host) === -1) {
            return false;
        }
        if (options.host_blacklist &&
            options.host_blacklist.indexOf(host) !== -1) {
            return false;
        }
        return true;
    },
    isIP: function (str, version) {
        var ipv4Maybe = /^(\d?\d?\d)\.(\d?\d?\d)\.(\d?\d?\d)\.(\d?\d?\d)$/
            , ipv6 = /^::|^::1|^([a-fA-F0-9]{1,4}::?){1,7}([a-fA-F0-9]{1,4})$/;
        version = this.toString(version);
        if (!version) {
            return this.isIP(str, 4) || this.isIP(str, 6);
        } else if (version === '4') {
            if (!ipv4Maybe.test(str)) {
                return false;
            }
            var parts = str.split('.').sort(function (a, b) {
                return a - b;
            });
            return parts[3] <= 255;
        }
        return version === '6' && ipv6.test(str);
    },
    isFQDN: function (str, options) {
        var default_fqdn_options = {
            require_tld: true
            , allow_underscores: false
        };
        options = this.merge(options, default_fqdn_options);
        var parts = str.split('.');
        if (options.require_tld) {
            var tld = parts.pop();
            if (!parts.length || !/^[a-z]{2,}$/i.test(tld)) {
                return false;
            }
        }
        for (var part, i = 0; i < parts.length; i++) {
            part = parts[i];
            if (options.allow_underscores) {
                if (part.indexOf('__') >= 0) {
                    return false;
                }
                part = part.replace(/_/g, '');
            }
            if (!/^[a-z\\u00a1-\\uffff0-9-]+$/i.test(part)) {
                return false;
            }
            if (part[0] === '-' || part[part.length - 1] === '-' ||
                part.indexOf('---') >= 0) {
                return false;
            }
        }
        return true;
    },
    isAlpha: function (str) {
        var alpha = /^[a-zA-Z]+$/;
        return alpha.test(str);
    },

    isAlphanumeric: function (str) {
        var alphanumeric = /^[a-zA-Z0-9]+$/;
        return alphanumeric.test(str);
    },

    isNumeric: function (str) {
        var numeric = /^-?[0-9]+$/;
        return numeric.test(str);
    },
    isHexadecimal: function (str) {
        var hexadecimal = /^[0-9a-fA-F]+$/;
        return hexadecimal.test(str);
    },
    isHexColor: function (str) {
        var hexcolor = /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
        return hexcolor.test(str);
    },
    isLowercase: function (str) {
        return str === str.toLowerCase();
    },
    isUppercase: function (str) {
        return str === str.toUpperCase();
    },
    isInt: function (str) {
        var int = /^(?:-?(?:0|[1-9][0-9]*))$/;
        return int.test(str);
    },
    isFloat: function (str) {
        var float = /^(?:-?(?:[0-9]+))?(?:\.[0-9]*)?(?:[eE][\+\-]?(?:[0-9]+))?$/;
        return str !== '' && float.test(str);
    },
    isDivisibleBy: function (str, num) {
        return this.toFloat(str) % this.toInt(num) === 0;
    },
    isNull: function (str) {
        return str.length === 0;
    },
    isLength: function (str, min, max) {
        var surrogatePairs = str.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g) || [];
        var len = str.length - surrogatePairs.length;
        return len >= min && (typeof max === 'undefined' || len <= max);
    },
    isByteLength: function (str, min, max) {
        return str.length >= min && (typeof max === 'undefined' || str.length <= max);
    },
    isUUID: function (str, version) {
        var uuid = {
            '3': /^[0-9A-F]{8}-[0-9A-F]{4}-3[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i
            , '4': /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
            , '5': /^[0-9A-F]{8}-[0-9A-F]{4}-5[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
            , all: /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i
        };
        var pattern = uuid[version ? version : 'all'];
        return pattern && pattern.test(str);
    },
    isDate: function (str) {
        return !isNaN(Date.parse(str));
    },
    isAfter: function (str, date) {
        var comparison = this.toDate(date || new Date())
            , original = this.toDate(str);
        return !!(original && comparison && original > comparison);
    },
    isBefore: function (str, date) {
        var comparison = this.toDate(date || new Date())
            , original = this.toDate(str);
        return original && comparison && original < comparison;
    },
    isIn: function (str, options) {
        if (!options || typeof options.indexOf !== 'function') {
            return false;
        }
        if (Object.prototype.toString.call(options) === '[object Array]') {
            var array = [];
            for (var i = 0, len = options.length; i < len; i++) {
                array[i] = this.toString(options[i]);
            }
            options = array;
        }
        return options.indexOf(str) >= 0;
    },
    isCreditCard: function (str) {
        var creditCard = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
        var sanitized = str.replace(/[^0-9]+/g, '');
        if (!creditCard.test(sanitized)) {
            return false;
        }
        var sum = 0, digit, tmpNum, shouldDouble;
        for (var i = sanitized.length - 1; i >= 0; i--) {
            digit = sanitized.substring(i, (i + 1));
            tmpNum = parseInt(digit, 10);
            if (shouldDouble) {
                tmpNum *= 2;
                if (tmpNum >= 10) {
                    sum += ((tmpNum % 10) + 1);
                } else {
                    sum += tmpNum;
                }
            } else {
                sum += tmpNum;
            }
            shouldDouble = !shouldDouble;
        }
        return !!((sum % 10) === 0 ? sanitized : false);
    },
    isISBN: function (str, version) {
        var isbn10Maybe = /^(?:[0-9]{9}X|[0-9]{10})$/
            , isbn13Maybe = /^(?:[0-9]{13})$/;

        version = this.toString(version);
        if (!version) {
            return this.isISBN(str, 10) || this.isISBN(str, 13);
        }
        var sanitized = str.replace(/[\s-]+/g, '')
            , checksum = 0, i;
        if (version === '10') {
            if (!isbn10Maybe.test(sanitized)) {
                return false;
            }
            for (i = 0; i < 9; i++) {
                checksum += (i + 1) * sanitized.charAt(i);
            }
            if (sanitized.charAt(9) === 'X') {
                checksum += 10 * 10;
            } else {
                checksum += 10 * sanitized.charAt(9);
            }
            if ((checksum % 11) === 0) {
                return !!sanitized;
            }
        } else  if (version === '13') {
            if (!isbn13Maybe.test(sanitized)) {
                return false;
            }
            var factor = [ 1, 3 ];
            for (i = 0; i < 12; i++) {
                checksum += factor[i % 2] * sanitized.charAt(i);
            }
            if (sanitized.charAt(12) - ((10 - (checksum % 10)) % 10) === 0) {
                return !!sanitized;
            }
        }
        return false;
    },
    isJSON: function (str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    },
    isMultibyte : function (str) {
        var multibyte = /[^\x00-\x7F]/;
        return multibyte.test(str);
    },
    isAscii : function (str) {
        var ascii = /^[\x00-\x7F]+$/;
        return ascii.test(str);
    },
    isFullWidth : function (str) {
        var fullWidth = /[^\u0020-\u007E\uFF61-\uFF9F\uFFA0-\uFFDC\uFFE8-\uFFEE0-9a-zA-Z]/;
        return fullWidth.test(str);
    },
    isHalfWidth : function (str) {
        var halfWidth = /[\u0020-\u007E\uFF61-\uFF9F\uFFA0-\uFFDC\uFFE8-\uFFEE0-9a-zA-Z]/;;
        return halfWidth.test(str);
    },
    isVariableWidth : function (str) {
        var fullWidth = /[^\u0020-\u007E\uFF61-\uFF9F\uFFA0-\uFFDC\uFFE8-\uFFEE0-9a-zA-Z]/
            , halfWidth = /[\u0020-\u007E\uFF61-\uFF9F\uFFA0-\uFFDC\uFFE8-\uFFEE0-9a-zA-Z]/;
        return fullWidth.test(str) && halfWidth.test(str);
    },
    isSurrogatePair : function (str) {
        var surrogatePair = /[\uD800-\uDBFF][\uDC00-\uDFFF]/;
        return surrogatePair.test(str);
    },
    isBase64 : function (str) {
        var base64 = /^(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=|[A-Za-z0-9+\/]{4})$/;
        return base64.test(str);
    },
    isMongoId : function (str) {
        return this.isHexadecimal(str) && str.length === 24;
    },
    toString : function (input) {
        if (typeof input === 'object' && input !== null && input.toString) {
            input = input.toString();
        } else if (input === null || typeof input === 'undefined' || (isNaN(input) && !input.length)) {
            input = '';
        } else if (typeof input !== 'string') {
            input += '';
        }
        return input;
    },
    toDate : function (date) {
        if (Object.prototype.toString.call(date) === '[object Date]') {
            return date;
        }
        date = Date.parse(date);
        return !isNaN(date) ? new Date(date) : null;
    },
    toFloat : function (str) {
        return parseFloat(str);
    },
    toInt : function (str, radix) {
        return parseInt(str, radix || 10);
    },
    toBoolean : function (str, strict) {
        if (strict) {
            return str === '1' || str === 'true';
        }
        return str !== '0' && str !== 'false' && str !== '';
    },
    equals : function (str, comparison) {
        return str === this.toString(comparison);
    },
    contains : function (str, elem) {
        return str.indexOf(this.toString(elem)) >= 0;
    },
    matches : function (str, pattern, modifiers) {
        if (Object.prototype.toString.call(pattern) !== '[object RegExp]') {
            pattern = new RegExp(pattern, modifiers);
        }
        return pattern.test(str);
    },
    ltrim : function (str, chars) {
        var pattern = chars ? new RegExp('^[' + chars + ']+', 'g') : /^\s+/g;
        return str.replace(pattern, '');
    },
    rtrim : function (str, chars) {
        var pattern = chars ? new RegExp('[' + chars + ']+$', 'g') : /\s+$/g;
        return str.replace(pattern, '');
    },
    trim : function (str, chars) {
        var pattern = chars ? new RegExp('^[' + chars + ']+|[' + chars + ']+$', 'g') : /^\s+|\s+$/g;
        return str.replace(pattern, '');
    },
    escape : function (str) {
        return (str.replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#x27;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;'));
    },
    stripLow : function (str, keep_new_lines) {
        var chars = keep_new_lines ? '\x00-\x09\x0B\x0C\x0E-\x1F\x7F' : '\x00-\x1F\x7F';
        return this.blacklist(str, chars);
    },
    whitelist : function (str, chars) {
        return str.replace(new RegExp('[^' + chars + ']+', 'g'), '');
    },
    blacklist : function (str, chars) {
        return str.replace(new RegExp('[' + chars + ']+', 'g'), '');
    },
    normalizeEmail : function (email, options) {
        var default_normalize_email_options = {
            lowercase: true
        };
        options = merge(options, default_normalize_email_options);
        if (!this.isEmail(email)) {
            return false;
        }
        var parts = email.split('@', 2);
        parts[1] = parts[1].toLowerCase();
        if (options.lowercase) {
            parts[0] = parts[0].toLowerCase();
        }
        if (parts[1] === 'gmail.com' || parts[1] === 'googlemail.com') {
            if (!options.lowercase) {
                parts[0] = parts[0].toLowerCase();
            }
            parts[0] = parts[0].replace(/\./g, '').split('+')[0];
            parts[1] = 'gmail.com';
        }
        return parts.join('@');
    },
    merge: function (obj, defaults) {
        obj = obj || {};
        for (var key in defaults) {
            if (typeof obj[key] === 'undefined') {
                obj[key] = defaults[key];
            }
        }
        return obj;
    }
});
