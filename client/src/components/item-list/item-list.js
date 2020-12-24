import React from 'react';
import './item-list.css';

const ItemList = ({ data, deleteItemHandler }) => {

  return (
    <div className="item-list">
      { 
        !data.length 
          ?  <p className="no-data">There is no data yet</p>
          :  data.map(({ _id, owner, model, mark, year, id, userId, title, body}) => {
              return (
                <ul  className="card" 
                      key={mark || id}>
                  <li className="card-item">{owner || userId}</li>
                  <li className="card-item">{model || id}</li>
                  <li className="card-item">{mark || title}</li>
                  <li className="card-item">{year || body}</li>
                  <li className="card-item delete-btn">
                    <button
                      onClick={() => deleteItemHandler(_id)}
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
