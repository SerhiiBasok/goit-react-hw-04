import { useState, useEffect } from "react";
import axios from "axios";
import ErrorMessage from "../ErrorMessage/ErrorMessage.jsx";
import ImageGallery from "../ImageGallery/ImageGallery.jsx";
import ImageModal from "../ImageModal/ImageModal.jsx";
import Loader from "../Loader/Loader.jsx";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";

const App = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [hasMoreImages, setHasMoreImages] = useState(true);
  const [query, setQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  async function fetchImages(query, pageNum) {
    try {
      setLoading(true);
      const apiKey = "wmfnsVc_DdNJUYvLvziU9AjLz2nPehfwjBFjdxGMITc";
      const params = {
        client_id: apiKey,
        query: query,
        orientation: "landscape",
        page: pageNum,
        per_page: 12,
      };
      const response = await axios.get(
        `https://api.unsplash.com/search/photos/`,
        {
          params: params,
          headers: {
            Authorization: `Client-ID ${apiKey}`,
          },
        }
      );
      const normalizeData = response.data.results.map(
        ({ alt_description, id, urls }) => ({
          alt: alt_description,
          id,
          small: urls.small,
          regular: urls.regular,
        })
      );

      if (pageNum === 1) {
        setImages(normalizeData);
      } else {
        setImages((prevImages) => [...prevImages, ...normalizeData]);
      }

      setError("");

      if (response.data.results.length === 0) {
        setHasMoreImages(false);
      }
    } catch (error) {
      setError("Error fetching images. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (query !== "") {
      fetchImages(query, page);
    }
  }, [query, page]);

  const handleSearch = (query) => {
    setQuery(query);
    setPage(1);
    setImages([]);
  };

  const loadMore = () => {
    setPage(page + 1);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {images.length > 0 && (
        <ImageGallery images={images} onClick={handleImageClick} />
      )}
      {hasMoreImages && images.length > 0 && <LoadMoreBtn onClick={loadMore} />}
      {selectedImage && (
        <ImageModal
          images={selectedImage}
          isOpen={isModalOpen}
          onRequestClose={closeModal}
        />
      )}
    </div>
  );
};

export default App;
