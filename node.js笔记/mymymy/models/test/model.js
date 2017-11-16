var model = {
    table: 'test',
    FieldID: 'id',
    LIST_FIELDS: 'openid,send_no,state,status,tim,tim_up',

    test: function() {
        this.import('test/test').test();
    },

    // createNo: function(value) {
    //     var no = 'S' + AssistNo.createNo(value);
    //     return no;
    // },

    query: function(query, next) {
        if (!datas.table) datas.table = this.table;
        // if (!datas.tim_up) datas.tim_up = DCS.timer();
        return this.db.query(query, next);
    },

    create: function(datas, next) {
        if (!datas.table) datas.table = this.table;
        // if (isun(datas.status)) datas.status = 1;
        // if (!datas.tim) datas.tim = DCS.timer();
        // if (!datas.no) datas.no = this.createNo();
        return this.db.insert(datas, next);
    },

    modify: function(query, datas, next) {
        if (!datas.table) datas.table = this.table;
        // if (!datas.tim_up) datas.tim_up = DCS.timer();
        return this.db.update(query, datas, next);
    },

    remove: function(query, datas, next) {
        if (!datas.table) datas.table = this.table;
        // if (!datas.status) datas.status = 7;
        // if (!datas.tim_up) datas.tim_up = DCS.timer();
        return this.db.update(query, datas, next);
    },
};

exports = module.exports = model;