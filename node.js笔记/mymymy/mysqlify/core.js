var mysql = require('mysql');
var db = {};
db.createConnection = function(config) {
    var connection = mysql.createConnection({
        host: config.host,
        port: config.port || '',
        user: config.user,
        password: config.password,
        database: config.database
    });
    connection.connect();
    db.end = connection.end;
    db.query = function(query,next){
        var table = query.table;
        var fields = query.fields;
        var data = query.data || {};
        var query_str = '';
        for(var key in data){
            query_str = query_str ? query_str += ' AND ' + key + ' = ' + data[key] : key + ' = ' + data[key];
        }
        var delSql = 'SELECT ' + fields + ' FROM ' + table + ' WHERE ' + query_str;
        connection.query(delSql, next);
    };
    db.insert = function(params, next){
        // params = {
        //     table: 'test',
        //     data: {
        //         id: 123,
        //         name: 'name'
        //     }
        // };
        var data = params.data || {};
        
        var table = params.table;
        var fields = params.fields || '';
        var placeholder = '';
        var value = [];
        for(var key in data){
            if(typeof data[key] === 'object'){
                placeholder = placeholder ? placeholder += ',(?)' : '(?)';
                var values = [];
                for(var keys in data[key]){
                    values.push(data[key][keys]);
                }
                value.push(values);
            }else{
                fields = fields ? fields += ',' + key : key;
                placeholder = placeholder ? placeholder += ',?' : '?';
                value.push(data[key]);
            }
        }
        if(!params.fields){
            placeholder = '(' + placeholder + ')';
        }
        // var addSql = 'INSERT INTO ' + table + '(' + fields + ') VALUES(?),(?),(?)';
        var addSql = 'INSERT INTO ' + table + '(' + fields + ') VALUES' + placeholder;
        console.log(addSql);
        console.log('------------------');
        console.log(value);
        var addSqlParams = value;
        connection.query(addSql, addSqlParams, next);
    };
    db.update = function(query, params, next){
        var data = params.data || {};
        var table = params.table;
        var fields = '';
        var query_str = '';
        var value = [];
        for(var key in data){
            fields = fields ? fields += ',' + key + ' = ?' : key + ' = ?';
            value.push(data[key]);
        }
        for(var keys in query){
            query_str = query_str ? query_str += ' AND ' + keys + ' = ' + query[keys] : keys + ' = ' + query[keys];
        }
        // var updSql = 'UPDATE websites SET name = ?,url = ? WHERE Id = ?';
        var updSql = 'UPDATE ' + table + ' SET ' + fields + ' WHERE ' + query_str;
        var updSqlParams = value;
        connection.query(updSql, updSqlParams, next);
    };
    db.delete = function(query, next){
        var table = query.table;
        var data = query.data || {};
        var query_str = '';
        for(var key in data){
            query_str = query_str ? query_str += ' AND ' + key + ' = ' + data[key] : key + ' = ' + data[key];
        }
        var delSql = 'DELETE FROM ' + table + ' WHERE ' + query_str;
        connection.query(delSql, next);
    };
};


exports = module.exports = db;