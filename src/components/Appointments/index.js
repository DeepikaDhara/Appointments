// Write your code here
import {Component} from 'react'
import {v4} from 'uuid'
import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    appointmentList: [],
    titleInput: '',
    dateInput: '',
    isFilterActive: false,
  }

  toggleIsStarred = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  onFilter = () => {
    const {isFilterActive} = this.state
    this.setState({
      isFilterActive: !isFilterActive,
    })
  }

  onChangeDate = event => {
    this.setState({
      dateInput: event.target.value,
    })
  }

  onChangeTitle = event => {
    this.setState({
      titleInput: event.target.value,
    })
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state
    const formattedDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM YYYY EEEE')
      : ''
    const newAppointment = {
      id: v4(),
      title: titleInput,
      date: formattedDate,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  getFilteredAppointmentsList = () => {
    const {appointmentList, isFilterActive} = this.state
    if (isFilterActive) {
      return appointmentList.filter(
        eachTransaction => eachTransaction.isStarred === true,
      )
    }
    return appointmentList
  }

  render() {
    const {titleInput, dateInput, isFilterActive} = this.state
    const filterClassName = isFilterActive ? 'filter-filled' : 'filter-empty'
    const filteredAppointmentList = this.getFilteredAppointmentsList()

    return (
      <div className="bg-conatiner">
        <div className="conatiner">
          <div className="text-conatiner">
            <form className="form" onSubmit={this.onAddAppointment}>
              <h1 className="heading">Add Appointment</h1>
              <label htmlFor="title">Title</label>
              <br />
              <input
                type="text"
                onChange={this.onChangeTitle}
                placeholder="Title"
                id="title"
                value={titleInput}
              />
              <br />
              <label htmlFor="date">Date</label>
              <br />
              <input
                type="date"
                onChange={this.onChangeDate}
                placeholder="Date"
                id="date"
                value={dateInput}
              />
              <br />
              <button className="button" type="submit">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
            />
          </div>
          <hr className="hor-line" />
          <div className="header-with-filter">
            <h1 className="appointment-heading">Appointments</h1>
            <button
              type="button"
              className={`filter style ${filterClassName}`}
              onClick={this.onFilter}
            >
              Starred
            </button>
          </div>
          <ul className="appointments-list">
            {filteredAppointmentList.map(eachAppointment => (
              <AppointmentItem
                key={eachAppointment.id}
                appointmentDetails={eachAppointment}
                toggleIsStarred={this.toggleIsStarred}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Appointments
