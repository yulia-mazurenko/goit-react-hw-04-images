import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import fetchPictures from '../services/finder-api';
import SearchBar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import { LoadMoreButton } from './LoadMoreButton/LoadMoreButton.styled';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

const App = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState(Status.IDLE);

  useEffect(() => {
    async function fetchImages() {
      try {
        if (query === '') {
          return;
        }

        setStatus(Status.PENDING);

        const data = await fetchPictures(query, page);
        const images = data.hits;

        if (data.hits.length === 0) {
          toast.warning(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          setStatus(Status.REJECTED);
          return;
        }

        setImages(prevState => [...prevState, ...images]);
        setStatus(Status.RESOLVED);
      } catch (error) {
        setStatus(Status.REJECTED);
        toast.error('Something went wrong :( Try again.');
      }
    }

    fetchImages();
  }, [page, query]);

  const getImages = title => {
    setImages([]);
    setPage(1);
    setQuery(title);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  if (status === Status.IDLE) {
    return <SearchBar onSubmit={getImages} />;
  }

  if (status === Status.REJECTED) {
    return (
      <>
        <SearchBar onSubmit={getImages} />
        <ToastContainer autoClose={3000} theme="colored" />
      </>
    );
  }

  return (
    <>
      <SearchBar onSubmit={getImages} />
      {status === Status.PENDING && <Loader />}
      <ImageGallery images={images} />
      {images.length !== 0 && (
        <LoadMoreButton onClick={loadMore}>Load More</LoadMoreButton>
      )}
      <ToastContainer autoClose={3000} theme="colored" />
    </>
  );
};

export default App;
