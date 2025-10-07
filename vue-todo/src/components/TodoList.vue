<template>
  <section>
    <transition-group name="list" tag="ul">
      <!-- todoItems에 있는 만큼 뿌려줌 -->
      <li v-for="(todoItem, index) in this.storedTodoItems" :key="todoItem.item"
          class="shadow">
        <i class="checkBtn fas fa-check" :class="{checkBtnCompleted: todoItem.completed}"
           @click="toggleComplete(index)"></i>
        <!-- todoItem.completed 가 true면 textCompleted 라는 속성이 살아 있고, false면 해당 속성 없어진다. -->
        <span :class="{textCompleted: todoItem.completed}"> {{ todoItem.item }} </span>

        <span class="removeBtn" @click="removeTodo(index)">
          <i class="removeBtn fas fa-trash-alt"></i>
        </span>

      </li>
    </transition-group>
  </section>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";

export default {
  computed: {
    // 변수명과 getters 이름 같을 때
    ...mapGetters(['storedTodoItems']),

    // 변수명과 getters 이름이 다를 때
    // ...mapGetters({
    //   todoItems: "storedTodoItems",
    // }),
  },
  methods: {
    ...mapMutations({
      removeTodo: 'removeOneItem',
      toggleComplete: 'toggleOneItem',
    }),
    // 아래와 같은 메서드를 위와 같은 mapMutations 통해 쉽게 선언할 수 있다.
    // removeTodo(todoItem, index) {
    //   // this.$store.commit('removeOneItem', todoItem, index);
    //   this.$store.commit('removeOneItem', {todoItem, index});
    // },
    // toggleComplete(index) {
    //   // this.$emit('toggleItem', todoItem, index);
    //   this.$store.commit('toggleOneItem', index);
    // }
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

/* transition css */
.list-enter-active, .list-leave-active {
  transition: all 1s;
}

.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */
{
  opacity: 0;
  transform: translateY(30px);
}
</style>