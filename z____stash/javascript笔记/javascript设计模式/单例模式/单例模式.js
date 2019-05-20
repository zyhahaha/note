/**
 * 单例就是保证一个类只有一个实例，实现的方法一般是先判断实例存在与否，如果存在直接返回，如果不存在就创建了再返回，这就确保了一个类只有一个实例对象。
 * 在JavaScript里，单例作为一个命名空间提供者，从全局命名空间里提供一个唯一的访问点来访问该对象。
 */

function Universe(a) {

    // 判断是否存在实例
    if (typeof Universe.instance === 'object') {
        return Universe.instance;
    }

    // 其它内容
    this.a = a;
    this.b = 1;

    // 缓存
    Universe.instance = this;

    // 隐式返回this
}

// 测试
var uni = new Universe();
var uni2 = new Universe();
uni === uni2; // true

uni.b; // 1
uni2.b; // 1
uni.b = 2; // 2
uni2.b = // 2
