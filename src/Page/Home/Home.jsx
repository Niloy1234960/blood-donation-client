import React from 'react';
import OurFeatures from './OurFeatures';
import { ContactSection } from './ContactSection';
import Banner from '../Banner/Banner';

const Home = () => {
    return (
        <div>
           <div className='mt-6'>
                 <Banner></Banner>
           </div>
            <OurFeatures></OurFeatures>
            <div className='mb-20 mt-20'>
                <ContactSection></ContactSection>
            </div>
        </div>
    );
};

export default Home;