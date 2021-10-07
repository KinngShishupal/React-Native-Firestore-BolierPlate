import React, {useState} from 'react'
import { View, Text, TextInput, Button } from 'react-native';
import firestore from '@react-native-firebase/firestore';


const App = () => { 
  const [item, setItem] = useState('');

  const onChangeHandler = (text) =>{
    setItem(text)
  };

  const addItem = ()=>{
    console.log(item);
    firestore()
  .collection('Users')
  .doc('apple')
  .set({
    item:item,
  })
  .then(() => {
    console.log('Item added!');
  });
    setItem('')
  }
  return (
    <View>
      <TextInput value={item} style={{borderColor:'#000', borderWidth:1}} onChangeText={onChangeHandler}/>
      <Button title='Add' color='green' onPress={addItem}/>
    </View>
  )
}

export default App
