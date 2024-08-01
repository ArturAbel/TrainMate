// hooks/useTrainerData.js
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrainers } from "../redux/features/trainerSlice";

const useTrainerData = () => {
  const dispatch = useDispatch();
  const { trainers, loading, error } = useSelector((state) => state.trainer);
  const [sports, setSports] = useState([]);
  const [levels, setLevels] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [lessonLengths, setLessonLengths] = useState([]);

  useEffect(() => {
    dispatch(fetchTrainers());
  }, [dispatch]);

  useEffect(() => {
    if (trainers.length) {
      setSports([...new Set(trainers.map((trainer) => trainer.sport))]);
      setLevels([...new Set(trainers.map((trainer) => trainer.level))]);
      setAddresses([...new Set(trainers.map((trainer) => trainer.address))]);
      setLessonLengths([
        ...new Set(trainers.map((trainer) => trainer.lessonLength)),
      ]);
    }
  }, [trainers]);

  return { trainers, loading, error, sports, levels, addresses, lessonLengths };
};

export default useTrainerData;
