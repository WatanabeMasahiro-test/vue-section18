<template>
    <div class="container mt-4 border border-3">

        <div class="row text-center border">
            <h3 class="bg-success py-1 mb-4">登録</h3>
            <!-- <form> -->
            <div class="mb-3">
                <label for="email" class="form-label d-block">Email：</label>
                <input id="email" name="email" type="email" class="form-controll" 
                    v-model="email"
                >
            </div>
            <div class="mb-3">
                <label for="password" class="form-label d-block">パスワード<span>：</span></label>
                <input id="password" name="password" type="password" class="form-controll d-inline-block mx-1" 
                    v-model="password"
                >
            </div>
            <div class="mb-3">
                <button type="submit" name="commentBtn" value="true" class="btn btn-secondary btn-sm"
                    @click="register()"
                >送信する</button>
            </div>
            <!-- </form> -->
        </div>
    </div>
</template>

<script>
    import '@/assets/animate.css/animate.min.css'
    import '@/assets/css/style.css'

    export default {
        name: 'RegisterView',
        components: {

        },
        data: () => ({
            email       : '',
            password    : '',
        }),
        methods: {
            register() {
                this.$store.dispatch('register', {
                    email       : this.email,
                    password    : this.password,
                })
                this.email = '';
                this.password = '';
            },
        },
    }
</script>

<style scoped>
</style>