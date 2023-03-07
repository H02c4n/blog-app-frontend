import React from 'react'
import { useSelector } from 'react-redux'
import BlogCard from '../components/blog-card/BlogCard'
import BlogCategories from '../components/BlogCategories'
import PopularPosts from '../components/PopularPosts'

const Dashboard = () => {

  const { posts } = useSelector((state) => state.blog);

  return (
    <div>
      <div id="container_header" className="container">

      </div>
      <div className="primary-container-group">
        <div className="primary-container pt-4">

          <div className="container">
            {/* === END HEADER === */}
            {/* === BEGIN CONTENT === */}
            <div className="row margin-vert-30">
              {/* Main Column */}
              <div className="col-md-9">
                {/* Blog Post */}

                <BlogCard />

                {/* End Blog Item */}

              </div>
              {/* End Main Column */}

              <div className="col-md-3 mt-3">

                {posts?.length > 0 &&
                  <>
                    <BlogCategories />

                    <PopularPosts />
                  </>
                }

              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  )
}

export default Dashboard