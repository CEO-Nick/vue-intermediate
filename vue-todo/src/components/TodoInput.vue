<template>
  <div class="inputBox shadow">
    <!-- v-model: input에 입력된 값을 동적으로 vue 인스턴스 안에 매핑하는 역할 -->
    <!-- 화면에서의 데이터 변경과 Vue 인스턴스의 데이터 변경이 서로 동기화되어 있다 -->
    <!-- keyup.enter : input 박스에서 입력 후 엔터 눌렀을 때 동작할 메서드 -->
    <input type="text" v-model="newTodoItem" @keyup.enter.prevent="addTodo">
    <span class="addContainer" @click="addTodo">
            <i class="fas fa-plus addBtn"></i>
        </span>
    <Modal v-if="showModal" @close="showModal = false">

      <!-- slot: 특정 컴포넌트의 일부 UI를 재사용(재정의)할 수 있는 vue의 기능 -->
      <h3 slot="header">
        경고
        <i class="closeModalBtn fa fa-times"
           aria-hidden="true"
           @click="showModal = false">
        </i>
      </h3>

      <div slot="body">무언가를 입력하세요.</div>
    </Modal>
  </div>
</template>1

<script>
import Modal from './common/Modal.vue'

export default {
  data() {
    return {
      newTodoItem: "",     // input에 입력되는 텍스트 값을 저장할 변수
      showModal: false,
    }
  },
  methods: {
    addTodo() {
      if (this.newTodoItem === '') {
        this.showModal = !this.showModal;
        return;
      }
      // this.$emit('addTodoItem', this.newTodoItem);
      const text = this.newTodoItem.trim();
      this.$store.commit('addOneItem', text);
      this.clearInput();
    },
    clearInput() {
      this.newTodoItem = '';
    }
  },
  components: {
    Modal
  }

}
</script>


<style scoped>
input:focus {
  outline: none;
}

.inputBox {
  background: white;
  height: 50px;
  line-height: 50px;
  border-radius: 5px;
}

.inputBox input {
  border-style: none;
  font-size: 0.9rem;
}

.addContainer {
  float: right;
  background: linear-gradient(to right, #6478FB, #8763FB);
  display: block;
  width: 3rem;
  border-radius: 0 5px 5px 0;
}

.addBtn {
  color: white;
  vertical-align: middle;
}

.closeModalBtn {
  color: #42b983;
}
</style>