<template>
    <vue-seamless-scroll :data="listRank" :class-option="classOption" class="seamless-warp">
        <ul class="item">
            <li v-for="item in listRank">
                <span class="email"  v-text="item.email"></span>
                <span class="predictRate" v-text="item.predictRate"></span>
            </li>

        </ul>
    </vue-seamless-scroll>
</template>

<script>
    export default {
        data () {
            return {

                listRank:[{
                    'email':'假的用户1',
                    'predictRate':'假的数据1'
                },
                    {
                        'email':'假的用户2',
                        'predictRate':'假的数据2'
                    },
                    {
                        'email':'假的用户3',
                        'predictRate':'假的数据3'
                    },
                    {
                        'email':'假的用户4',
                        'predictRate':'假的数据4'
                    },
                    {
                        'email':'假的用户5',
                        'predictRate':'假的数据5'
                    }]
            }
        },
        mounted(){
            this.$nextTick(()=>{
                this.getRank()
            })        },
        methods:{
            getRank(){
                this.$api.stock.getRank({}).then(({data})=>{
                    if(data.status=='0'){
                        this.listRank=[];
                        let jsonObj=JSON.parse(data.content);
                        for (let i = 0; i < jsonObj.length; i++) {
                            let record = jsonObj[i];
                            let email = record['email'];
                            let predictRate = record['predictRate'];
                            this.listRank.push({
                                email: email,
                                predictRate: predictRate+"%",
                            });
                        }

                    }else {
                        this.$message.error(data.message);
                    }
                })
            },
        },
        computed: {
            classOption () {
                return {
                //    direction: 0
                }
            }
        }
    }
</script>

<style lang='scss'>
    @media (max-width: 2000px) {

        .seamless-warp {
            box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
            height: 20%;
            width: 30%;
            font-size: 1.5rem;
            line-height: 3rem;
            overflow: hidden;
            color: #f56c6c;

            .item {
                .email {
                    // float:left;
                }

                .predictRate {
                    float: right;
                }
            }
        }
    }
    @media (max-width: 1281px) and (max-height:900px) {//1280x800以下

        .seamless-warp {
            box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
            height: 20%;
            width: 50%;
            font-size: 1.5rem;
            line-height: 3rem;
            overflow: hidden;
            color: #f56c6c;

            .item {
                .email {
                    // float:left;
                }

                .predictRate {
                    float: right;
                }
            }
        }
    }
    @media (max-width: 1020px) {

        .seamless-warp {
            box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
            height: 20%;
            width: 69%;
            font-size: 1.5rem;
            line-height: 3rem;
            overflow: hidden;
            color: #f56c6c;

            .item {
                .email {
                    // float:left;
                }

                .predictRate {
                    float: right;
                }
            }
        }
    }
    @media (max-width: 767px) {

        .seamless-warp {
            box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
            height: 20%;
            width: 69%;
            font-size: 1.0rem;
            line-height: 2rem;
            overflow: hidden;
            color: #f56c6c;

            .item {
                .email {
                    // float:left;
                }

                .predictRate {
                    float: right;
                }
            }
        }
    }


</style>
