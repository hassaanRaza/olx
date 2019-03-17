import { db } from '../../config/Firebase';

const getAds = (limit) => {
    return dispatch => {
        db.collection("ads").orderBy('createdAt', 'desc').limit(limit).onSnapshot((snapshot) => {
            var arr = [];

            //console.log("realtime update...");
            snapshot.forEach((change) => {
                const obj = { id: change.id, ...change.data() }
                arr.push(obj);
            });
            dispatch({
                type: 'UPDATE_ADS',
                data: arr
            });
            //console.log(arr);
        });
    }
}

const searchByTitle = (e) => {
    return dispatch => {
        var mySearchArr = [];
        const start = e.target.value;
        const end = start + '\uf8ff';

        //console.log(start, end);
        db.collection('ads').orderBy('title')
            .startAt(start)
            .endAt(end)
            .get().then(doc => {
                doc.forEach(res => {

                    const obj = { id: res.id, ...res.data() }
                    mySearchArr.push(obj);

                });
                dispatch({
                    type: 'SEARCHWITHTITLE_ADS',
                    data: mySearchArr
                });
            });
    }
}

const filterByCategory = (category) => {
    return dispatch => {
        var mySearchArr = [];
        var myAds = db.collection("ads");
        let query = "";
        if(category == "0"){
            query = myAds;
        }
        else{
            query = myAds.where("category", "==", category);
        }
        query.get().then(doc => {
            doc.forEach(res => {
                    mySearchArr.push({id: res.id, ...res.data()});
            });
            dispatch({
                type: 'FILTERBYCATEGORY_ADS',
                data: mySearchArr
            });
        });
    }
}

const sortByOrder = (type) => {
    return dispatch => {
        var mySearchArr = [];
        var myAds = db.collection("ads");
        let query = "";
        if (type == "Oldest") {
            query = myAds.orderBy('createdAt', 'asc');
        }
        else {
            query = myAds.orderBy('createdAt', 'desc');
        }
        query.get().then(doc => {
            doc.forEach(res => {
                    mySearchArr.push({id: res.id, ...res.data()});
            });
            dispatch({
                type: 'SORTBYORDER_ADS',
                data: mySearchArr
            });
        });
    }
}

export {
    getAds, searchByTitle, filterByCategory, sortByOrder
}