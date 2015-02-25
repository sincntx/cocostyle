var csVerbalExpressions = cc.Class.extend({
    _prefixes : "",
    _source : "",
    _suffixes : "",
    _modifiers : "gm",
    RegExp: null,

    ctor : function() {
        this.RegExp = new RegExp();
    },
    sanitize : function( value ) {
        if(value.source) return value.source;
        if(typeof value === "number") return value;
        return value.replace(/[^\w]/g, function(character) { return "\\" + character; });
    },
    add: function( value ) {
        this._source += value || "";
        this.RegExp.compile(this._prefixes + this._source + this._suffixes, this._modifiers);
        return this;
    },
    startOfLine: function( enable ) {
        enable = ( enable !== false );
        this._prefixes = enable ? "^" : "";
        this.add( "" );
        return this;
    },
    endOfLine : function( enable ) {
        enable = ( enable !== false );
        this._suffixes = enable ? "$" : "";
        this.add( "" );
        return this;
    },
    then : function( value ) {
        value = this.sanitize( value );
        this.add( "(?:" + value + ")" );
        return this;
    },
    find : function( value ) {
        return this.then( value );
    },
    maybe : function( value ) {
        value = this.sanitize(value);
        this.add( "(?:" + value + ")?" );
        return this;
    },
    anything : function() {
        this.add( "(?:.*)" );
        return this;
    },
    anythingBut : function( value ) {
        value = this.sanitize( value );
        this.add( "(?:[^" + value + "]*)" );
        return this;
    },
    something : function() {
        this.add( "(?:.+)" );
        return this;
    },
    somethingBut : function( value ) {
        value = this.sanitize( value );
        this.add( "(?:[^" + value + "]+)" );
        return this;
    },
    replace : function( source, value ) {
        source = source.toString();
        return source.replace( this, value );
    },
    lineBreak : function() {
        this.add( "(?:\\r\\n|\\r|\\n)" ); // Unix + windows CLRF
        return this;
    },
    br : function() {
        return this.lineBreak();
    },
    tab : function() {
        this.add( "\\t" );
        return this;
    },
    word : function() {
        this.add( "\\w+" );
        return this;
    },
    anyOf : function( value ) {
        value = this.sanitize(value);
        this.add( "["+ value +"]" );
        return this;
    },
    any : function( value ) {
        return this.anyOf( value );
    },
    range : function() {
        var value = "[";

        for(var _to = 1; _to < arguments.length; _to += 2) {
            var from = this.sanitize( arguments[_to - 1] );
            var to = this.sanitize( arguments[_to] );

            value += from + "-" + to;
        }

        value += "]";

        this.add( value );
        return this;
    },
    addModifier : function( modifier ) {
        if( this._modifiers.indexOf( modifier ) == -1 ) {
            this._modifiers += modifier;
        }
        this.add("");
        return this;
    },
    removeModifier : function( modifier ) {
        this._modifiers = this._modifiers.replace( modifier, "" );
        this.add("");
        return this;
    },
    withAnyCase : function( enable ) {

        if(enable !== false) this.addModifier( "i" );
        else this.removeModifier( "i" );

        this.add( "" );
        return this;

    },
    stopAtFirst : function( enable ) {

        if(enable !== false) this.removeModifier( "g" );
        else this.addModifier( "g" );

        this.add( "" );
        return this;

    },
    searchOneLine : function( enable ) {

        if(enable !== false) this.removeModifier( "m" );
        else this.addModifier( "m" );

        this.add( "" );
        return this;

    },
    repeatPrevious: function( ) {
        var value;
        if(arguments.length <= 1) {
            if(/\d+/.exec(arguments[0]) !== null) {
                value = "{" + arguments[0] + "}";
            }
        } else {
            var values = [];
            for(var i=0; i< arguments.length; i++) {
                if(/\d+/.exec(arguments[i]) !== null) {
                    values.push(arguments[i]);
                }
            }

            value = "{" + values.join(",") + "}";
        }

        this.add( value || "" );
        return ( this );
    },
    multiple : function( value ) {
        value = value.source ? value.source : this.sanitize(value);
        if (arguments.length === 1) {
            this.add("(?:" + value + ")*");
        }
        if (arguments.length > 1) {
            this.add("(?:" + value + ")");
            this.add("{" + arguments[1] + "}");
        }
        return this;
    },
    or : function( value ) {

        this._prefixes += "(?:";
        this._suffixes = ")" + this._suffixes;

        this.add( ")|(?:" );
        if(value) this.then( value );

        return this;
    },
    beginCapture : function() {
        this._suffixes += ")";
        this.add( "(", false );

        return this;
    },
    endCapture : function() {
        this._suffixes = this._suffixes.substring(0, this._suffixes.length - 1 );
        this.add( ")", true );

        return this;
    },
    toRegExp : function() {
        var arr = this.toString().match(/\/(.*)\/([a-z]+)?/);
        return new RegExp(arr[1],arr[2]);
    }
});