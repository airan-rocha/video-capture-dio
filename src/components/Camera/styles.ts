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
    lateralButtonsContainer: {
        position: 'absolute',
        top: '30%',
        right: 20,
    },
    lateralButton: {
        marginTop: 10,
        padding: 5,
        borderRadius: 50,
        backgroundColor: '#00000070',
        alignItems: 'center'
    },
    lateralTextButton: {
        color: '#fff',
        fontSize: 9,
    },
    buttonContainer: {
        width:'50%',
        position: 'absolute',
        bottom: 90,
        left: '10%',
        flexDirection: 'row',
        backgroundColor: 'transparent',
        justifyContent: 'space-between',
    },
    button: {
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 2,
        borderRadius: 50,
        backgroundColor: '#00000070',
    },
    sharingVideoContainer: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: 'center',
    },
    sharingVideoButtonsContainer: {
        flexDirection: 'row',
    },
    sharingVideoButton: {
        margin: 15,
    }
});