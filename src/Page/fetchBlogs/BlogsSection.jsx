import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';

const fetchBlogs = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: 'The Lifesaving Impact of Regular Blood Donation',
          description: 'Discover how donating blood every few months can save lives and improve your health.',
          image: 'https://i.ibb.co.com/9kFn84WT/e05daf3aa97e74f3b93db1e3663372de.jpg', // your real images
          date: 'January 5, 2026',
          author: 'Dr. Elena Rossi',
        },
        {
          id: 2,
          title: 'Myths and Facts About Blood Donation',
          description: 'Busting common myths to encourage more people to donate and join the cause.',
          image: 'https://i.ibb.co.com/QFFhFGT1/b11021d51b86417773ad28daffe5b23c.jpg',
          date: 'December 20, 2025',
          author: 'Health Team',
        },
        {
          id: 3,
          title: 'Success Stories: How Your Donation Changed Lives',
          description: 'Real stories from recipients who survived thanks to generous donors like you.',
          image: 'https://i.ibb.co.com/PfvnXLG/64ad4ae07fe1808b076b1f275e097a53.jpg',
          date: 'November 15, 2025',
          author: 'Contributors (Cm)',
        },
        {
          id: 4,
          title: 'Preparing for Your First Blood Donation',
          description: 'A step-by-step guide to make your first donation smooth and stress-free.',
          image: 'https://i.ibb.co.com/PGgX8Ysy/1767160979553.jpg',
          date: 'October 10, 2025',
          author: 'Nurse Maria Lopez',
        },
      ]);
    }, 1200);
  });
};

const BlogsSection = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs().then((data) => {
      setBlogs(data);
      setLoading(false);
    });
  }, []);

  return (
    <section className=" bg-white ">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold   mb-4">
            Latest Blogs & Insights
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-600 max-w-2xl mx-auto">
            Stay informed about blood donation, health benefits, success stories and life-saving tips.
          </p>
        </div>

        {/* Blogs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {loading ? (
            // Skeleton Loader
            [...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-100 dark:bg-gray-900 rounded-xl h-96 animate-pulse"
              />
            ))
          ) : (
            blogs.map((blog) => (
              <article
                key={blog.id}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden group cursor-pointer
                           transform transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl border border-gray-100 dark:border-gray-800"
              >
                <div className="overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-black dark:text-white mb-3 line-clamp-2">
                    {blog.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                    {blog.description}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-500 mb-5">
                    <span>{blog.date}</span>
                    <span className="font-medium">{blog.author}</span>
                  </div>

                  <a
                    href={`/blog/${blog.id}`}
                    className="inline-block w-full text-center bg-red-600 text-white font-semibold py-3 rounded-lg
                               hover:bg-red-700 transition-all duration-300"
                  >
                    Read More
                  </a>
                </div>
              </article>
            ))
          )}
        </div>

        {/* View All Button */}
        <div className="text-center mt-16">
          <Link 
            to={"/allBlogs"}
            href="/blogs"
            className="inline-flex items-center px-10 py-4 bg-red-500  text-white  
                       font-bold text-lg rounded-full hover:scale-105 transition-all duration-300 shadow-xl"
          >
            View All Blogs
            <svg className="ml-3 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogsSection;