import React, { Component } from 'react';
import { connect } from 'react-redux';
import ItemList from '../item-list/item-list';
import { getCars, postCar, deleteCar, resetCarState, onChangeCars } from '../../redux/actions/cars'
import './form.css';

class Form extends Component {

  // getAll cars from database 
  componentDidMount() {
    this.props.getCars();
  };

  handleChange = e => {
    this.props.onChangeCars(e.target.name, e.target.value);
  };

  // send car data to database
  postItemHandler = e => {
    e.preventDefault();
    this.props.postCar();
    this.props.resetCarState();
  };

  // delete car from database
  // deleteItemHandler = (id) => {
  //   this.props.deleteCar(id);
  // }; ?????

  // reset form
  onCancel = e => {
    e.preventDefault();
    this.props.resetCarState();
  };

  render() {

    const { owner, model, mark, year } = this.props;

    return (
      <div className="form-page">
        <form className="form"
              onSubmit={this.postItemHandler}>
                <div className="form-group">
                  <div className="form-wrapper">
                    <label htmlFor="owner"
                            className="label">
                              Owner
                    </label>
                    <input className="form-input" 
                            type="text"
                            name="owner"
                            value={owner}
                            onChange={this.handleChange}
                            required />
                  </div>
                  <div className="form-wrapper">
                    <label htmlFor="mark"
                            className="label">
                              Mark
                    </label>
                    <input className="form-input" 
                            type="text"
                            name="mark"
                            value={mark}
                            onChange={this.handleChange}
                            required />
                  </div>
                  <div className="form-wrapper">
                    <label htmlFor="model"
                            className="label">
                              Model
                    </label>
                    <input className="form-input" 
                            type="text"
                            name="model"
                            value={model}
                            onChange={this.handleChange}
                            required />
                  </div>
                  <div className="form-wrapper">
                    <label htmlFor="year"
                            className="label">
                              Year
                    </label>
                    <input className="form-input" 
                            type="text"
                            name="year"
                            value={year}
                            onChange={this.handleChange}/>
                  </div>
                  <div className="buttons-group">
                    <button className='btn add-btn'
                            type="submit">
                            Add Item
                    </button>
                    <button className='btn cancel-btn'
                            onClick={this.onCancel}>
                            Cancel
                    </button>
                  </div>
                </div>
        </form>
        <ItemList />
      </div>
    )
  }
};

const mapStateToProps = state => {
  return {
    cars: state.cars.cars,
    owner: state.cars.owner,
    mark: state.cars.mark,
    model: state.cars.model,
    year: state.cars.year
  }
};

const mapDispatchToProps = dispatch => {
  return {
    getCars: () => dispatch(getCars()),
    postCar: () => dispatch(postCar()),
    onChangeCars: (name, value) => dispatch(onChangeCars(name, value)),
    resetCarState: () => dispatch(resetCarState())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
