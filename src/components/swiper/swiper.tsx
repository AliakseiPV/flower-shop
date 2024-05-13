'use client'
import React, { useState } from 'react'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Image } from "@nextui-org/react";
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/thumbs'
import 'swiper/css/navigation'

const SwiperComponent = ({ images }: { images: string[] | undefined }) => {

	const [thumbsSwiper, setThumbSwiper] = useState<any>(null)

	return (
		<div className='w-full max-w-[540px]'>
			<Swiper
				loop={true}
				spaceBetween={10}
				thumbs={{
					swiper:
						thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null
				}}
				modules={[FreeMode, Navigation, Thumbs]}
				className='h-96 w-80 rounded-lg '
			>
				{images?.map((image, index) => {
					if (image.length === 0) {
						return null
					}
					return (
						<SwiperSlide key={index}>
							<div className='flex h-full w-full items-center justify-center'>
								<Image
									src={`${process.env.NEXT_PUBLIC_AWS_S3_OBJECT_URL}/productsImages/${image}`}
									alt={'Product'}
									className='block h-96 w-80 object-cover cursor-pointer'
								/>
							</div>
						</SwiperSlide>
					)
				})}
			</Swiper>
			<Swiper
				onSwiper={setThumbSwiper}
				loop={true}
				spaceBetween={12}
				slidesPerView={4}
				freeMode={true}
				watchSlidesProgress={true}
				modules={[FreeMode, Navigation, Thumbs]}
				className='mt-3 h-32 w-full rounded-lg flex flex-col '
			>
				{images?.map((image, index) => {
					if (image.length === 0) {
						return null
					}
					return (
						<SwiperSlide key={index}>
							<div className='flex h-full w-full items-center justify-center'>
								<Image
									isZoomed
									src={`${process.env.NEXT_PUBLIC_AWS_S3_OBJECT_URL}/productsImages/${image}`}
									alt={'Product'}
									className='block w-28 h-24 object-cover cursor-pointer'
								/>
							</div>
						</SwiperSlide>
					)
				})}
			</Swiper>
		</div>

	)
}

export default SwiperComponent