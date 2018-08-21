<template>
  <div class="todo-list">
    <h1>Todo-list Vue.js Example</h1>
    <section class="todo-wrapper">
      <h2 class="todo-title">
        {{ today.day }}
        <br> {{ today.date }}
      </h2>
      <form class="todo-form">
        <input type="text" class="left todo-input" v-model="newTodo" v-bind:class="{ active: newTodo }" placeholder="💗Make a list...">
        <button class="right btn btn-add" v-bind:class="{ active: newTodo }">+</button>
      </form>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'TodoList',
    data() {
      return {
        newTodo: ''
      }
    },
    computed: {
      today: function () {
        var weekday = [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday'
        ];
        var today = new Date();
        var dd = today.getDate(); // 1~31
        var mm = today.getMonth() + 1; // January is 0
        var yyyy = today.getFullYear();

        if (dd < 10) {
          dd = '0' + dd;
        }

        if (mm < 10) {
          mm = '0' + mm;
        }

        today = {
          day: weekday[today.getDay()], // getDay() 0~6
          date: dd + '-' + mm + '-' + yyyy
        };
        return today;
      }
    }
  }

</script>

// if add scoped, what will happen？
<style>
  @import "../assets/css/todo-list.css";
</style>
