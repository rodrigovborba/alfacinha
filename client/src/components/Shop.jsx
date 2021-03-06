import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

class Shop extends Component {
  render() {
    // const id = this.props.id;
    window.scrollTo(0, 0);
    const name = this.props.name;
    const image = this.props.image;
    const location = this.props.location;
    const contacts = this.props.contacts;
    return (
      <div
        key={name}
        className="RestaurantsCard card ml-3 mb-5 mr-5"
        style={{ maxWidth: '540px' }}
      >
        <div className="row no-gutters">
          <div className="col-md-4">
            <img src={image} className="RestaurantsImg card-img" alt={name} />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <Link to={`/shop-list/${name}`}>
                <h5 className="CardTitle text-dark card-title">{name}</h5>
              </Link>
              <p className="card-text">Address: {location}</p>
              <p className="card-text">Contact: {contacts}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Shop;
