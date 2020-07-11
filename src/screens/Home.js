import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

class Home extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Button mode="contained" onPress={() => this.props.navigation.navigate('chat')}>
                    Create Chat Room
                </Button>
                <Button mode="contained" onPress={() => console.log('join')} style={{ marginTop: 10 }}>
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
