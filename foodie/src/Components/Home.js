import React from 'react';
import QuickSearch from './QuickSearch';
import Wallpaper from './Wallpaper';
import axios from 'axios';

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            locations: [],
            mealTypes: []
        }
    }

    componentDidMount() {
        sessionStorage.clear();
        axios({
            url: 'http://localhost:8989/api/locations',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
                this.setState({ locations: res.data.locations })
            })
            .catch(err => console.log(err))

        axios({
            url: 'http://localhost:8989/api/mealtypes',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
                this.setState({ mealTypes: res.data.mealtypes })
            })
            .catch(err => console.log(err))
    }

    render() {
        const { locations, mealTypes } = this.state;
        return (
            <div>
                <Wallpaper locationsData={locations} />
                <QuickSearch mealTypesData={mealTypes} />
            </div>
        )
    }
}

export default Home;

