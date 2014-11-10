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

### 클래스 세부사항

- `{String} csCrypto.md5(String string)`
- `{String} csCrypto.sha1(String string)`
- `{String} csCrypto.sha256(String mode(hex, bin, dec), String string)`
- 대부분의 AES 코드는 [cowcrypt](http://rubbingalcoholic.github.io/cowcrypt/api/AES.html)를 참조했습니다.
