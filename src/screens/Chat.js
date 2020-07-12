import * as React from 'react';
import { Text } from 'react-native';
import { GiftedChat, Send } from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';


const RenderSend = (props) => {
    return (
        <Send {...props}>
            <Text></Text>
        </Send>
    )
}

const Chat = (props) => {
    const [messages, setMessages] = React.useState([]);
    const [text, setText] = React.useState('');
    const user = firestore().collection(props.route.params.room);
    const name = props.route.params.username;
    
    const onError = (error) => {
        console.log(error);
    }

    React.useEffect(() => {
        user.doc('msg').set({
            name: '',
            text: '',
        })

        user.get().then(snap => snap.docs.forEach(e => {
            if (e.id !== 'msg') {
                const data = e.data();
                data.createdAt = data.createdAt.toDate();
                data.user._id = data.user.name === name ? 1 : 2;
                setMessages(previousMessages => GiftedChat.append(previousMessages, [data]))
            }
        }));

        const subscribe = user.onSnapshot((snap) => {
            snap.docChanges().forEach(sn => {
                const data = sn.doc.data();

                if (sn.doc.id !== 'msg') {
                    if (data.user.name !== name) {
                        data.createdAt = data.createdAt.toDate();
                        data.user._id = 2;
                        setMessages(previousMessages => GiftedChat.append(previousMessages, [data]));
                    }
                }
            })
        }, onError);
        
        const sub2 = user.doc('msg').onSnapshot(en => {
            if (en.exists) {
                const data = en.data();
                if (data.name !== name) {
                    setText(data.text);
                }
            }
        })

        return () => (subscribe, sub2);
    }, [])

    const onSend = React.useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
        user.add(messages[0]);
    }, [])

    return (
        <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
            _id: 1,
            name,
        }}
        maxComposerHeight={200}
        scrollToBottom={true}
        renderChatFooter={() => {
            return (
                <Text style={{color: 'grey', marginLeft: 10}}>{text.length === 0 ? 'What user types appear here.' : text}</Text>
            )
        }}
        onInputTextChanged={(msg) => user.doc('msg').update({
            name: name,
            text: msg
        }).then(() => undefined).catch(() => user.doc('msg').set({
            name: name,
            text: msg,
        }))}
        />
    )
}

export default Chat;
