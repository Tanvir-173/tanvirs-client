import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';

const ReviewCard = ({ review }) => {
    console.log(review)

    const {userName, review:testimonial,user_photoURL} = review
    return (
        <div className="w-full max-w-sm bg-base-100 shadow rounded-xl p-6 border border-gray-200">
            {/* Quote Icon */}
            <FaQuoteLeft className="text-3xl  text-primary mb-4"/>
            {/* Review text */}
            <p className="mb-4">
                {testimonial}
            </p>
           

            {/* Divider */}
            <div className="border-t border-dashed my-4"></div>

            {/* Profile Section */}
            <div className="flex items-center gap-3">
                {/* Avatar Circle */}
                <div className="w-10 h-10 rounded-full bg-teal-900">
                    <img src={user_photoURL} alt=""/>
                </div>

                <div>
                    <h3 className="font-semibold text-gray-900">{userName}</h3>
                    <p className="text-gray-500 text-xs">Senior Product Designer</p>
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;