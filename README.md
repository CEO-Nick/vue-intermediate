# Vue.js 중급

[Vue.js 중급 인프런 강의](inf.run/znaC) 리포지토리입니다.

![인프런 중급 강의 썸네일](https://cdn.inflearn.com/public/courses/136498/course_cover/33a35374-af5f-4085-a650-4909c03e8d5d/lv2.png)

## 목차

- Vue.js로 구현하는 TodoApp
- Vue.js를 위한 ES6
- 복잡한 애플리케이션 구현을 위한 Vuex

## License & Copyright

**Copyright © 2018 Captain Pangyo**
<a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-nd/4.0/88x31.png" /></a><br />
This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/">Creative Commons
Attribution-NonCommercial-NoDerivs 4.0 Unported License</a>.

# Vuex

### 컨셉

- state: 컴포넌트 간에 공유하는 데이터 = `data()`
- getters: 연산된 state 값을 접근하는 속성
- mutation
- view: 데이터를 표시하는 화면 = `template`
- action: 사용자의 입력에 따라 데이터를 변경하는 `methods`

### 구조

컴포넌트 -> 비동기 로직 -> 동기 로직 -> 상태

- actions는 비동기 로직(주로 BE API)
- actions에서 바로 데이터를 수정하는게 아님, actions는 mutations를 호출
- mutations는 동기 메서드 -> 얘만 state에 접근 가능

### 기술 요소

- state: 여러 컴포넌트에 공유되는 데이터 `data`
- getters: 연산된 state 값을 접근하는 속성 `computed`
- mutations: state 값을 변경하는 이벤트 로직/메서드 `methods`
- actions: 비동기 처리 로직을 선언하는 메서드 `async methods`

### mutations

- state의 값을 변경할 수 있는 유일한 방법이자 메서드
- mutations은 `commit()`으로 동작시킨다.
    - mutation을 동작시키는 명령어
    - state를 변경하기 위해 인자(payload)를 전달할 수 있음

### state를 직접 변강하지 않고 `mutations`로 변경하는지?
- state의 값을 직접 여러 컴포넌트에서 변경하면 추적하기 어렵다
- mutation을 거치지 않으면 vue의 반응성을 얻기 어렵다. -> ??? 이 과정을 이해하고 싶다.
- mutation에 의해 state가 변경되면 자연스럽게 Vue 리액티비티에 의해서 화면이 다시 갱신된다.

### `actions`
> 비동기 처리 로직을 선언하는 메서드 
> ex) 서버에 데이터 요청, Promise, async 등 비동기 처리는 모두 actions에 선언

https://joshua1988.github.io/web-development/javascript/promise-for-beginners/
https://joshua1988.github.io/web-development/javascript/javascript-asynchronous-operation/

- context란?
  - actions에서 mutations로 접근하는 방법
```javascript
mutations: {
    addCounter (state)
    {
        state.counter * 2;
    }
}

actions: {
    delayedAddCounter(context)
    {
        setTimeout(() => context.commit('addCounter'), 2000);
    }
}

// App.vue
methods: {
    incrementCounter()
    {
        this.$store.dispatch('delayedAddCounter');
    }
}
```
이 코드는 2초 기다렸다가 카운터를 1 증가 시키는 로직

```javascript
// store.js
mutations: {
    // state에 서버에서 받아온 값을 밀어넣어준다.
    setData(state, fetchedData)
    {
        state.product = fetchedData;
    }
}

actions: {
    // 서버 요청 후에 응답값을 mutations로 넘겨준다
    fetchProductData(context)
    {
        return axios.get('https://domain.com/products/1')
            .then(response => context.commit('setData', response));
    }
}

// App.vue
methods: {
    getProduct()
    {
        this.$store.dispatch('fetchProductData');
    }
}
```

