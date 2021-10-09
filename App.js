// import React, {useState, useEffect} from 'react';
// import {View, Text, TextInput, Button} from 'react-native';
// import firestore from '@react-native-firebase/firestore';

// const App = () => {
//   const [item, setItem] = useState('');
//   const [itemArray, setItemArray] = useState([]);

//   useEffect(() => {
//     const effect = firestore()
//       .collection('Users')
//       .onSnapshot(snap => {
//         const i = snap.docs.map(item => {
//           return {...item.data(), id: item.id};
//         });
//         setItemArray(i);
//       });

//       return ()=>effect;
//   }, []);

//   const onChangeHandler = text => {
//     setItem(text);
//   };

//   const addItem = () => {
//     firestore()
//       .collection('Users')
//       .add({
//         item: item,
//       })
//       .then(res => {
//         console.log('data saved succesfully', res);
//       });
//     setItem('');
//   };

//   const onDeleteHandler = id => {
//     firestore()
//       .collection('Users')
//       .doc(id)
//       .delete()
//       .then(() => {
//         console.log('User deleted!');
//       })
//       .catch(err => console.log(err));
//   };

//   const onUpdateHandler = (id) =>{
//     firestore()
//     .collection('Users')
//     .doc(id)
//     .update({
//       item:'shishupal singh'
//     })
//     .then(() => {
//       console.log('User updated!');
//     });
//   }

//   return (
//     <View>
//       <TextInput
//         value={item}
//         style={{borderColor: '#000', borderWidth: 1}}
//         onChangeText={onChangeHandler}
//       />
//       <Button title="Add" color="green" onPress={addItem} />
//       <Text>Items Are Shown Below : </Text>
//       {itemArray &&
//         itemArray.map(q => {
//           return (
//             <View key={q.id}>
//               <Text>{q.item}</Text>
//               <Button
//                 title="delete"
//                 color="red"
//                 onPress={() => onDeleteHandler(q.id)}
//               />
//               <Button
//                 title="Update"
//                 color="blue"
//                 onPress={() => onUpdateHandler(q.id)}
//               />
//             </View>
//           );
//         })}
//     </View>
//   );
// };

// export default App;

// Authentication comes over here

import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-crop-picker';



const App = () => {
  const [data, setData] = useState({name: '', email: ''});

  const onSubmitHandler = (name,email) => {
    console.log(name, email)
    // auth
    auth()
      .createUserWithEmailAndPassword(
       email, name
      )
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });

    setData({name: '', email: ''});
  };


  const imageSelectHandler = () =>{
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(async image => {
      try {
        const fileName = image.path.substring(image.path.lastIndexOf('/')+1);
      await storage().ref(`photos/${fileName}`).putFile(image.path);
      alert('image uploaded sucessfully')
      } catch (error) {
        console.log(error)
      }
    })
    
  };

  return (
    <View>
      <TextInput
        value={data.name}
        placeholder="Enter Name"
        style={{borderColor: '#000', borderWidth: 1}}
        onChangeText={text => setData({...data, name: text})}
      />
      <TextInput
        value={data.email}
        placeholder="Enter Email"
        style={{borderColor: '#000', borderWidth: 1}}
        onChangeText={text => setData({...data, email: text})}
      />
      <Button title="submit" color="green" onPress={()=>onSubmitHandler(data.name, data.email)} />
      <Button title = "add picture" color = 'tomato' onPress={imageSelectHandler}/>
    </View>
  );
};

export default App;
