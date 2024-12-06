import { CameraType, CameraView, VideoQuality } from 'expo-camera';
import * as Sharing from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';

export function toggleCameraFacing(setFacing: React.Dispatch<React.SetStateAction<CameraType>>, setFlashlight?: React.Dispatch<React.SetStateAction<boolean>>) {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
    if(setFlashlight){
      setFlashlight(false);
    }
}

export async function recordVideo(cameraRef: React.RefObject<CameraView>, setLocalMedia: React.Dispatch<React.SetStateAction<string | null>>, setIsRecording: React.Dispatch<React.SetStateAction<boolean>>) {
    if(cameraRef.current){
      console.log('recording video');
      try{
        setIsRecording(true);
        const video = await cameraRef.current.recordAsync();
        
        if(video){
          setLocalMedia(video.uri);
          console.log("Video: ", video);
        }
        
      }catch (e) {
        console.log('error: ', e);
      }
    }
}

export async function stopRecordVideo(cameraRef: React.RefObject<CameraView>, setIsRecording: React.Dispatch<React.SetStateAction<boolean>>, setModalVisible: React.Dispatch<React.SetStateAction<boolean>>) {
    if(cameraRef.current){
        setIsRecording(false);
        console.log('stop recording video');
        await cameraRef.current.stopRecording();
        setModalVisible(true);
    }
}

export async function saveMedia(localMedia: string | null, setModalVisible: React.Dispatch<React.SetStateAction<boolean>>) {
  if(localMedia){
    await MediaLibrary.saveToLibraryAsync(localMedia);
    setModalVisible(false);
  }
}

export async function shareMedia(localMedia: string | null, setModalVisible?: React.Dispatch<React.SetStateAction<boolean>>) {
  if(localMedia){
    await Sharing.shareAsync(localMedia);

    if(setModalVisible){
      setModalVisible(false);
    }
  }
}

export function onVideoQuality(videoQuality: VideoQuality, setVideoQuality: React.Dispatch<React.SetStateAction<VideoQuality>>) {
  switch (videoQuality) {
    case '480p':
      setVideoQuality('720p');
      break;
    case '720p':
      setVideoQuality('1080p');
      break;
    default:
      setVideoQuality('480p');
      break;
  }
}