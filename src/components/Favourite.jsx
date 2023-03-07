import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { BsBookmarkStar, BsBookmarkStarFill } from "react-icons/bs";
import useBlogCalls from '../hooks/useBlogCalls';

const Favourite = ({currentPost}) => {

    const { currentUserId } = useSelector((state) => state.auth);
    const {favouriteToggle} = useBlogCalls();

    const [fav, setFav] = useState()
   

    return (
        <span onClick={()=>  {favouriteToggle(currentPost?.id)
        setFav(fav === undefined ? !(currentPost?.favourites?.filter(favItem => favItem === currentUserId) > 0) : !fav)
        }
        } className='float-end'>
            {fav !== undefined ? fav === true ? (<BsBookmarkStarFill/>) : (<BsBookmarkStar/>) : currentPost?.favourites?.filter(favItem => favItem === currentUserId) > 0 ? (<BsBookmarkStarFill/>) : (<BsBookmarkStar/>)}
            </span>
      )
    }
    
    export default Favourite



