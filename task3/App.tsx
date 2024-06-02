import React, { useState } from "react";
import { View, Text, TextInput, Image, Button, ScrollView, FlatList, StyleSheet } from "react-native";

const MyApp: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [items, setItems] = useState<string[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleAddItem = () => {
    if(inputText.trim() !== '') {
      if(editingIndex !== null) {
        const updatedItems = [...items];
        updatedItems[editingIndex] = inputText.trim();
        setItems(updatedItems);
        setEditingIndex(null);
      } else {
        setItems([...items, inputText.trim()]);
      }
      setInputText('');
    }
  };

  const handleDeleteItem = (index: number) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const handleEditItem = (index: number) => {
    setInputText(items[index]);
    setEditingIndex(index);
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.section}>
          <Text style={styles.title}>Notes</Text>
          <Image source={require('./notes.png')} style={styles.image} />
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Add or Edit an Item</Text>
          <View style={styles.inputContainer}>
            <TextInput style={styles.input} value={inputText} onChangeText={setInputText} placeholder="Enter an item" />
            <Button title={editingIndex !== null ? 'Save' : 'Add'} onPress={handleAddItem} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Your Items</Text>
          <FlatList data={items} keyExtractor={(item, index) => index.toString()} renderItem={({ item, index }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemText}>{item}</Text>
              <View style={styles.buttonContainer}>
                <Button title="Edit" onPress={() => handleEditItem(index)} />
                <Button title="Delete" onPress={() => handleDeleteItem(index)} />
              </View>
            </View>
          )} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  section: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  image: {
    width: '50%',
    height: 150,
    borderRadius: 8,
    padding: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    height: 40,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 8,
  },
  itemContainer: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 4,
    marginBottom: 8,
  },
  itemText: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  button: {
    marginLeft: 8,
  },
});

export default MyApp;