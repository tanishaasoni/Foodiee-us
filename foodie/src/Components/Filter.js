import React from 'react';
import '../Styles/filter.css';
import queryString from 'query-string';
import axios from 'axios';

class Filter extends React.Component {
    constructor() {
        super();
        this.state = {
            restaurants: [],
            locations: [],
            mealtype: undefined,
            location: undefined,
            cuisine: undefined,
            lcost: undefined,
            hcost: undefined,
            sort: 1,
            page: 1
        }
    }

    componentDidMount() {
        const qs = queryString.parse(this.props.location.search);
        const { mealtype, location } = qs;

        const filterObj = {
            mealtype: mealtype,
            location: location
        };

        axios({
            url: 'http://localhost:8989/api/filter',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: filterObj
        })
            .then(res => {
                this.setState({ restaurants: res.data.restaurants, mealtype, location})
            })
            .catch(err => console.log(err))

        axios({
            url: 'http://localhost:8989/api/locations',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
                this.setState({ locations: res.data.locations })
            })
            .catch(err => console.log(err))
    }

    handleSortChange = (sort) => {
        const { mealtype, cuisine, location, lcost, hcost, page } = this.state;

        const filterObj = {
            mealtype_id: mealtype,
            cuisine_id: cuisine,
            location_id: location,
            lcost,
            hcost,
            sort,
            page
        };

        axios({
            url: 'http://localhost:8989/api/filter',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: filterObj
        })
            .then(res => {
                this.setState({ restaurants: res.data.restaurants, sort })
            })
            .catch(err => console.log(err))
    }

    handleCostChange = (lcost, hcost) => {
        const { mealtype, cuisine, location, sort, page } = this.state;

        const filterObj = {
            mealtype_id: mealtype,
            cuisine_id: cuisine,
            location_id: location,
            lcost,
            hcost,
            sort,
            page
        };

        axios({
            url: 'http://localhost:8989/api/filter',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: filterObj
        })
            .then(res => {
                this.setState({ restaurants: res.data.restaurants, lcost, hcost })
            })
            .catch(err => console.log(err))
    }

    handleLocationChange = (event) => {
        const location = event.target.value;
        const { mealtype, cuisine, lcost, hcost, sort, page } = this.state;

        const filterObj = {
            mealtype_id: mealtype,
            cuisine_id: cuisine,
            location_id: location,
            lcost,
            hcost,
            sort,
            page
        };

        axios({
            url: 'http://localhost:8989/api/filter',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: filterObj
        })
            .then(res => {
                this.setState({ restaurants: res.data.restaurants, location })
            })
            .catch(err => console.log(err))
    }

    handleNavigate = (restaurantId) => {
        this.props.history.push(`/details?id=${restaurantId}`)
    }

    render() {
        const { restaurants, locations } = this.state;
        return (
            <div>
                <div>
                    <div id="myId" className="heading">Breakfast Places in jk</div>

                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-4 col-md-4 col-lg-4 filter-options">
                                <div className="filter-heading">Filters / Sort</div>
                                <span className="glyphicon glyphicon-chevron-down toggle-span" data-toggle="collapse"
                                    data-target="#filter"></span>
                                <div id="filter" className="collapse show">
                                    <div className="Select-Location">Select Location</div>
                                    <select className="Rectangle-2236" onChange={this.handleLocationChange}>
                                        <option>Select</option>
                                        {locations.map((item) => {
                                            return <option value={item.location_id}>{`${item.name}, ${item.city}`}</option>
                                        })}
                                    </select>
                                    <div className="Cuisine">Cuisine</div>
                                    <div style={{ display: 'block' }}>
                                        <input type="checkbox" />
                                        <span className="checkbox-items">North Indian</span>
                                    </div>
                                    <div>
                                        <input type="checkbox" />
                                        <span className="checkbox-items">South Indian</span>
                                    </div>
                                    <div>
                                        <input type="checkbox" />
                                        <span className="checkbox-items">Chineese</span>
                                    </div>
                                    <div>
                                        <input type="checkbox" />
                                        <span className="checkbox-items">Fast Food</span>
                                    </div>
                                    <div>
                                        <input type="checkbox" />
                                        <span className="checkbox-items">Street Food</span>
                                    </div>
                                    <div className="Cuisine">Cost For Two</div>
                                    <div>
                                        <input type="radio" name="cost" onChange={() => this.handleCostChange(1, 500)} />
                                        <span className="checkbox-items">Less than &#8377; 500</span>
                                    </div>
                                    <div>
                                        <input type="radio" name="cost" onChange={() => this.handleCostChange(500, 1000)} />
                                        <span className="checkbox-items">&#8377; 500 to &#8377; 1000</span>
                                    </div>
                                    <div>
                                        <input type="radio" name="cost" onChange={() => this.handleCostChange(1000, 1500)} />
                                        <span className="checkbox-items">&#8377; 1000 to &#8377; 1500</span>
                                    </div>
                                    <div>
                                        <input type="radio" name="cost" onChange={() => this.handleCostChange(1500, 2000)} />
                                        <span className="checkbox-items">&#8377; 1500 to &#8377; 2000</span>
                                    </div>
                                    <div>
                                        <input type="radio" name="cost" onChange={() => this.handleCostChange(2000, 50000)} />
                                        <span className="checkbox-items">&#8377; 2000 +</span>
                                    </div>
                                    <div className="Cuisine">Sort</div>
                                    <div>
                                        <input type="radio" name="sort" onChange={() => this.handleSortChange(1)} />
                                        <span className="checkbox-items">Price low to high</span>
                                    </div>
                                    <div>
                                        <input type="radio" name="sort" onChange={() => this.handleSortChange(-1)} />
                                        <span className="checkbox-items">Price high to low</span>
                                    </div>
                                    </div>
                            </div>
                            <div className="col-sm-8 col-md-8 col-lg-8">
                                {restaurants.length !=0 ? restaurants.map((item) => {
                                    return <div className="Item" onClick={() => this.handleNavigate(item._id)}>
                                        <div> 
                                            <div className="small-item vertical">
                                                <img className="img" src="./Assets/breakfast.jpg" />
                                            </div>
                                            <div className="big-item">
                                                <div className="rest-name">{item.name}</div>
                                                <div className="rest-location">{item.locality}</div>
                                                <div className="rest-address">{item.city}</div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div>
                                            <div className="margin-left">
                                                <div className="Bakery">CUISINES : {item.cuisine.map((cuisine) => `${cuisine.name}, `)}</div>
                                                <div className="Bakery">COST FOR TWO : &#8377; {item.min_price} </div>
                                            </div>
                                        </div>
                                    </div>
                                }) 
                                : <div class="no-elements">
                                    No Results Found ...</div>}

                                {restaurants.length != 0 ? < div className="pagination">
                                    <a href="#">&laquo;</a>
                                    <a href="#">1</a>
                                    <a href="#">2</a>
                                    <a href="#">3</a>
                                    <a href="#">4</a>
                                    <a href="#">5</a>
                                    <a href="#">6</a>
                                    <a href="#">&raquo;</a>
                                </div> : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

export default Filter;