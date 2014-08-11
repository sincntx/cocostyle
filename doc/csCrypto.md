csCrypto
=========

### MD5

```
var str = "abc";
str = csCrypto.md5(str);
```

### SHA1

```
var str = "abc";
str = csCrypto.sha1(str);
```

### SHA256

```
var str = "abc";
str = csCrypto.sha256("hex", str);
str = csCrypto.sha256("dec", str);
str = csCrypto.sha256("bin", str);
```

### AES

```
var aes        = new AES({block_mode:CBC, iv: 'asdfasdfasdfasdf', key: convert.hex_to_binstring('0123456712345678234567893456789a0123456712345678234567893456789a')});
var data        = "rank2";
var encrypted   = convert.binstring_to_hex(aes.encrypt(data));
```

### Class Detail

- `{String} csCrypto.md5(String string)`
- `{String} csCrypto.sha1(String string)`
- `{String} csCrypto.sha256(String mode(hex, bin, dec), String string)`
- [Most of the AES code from cowcrypt](http://rubbingalcoholic.github.io/cowcrypt/api/AES.html)
