import { TextInput } from 'flowbite-react';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { signoutSuccess } from '../redux/user/userSlice';


export default function DashProfile() {
    const { currentUser, error, loading } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    //const [showModal, setShowModal] = useState(false);

    const handleSignout = async () => {
        try {
            const res = await fetch('/api/user/signout', {
                method: 'POST',
            });
            const data = await res.json();
            if (!res.ok) {
                console.log(data.message);
            } else {
                dispatch(signoutSuccess());
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className='max-w-lg mx-auto p-3 w-full'>
            <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
            <form className='flex flex-col gap-4'>
                <div className='w-36 h-36 self-center shadow-xl overflow-hidden rounded-full'>
                    <img src={currentUser.profilePicture}
                        alt='user'
                        className='rounded-full w-full h-full object-cover border-8 border-[#1fe7cd]' />
                </div>
                <div className='text-center p-4 m-4'>
                    <p className='font-bold p-2'>Username : <span className='font-semibold text-gray-700'>{currentUser.username}</span></p>
                    <p className='font-bold p-2'>Email : <span className='font-semibold text-gray-700'>{currentUser.email}</span></p>
                </div>
            </form>
            <div className='text-red-500 flex justify-center mt-5'>
                {/* <span className='cursor-pointer'>Delete Account</span> */}
                <span className='cursor-pointer'
                    onClick={handleSignout}>Sign Out</span>
            </div>
        </div>
    )
}


// image upload firebase
// rules_version = '2';

// // Craft rules based on data in your Firestore database
// // allow write: if firestore.get(
// //    /databases/(default)/documents/users/$(request.auth.uid)).data.isAdmin;
// service firebase.storage {
//   match /b/{bucket}/o {
//     match /{allPaths=**} {
//       allow read;
//       allow write: if
//       request.resource.size < 2 * 1024 * 1024 &&
//       request.resource.contentType.matches('image/.*')
//     }
//   }
// }
