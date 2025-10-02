import Vue from 'vue'
import Vuex from 'vuex'

// 글로벌에서 vuex를 사용하기 위해서 추가
Vue.use(Vuex);

const storage = {
    fetch() {
        const arr = [];
        if (localStorage.length <= 0) return;
        for (let i = 0; i < localStorage.length; i++) {
            if (localStorage.key(i) === 'naveruserlocale') continue;
            // localStorage에서 key에 대한 value를 가져온다 -> 근데 JSON.stringify()로 Obj를 string으로 만들어서 넣는다.
            const str = localStorage.getItem(localStorage.key(i));
            // string을 다시 Object로 변환
            const obj = JSON.parse(str);
            arr.push(obj);
        }
        return arr;
    },
};

export const store = new Vuex.Store({
    state: {
        todoItems: storage.fetch(),
    },
    mutations: {
        addOneItem(state, todoItem) {
            const obj = {completed: false, item: todoItem};
            localStorage.setItem(todoItem, JSON.stringify(obj));
            state.todoItems.push(obj);
        },
        removeOneItem(state, payload) {
            localStorage.removeItem(payload.todoItem);
            state.todoItems.splice(payload.index, 1);
        },
        toggleOneItem(state, index) {
            const current = state.todoItems[index];
            current.completed = !current.completed;
            localStorage.setItem(current.item, JSON.stringify(current));  // 로컬 스토리지 update api 없음 -> 덮어쓰기
        },
        clearAllItems(state) {
            localStorage.clear();
            state.todoItems = [];
        }
    }
});