import React, { use } from 'react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import ReviewCard from './ReviewCard';

const Reviews = ({ reviewPromies }) => {
    const reviews = use(reviewPromies)
    console.log(reviews)
    return (
        <div className="my-24">
            <div className="text-center mb-24">
                <h3 className="text-3xl text-center font-bold my-8">Review</h3>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus dolorem, nesciunt cupiditate, eligendi odio animi temporibus, neque iusto officia saepe delectus beatae laborum eaque repellendus mollitia repellat et sapiente qui?</p>
            </div>

            <Swiper
                loop={true}
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={3}
                coverflowEffect={{
                    rotate: 30,
                    stretch: '50%',
                    depth: 200,
                    modifier: 1,
                    scale: .75,
                    slideShadows: true,
                }}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }}
                pagination={true}
                modules={[EffectCoverflow, Pagination,Autoplay]}
                className="mySwiper"
            >

                {reviews.map((review) => (
                    <SwiperSlide key={review.id}>
                        <ReviewCard review={review}></ReviewCard>
                    </SwiperSlide>

                ))}


            </Swiper>

        </div>
    );
};

export default Reviews;