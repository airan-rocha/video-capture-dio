import { CameraType, CameraView } from 'expo-camera';

export function toggleCameraFacing(setFacing: React.Dispatch<React.SetStateAction<CameraType>>) {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
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

export async function stopRecordVideo(cameraRef: React.RefObject<CameraView>, setIsRecording: React.Dispatch<React.SetStateAction<boolean>>) {
    if(cameraRef.current){
        setIsRecording(false);
        console.log('stop recording video');
        await cameraRef.current.stopRecording();
        
    }
}
