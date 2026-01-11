import { useEffect, useState } from "react";


const fetchBlogs = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: 'The Lifesaving Impact of Regular Blood Donation',
          description: 'Discover how donating blood every few months can save lives and improve your health.',
          image: 'https://i.ibb.co.com/9kFn84WT/e05daf3aa97e74f3b93db1e3663372de.jpg',
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
        {
          id: 5,
          title: 'The Science Behind Blood Types',
          description: 'Understanding A, B, AB, and O: Why matching blood types is crucial for survival.',
          image: 'https://i.ibb.co.com/3Yz7yXY9/5e87a17349f0fea40f3db51d702ebffb.jpg',
          date: 'February 1, 2026',
          author: 'Dr. Sarah Jenkins',
        },
        {
          id: 6,
          title: 'Nutrition Tips for Post-Donation Recovery',
          description: 'What to eat and drink after donating blood to replenish your energy quickly.',
          image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80',
          date: 'February 10, 2026',
          author: 'Nutritionist Ahmed Ali',
        },
        {
          id: 7,
          title: 'Rare Blood Types: The Golden Need',
          description: 'Exploring the world of rare blood types like Rh-null and why they are so valuable.',
          image: 'https://i.ibb.co.com/NXMBfP1/915e0dbf15bcb21edd184251627cdb47.jpg',
          date: 'February 15, 2026',
          author: 'Lab Expert Kevin Tan',
        },
        {
          id: 8,
          title: 'The Role of Technology in Blood Banking',
          description: 'How modern software and apps are making blood donation more efficient.',
          image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80',
          date: 'February 20, 2026',
          author: 'Tech Innovations',
        },
        {
          id: 9,
          title: 'Blood Donation in Emergency Situations',
          description: 'The critical role of voluntary donors during natural disasters and accidents.',
          image: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=800&q=80',
          date: 'March 01, 2026',
          author: 'Red Cross Team',
        },
        {
          id: 10,
          title: 'Why Platelet Donation is Different',
          description: 'Learn how platelet donation helps cancer patients and how it differs from whole blood.',
          image: 'https://i.ibb.co.com/Jbmsqdp/bf2fbeca3acbd032e22e3e216c79de15.jpg',
          date: 'March 05, 2026',
          author: 'Oncology Research',
        },
        {
          id: 11,
          title: 'History of Blood Transfusion',
          description: 'From ancient theories to modern medicine: A journey through time.',
          image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80',
          date: 'March 12, 2026',
          author: 'Historian John Doe',
        },
        {
          id: 12,
          title: 'Community Blood Drives: How to Organize',
          description: 'A guide for leaders looking to host successful blood donation camps in their area.',
          image: 'https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=800&q=80',
          date: 'March 20, 2026',
          author: 'Community Outreach',
        },
        {
          id: 13,
          title: 'Can You Donate After Getting a Tattoo?',
          description: 'Clearing up the confusion about tattoos, piercings, and donation eligibility.',
          image: 'https://images.unsplash.com/photo-1598331668826-20cecc596b86?auto=format&fit=crop&w=800&q=80',
          date: 'April 02, 2026',
          author: 'Dr. Lisa Ray',
        },
        {
          id: 14,
          title: 'The Health Benefits of Iron Screening',
          description: 'How checking your hemoglobin before donation helps monitor your own health.',
          image: 'https://i.ibb.co.com/N2ZyBw18/6c99aacad2cd7df4aa0e3fe36d274b84.jpg',
          date: 'April 08, 2026',
          author: 'Pathology Lab',
        },
        {
          id: 15,
          title: 'Donating Blood for Your Own Surgery',
          description: 'What is Autologous donation and when is it recommended for patients?',
          image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
          date: 'April 15, 2026',
          author: 'Surgical Team',
        },
        {
          id: 16,
          title: 'Global Trends in Blood Donation 2026',
          description: 'How the world is coming together to ensure safe blood for everyone.',
          image: 'https://i.ibb.co.com/QRbM4vR/89b03d9a331274979b435456698d44d1.jpg',
          date: 'April 22, 2026',
          author: 'Global Health Org',
        },
      ]);
    }, 1200);
  });
};

const AllBlogsSection = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs().then((data) => {
      setBlogs(data);
      setLoading(false);
    });
  }, []);

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            All Blogs & Insights
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-600 max-w-2xl mx-auto">
            Stay informed about blood donation, health benefits, success stories and life-saving tips.
          </p>
        </div>

        {/* Blogs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {loading ? (
            // Skeleton Loader
            [...Array(8)].map((_, i) => (
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
                           transform transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl border border-gray-100 dark:border-gray-800 flex flex-col h-full"
              >
                <div className="overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-black dark:text-white mb-3 line-clamp-2">
                    {blog.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3 flex-grow">
                    {blog.description}
                  </p>

                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500 mb-5">
                    <span>{blog.date}</span>
                    <span className="font-medium">{blog.author}</span>
                  </div>

                  <a
                    href={`/blog/${blog.id}`}
                    className="inline-block w-full text-center bg-red-600 text-white font-semibold py-3 rounded-lg
                               hover:bg-red-700 transition-all duration-300 mt-auto"
                  >
                    Read More
                  </a>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default AllBlogsSection;