import SearchInput from './searchinput'; 
import Conversations from './conversations';
import LogOutButton from './logoutbutton';
const Sidebar =() =>{
    return(
        <div>
            <SearchInput></SearchInput>
            <div className="divider px-3"></div>
            <Conversations></Conversations>
            <LogOutButton></LogOutButton>
        </div>
   
    )
}
export default Sidebar