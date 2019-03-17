import { db } from '../../config/Firebase';

const updateUser = (user) => {
    return {
        type: 'UPDATE_USER',
        data: user
    }
}

const removeUser = () => {
    return {
        type: 'REMOVE_USER'
    }
}

const updateUserProfile = (fullname, age, email) => {
    return dispatch => {
        db.collection('users').where('email', '==', email)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                //console.log('', doc.id, '=>', doc.data());
                db.collection('users').doc(doc.id).update({ fullname, age }).then(() => {
                    dispatch({
                        type: 'UPDATEUSERPROFILE_USER',
                        data: {id: doc.id, ...doc.data()}
                    });
                });
            })
            
        })
    }
}

export {
    updateUser,
    removeUser,
    updateUserProfile
}