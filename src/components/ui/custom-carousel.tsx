"use client";
import React, { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselDots
} from "@/components/ui/carousel";

interface CustomCarouselProps {
  images: string[];
  showControls?: boolean;
  showDots?: boolean;
  className?: string;
  imageClassName?: string;
}

export function CustomCarousel({
  images,
  showControls = true,
  showDots = true,
  className = "",
  imageClassName = ""
}: CustomCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 9000); // 15 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <Carousel className={`relative ${className}`} selectedIndex={currentIndex} onSelect={setCurrentIndex}>
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div className="h-full w-full relative aspect-[4/3]">
              <img
                src={image || "/placeholder.svg"}
                alt={`Slide ${index + 1}`}
                className={`w-full h-full object-cover rounded-lg ${imageClassName}`}
                onError={() => console.log(`Error cargando imagen ${index + 1} en el carrusel`)}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      
      {showControls && (
        <>
          <CarouselPrevious className="left-2 bg-white/80 hover:bg-white" />
          <CarouselNext className="right-2 bg-white/80 hover:bg-white" />
        </>
      )}
      
      {showDots && <CarouselDots count={images.length} />}
    </Carousel>
  );
}
