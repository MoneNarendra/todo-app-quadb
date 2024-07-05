import {Component} from 'react'

import './index.css'

class TaskInput extends Component {
  state = {userInput: ''}

  onChangeInput = event => {
    this.setState({userInput: event.target.value})
  }

  addTask = () => {
    const {userInput} = this.state
    const {addTodo} = this.props
    if (userInput !== '') {
      addTodo(userInput)
      this.setState({userInput: ''})
    }
  }

  addTaskByEnter = event => {
    if (event.key === 'Enter') {
      this.addTask()
    }
  }

  render() {
    const {userInput} = this.state

    return (
      <div className="input-container">
        <input
          type="text"
          className="todo-user-input"
          placeholder="What do you need to do?"
          onChange={this.onChangeInput}
          value={userInput}
          onKeyDown={this.addTaskByEnter}
        />
        <button className="add-button" type="button" onClick={this.addTask}>
          Add
        </button>
      </div>
    )
  }
}

export default TaskInput
