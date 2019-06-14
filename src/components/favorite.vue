<template>
    <div class="center">
        <!-- 将获取到的数据进行计算 -->
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
        data(){
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
                chooseday:  new Date(),
            }
        },
        methods:{
            formatDate(date) {
                let y = date.getFullYear();
                let m = date.getMonth() + 1;
                m = m < 10 ? '0' + m : m;
                let d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                return y + '-' + m + '-' + d;
            },
            formatTime(time) {
                this.chooseday=time;   //date是绑定的值
            },
            getUserStock(){
                this.$api.stock.stockFavorite({
                    email:sessionStorage.getItem("username")
                }).then(({data})=>{
                    if(data.status=='0'){
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

            handleCurrentChange(val) {
               // this.$alert(val.stockId);
                this.$api.stockPredict.getByStockId({//post请求发送到searchStock
                    stockId:val.stockId,
                    pickdate:this.chooseday
                    // stock:md5.update(this.ruleForm.stock).digest("hex"),
                    // stock:this.$getCode(this.ruleForm.stock),
                   // pickdate:this.chooseday
                }).then((res)=>{
                    console.log(res)
                    this.load=false
                    if(res.data.status=='0'){
                        let stock=JSON.parse(res.data.content);
                        // this.$alert(res.data.content);
                        this.$message.success("搜索成功");
                        let stockId=stock.stockId;
                        let stockName=stock.stockName;
                        let isUp=stock.isUp;
                        let isUpStop=stock.isUpStop;
                        let stockMarket=stock.stockMarket;
                        // let stockForecast=stock.stockForecast;
                        let percentage=stock.percentage;
                        //this.$router.go(0);
                        this.$router.push({ name:'showstock',query: { stockId: stockId,stockName:stockName,stockMarket:stockMarket,isUp:isUp,isUpStop:isUpStop,percentage:percentage }});

                    }else {
                        this.$message.error(res.data.message);
                    }

                })
            }
        },
        mounted(){
            this.$nextTick(()=>{
               // this.getAllStocks()
                this.getUserStock();
                this.chooseday=this.formatDate(this.chooseday)

            })        },
        watch: {
            '$route' (to, from) {//监听路由变化，防止参数刷新而页面不刷新的情况。
                this.$router.go(0);
                //this.handleCurrentChange(this.val)
            }
        },
    }
</script>

<style scoped>
.center{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>
