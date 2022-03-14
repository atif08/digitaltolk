/**
 * Created by Atif on 8/28/2019.
 */
import axios from '../helper/axios';
import moment from "moment";
import {Alert} from "react-native";
import {axiosFun} from "./helperFunctions";

export function reCheck(token, reCheckArray) {
    let rooms = [];
    return axiosFun(token).post('hotel/recheck', {rooms: reCheckArray}).then(response => {
        if (response.data.status == true) {
            for (let room of response.data.data.rooms) {
                for (let rate of room.rates) {
                    rooms.push({rateKey: rate.rateKey})
                }
            }
            return rooms;
        } else {
            alert(response.data.message.error.message)
        }

    }).catch(err => {
        // alert('RecheckError', '' + err);
    })
}

export const activitySearchApi = (token, parameters) => {
    return (axiosFun(token).get('activity/search?' +
        '&city_id=' + parameters.city_id +
        '&destination=LON' +
        '&page=1&' +
        'adult=' + parameters.adults +
        '&children=' + parameters.children +
        '&from=' + moment(parameters.from).format('YYYY-MM-DD') +
        '&to=' + moment(parameters.from).format('YYYY-MM-DD')
    ).then(response => response.data).catch(err => {
        // alert('Oops', '' + err);
    }))
};
export const hotelSearchApi = (token, parameters) => {
    return (
        axiosFun(token).post('hotel/search', {
            "check-in": moment(parameters.checkinDate).format('YYYY-MM-DD'),
            "check-out": moment(parameters.checkoutDate).format('YYYY-MM-DD'),
            "city_id": parameters.city_id,
            "adults": parameters.adults,
            "children": parameters.children,
            "age": parameters.paxesArray,
            "rooms": "1",
            "page": 1
        }).then(response => response.data).catch(err => {
            // Alert.alert('HotelSearchError', '' + err);
        })
    )
};
export const apiOrderDetail = (token, detailUrl, track_id) => {
    return (axiosFun(token).get(detailUrl + track_id)
        .then(response => response.data).catch(err => {
            // alert('Error to get booking detail', '' + err);
        }));
}
export const apiOrderList = (token, url, parameters) => {
    return (axiosFun(token).post(url, parameters
    ).then(response => response.data).catch(err => {
        // alert('OrderListError' + err);
    }))

}
export const apiAddPlaceToPlanner = (token, parameters) => {
    return (
        axiosFun(token).post('trip-planner/add-place', parameters)
            .then(response => response.data
            ).catch(err => {
            console.warn(err)
            // Alert.alert('AddPlaceToPlannerError', '' + err);
        })

    )

}
export const apiAddPlaceToDuration = (token, parameters) => {
    return (
        axiosFun(token).post('trip-planner/add-place-duration', parameters)
            .then(response => response.data
            ).catch(err => {
            // Alert.alert('Error', '' + err);
        })

    )

}
export const apiAddPlaceOrderDuration = (token, parameters) => {
    return (
        axiosFun(token).post('trip-planner/reorder-itinerary', parameters)
            .then(response => response.data
            ).catch(err => {
            // Alert.alert('apiAddPlaceOrderDurationError', '' + err);
        })

    )

}
export const apiGetCities = (token, term) => {
    return (
        // axios.get('trip-cities?term='+term+'&country_code=GB') //visit britain
        axiosFun(token).get('trip-cities?term=' + term + '&country_code=') // ooredoo
            .then(response => response.data
            ).catch(err => {
            // Alert.alert('apiGetCitiesError', '' + err);
        })
    )

}
export const apiGetUserDetail = (token, id) => {
    return (
        // axios.get('trip-cities?term='+term+'&country_code=GB') //visit britain
        axiosFun(token).get('profile/user/' + id) // ooredoo
            .then(response => response.data
            ).catch(err => {
            Alert.alert('apiGetUserDetailError', '' + err);
        })
    )

}
export const apiUpdateUserPoint = (token, data) => {
    return (
        axiosFun(token).post('profile/update-point', data) // ooredoo
            .then(response => response.data
            ).catch(err => {
            Alert.alert('apiUpdateUserPointError', '' + err);
        })
    )

}
export const apiGetRestaurants = (token, destination, userId) => {
    return (
        axiosFun(token).get('/restaurants/search?term=&page=1&limit=30&destination=' + destination + '&user_id=' + userId) // ooredoo
            .then(response => response.data).catch(err => {
            Alert.alert('apiUpdateUserPointError', '' + err);
        })
    )

}