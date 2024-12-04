import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
    },
    camera: {
    flex: 1,    
    },
    buttonContainer: {
        width:'50%',
        position: 'absolute',
        bottom: 50,
        left: '10%',
        flexDirection: 'row',
        backgroundColor: 'transparent',
        justifyContent: 'space-between',
    },
    button: {
        // width: 70,
        // height: 70,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 2,
        borderRadius: 50,
        backgroundColor: '#00000070'
    },
});