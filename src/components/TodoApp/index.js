import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import TaskInput from '../TaskInput'
import TaskList from '../TaskList'

import './index.css'

class TodoApp extends Component {
  state = {
    todoList: [
      {id: 1, task: 'Reading', isActive: false},
      {id: 2, task: 'Sleeping', isActive: true},
      {id: 3, task: 'Waking', isActive: false},
    ],
  }

  componentDidMount() {
    const stringifiedTodoList = localStorage.getItem('todoList')
    const parsedTodoList = JSON.parse(stringifiedTodoList)
    if (parsedTodoList === null) {
      this.setState({todoList: []})
    } else {
      this.setState({todoList: parsedTodoList})
    }
  }

  saveTodoList = () => {
    const {todoList} = this.state
    localStorage.setItem('todoList', JSON.stringify(todoList))
  }

  addTodo = value => {
    const newTodo = {id: uuidv4(), task: value, isActive: false}
    this.setState(
      prevState => ({
        todoList: [...prevState.todoList, newTodo],
      }),
      this.saveTodoList,
    )
  }

  changeIsActive = id => {
    this.setState(
      prevState => ({
        todoList: prevState.todoList.map(eachTodo => {
          if (eachTodo.id === id) {
            return {...eachTodo, isActive: !eachTodo.isActive}
          }
          return eachTodo
        }),
      }),
      this.saveTodoList,
    )
  }

  deleteTodo = id => {
    this.setState(
      prevState => ({
        todoList: prevState.todoList.filter(eachTodo => eachTodo.id !== id),
      }),
      this.saveTodoList,
    )
  }

  taskEdit = (id, value) => {
    this.setState(
      prevState => ({
        todoList: prevState.todoList.map(eachTodo => {
          if (eachTodo.id === id) {
            return {...eachTodo, task: value}
          }
          return eachTodo
        }),
      }),
      this.saveTodoList,
    )
  }

  render() {
    const {todoList} = this.state
    return (
      <div className="todos-bg-container">
        <div className="todos-header-container">
          <h1 className="todos-heading">
            <span className="to-heading">TO</span>
            <span className="do-heading">DO</span>
          </h1>
        </div>
        <div className="todo-bottom-container">
          <TaskInput addTodo={this.addTodo} />
          <TaskList
            todoList={todoList}
            changeIsActive={this.changeIsActive}
            deleteTodo={this.deleteTodo}
            taskEdit={this.taskEdit}
          />
        </div>
      </div>
    )
  }
}

export default TodoApp
