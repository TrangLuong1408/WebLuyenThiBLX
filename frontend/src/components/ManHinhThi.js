import Carousel from 'react-bootstrap/Carousel';


const ManHinhThi = () => {
  return (
    <div>
    <h2 className="title">MÀN HÌNH THI LÝ THUYẾT</h2>
    <Carousel data-bs-theme="dark">
      <Carousel.Item>
        <img src="/img/Anh1.jpg" alt="First image"/>
        {/* <Carousel.Caption>
          <h5>First slide label</h5>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption> */}
      </Carousel.Item>
      <Carousel.Item>
      <img src="/img/Anh2.jpg" alt="Second image"/>
        {/* <Carousel.Caption>
          <h5>Second slide label</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption> */}
      </Carousel.Item>
      <Carousel.Item>
      <img src="/img/Anh3.jpg" alt="Third image"/>
        {/* <Carousel.Caption>
          <h5>Third slide label</h5>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption> */}
      </Carousel.Item>
    </Carousel>
    </div>
  );
}

export default ManHinhThi;