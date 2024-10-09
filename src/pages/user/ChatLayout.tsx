import CourseDiscussion from "../../components/user/chat/CourseDiscussion"
import CourseList from "../../components/user/chat/CourseList"
import UserNavbar from "../../components/user/UserNavbar"

const ChatLayout:React.FC=()=>{
    return(
        <>
        <UserNavbar/>
         <div className="flex">
        <CourseList/>
        <CourseDiscussion/>
        </div>
        </>
       
    )
}

export default ChatLayout