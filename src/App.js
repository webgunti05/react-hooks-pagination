import React, {useState, useEffect} from 'react';
import './App.css';
import { getAllAirLines } from './apiService';
function App() {
  const [result, setResults] = useState([]);
  const [number, setPageNumber] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(10);
  const [indexPos, setIndexPos] = useState(0);

  const fetchAllData = async(page, size) => {
    const resp = await getAllAirLines(page, size);
    setResults(resp);
  }

  let pageNumbers = [];
  for(let i = 0; i < result?.totalPages; i++){
    pageNumbers.push(i);
  }
  useEffect(() => {
    fetchAllData(number, perPage);
  }, [number, perPage]);
  
let lastItem = pageNumbers[pageNumbers.length-1];

  const onNext = () => {
    for(let i = 0; i < result?.data.length; i++){
      setPageNumber(number+1);
      setIndexPos(number+1)
    }
    if(number === lastItem){
      setPageNumber(0);
      setIndexPos(0);
      setStart(0);
      setEnd(10);
    }
  }

  
  const onPrev = () => {
    for(let i =  result?.data.length; i > 0; i--){
      setPageNumber(number-1);
      setIndexPos(number-1);
    }
    if(number === 0){
      setPageNumber(lastItem);
      setIndexPos(lastItem);
      setStart(lastItem-9);
      setEnd(lastItem-9+10);
    }
    if(number === start && number >=10){
      setStart(number-10);
      setEnd(number);
  }
  }
 
  useEffect(() => {
    if(number === end && number !== lastItem){
      setStart(number);
      setEnd(number+10);
    } 

  }, [number, end]);

  useEffect(() => {
    setPageNumber(indexPos);
  },[indexPos])


 

  const onChangeSize = e => {
    setPerPage(e.target.value);
  }

  const onPageClick = val => {
    setPageNumber(val);
    setIndexPos(val);
  }

  useEffect(() => {
    if(result?.data?.length === 0){
      setPageNumber(0);
      setIndexPos(0);
      setStart(0);
      setEnd(10);
    }
  }, [result])




  const RenderButton = ({item, onClick}) => {
    return(
     <>
     <button className={number === item && 'actButton'} onClick={onClick}>{item}</button>
     </>
    )
  }

  

  return (
    <div className="App">
        {result?.data?.map(item => (
           <div className="boxContainer" key={item._id}>
              <span>{item._id}</span>
            </div>
        ))}
        <div>
        <button onClick={onPrev}>Prev</button>
          {pageNumbers.slice(start, end).
            map((pageItem) => 
              <RenderButton key={pageItem} item={pageItem} onClick={() => onPageClick(pageItem)} />
              )}
          <button onClick={onNext}>Next</button>
          <select onChange={onChangeSize}>
            <option value="10">10</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="500">500</option>
          </select>
        </div>
    </div>
  );
}

export default App;
