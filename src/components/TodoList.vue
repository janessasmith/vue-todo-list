<template>
  <div class="todo-list">
    <h1>Todo-list Vue.js Example</h1>
    <section class="todo-wrapper">
      <h2 class="todo-title">
        {{ today.day }}
        <br> {{ today.date }}
      </h2>
      <form class="todo-form">
        <input type="text" class="left todo-input" v-model="newTodoList" v-bind:class="{ active: newTodoList }" placeholder="💗Make a list..."
          v-on:keyup.enter="addItem">
        <button class="right btn btn-add" v-bind:class="{ active: newTodoList }" v-on:click="addItem">+</button>
      </form>
      <!-- pending list -->
      <div v-if="pending.length > 0">
        <p class="status busy">
          You have {{ pending.length }} pending item<span v-if="todoList.length > 1">s</span>
        </p>
        <!-- vue自带组件 - 列表过渡动画 transition-group -->
        <transition-group name="todo-item" tag="ul" class="todo-list">
          <li v-for="item in pending" v-bind:key="item.title">
            <!-- checkbox -->
            <input type="checkbox" class="todo-checkbox" v-model="item.done" v-bind:id="'item' + item.id">
            <label v-bind:for="'item' + item.id"></label>
            <span class="todo-text">{{ item.title }}</span>
            <span class="btn-delete" v-on:click="deleteItem(item)"></span>
          </li>
        </transition-group>
      </div>
      <!-- no pending list -->
      <transition name="slide-fade">
        <p class="status free" v-if="!pending.length">
          <img src="../assets/images/noList.svg" alt="noPendingList">You have no todos.
        </p>
      </transition>
      <!-- completed list -->
      <div v-if="completed.length > 0 && showComplete">
        <p class="status">
          Completed tasks: {{ completedPercentage}}
        </p>
        <transition-group name="todo-item" tag="ul" class="todo-list archived">
          <li v-for="item in completed" v-bind:key="item.title">
            <!-- checkbox -->
            <input type="checkbox" class="todo-checkbox" v-model="item.done" v-bind:id="'item' + item.id">
            <label v-bind:for="'item' + item.id"></label>
            <span class="todo-text">{{ item.title }}</span>
            <span class="btn-delete" v-on:click="deleteItem(item)"></span>
          </li>
        </transition-group>
      </div>
      <div class="btns">
        <div class="btn btn-more" v-if="completed.length > 0" v-on:click="toggleShowComplete">
          <span v-if="!showComplete">Show</span>
          <span v-else>Hide</span> Complete
        </div>
        <div class="btn btn-more" v-if="todoList.length > 0" v-on:click="clearAll">Clear All</div>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'TodoList',
    data() {
      return {
        todoList: [],
        newTodoList: '',
        showComplete: false
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
      },
      // pending list
      pending: function () {
        return this.todoList.filter(function (item) {
          return !item.done;
        });
      },
      // completed list
      completed: function () {
        return this.todoList.filter(function (item) {
          return item.done;
        });
      },
      // show completed percentage
      completedPercentage: function () {
        return (
          Math.floor(this.completed.length / this.todoList.length * 100) + '%'
        );
      }
    },
    methods: {
      // add a new item
      addItem() {
        if (this.newTodoList) {
          this.todoList.unshift({
            id: this.todoList.length,
            title: this.newTodoList,
            done: false
          });
        }
        this.newTodoList = '';
        return true;
      },
      // delete item
      deleteItem(item) {
        this.todoList.splice(this.todoList.indexOf(item), 1);
      },
      // toggle completed list
      toggleShowComplete() {
        this.showComplete = !this.showComplete;
      },
      // clear all list
      clearAll() {
        this.todoList = [];
      }
    }
  }

</script>

// if add scoped, what will happen？
<style>
  @import "../assets/css/todo-list.css";

</style>
