import {Component} from 'react'
import {MdOutlineDelete} from 'react-icons/md'
import {FaRegEdit} from 'react-icons/fa'

import './index.css'

class Task extends Component {
  state = {editId: '', editedTask: ''}

  onChangeActive = () => {
    const {eachTodo, changeIsActive} = this.props
    const {id} = eachTodo
    changeIsActive(id)
  }

  onEditTodoClicked = () => {
    const {eachTodo} = this.props
    const {id} = eachTodo
    this.setState({editId: id})
  }

  onDeleteTodoClicked = () => {
    const {eachTodo, deleteTodo} = this.props
    const {id} = eachTodo
    deleteTodo(id)
  }

  onEditTask = event => {
    this.setState({editedTask: event.target.value})
  }

  sendEditedTask = event => {
    const {editedTask} = this.state
    const {eachTodo, taskEdit} = this.props
    const {id} = eachTodo
    if (event.key === 'Enter') {
      taskEdit(id, editedTask)
      this.setState({editId: '', editedTask: ''})
    }
  }

  render() {
    const {editId, editedTask} = this.state
    const {eachTodo} = this.props
    const {id, isActive, task} = eachTodo

    const activeClass = isActive ? 'task-text is-active' : 'task-text'

    return (
      <>
        <li className="todo-task">
          <div className="task-container">
            <input
              type="checkbox"
              className="checkbox-ele"
              id={id}
              checked={isActive}
              onChange={this.onChangeActive}
            />
            {editId === id ? (
              <input
                type="text"
                value={editedTask}
                onChange={this.onEditTask}
                onKeyDown={this.sendEditedTask}
              />
            ) : (
              <label className={`${activeClass}`} htmlFor={id}>
                {task}
              </label>
            )}
          </div>
          <div>
            <button
              type="button"
              onClick={this.onEditTodoClicked}
              className="button-ele"
            >
              <FaRegEdit className="delete-icon" />
            </button>
            <button
              type="button"
              onClick={this.onDeleteTodoClicked}
              className="button-ele"
            >
              <MdOutlineDelete className="delete-icon" />
            </button>
          </div>
        </li>
        <hr className="hr-line" />
      </>
    )
  }
}

export default Task
