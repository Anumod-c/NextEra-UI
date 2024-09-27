import Payouts from '../../components/tutor/Payouts'
import TutorSidebar from '../../components/tutor/TutorSidebar'
import TutorNavbar from '../../components/tutor/TutorNavbar'
import TutorHeader from '../../components/tutor/TutorHeader'
import Footer from './Footer'

function PayoutListPage() {
  return (
    <div>
         <TutorNavbar />
    <TutorHeader />
    <div className="flex mt-4 pt-4">
      <TutorSidebar  />
      <div className="flex-grow bg-white-100 mt-4 p-4">
        <Payouts/>
      </div>
    </div>
    <Footer />
    </div>
  )
}

export default PayoutListPage
