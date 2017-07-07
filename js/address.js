new Vue({
    el:'.container',
    data:{
        addressList:[],
        currentIndex:0,
        limitNum:3,
        selectModel:1,
        isShowAll:false,
        defaultNum:3
    },
    mounted:function(){
        this.$nextTick(function(){
            this.getAddressList();
        });
    },
    computed:{
        filterAddress:function(){
            return this.addressList.slice(0,this.limitNum);
        }
    },
    methods:{
        getAddressList:function(){//获取数据
            this.$http.get('data/address.json').then(datas => {
                var res = datas.data;
                if(res.status == '0'){
                    this.addressList = res.result;
                }
            })
        },
        showAll:function(){
            this.isShowAll=!this.isShowAll;
            if(this.isShowAll){
                this.limitNum = this.addressList.length;
            }else{
                this.limitNum = this.defaultNum;
            }
            return this.addressList.slice(0,this.limitNum);
        }

    }
});