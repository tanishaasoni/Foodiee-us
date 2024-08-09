const Restaurants = require('../Models/restaurants')

exports.getRestaurantsByLocId = (req, res) => {
    const { locId } = req.params;
    Restaurants.find({ location_id: locId })
        .then(response => {
            res.status(200).json({
                message: "Restaurants Fetched Succesfully",
                restaurants: response
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}

exports.filterRestaurants = (req, res) => {
    let { mealtype, location, cuisine, lcost, hcost, page, sort, itemsPerPage } = req.body;

    sort = sort ? sort : 1;
    page = page ? page : 1;
    itemsPerPage = itemsPerPage ? itemsPerPage : 2;

    let startIndex = page * itemsPerPage - itemsPerPage;
    let endIndex = page * itemsPerPage;

    let filterObj = {};

    mealtype && (filterObj["mealtype_id"] = mealtype);
    location && (filterObj["location_id"] = location);
    cuisine && (filterObj["cuisine_id"] = { $in: cuisine });
    lcost && hcost && (filterObj["min_price"] = { $gte: lcost, $lte: hcost });

    Restaurants.find(filterObj).sort({ min_price: sort })
        .then(response => {
            // Pagination Logic
            const filteredResponse = response.slice(startIndex, endIndex);
            res.status(200).json({
                message: "Restaurants Fetched Succesfully",
                restaurants: filteredResponse
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}

// exports.getRestaurantDetailsById = (req, res) => {
//     const resId  = req.params.id;
//     console.log(resId)
//     Restaurants.find({_id:resId})
//         .then(response => {
//             res.status(200).json({
//                 message: "Restaurant Fetched Succesfully",
//                 restaurants: response
//             })
//         })
//         .catch(err => {
//             res.status(500).json({
//                 error: err
//             })
//         })
// }
exports.getrestaurantById = (req ,res)=>{ 
    const Restid = req.params.id; 
    Restaurants.find({ _id: Restid }).then(result => { 
        res.status(200).json({ 
            message : `here is your Restaurant ${Restid}`, 
            restaurant : result 
        }); 
    }).catch(error => { 
        res.status(500).json( 
            { 
                message: "error in Database", 
                error:error 
            } 
        ); 
    }); 
}