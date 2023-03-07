import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import useBlogCalls from "../hooks/useBlogCalls";
import {AiFillTag} from 'react-icons/ai';


const BlogCategories = () => {
    const { getCategories, updateCategory, getPosts } = useBlogCalls();
    const {currentUserId} = useSelector((state) => state.auth);
    const { categories, themes } = useSelector((state) => state.blog);


    useEffect(() => {
        getCategories();
    }, [])


    const customStyle = {
    }
  
    themes?.forEach(theme => {
      if (theme.theme_owner_id === currentUserId) {
        customStyle.first_color = theme?.first_color;
      customStyle.second_color = theme?.second_color;
      customStyle.font_color = theme?.font_color;
      customStyle.font_size = theme?.font_size;
      }
    });


    return (
        <div className="blog-tags">
            <h3>Categories</h3>
            <span onClick={() => getPosts()} role="button" className='all-cat d-block text-center text-white mt-1' style={{backgroundColor:customStyle.second_color }}>ALL</span>
            <ul className="blog-tags">
                {categories?.filter(category => category?.published_post_count > 0).map((category) => {
                    return (
                        <li key={category?.id}>
                            <span role="button" onClick={() => updateCategory(category?.id)} className='blog-tag' style={{backgroundColor:customStyle.second_color }}>
                                <AiFillTag style={{fontSize:"12px"}} /> {category?.name} </span>
                                

                        </li>
                    )
                })}

            </ul>
        </div>
    )
}

export default BlogCategories