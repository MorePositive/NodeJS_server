import React, { Component } from 'react';
import axios from 'axios';
import ItemList from '../item-list/item-list';

import { initialState } from './initial-state';
import './form.css';

export default class Form extends Component {
  
  state = {
    data: [],
    owner: "",
    mark: "",
    model: "",
    year: ""
  }

  // getAll cars from database 
  updateList = () => {
    axios.get("/api/cars/getAll")
    .then(data => this.setState({ data: data.data }))
    .catch(e => console.log(e));
  };

  componentDidMount() {
    this.updateList();
  };

  getInitialState = () => {
    this.setState(initialState);
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  // send car data to database
  postItemHandler = (e) => {
    e.preventDefault();
    const { owner, model, mark, year } = this.state;
    const carData = { owner, model, mark, year };
    axios.post("/api/cars/add-car", carData)
      .then((data) => {
        window.M.toast({ html: data.data.message });
        this.getInitialState();
        this.updateList();
      })
      .catch(e => console.log(e));
  };

  // delete car from database
  deleteItemHandler = (id) => {
    axios.delete(`/api/cars/${id}`)
      .then(data => {
        window.M.toast({ html: data.data.message });
        this.updateList();
      })
      .catch(e => console.log(e))
  };

  // reset form
  onCancel = (e) => {
    e.preventDefault();
    this.getInitialState();
  };

  render() {

    const { data, owner, model, mark, year } = this.state;

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
        <ItemList 
          data={data} 
          deleteItemHandler={this.deleteItemHandler} />
      </div>
    )
  }
};
