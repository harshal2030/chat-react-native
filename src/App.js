import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

class App extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Button mode="contained" onPress={() => console.log('preese')}>
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

export default App;
