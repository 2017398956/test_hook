

## frida 的使用方法

### 在 AOSP 编译出的模拟器（userdebug 版本）上使用 frida

#### 1.通过 ip 连接模拟器（这种方式我失败了，第二种方式测试成功）

1.由于无法直接通过 ip 连接 模拟器手机端，所以 frida 先在模拟器端将监听端口转移到主机的 8000 端口上
    
    ./frida-server -l 0.0.0.0:8000
    // 通过 netstat -tunlp 可以查看端口监听情况

2.电脑端连接模拟器
    
    telnet localhost 5554
    // 根据提示使用 auth <token> 进行授权

3.连接本地端口映射到模拟器的 8000 端口

    redir add tcp:27042:8000
    // 列出当前端口重定向
    // redir list 
    // 删除端口重定向的映射
    // redir del tcp:27042

4.电脑端的 frida 往模拟器端发送脚本数据

    frida -H 127.0.0.1:27042 -F -l hook_java.js

#### 2.通过 frida 参数配置连接模拟器

1.模拟器启动 frida

    ./frida-server

2.可以通过 frida-ps -U -a 查看模拟器进程信息

    // 根据进程名称连接
    frida -U -f com.abcd.frida_test_demo -l hook_java.js
    
    // 连接模拟器当前打开的 app
    frida -U -F -l hook_java.js

    // 根据 app 名称连接
    frida -U -n Frida_test_demo -l hook_java.js