import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

class Home extends React.Component {
    state = {
        name: '',
        room: '',
    }
    render() {
        return (
            <View style={styles.container}>
                <TextInput value={this.state.name} placeholder="Name" onChangeText={(name) => this.setState({ name })} />
                <TextInput value={this.state.room} placeholder="Room" style={{ marginTop: 10 }} onChangeText={(room) => this.setState({ room })} />
                <Button mode="contained" style={{ marginTop: 10 }} onPress={() => this.props.navigation.navigate('chat', {
                    room: this.state.room,
                    username: this.state.name,
                })}>
                    Create Chat Room
                </Button>
                <Button mode="contained" onPress={() => this.props.navigation.navigate('chat', {
                    room: this.state.room,
                    username: this.state.name,
                })} style={{ marginTop: 10 }}>
                    Join Chat room
                </Button>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        padding: 10,
    }
});

export default Home;
