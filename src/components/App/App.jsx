import ErrorMessage from "../ErrorMessage/ErrorMessage.jsx";
import ImageGallery from "../ImageGallery/ImageGallery.jsx";
import ImageModal from "../ImageModal/ImageModal.jsx";
import Loader from "../Loader/Loader.jsx";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";
import ImageCard from "../ImageCard/ImageCard.jsx";

const App = () => {
  return (
    <div>
      <ErrorMessage />
      <ImageGallery />
      <ImageModal />
      <Loader />
      <LoadMoreBtn />
      <SearchBar />
      <ImageCard />
    </div>
  );
};

export default App;
