import {Component} from 'react'

import Task from '../Task'

import './index.css'

class TaskList extends Component {
  render() {
    const {todoList, changeIsActive, deleteTodo, taskEdit} = this.props

    return (
      <ul className="todo-list-container">
        {todoList.map(eachTodo => (
          <Task
            eachTodo={eachTodo}
            key={eachTodo.id}
            changeIsActive={changeIsActive}
            deleteTodo={deleteTodo}
            taskEdit={taskEdit}
          />
        ))}
      </ul>
    )
  }
}

export default TaskList
