本地存储
============
背景
---------
由于ios只有2.8M,android只有5M的本地存储空间，为了避免在本地存储打满，业务直接setItem时报错，通过estorage来容错。
#### localStorge如果写满，写sessionStorage，再满写window变量
#### sessionStorage如果写满，写window变量
#### 事件监听可以监听key的变化

