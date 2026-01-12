import React from 'react';
import OurFeatures from './OurFeatures';
import { ContactSection } from './ContactSection';
import Banner from '../Banner/Banner';
import Services from '../Services/Services';
import Categories from '../Categories/Categories';
import HighlightsSection from '../HighlightsSection/HighlightsSection';
import StatisticsSection from '../StatisticsSection/StatisticsSection';
import Testimonials from '../Testimonials/Testimonials';
import BlogsSection from '../fetchBlogs/BlogsSection';
import NewsletterSection from '../NewsletterSection/NewsletterSection';
import FAQ from '../FAQ/FAQ';


const Home = () => {
    return (
        <div>
           <div>
                 <Banner></Banner>
           </div>
            <OurFeatures></OurFeatures>
            <div>
                <Services></Services>
                <Categories></Categories>
                <HighlightsSection></HighlightsSection>
                <StatisticsSection></StatisticsSection>
                <Testimonials></Testimonials>
                <BlogsSection></BlogsSection>
                <NewsletterSection></NewsletterSection>
                <FAQ></FAQ>
            </div>
            <div className='mb-20 mt-20'>
                <ContactSection></ContactSection>
            </div>
        </div>
        
    );
};

export default Home;