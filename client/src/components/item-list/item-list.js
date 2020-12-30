import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteCar } from '../../redux/actions/cars';
import './item-list.css';

const ItemList = () => {
  const cars = useSelector(state => state.cars.cars);
  const dispatch = useDispatch();
  return (
    <div className="item-list">
      { 
        !cars.length 
          ?  <p className="no-data">There is no data yet</p>
          :  cars.map(({ _id, owner, model, mark, year, id, userId, title, body}) => {
              return (
                <ul  className="card" 
                      key={mark || id}>
                  <li className="card-item">{owner || userId}</li>
                  <li className="card-item">{model || id}</li>
                  <li className="card-item">{mark || title}</li>
                  <li className="card-item">{year || body}</li>
                  <li className="card-item delete-btn">
                    <button
                      onClick={() => dispatch(deleteCar(_id))}
                      className="btn btn waves-effect waves-light red"
                      >
                        delete
                    </button>
                  </li>
                </ul>
                )
              })
      }
    </div>
  )
};

export default ItemList;
