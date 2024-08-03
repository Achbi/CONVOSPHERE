import SearchInput from './searchinput'; 
import Conversations from './conversations';
const Sidebar =() =>{
    return(
        <div>
            <SearchInput></SearchInput>
            <div className="divider px-3"></div>
            <Conversations></Conversations>
        </div>
   
    )
}
export default Sidebar