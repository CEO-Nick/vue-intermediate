<template>
    <div>
        <ul>
            <!-- todoItems에 있는 만큼 뿌려줌 -->
            <li v-for="todoItem in todoItems" v-bind:key="todoItem">
                {{ todoItem }}
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data: function() {
            return {
                todoItems: []
            }
        },

        // 인스턴스가 생성되지마자 호출되는 라이프 사이클 훅
        created: function() {
            console.log('created');
            if (localStorage.length <= 0) return;
            for (var i = 0; i < localStorage.length; i++) {
                if (localStorage.key(i) === 'naveruserlocale') continue;
                this.todoItems.push(localStorage.key(i))
            }

        }
    }
</script>

<style lang="scss" scoped>

</style>