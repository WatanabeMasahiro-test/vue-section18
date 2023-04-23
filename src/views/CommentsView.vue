<template>
    <div class="container mt-4 border border-3">

        <div class="row text-center border">
        <h3 class="bg-danger py-1 mb-4">掲示板に投稿する</h3>
        <!-- <form> -->
            <div class="mb-3">
            <label for="name" class="form-label d-block">ニックネーム：</label>
            <input id="name" name="name" type="text" class="form-controll" 
                v-model="name"
            >
            </div>
            <div class="mb-3">
            <label for="comment" class="form-label d-block">コメント<span>：</span></label>
            <textarea id="comment" name="comment" cols="30" rows="5" class="form-controll d-inline-block mx-1" 
                v-model="comment"
            ></textarea>
            </div>
            <div class="mb-3">
            <button type="submit" name="commentBtn" value="true" class="btn btn-secondary btn-sm"
                @click="createComment()"
            >コメントをサーバーに送る</button>
            </div>
        <!-- </form> -->
        </div>


        <div class="row border">
            <h2 class="bg-warning mb-4 text-center">掲示板</h2>

            <div class="board-div">
                <div class="border bg-white my-4" 
                v-for='post in posts' 
                :key='post.name'
                >
                <div class="mark m-1 p-2">
                    <pre class="title-pre align-top mb-0">【名前】</pre>
                    <pre class="content-pre mb-0">{{ post.fields.name.stringValue }}</pre>
                </div>
                <div class="mark m-1 p-2">
                    <pre class="title-pre align-top">【コメント】</pre>
                    <pre class="content-pre">{{ post.fields.comment.stringValue }}</pre>
                </div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
import axios from 'axios'
import '@/assets/animate.css/animate.min.css'
import '@/assets/css/style.css'

export default {
    name: 'CommentsView',
    components: {
    // HelloWorld
    },
    data: () => ({
        name    : "",
        comment : "",
        posts    : [],
    }),
    computed: {
        idToken() {
            return this.$store.getters.idToken;
        },
    },
    created() {
        axios.get(
            '/comments', {
                headers: {
                    Authorization: `Bearer ${this.idToken}`
                }
            })
        .then(response => {
            this.posts = response.data.documents;
        })
    },
    methods: {
        createComment() {
            // プロミスを返す非同期処理
            axios.post(
                '/comments',
                {
                    fields : {
                    name : {
                        stringValue : this.name
                    },
                    comment : {
                        stringValue : this.comment
                    }
                    }
                },
                {
                    headers: {
                        Authorization: `Bearer ${this.idToken}`
                    }
                }
            )
            this.name     = "";
            this.comment  = "";
        }
    }
}
</script>

<style scoped>
/* pre {
    white-space: pre-wrap;
} */

.border {
    background-color: ghostwhite;
}

.board-div {
    width   : 300px;
    margin: 0 auto;
}

.content-pre {
    word-break: break-all;
    white-space: pre;           /* CSS 2.0 */
    white-space: pre-wrap;      /* CSS 2.1 */
    white-space: pre-line;      /* CSS 3.0 */
    white-space: -pre-wrap;     /* Opera 4-6 */
    white-space: -o-pre-wrap;   /* Opera 7 */
    white-space: -moz-pre-wrap; /* Mozilla */
    white-space: -hp-pre-wrap;  /* HP Printers */
    word-wrap: break-word;      /* IE 5+ */
}

</style>