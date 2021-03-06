import React, { Component } from "react";
import { loadRestaurant as restaurantApi } from "../../services/restaurantZomato";
import CommentList from "./../Comments/CommentList";
import Button from "react-bootstrap/Button";
import MapBox from "./../../components/MapBox";

// import { loadUserInformation as loadUserInformationService } from "./../../services/authentication";
// import { loadUserInformation as loadUserInformationService } from "./../../services/authentication";
import { addToFavorites as addToFavoritesService } from "./../../services/authentication";
import { removeFromFavorites as removeFromFavoritesService } from "./../../services/authentication";

import "./style.css";
import { Fragment } from "react";

class singleRestaurant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurant: null,
      user: this.props.user,
      // user: null,
      favorites: null,
      update: false
    };
    this.addToFavoritesButton = this.addToFavoritesButton.bind(this);
    this.removeFromFavoritesButton = this.removeFromFavoritesButton.bind(this);
  }

  async componentDidMount() {
    const id = this.props.match.params.id;
    const user = this.props.user;
    const arrFavId = [];
    if (user) {
      const favoritesId = this.props.user.favorites.map(favorite => {
        arrFavId.push(favorite.resId);
      });
    }
    try {
      window.scrollTo(0, 0);

      // const user = await loadUserInformationService();
      const singleRestaurant = await restaurantApi(id);
      //console.log('response from api', singleRestaurant);
      this.setState({
        restaurant: singleRestaurant,
        user: this.props.user,
        restId: arrFavId
      });
      // console.log('ARRAY ID', arrFavId);
    } catch (error) {
      console.log(error);
      this.props.history.push("/error/404");
    }
  }

  compareFavoriteId() {
    const arrFavId = this.state.restId;
    const restId = this.props.match.params.id * 1;
    let comparing = false;
    // console.log('REST ID', restId);
    // console.log('ARR ID', arrFavId);
    for (let i = 0; i < arrFavId.length; i++) {
      console.log("Both", restId, arrFavId[i]);
      if (arrFavId[i] === restId) {
        // console.log('Ids,', arrFavId);
        comparing = true;
      }
    }
    return comparing;
  }

  async addToFavoritesButton(event, name) {
    // event.preventDefault();
    const favoriteRestaurantId = this.props.match.params.id;
    const location = this.state.restaurant.location.address;
    const image = this.state.restaurant.featured_image;
    // console.log(
    //   'addToFavoritesButton STATE',
    //   favoriteRestaurantId,
    //   name,
    //   location,
    //   image
    // );
    try {
      await addToFavoritesService(favoriteRestaurantId, name, location, image);
      this.setState({
        update: !this.state.update
      });

      // console.log("USER JOINVIEW", user);
    } catch (error) {
      console.log(error);
    }
  }

  async removeFromFavoritesButton() {
    // event.preventDefault();
    const favoriteRestaurantId = this.props.match.params.id;
    // console.log('removeFromFavoriteButton STATE', favoriteRestaurantId);
    try {
      await removeFromFavoritesService(favoriteRestaurantId);
      this.setState({
        update: !this.state.update
      });
      // console.log("USER JOINVIEW", user);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const restaurant = this.state.restaurant;
    const user = this.state.user;

    //console.log("props user", this.props.user);
    // const id = this.props.match.params.id;
    //console.log('hello', restaurant);
    return (
      <div className="MinPageHeight mt-4 pt-4 mx-2">
        <div className="row my-2">
          {restaurant && (
            // <div className="SingleRestaurantCard card">
            <Fragment>
              <div className="SingleRestaurantCard card my-3 mx-4 p-0 no-gutters col-md-6 d-flex border-0">
                {/* <div className="row no-gutters"> */}
                {/* <div className="col-md-6"> */}
                <div>
                  <div className="card-body ">
                    <h5 className="card-title">{restaurant.name}</h5>
                    <img
                      src={restaurant.featured_image}
                      fluid
                      className="card-image SingleRestImg m-0 p-0"
                      alt="..."
                    />
                    <p className="card-text">Cuisines: {restaurant.cuisines}</p>
                    <p className="card-text">
                      Type: {restaurant.establishment}
                    </p>
                    <p className="card-text">
                      Average cost: {restaurant.average_cost_for_two / 2}
                      {restaurant.currency}
                    </p>
                    <p className="card-text">
                      Neighborhood: {restaurant.location.locality_verbose}
                    </p>
                    <p className="card-text">
                      Address: {restaurant.location.address}
                    </p>
                    <p className="card-text">
                      Contact: {restaurant.phone_numbers}
                    </p>
                    <p className="card-text">
                      Zomato Rating{/*  (1-5) */}:{" "}
                      {restaurant.user_rating.aggregate_rating} (
                      {restaurant.user_rating.rating_text})
                    </p>
                    {user && (
                      <div>
                        {(this.state.update && (
                          <Button
                            onClick={event => {
                              this.removeFromFavoritesButton();
                            }}
                            className="btn MyBtn"
                          >
                            Remove from Favorites
                          </Button>
                        )) || (
                          <Button
                            onClick={event => {
                              this.addToFavoritesButton(event, restaurant.name);
                            }}
                            className="btn MyBtn"
                          >
                            Add to Favorites
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* </div> */}
              <div className="col-md-6 mx-2 my-3">
                <MapBox
                  className="SingleRestMap ml-5"
                  lat={restaurant.location.latitude}
                  lng={restaurant.location.longitude}
                />
                {user && <CommentList {...this.props} />}
              </div>
            </Fragment>
          )}
        </div>
      </div>
    );
  }
}

export default singleRestaurant;
