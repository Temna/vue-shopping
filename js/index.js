/**
 * Created by Administrator on 2017/7/4.
 */
window.onload=function(){
    new Vue({
        el: '#app',
        data: {
            productList: [],
            checkAllFlag: false,
            delFlag: false,
            curProduct:'',
            checkAllFlag:[]
        },
        filters:{
            formatMoney(value){
                return "￥" + value.toFixed(2);
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                this.createView();
            })
        },
        computed:{
          totalMoney:function(){//计算总金额
                let result = 0;
                this.productList.forEach((item,index)=>{
                    if(item.checked){
                        result += item.productPrice * item.productQuantity;
                    }
                });
                return result;
            },
            checkEmpty:function(){//转账的时候如果一个都没选中则不跳转页面否则跳转
                let isEmpty = true;
                this.productList.forEach((item,index)=>{
                    if(!item.checked){
                            isEmpty = true;
                        }else{
                            isEmpty = false;
                        }
                    });
                return isEmpty;
            }
        },
        watch: {
            //监听购物车列表
            productList: {
                handler: function(val,oldVal) {
                    var checkedLength = 0;
                    for(var i=0;i< this.productList.length; i++) {
                        if(this.productList[i].checked) {
                            checkedLength ++;
                        }
                    }
                    if(checkedLength === this.productList.length) {
                        this.checkAllFlag = true;
                    } else {
                        this.checkAllFlag = false;
                    }
                },
                deep: true
            }
        },
        methods:{
            //绑定数据
            createView:function () {
                this.$http.get('data/cartData.json', {'id': 123}).then(res => {
                    this.productList = res.data.result.list;
                //this.totalMoney = res.data.result.totalMoney;
                })
            },
            //点击加减
            changeMoney(product, way){
                if (way > 0) {
                    product.productQuantity++;
                } else {
                    product.productQuantity--;
                    if (product.productQuantity < 1) {
                        product.productQuantity = 1;
                    }
                }
            },
            //判断是否选中
            selectedProduct(item){
                if (typeof item.checked == 'undefined') {
                    //Vue.set(item,"checked",true);//全局注册，监听不存在的变量
                    this.$set(item, "checked", true);//局部注册，监听不存在的变量
                    } else {
                    item.checked = !item.checked;
                }
            },
            //全选和清空
            checkAll(){
                this.checkAllFlag = !this.checkAllFlag;
                //if(this.checkAllFlag){
                    this.productList.forEach((item,index)=>{
                        if (typeof item.checked == 'undefined') {
                            //Vue.set(item,"checked",true);//全局注册，监听不存在的变量
                            this.$set(item, "checked", this.checkAllFlag);//局部注册，监听不存在的变量
                        } else {
                            item.checked = this.checkAllFlag;
                        }
                    });
                //}
            },
            delConfirm(){//点击删除后弹出删除框
                this.delFlag = true;
                this.curProduct = item;
            },
            delProduct(){//删除商品
                var index = this.productList.indexOf(this.curProduct)
                this.productList.splice(index,1);
                this.delFlag = false;
            },
        isHref(){
            if(!this.checkEmpty){
                window.open('address.html')
            }
        }

        }
    });
}