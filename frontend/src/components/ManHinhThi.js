import Carousel from 'react-bootstrap/Carousel';


const ManHinhThi = () => {
  return (
    <div>
    <h2 className="title">MÀN HÌNH THI LÝ THUYẾT</h2>
    <Carousel data-bs-theme="dark">
      <Carousel.Item>
        <img src="/img/Anh1.jpg" alt="First image"/>
      </Carousel.Item>

      <Carousel.Item>
      <img src="/img/Anh2.jpg" alt="Second image"/>
      </Carousel.Item>

      <Carousel.Item>
      <img src="/img/Anh3.jpg" alt="Third image"/>
      </Carousel.Item>
      
    </Carousel>
    </div>
  );
}

export default ManHinhThi;