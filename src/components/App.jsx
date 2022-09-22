import { useState, useEffect } from 'react';

import PixabayAPIRequest from '../PixabayAPI';
import Button from './ButtonLM';
import ImageGallery from './ImageGallery/';
import Searchbar from './Searchbar';
import Loader from './Loader';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { AppStyled } from './App.styled';

export const App = () => {
  const [query, setQuery] = useState(null);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [hits, setHits] = useState([]);
  const [loading, setLoading] = useState(false);

  // componentDidUpdate(past, prevState) {
  // window.scrollBy({
  //   top: document.body.clientHeight,
  //   behavior: 'smooth',
  // });

  useEffect(() => {
    if (query === '') {
      toast(`🦄 Please enter a request!`, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    if (query) formFetch(query);
  }, [query]);

  useEffect(() => {
    if (page !== 1) {
      loadMore(hits, page);
    }
    // eslint-disable-next-line
  }, [page]);

  const updateQuery = query => {
    setQuery(query);
  };

  const updatePage = () => {
    setPage(page + 1);
  };

  const formFetch = async query => {
    if (query === '') {
      return;
    } else {
      setLoading(true);
      const { totalHits, hits } = await PixabayAPIRequest(query, 1);
      setLoading(false);
      setTotalHits(totalHits);
      setHits(hits);
      setPage(1);
    }
  };

  const loadMore = async (_, page) => {
    setLoading(true);
    const data = await PixabayAPIRequest(query, page);
    setHits([...hits, ...data.hits]);
    setPage(page);
    setLoading(false);
  };

  const maxPage = Math.ceil(totalHits / 12);
  return (
    <AppStyled>
      <Searchbar updateQuery={updateQuery} />
      <ImageGallery images={hits} />
      {page < maxPage && <Button title="Load more" onClick={updatePage} />}
      {loading && <Loader />}
    </AppStyled>
  );
};
