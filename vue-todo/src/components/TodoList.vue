<template>
    <div>
        <ul>
            <!-- todoItems에 있는 만큼 뿌려줌 -->
            <li v-for="(todoItem, index) in todoList" :key="todoItem" class="shadow">
                {{ todoItem }}
                <span class="removeBtn" @click="removeTodo(todoItem, index)">
                    <i class="removeBtn fas fa-trash-alt"></i>
                </span>

            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        props: {
            todoList: {
                type: Array,
                required: true,
            }
        },

        // data: function() {
        //     return {
        //         todoItems: []
        //     }
        // },

        // // 인스턴스가 생성되지마자 호출되는 라이프 사이클 훅
        // created: function() {
        //     console.log('created');
        //     if (localStorage.length <= 0) return;
        //     for (var i = 0; i < localStorage.length; i++) {
        //         if (localStorage.key(i) === 'naveruserlocale') continue;
        //         this.todoItems.push(localStorage.key(i))
        //     }

        // },

        methods: {
            removeTodo: function(todoItem, index) {
                this.$emit('remove-todo', todoItem, index);
                // console.log('remove items', todoItem, index);
                // localStorage.removeItem(todoItem);
                // // this.todoItems.splice(index, 1);    // splice(index, 개수) : js array api로 특정 인덱스에서부터 삭제할 개수 입력받아서 삭제
                // this.todoItems = this.todoItems.slice(index, 1);
                // // slice(index, cnt) -> 기존 배열을 변환하지 않고 새 배열 반환
            }
        }
    }
</script>

<style scoped>
ul {
  list-style-type: none;
  padding-left: 0px;
  margin-top: 0;
  text-align: left;
}
li {
  display: flex;
  min-height: 50px;
  height: 50px;
  line-height: 50px;
  margin: 0.5rem 0;
  padding: 0 0.9rem;
  background: white;
  border-radius: 5px;
}
.checkBtn {
  line-height: 45px;
  /* color: black; */
  color: #62acde;
  margin-right: 5px;
}
.checkBtnCompleted {
  /* color: #62acde; */
  color: black;
}
.textCompleted {
  text-decoration: line-through;
}
.removeBtn {
  margin-left: auto;
  color: #de4343;
}
</style>