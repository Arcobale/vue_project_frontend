<template>
    <header class="header">
        <!-- 头部的第一行 -->
        <div class="top">
            <div class="container">
                <div class="loginList">
                    <p>尚品汇欢迎您！</p>
                    <p v-if="!userName">
                        <span>请</span>
                        <router-link to="/login">登录</router-link>
                        <router-link to="/register" class="register">免费注册</router-link>
                    </p>
                    <p v-else>
                        <span>{{ userName }}</span>
                        <a class="register" @click="logout">退出登录</a>
                    </p>
                </div>
                <div class="typeList">
                    <router-link to="/center/myorder">我的订单</router-link>
                    <router-link to="/shopcart">我的购物车</router-link>
                    <a href="###">我的尚品汇</a>
                    <a href="###">尚品汇会员</a>
                    <a href="###">企业采购</a>
                    <a href="###">关注尚品汇</a>
                    <a href="###">合作招商</a>
                    <a href="###">商家后台</a>
                </div>
            </div>
        </div>
        <!--头部第二行 搜索区域-->
        <div class="bottom">
            <h1 class="logoArea">
                <router-link to="/home" class="logo">
                    <img src="./images/logo.png" alt="">
                </router-link>
            </h1>
            <div class="searchArea">
                <form action="###" class="searchForm">
                    <input type="text" id="autocomplete" class="input-error input-xxlarge" v-model="keyword" />
                    <button class="sui-btn btn-xlarge btn-danger" type="button" @click="goSearch">搜索</button>
                </form>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    data() {
        return {
            keyword: ''
        }
    },
    methods: {
        goSearch() {
            //路由传递参数
            //字符串形式
            // this.$router.push('/search/' + this.keyword + '?k=' + this.keyword.toUpperCase())
            //模版字符串
            // this.$router.push(`/search/${this.keyword}?k=${this.keyword.toUpperCase()}`)
            //对象
            let location = { name: "search", params: { keyword: this.keyword || undefined } };
            location.query = this.$route.query;
            this.$router.push(location);
        },
        async logout() {
            try {
                //如果退出成功，回到首页
                await this.$store.dispatch("logout");
                this.$router.push('/home');
            } catch(error) {
                console.log(error.message);
            }
        }
    },
    mounted() {
        //通过全局事件总线清除关键字
        this.$bus.$on("clear", () => {
            this.keyword = "";
        });
        //携带token获取用户信息
        //必须要加，不然从home跳转到其他路由组件后再刷新，不会dispatch获取用户信息。
        //如果只在Header添加dispatch的话，在第一次进入登录后不会获取到用户信息，因为Header组件已经挂载完毕了，所以需要Header和Home组件中都添加dispatch
        // this.$store.dispatch("getUserInfo");
    },
    computed: {
        userName() {
            return this.$store.state.user.userInfo.name;
        }
    },
}
</script>

<style lang="less" scoped>
.header {
    &>.top {
        background-color: #eaeaea;
        height: 30px;
        line-height: 30px;

        .container {
            width: 1200px;
            margin: 0 auto;
            overflow: hidden;

            .loginList {
                float: left;

                p {
                    float: left;
                    margin-right: 10px;

                    .register {
                        border-left: 1px solid #b3aeae;
                        padding: 0 5px;
                        margin-left: 5px;
                    }
                }
            }

            .typeList {
                float: right;

                a {
                    padding: 0 10px;

                    &+a {
                        border-left: 1px solid #b3aeae;
                    }
                }

            }

        }
    }

    &>.bottom {
        width: 1200px;
        margin: 0 auto;
        overflow: hidden;

        .logoArea {
            float: left;

            .logo {
                img {
                    width: 175px;
                    margin: 25px 45px;
                }
            }
        }

        .searchArea {
            float: right;
            margin-top: 35px;

            .searchForm {
                overflow: hidden;

                input {
                    box-sizing: border-box;
                    width: 490px;
                    height: 32px;
                    padding: 0px 4px;
                    border: 2px solid #ea4a36;
                    float: left;

                    &:focus {
                        outline: none;
                    }
                }

                button {
                    height: 32px;
                    width: 68px;
                    background-color: #ea4a36;
                    border: none;
                    color: #fff;
                    float: left;
                    cursor: pointer;

                    &:focus {
                        outline: none;
                    }
                }
            }
        }
    }
}
</style>