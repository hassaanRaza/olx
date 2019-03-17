import { db } from '../../config/Firebase';

const getRoomInfo = (roomId) => {
    return dispatch => {
        db.collection("rooms").doc(roomId).collection('messages').orderBy('createdAt').onSnapshot((snapshot) => {
            var arr = [];
            snapshot.forEach((change) => {
                const obj = { id: change.id, ...change.data() }
                arr.push(obj);
            })



            dispatch({
                type: 'UPDATE_ROOM',
                data: arr
            });

        });
    }
}
export {
    getRoomInfo,
}