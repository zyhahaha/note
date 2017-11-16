var utilTestCacher = {
    CacherDump: require('./cacher_dump'),
    cacher_dump: null,
    init: function() {
        var that = this;
        if (!that.cacher_dump) {
            that.cacher_dump = new that.CacherDump('sid');
        }
        return that.cacher_dump;
    },

    reader: function(next) {
        var that = this;
        that.init().reader(function() {
            next(that.cacher_dump.values || {});
        });
    },

    get: function(key, next) {
        var that = this;
        that.init().get(key, function(content) {
            next(content);
        });
    },
    set: function(key, value, next) {
        var that = this;
        that.init().set(key, value, function(content) {
            next(content);
        });
    },
    remove: function(key, next) {
        var that = this;
        that.init().remove(key, function(content) {
            next(content);
        });
    },
    // 缓存使用方式
    // var CacherDump=vdcs.modules('cacher/dump');
    // var cacher=new CacherDump();
    // cacher.remove(key,_next);
    // cacher.set(key,value,_next);
    // cacher.get(key,function(content){});

};
exports = module.exports = utilTestCacher;