import { useState, useRef } from 'react';
import { Button, Modal, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';

import { StatusBar } from 'expo-status-bar'
import { CameraView, CameraType, useCameraPermissions, useMicrophonePermissions,  } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { recordVideo, stopRecordVideo, toggleCameraFacing } from './functions';
import { VideoPlayer } from '../VideoPlayer';

export default function Camera() {
  const cameraRef = useRef<CameraView>(null);
  const [facing, setFacing] = useState<CameraType>('back');
  const [permissionCamera, requestPermissionCamera] = useCameraPermissions();
  const [permissionMicrophone, requestPermissionMicrophone] = useMicrophonePermissions();
  const [permissionMediaLibrary, requestPermissionMediaLibrary] = MediaLibrary.usePermissions();
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [localMedia, setLocalMedia] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  if (!permissionCamera || !permissionMicrophone || !permissionMediaLibrary) {
    return <View />;
  }

  if (!permissionCamera.granted || !permissionMicrophone.granted || !permissionMediaLibrary.granted ) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera, Microphone and Media Library</Text>
        <Button onPress={async () => {requestPermissionCamera(); requestPermissionMicrophone(); await requestPermissionMediaLibrary() }} title="grant permission" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView 
        style={styles.camera} 
        facing={facing} 
        ref={cameraRef} 
        mode='video' 
        ratio='16:9'
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => {
            if(!isRecording){
              toggleCameraFacing(setFacing);
            }
          }}>
            <MaterialIcons name="camera-front" size={30} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => {
            if(!isRecording){
              recordVideo(cameraRef, setLocalMedia, setIsRecording);
            }else{
              stopRecordVideo(cameraRef, setIsRecording);
              setModalVisible(true);
            }
          }}>
            <MaterialIcons name={isRecording ? 'stop-circle' : 'camera'} size={50} color="#fff" />
          </TouchableOpacity>
        </View>
      </CameraView>
      <Modal 
        visible={modalVisible}
        animationType='slide'
      >
          <View style={styles.sharingVideoContainer}>
              {localMedia && <VideoPlayer uri={localMedia} />}
            <View style={styles.sharingVideoButtonsContainer}>
              <TouchableOpacity style={styles.sharingVideoButton} onPress={() => setModalVisible(false)}>
                <Text>Sair</Text>
              </TouchableOpacity>
            </View>
          </View>
      </Modal>
      <StatusBar style='light' />
    </View>
  );
}