import {ZegoUIKitPrebuilt} from '@zegocloud/zego-uikit-prebuilt'

interface LiveStreamProps {
    roomId?: string;
    tutorName:string;
    tutorId:string;
  }
const LiveStream:React.FC<LiveStreamProps> = ({roomId,tutorName,tutorId})=>{
const myMeeting = async(element:HTMLDivElement )=>{
    const appId=562645982;
    const serverSecret='66e52e9f21e684d532b62699c16464e4';
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appId,
        serverSecret,
        roomId||'',
        tutorId,
        tutorName
    )
const zp = ZegoUIKitPrebuilt.create(kitToken);
zp.joinRoom({
  container:element,
  scenario:{
    mode:ZegoUIKitPrebuilt.LiveStreaming
  }
})
}
    return(
       
            <div className='w-full h-full' ref={myMeeting}/>
        
    )
}

 export default LiveStream