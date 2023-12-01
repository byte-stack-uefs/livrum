import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Autoplay, Navigation } from "swiper/modules";

export default function Carousel({ items, Child }: { items: any[]; Child: any }) {
    return (
        <Swiper
            loop={true}
            slidesPerView={items.length < 4 ? items.length : 4}
            spaceBetween={20}
            navigation={true}
            modules={[Autoplay, Navigation, FreeMode]}
            freeMode={true}
            autoplay={true}
        >
            {items.map((e) => {
                return (
                    <SwiperSlide key={e}>
                        <Child {...e} />
                    </SwiperSlide>
                );
            })}
        </Swiper>
    );
}
