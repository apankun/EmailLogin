<template>
    <div class="center">
<div class="choose">
   <!-- <el-transfer
            filterable
            :filter-method="filterMethod"
            filter-placeholder="输入股票名称"
            :titles="['所有股票', '新增收藏股票']"
            v-model="value"
            :data="maps"
            @change="handleChange">
    </el-transfer>-->
        <el-select v-model="value" multiple filterable placeholder="请选择股票">
            <el-option
                    v-for="item in maps"
                    :key="item.key"
                    :label="item.label"
                    :value="item.key">
            </el-option>
        </el-select>
        <el-button  type="danger" @click="addFavorite(value)">
            <loading v-if="load"></loading>
            <span v-else>Add</span>
        </el-button>
</div>
        <el-table :data="tableData.slice((currentPage-1)*PageSize,currentPage*PageSize)"
                  style="width: 100%"
                  highlight-current-row
                  @current-change="handleCurrentChange">

            <el-table-column prop="stockId" label="股票代码" ></el-table-column>
            <el-table-column prop="stockName" label="股票名称" ></el-table-column>
        </el-table>
        <div class="tabListPage">
            <el-pagination @size-change="handleSizeChange"
                           @current-change="handlesCurrentChange"
                           :current-page="currentPage"
                           :page-sizes="pageSizes"
                           :page-size="PageSize" layout="total, prev, pager, next, jumper"
                           :total="totalCount">
            </el-pagination>
        </div>
    </div>

</template>

<script>
    export default {
        data() {
            return {
                // 总数据
                tableData:[],
                // 默认显示第几页
                currentPage:1,
                // 总条数，根据接口获取数据长度(注意：这里不能为空)
                totalCount:1,
                // 个数选择器（可修改）
                //pageSizes:[1,2,3,4],
                // 默认每页显示的条数（可修改）
                PageSize:5,
               // maps: [],
                stockinfo:'',
                value: [],
                arr:[]
               /* filterMethod(query, item) {
                    return item.pinyin.indexOf(query) > -1;
                }*/
            };
        },
        props:{
            maps:{
                type:Array,
                required:true
            }
        },
        mounted(){
            this.$nextTick(()=>{
                //this.getAllStocks()
                this.getUserStock()
            })        },
        watch: {
            '$route' (to, from) {//监听路由变化，防止参数刷新而页面不刷新的情况。
                this.$router.go(0);
                //this.handleCurrentChange(this.val)
            }
        },
        methods:{
       /*     handleCurrentChange(val) {
                this.$confirm('是否从收藏夹中移除该股票?', '提示', {
                    confirmButtonLoading: true,
                    showCancelButton: true,
                    type: 'warning',
                    confirmCallBack:({confirmButtonLoadingClose,close})=>
                    {
                        //del likedStock
                        this.$api.stock.delLikedStock({//post请求发送到searchStock
                            stockNum:val.stockId,
                            email:sessionStorage.getItem('username')
                        }).then((res)=>{
                            if(res.data.status=='0'){
                                this.$alert(res.data.message);
                                this.getUserStock();

                            }else {
                                this.$message.error(res.data.message);
                            }
                        })
                    }
            },*/
            handleCurrentChange(val) {
                const h = this.$createElement;
                this.$msgbox({
                    title: '提示',
                    message: '是否确认将该股票从收藏夹中移除？',
                    showCancelButton: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    beforeClose: (action, instance, done) => {
                        if (action === 'confirm') {
                            instance.confirmButtonLoading = true;
                            instance.confirmButtonText = '执行中...';
                            //del likedStock

                            this.$api.stock.delLikedStock({//post请求发送到searchStock
                                stockNum:val.stockId,
                                email:sessionStorage.getItem('username')
                            }).then((res)=>{
                                if(res.data.status=='0'){
                                    this.$alert(res.data.message);
                                    this.getUserStock();

                                }else {
                                    this.$message.error(res.data.message);
                                }

                            })
                            setTimeout(() => {
                                done();
                                setTimeout(() => {
                                    instance.confirmButtonLoading = false;
                                }, 300);
                            }, 3000);
                        } else {
                            done();
                        }
                    }
                }).then(action => {
                    this.$message({
                        type: 'info',
                        message: 'action: ' + action
                    });
                });
            },
            getUserStock(){
                this.$api.stock.stockFavorite({
                    email:sessionStorage.getItem("username")
                }).then(({data})=>{
                    if(data.status=='0'){
                        this.tableData=[];
                        var jsonObj=JSON.parse(data.content);
                        this.totalCount=jsonObj.length
                        for (var i = 0; i < jsonObj.length; i++) {
                            var record = jsonObj[i];
                            var stockId = record['stockId'];
                            var stockName = record['stockName'];
                            this.tableData.push({
                                stockId: stockId,
                                stockName: stockName,
                            });
                        }

                    }else {
                        this.$message.error(data.message);
                    }
                })
            },
            // 分页
            // 每页显示的条数
            handleSizeChange(val) {
                // 改变每页显示的条数
                this.PageSize=val
                // 注意：在改变每页显示的条数时，要将页码显示到第一页
                this.currentPage=1
            },
            // 显示第几页
            handlesCurrentChange(val) {
                // 改变默认的页数
                this.currentPage=val
            },

            addFavorite(value){
                //add likedStock
                let str_value="";
                for(let i=0;i<value.length;i++)
                {
                    str_value=value[i]+","+str_value+""
                }
                //   for (let i = 0; i < movedKeys.length; i++)
                this.$api.stock.addLikedStock({//post请求发送到searchStock
                    stockNum:str_value,
                    email:sessionStorage.getItem('username')
                }).then((res)=>{
                    if(res.data.status=='0'){
                       // this.$alert(res.data.message);
                        this.getUserStock();

                    }else {
                        this.$message.error(res.data.message);
                    }

                })
            },
         /*   handleChange(value, direction, movedKeys) {
                //this.$alert(value+";")
                //value是右边穿梭框的key
                //direction是穿梭方向
                //movedKeys是当前穿梭的值
              //  this.$alert(movedKeys);
               // let movedKeysMap=movedKeys.split(",");
                if(direction=="right")
                {
                    //add likedStock

                 //   for (let i = 0; i < movedKeys.length; i++)
                    this.$api.stock.addLikedStock({//post请求发送到searchStock
                        stockNum:movedKeys+"",
                        email:sessionStorage.getItem('username')
                    }).then((res)=>{
                        if(res.data.status=='0'){
                            this.$alert(res.data.message);
                            this.getUserStock();

                        }else {
                            this.$message.error(res.data.message);
                        }

                    })
                }else{
                    //del likedStock

                    this.$api.stock.delLikedStock({//post请求发送到searchStock
                        stockNum:movedKeys+"",
                        email:sessionStorage.getItem('username')
                    }).then((res)=>{
                        if(res.data.status=='0'){
                            this.$alert(res.data.message);
                            this.getUserStock();

                        }else {
                            this.$message.error(res.data.message);
                        }

                    })
                }
            },*/


        }
    };
</script>

<<style lang='scss' scoped>
    .center{
       // position:relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .choose {
            display: inline;


            .el-select {
                //    position:absolute;

                display: inline-block;
            }

            .el-button {
                //   position:absolute;

                display: inline-block;
            }
        }
    }
</style>
