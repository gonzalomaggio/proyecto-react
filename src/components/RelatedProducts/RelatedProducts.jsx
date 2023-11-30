import React from "react";
import Item from "../Item/Item";
import Container from "react-bootstrap/esm/Container";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./RelatedProducts.scss";

const RelatedProducts = ({ allProducts, currentProduct }) => {
  const getRelatedProducts = () => {
    return allProducts.filter(
      (product) =>
        product.category === currentProduct.category &&
        product.id !== currentProduct.id
    );
  };

  const relatedProducts = getRelatedProducts();

  return (
    <Container>
      <section className="related-products">
        <hr />
        <div>
          <h2 className="related-products-title">Productos Relacionados</h2>
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={50}
            slidesPerView={3}
            navigation
            pagination={{ clickable: true }}
            scrollbar={false}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
          >
            {relatedProducts.map((relatedProduct) => (
              <SwiperSlide key={relatedProduct.id}>
                <Item product={relatedProduct} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </Container>
  );
};

export default RelatedProducts;
