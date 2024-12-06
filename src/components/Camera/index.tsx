import { useState, useRef } from 'react';
import { Button, Modal, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';

import { StatusBar } from 'expo-status-bar'
import { CameraView, CameraType, useCameraPermissions, useMicrophonePermissions, VideoQuality  } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { onVideoQuality, recordVideo, saveMedia, shareMedia, stopRecordVideo, toggleCameraFacing } from './functions';
import { VideoPlayer } from '../VideoPlayer';

export default function Camera() {
  const [permissionCamera, requestPermissionCamera] = useCameraPermissions();
  const [permissionMicrophone, requestPermissionMicrophone] = useMicrophonePermissions();
  const [permissionMediaLibrary, requestPermissionMediaLibrary] = MediaLibrary.usePermissions();

  const cameraRef = useRef<CameraView>(null);
  const [facing, setFacing] = useState<CameraType>('front');
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [localMedia, setLocalMedia] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [flashlight, setFlashlight] = useState<boolean>(false);
  const [videoQuality, setVideoQuality] = useState<VideoQuality>('720p');

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
        videoQuality={videoQuality}
        enableTorch={flashlight}
      >
        <View style={styles.lateralButtonsContainer}>
          <TouchableOpacity style={styles.lateralButton} onPress={() => setFlashlight(value => !value)}>
            <MaterialIcons name={flashlight ? "flashlight-on" : "flashlight-off"} size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.lateralButton} onPress={() => isRecording ? {} : onVideoQuality(videoQuality, setVideoQuality)}>
            <Text style={styles.lateralTextButton}>{videoQuality}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => isRecording ? {} : toggleCameraFacing(setFacing, setFlashlight)}>
            <MaterialIcons name={facing == 'back' ? "camera-front" : "camera-rear"} size={30} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => !isRecording ? recordVideo(cameraRef, setLocalMedia, setIsRecording) : stopRecordVideo(cameraRef, setIsRecording, setModalVisible) }>
            <MaterialIcons name={isRecording ? 'stop-circle' : 'circle'} size={50} color="#fff" />
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
                <MaterialIcons name="cancel" size={30} color="black" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.sharingVideoButton} onPress={() => saveMedia(localMedia, setModalVisible)}>
                <MaterialIcons name="save-alt" size={30} color="black" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.sharingVideoButton} onPress={() => shareMedia(localMedia)}>
                <MaterialIcons name="share" size={30} color="black" />
              </TouchableOpacity>
            </View>
          </View>
      </Modal>
      <StatusBar style='light' />
    </View>
  );
}