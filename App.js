import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const App = () => {
  const [item, setItem] = useState('');
  const [itemArray, setItemArray] = useState([]);

  useEffect(() => {
    firestore()
      .collection('Users')
      .onSnapshot(snap => {
        const i = snap.docs.map(item => {
          return {...item.data(), id: item.id};
        });
        setItemArray(i);
      });
  }, []);

  const onChangeHandler = text => {
    setItem(text);
  };

  const addItem = () => {
    firestore()
      .collection('Users')
      .add({
        item: item,
      })
      .then(res => {
        console.log('data saved succesfully', res);
      });
    setItem('');
  };

  const onDeleteHandler = id => {
    firestore()
      .collection('Users')
      .doc(id)
      .delete()
      .then(() => {
        console.log('User deleted!');
      })
      .catch(err => console.log(err));
  };

  const onUpdateHandler = (id) =>{
    firestore()
    .collection('Users')
    .doc(id)
    .update({
      item:'shishupal singh'
    })
    .then(() => {
      console.log('User updated!');
    });
  }

  return (
    <View>
      <TextInput
        value={item}
        style={{borderColor: '#000', borderWidth: 1}}
        onChangeText={onChangeHandler}
      />
      <Button title="Add" color="green" onPress={addItem} />
      <Text>Items Are Shown Below : </Text>
      {itemArray &&
        itemArray.map(q => {
          return (
            <View key={q.id}>
              <Text>{q.item}</Text>
              <Button
                title="delete"
                color="red"
                onPress={() => onDeleteHandler(q.id)}
              />
              <Button
                title="Update"
                color="blue"
                onPress={() => onUpdateHandler(q.id)}
              />
            </View>
          );
        })}
    </View>
  );
};

export default App;
