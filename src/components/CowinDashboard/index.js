import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByAge from '../VaccinationByAge'
import VaccinationByGender from '../VaccinationByGender'
import './index.css'

const appstatus = {
  failure: 'Failure',
  success: 'Success',
  loading: 'Loading',
}

class CowinDashboard extends Component {
  state = {list: [], status: appstatus.loading}

  componentDidMount = async () => {
    try {
      const response = await fetch(
        'https://apis.ccbp.in/covid-vaccination-data',
      )
      if (!response.ok) {
        throw new Error('Failed to fetch data')
      }
      const data = await response.json()
      this.setState({list: data, status: appstatus.success})
    } catch (error) {
      this.setState({status: appstatus.failure})
    }
  }

  renderContent = () => {
    const {status, list} = this.state

    switch (status) {
      case appstatus.success:
        return (
          <>
            <VaccinationCoverage list={list.last_7_days_vaccination} />
            <VaccinationByGender list={list.vaccination_by_age} />
            <VaccinationByAge list={list.vaccination_by_gender} />
          </>
        )

      case appstatus.failure:
        return (
          <div className="loader">
            <h1>Something went wrong</h1>
            <img
              height={400}
              width={500}
              src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
              alt="failure view"
            />
          </div>
        )

      default:
        return (
          <div data-testid="loader" className="loader">
            <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
          </div>
        )
    }
  }

  render() {
    return (
      <div className="w">
        <div className="logo">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            height={30}
            width={30}
            alt="website logo"
          />
          <p style={{color: '#2cc6c6'}}>co-WIN</p>
        </div>
        <h1 style={{color: '#cbd5e1'}}>CoWIN Vaccination in India</h1>
        <div className="scroll">{this.renderContent()}</div>
      </div>
    )
  }
}

export default CowinDashboard
