import React, { PropsWithChildren, useRef, useState } from "react";
import { useEffect } from "react";
import AnimeCardSkeleton from "./AnimeCardSkeleton";
import { Anime } from "../interface";
import AnimeCard from "./AnimeCard";
import Carousel from "./Carousel";
import Skeleton from "./Skeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import Button from "./Button";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper";

interface AnimeCarouselProps {
  isLoading?: boolean;
  data: Anime[] | undefined;
  className?: string;
}

const defaultSettings = {
  slidesToShow: 5,
  slidesToScroll: 5,
  infinite: false,
  dots: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
  ],
};

const AnimeCarousel = (props: PropsWithChildren<AnimeCarouselProps>) => {
  const { data = [], isLoading } = props;
  const finalSettings = { ...defaultSettings };

  const prevButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const [slidesToShow, setSlidesToShow] = useState(
    finalSettings.slidesToScroll
  );

  useEffect(() => {
    const findSlidesToShow = () => {
      const { innerWidth } = window;

      const { responsive, slidesToScroll } = finalSettings;

      if (innerWidth > responsive[0].breakpoint) {
        setSlidesToShow(slidesToScroll);
      }

      for (let i = 1; i <= finalSettings.responsive.length; i++) {
        const currentResponsive = responsive[responsive.length - i];

        if (innerWidth <= currentResponsive.breakpoint) {
          const settings = currentResponsive.settings;

          setSlidesToShow(settings.slidesToShow!);

          break;
        }
      }
    };

    window.addEventListener("resize", findSlidesToShow);

    findSlidesToShow();
  }, []);

  if (isLoading) {
    return (
      <Skeleton className="flex flex-wrap">
        {new Array(slidesToShow).fill(null).map((_, i) => (
          <AnimeCardSkeleton key={i} className={`w-1/${slidesToShow}`} />
        ))}
      </Skeleton>
    );
  }

  return !data.length ? (
    <div className="w-full h-full flex items-center justify-center">
      <p className="text-gray-300 text-base ">
        Không có dữ liệu về anime cần tìm !!
      </p>
    </div>
  ) : (
    <Swiper
      modules={[Navigation]}
      navigation={{
        prevEl: ".swiper-button-prev",
        nextEl: ".swiper-button-next",
      }}
      breakpoints={{
        600: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 5,
        },
        760: {
          slidesPerView: 4,
          slidesPerGroup: 4,
          spaceBetween: 5,
        },
        1024: {
          slidesPerView: 5,
          slidesPerGroup: 5,
          spaceBetween: 5,
        },
      }}
    >
      {data.map((anime) => (
        <SwiperSlide>
          <AnimeCard {...anime} key={anime.slug} />
        </SwiperSlide>
      ))}
      <div className="swiper-navigation absolute right-0  bottom-full mb-4 flex space-x-4">
        <Button
          ref={prevButtonRef}
          startIcon={FiChevronLeft}
          className="swiper-button-prev flex items-center justify-center text-red"
        />
        <Button
          ref={nextButtonRef}
          startIcon={FiChevronRight}
          className="swiper-button-next flex items-center justify-center"
        />
      </div>
    </Swiper>
  );
};

export default AnimeCarousel;
