import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt'

interface LiveStreamProps {
  roomId?: string;
  tutorName: string;
  tutorId: string;
}
const LiveStream: React.FC<LiveStreamProps> = ({ roomId, tutorName, tutorId }) => {
  const myMeeting = async (element: HTMLDivElement) => {
    const appId = Number(import.meta.env.VITE_APP_ID); 
    const serverSecret = import.meta.env.VITE_SERVER_SECRET; 
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appId,
      serverSecret,
      roomId || '',
      tutorId,
      tutorName
    )
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.LiveStreaming
      }
    })
  }
  return (
    <div className='w-full h-full' ref={myMeeting} />
  )
}

export default LiveStream