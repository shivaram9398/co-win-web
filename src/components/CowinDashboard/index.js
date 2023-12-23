import {Component} from 'react'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'
import Loader from 'react-loader-spinner'

import './index.css'

const apiStatus = {
  intial: 'intial',
  progress: 'progress',
  failed: 'failed',
  success: 'success',
}

class CowinDashboard extends Component {
  state = {data: '', activeStatus: apiStatus.intial}

  componentDidMount() {
    this.getapidata()
  }

  getapidata = async () => {
    this.setState({activeStatus: apiStatus.progress})
    const url = 'https://apis.ccbp.in/covid-vaccination-data'

    const response = await fetch(url)

    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = {
        last7DaysVaccination: fetchedData.last_7_days_vaccination.map(
          eachDayData => ({
            vaccineDate: eachDayData.vaccine_date,
            dose1: eachDayData.dose_1,
            dose2: eachDayData.dose_2,
          }),
        ),
        vaccinationByAge: fetchedData.vaccination_by_age.map(range => ({
          age: range.age,
          count: range.count,
        })),
        vaccinationByGender: fetchedData.vaccination_by_gender.map(
          genderType => ({
            gender: genderType.gender,
            count: genderType.count,
          }),
        ),
      }

      this.setState({data: updatedData, activeStatus: apiStatus.success})
    } else {
      this.setState({activeStatus: apiStatus.failed})
    }
  }

  loader = () => {
    return (
      <div data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
      </div>
    )
  }
  fail = () => {
    return (
      <>
        <img
          src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
          alt="failure view"
        />
        <h1>Something went wrong</h1>
      </>
    )
  }

  container = () => {
    const {data} = this.state
    console.log(data)
    const {last7DaysVaccination, vaccinationByAge, vaccinationByGender} = data
    return (
      <>
        <VaccinationCoverage data={last7DaysVaccination} />
        <VaccinationByGender data={vaccinationByGender} />
        <VaccinationByAge data={vaccinationByAge} />
      </>
    )
  }

  renderView = () => {
    const {activeStatus} = this.state
    switch (activeStatus) {
      case apiStatus.success:
        return this.container()
      case apiStatus.progress:
        return this.loader()
      case apiStatus.failed:
        return this.fail()
      default:
        return null
    }
  }
  

  render() {
    const {isLaoding, show, activeStatus} = this.state
    //const respo = show ? this.fail() : this.container()//

    return (
      <div className="main-con">
        <div className="top">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            className="image"
            alt="website logo"
          />
          <h1 className="heading">Co-win</h1>
        </div>
        <h1 className="heading c">CoWIN Vaccination in India</h1>
        {this.renderView()}
      </div>
    )
  }
}

export default CowinDashboard
