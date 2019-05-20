
/**
 * 根据建造者的定义，表相即是回调，
 * 也就是说获取数据以后如何显示和处理取决于回调函数，
 * 相应地回调函数在处理数据的时候不需要关注是如何获取数据的，
 * 同样的例子也可以在jquery的ajax方法里看到，有很多回调函数（比如success, error回调等），
 * 主要目的就是职责分离
 */

function getBeerById(id, callback) {
    // 使用ID来请求数据，然后返回数据.
    asyncRequest('GET', 'beer.uri?id=' + id, function (resp) {
        // callback调用 response
        callback(resp.responseText);
    });
}

var el = document.querySelector('#test');
el.addEventListener('click', getBeerByIdBridge, false);

function getBeerByIdBridge(e) {
    getBeerById(this.id, function (beer) {
        console.log('Requested Beer: ' + beer);
    });
}

/**
 * 建造者模式主要用于“分步骤构建一个复杂的对象”，
 * 在这其中“分步骤”是一个稳定的算法，而复杂对象的各个部分则经常变化，
 * 其优点是：建造者模式的“加工工艺”是暴露的，这样使得建造者模式更加灵活，
 * 并且建造者模式解耦了组装过程和创建具体部件，使得我们不用去关心每个部件是如何组装的。
 */