import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Linking,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import Voice from '@react-native-community/voice';
import {launchCamera} from 'react-native-image-picker';
import {actionIcons} from '../Constant/constants';
import {useChat} from '../ChatContext';

const ChatScreen = ({route, navigation}) => {
  const {contactName, chatId} = route.params;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isListening1, setIsListening1] = useState(false);
  const [longPressId, setLongPressId] = useState(null);
  const [editMessageId, setEditMessageId] = useState(null);
  const [editMessageText, setEditMessageText] = useState('');

  const {getMessages, addMessage, updateMessage, deleteMessage} = useChat();

  useEffect(() => {
    Voice.onSpeechStart = () => setIsListening1(true);
    Voice.onSpeechEnd = () => setIsListening1(false);
    Voice.onSpeechResults = e => {
      setMessage(e.value[0]);
    };

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  useEffect(() => {
    setMessages(getMessages(chatId));
  }, [chatId, getMessages]);

  const startListening = async () => {
    try {
      await Voice.start('en-US');
    } catch (error) {
      console.error('Error starting Voice:', error);
      Alert.alert('Error', 'Failed to start voice recognition');
    }
  };

  const stopListening = async () => {
    try {
      await Voice.stop();
      setIsListening1(false);
    } catch (error) {
      console.error('Error stopping Voice:', error);
      Alert.alert('Error', 'Failed to stop voice recognition');
    }
  };

  const handleDocumentPick = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: ['application/*'],
      });
      console.log('Selected Document:', res);
      Alert.alert('Document Selected', `Document: ${res.name}`);
    } catch (err) {
      if (!DocumentPicker.isCancel(err)) {
        Alert.alert('Error', 'An error occurred while selecting the document');
        console.error(err);
      }
    }
  };

  const openCamera = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxWidth: 800,
      maxHeight: 800,
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        Alert.alert('Cancelled', 'Camera action cancelled');
      } else if (response.errorCode) {
        Alert.alert('Error', `Camera error: ${response.errorMessage}`);
      } else {
        console.log('Captured Photo:', response.assets[0]);
        Alert.alert('Photo Captured', 'A photo has been taken.');
      }
    });
  };

  const handleSend = () => {
    if (editMessageId) {
      const updatedMessage = {
        id: editMessageId,
        text: editMessageText,
      };
      updateMessage(chatId, updatedMessage);
      setEditMessageId(null);
      setEditMessageText('');
    } else if (message.trim()) {
      addMessage(chatId, message.trim());
      setMessage('');
    }
    Keyboard.dismiss();
  };

  const handleEdit = id => {
    const messageToEdit = messages.find(msg => msg.id === id);
    if (messageToEdit) {
      setEditMessageId(id);
      setEditMessageText(messageToEdit.text);
    }
    setLongPressId(null);
  };

  const handleDelete = id => {
    deleteMessage(chatId, id);
    setLongPressId(null);
  };

  const handleLookup = text => {
    const url = `https://www.google.com/search?q=${encodeURIComponent(text)}`;
    Linking.openURL(url);
    setLongPressId(null);
  };

  const dismissOptionsMenu = () => {
    setLongPressId(null);
  };

  const renderMessageItem = ({item}) => (
    <TouchableWithoutFeedback
      onLongPress={() => setLongPressId(item.id)}
      onPress={() => longPressId && dismissOptionsMenu()}>
      <View style={styles.messageContainer}>
        <View style={[styles.messageBubble, styles.alignRight]}>
          <Text style={styles.messageText}>{item.text}</Text>
        </View>
        {longPressId === item.id && (
          <View style={styles.optionsMenu}>
            <TouchableOpacity
              onPress={() => handleEdit(item.id)}
              style={styles.optionButton}>
              <Text style={styles.optionText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleDelete(item.id)}
              style={styles.optionButton}>
              <Text style={styles.optionText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleLookup(item.text)}
              style={styles.optionButton}>
              <Text style={styles.optionText}>Lookup</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={dismissOptionsMenu}>
        <View style={styles.container}>
          <View style={styles.topBar}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}>
              <Image source={actionIcons.Back} style={styles.icon} />
            </TouchableOpacity>
            <Text style={styles.contactName}>{contactName}</Text>
            <TouchableOpacity style={styles.optionsButton}>
              <Image source={actionIcons.Menu} style={styles.icon} />
            </TouchableOpacity>
          </View>

          <FlatList
            data={messages}
            renderItem={renderMessageItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.chatArea}
            inverted
          />

          <View style={styles.inputBar}>
            <TouchableOpacity
              onPress={handleDocumentPick}
              style={styles.attachmentButton}>
              <Image source={actionIcons.Attachment} style={styles.icon2} />
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              placeholder="Type a message"
              value={editMessageId ? editMessageText : message}
              onChangeText={text => {
                if (editMessageId) {
                  setEditMessageText(text);
                } else {
                  setMessage(text);
                }
              }}
              onSubmitEditing={handleSend}
              autoFocus={true}
            />
            <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
              <Image source={actionIcons.Send} style={styles.icon2} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={isListening1 ? stopListening : startListening}
              style={styles.micButton}>
              <Image
                source={actionIcons.Mic}
                style={[styles.icon2, isListening1 && styles.activeMicIcon]}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={openCamera} style={styles.cameraButton}>
              <Image source={actionIcons.Camera} style={styles.icon2} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  topBar: {
    paddingTop: 55,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#001f3f',
  },
  backButton: {
    padding: 5,
  },
  optionsButton: {
    padding: 5,
  },
  contactName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: '#fff',
    resizeMode: 'contain',
  },
  icon2: {
    width: 24,
    height: 24,
    tintColor: 'black',
    resizeMode: 'contain',
  },
  chatArea: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  messageContainer: {
    position: 'relative',
    marginVertical: 5,
    maxWidth: '100%',
  },
  messageBubble: {
    backgroundColor: '#007BFF',
    borderRadius: 15,
    padding: 10,
    maxWidth: '100%',
    alignSelf: 'flex-end',
  },
  alignRight: {
    alignSelf: 'flex-end',
  },
  messageText: {
    color: '#fff',
  },
  optionsMenu: {
    position: 'absolute',
    bottom: 30,
    right: 0,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  optionButton: {
    padding: 10,
  },
  optionText: {
    fontSize: 14,
    color: '#007BFF',
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingBottom: 20,
  },
  attachmentButton: {
    padding: 5,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginHorizontal: 5,
  },
  sendButton: {
    padding: 5,
  },
  micButton: {
    padding: 5,
  },
  cameraButton: {
    padding: 5,
  },
  activeMicIcon: {
    tintColor: 'red',
  },
});

export default ChatScreen;
