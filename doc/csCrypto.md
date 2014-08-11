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

### Class Detail

- `{String} csCrypto.md5(String string)`
- `{String} csCrypto.sha1(String string)`
- `{String} csCrypto.sha256(String mode(hex, bin, dec), String string)`
