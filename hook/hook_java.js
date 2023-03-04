console.log("22222222222222222")
Java.perform(function () {
    let className = "com.abcd.frida_test_demo.MainActivity";
    let MainActivity = Java.use(className);
    let MainActivity$Companion = Java.use("com.abcd.frida_test_demo.MainActivity$Companion")
    Java.choose(className,{
        onMatch(instance){
            instance.myLogTag.implementation = function (str) {
                return ""
            }
        },

        onComplete(){
        }
    })

    MainActivity$Companion.getLoginToast.overload('java.lang.String').implementation = function (loginToast){
        console.log("origin login toast:", loginToast);
        this.getLoginToast(loginToast);
        loginToast = "frida injected string";
        return loginToast;
    };
    console.log(MainActivity);
});

function test() {
    console.log("test function");
}

function test(testString) {
    console.log("print testString:" + testString);
}