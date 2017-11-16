var model = {
	table: 'test',
    FieldID: 'id',
    LIST_FIELDS: 'openid,send_no,state,status,tim,tim_up',

    // createNo: function(value) {
    //     var no = 'S' + AssistNo.createNo(value);
    //     return no;
    // },

    // create: function(datas, next) {
    //     if (isun(datas.status)) datas.status = 1;
    //     if (!datas.tim) datas.tim = DCS.timer();
    //     // if (!datas.no) datas.no = this.createNo();
    //     return this.insert(datas, next);
    // },

    // modify: function(query, datas, next) {
    //     if (!datas.tim_up) datas.tim_up = DCS.timer();
    //     return this.update(query, datas, next);
    // },

    // remove: function(query, datas, next) {
    //     if (isun(datas.status)) datas.status = 7;
    //     if (!datas.tim_up) datas.tim_up = DCS.timer();
    //     return this.update(query, datas, next);
    // },
};

exports = module.exports = model;