import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {pickContact} from 'react-native-contact-pick';
import {actionIcons} from '../Constant/constants';
import {useNavigation} from '@react-navigation/native';
import {useChat} from '../ChatContext';
import {SwipeListView} from 'react-native-swipe-list-view';

const MessageScreen = () => {
  const navigation = useNavigation();
  const {chats, addChat, pinChat, deleteChat} = useChat();

  useEffect(() => {
    // Any setup or data fetching if necessary
  }, []);

  const handleNewChat = async () => {
    try {
      const contact = await pickContact();
      if (contact) {
        const contactName =
          contact.fullName ||
          (contact.phoneNumbers && contact.phoneNumbers[0]?.number) ||
          'Unknown Contact';

        addChat(contactName);
        navigation.navigate('Chat', {contactName});
      } else {
        Alert.alert('No Contact Selected', 'Please select a contact.');
      }
    } catch (error) {
      console.error('Error picking contact:', error);
    }
  };

  const handlePin = chatId => {
    pinChat(chatId);
  };

  const handleDelete = chatId => {
    deleteChat(chatId);
  };

  const renderChatItem = ({item}) => (
    <View style={styles.chatItemContainer}>
      <TouchableOpacity
        style={styles.chatItem}
        onPress={() =>
          navigation.navigate('Chat', {
            contactName: item.contactName,
            chatId: item.id,
          })
        }>
        <View style={styles.chatContent}>
          <Text style={styles.chatText}>{item.contactName}</Text>
          <Text style={styles.lastMessage}>{item.lastMessage}</Text>
        </View>
        <Text style={styles.lastMessageTime}>{item.lastMessageTime}</Text>
      </TouchableOpacity>
    </View>
  );

  const renderHiddenItem = ({item}) => (
    <View style={styles.hiddenContainer}>
      <TouchableOpacity
        style={[styles.actionButton, styles.pinButton]}
        onPress={() => handlePin(item.id)}>
        <Image source={actionIcons.PinIcon} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.actionButton, styles.deleteButton]}
        onPress={() => handleDelete(item.id)}>
        <Image source={actionIcons.DeleteIcon} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {chats.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.text}>No Messages Here!</Text>
          <Text style={styles.text2}>Start a New Chat</Text>
        </View>
      ) : (
        <SwipeListView
          data={chats}
          renderItem={renderChatItem}
          renderHiddenItem={renderHiddenItem}
          rightOpenValue={-160}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.chatList}
        />
      )}

      <TouchableOpacity style={styles.newChatButton} onPress={handleNewChat}>
        <Image source={actionIcons.NewMessage} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  chatList: {
    padding: 10,
  },
  chatItemContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 10,
    overflow: 'hidden',
  },
  chatItem: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chatContent: {
    flex: 1,
  },
  chatText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  lastMessage: {
    fontSize: 14,
    color: '#666',
  },
  lastMessageTime: {
    fontSize: 12,
    color: '#999',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
  text2: {
    paddingTop: 10,
    fontSize: 15,
  },
  newChatButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: '#fff',
    resizeMode: 'contain',
  },
  hiddenContainer: {
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
    width: 150,
    height: 65,
    position: 'absolute',
    right: 0,
    top: 0,
    padding: 3,
  },
  actionButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 75,
    height: '100%',
  },
  pinButton: {
    backgroundColor: 'royalblue',
    borderRadius: 8,
    marginRight: 2,
  },
  deleteButton: {
    borderRadius: 8,
    backgroundColor: 'red',
  },
});

export default MessageScreen;
